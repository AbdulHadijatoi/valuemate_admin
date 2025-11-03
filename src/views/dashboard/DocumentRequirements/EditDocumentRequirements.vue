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
      form: []
    }
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/document-requirements/update/${this.form.id}`, { 
          document_name: this.form.document_name,
          document_name_ar: this.form.document_name_ar,
          is_file: this.form.is_file
        });
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
        this.$emit('filterData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },

  },

  mounted() {
    // this.form = { ...this.selectedRow };

    this.form = { 
      ...this.selectedRow,
      is_file: this.selectedRow.is_file == 1 // convert to true/false
    };
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Edit Document Requirement - #{{ form.id }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>

              <v-col cols="6">
                <v-text-field v-model="form.document_name" label="Document Name (English)" required />
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="form.document_name_ar" label="Document Name (Arabic)" />
              </v-col>

              <v-col cols="12">
                <v-switch
                  v-model="form.is_file"
                  label="Enable for File Upload (Disable for Text Input)"
                  density="compact"
                  inset
                  color="primary"
                />
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
