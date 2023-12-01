const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// const SitemapPlugin = require('sitemap-webpack-plugin').default;

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Template',
    }
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({ //СУПЕР-ВАЖНАЯ штука для ссылок на файлы (pdf или картинки), расположенные на самом сервере!!!
        patterns: [
          {
            from: `src/assets`,
            to: 'assets'
          }
        ]
      }),
      new HtmlWebpackTagsPlugin({
        links: [
          {
            // path: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
            path: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
            attributes: {
              rel: 'stylesheet'
            },
          },
        ],
        scripts: [
          // 'https://www.googletagmanager.com/gtag/js?id=G-RZHR947YVN',
          // '/assets/analytics/ganal.js'
        ],
        append: true,
        publicPath: false,
        useHash: false,
        metas: [
          // {attributes: {name: 'google-site-verification', content: 'Gq9vrXtN91P1JteGFo-xrlLKT0PR8u-4P4xs21oUr8Y'}},
          {attributes: {property: 'description', content: 'Vue.js Start template by Zorger'}},
          {attributes: {property: 'og:title', content: 'Template'}},
          {attributes: {property: 'twitter:title', content: 'Template'}},
          {attributes: {property: 'og:description', content: 'Vue.js Start template by Zorger'}},
          {attributes: {property: 'twitter:description', content: 'Vue.js Start template by Zorger'}},
          // {attributes: {property: 'og:image', content: 'https://zorin.expert/assets/ogimage/menu/Image_All.jpg'}},
          // {attributes: {property: 'twitter:image', content: 'https://zorin.expert/assets/ogimage/menu/Image_All.jpg'}},
          // {attributes: {property: 'og:url', content: 'https://Zorin.Expert'}},
          {attributes: {property: 'og:type', content: 'website'}},
          {attributes: {property: 'twitter:card', content: 'summary_large_image'}}
        ]
      }),
      new FaviconsWebpackPlugin({
        logo: './src/assets/favicon/favbig.png',
        mode: 'webapp',
        devMode: 'webapp',
        outputPath: 'assets/favicon-img/', // Куда будут на сервере скидываться созданные favicon-ки
        prefix: 'assets/favicon-img/', // Этот префикс для файла index.html, чтобы правильно прописать пути иконок с сервера!
        favicons: {
          appName: 'Template',
          appDescription: 'Vue.js Start template by Zorger',
          developerName: 'Zorger',
          developerURL: null
        }
      }),
      // new SitemapPlugin({
      //   // base: 'https://zorin.expert', // Базовый URL моего сайта
      //   // paths: [
      //   //   { path: '/', priority: 1, changefreq: 'always' },
      //   //   { path: '/projects', priority: 1, changefreq: 'daily' },
      //   //   { path: '/experience', priority: 1, changefreq: 'daily' },
      //   //   { path: '/skills', priority: 1, changefreq: 'daily' },
      //   //   { path: '/about', priority: 1, changefreq: 'always' },
      //   // ],
      //   options: {
      //     skipgzip: true
      //   },
      // }),
    ]
  }
}