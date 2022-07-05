<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Item Replacement</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <form @submit.prevent="checkItemForm" method="post">
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-hover table-bordered table-sm" id="dt-product-list" width="100%">
                                <thead>
                                    <tr>
                                        <td>Item</td>
                                        <td>Unit Measure</td>
                                        <td>Unit Price</td>
                                        <td>Qty.</td>
                                        <td>Item Served</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for = "(p,index) in getList" :key="index" :class="changeItemForm.productId === p.product_id ? 'selected' : ''" v-if="p.price !== '0.00'">
                                        <td width="50%"><img class="rounded-circle" :src="p.image" width='60' height='40'> <span class="font-weight-bold">{{p.product_name}}</span></td>
                                        <td width="10%"><span class="font-weight-bold">{{p.unit_measure}}</span></td>
                                        <td width="12%"><span class="font-weight-bold">₱ {{p.price}}</span></td>
                                        <td width="8%">
                                            <span class="font-weight-bold">{{quantity(productIds.indexOf(p.product_id))}}</span>
                                        </td>
                                        <td>
                                            <span class="font-weight-bold">{{p.quantity}}</span>
                                        </td>
                                        <td width="20%">
                                            <button v-if="productIds.indexOf(p.product_id) > -1" type="button" class="btn btn-sm btn-rounded waves-effect width-md waves-light btn-bordered-warning" disabled>Already Exist</button>
                                            <button v-else-if="p.available === 'yes'" type="button" class="btn btn-sm btn-rounded waves-effect width-md waves-light" :class="changeItemForm.productId === p.product_id ? 'btn-bordered-success' : 'btn-bordered-primary'" @click="selectItem(p.product_id, p.product_name, p.price, p.quantity)">{{changeItemForm.productId === p.product_id ? 'Selected' : 'Select'}}</button>
                                            <button v-else type="button" class="btn btn-sm btn-bordered-secondary btn-rounded waves-effect width-md waves-light" disabled="">Unavailable</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="selectedItem">Selected Item</label>
                                <input type="text" id="selectedItem" class="form-control" readonly="" v-model="changeItemForm.product_name" :class="{ 'is-invalid': changeItemForm.errors.has('product_name') }">
                                <has-error :form="changeItemForm" field="product_name"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="quantity">Quantity</label>
                                <input type="number" min="1" id="quantity" class="form-control" v-model="changeItemForm.quantity" :class="{ 'is-invalid': changeItemForm.errors.has('quantity') }">
                                <has-error :form="changeItemForm" field="quantity"></has-error>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                    <button v-if="clickSubmit === false" type="submit" class="btn btn-info waves-effect waves-light">Change Item</button>
                    <button v-else class="btn btn-primary waves-effect waves-light" type="button" disabled="">
                        <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Vue from "vue";  
import { Form, HasError, AlertError } from "vform";
import { serialize } from 'object-to-formdata';

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

export default {

    name : "ChangeItemComponent",
    props: ['productItem'],
    data() {

        return {
            table_data : [],
            productIds : {},
            clickSubmit : false,
            changeItemForm : new Form ({
                orderId: null,
				productId: null,
                product_name: null,
                price:null,
                quantity: null,
                stocks: null,
            }),
        }
    },
    computed: {
        getList(){

            if(Object.keys(this.table_data).length){
                loadData();
            }
            return this.table_data
        }

    },
    methods: {
        async fetchProductList(){
            await axios.get('/product/fetch_product_list').then((response) => {
                this.table_data = response.data 
            });
        
        },
        async fetch_product_details(product_id) {

            await axios.get('/product/fetch_product_details/'+product_id).then(({data}) => {

                this.itemDetails = data;
                this.changeItemForm.product_name = data.product_name;
            });
        },
        selectItem(product_id, product_name, price, quantity) {

            this.changeItemForm.productId = product_id;
            this.changeItemForm.product_name = product_name;
            this.changeItemForm.price = price;
            this.changeItemForm.stocks = quantity;
        },
        checkItemForm() {

            this.clickSubmit = true;
            this.changeItemForm.submit('post', '/order/change_item', {
                
                // Transform form data to FormData
                transformRequest: [function (data, headers) {
                    return serialize(data)
                }],

                onUploadProgress: e => {
                    // Do whatever you want with the progress event
                    // console.log(e)
                }
            })
            .then(({ data, status }) => {
                
                const { message } = data;

                swal(
                    {
                        title: 'Success!',
                        text: message,
                        type: 'success',
                        allowOutsideClick: false,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-primary'
                    }
                ).then(function () {

                    this.clickSubmit = false;
                    this.$emit('return-home');
                    this.$parent.retrieveCustomerOrders();
                    this.changeItemForm.clear();
                    this.changeItemForm.reset();

                    $("div#change-item").modal('hide'); 

                }.bind(this));
            })
            .catch(error => {

                this.clickSubmit = false;
                var { data, status } = error.response;
                if (status === 401) {
                    
                    Swal.fire({
                        type: 'warning',
                        title: 'Warning',
                        text: 'Session has been expired.'
                    });
                } else if (status === 422) {
                    const { message } = data;

                    Swal.fire({
                        type: 'warning',
                        title: 'Warning',
                        text: message
                    });
                } else {

                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Oops, something went wrong!'
                    });
                }
            });
        },
        quantity(i) {
            return this.qtyIds[i];
        }
    },
    watch : {
        productItem:function(item) {
         
            this.fetchProductList();
            this.fetch_product_details(item[0].product_id);
            this.changeItemForm.productId = item[0].product_id;
            this.changeItemForm.orderId = item[0].order_id;
            this.changeItemForm.price = item[0].price;
            this.changeItemForm.quantity = item[0].quantity;
            this.changeItemForm.stocks = item[0].stocks;
            this.productIds = item[0].productIds;
            this.qtyIds = item[0].qtyIds;
        },
    }
}

function loadData(){

    setTimeout(function(){ 

        var table = $('#dt-product-list').DataTable({
            destroy:true,
            "order": [[ 0, "asc" ]],
            "lengthMenu": [ 5, 10, 15, 20, 25 ],
            "columnDefs":[  
                {
                    "targets":[1, 2, 3, 4, 5],  
                    "orderable":false,
                    "className": "text-center" 
                },
            ],
            language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},
            drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}

        }); 

        $('#dt-product-list').on('click', 'button.btn-rounded', function () {
            
            if ( !$(this).parents('tr').hasClass('selected') ) {
                table.$('tr.selected').removeClass('selected');
                $(this).parents('tr').addClass('selected');
            }
        });
    }, 100)   
    // $('#dt-product-list').DataTable();        
}  
</script>