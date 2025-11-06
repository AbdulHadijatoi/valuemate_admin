import { ref } from 'vue';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { base_url } from '@/utils/config';

const unreadCount = ref(0);
let pollingInterval: ReturnType<typeof setInterval> | null = null;

export function useSupportChat() {
  const fetchUnreadCount = async () => {
    try {
      const responseData = await fetchWrapper.get(`${base_url}/admin/support-chat/unread-count`);
      if (responseData.status) {
        unreadCount.value = responseData.data.unread_count || 0;
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const startPolling = () => {
    // Fetch immediately
    fetchUnreadCount();
    
    // Then poll every 10 seconds
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
    
    pollingInterval = setInterval(() => {
      fetchUnreadCount();
    }, 10000); // 10 seconds
  };

  const stopPolling = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  };

  const refreshUnreadCount = () => {
    fetchUnreadCount();
  };

  return {
    unreadCount,
    startPolling,
    stopPolling,
    refreshUnreadCount,
  };
}

