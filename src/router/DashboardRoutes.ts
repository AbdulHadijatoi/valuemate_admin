
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
      name: 'Delivered',
      path: '/delivered',
      component: () => import('@/views/dashboard/OrderPages/DeliveredOrders.vue')
    },
    {
      name: 'Collection',
      path: '/collection',
      component: () => import('@/views/dashboard/OrderPages/CollectionOrders.vue')
    },
    {
      name: 'Inbound',
      path: '/inbound',
      component: () => import('@/views/dashboard/OrderPages/InboundOrders.vue')
    },
    // {
    //   name: 'Outbound',
    //   path: '/outbound-orders',
    //   component: () => import('@/views/dashboard/OrderPages/OutboundOrders.vue')
    // },
    {
      name: 'Inventory',
      path: '/inventory',
      component: () => import('@/views/dashboard/OrderPages/InventoryOrders.vue')
    },
    {
      name: 'Pending Shelf',
      path: '/pending-shelf',
      component: () => import('@/views/dashboard/OrderPages/PendingShelfOrders.vue')
    },
    {
      name: 'Pending Confirmed Ndr',
      path: '/pending-confirmed-ndr',
      component: () => import('@/views/dashboard/OrderPages/PendingConfirmedNdr.vue')
    },
    {
      name: 'Pending Receive',
      path: '/pending-receive',
      component: () => import('@/views/dashboard/OrderPages/PendingReceiveOrders.vue')
    },
    {
      name: 'Delivered By Voucher',
      path: '/delivered-by-voucher',
      component: () => import('@/views/dashboard/OrderPages/DeliveredByVoucher.vue')
    },
    {
      name: 'Delivered By Collection Voucher',
      path: '/delivered-by-collection-voucher',
      component: () => import('@/views/dashboard/OrderPages/DeliveredByCollectionVoucher.vue')
    },
  ]
};

export default DashboardRoutes;
