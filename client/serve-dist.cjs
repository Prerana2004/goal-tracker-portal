const http = require('http')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 5173)
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
}

http
  .createServer((request, response) => {
    const requested = decodeURIComponent(request.url.split('?')[0])
    const safePath = requested === '/' ? '/index.html' : requested
    const filePath = path.normalize(path.join(root, safePath))

    if (!filePath.startsWith(root)) {
      response.writeHead(403)
      response.end('Forbidden')
      return
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        fs.readFile(path.join(root, 'index.html'), (fallbackError, fallback) => {
          if (fallbackError) {
            response.writeHead(404)
            response.end('Not found')
            return
          }
          response.writeHead(200, { 'Content-Type': types['.html'] })
          response.end(fallback)
        })
        return
      }

      response.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' })
      response.end(data)
    })
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`GoalTrack Portal running at http://127.0.0.1:${port}`)
  })
