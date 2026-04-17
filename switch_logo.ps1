$files = Get-ChildItem "C:\Users\stefa\Downloads\rezeki" -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $pattern = '<img src="data:image/png;base64,[^"]*"[^>]*>'
    $replacement = '<img src="images/logo.png" alt="Rezeki" class="logo-img">'
    $content = $content -replace $pattern, $replacement
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "Done!"
