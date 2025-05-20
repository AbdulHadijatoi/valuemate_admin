<script>

import axios from 'axios'; // Ensure axios is imported if you're using it
import { base_url } from '@/utils/config'; // Import base_url from the .ts file
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { EyeIcon, PrinterIcon } from 'vue-tabler-icons';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useAuthStore } from '@/stores/auth';

export default {
    components: { DateRangePicker },

    data() {
        return {
            loading: false,
            totalItems: 0,
            headers: [
                { title: 'A Barcode', key: 'a_barcode', filterable: true,},
                { title: 'Driver Name', key: 'collection_driver_name', filterable: true, },
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            orders: [],
            perPage: 10,
            page: 1,
            search: null,
            dateRange: null,
        }

    },

    methods: {
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/orders`, { 
              perPage: this.perPage,
              page: this.page,
              from_date: this.dateRange ? this.formatDate(this.dateRange[0]) : null,
              to_date: this.dateRange ? this.formatDate(this.dateRange[1]) : null,
              search: this.search,
              date_filter_type: 'Collection',
            });

            if (responseData && responseData.orders) {
              this.orders = responseData.orders;
              this.totalItems = responseData.total;
            }
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
        download() {
          const { token } = useAuthStore();
          
            axios.post(`${base_url}/orders/export`, {
              from_date: this.dateRange ? this.formatDate(this.dateRange[0]) : null,
              to_date: this.dateRange ? this.formatDate(this.dateRange[1]) : null,
              search: this.search,
              date_filter_type: 'Collection',
            }, {
                responseType: 'blob',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `external_outlet_orders_${new Date().getTime()}.xlsx`);

                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.log(error);
            });
        },
        viewRequest(a_barcode) {
            return window.open("https://dalilee.om/tracking.html?id=" + a_barcode, "_blank");
        },
        // printRequest(order_id) {
        //     return window.open('print_order?order_id='+order_id, '_blank');
        // },
        formatDate (date) {
          if (!date) return '';
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
      //
    },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Collection </v-card-title>
            <v-btn color="secondary" @click="download()"><DownloadIcon size="20" class="mr-2"/>Download Excel</v-btn>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row>
            <v-col cols="12" md="4">
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
            </v-col>
            <v-col cols="12" md="4">
              <VueDatePicker v-model="dateRange" @closed="getData" range max-range="30" placeholder="Filter by Date" :clearable="false" :enable-time-picker="true"/>
            </v-col>
          </v-row>

          <v-data-table-server @update:options="getData" density="compact" v-model:page="page" :items-length="totalItems" v-model:items-per-page="perPage" :loading="loading" :headers="headers" :items="orders" class="elevation-0">

            <template v-slot:item.actions="{ item }">
              <v-chip color="success" rounded="pill"  class="rounded mr-2 py-5" @click="viewRequest(item.a_barcode)">
                <EyeIcon size="20"/>
              </v-chip>
              <!-- <v-chip color="primary" class="rounded mr-2" @click="">
                <PrinterIcon size="20"/>
              </v-chip> -->
              <!-- <v-icon small class="mr-2" @click="viewOrder(item.a_barcode)"> mdi-eye </v-icon> -->
              <!-- <v-icon small @click="print(item.id)">
                mdi-printer
              </v-icon> -->
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>
