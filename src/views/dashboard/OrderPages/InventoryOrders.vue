<script>

import { base_url } from '@/utils/config'; // Import base_url from the .ts file
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import * as XLSX from 'xlsx'; // Import xlsx for exporting Excel files

export default {

    data() {
        
        return {
            loading: false,
            headers: [
                { title: 'Branch Name', key: 'branch_name', filterable: true,},
                { title: 'Shelf', key: 'total_shelved', filterable: true,},
                { title: 'Not Shelf', key: 'total_not_shelved', filterable: true,},
                { title: 'Total', key: 'actions', filterable: false, },
            ],
            orderHeaders: [
                { title: 'Branch Name', key: 'branch_name', filterable: true,},
                { title: 'Order Id', key: 'a_barcode', filterable: true, },
                { title: 'P Barcode', key: 'p_barcode', filterable: true, },
                { title: 'External Way Bill Number', key: 'external_way_bill_number', filterable: true, },
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            branches_data: [],
            selected_branch_ids: [],
            selected_branch_id: null,
            listDialog: false,
            selected_branch_name: '',
            selected_request_ids: [],
            countsData: [],
            dialog_text: null,
        }

    },

    methods: {
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/inventory-orders`, { 
              branch_ids: this.selected_branch_ids,
            });

            if (responseData && responseData.data) {
              this.countsData = responseData.data;
            }

          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
        
        async getConstantsData() {
          try {
            const responseData = await fetchWrapper.post(`${base_url}/constants/branches`, {});

            if (responseData && responseData.data) {
              this.branches_data = responseData.data;
            }

          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
          }
        },

        downloadCountsData() {
          // Extract only the required columns: Branch Name and Total Orders
          const filteredData = this.countsData.map(item => ({
            'Branch Name': item.branch_name,
            'Total Orders': item.total_orders
          }));

          // Create a worksheet from the filtered data
          const worksheet = XLSX.utils.json_to_sheet(filteredData);

          // Add headers to the worksheet
          XLSX.utils.sheet_add_aoa(worksheet, [['Branch Name', 'Total Orders']], { origin: 'A1' });

          // Create a workbook and append the worksheet
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Counts Data');

          // Export the workbook to an Excel file
          XLSX.writeFile(workbook, 'inventory-data.xlsx');
        },

        
        trackOrder(item) {
            return window.open("https://dalilee.om/tracking.html?id=" + item.a_barcode, "_blank");
        },

        openListDialog(item) {
          this.dialog_text = "TOTAL";
          this.data = this.formatListData(item.shelved_ids, item.branch_name).concat(this.formatListData(item.not_shelved_ids, item.branch_name));
          this.data = this.data.filter(item => item !== undefined && item !== null);
        },
        
        shelvedListDialog(item) {
          this.dialog_text = "SHELF";
          this.data = this.formatListData(item.shelved_ids, item.branch_name);
          // remove empty values from data
          this.data = this.data.filter(item => item !== undefined && item !== null);
        },
        notShelvedDialog(item) {
          this.dialog_text = "NOT SHELF";
          this.data = this.formatListData(item.not_shelved_ids, item.branch_name);
          this.data = this.data.filter(item => item !== undefined && item !== null);
        },

        formatListData(data, branch_name){
          if (data) {
            this.listDialog = true; // Open the dialog
            this.selected_branch_name = branch_name; // Set the branch name for the dialog
            console.log("***DATA***",data);
            // Safely handle request_ids (in case it's undefined or null)
            const dataArray = data.split(',');

            // Map request IDs to the desired structure
            const listData = dataArray.map((id) => {
              // branch_name: this.selected_branch_name, // Assign branch_name
              // a_barcode: this.a_barcode ? this.a_barcode + id.trim() : 'A' + id.trim(), // ** REMOVE A if Countries are implemented in during login
              // id: id.trim(),
              const trimmed = id.trim();
              const [request_id, waybill, p_barcode] = trimmed.split('_');

              if(request_id){
                return {
                  branch_name: this.selected_branch_name,
                  a_barcode: request_id || null,
                  external_way_bill_number: waybill || '-',
                  p_barcode: p_barcode || '-',
                };
              }
            });
            
            return listData;
          }

          return [];
        },

        downloadOrdersData() {
          //
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
      this.getConstantsData();
    },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Inventory</v-card-title>
            <v-btn color="primary" variant="outlined" elevation="0" @click="downloadCountsData()"><DownloadIcon size="20" class="mr-2"/>Download Excel</v-btn>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row>
            <v-col cols="12" md="4">
              
              <v-autocomplete 
                v-model="selected_branch_ids" 
                chips small-chips multiple hide-no-data clearable
                variant="outlined" 
                density="compact" 
                :items="branches_data"
                label="Branches Filter"
                item-title="name"
                item-value="id"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-btn color="primary" elevation="0" @click="getData()"><FilterIcon size="20" class="mr-2"/>Apply Filter</v-btn>
            </v-col>
          </v-row>

          <v-data-table density="compact" :loading="loading" :headers="headers" :items="countsData" class="elevation-0">

            <template v-slot:item.total_shelved="{ item }">
            
              <v-tooltip location="end">
                  <template #activator="{ props }">
                    <v-chip 
                    color="primary"
                    variant="text"
                    rounded="pill"  
                    v-bind="props" 
                    @click="shelvedListDialog(item)"
                    >
                    {{ item.total_shelved }}
                  </v-chip>
                </template>
                <span>View Shelf</span>
              </v-tooltip>
            </template>
            <template v-slot:item.total_not_shelved="{ item }">
            <v-tooltip location="start">
              <template #activator="{ props }">
                <v-chip 
                color="primary"
                variant="text"
                rounded="pill"  
                v-bind="props" 
                @click="notShelvedDialog(item)"
                >
                {{ item.total_not_shelved }}
              </v-chip>
            </template>
            <span>View Not Shelf</span>
          </v-tooltip>
          </template>
          <template v-slot:item.actions="{ item }">
              <v-tooltip location="start">
                <template #activator="{ props }">
                  <v-chip 
                    color="primary"
                    variant="text"
                    rounded="pill"  
                    v-bind="props" 
                    @click="openListDialog(item)"
                  >
                    {{ item.total_orders }}
                  </v-chip>
                </template>
                <span>View Orders</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="listDialog" max-width="90%" width="800px" min-height="400px" max-height="90%">
    <v-card>
      <v-card-title class="mb-10 d-flex justify-space-between">
        <span class="h4">{{selected_branch_name}} {{ dialog_text?'('+dialog_text+')':'' }}</span>
        <!-- <v-btn color="primary" variant="outlined" elevation="0" @click="downloadOrdersData()"><DownloadIcon size="20" class="mr-2"/>Download Excel</v-btn> -->
      </v-card-title>
      <v-card-text>
          <v-data-table
            density="compact"
            :loading="loading"
            :headers="orderHeaders"
            :items="data"
            class="elevation-0"
            :items-per-page-options="[10, 20, 50, 100, 200]"
          >
          <template v-slot:item.actions="{ item }">
            <v-tooltip>
              <template #activator="{ props }">
                <v-chip 
                  color="primary" 
                  rounded="pill" 
                  class="mr-2 py-5" 
                  v-bind="props" 
                  @click="trackOrder(item)"
                >
                  <LocationFilledIcon size="20" />
                </v-chip>
              </template>
              <span>Track Order</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>

  
</template>
