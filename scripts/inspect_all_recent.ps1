
Add-Type -AssemblyName System.Drawing
$dir = "C:/Users/mohda/.gemini/antigravity-ide/brain/23fe4d59-e973-49cf-874e-dba2bf6ffe59/.user_uploaded"
$files = Get-ChildItem $dir | Sort-Object LastWriteTime -Descending | Select-Object -First 6

foreach ($f in $files) {
    try {
        $bmp = [System.Drawing.Bitmap]::FromFile($f.FullName)
        $c = $bmp.GetPixel([int]($bmp.Width/2), [int]($bmp.Height/2))
        $cTop = $bmp.GetPixel(10, 10)
        Write-Host "$($f.Name): Size=$($bmp.Width)x$($bmp.Height) | Center=#$($c.R.ToString('X2'))$($c.G.ToString('X2'))$($c.B.ToString('X2')) (R=$($c.R),G=$($c.G),B=$($c.B)) | TopLeft=#$($cTop.R.ToString('X2'))$($cTop.G.ToString('X2'))$($cTop.B.ToString('X2'))"
        $bmp.Dispose()
    } catch {
        Write-Host "$($f.Name): Error $($_.Exception.Message)"
    }
}
