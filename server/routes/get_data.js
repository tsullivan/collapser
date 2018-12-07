export function getDataRoute(server) {
  const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');

  server.route({
    path: '/api/collapser/get_data',
    method: 'GET',
    async handler(req) {
      const data = await callWithRequest(req, 'search', {
        index: 'babynames',
      });

      return {
        time: new Date().toISOString(),
        hits: data,
      };
    },
  });
}
