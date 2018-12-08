export function getDataRoute(server) {
  const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');

  server.route({
    path: '/api/collapser/get_data',
    method: 'GET',
    async handler(req) {
      const params = {
        index: 'babynames',
        size: 10000,
        filter_path: ['hits'],
        body: {
          collapse: {
            field: 'name',
          },
          sort: [
            { name: { order: 'asc' } },
            { year: { order: 'asc' } },
            { percent: { order: 'desc' } },
          ],
          _source: ['gender', 'name', 'year', 'value', 'percent'],
        },
      };
      const result = await callWithRequest(req, 'search', params);

      const hits = result.hits || {};
      const hitTotal = hits.total || 0;
      const hitData = hits.hits.map(hit => hit._source, []);

      return {
        time: new Date().toISOString(),
        total: hitTotal,
        hits: hitData,
      };
    },
  });
}
