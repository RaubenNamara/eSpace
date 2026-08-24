<?php
/**
 * Script to convert oembed video embeds back to iframe format
 * This will revert the previous conversion
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/Database.php';

use eSpace\Config\Database;

try {
    $db = Database::getInstance();
    
    // Get all pages to check content
    $sql = "SELECT id, content FROM enote_pages WHERE deleted_at IS NULL";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $pages = $stmt->fetchAll();
    
    echo "Found " . count($pages) . " total pages\n\n";
    
    // Show content of first few pages
    foreach (array_slice($pages, 0, 3) as $page) {
        echo "Page ID {$page['id']}: " . substr($page['content'], 0, 200) . "...\n";
    }
    echo "\n";
    
    $convertedCount = 0;
    
    foreach ($pages as $page) {
        $originalContent = $page['content'];
        $newContent = $originalContent;
        
        // Convert YouTube oembed to iframe
        // Pattern: <oembed url="https://www.youtube.com/watch?v=VIDEO_ID"></oembed>
        $pattern = '/<oembed url="https:\/\/www\.youtube\.com\/watch\?v=([^"]+)"><\/oembed>/i';
        
        $newContent = preg_replace_callback($pattern, function($matches) {
            $videoId = $matches[1];
            return '<iframe width="1280" height="720" style="width: 100%; height: auto; aspect-ratio: 16 / 9; border: 0; display: block;" frameborder="0" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" src="https://www.youtube.com/embed/' . $videoId . '"></iframe>';
        }, $newContent);
        
        // Convert Vimeo oembed to iframe
        $pattern2 = '/<oembed url="https:\/\/vimeo\.com\/(\d+)"><\/oembed>/i';
        
        $newContent = preg_replace_callback($pattern2, function($matches) {
            $videoId = $matches[1];
            return '<iframe width="1280" height="720" style="width: 100%; height: auto; aspect-ratio: 16 / 9; border: 0; display: block;" frameborder="0" allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" src="https://player.vimeo.com/video/' . $videoId . '"></iframe>';
        }, $newContent);
        
        // Wrap iframes in figure if not already wrapped
        $newContent = preg_replace('/<p>(<iframe[^>]+><\/iframe>)<\/p>/i', '<figure><div><div>$1</div></div></figure>', $newContent);
        
        if ($newContent !== $originalContent) {
            // Update the database
            $updateSql = "UPDATE enote_pages SET content = :content WHERE id = :id";
            $updateStmt = $db->prepare($updateSql);
            $updateStmt->execute([
                'content' => $newContent,
                'id' => $page['id']
            ]);
            
            echo "Converted page ID {$page['id']}\n";
            echo "  Original: " . substr($originalContent, 0, 100) . "...\n";
            echo "  New: " . substr($newContent, 0, 100) . "...\n\n";
            
            $convertedCount++;
        }
    }
    
    echo "\nConversion complete. Converted $convertedCount pages.\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
