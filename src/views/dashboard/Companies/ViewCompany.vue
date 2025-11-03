<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" class="rounded-lg">
        <v-card-item class="pb-4">
          <v-card-title class="text-h5 d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-office-building</v-icon>
            {{ company.name }}
          </v-card-title>
          <v-card-subtitle v-if="company.status" class="mt-1">
            <v-chip 
              :color="company.status === 'active' ? 'success' : 'error'" 
              size="small" 
              variant="flat"
            >
              {{ company.status }}
            </v-chip>
          </v-card-subtitle>
        </v-card-item>
        
        <v-divider></v-divider>
        
        <v-card-text class="pt-6">
          <!-- Company Image -->
          <div class="mb-6" v-if="company.file">
            <div class="text-subtitle-2 font-weight-medium mb-2 text-grey-darken-1">Company Image</div>
            <v-card class="pa-2" variant="outlined" style="max-width: 200px;">
              <v-img
                :src="company.file"
                :alt="company.name"
                cover
                style="border-radius: 4px;"
                height="150"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-card>
          </div>

          <v-row>
            <!-- Basic Information -->
            <v-col cols="12" class="mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Basic Information</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Name (English)</div>
                <div class="text-body-1 font-weight-medium">{{ company.name || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Name (Arabic)</div>
                <div class="text-body-1 font-weight-medium">{{ company.name_ar || '-' }}</div>
              </v-card>
            </v-col>

            <!-- Contact Information -->
            <v-col cols="12" class="mt-4 mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Contact Information</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Address</div>
                <div class="text-body-1">{{ company.address || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Phone</div>
                <div class="text-body-1">{{ company.phone || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Email</div>
                <div class="text-body-1">
                  <a v-if="company.email" :href="`mailto:${company.email}`" class="text-primary text-decoration-none">
                    {{ company.email }}
                  </a>
                  <span v-else>-</span>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Website</div>
                <div class="text-body-1">
                  <a v-if="company.website" :href="company.website" target="_blank" class="text-primary text-decoration-none">
                    {{ company.website }}
                    <v-icon size="small" class="ml-1">mdi-open-in-new</v-icon>
                  </a>
                  <span v-else>-</span>
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
                <div class="text-body-2">{{ company.description || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-2">Description (Arabic)</div>
                <div class="text-body-2">{{ company.description_ar || '-' }}</div>
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
                    :color="company.status === 'active' ? 'success' : 'error'" 
                    size="small" 
                    variant="flat"
                  >
                    {{ company.status || '-' }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Created Date</div>
                <div class="text-body-1">{{ company.created_at_date || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Created Time</div>
                <div class="text-body-1">{{ company.created_at_time || '-' }}</div>
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
    company: {
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
