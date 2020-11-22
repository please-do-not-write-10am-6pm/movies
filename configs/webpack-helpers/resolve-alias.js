const path = require('path');

const SRC_PATH = path.resolve(__dirname, '../../src');

const aliases = {
  '@/layout': 'app/components/layout',
  '@/markup': 'app/components/markup',
  '@/pages': 'app/components/pages',
  '@/constants': 'app/constants',
  '@/containers': 'app/containers',
  '@/contexts': 'app/contexts',
  '@/hocs': 'app/hocs',
  '@/redux': 'app/redux/',
  '@/actions': 'app/redux/actions',
  '@/sagas': 'app/redux/sagas',
  '@/routing': 'app/routing',
  '@/types': 'app/types',
  '@/utils': 'app/utils',
  '@/i18n': 'app/i18n',
  '@/assets': 'assets',
  '@/locales': 'locales',
  '@/server': 'server'
};

Object.keys(aliases).forEach(
  (key) => {
    aliases[key] = path.resolve(
      __dirname, `${SRC_PATH}/${aliases[key]}`
    );
  }
);

aliases['@/configs'] = path.resolve(__dirname, '..');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
    alias: aliases
  },
};