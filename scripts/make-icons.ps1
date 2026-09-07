Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\images\profile.jpg"
$src = [System.Drawing.Image]::FromFile($srcPath)
$sizes = @(180, 192, 512)

foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::FromArgb(16, 20, 18))

    $minDim = [Math]::Min($src.Width, $src.Height)
    $cropX = [int](($src.Width - $minDim) / 2)
    $cropY = [int](($src.Height - $minDim) / 2)
    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $minDim, $minDim)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)

    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    if ($size -eq 180) {
        $appleIcon = Join-Path $PSScriptRoot "..\public\apple-touch-icon.png"
        $bmp.Save($appleIcon, [System.Drawing.Imaging.ImageFormat]::Png)
        $grokIcon = Join-Path $PSScriptRoot "..\public\__grok\icon-180.png"
        if (Test-Path (Split-Path $grokIcon)) {
            $bmp.Save($grokIcon, [System.Drawing.Imaging.ImageFormat]::Png)
        }
    }
    $iconPath = Join-Path $PSScriptRoot "..\public\icon-$size.png"
    $bmp.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

$src.Dispose()
Write-Host "Icons successfully created!"
