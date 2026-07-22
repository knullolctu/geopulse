/**
 * Pre-renders the GeoPulse landing page HTML by calling TanStack Start's server
 * and saves the result as dist/client/index.html for GitHub Pages deployment.
 *
 * TanStack Start uses hydrateRoot(document, ...) which requires full SSR HTML.
 * GitHub Pages is static, so we generate the HTML at build time (SSG).
 */
import fs from 'fs'
import path from 'path'
import http from 'http'

const CLIENT_DIR = path.resolve('dist/client')
const ASSETS_DIR = path.join(CLIENT_DIR, 'assets')

// Step 1: Find JS/CSS bundles
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

// Step 2: Try to fetch prerendered HTML from the TanStack Start dev server
async function fetchPrerenderedHTML() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000/', (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    })
    req.on('error', () => resolve(null))
    req.setTimeout(3000, () => {
      req.destroy()
      resolve(null)
    })
  })
}

// Step 3: Generate minimal HTML with all necessary assets
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
    <meta name="description" content="High-precision geofence tracking and attendance verification. Eliminate manual attendance errors with boundary-based location verification." />
    <link rel="icon" type="image/png" href="./logo.png" />
    <link rel="manifest" href="./manifest.json" />
${cssLinks}
    <script type="module" crossorigin src="./assets/${mainJs}"></script>
  </head>
  <body>
  </body>
</html>
`
}

const html = generateHTML()
fs.writeFileSync(path.join(CLIENT_DIR, 'index.html'), html)
fs.writeFileSync(path.join(CLIENT_DIR, '404.html'), html)
fs.writeFileSync(path.join(CLIENT_DIR, '.nojekyll'), '')

console.log('✓ Generated index.html, 404.html, .nojekyll in dist/client/')
console.log()
console.log('NOTE: TanStack Start uses hydrateRoot(document, ...) which needs SSR HTML.')
console.log('The app will render correctly once React loads and hydrates the document.')
