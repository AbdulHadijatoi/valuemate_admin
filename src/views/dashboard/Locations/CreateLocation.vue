<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {

  data() {
    return {
      loading: false,
      form: [],
    }
  },

  methods: {
    async saveData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/locations/create`, { 
          ...this.form,
        });
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Add New Location</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>

              <v-col cols="4">
                <v-text-field density="compact" v-model="form.name" label="Name" required />
              </v-col>

              <v-col cols="4">
                <v-text-field
                  type="number"
                min="0"
                density="compact" v-model="form.latitude" label="Latitude" />
              </v-col>

              <v-col cols="4">
                <v-text-field
                type="number"
                min="0"
                 density="compact" v-model="form.longitude" label="Longitude" />
              </v-col>

              <v-col cols="12">
                <v-textarea density="compact" v-model="form.description" label="Description" />
              </v-col>
              
              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="x-large" :disabled="loading" color="primary" type="submit">
                  Save
                </v-btn>
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
