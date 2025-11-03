<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" class="rounded-lg">
        <v-card-item class="pb-4">
          <v-card-title class="text-h5 d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-map-marker</v-icon>
            Location #{{ selectedRow.id }}
          </v-card-title>
          <v-card-subtitle v-if="selectedRow.status" class="mt-1">
            <v-chip 
              :color="selectedRow.status === 'active' ? 'success' : 'error'" 
              size="small" 
              variant="flat"
            >
              {{ selectedRow.status }}
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

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Name (English)</div>
                <div class="text-body-1 font-weight-medium">{{ selectedRow.name || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Name (Arabic)</div>
                <div class="text-body-1 font-weight-medium">{{ selectedRow.name_ar || '-' }}</div>
              </v-card>
            </v-col>

            <!-- Location Coordinates -->
            <v-col cols="12" class="mt-4 mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Coordinates</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Latitude</div>
                <div class="text-body-1">{{ selectedRow.latitude || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Longitude</div>
                <div class="text-body-1">{{ selectedRow.longitude || '-' }}</div>
              </v-card>
            </v-col>

            <!-- Map URL -->
            <v-col cols="12" v-if="selectedRow.map_url" class="mt-4">
              <v-card variant="outlined" class="pa-3">
                <div class="text-caption text-grey-darken-1 mb-1">Map URL</div>
                <div class="text-body-1">
                  <a :href="selectedRow.map_url" target="_blank" class="text-primary text-decoration-none">
                    {{ selectedRow.map_url }}
                    <v-icon size="small" class="ml-1">mdi-open-in-new</v-icon>
                  </a>
                </div>
              </v-card>
            </v-col>

            <!-- Descriptions -->
            <v-col cols="12" class="mt-4 mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Descriptions</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-2">Description (English)</div>
                <div class="text-body-2">{{ selectedRow.description || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-2">Description (Arabic)</div>
                <div class="text-body-2">{{ selectedRow.description_ar || '-' }}</div>
              </v-card>
            </v-col>

            <!-- Metadata -->
            <v-col cols="12" class="mt-4 mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Metadata</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Status</div>
                <div class="text-body-1">
                  <v-chip 
                    :color="selectedRow.status === 'active' ? 'success' : 'error'" 
                    size="small" 
                    variant="flat"
                  >
                    {{ selectedRow.status || '-' }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Created Date</div>
                <div class="text-body-1">{{ selectedRow.created_at_date || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Created Time</div>
                <div class="text-body-1">{{ selectedRow.created_at_time || '-' }}</div>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
.h-100 {
  height: 100%;
}
</style>
