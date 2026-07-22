/**
 * Prepares dist/client for GitHub Pages deployment.
 * Generates index.html, 404.html (for SPA router fallback), and .nojekyll.
 */
import fs from 'fs'
import path from 'path'

const CLIENT_DIR = path.resolve('dist/client')
const ASSETS_DIR = path.join(CLIENT_DIR, 'assets')

if (!fs.existsSync(ASSETS_DIR)) {
  console.error('dist/client/assets/ directory does not exist!')
  process.exit(1)
}

const files = fs.readdirSync(ASSETS_DIR)
const mainJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'))
const mainCss = files.find(f => f.startsWith('index-') && f.endsWith('.css'))
const mapCss = files.find(f => f.startsWith('Map-') && f.endsWith('.css'))

if (!mainJs) {
  console.error('Could not find main JS bundle in dist/client/assets/')
  process.exit(1)
}

console.log('Found main JS:', mainJs)
console.log('Found main CSS:', mainCss)
console.log('Found map CSS:', mapCss)

function generateHTML() {
  const cssLinks = [
    mainCss ? `    <link rel="stylesheet" crossorigin href="./assets/${mainCss}" />` : '',
    mapCss ? `    <link rel="stylesheet" crossorigin href="./assets/${mapCss}" />` : '',
  ].filter(Boolean).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GeoPulse - Advanced Geofence Attendance</title>
    <base href="/geopulse/" />
    <meta name="description" content="High-precision geofence tracking and attendance verification." />
    <link rel="icon" type="image/png" href="./logo.png" />
    <link rel="manifest" href="./manifest.json" />
${cssLinks}
    <script type="module" crossorigin src="./assets/${mainJs}"></script>
  </head>
  <body class="bg-slate-50 text-slate-900">
    <div id="root"></div>
  </body>
</html>
`
}

const html = generateHTML()
fs.writeFileSync(path.join(CLIENT_DIR, 'index.html'), html, 'utf8')
fs.writeFileSync(path.join(CLIENT_DIR, '404.html'), html, 'utf8')
fs.writeFileSync(path.join(CLIENT_DIR, '.nojekyll'), '')

console.log('✓ Successfully generated index.html, 404.html, and .nojekyll in dist/client/')
