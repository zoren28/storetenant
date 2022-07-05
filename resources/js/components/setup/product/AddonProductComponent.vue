<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Setup</a></li>
                            <li class="breadcrumb-item active">Product Addon</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Product Addon</h4>
                </div>
            </div>
        </div>     
        <!-- end page title --> 

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <select v-model.number="product_addon" class="form-control">
                                    <option value="1">Addon Drinks</option>
                                    <option value="2">Addon Sides</option>
                                    <option value="3">Addon Dessert</option>
                                </select>
                            </div>
                            <div class="col-md-8">
                                <button v-if="clickSetup === false" class="btn btn-primary waves-effect waves-light float-right" @click="selectProduct"> <i class="fas fa-plus-circle"></i> &nbsp; Select Product</button>
                                <button v-else class="btn btn-primary waves-effect waves-light float-right" disabled="">
                                    <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                            </div>
                        </div>
                        <hr>
                        <table id="dt-product-list" class="table table-sm table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                <tr v-for = "(g,index) in getList" :key="index">
                                    <td><span class="font-weight-bold text-dark">{{g.product_name}}</span></td>
                                    <td><span class="text-dark">{{g.description}}</span></td>
                                    <td><img :src="'storage/'+g.image" width='90' height='60'></td>
                                    <td>
                                        <button class="btn btn-sm btn-light btn-rounded" :class="'remove-button-'+g.product_id" @click="removeProduct(g.product_id)" data-wenk="Remove Product"><i class="text-danger remixicon-delete-bin-2-line"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div> <!-- end card body-->
                </div> <!-- end card -->
            </div><!-- end col-->
        </div>
        <!-- end row-->

        <div id="modal-select-product" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <select-product 
                :fd_products="fd_products" 
                :product_addon="product_addon"
            />
        </div><!-- /.modal -->
        
    </div>
</template>
<script>
import SelectProduct from "./SelectAddonProductComponent.vue";

export default {
    components:{
        SelectProduct,
    },
    data() {
        return {
            clickSetup : false,
            table_data : [],
            params : [],
            fd_products: [],
            product_addon : 1,
        }
    },
    computed: {
        getList() {
            return this.table_data;
        }
    },
    methods: {
        async fetchProductList(choice, filter) {

            if ( $.fn.DataTable.isDataTable( '#dt-product-list' ) ) {
                this.table.destroy();
                this.table_data = [];
            }

            const response = await axios.get(`/product/fetch_addon_sides_list/${choice}/${filter}`);
            this.table_data = response.data;

            var this_data = this;
            setTimeout(function(){ 

                this_data.table = $('#dt-product-list').DataTable({
                    destroy : true,
                    "order": [[ 0, "asc" ]],
                    "columnDefs":[ 
                        {
                            "targets":[1],  
                            "orderable":false, 
                        }, 
                        {
                            "targets":[2, 3],  
                            "orderable":false,
                            "width": "20%",
                            "className": "text-center" 
                        },
                    ],
                    language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},
                    drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}
                });
            }, 100);
        },
        async selectProduct() {

            this.clickSetup = true;

            const {data} = await axios.get(`/product/fetch_addon_sides_list/${this.product_addon}/0`);
            this.fd_products = data;

            $("div#modal-select-product").modal({

                backdrop: 'static',
                keyboard: false,
                show: true,
            });

            this.clickSetup = false;
        },
        removeProduct(product_id) {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it!'
            }).then((result) => {
        
                if (result.value) {

                    this.params = {
                        product_id: product_id,
                        product_addon : this.product_addon
                    }

                    axios.put('/product/remove_addon_sides', this.params).then(({ data, status }) => {
                        
                        const { message } = data;
                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.fetchProductList(this.product_addon, 1);
                        });
                    });
                } 
            });
        }
    },
    mounted() {
        this.fetchProductList(this.product_addon, 1);
    },
    watch: {
        product_addon:function() {
            
            this.fetchProductList(this.product_addon, 1);
        }
    },
}
</script>