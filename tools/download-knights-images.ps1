# Knights Developments - image downloader
# Creates one folder per project and downloads every gallery image into it,
# plus a "00 - Site assets" folder for the logo and award badges.
#
# HOW TO RUN: double-click "Download Knights Images.bat" in this folder.
# Images land in the folder set by $root below. Re-running skips existing files.

$ErrorActionPreference = 'Continue'

# ---- where images get saved (edit if you want a different location) ----
$root = 'D:\ZKO-Creative\Matt property\Knights Project Images'

$portfolio = 'https://knightsdevelopments.com/portfolio/'
$homeUrl   = 'https://knightsdevelopments.com/'

# project display name -> page slug (numbered so folders sort in site order)
$projects = [ordered]@{
  '01 - Bramblewood Place'    = 'bramblewood-place'
  '02 - Huxley Hall'          = 'huxley-hall'
  '03 - Foxleigh Place'       = 'foxleigh-place'
  '04 - Foxleigh Farmhouse'   = 'foxleigh-farmhouse'
  '05 - Brockwell Barn'       = 'brockwell-barn'
  '06 - Maplebrook Manor'     = 'maplebrook-manor'
  '07 - Bibbs Hall Barns'     = 'highlands-farm-barns'
  '08 - Bibbs Hall Farmhouse' = 'bibbs-hall-farmhouse'
  '09 - The Willows'          = 'the-willows'
  '10 - Windmill Farm'        = 'windmill-farm'
  '11 - Broadleaves'          = 'broadleaves-long-grove-seer-green'
  '12 - Elmhurst Hall'        = 'elmhurst-seer-green'
  '13 - Great Meadow Barn'    = 'great-meadow-barn'
  '14 - The Farmhouse'        = 'the-farmhouse'
  '15 - The Old Tythe Barn'   = 'the-old-tythe-barn'
}

# skip these in the per-project galleries (logo, award badges, theme/plugin chrome)
$excludeFromProjects = 'logo|UK_2025_|/plugins/|/themes/|gravatar|favicon|icon'

# image URLs under wp-content/uploads (no embedded quotes in this pattern, by design)
$imgRegex = 'https://knightsdevelopments\.com/wp-content/uploads/[\w\-/.]+\.(jpg|jpeg|png|webp)'

function Get-Images($url) {
  try {
    $html = (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30).Content
  } catch {
    Write-Warning ('  could not fetch ' + $url)
    return @()
  }
  [regex]::Matches($html, $imgRegex) | ForEach-Object { $_.Value } | Sort-Object -Unique
}

function Save-Images($urls, $dir) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $n = 0
  foreach ($u in $urls) {
    $file = Split-Path $u -Leaf
    $out  = Join-Path $dir $file
    if (Test-Path $out) { $n = $n + 1; continue }
    try {
      Invoke-WebRequest -Uri $u -OutFile $out -UseBasicParsing -TimeoutSec 60
      $n = $n + 1
      Write-Host ('    ok  ' + $file)
    } catch {
      Write-Warning ('    fail ' + $file)
    }
  }
  return $n
}

New-Item -ItemType Directory -Force -Path $root | Out-Null
Write-Host ('Saving to: ' + $root)
Write-Host ''
$total = 0

foreach ($name in $projects.Keys) {
  Write-Host ('== ' + $name + ' ==')
  $pageUrl = $portfolio + $projects[$name] + '/'
  $urls = Get-Images $pageUrl | Where-Object { $_ -notmatch $excludeFromProjects }
  $count = Save-Images $urls (Join-Path $root $name)
  $total = $total + $count
  Write-Host ('  ' + $count + ' images')
  Write-Host ''
}

# site-wide assets: logo + award badges
Write-Host '== 00 - Site assets (logo, awards) =='
$siteUrls = @()
$siteUrls = $siteUrls + (Get-Images $homeUrl)
$siteUrls = $siteUrls + (Get-Images ($portfolio + 'huxley-hall/'))
$siteUrls = $siteUrls | Sort-Object -Unique | Where-Object { $_ -match 'logo|UK_2025_' }
$sc = Save-Images $siteUrls (Join-Path $root '00 - Site assets')
Write-Host ('  ' + $sc + ' images')
Write-Host ''

Write-Host ('DONE - ' + $total + ' project images plus ' + $sc + ' site assets')
Write-Host ('Folder: ' + $root)
