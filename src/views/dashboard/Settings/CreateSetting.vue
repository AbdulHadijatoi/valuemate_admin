<template>
  <v-card elevation="0" class="rounded-lg">
    <v-card-text class="pa-6">
      <!-- Text Setting Form -->
      <v-form v-if="!is_file" @submit.prevent="saveSetting">
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-bold mb-1">Create Text Setting</div>
          <div class="text-caption text-grey-darken-1">
            Create a new text-based setting option
          </div>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              variant="outlined"
              density="compact"
              v-model="form.key" 
              label="Setting Key" 
              required
              hint="Unique identifier for this setting"
              persistent-hint
            />
          </v-col>
          
          <v-col cols="12" md="6">
            <v-text-field
              variant="outlined"
              density="compact"
              v-model="form.value" 
              label="Setting Value" 
              required
              hint="The value for this setting"
              persistent-hint
            />
          </v-col>

          <v-col cols="12" class="text-right mt-2">
            <v-btn 
              elevation="0" 
              size="large" 
              :disabled="loading || !form.key || !form.value" 
              color="primary" 
              type="submit"
              :loading="loading"
            >
              Save Setting
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Image Upload Form -->
      <v-form v-else @submit.prevent="uploadFile">
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-bold mb-1">Create Image Setting</div>
          <div class="text-caption text-grey-darken-1">
            Upload an image file for this setting
          </div>
        </div>

        <v-row>
          <v-col cols="12">
            <v-text-field
              variant="outlined"
              density="compact"
              v-model="form.key" 
              label="Setting Key" 
              required
              hint="Unique identifier for this image setting"
              persistent-hint
            />
          </v-col>

          <v-col cols="12">
            <v-card variant="outlined" class="pa-4">
              <div class="text-caption text-grey-darken-1 mb-2">Image File</div>
              <v-file-input
                variant="outlined"
                density="compact"
                label="Upload Image"
                v-model="file"
                accept="image/*"
                hint="Select an image file to upload"
                persistent-hint
                show-size
              />
            </v-card>
          </v-col>

          <v-col cols="12" class="text-right mt-2">
            <v-btn 
              elevation="0" 
              size="large" 
              :disabled="loading || !form.key || !file" 
              color="primary" 
              type="submit"
              :loading="loading"
            >
              Upload Image
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    is_file: {
      type: Boolean,
      required: true,
    }
  },

  data() {
    return {
      loading: false,
      form: {
        key: '',
        value: ''
      },
      file: null,
    }
  },

  methods: {
    async saveSetting() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/settings/create`, { 
          ...this.form
        });
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
        // Reset form
        this.form = { key: '', value: '' };
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },
    
    async uploadFile() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('key', this.form.key);
        
        // Append file if it exists
        const fileValue = Array.isArray(this.file)
          ? this.file[0] || null
          : this.file || null;
        
        if (fileValue instanceof File) {
          formData.append('value', fileValue);
        }
        
        const responseData = await fetchWrapper.post(`${base_url}/admin/settings/upload-image`, formData);
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
        // Reset form
        this.form = { key: '', value: '' };
        this.file = null;
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>
