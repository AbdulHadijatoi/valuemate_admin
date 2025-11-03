<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    selectedRow: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      loading: false,
      form: [],
      file: null,
    }
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/locations/update/${this.form.id}`, { 
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
    this.form = { ...this.selectedRow };
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Edit Location - #{{ selectedRow.id }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>
              <!-- Name Fields -->
              <v-col cols="12" md="6">
                <v-text-field 
                  variant="outlined"
                  density="compact" 
                  v-model="form.name" 
                  label="Name (English)" 
                  required 
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field 
                  variant="outlined"
                  density="compact" 
                  v-model="form.name_ar" 
                  label="Name (Arabic)" 
                />
              </v-col>

              <!-- Coordinates -->
              <v-col cols="12" md="6">
                <v-text-field
                  variant="outlined"
                  type="number"
                  min="0"
                  density="compact" 
                  v-model="form.latitude" 
                  label="Latitude" 
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  variant="outlined"
                  type="number"
                  min="0"
                  density="compact" 
                  v-model="form.longitude" 
                  label="Longitude" 
                />
              </v-col>

              <!-- Status -->
              <v-col cols="12" md="6">
                <v-select 
                  variant="outlined"
                  density="compact"
                  v-model="form.status"
                  :items="['active', 'inactive']"
                  label="Status"
                />
              </v-col>

              <!-- Description Fields -->
              <v-col cols="12" md="6">
                <v-textarea 
                  variant="outlined"
                  density="compact" 
                  v-model="form.description" 
                  label="Description (English)"
                  rows="3"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea 
                  variant="outlined"
                  density="compact" 
                  v-model="form.description_ar" 
                  label="Description (Arabic)"
                  rows="3"
                />
              </v-col>
              
              <!-- Submit Button -->
              <v-col cols="12" class="text-right mt-2">
                <v-btn elevation="0" size="x-large" :disabled="loading" color="primary" type="submit">
                  Update
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
