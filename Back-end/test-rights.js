const app = require('./server')
const http = require('http')

async function test() {
  const server = http.createServer(app)
  await new Promise((res) => server.listen(0, res))
  const port = server.address().port
  try {
    const res = await fetch(`http://127.0.0.1:${port}/rights?lang=fr`)
    console.log('status', res.status)
    const body = await res.text()
    console.log(body)
  } catch (err) {
    console.error('fetch error', err)
    process.exitCode = 2
  } finally {
    server.close()
  }
}

test()
