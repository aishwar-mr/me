# Regenerate favicon.png. Tweak $fontSize, then: powershell -File make-favicon.ps1
$fontSize = 580      # <-- the knob. Bigger = larger A. Try 520, 580, 640.
$nudgeY   = 15       # vertical centering fudge; raise to move the A down

Add-Type -AssemblyName System.Drawing
$size = 512
$bmp = New-Object System.Drawing.Bitmap $size, $size
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'AntiAlias'
$g.Clear([System.Drawing.Color]::Transparent)

$font = New-Object System.Drawing.Font("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment = 'Center'; $fmt.LineAlignment = 'Center'
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#881946"))
$g.DrawString("A", $font, $brush, (New-Object System.Drawing.RectangleF 0, $nudgeY, $size, $size), $fmt)

$g.Dispose()
$bmp.Save("$PSScriptRoot\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "favicon.png written at fontSize=$fontSize"
