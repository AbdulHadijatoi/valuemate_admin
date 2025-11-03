<script>

import axios from 'axios';
import { base_url,domain } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useAuthStore } from '@/stores/auth';

export default {
    props: {
        company: {
            type: Object,
            required: true,
        }
    },
    components: { VueDatePicker },

    data() {
        return {
            loading: false,
            data: [],
        }
    },

    methods: {
      //
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
            <v-card-title>{{company.name}}</v-card-title>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row class="p-0 m" style="background-color: white;">
            <v-col cols="12">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="2">
                  <span class="bold-text">Company Image</span> 
                </v-col>
                <v-col cols="10">
                  <a :href="company.file" style=" color: black; " class="mx-2" target="_blank">{{company.file}}</a>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Name (English)</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.name}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Name (Arabic)</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.name_ar || '-'}}</span>
                </v-col>
              </v-row>
            </v-col>

          
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Address</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.address}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Phone</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.phone}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Email</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.email}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Website</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.website}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Status</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.status}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created Date</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.created_at_date}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created Time</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.created_at_time}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Description (English)</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.description || '-'}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Description (Arabic)</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{company.description_ar || '-'}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>

