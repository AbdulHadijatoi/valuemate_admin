<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    company: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      loading: false,
      form: [],
      file: null,
    }
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/companies/update/${this.form.id}`, { 
          ...this.form,
          file: this.file
        });
        successMessage(responseData.message);
        this.$emit('close');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },

    handleFileUpload(e) {
      this.file = e.target.files[0];
    }
  },

  mounted() {
    this.form = { ...this.company };
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Edit Company - {{ company.name }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>
              <!-- Company Image Upload -->
              <v-col cols="12">
                <v-file-input
                  label="Upload Company Image"
                  v-model="file"
                  accept="image/*"
                />
                <div class="mt-2">
                  <a :href="form.file" target="_blank" v-if="form.file">
                    <img
                      :src="form.file"
                      alt="Company Image"
                      class="rounded"
                      style="max-width: 100px; max-height: 100px;"
                    />
                  </a>
                </div>
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="form.name" label="Name" required />
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="form.address" label="Address" />
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="form.phone" label="Phone" />
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="form.email" label="Email" />
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="form.website" label="Website" />
              </v-col>

              <v-col cols="6">
                <v-select
                  v-model="form.status"
                  :items="['active', 'inactive']"
                  label="Status"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea v-model="form.description" label="Description" />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn :disabled="loading" color="primary" type="submit">
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
