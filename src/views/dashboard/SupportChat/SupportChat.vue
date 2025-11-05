<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-card elevation="0" class="rounded-lg">
          <v-card-title class="d-flex align-center justify-space-between">
            <span class="text-h6">Support Chats</span>
            <v-btn icon variant="text" @click="getChatRooms" size="small" :loading="loading">
              <RefreshIcon size="20" />
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          
          <perfect-scrollbar style="height: calc(100vh - 200px)">
            <v-list v-if="chatRooms.length > 0">
              <v-list-item
                v-for="room in chatRooms"
                :key="room.id"
                @click="selectRoom(room.id)"
                :class="{ 'bg-primary-lighten-5': selectedRoomId === room.id }"
                class="mb-1"
              >
                <template v-slot:prepend>
                  <v-avatar color="primary" size="40">
                    <span class="text-white text-body-2">
                      {{ room.user_name.charAt(0).toUpperCase() }}
                    </span>
                  </v-avatar>
                </template>
                
                <v-list-item-title class="font-weight-medium">
                  {{ room.user_name }}
                  <v-badge
                    v-if="room.unread_count > 0"
                    :content="room.unread_count"
                    color="error"
                    inline
                    class="ml-2"
                  ></v-badge>
                </v-list-item-title>
                
                <v-list-item-subtitle>
                  <span v-if="room.last_message" class="text-truncate d-block">
                    {{ room.last_message.message }}
                  </span>
                  <span v-else class="text-grey">No messages yet</span>
                </v-list-item-subtitle>
                
                <template v-slot:append>
                  <span class="text-caption text-grey">
                    {{ room.last_message ? room.last_message.created_at_human : '' }}
                  </span>
                </template>
              </v-list-item>
            </v-list>
            
            <div v-else class="text-center pa-8">
              <p class="text-grey">No support chats yet</p>
            </div>
          </perfect-scrollbar>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="8">
        <v-card elevation="0" class="rounded-lg" v-if="selectedRoomId">
          <v-card-title class="d-flex align-center justify-space-between">
            <div>
              <span class="text-h6">{{ selectedRoom?.user_name }}</span>
              <span class="text-caption text-grey ml-2">{{ selectedRoom?.user_email }}</span>
            </div>
            <v-btn icon variant="text" @click="selectedRoomId = null" size="small">
              <XIcon size="20" />
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          
          <!-- Messages Area -->
          <perfect-scrollbar ref="messagesScroll" style="height: calc(100vh - 400px)" class="pa-4">
            <div v-if="messages.length > 0">
              <div
                v-for="message in messages"
                :key="message.id"
                class="mb-4"
                :class="{ 'text-right': message.is_admin, 'text-left': !message.is_admin }"
              >
                <div
                  class="d-inline-block pa-3 rounded-lg"
                  :class="message.is_admin ? 'bg-primary text-white' : 'bg-grey-lighten-4'"
                  style="max-width: 70%"
                >
                  <div class="text-body-2">{{ message.message }}</div>
                  <div
                    class="text-caption mt-1"
                    :class="message.is_admin ? 'text-white' : 'text-grey'"
                  >
                    {{ message.created_at_human }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center pa-8">
              <p class="text-grey">No messages yet. Start the conversation!</p>
            </div>
          </perfect-scrollbar>
          
          <!-- Message Input -->
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="sendReply">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="replyMessage"
                    label="Type your reply..."
                    variant="outlined"
                    density="compact"
                    rows="2"
                    auto-grow
                    :disabled="sendingReply"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn
                    type="submit"
                    color="primary"
                    :loading="sendingReply"
                    :disabled="!replyMessage.trim() || sendingReply"
                  >
                    Send Reply
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        
        <v-card v-else elevation="0" class="rounded-lg d-flex align-center justify-center" style="height: calc(100vh - 200px)">
          <div class="text-center">
            <MessageIcon size="48" class="text-grey mb-4" />
            <p class="text-grey">Select a chat to view messages</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage, errorMessage } from '@/utils/helpers/messages';
import { RefreshIcon, XIcon, MessageIcon } from 'vue-tabler-icons';
import { useSupportChat } from '@/composables/useSupportChat';

export default {
  name: 'SupportChat',
  components: { RefreshIcon, XIcon, MessageIcon },
  
  setup() {
    const { refreshUnreadCount } = useSupportChat();
    return { refreshUnreadCount };
  },
  
  data() {
    return {
      loading: false,
      chatRooms: [],
      selectedRoomId: null,
      selectedRoom: null,
      messages: [],
      replyMessage: '',
      sendingReply: false,
      pollingInterval: null,
    };
  },
  
  mounted() {
    this.getChatRooms();
    // Start polling for new messages every 5 seconds
    this.startPolling();
  },
  
  beforeUnmount() {
    this.stopPolling();
  },
  
  methods: {
    async getChatRooms() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.get(`${base_url}/admin/support-chat/rooms`);
        if (responseData.status) {
          this.chatRooms = responseData.data || [];
        }
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async selectRoom(roomId) {
      this.selectedRoomId = roomId;
      this.selectedRoom = this.chatRooms.find(r => r.id === roomId);
      await this.getRoomMessages(roomId);
    },
    
    async getRoomMessages(roomId) {
      try {
        const responseData = await fetchWrapper.get(`${base_url}/admin/support-chat/room/${roomId}/messages`);
        if (responseData.status) {
          this.messages = responseData.data.messages || [];
          this.selectedRoom = responseData.data.room;
          
          // Update unread count in chatRooms list
          const roomIndex = this.chatRooms.findIndex(r => r.id === roomId);
          if (roomIndex !== -1) {
            this.chatRooms[roomIndex].unread_count = 0;
          }
          
          // Refresh unread count badge
          this.refreshUnreadCount();
          
          // Scroll to bottom
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        errorMessage('Failed to load messages');
      }
    },
    
    async sendReply() {
      if (!this.replyMessage.trim() || !this.selectedRoomId) return;
      
      this.sendingReply = true;
      try {
        const responseData = await fetchWrapper.post(
          `${base_url}/admin/support-chat/room/${this.selectedRoomId}/reply`,
          { message: this.replyMessage }
        );
        
        if (responseData.status) {
          successMessage(responseData.message || 'Reply sent successfully');
          this.replyMessage = '';
          await this.getRoomMessages(this.selectedRoomId);
          await this.getChatRooms(); // Refresh to update last message
          this.refreshUnreadCount(); // Refresh unread count badge
        }
      } catch (error) {
        console.error('Error sending reply:', error);
        errorMessage('Failed to send reply');
      } finally {
        this.sendingReply = false;
      }
    },
    
    scrollToBottom() {
      if (this.$refs.messagesScroll) {
        const scrollContainer = this.$refs.messagesScroll.$el.querySelector('.ps__rail-y');
        if (scrollContainer) {
          const psElement = this.$refs.messagesScroll.$el;
          psElement.scrollTop = psElement.scrollHeight;
        }
      }
    },
    
    startPolling() {
      // Poll for new chat rooms every 10 seconds
      this.pollingInterval = setInterval(() => {
        this.getChatRooms();
        // If a room is selected, refresh its messages
        if (this.selectedRoomId) {
          this.getRoomMessages(this.selectedRoomId);
        }
      }, 10000); // 10 seconds
    },
    
    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
      }
    },
  },
};
</script>

<style scoped>
.bg-primary-lighten-5 {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>

