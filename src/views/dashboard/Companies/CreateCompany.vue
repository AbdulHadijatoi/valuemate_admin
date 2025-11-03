<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  
  data() {
    return {
      loading: false,
      form: [],
      file: null,
    }
  },

  methods: {
    async saveData() {
      this.loading = true;
      try {
        const formData = new FormData();
        
        // Append all form fields
        Object.keys(this.form).forEach(key => {
          if (this.form[key] !== null && this.form[key] !== undefined) {
            formData.append(key, this.form[key]);
          }
        });
        
        // Append file if it exists
        // v-file-input may return a File or an array; normalize to a single File or null
        const fileValue = Array.isArray(this.file)
          ? this.file[0] || null
          : this.file || null;
        
        if (fileValue instanceof File) {
          formData.append('file', fileValue);
        }
        
        const responseData = await fetchWrapper.post(`${base_url}/admin/companies/create`, formData);
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
    //
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Create Company</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>
              <!-- Company Image Upload -->
              <v-col cols="12">
                <v-file-input
                  variant="outlined"
                  density="compact"
                  label="Upload Company Image"
                  v-model="file"
                  accept="image/*"
                />
              </v-col>

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

              <!-- Contact Information -->
              <v-col cols="12" md="6">
                <v-text-field 
                  variant="outlined"
                  density="compact"
                  v-model="form.address" 
                  label="Address" 
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field 
                  variant="outlined"
                  density="compact"
                  v-model="form.phone" 
                  label="Phone" 
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field 
                  variant="outlined"
                  density="compact"
                  v-model="form.email" 
                  label="Email" 
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field 
                  variant="outlined"
                  density="compact"
                  v-model="form.website" 
                  label="Website" 
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
