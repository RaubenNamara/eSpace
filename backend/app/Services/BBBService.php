<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\Config\Config;
use RuntimeException;
use SimpleXMLElement;

/**
 * BigBlueButton API Client
 *
 * Thin wrapper around the BBB HTTP API (https://docs.bigbluebutton.org/development/api) - builds
 * checksum-signed request URLs, calls the server, and parses the XML responses into plain arrays.
 * Every public method throws \RuntimeException with a clear message on failure (including when
 * BBB_SERVER_URL/BBB_SECRET haven't been configured yet), so controllers can catch it and surface
 * a friendly error rather than crashing.
 */
class BBBService
{
    private string $serverUrl;
    private string $secret;

    public function __construct()
    {
        $bbb = Config::getBBBConfig();
        $this->serverUrl = $bbb['server_url'];
        $this->secret = $bbb['secret'];
    }

    /**
     * Whether BBB_SERVER_URL and BBB_SECRET have been set
     */
    public function isConfigured(): bool
    {
        return $this->serverUrl !== '' && $this->secret !== '';
    }

    /**
     * Create a meeting. $params should include at least meetingID and name; common optional keys:
     * attendeePW, moderatorPW, welcome, record ('true'/'false'), maxParticipants, muteOnStart,
     * duration. logoutURL always points back into eSpace (see buildLogoutUrl()) unless the caller
     * explicitly passes its own - nobody should ever land on live.stmark.sc.ug's bare BBB/Greenlight
     * page after leaving or an ended meeting.
     */
    public function createMeeting(array $params): array
    {
        $params['logoutURL'] = $params['logoutURL'] ?? $this->buildLogoutUrl();

        $xml = $this->call('create', $params);
        return $this->xmlToArray($xml);
    }

    /**
     * Where BBB sends the browser once a user's session in the meeting ends - whether they clicked
     * "Leave Meeting" themselves or a moderator ended it for everyone. Points at a backend route
     * (not the Vue app directly) so it can re-check the still-live PHP session and branch by role
     * before handing off to the right eSpace SPA page; see LiveClassReturnController.
     */
    private function buildLogoutUrl(): string
    {
        return rtrim(\eSpace\Config\Config::get('APP_URL'), '/') . '/live-class/return';
    }

    /**
     * Build the signed join URL for a meeting. The browser is redirected straight to this URL -
     * it isn't fetched server-side. $params should include meetingID, fullName, password (the
     * moderator or attendee password) and optionally userID.
     */
    public function getJoinUrl(array $params): string
    {
        return $this->buildUrl('join', $params);
    }

    /**
     * End a meeting
     */
    public function endMeeting(string $meetingId, string $password): array
    {
        $xml = $this->call('end', ['meetingID' => $meetingId, 'password' => $password]);
        return $this->xmlToArray($xml);
    }

    /**
     * Whether a meeting is currently running on the BBB server
     */
    public function isMeetingRunning(string $meetingId): bool
    {
        $xml = $this->call('isMeetingRunning', ['meetingID' => $meetingId]);
        return (string) ($xml->running ?? 'false') === 'true';
    }

    /**
     * Get live info about a running meeting (participant count, etc.)
     */
    public function getMeetingInfo(string $meetingId, string $password): array
    {
        $xml = $this->call('getMeetingInfo', ['meetingID' => $meetingId, 'password' => $password]);
        return $this->xmlToArray($xml);
    }

    /**
     * List recordings for a meeting. Returns an array of
     * ['recordID' => ..., 'startTime' => ..., 'endTime' => ..., 'playbackUrl' => ...]
     */
    public function getRecordings(string $meetingId): array
    {
        $xml = $this->call('getRecordings', ['meetingID' => $meetingId]);

        $recordings = [];
        if (isset($xml->recordings->recording)) {
            foreach ($xml->recordings->recording as $recording) {
                $playbackUrl = null;
                if (isset($recording->playback->format)) {
                    foreach ($recording->playback->format as $format) {
                        $playbackUrl = (string) $format->url;
                        break;
                    }
                }

                $recordings[] = [
                    'recordId' => (string) $recording->recordID,
                    'startTime' => (string) $recording->startTime,
                    'endTime' => (string) $recording->endTime,
                    'playbackUrl' => $playbackUrl,
                ];
            }
        }

        return $recordings;
    }

    /**
     * List all meetings currently known to the BBB server (running or recently ended), each with
     * a live participant count. Used for admin "students currently online" style reporting and as
     * a lightweight connectivity check - a SUCCESS response with zero meetings still proves the
     * URL + secret are valid.
     */
    public function getMeetings(): array
    {
        $xml = $this->call('getMeetings', []);

        $meetings = [];
        if (isset($xml->meetings->meeting)) {
            foreach ($xml->meetings->meeting as $meeting) {
                $meetings[] = [
                    'meetingId' => (string) $meeting->meetingID,
                    'meetingName' => (string) $meeting->meetingName,
                    'running' => (string) ($meeting->running ?? 'false') === 'true',
                    'participantCount' => (int) ($meeting->participantCount ?? 0),
                ];
            }
        }

        return $meetings;
    }

    /**
     * Publish or unpublish a recording (unpublished recordings are hidden from playback but not
     * deleted).
     */
    public function publishRecording(string $recordId, bool $publish): bool
    {
        $xml = $this->call('publishRecordings', [
            'recordID' => $recordId,
            'publish' => $publish ? 'true' : 'false',
        ]);

        return (string) ($xml->published ?? 'false') === 'true';
    }

    /**
     * Permanently delete a recording from the BBB server.
     */
    public function deleteRecording(string $recordId): bool
    {
        $xml = $this->call('deleteRecordings', ['recordID' => $recordId]);

        return (string) ($xml->deleted ?? 'false') === 'true';
    }

    /**
     * Whether the configured BBB server is reachable and the secret is valid. Returns a
     * human-readable status rather than throwing, so callers can surface it directly (e.g. an
     * admin-facing "server status" badge) without a try/catch.
     */
    public function checkServerStatus(): array
    {
        if (!$this->isConfigured()) {
            return [
                'configured' => false,
                'reachable' => false,
                'message' => 'BBB_SERVER_URL and BBB_SECRET are not set in backend/.env.',
            ];
        }

        try {
            $this->getMeetings();
            return [
                'configured' => true,
                'reachable' => true,
                'message' => 'Connected to the BigBlueButton server.',
            ];
        } catch (RuntimeException $e) {
            return [
                'configured' => true,
                'reachable' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Sign and call a BBB API action over HTTP, returning the parsed XML response. Throws on
     * transport failure, unparsable XML, or a non-SUCCESS returncode from BBB.
     */
    private function call(string $action, array $params): SimpleXMLElement
    {
        if (!$this->isConfigured()) {
            throw new RuntimeException('BigBlueButton is not configured yet. Set BBB_SERVER_URL and BBB_SECRET in backend/.env.');
        }

        $url = $this->buildUrl($action, $params);

        if (!function_exists('curl_init')) {
            throw new RuntimeException('The PHP curl extension is required to talk to BigBlueButton.');
        }

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);
        $response = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            throw new RuntimeException("Could not reach the BigBlueButton server: {$error}");
        }

        $xml = @simplexml_load_string($response);
        if ($xml === false) {
            throw new RuntimeException('BigBlueButton returned an unexpected response.');
        }

        $returnCode = (string) ($xml->returncode ?? '');
        if ($returnCode !== 'SUCCESS') {
            $message = (string) ($xml->message ?? 'Unknown BigBlueButton error');
            throw new RuntimeException("BigBlueButton error: {$message}");
        }

        return $xml;
    }

    /**
     * Build a checksum-signed BBB API URL without calling it (used for both server-side calls and
     * the browser-facing join URL).
     */
    private function buildUrl(string $action, array $params): string
    {
        $queryString = http_build_query($params);
        $checksum = sha1($action . $queryString . $this->secret);

        return "{$this->serverUrl}/api/{$action}?{$queryString}&checksum={$checksum}";
    }

    /**
     * Shallow-convert a SimpleXMLElement's direct children into a plain associative array (BBB's
     * responses are flat enough that this covers create/end/getMeetingInfo without needing a
     * general-purpose recursive XML-to-array conversion).
     */
    private function xmlToArray(SimpleXMLElement $xml): array
    {
        $result = [];
        foreach ($xml as $key => $value) {
            $result[$key] = (string) $value;
        }
        return $result;
    }
}
