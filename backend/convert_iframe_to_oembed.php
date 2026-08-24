<?php
/**
 * Script to convert existing iframe video embeds to oembed format
 * This will allow videos to play in CKEditor edit mode
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
        
        // Convert YouTube iframe embeds to oembed
        // Pattern: <iframe src="https://www.youtube.com/embed/VIDEO_ID"
        $pattern = '/<iframe[^>]*src=["\']https?:\/\/(www\.)?youtube\.com\/embed\/([^"\']+)["\'][^>]*><\/iframe>/i';
        
        $newContent = preg_replace_callback($pattern, function($matches) {
            $videoId = $matches[2];
            return '<figure class="media"><oembed url="https://www.youtube.com/watch?v=' . $videoId . '"></oembed></figure>';
        }, $newContent);
        
        // Clean up empty figure tags
        $newContent = preg_replace('/<figure[^>]*><p>&nbsp;<\/p><\/figure>/i', '', $newContent);
        
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
