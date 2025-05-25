<script>
import { base_url } from '@/utils/config';
import '@vuepic/vue-datepicker/dist/main.css';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage, errorMessage } from '@/utils/helpers/messages';

export default {
  props: {
    selectedRow: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      form: [],
    };
  },

  mounted() {
    const docs = this.selectedRow.required_documents || this.selectedRow.requiredDocuments || [];
    this.form = docs.map(doc => ({
      document_requirement_id: doc.id,
      document_file: null
    }));
  },

  methods: {
    async uploadDocuments() {
      this.loading = true;

      try {
        const formData = new FormData();
        formData.append('valuation_request_id', this.selectedRow.id);

        this.form.forEach(entry => {
          formData.append('document_requirement_id[]', entry.document_requirement_id);
          formData.append('document_file[]', entry.document_file);
        });

        const responseData = await fetchWrapper.post(`${base_url}/admin/valuation-requests/upload-documents`,formData);

        if (responseData?.status) {
          successMessage('Documents uploaded successfully.');
        } else {
          errorMessage(responseData?.message || 'Upload failed.');
        }

      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>
              Upload Documents for Request #{{ selectedRow.id }}
            </v-card-title>
          </div>
        </v-card-item>

        <v-divider></v-divider>

        <v-card-text>
          <h3 class="mb-3">Upload Documents</h3>

          <v-row v-for="(entry, index) in form" :key="index" class="mb-4">
            <v-col cols="12">
              <v-file-input
                :label="'Upload ' + selectedRow.required_documents[index].document_name"
                v-model="entry.document_file"
                show-size
              />
            </v-col>
          </v-row>


          <v-btn elevation="0" size="large" color="primary" @click="uploadDocuments" :loading="loading">
            Upload
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
input[type="file"] {
  padding-top: 10px;
}
</style>
