<script setup>
import { ref, onMounted } from 'vue';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { base_url,domain } from '@/utils/config';
import { RouterLink } from 'vue-router';

const logo = ref('');
const loading = ref(true);

const getLogo = async () => {
  try {
    const responseData = await fetchWrapper.post(`${base_url}/settings`, { 
      key: 'admin_logo',
    });

    if (responseData && responseData.data) {
      logo.value = responseData.data?domain + responseData.data : '';
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getLogo();
});
</script>

<template>
  <div class="logo">
    <RouterLink to="/">
      <img v-if="logo" :src="logo" height="100px" alt="logo" />
    </RouterLink>
  </div>
</template>
