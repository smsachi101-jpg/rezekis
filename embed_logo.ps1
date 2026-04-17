$b64 = Get-Content "C:\Users\stefa\Downloads\rezeki\images\b64.txt" -Raw
$dataUri = "data:image/png;base64," + $b64.Trim()

$files = @("index.html", "contact.html", "services.html", "leadership.html", "technology.html")
$htmlFiles = Get-ChildItem "C:\Users\stefa\Downloads\rezeki" -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '<img src="images/logo\.png"[^>]*>', ('<img src="' + $dataUri + '" alt="Rezeki" class="logo-img">')
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "Done!"
