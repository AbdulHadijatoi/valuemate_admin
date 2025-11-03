<template>
  <div class="pa-6">
    <v-card elevation="0" class="rounded-lg">
      <v-card-item class="pb-4">
        <v-card-title class="text-h5 d-flex align-center">
          Setting Details
        </v-card-title>
        <v-card-subtitle class="mt-1">
          <v-chip 
            :color="selectedRow.is_file ? 'info' : 'success'" 
            size="small" 
            variant="flat"
          >
            {{ selectedRow.is_file ? 'Image Setting' : 'Text Setting' }}
          </v-chip>
        </v-card-subtitle>
      </v-card-item>
      
      <v-divider></v-divider>
      
      <v-card-text class="pt-6">
        <v-row>
          <!-- Basic Information -->
          <v-col cols="12" class="mb-4">
            <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Basic Information</div>
          </v-col>

          <v-col cols="12">
            <v-card variant="outlined" class="pa-4">
              <div class="text-caption text-grey-darken-1 mb-2">Setting Key</div>
              <div class="text-body-1 font-weight-medium">
                <v-chip color="primary" variant="tonal" size="default">
                  {{ selectedRow.key || '-' }}
                </v-chip>
              </div>
            </v-card>
          </v-col>

          <!-- Value Display -->
          <v-col cols="12" class="mt-4">
            <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">
              {{ selectedRow.is_file ? 'Image Value' : 'Text Value' }}
            </div>
          </v-col>

          <!-- Image Display -->
          <v-col cols="12" v-if="selectedRow.is_file && selectedRow.value">
            <v-card variant="outlined" class="pa-4">
              <div class="text-caption text-grey-darken-1 mb-3">Image Preview</div>
              <div class="d-flex flex-column align-center">
                <v-card class="pa-2 mb-3" variant="outlined" style="max-width: 300px;">
                  <v-img
                    :src="selectedRow.value"
                    :alt="selectedRow.key"
                    cover
                    style="border-radius: 4px;"
                    height="200"
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-card>
                <div>
                <a 
                  :href="selectedRow.value" 
                  target="_blank" 
                  class="text-primary text-decoration-none d-flex align-center"
                >
                  Open Full Image
                </a>
                </div>
              </div>
              <v-divider class="my-4"></v-divider>
              <div class="text-caption text-grey-darken-1 mb-1">Image URL</div>
              <div class="text-body-2 text-break">
                <a 
                  :href="selectedRow.value" 
                  target="_blank" 
                  class="text-primary text-decoration-none"
                >
                  {{ selectedRow.value }}
                </a>
              </div>
            </v-card>
          </v-col>

          <!-- Text Value Display -->
          <v-col cols="12" v-else>
            <v-card variant="outlined" class="pa-4">
              <div class="text-caption text-grey-darken-1 mb-2">Setting Value</div>
              <div class="text-body-1">
                <v-chip 
                  variant="text"
                  color="grey-darken-1"
                  size="default"
                >
                  {{ selectedRow.value || '-' }}
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    selectedRow: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>
.text-break {
  word-break: break-all;
}
</style>
