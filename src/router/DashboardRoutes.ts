
const DashboardRoutes = {
  path: '/',
  meta: {
    requiresAuth: true
  },
  redirect: '/dashboard',
  component: () => import('@/layouts/full/FullLayout.vue'),
  beforeEnter: (to: any, from: any, next: any) => {
    next(); // Allow access to specific routes

    // if (isSuperAdmin()) { // this function is defined inside api.ts file, it check user role
    //   next(); // Allow access to all routes
    // } else {
    //   const allowedRoutes = ['Dashboard', 'Create Quote', 'Quote History'];
    //   const routeName = to.name;

    //   if (allowedRoutes.includes(routeName)) {
    //     next(); // Allow access to specific routes
    //   } else {
    //     next('/main/dashboard'); // Redirect to the dashboard or another allowed route
    //   }
    // }
  },
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue')
    },
    {
      name: 'Chats',
      path: '/chats',
      // component: () => import('@/views/dashboard/Chats/Chats.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Users',
      path: '/users',
      // component: () => import('@/views/dashboard/Users/Users.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Locations',
      path: '/locations',
      // component: () => import('@/views/dashboard/Locations/Locations.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Banner Ads',
      path: '/banner-ads',
      // component: () => import('@/views/dashboard/BannerAds/BannerAds.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Companies',
      path: '/companies',
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Settings',
      path: '/settings',
      // component: () => import('@/views/dashboard/Settings/Settings.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Property Types',
      path: '/property-types',
      // component: () => import('@/views/dashboard/PropertyTypes/PropertyTypes.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Service Types',
      path: '/service-types',
      // component: () => import('@/views/dashboard/ServiceTypes/ServiceTypes.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Property Service Types',
      path: '/property-service-types',
      // component: () => import('@/views/dashboard/PropertyServiceTypes/PropertyServiceTypes.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Service Pricing',
      path: '/service-pricing',
      // component: () => import('@/views/dashboard/ServicePricing/ServicePricing.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Document Requirements',
      path: '/document-requirements',
      // component: () => import('@/views/dashboard/DocumentRequirements/DocumentRequirements.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    {
      name: 'Valuation Requests',
      path: '/valuation-requests',
      component: () => import('@/views/dashboard/ValuationRequests/ValuationRequests.vue')
    },
    {
      name: 'Payments',
      path: '/payments',
      // component: () => import('@/views/dashboard/Payments/Payments.vue')
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    
  ]
};

export default DashboardRoutes;
