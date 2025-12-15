# Corrected PowerShell script to update all MDX files to include the Tabs and TabItem components
# This script properly maintains frontmatter at the top

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
    
    # Find the position of the summary section
    $summaryIndex = $content.IndexOf("## Summary")
    
    if ($summaryIndex -ne -1) {
        # Find where the YAML frontmatter ends
        # Look for the end of frontmatter marker "---" after the first one
        $firstSeparator = $content.IndexOf("---", 4) # Start after first 3 chars to avoid the opening ---
        $secondSeparator = -1
        
        # Find the next line separator after the first ---
        if ($firstSeparator -ne -1) {
            $secondSeparator = $content.IndexOf("---", $firstSeparator + 3)
            if ($secondSeparator -ne -1) {
                # Check if the second --- is on its own line (followed by newline)
                $charAfter = $content.Substring($secondSeparator + 3, 1)
                if ($charAfter -eq "`n" -or $charAfter -eq "`r") {
                    # This is the proper end of frontmatter
                    $frontMatterEnd = $secondSeparator + 4 # Include "---`n"
                } else {
                    # Try looking for the next separator with proper newline structure
                    $nextNewline = $content.IndexOf("`n", $firstSeparator + 3)
                    if ($nextNewline -ne -1) {
                        $searchPos = $nextNewline + 1
                        $secondSeparator = $content.IndexOf("---", $searchPos)
                        if ($secondSeparator -ne -1) {
                            # Check if it's followed by newline
                            if ($secondSeparator + 3 -lt $content.Length) {
                                $charAfter = $content[$secondSeparator + 3]
                                if ($charAfter -eq "`n" -or $charAfter -eq "`r") {
                                    $frontMatterEnd = $secondSeparator + 4
                                } else {
                                    # If not properly formatted, we'll just split at the summary
                                    $frontMatterEnd = 0
                                }
                            }
                        }
                    }
                }
            }
        }
        
        if ($frontMatterEnd -gt 0) {
            # Extract frontmatter
            $frontMatter = $content.Substring(0, $frontMatterEnd)
            
            # Extract content after frontmatter
            $mainContent = $content.Substring($frontMatterEnd).TrimStart()
            
            # Split main content at summary
            $mainParts = $mainContent -split [regex]::Escape("## Summary"), 2
            
            if ($mainParts.Count -eq 2) {
                $lessonContent = $mainParts[0].Trim()
                $summaryContent = $mainParts[1].Trim()
                
                # Create the new content with proper structure
                $newContent = $frontMatter + "`n`nimport Tabs from '@theme/Tabs';`nimport TabItem from '@theme/TabItem';`n`n<Tabs className=`"tabs-container`">`n<TabItem value=`"lesson`" label=`"Full Lesson`" default>`n<div className=`"lesson-content`">`n`n" + 
                              $lessonContent + "`n`n</div>`n</TabItem>`n<TabItem value=`"summary`" label=`"Summary`">`n<div className=`"summary-content`">`n`n## Summary`n`n" + 
                              $summaryContent + "`n`n</div>`n</TabItem>`n</Tabs>"
                
                # Write the updated content back to the file
                Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
                Write-Host "  - Updated successfully"
            } else {
                Write-Host "  - Skipped (could not split content properly)"
            }
        } else {
            # If frontmatter structure is unclear, just proceed with summary split from original content
            $lessonContent = $content.Substring(0, $summaryIndex).Trim()
            $summaryStartIndex = $summaryIndex + "## Summary".Length
            $summaryContent = $content.Substring($summaryStartIndex).Trim()
            
            # Create the new content with Tabs and TabItem components
            # For this case, we'll need to extract the frontmatter differently
            # Find the end of the frontmatter by looking for the second "---"
            $lines = $content -split "`n"
            $frontMatterEndLine = -1
            $dashCount = 0
            for ($i = 0; $i -lt $lines.Length; $i++) {
                if ($lines[$i].Trim() -eq "---") {
                    $dashCount++
                    if ($dashCount == 2) {
                        $frontMatterEndLine = $i
                        break
                    }
                }
            }
            
            if ($frontMatterEndLine -gt 0) {
                $frontMatterLines = $lines[0..$frontMatterEndLine]
                $frontMatter = $frontMatterLines -join "`n"
                
                # Create the new content with proper structure
                $newContent = $frontMatter + "`n`nimport Tabs from '@theme/Tabs';`nimport TabItem from '@theme/TabItem';`n`n<Tabs className=`"tabs-container`">`n<TabItem value=`"lesson`" label=`"Full Lesson`" default>`n<div className=`"lesson-content`">`n"
                $newContent += $lessonContent + "`n`n</div>`n</TabItem>`n<TabItem value=`"summary`" label=`"Summary`">`n<div className=`"summary-content`">`n`n## Summary`n`n"
                $newContent += $summaryContent + "`n`n</div>`n</TabItem>`n</Tabs>"
                
                # Write the updated content back to the file
                Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
                Write-Host "  - Updated successfully"
            } else {
                Write-Host "  - Skipped (could not identify frontmatter structure)"
            }
        }
    } else {
        Write-Host "  - Skipped (no summary section found)"
    }
}

Write-Host "All MDX files have been processed!"