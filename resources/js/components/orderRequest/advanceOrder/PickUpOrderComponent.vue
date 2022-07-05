<template>
    <div class="container">
        <table class="table table-sm table-hover" id="dt-advance-pickup">
            <thead>
                <tr>
                    <th></th>
                    <th>Ticket #</th>
                    <th>Customer's Name</th>
                    <th>Date and Time for Delivery</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-if="Object.keys(getList).length > 0">
                <tr v-for="(g,ticket,index) in getList" :key="index">
                    <td>
                        <i v-if="g[0].type === 1" class="remixicon-phone-line"></i>
                        <i v-else-if="g[0].type === 3" class="remixicon-computer-line"></i>
                        <i v-else class="remixicon-smartphone-line"></i>
                    </td>
                    <td><span class="font-weight-bold text-dark">{{g[0].ticket}}</span></td>
                    <td><span class="font-weight-bold text-dark">{{g[0].customer_delivery_info.lastname+", "+g[0].customer_delivery_info.firstname}}</span></td>
                    <td><span class="font-weight-bold text-dark">{{g[0].pickup_at | moment}}</span></td>
                    <td align="center">
                        <button class="btn btn-block btn-bordered-warning btn-sm waves-effect waves-light" @click="viewOrder(g[0].ticket_id)">View</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default {
    name : 'DeliveryOrderComponent',
    data() {
        return {
            table_data : [],
            table : {},
        }
    },
    computed: {
        getList(){
            return this.table_data
        }
    },
    methods: {
        fetchAdvancePickUpOrder() {
            if ( $.fn.DataTable.isDataTable( '#dt-advance-pickup' ) ) {
                this.table.destroy();
                this.table_data = [];
            }

            axios.get('/advance_order/fetch_advance_pickup/').then((response) => {
                this.table_data = response.data ;
                
                var this_data = this;
                setTimeout(function(){ 

                    this_data.table = $('#dt-advance-pickup').DataTable({
                        destroy : true,
                        "order": [[ 2, "asc" ]],
                        "columnDefs":[  
                            {  
                                "targets":[0, 1],  
                                "orderable":false
                            }, 
                            {
                                "targets":[4],  
                                "orderable":false,
                                "width": "20%",
                                "className": "text-center" 
                            },
                        ],
                        language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},
                        drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}
                    });
                }, 100);
            });
        },
        viewOrder(ticket_id) {

            this.$router.push({name:'view-advance-order',params: { ticketId: this.encryptTicket(ticket_id)} });
        },
        encryptTicket(data) {

            return btoa(data)
        },
    },
    mounted() {
        this.fetchAdvancePickUpOrder();
    },
    filters: {
        moment: function (date) {
            return moment(date).format('MMMM DD, YYYY, h:mm A');
        }
    }
}
</script>