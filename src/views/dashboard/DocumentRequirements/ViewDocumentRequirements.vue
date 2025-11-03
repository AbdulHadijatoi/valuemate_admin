<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" class="rounded-lg">
        <v-card-item class="pb-4">
          <v-card-title class="text-h5 d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-file-document</v-icon>
            Document Requirement #{{ selectedRow.id }}
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <v-chip 
              :color="selectedRow.is_file ? 'info' : 'warning'" 
              size="small" 
              variant="flat"
            >
              {{ selectedRow.is_file ? 'File Upload Required' : 'Text Input Required' }}
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
                <div class="text-caption text-grey-darken-1 mb-1">Document Name (English)</div>
                <div class="text-body-1 font-weight-medium">{{ selectedRow.document_name || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Document Name (Arabic)</div>
                <div class="text-body-1 font-weight-medium">{{ selectedRow.document_name_ar || '-' }}</div>
              </v-card>
            </v-col>

            <!-- Type Information -->
            <v-col cols="12" class="mt-4 mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Type Information</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Service Type</div>
                <div class="text-body-1">{{ selectedRow.service_type_name || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Property Type</div>
                <div class="text-body-1">{{ selectedRow.property_type_name || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Input Type</div>
                <div class="text-body-1">
                  <v-chip 
                    :color="selectedRow.is_file ? 'info' : 'warning'" 
                    size="small" 
                    variant="flat"
                  >
                    {{ selectedRow.is_file ? 'File Upload' : 'Text Input' }}
                  </v-chip>
                </div>
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
