const path = require('path');

const SRC_PATH = path.resolve(__dirname, '../../src');

const aliases = {
  app_routing: 'app/routing',
  app_settings_tmdb: 'app/settings/tmdb',
  app_settings_i18n: 'app/settings/i18n',
  app_locales: 'locales',
  app_components: 'app/components',
  app_containers: 'app/containers',
  app_hocs: 'app/hocs',
  app_contexts: 'app/contexts',
  app_services: 'app/services',
  app_history: 'app/services/HistoryService',

  app_assets: 'assets',

  app_redux: 'app/redux/',
  redux_store: 'app/redux/configureStore',
  redux_reducers: 'app/redux/rootReducer',
  redux_actions: 'app/redux/actions',

  server_api: 'server/api',
  server_config: 'server/express-app-config',
};

Object.keys(aliases).forEach(
  (key) => {
    aliases[key] = path.resolve(
      __dirname, `${SRC_PATH}/${aliases[key]}`
    );
  }
);

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
    alias: aliases
  },
};