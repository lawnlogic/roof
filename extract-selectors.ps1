$classes = @{}
$ids = @{}

Get-ChildItem -Filter '*.html' | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Extract classes
    [regex]::Matches($content, 'class="([^"]*)"') | ForEach-Object {
        $_.Groups[1].Value -split '\s+' | ForEach-Object {
            if ($_) { $classes[$_] = 1 }
        }
    }
    
    # Extract IDs
    [regex]::Matches($content, 'id="([^"]*)"') | ForEach-Object {
        if ($_.Groups[1].Value) { $ids[$_.Groups[1].Value] = 1 }
    }
}

$selectors = @($classes.Keys + $ids.Keys) | Sort-Object
$selectors | Out-File -FilePath "css-selectors-used.txt" -Encoding UTF8
Write-Host "Extracted $($selectors.Count) unique CSS selectors"
$selectors
