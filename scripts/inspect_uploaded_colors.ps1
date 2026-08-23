
Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Bitmap]::FromFile("C:/Users/mohda/.gemini/antigravity-ide/brain/23fe4d59-e973-49cf-874e-dba2bf6ffe59/.user_uploaded/media_1787501520617.png")
$c1 = $img1.GetPixel([int]($img1.Width/2), [int]($img1.Height/2))
Write-Host "Image 1 Center Color: R=$($c1.R) G=$($c1.G) B=$($c1.B) Hex=#$($c1.R.ToString('X2'))$($c1.G.ToString('X2'))$($c1.B.ToString('X2'))"

$img2 = [System.Drawing.Bitmap]::FromFile("C:/Users/mohda/.gemini/antigravity-ide/brain/23fe4d59-e973-49cf-874e-dba2bf6ffe59/.user_uploaded/media_1787501524124.png")
$c2 = $img2.GetPixel([int]($img2.Width/2), [int]($img2.Height/2))
Write-Host "Image 2 Center Color: R=$($c2.R) G=$($c2.G) B=$($c2.B) Hex=#$($c2.R.ToString('X2'))$($c2.G.ToString('X2'))$($c2.B.ToString('X2'))"
