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
      form: [],
      is_file: true,
    }
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const isFileFlag = this.is_file ? 1 : 0;
        const responseData = await fetchWrapper.post(`${base_url}/admin/document-requirements/update/${this.form.id}`, { 
          ...this.form,
          is_file: isFileFlag
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
    this.form = { ...this.selectedRow };
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Edit Document Requirement - #{{ selectedRow.id }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>

              <v-col cols="12">
                <v-text-field v-model="form.document_name" label="Name" required />
              </v-col>

              <v-col cols="12" md="4">
                <v-switch
                  v-model="is_file"
                  label="Is File (Disable it, if TEXT input needed)"
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
