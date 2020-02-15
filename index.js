import routes from './lib/router'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})
/**
 * Respond with hello worker text
 * @param {event} event
 */
async function handleRequest(event) {
  const u = new URL(event.request.url)
  // do SSR if the route is in the table
  if (u.pathname in routes) {
    const body = ReactDOMServer.renderToString(
      React.cloneElement(routes[u.pathname], { name: 'World' }),
    )
    return new Response(header + body + footer, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  }
  // if it's not, we want a static asset

  // check the cache
  const cache = await caches.default
  let response = await cache.match(event.request)

  // if not in cache, get from origin
  if (!response) {
    // change the url to the s3 bucket
    const url = new URL(
      'https://qbhq-static-assets.s3.amazonaws.com/' + u.pathname,
    )
    const newInit = {
      headers: {
        'Set-Cookie': 'SameSite=None; Secure'
      }
    }
    const newRequest = new Request(url, new Request(event.request, newInit))
    response = await fetch(newRequest)
    event.waitUntil(cache.put(event.request, response.clone()))
  }

  return response
}

if (typeof navigator !== 'undefined') {
  const app = document.querySelector('#app')
  ReactDOM.hydrate(
    React.cloneElement(routes[location.pathname], { name: 'World' }),
    app,
  )
}

const header = `<!DOCTYPE html>
<html lang='en'>
  <title>Cloudflare Workers React PWA Example</title>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <style>
  #app {
  text-align: center
}
body {
  margin: 0px
}
.Workers-Logo {
  margin-right:20px
  height: 100px
 }

.React-Logo {
  height: 100px
 }

.App-header {
  background-color: #282c34
  min-height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  font-size: calc(10px + 2vmin)
  color: white
}
.App-header-title {
  font-size: xx-large
  display: flex
  align-items: center
  font-weight: 600
}
.App-header img {
    height: 100px
}
.App-link {
  color: #61dafb
}
  </style>
  <body>
    <div id='app'>`

const footer = `</div>
<script src='/worker.js'></script>
</body>
</html>`
