# PowerShell script to update all MDX files to include the Tabs and TabItem components
# This script will add the proper JSX components to create tabbed content for lessons and summaries

# Define the base directory for the book content
$bookDir = "D:\1.GITHUB\physical-ai-humanoid-robotics-book-application\website\docs\books\physical-ai-humanoid-robotics-book\modules"

# Get all MDX files in the modules directory
$mdxFiles = Get-ChildItem -Path $bookDir -Recurse -Filter "*.mdx"

Write-Host "Found $($mdxFiles.Count) MDX files to process..."

foreach ($file in $mdxFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the content of the file
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if the file already has the Tabs component (skip if it does)
    if ($content -match "import Tabs from '@theme/Tabs'") {
        Write-Host "  - Skipping (already has Tabs component)"
        continue
    }
    
    # Find the position of the summary section (look for "## Summary" anywhere)
    $summaryIndex = $content.IndexOf("## Summary")
    
    if ($summaryIndex -ne -1) {
        # Extract lesson content (everything up to "## Summary")
        $lessonContent = $content.Substring(0, $summaryIndex).Trim()
        
        # Find the summary content (everything after "## Summary")
        $summaryStartIndex = $summaryIndex + "## Summary".Length
        $summaryContent = $content.Substring($summaryStartIndex).Trim()
        
        # Find where the YAML frontmatter ends to preserve it
        $frontMatterEnd = $content.IndexOf("`n---`n", 5) # Start after the opening ---
        if ($frontMatterEnd -eq -1) {
            $frontMatterEnd = $content.IndexOf("---`n", 5)
            if ($frontMatterEnd -ne -1) {
                $frontMatterEnd += 4 # Include "---`n"
            }
        } else {
            $frontMatterEnd += 5 # Include "`n---`n"
        }
        
        # Extract frontmatter (including the initial "---" and ending "---`n")
        $frontMatter = $content.Substring(0, $frontMatterEnd)
        
        # Create the new content with Tabs and TabItem components
        $newContent = $frontMatter + "`n`nimport Tabs from '@theme/Tabs';`nimport TabItem from '@theme/TabItem';`n`n<Tabs className=`"tabs-container`">`n<TabItem value=`"lesson`" label=`"Full Lesson`" default>`n<div className=`"lesson-content`">`n`n" + 
                      $lessonContent + "`n`n</div>`n</TabItem>`n<TabItem value=`"summary`" label=`"Summary`">`n<div className=`"summary-content`">`n`n## Summary`n`n" + 
                      $summaryContent + "`n`n</div>`n</TabItem>`n</Tabs>"
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "  - Updated successfully"
    } else {
        Write-Host "  - Skipped (no summary section found)"
    }
}

Write-Host "All MDX files have been processed!"