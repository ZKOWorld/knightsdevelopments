<#
  Knights Developments — image downloader
  Creates one folder per project and downloads every gallery image into it,
  plus a "00 - Site assets" folder for the logo and award badges.

  HOW TO RUN (Windows):
    1) Right-click this file > "Run with PowerShell"
       — or — open PowerShell and run:
       powershell -ExecutionPolicy Bypass -File "download-knights-images.ps1"
    2) Images land in the folder set by $root below (edit it if you like).

  No admin rights needed. Re-running skips files already downloaded.
#>

# ---- where images get saved (edit if you want a different location) ----
$root = "D:\ZKO-Creative\Matt property\Knights Project Images"

$portfolio = "https://knightsdevelopments.com/portfolio/"
$home      = "https://knightsdevelopments.com/"

# project display name -> page slug (numbered so folders sort in site order)
$projects = [ordered]@{
  "01 - Bramblewood Place"   = "bramblewood-place"
  "02 - Huxley Hall"         = "huxley-hall"
  "03 - Foxleigh Place"      = "foxleigh-place"
  "04 - Foxleigh Farmhouse"  = "foxleigh-farmhouse"
  "05 - Brockwell Barn"      = "brockwell-barn"
  "06 - Maplebrook Manor"    = "maplebrook-manor"
  "07 - Bibbs Hall Barns"    = "highlands-farm-barns"
  "08 - Bibbs Hall Farmhouse"= "bibbs-hall-farmhouse"
  "09 - The Willows"         = "the-willows"
  "10 - Windmill Farm"       = "windmill-farm"
  "11 - Broadleaves"         = "broadleaves-long-grove-seer-green"
  "12 - Elmhurst Hall"       = "elmhurst-seer-green"
  "13 - Great Meadow Barn"   = "great-meadow-barn"
  "14 - The Farmhouse"       = "the-farmhouse"
  "15 - The Old Tythe Barn"  = "the-old-tythe-barn"
}

# skip these in the per-project galleries (logo, award badges, theme/plugin chrome)
$excludeFromProjects = 'logo|UK_2025_|/plugins/|/themes/|gravatar|favicon|icon'

$imgRegex = 'https://knightsdevelopments\.com/wp-content/uploads/[^"''\)\s]+\.(?:jpg|jpeg|png|webp)'

function Get-Images($url) {
  try { $html = (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30).Content }
  catch { Write-Warning "  could not fetch $url : $($_.Exception.Message)"; return @() }
  [regex]::Matches($html, $imgRegex) | ForEach-Object { $_.Value } | Sort-Object -Unique
}

function Save-Images($urls, $dir) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $n = 0
  foreach ($u in $urls) {
    $file = Split-Path $u -Leaf
    $out  = Join-Path $dir $file
    if (Test-Path $out) { $n++; continue }
    try { Invoke-WebRequest -Uri $u -OutFile $out -UseBasicParsing -TimeoutSec 60; $n++; Write-Host "    ok  $file" }
    catch { Write-Warning "    fail $file" }
  }
  return $n
}

New-Item -ItemType Directory -Force -Path $root | Out-Null
Write-Host "Saving to: $root`n" -ForegroundColor Cyan
$total = 0

foreach ($name in $projects.Keys) {
  Write-Host "== $name ==" -ForegroundColor Cyan
  $urls = Get-Images "$portfolio$($projects[$name])/" | Where-Object { $_ -notmatch $excludeFromProjects }
  $count = Save-Images $urls (Join-Path $root $name)
  $total += $count
  Write-Host "  $count images`n" -ForegroundColor Green
}

# site-wide assets: logo + award badges (from the homepage + a project page)
Write-Host "== 00 - Site assets (logo, awards) ==" -ForegroundColor Cyan
$site = (Get-Images $home) + (Get-Images "$portfolio`huxley-hall/") | Sort-Object -Unique |
        Where-Object { $_ -match 'logo|UK_2025_' }
$sc = Save-Images $site (Join-Path $root "00 - Site assets")
Write-Host "  $sc images`n" -ForegroundColor Green

Write-Host "DONE — $total project images + $sc site assets" -ForegroundColor Green
Write-Host "Folder: $root"
