const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const postcssNested = require('postcss-nested')
const postcssNestedAncestors = require('postcss-nested-ancestors')

const isProd = process.env.NODE_ENV === 'production';

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
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
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
    metadata: [
      { name: 'keywords', content: 'c++ orm, tinyorm' },
    ],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/silverqx/TinyORM-github.io/edit/main/',
          routeBasePath: '/',
          exclude: [
            '**/assets/**',
            // These README.md files are only for github
            'database/README.md',
            'tinyorm/README.md',
            'building/README.md',
          ],
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
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to:   '/building/tinyorm',
            from: '/building',
          },
          {
            to:   '/database/getting-started',
            from: '/database',
          },
          {
            to:   '/database/query-builder',
            from: '/query-builder',
          },
          {
            to:   '/tinyorm/getting-started',
            from: '/tinyorm',
          },
          {
            to:   '/tinyorm/relationships',
            from: '/tinyorm-relationships',
          },
        ],
        // createRedirects(existingPath) {
        //   if (existingPath.includes('/community')) {
        //     // Redirect from /docs/team/X to /community/X and /docs/support/X to /community/X
        //     return [
        //       existingPath.replace('/community', '/docs/team'),
        //       existingPath.replace('/community', '/docs/support'),
        //     ];
        //   }
        //   return undefined; // Return a falsy value: no redirect created
        // },
      },
    ],
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
                stage: 2,
                minimumVendorImplementations: 2,
                features: {
                  'custom-properties': false,
                },
              }),
            ].filter(Boolean),
          }
        },
      };
    },
    function (/*context, options*/) {
      return {
        name: 'tiny-common',
        injectHtmlTags() {
          if (!isProd)
            return {}

          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `gtag('config', 'AW-989655383');gtag('event', 'conversion', {'send_to': 'AW-989655383/vDYzCM--ks4DENfi89cD'});`,
              },
            ],
          };
        },
      }
    },
  ],
};
