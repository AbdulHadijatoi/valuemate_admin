<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    service_types: {
      type: Object,
      required: true,
    },
    property_types: {
      type: Object,
      required: true,
    },
    companies: {
      type: Object,
      required: true,
    },
    request_types: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      filtered_service_types: [],
      filter: {
        property_type_id: null,
        service_type_id: null,
        company_id: null,
        request_type_id: null,
        area_from: null,
        area_to: null,
        price: null,
      }
    }
  },

  methods: {
    async saveData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/service-pricing/create`, { 
          ...this.filter
        });
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
        <v-card-title>Create Pricing Rule</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>
              

              <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.property_type_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="property_types"
                label="Property Type"
                item-title="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.service_type_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="service_types"
                label="Service Type"
                item-title="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.company_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="companies"
                label="Company"
                item-title="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.request_type_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="request_types"
                label="Request Type"
                item-title="name"
                item-value="id"
              />
            </v-col>
            
            <v-col cols="12" md="4">
              <v-text-field
                v-model="filter.area_from"
                label="Area From"
                type="number"
                min="0"
                variant="outlined"
                density="compact"
              />
            </v-col>
            
            <v-col cols="12" md="4">
              <v-text-field
                v-model="filter.area_to"
                label="Area To"
                type="number"
                min="0"
                variant="outlined"
                density="compact"
              />
            </v-col>
            
            <v-col cols="12" md="4">
              <v-text-field
                v-model="filter.price"
                label="Price"
                type="number"
                min="0"
                variant="outlined"
                density="compact"
              />
            </v-col>

              <v-col cols="12" class="text-right">
                <v-btn size="x-large" :disabled="loading || !(filter.price && filter.property_type_id && filter.area_from && filter.area_to) " color="primary" type="submit">
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
