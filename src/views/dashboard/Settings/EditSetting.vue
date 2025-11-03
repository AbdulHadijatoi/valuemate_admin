<template>
  <v-card elevation="0" class="rounded-lg">
    <v-card-text class="pa-6">
      <!-- Text Setting Form -->
      <v-form v-if="!selectedRow.is_file" @submit.prevent="updateData">
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-bold mb-1">Edit Text Setting</div>
          <div class="text-caption text-grey-darken-1">
            Update the value for setting: <strong>{{ selectedRow.key }}</strong>
          </div>
        </div>

        <v-row>
          <v-col cols="12">
            <v-card variant="outlined" class="pa-3 mb-4">
              <div class="text-caption text-grey-darken-1 mb-1">Setting Key (Read-only)</div>
              <div class="text-body-1 font-weight-medium">
                <v-chip color="primary" variant="tonal" size="small">
                  {{ form.key }}
                </v-chip>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-text-field
              variant="outlined"
              density="compact"
              v-model="form.value" 
              label="Setting Value" 
              required
              hint="Update the value for this setting"
              persistent-hint
            />
          </v-col>

          <v-col cols="12" class="text-right mt-2">
            <v-btn 
              elevation="0" 
              size="large" 
              :disabled="loading" 
              color="primary" 
              type="submit"
              :loading="loading"
            >
              Update Setting
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Image Upload Form -->
      <v-form v-else @submit.prevent="uploadFile">
        <div class="mb-4">
          <div class="text-subtitle-1 font-weight-bold mb-1">Edit Image Setting</div>
          <div class="text-caption text-grey-darken-1">
            Update the image for setting: <strong>{{ selectedRow.key }}</strong>
          </div>
        </div>

        <v-row>
          <v-col cols="12">
            <v-card variant="outlined" class="pa-3 mb-4">
              <div class="text-caption text-grey-darken-1 mb-1">Setting Key (Read-only)</div>
              <div class="text-body-1 font-weight-medium">
                <v-chip color="primary" variant="tonal" size="small">
                  {{ form.key }}
                </v-chip>
              </div>
            </v-card>
          </v-col>

          <!-- Current Image Preview -->
          <v-col cols="12" v-if="form.value">
            <v-card variant="outlined" class="pa-4 mb-4">
              <div class="text-caption text-grey-darken-1 mb-2">Current Image</div>
              <div class="d-flex align-center">
                <v-avatar size="80" class="mr-3">
                  <v-img
                    :src="form.value"
                    :alt="form.key"
                    cover
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular indeterminate color="primary" size="small"></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-avatar>
                <div class="flex-grow-1">
                  <a 
                    :href="form.value" 
                    target="_blank" 
                    class="text-primary text-decoration-none d-flex align-center"
                  >
                    View Full Image
                  </a>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card variant="outlined" class="pa-4">
              <div class="text-caption text-grey-darken-1 mb-2">New Image File</div>
              <v-file-input
                variant="outlined"
                density="compact"
                label="Upload New Image"
                v-model="file"
                accept="image/*"
                hint="Select a new image file to replace the current one"
                persistent-hint
                show-size
              />
            </v-card>
          </v-col>

          <v-col cols="12" class="text-right mt-2">
            <v-btn 
              elevation="0" 
              size="large" 
              :disabled="loading || !file" 
              color="primary" 
              type="submit"
              :loading="loading"
            >
              Update Image
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
        const responseData = await fetchWrapper.post(`${base_url}/admin/settings/update/${this.form.key}`, { 
          ...this.form
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
