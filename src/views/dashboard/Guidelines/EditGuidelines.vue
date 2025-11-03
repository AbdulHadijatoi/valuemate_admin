<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-between">
          <span>
            Edit - {{ selectedRow.type }}
          </span>
          <v-spacer></v-spacer>
          <v-btn elevation="0" :disabled="loading" color="primary" @click="updateData">
            Save
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-row>
              <!-- Title Fields -->
              <v-col cols="12" md="6">
                <v-text-field 
                  variant="outlined"
                  density="compact"
                  v-model="form.title" 
                  label="Title (English)" 
                  required 
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field 
                  variant="outlined"
                  density="compact"
                  v-model="form.title_ar" 
                  label="Title (Arabic)" 
                />
              </v-col>

              <!-- Description Fields -->
              <v-col cols="12" md="6">
                <div class="mb-2"><strong>Description (English)</strong></div>
                <quill-editor
                  v-model:content="form.description"
                  content-type="html"
                  theme="snow"
                  style="height: 300px;"
                />
              </v-col>

              <v-col cols="12" md="6">
                <div class="mb-2"><strong>Description (Arabic)</strong></div>
                <quill-editor
                  v-model:content="form.description_ar"
                  content-type="html"
                  theme="snow"
                  style="height: 300px;"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: { QuillEditor },

  props: {
    selectedRow: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      form: {
        id: null,
        title: '',
        title_ar: '',
        description: '',
        description_ar: '',
      },
      file: null,
    };
  },

  mounted() {
    this.form.id = this.selectedRow.id || null;
    this.form.title = this.selectedRow.title || '';
    this.form.title_ar = this.selectedRow.title_ar || '';
    this.form.description = this.selectedRow.description || '';
    this.form.description_ar = this.selectedRow.description_ar || '';
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const payload = {
          id: this.form.id,
          title: this.form.title,
          title_ar: this.form.title_ar,
          description: this.form.description, // this will be HTML
          description_ar: this.form.description_ar, // this will be HTML
        };

        console.log('Sending to backend:', payload); // Optional: for debug

        const responseData = await fetchWrapper.post(
          `${base_url}/admin/guidelines/update/${this.form.id}`,
          payload
        );

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
};
</script>
