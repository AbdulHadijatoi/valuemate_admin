<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" class="rounded-lg">
        <v-card-item class="pb-4">
          <v-card-title class="text-h5 d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-file-document-edit</v-icon>
            {{ selectedRow.type }}
          </v-card-title>
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

            <!-- Descriptions -->
            <v-col cols="12" class="mt-4 mb-4">
              <div class="text-subtitle-1 font-weight-bold mb-3 text-primary">Descriptions</div>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-4 h-100">
                <div class="text-caption text-grey-darken-1 mb-3 font-weight-medium">Description (English)</div>
                <div class="text-body-2" v-html="selectedRow.description || '-'"></div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-4 h-100">
                <div class="text-caption text-grey-darken-1 mb-3 font-weight-medium">Description (Arabic)</div>
                <div class="text-body-2" v-html="selectedRow.description_ar || '-'"></div>
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

/* Style for HTML content in descriptions */
:deep(.v-card__text) {
  line-height: 1.6;
}

:deep(.v-card__text p) {
  margin-bottom: 0.5rem;
}

:deep(.v-card__text ul),
:deep(.v-card__text ol) {
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
