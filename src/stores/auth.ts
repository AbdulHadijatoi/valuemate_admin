import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { base_url } from '@/utils/config';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // Validate data from local storage during initialization
    user: validateLocalStorageItem('user', true), // Validate user as an object
    token: validateLocalStorageItem('token', false), // Validate token as a string
    placeholder_image: validateLocalStorageItem('placeholder_image', false), // Validate token as a string
    returnUrl: null,
    isLoggingOut: false, // Flag to prevent multiple simultaneous logout attempts
  }),
  getters: {
    isAuthenticated: (state) => {
      return !!(state.user && state.token);
    }
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const responseData = await fetchWrapper.post(`${base_url}/login`, { email, password });
        if (responseData && responseData.data && responseData.data.user) {
          // Update Pinia state
          this.user = responseData?.data?.user;
          this.token = responseData?.data?.token;
          this.placeholder_image = responseData?.data?.placeholder_image;
          
          // Persist to local storage
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', this.token);
          localStorage.setItem('placeholder_image', this.placeholder_image);
          
          // Trigger login event for cross-tab synchronization
          const event = { type: 'login', timestamp: Date.now() };
          localStorage.setItem('auth_event', JSON.stringify(event));
          
          // Use BroadcastChannel if available for better cross-tab communication
          if (typeof BroadcastChannel !== 'undefined') {
            const channel = new BroadcastChannel('auth_channel');
            channel.postMessage(event);
            channel.close();
          }
          
          // Small delay before removing to ensure storage event fires
          setTimeout(() => {
            localStorage.removeItem('auth_event');
          }, 100);
          
          // Redirect to the previous URL or default to dashboard
          router.push(this.returnUrl || '/dashboard');
          this.returnUrl = null;
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        throw error; // Re-throw so the form can handle it
      } finally {
        
      }
    },
    logout(redirectToLogin: boolean = true) {
      // Prevent multiple simultaneous logout attempts
      if (this.isLoggingOut) {
        return;
      }
      
      this.isLoggingOut = true;
      
      // Clear state
      this.user = null;
      this.token = '';
      this.placeholder_image = '';

      // Remove from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('placeholder_image');

      // Trigger logout event for cross-tab synchronization
      const event = { type: 'logout', timestamp: Date.now() };
      localStorage.setItem('auth_event', JSON.stringify(event));
      
      // Use BroadcastChannel if available for better cross-tab communication
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('auth_channel');
        channel.postMessage(event);
        channel.close();
      }
      
      // Small delay before removing to ensure storage event fires
      setTimeout(() => {
        localStorage.removeItem('auth_event');
        this.isLoggingOut = false;
      }, 100);

      // Redirect to login page only if requested (avoid redirect loops)
      if (redirectToLogin && router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    },
  },
});

// Listen for cross-tab logout/login events
if (typeof window !== 'undefined') {
  // Use BroadcastChannel for better cross-tab communication (primary method)
  let authChannel: BroadcastChannel | null = null;
  
  if (typeof BroadcastChannel !== 'undefined') {
    authChannel = new BroadcastChannel('auth_channel');
    authChannel.onmessage = (event) => {
      const authStore = useAuthStore();
      try {
        const message = event.data;
        if (message.type === 'logout') {
          // Clear state
          authStore.user = null;
          authStore.token = '';
          authStore.placeholder_image = '';
          // Only redirect if we're not already on login page
          if (router.currentRoute.value.path !== '/login') {
            router.push('/login');
          }
        } else if (message.type === 'login') {
          // Reload to sync with new login
          window.location.reload();
        }
      } catch (error) {
        console.error('Error handling BroadcastChannel message:', error);
      }
    };
  }
  
  // Fallback to storage events (for browsers without BroadcastChannel support)
  window.addEventListener('storage', (e) => {
    // Handle auth_event for cross-tab synchronization
    if (e.key === 'auth_event') {
      const authStore = useAuthStore();
      if (e.newValue) {
        try {
          const event = JSON.parse(e.newValue);
          if (event.type === 'logout') {
            // Clear state without redirecting (to avoid issues)
            authStore.user = null;
            authStore.token = '';
            authStore.placeholder_image = '';
            // Only redirect if we're not already on login page
            if (router.currentRoute.value.path !== '/login') {
              router.push('/login');
            }
          } else if (event.type === 'login') {
            // Reload to sync with new login
            window.location.reload();
          }
        } catch (error) {
          console.error('Error parsing auth event:', error);
        }
      }
    }
    
    // Also check if token/user was removed directly (handles direct localStorage manipulation)
    if (e.key === 'token' && !e.newValue && e.oldValue) {
      const authStore = useAuthStore();
      authStore.user = null;
      authStore.token = '';
      authStore.placeholder_image = '';
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    }
    
    if (e.key === 'user' && !e.newValue && e.oldValue) {
      const authStore = useAuthStore();
      authStore.user = null;
      authStore.token = '';
      authStore.placeholder_image = '';
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    }
  });
  
  // Clean up on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      if (authChannel) {
        authChannel.close();
      }
    });
  }
}

// Utility function to validate local storage items
function validateLocalStorageItem(key: string, isObject: boolean) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return isObject ? null : '';

    if (isObject) {
      const parsedValue = JSON.parse(value);
      return parsedValue && typeof parsedValue === 'object' ? parsedValue : null;
    }

    return typeof value === 'string' && value.trim() !== '' ? value : '';
  } catch (error) {
    // Remove invalid or corrupted data from local storage
    localStorage.removeItem(key);
    return isObject ? null : '';
  }
}
