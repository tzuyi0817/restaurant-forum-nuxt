export default {
  ssr: true,
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
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
    { src: '~/plugins/axios', ssr: false },
    { src: '~/plugins/localStorage', ssr: false },
    '~/plugins/sweetalert2',
    '~/plugins/mixins'
  ],
  buildModules: [
    '@nuxt/typescript-build',
  ],
  modules: [
    'nuxt-fontawesome',
    'vue-sweetalert2/nuxt',
    'bootstrap-vue/nuxt',
  ],
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
    linkExactActiveClass: 'active'
  },
  watchQuery: true,
  build: {
    postcss: null,
    // extend(config, ctx) {
    // }
  },
}
