const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const postcssNested = require('postcss-nested')
const postcssNestedAncestors = require('postcss-nested-ancestors')

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
    sidebar: {
      hideable: true,
      autoCollapseCategories: false,
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
          customCss: [require.resolve('./src/css/custom.css')],
        },
        sitemap: {
          changefreq: 'daily',
        },
        gtag: {
          // You can also use your "G-" Measurement ID here.
          trackingID: 'G-2QRS622BWQ',
          // Optional fields.
          anonymizeIP: false, // Should IPs be anonymized?
        },
      },
    ],
  ],
  // stylesheets: [
  //   "https://fonts.googleapis.com/icon?family=Material+Icons",
  // ],
  plugins: [
    // '@docusaurus/plugin-ideal-image',
    // 'docusaurus-plugin-sass',
    function (/*context, options*/) {
      return {
        name: 'webpack-configuration-plugin',
        configureWebpack(/*config, isServer, utils*/) {
          return {
            resolve: {
              symlinks: false,
            },
          };
        }
      };
    },
    function (/*context, options*/) {
      return {
        name: 'postcss-configuration-plugin',
        configurePostCss(/*postcssOptions*/) {
          return {
            plugins: [
              postcssImport,
              postcssNestedAncestors,
              postcssNested,
              postcssPresetEnv({
                stage: 1,
                features: {
                  'color-mod-function': { unresolved: 'throw' },
                  'custom-properties': false,
                },
              }),
            ].filter(Boolean),
          }
        },
      };
    },
  ],
};
