<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { VueDatePicker},

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
      dateRange: null,
    }
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const formData = new FormData();
        
        // Append all form fields
        if (this.form.title) formData.append('title', this.form.title);
        if (this.form.title_ar) formData.append('title_ar', this.form.title_ar);
        if (this.form.link) formData.append('link', this.form.link);
        if (this.form.ad_type) formData.append('ad_type', this.form.ad_type);
        if (this.form.description) formData.append('description', this.form.description);
        if (this.form.description_ar) formData.append('description_ar', this.form.description_ar);
        if (this.dateRange) {
          formData.append('start_date', this.formatDate(this.dateRange[0]));
          formData.append('end_date', this.formatDate(this.dateRange[1]));
        } else {
          if (this.form.start_date) formData.append('start_date', this.form.start_date);
          if (this.form.end_date) formData.append('end_date', this.form.end_date);
        }
        
        // Append file if it exists
        // v-file-input may return a File or an array; normalize to a single File or null
        const fileValue = Array.isArray(this.file)
          ? this.file[0] || null
          : this.file || null;
        
        if (fileValue instanceof File) {
          formData.append('file', fileValue);
        }
        
        const responseData = await fetchWrapper.post(`${base_url}/admin/banner-ads/update/${this.form.id}`, formData);
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },
    formatDate (date) {
      if (!date) return '';
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

  },

  mounted() {
    this.form = { ...this.selectedRow };
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Edit Banner Ad - {{ selectedRow.title }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>

              <v-col cols="12">
                <v-file-input
                  variant="outlined"
                  density="compact"
                  label="Upload Banner Image"
                  v-model="file"
                  accept="image/*"
                />
                <div class="mt-2">
                  <a :href="form.image_url" target="_blank" v-if="form.image_url">
                    <img
                      :src="form.image_url"
                      alt="Banner Image"
                      class="rounded"
                      style="max-width: 100px; max-height: 100px;"
                    />
                  </a>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <VueDatePicker v-model="dateRange" range :placeholder="`Ad active from ${form.start_date} to ${form.end_date}`" :clearable="true"/>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.title" 
                  label="Title (English)"
                  required />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.title_ar" 
                  label="Title (Arabic)" />
              </v-col>

              <!-- <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.link" 
                  label="Target Link" />
              </v-col> -->

              <v-col cols="6">
                <v-select
                  variant="outlined"
                  density="compact"
                  v-model="form.ad_type"
                  :items="['daily', 'weekly', 'monthly', 'permanent']"
                  label="Ad Type"
                />
              </v-col>

              <v-col cols="6">
                <v-textarea
                  variant="outlined"
                  density="compact"
                  v-model="form.description" label="Description (English)" />
              </v-col>

              <v-col cols="6">
                <v-textarea
                  variant="outlined"
                  density="compact"
                  v-model="form.description_ar" label="Description (Arabic)" />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="x-large" :disabled="loading" color="primary" type="submit">
                  Update
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
