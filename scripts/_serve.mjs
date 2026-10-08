import http from 'http'
import fs from 'fs'
import path from 'path'

const root = process.argv[2]
const port = Number(process.argv[3] || 4173)

const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.txt': 'text/plain', '.xml': 'application/xml', '.ico': 'image/x-icon',
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0])
    let file = path.join(root, url)
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(root, 'index.html') // SPA fallback
    }
    const ext = path.extname(file)
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  .listen(port, () => console.log('serving ' + root + ' on http://localhost:' + port))