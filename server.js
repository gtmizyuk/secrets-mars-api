// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares)
server.use(jsonServer.rewriter({
  "/api/*": "/$1",
  "/mysteries/:id": "/mysteries/:id",
  "/mysteries/title/:title": "/mysteries?title=:title",
  "/mysteries/mission-id-name/:id/:name": "/mysteries?missions[:id].name=:name",
  "/mysteries/mission-id-date/:id/:date": "/mysteries?missions[:id].date=:date",
  "/mysteries/location/:location": "/mysteries?location=:location",
  "/mysteries/found/:found": "/mysteries?found=:found",
  "/mysteries/mysterium/:mysterium": "/mysteries?q=:mysterium",
  "/mysteries/explanation/:explanation": "/mysteries?q=:explanation"  
}))
server.use(router)
server.listen(port, () => {
  console.log('JSON-сервер працює!')
})