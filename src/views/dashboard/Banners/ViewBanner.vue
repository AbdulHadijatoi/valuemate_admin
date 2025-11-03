<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" class="rounded-lg">
        <v-card-item class="pb-4">
          <v-card-title class="text-h5 d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-image-multiple</v-icon>
            Banner Ad #{{ selectedRow.id }}
          </v-card-title>
        </v-card-item>
        
        <v-divider></v-divider>
        
        <v-card-text class="pt-6">
          <!-- Banner Image -->
          <div class="mb-6" v-if="selectedRow.image_url">
            <div class="text-subtitle-2 font-weight-medium mb-2 text-grey-darken-1">Banner Image</div>
            <v-card class="pa-2" variant="outlined" style="max-width: 400px;">
              <v-img
                :src="selectedRow.image_url"
                :alt="selectedRow.title"
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
            <div class="mt-2">
              <a :href="selectedRow.image_url" target="_blank" class="text-primary text-decoration-none text-caption">
                View Full Image <v-icon size="small" class="ml-1">mdi-open-in-new</v-icon>
              </a>
            </div>
          </div>

          <v-row>
            <!-- Basic Information -->
            <v-col cols="12" class="mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Basic Information</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Title (English)</div>
                <div class="text-body-1 font-weight-medium">{{ selectedRow.title || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Title (Arabic)</div>
                <div class="text-body-1 font-weight-medium">{{ selectedRow.title_ar || '-' }}</div>
              </v-card>
            </v-col>

            <!-- Ad Details -->
            <v-col cols="12" class="mt-4 mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Ad Details</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Ad Type</div>
                <div class="text-body-1">
                  <v-chip size="small" variant="flat" color="primary">
                    {{ selectedRow.ad_type || '-' }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Start Date</div>
                <div class="text-body-1">{{ selectedRow.start_date || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">End Date</div>
                <div class="text-body-1">{{ selectedRow.end_date || '-' }}</div>
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
