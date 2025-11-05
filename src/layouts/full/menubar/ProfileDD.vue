<script setup lang="ts">
import { ref } from 'vue';
import { SettingsIcon, LogoutIcon, LockIcon, XIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { base_url } from '@/utils/config';
import { successMessage, errorMessage } from '@/utils/helpers/messages';

const authStore = useAuthStore();
const user = JSON.parse(localStorage.getItem('user') || '');

// Password change dialog
const showPasswordDialog = ref(false);
const loading = ref(false);
const passwordForm = ref({
  current_password: '',
  password: '',
  password_confirmation: ''
});
const passwordErrors = ref<Record<string, string[]>>({});

function greetingMessage() {
  const currentHour = new Date().getHours();
  
  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
}

async function changePassword() {
  // Reset errors
  passwordErrors.value = {};
  loading.value = true;

  try {
    const responseData = await fetchWrapper.post(`${base_url}/change-password`, {
      current_password: passwordForm.value.current_password,
      password: passwordForm.value.password,
      password_confirmation: passwordForm.value.password_confirmation
    });

    if (responseData.status) {
      successMessage(responseData.message || 'Password changed successfully');
      // Reset form and close dialog
      passwordForm.value = {
        current_password: '',
        password: '',
        password_confirmation: ''
      };
      showPasswordDialog.value = false;
    }
  } catch (error: any) {
    // Handle validation errors
    if (error?.response?.data?.errors) {
      passwordErrors.value = error.response.data.errors;
    } else if (error?.response?.data?.message) {
      errorMessage(error.response.data.message);
    }
  } finally {
    loading.value = false;
  }
}

function closePasswordDialog() {
  showPasswordDialog.value = false;
  passwordForm.value = {
    current_password: '',
    password: '',
    password_confirmation: ''
  };
  passwordErrors.value = {};
}
</script>

<template>
  <div class="pa-4">
    <h4 class="mb-n1">{{greetingMessage()}}, <span class="font-weight-regular">{{user?.first_name}} {{user?.last_name}}</span></h4>
    <span class="text-subtitle-2 text-medium-emphasis">{{user?.email}}</span>

    <perfect-scrollbar>
      <v-list class="mt-3">
        <v-list-item @click="showPasswordDialog = true" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LockIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Change Password</v-list-item-title>
        </v-list-item>
        
        <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>

    <!-- Change Password Dialog -->
    <v-dialog v-model="showPasswordDialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <span class="text-h5">Change Password</span>
          <v-btn icon variant="text" @click="closePasswordDialog" size="small">
            <XIcon size="20" />
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pt-6">
          <v-form @submit.prevent="changePassword">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="passwordForm.current_password"
                  label="Current Password"
                  type="password"
                  variant="outlined"
                  density="compact"
                  :error-messages="passwordErrors.current_password"
                  required
                  autocomplete="current-password"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="passwordForm.password"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  density="compact"
                  :error-messages="passwordErrors.password"
                  required
                  autocomplete="new-password"
                  hint="Password must be at least 6 characters"
                  persistent-hint
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="passwordForm.password_confirmation"
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  density="compact"
                  :error-messages="passwordErrors.password_confirmation"
                  required
                  autocomplete="new-password"
                />
              </v-col>

              <v-col cols="12" class="d-flex justify-end gap-2">
                <v-btn
                  variant="outlined"
                  color="secondary"
                  @click="closePasswordDialog"
                  :disabled="loading"
                >
                  Cancel
                </v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  :loading="loading"
                  :disabled="loading"
                >
                  Change Password
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
