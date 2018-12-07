import { getDataRoute } from './server/routes/get_data';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'collapser',
    uiExports: {
      app: {
        title: 'Collapser',
        description: 'Table of hits with Field Collapsing',
        main: 'plugins/collapser/app',
      },
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      getDataRoute(server);
    }
  });
}
