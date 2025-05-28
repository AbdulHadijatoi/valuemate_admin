<script>

import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import '@vuepic/vue-datepicker/dist/main.css';
import CreatePropertyServiceType from './CreatePropertyServiceTypes.vue';
import { successMessage } from '@/utils/helpers/messages';

export default {
    components: { CreatePropertyServiceType },

    data() {
        return {
            loading: false,
            headers: [
                { title: '#', key: 'id', filterable: true,},
                { title: 'Service Type', key: 'service_type_name', filterable: true,},
                { title: 'Created Date', key: 'created_at_date', filterable: true,},
                { title: 'Created Time', key: 'created_at_time', filterable: true,},
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            property_types: [],
            service_types: [],
            property_service_types: [],
            perPage: 10,
            page: 1,
            search: null,
            selectedRow: null,
            createDialog: false,
            deleteDialog: false,
            filter: {
              property_type_id: null
            }
        }
    },

    methods: {
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/property-service-types`, { 
              perPage: this.perPage,
              page: this.page,
              from_date: this.dateRange ? this.formatDate(this.dateRange[0]) : null,
              to_date: this.dateRange ? this.formatDate(this.dateRange[1]) : null,
              search_keyword: this.search,
            });
            
            if (responseData && responseData.data) {
              this.data = responseData.data;
              if(this.property_types.length == 0){
                this.property_types = responseData.property_types;
              }
              if(!this.service_types.length == 0){
                this.service_types = responseData.service_types;
              }
              if(!this.filter.property_type_id){
                this.filter.property_type_id = this.property_types[0]? this.property_types[0].id:null;
              }
              this.filterServiceTypes();
            }
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
       
        filterServiceTypes() {
          const propertyTypeId = this.filter.property_type_id;
          console.log("propertyTypeId ", propertyTypeId)
          if (propertyTypeId) {
            const matched = this.data.find(
              service => service.property_type_id === propertyTypeId
            );
            this.property_service_types = matched ? matched.services : [];
          } else {
            this.service_types = [];
          }
        },
        create() {
          this.createDialog = true;
        },
        deleteRow(item) {
          this.selectedRow = item;
          this.deleteDialog = true;
          
        },

        async deleteData(){
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/property-service-types/delete/${this.selectedRow.id}`, { });
            successMessage(responseData.message);
            this.getData();
            this.deleteDialog = false;
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
    },
    created(){
      //
    },
    computed: {
      //
    },
    watch: {
        //
    },
    mounted() {
      this.getData();
    },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Property Type's Service Types</v-card-title>
            <v-btn color="accent" @click="create()"><PlusIcon size="20" class="mr-2"/>Add New (Property Type's) Service Type</v-btn>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row>
            
            <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.property_type_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="property_types"
                label="Filter by Property Type"
                item-title="name"
                item-value="id"
                @update:model-value="filterServiceTypes()"
              />
            </v-col>

            <!-- <v-col cols="12" md="4">
              <v-text-field
                v-model="search"
                label="Search"
                variant="outlined"
                density="compact"
                @keydown.enter="getData"
              >
                <template v-slot:append-inner>
                  <SearchIcon size="20" class="mr-2" />
                </template>
              </v-text-field>
            </v-col> -->
          </v-row>

          <v-data-table density="compact" :loading="loading" :headers="headers" :items="property_service_types" class="elevation-0">
            
            <template v-slot:item.actions="{ item }">
              <div class="d-flex align-center">
                <v-tooltip location="start">
                  <template #activator="{ props }">
                    <v-chip color="accent" rounded="pill"   class="mr-2 py-5" v-bind="props" @click="deleteRow(item)">
                      <TrashIcon size="20"/>
                    </v-chip>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  
  <!-- Add dialog to create data -->
  <v-dialog v-model="createDialog" max-width="800px">
    <v-card>
      <create-property-service-type @getData="getData()" :property_types="property_types" :service_types="service_types" @close="createDialog = false"/>
    </v-card>
  </v-dialog>

  <!-- add delete confirmation dialog -->
  <v-dialog v-model="deleteDialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this service type?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="deleteData()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>
