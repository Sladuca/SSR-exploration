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
  <style>
  html, body {
    height: 100%; /* needed for container min-height */
  }
  </style>
  <body>
`

const footer = `
  <script src='/worker.js'></script>
  </body>
</html>
`
