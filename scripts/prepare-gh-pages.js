/**
 * Prepares dist/client for GitHub Pages deployment using the spa-github-pages redirect solution.
 * Handles deep routing (/geopulse/register, /geopulse/login, etc.) cleanly without 404 asset failures.
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

// 1. Generate index.html with the spa-github-pages query restoration script
function generateIndexHTML() {
  const cssLinks = [
    mainCss ? `    <link rel="stylesheet" crossorigin href="/geopulse/assets/${mainCss}" />` : '',
    mapCss ? `    <link rel="stylesheet" crossorigin href="/geopulse/assets/${mapCss}" />` : '',
  ].filter(Boolean).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GeoPulse - Advanced Geofence Attendance</title>
    <base href="/geopulse/" />
    <meta name="description" content="High-precision geofence tracking and attendance verification." />
    <link rel="icon" type="image/png" href="/geopulse/logo.png" />
    <link rel="manifest" href="/geopulse/manifest.json" />
    <!-- SPA Redirect restoration script for GitHub Pages -->
    <script>
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location));
    </script>
${cssLinks}
    <script type="module" crossorigin src="/geopulse/assets/${mainJs}"></script>
  </head>
  <body class="bg-slate-50 text-slate-900">
    <div id="root"></div>
  </body>
</html>
`
}

// 2. Generate 404.html with the spa-github-pages redirect script
function generate404HTML() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>GeoPulse</title>
    <script>
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.host + l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
`
}

const indexHtml = generateIndexHTML()
const html404 = generate404HTML()

fs.writeFileSync(path.join(CLIENT_DIR, 'index.html'), indexHtml, 'utf8')
fs.writeFileSync(path.join(CLIENT_DIR, '404.html'), html404, 'utf8')
fs.writeFileSync(path.join(CLIENT_DIR, '.nojekyll'), '')

console.log('✓ Successfully generated index.html (with SPA redirect restoration), 404.html, and .nojekyll in dist/client/')
