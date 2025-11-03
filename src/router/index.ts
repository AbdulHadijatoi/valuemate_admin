import { createRouter, createWebHistory } from 'vue-router';
import DashboardRoutes from './DashboardRoutes';
import AuthRoutes from './AuthRoutes';
import GuestRoutes from './GuestRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    DashboardRoutes,
    GuestRoutes,
    AuthRoutes
  ]
});

interface User {
  // Define the properties and their types for the user data here
  // For example:
  id: number;
  name: string;
}

// Assuming you have a type/interface for your authentication store
interface AuthStore {
  user: User | null;
  returnUrl: string | null;
  login(username: string, password: string): Promise<void>;
  logout(): void;
}

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth: AuthStore = useAuthStore();

  // Check if user has valid token and user data
  const hasValidAuth = auth.user && auth.token;

  // If trying to access a protected route without valid auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequired && !hasValidAuth) {
      // Clear any stale data
      if (auth.user || auth.token) {
        auth.logout(false); // Don't redirect, we'll do it manually
      }
      // Store the attempted URL for redirect after login
      auth.returnUrl = to.fullPath;
      return next('/login');
    } else {
      next();
    }
  } else {
    // If logged in and trying to access login page, redirect to dashboard
    if (to.path === '/login' && hasValidAuth) {
      return next('/dashboard');
    }
    next();
  }
});
