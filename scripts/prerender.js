/**
 * Prerender script for GitHub Pages deployment.
 * Starts the TanStack Start SSR server, fetches the rendered HTML for '/',
 * replaces production asset URLs, and saves as dist/client/index.html + 404.html.
 */
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import http from 'http'

const CLIENT_DIR = path.resolve('dist/client')
const ASSETS_DIR = path.join(CLIENT_DIR, 'assets')
const PORT = 13999

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function fetchHTML(url, retries = 10) {
  return new Promise((resolve, reject) => {
    function attempt(n) {
      const req = http.get(url, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => resolve(data))
      })
      req.on('error', async (err) => {
        if (n <= 0) return reject(err)
        await sleep(1000)
        attempt(n - 1)
      })
      req.setTimeout(5000, () => {
        req.destroy()
        if (n <= 0) return reject(new Error('Timeout'))
        sleep(1000).then(() => attempt(n - 1))
      })
    }
    attempt(retries)
  })
}

function rewriteAssetURLs(html) {
  // Replace dev server absolute asset paths with relative paths for GitHub Pages
  return html
    .replace(/src="\/assets\//g, 'src="./assets/')
    .replace(/href="\/assets\//g, 'href="./assets/')
    .replace(/src="\/@/g, 'src="./assets/')
    .replace(/href="\/@/g, 'href="./assets/')
}

async function run() {
  console.log('Starting SSR server on port', PORT, '...')

  const server = spawn('node', ['dist/server/server.js'], {
    env: {
      ...process.env,
      PORT: String(PORT),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  server.stdout.on('data', d => process.stdout.write('[server] ' + d))
  server.stderr.on('data', d => process.stderr.write('[server] ' + d))

  await sleep(3000)

  try {
    console.log('Fetching SSR HTML from http://localhost:' + PORT + '/ ...')
    const html = await fetchHTML(`http://localhost:${PORT}/`)
    console.log('Got HTML, length:', html.length)

    const rewritten = rewriteAssetURLs(html)

    fs.writeFileSync(path.join(CLIENT_DIR, 'index.html'), rewritten, 'utf8')
    fs.writeFileSync(path.join(CLIENT_DIR, '404.html'), rewritten, 'utf8')
    fs.writeFileSync(path.join(CLIENT_DIR, '.nojekyll'), '')

    console.log('✓ Saved index.html, 404.html, .nojekyll to dist/client/')
  } finally {
    server.kill()
  }
}

run().catch(err => {
  console.error('Prerender failed:', err.message)
  process.exit(1)
})
