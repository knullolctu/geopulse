import fs from 'fs'
import path from 'path'

const clientDir = path.resolve('dist/client')
const assetsDir = path.join(clientDir, 'assets')

if (!fs.existsSync(assetsDir)) {
  console.error('dist/client/assets directory does not exist!')
  process.exit(1)
}

const files = fs.readdirSync(assetsDir)
const mainJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'))
const mainCss = files.find(f => f.startsWith('index-') && f.endsWith('.css'))
const mapCss = files.find(f => f.startsWith('Map-') && f.endsWith('.css'))

console.log('Found main JS:', mainJs)
console.log('Found main CSS:', mainCss)

const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GeoPulse - Advanced Geofence Attendance</title>
    <link rel="icon" type="image/png" href="./logo.png" />
    <link rel="manifest" href="./manifest.json" />
    ${mainCss ? `<link rel="stylesheet" href="./assets/${mainCss}" />` : ''}
    ${mapCss ? `<link rel="stylesheet" href="./assets/${mapCss}" />` : ''}
  </head>
  <body class="bg-slate-50 text-slate-900">
    <div id="root"></div>
    ${mainJs ? `<script type="module" src="./assets/${mainJs}"></script>` : ''}
  </body>
</html>
`

fs.writeFileSync(path.join(clientDir, 'index.html'), htmlContent)
fs.writeFileSync(path.join(clientDir, '404.html'), htmlContent)
fs.writeFileSync(path.join(clientDir, '.nojekyll'), '# Disable Jekyll\n')

console.log('Successfully generated index.html, 404.html, and .nojekyll in dist/client!')
