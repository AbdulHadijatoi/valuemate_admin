<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" class="rounded-lg">
        <v-card-item class="pb-4">
          <v-card-title class="text-h5 d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-toolbox</v-icon>
            {{ selectedRow.name }}
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
                <div class="text-caption text-grey-darken-1 mb-1">ID</div>
                <div class="text-body-1 font-weight-medium">#{{ selectedRow.id }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Service Type (English)</div>
                <div class="text-body-1 font-weight-medium">{{ selectedRow.name || '-' }}</div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card variant="outlined" class="pa-3 h-100">
                <div class="text-caption text-grey-darken-1 mb-1">Service Type (Arabic)</div>
                <div class="text-body-1 font-weight-medium">{{ selectedRow.name_ar || '-' }}</div>
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
