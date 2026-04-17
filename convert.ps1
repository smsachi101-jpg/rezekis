$b = [System.IO.File]::ReadAllBytes("C:\Users\stefa\Downloads\rezeki\images\logo.png")
$b64 = [Convert]::ToBase64String($b)
Set-Content -Path "C:\Users\stefa\Downloads\rezeki\images\b64.txt" -Value $b64 -Encoding ASCII
Write-Host "Done: base64 length = $($b64.Length)"
