<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    property_types: {
      type: Object,
      required: true,
    },
    service_types: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      form: [],
      is_file: true,
      file: null,
      filter: {
        property_type_id: null,
        service_type_id: null
      }
    }
  },

  methods: {
    async saveData() {
      this.loading = true;
      try {
        const isFileFlag = this.is_file ? 1 : 0;

        // If it's a file, use FormData so files upload correctly
        let payload;
        if (this.is_file && this.file) {
          payload = new FormData();
          payload.append('document_name', this.form.document_name || '');
          payload.append('property_type_id', this.filter.property_type_id || '');
          payload.append('service_type_id', this.filter.service_type_id || '');
          payload.append('is_file', String(isFileFlag));
          // file input name expected by backend: 'file' (adjust if backend expects different name)
          payload.append('file', this.file);
        } else {
          payload = {
            ...this.form,
            property_type_id: this.filter.property_type_id,
            service_type_id: this.filter.service_type_id,
            is_file: isFileFlag
          };
        }

        const responseData = await fetchWrapper.post(`${base_url}/admin/document-requirements/create`, payload);
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    //
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Create Service Type</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>
              
              <v-col cols="12" md="6">
                <v-autocomplete 
                  v-model="filter.property_type_id" 
                  chips hide-no-data
                  variant="outlined"
                  density="compact"
                  :items="property_types"
                  label="Filter by Property Type"
                  item-title="name"
                  item-value="id"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete 
                  v-model="filter.service_type_id" 
                  chips hide-no-data
                  variant="outlined"
                  density="compact"
                  :items="service_types"
                  label="Filter by Service Type"
                  item-title="name"
                  item-value="id"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field density="compact" variant="outlined" v-model="form.document_name" label="Document Name" required />
              </v-col>

              <v-col cols="12" md="4">
                <v-switch
                  v-model="is_file"
                  label="Is File"
                  density="compact"
                  inset
                  color="primary"
                />
              </v-col>

              <v-col cols="12" md="8">
                <div v-if="is_file">
                  <input type="file" @change="(e) => file = e.target.files[0]" />
                </div>
                <div v-else>
                  <v-text-field density="compact" variant="outlined" v-model="form.text_value" label="Text Value" />
                </div>
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="x-large" :disabled="loading" color="primary" type="submit">
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
