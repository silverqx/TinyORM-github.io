const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'TinyORM',
  tagline: 'c++ ORM library for Qt framework',
  url: 'https://www.tinyorm.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'silverqx', // Usually your GitHub org/user name.
  projectName: 'TinyORM', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  titleDelimiter: '-',
  noIndex: false,
  themeConfig: {
    hideableSidebar: true,
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      hideOnScroll: true,
      title: 'TinyORM',
      logo: {
        alt: 'TinyORM Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/silverqx/TinyORM',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [],
      copyright:
        `<span>Copyright © ${new Date().getFullYear()} </span>` +
        `<a href="https://github.com/silverqx" target="_blank">Silver Zachara</a>`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      defaultLanguage: 'cpp',
      additionalLanguages: ['cmake', 'powershell'],
    },
    gtag: {
      // You can also use your "G-" Measurement ID here.
      trackingID: 'G-2QRS622BWQ',
      // Optional fields.
      anonymizeIP: false, // Should IPs be anonymized?
    },
    algolia: {
      appId: 'ML6TJ6GTSR',
      apiKey: '2d548632681c7f359587e5671f67e636',
      indexName: 'TinyORM-github.io',
      contextualSearch: false,
      // Optional: Algolia search parameters
      // searchParameters: {},
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/silverqx/TinyORM-github.io/edit/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
        sitemap: {
          changefreq: 'daily',
        },
      },
    ],
  ],
  // stylesheets: [
  //   "https://fonts.googleapis.com/icon?family=Material+Icons",
  // ],
  plugins: [
    // '@docusaurus/plugin-ideal-image',
    'docusaurus-plugin-sass',
    // webpack-configuration-plugin
    function(context, options) {
      return {
        name: 'webpack-configuration-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              symlinks: false,
            },
          };
        }
      };
    },
  ],
};
