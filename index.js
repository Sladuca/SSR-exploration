import routes from './router'
import ReactDOMServer from 'react-dom/server'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})
/**
 * Respond with hello worker text
 * @param {event} event
 */
async function handleRequest (event) {
  const u = new URL(event.request.url)
  const { header, footer, component } = routes[u.pathname]
  const body = ReactDOMServer.renderToString(React.cloneElement(component, { name: 'World' }))
  return new Response(header + body + footer, {
    headers: {
      'Content-Type': 'text/html'
    }
  })
}

if (typeof navigator !== "undefined") {
  const app = document.querySelector("#app")
  const { component } = routes[location.pathname]
	ReactDOM.hydrate(React.cloneElement(component, {name:"World"} ), app)
}