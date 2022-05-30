const { npm_package_name, npm_package_description, NODE_ENV } = process.env;

export default {
  ssr: true,
  head: {
    title: npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: '#00c58e',
    continuous: true
  },
  css: [
    '~assets/application.scss'
  ],
  plugins: [
    '~/plugins/axios',
    '~/plugins/toast',
    '~/plugins/mixins',
    { src: '~/plugins/vuex-persist', ssr: false },
  ],
  buildModules: [
    '@nuxt/typescript-build',
  ],
  modules: [
    'nuxt-fontawesome',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      },
    ]
  },
  router: {
    linkExactActiveClass: 'active',
    middleware: ["authenticated"],
  },
  watchQuery: true,
  build: {
    postcss: null,
    extractCSS: NODE_ENV === 'production',
    // extend(config, ctx) {
    // }
  },
}
