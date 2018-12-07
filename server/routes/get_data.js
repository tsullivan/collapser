export function getDataRoute(server) {

  server.route({
    path: '/api/collapser/example',
    method: 'GET',
    handler() {
      return { time: (new Date()).toISOString() };
    }
  });

}
