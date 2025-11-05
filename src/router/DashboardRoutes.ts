
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
      name: 'Users',
      path: '/users',
      component: () => import('@/views/dashboard/Users/Users.vue')
    },
    {
      name: 'Locations',
      path: '/locations',
      component: () => import('@/views/dashboard/Locations/Locations.vue')
    },
    {
      name: 'Banner Ads',
      path: '/banner-ads',
      component: () => import('@/views/dashboard/Banners/Banners.vue')
    },
    {
      name: 'Companies',
      path: '/companies',
      component: () => import('@/views/dashboard/Companies/Companies.vue')
    },
    
    {
      name: 'Guidelines',
      path: '/guidelines',
      component: () => import('@/views/dashboard/Guidelines/Guidelines.vue')
    },
    
    {
      name: 'Property Types',
      path: '/property-types',
      component: () => import('@/views/dashboard/PropertyTypes/PropertyTypes.vue')
    },
    {
      name: 'Service Types',
      path: '/service-types',
      component: () => import('@/views/dashboard/ServiceTypes/ServiceTypes.vue')
    },
    {
      name: 'Property Service Types',
      path: '/property-service-types',
      component: () => import('@/views/dashboard/PropertyServiceTypes/PropertyServiceTypes.vue')
    },
    {
      name: 'Pricing Rules',
      path: '/pricing-rules',
      component: () => import('@/views/dashboard/ServicePricing/ServicePricing.vue')
    },
    {
      name: 'Document Requirements',
      path: '/document-requirements',
      component: () => import('@/views/dashboard/DocumentRequirements/DocumentRequirements.vue')
    },
    {
      name: 'Valuation Requests',
      path: '/valuation-requests',
      component: () => import('@/views/dashboard/ValuationRequests/ValuationRequests.vue')
    },
    {
      name: 'Payments',
      path: '/payments',
      component: () => import('@/views/dashboard/Payments/Payments.vue')
    },
    {
      name: 'Settings',
      path: '/settings',
      component: () => import('@/views/dashboard/Settings/Settings.vue')
    },
    {
      name: 'Support Chat',
      path: '/support-chat',
      component: () => import('@/views/dashboard/SupportChat/SupportChat.vue')
    },
    
  ]
};

export default DashboardRoutes;
