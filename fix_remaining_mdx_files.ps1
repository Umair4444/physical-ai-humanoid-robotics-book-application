# PowerShell script to properly update MDX files to include the Tabs and TabItem components
# This script ensures frontmatter remains at the top

# Define the base directory for the book content
$bookDir = "D:\1.GITHUB\physical-ai-humanoid-robotics-book-application\website\docs\books\physical-ai-humanoid-robotics-book\modules"

# Get all MDX files in the modules directory
$mdxFiles = Get-ChildItem -Path $bookDir -Recurse -Filter "*.mdx"

foreach ($file in $mdxFiles) {
    # Read the content of the file
    $content = Get-Content -Path $file.FullName -Raw
    
    # Skip if already has the Tabs component
    if ($content -match "import Tabs from '@theme/Tabs'") {
        continue
    }
    
    # Find the position of the summary section
    $summaryIndex = $content.IndexOf("## Summary")
    
    if ($summaryIndex -ne -1) {
        # Find the frontmatter (between first --- and second ---)
        $frontMatterMatch = [regex]::Match($content, '(?s)^---\s*\n(.*?)\n---\s*\n')
        
        if ($frontMatterMatch.Success) {
            $frontMatter = $frontMatterMatch.Value
            $mainContent = $content.Substring($frontMatterMatch.Length).TrimStart()
            
            # Split main content at summary section
            $parts = $mainContent -split [regex]::Escape("## Summary"), 2
            
            if ($parts.Count -eq 2) {
                $lessonContent = $parts[0].Trim()
                $summaryContent = $parts[1].Trim()
                
                # Create new content with proper structure
                $newContent = @"
$frontMatter

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="tabs-container">
<TabItem value="lesson" label="Full Lesson" default>
<div className="lesson-content">

$lessonContent

</div>
</TabItem>
<TabItem value="summary" label="Summary">
<div className="summary-content">

## Summary

$summaryContent

</div>
</TabItem>
</Tabs>
"@
                
                # Write the updated content back to the file
                Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
                Write-Host "$($file.Name) updated successfully"
            }
        }
    }
}

Write-Host "All MDX files have been processed!"