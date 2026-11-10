const routes = [
  {
    path: '/',
    component: () => import('layouts/MarketingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/landing/LandingPage.vue') }
    ]
  },

  {
    path: '/payment',
    // Kept as-is, still behind the auth guard in router/index.js
    component: () => import('pages/payment/PaymentEntry.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
