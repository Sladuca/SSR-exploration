import routes from './router'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
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
	const app = document.querySelector("#app");
	ReactDOM.hydrate(React.cloneElement(routes[location.pathname], {name:"World"} ), app);
}