<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Change Quantity</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal">×</button>
            </div>
            <form @submit.prevent="checkQuantityForm" method="post">
                <div class="modal-body p-4">
                    <div class="alert alert-info" role="alert">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>Number of available stocks for {{itemDetails.product_name}} is <span v-if="itemDetails.stocks === null" class="font-weight-bold text-danger">no limit</span> <span v-else class="font-weight-bold text-danger">{{itemDetails.quantity}}</span>. 
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="quantity">Item Quantity</label><span class="text-danger">*</span>
                                <input type="number" id="quantity" v-model.number="changeItemQuantityForm.quantity" class="form-control" :class="{ 'is-invalid': changeItemQuantityForm.errors.has('quantity') }">
                                <has-error :form="changeItemQuantityForm" field="quantity"></has-error>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal" @click="closeModal">Close</button>
                    <button v-if="clickSubmit === false" type="submit" class="btn btn-info waves-effect waves-light">Update Quantity</button>
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
    
    name : "ChangeQuantityComponent",
    props: ['productItem'],
    data() {
        return {
            itemDetails : [],
            clickSubmit : false,
            changeItemQuantityForm : new Form ({
                orderId: null,
				productId: null,
                quantity: null,
                stocks: null,
                price: null,
                total_price : 0
            }),
        }
    },
    methods : {
        fetch_product_details(product_id,product_price_id) {

            axios.get(`/product/fetch_product_price_details/${product_id}/${product_price_id}`).then(({data}) => {

                this.itemDetails = data;
                this.changeItemQuantityForm.stocks = data.stocks;
                this.changeItemQuantityForm.price = data.price;
            });
        },
        checkQuantityForm() {
            
            this.clickSubmit = true;
            if (this.changeItemQuantityForm.quantity === null || this.changeItemQuantityForm.quantity === "") {
                
                this.clickSubmit = false;
                Swal.fire({
                    type: 'warning',
                    title: 'Warning',
                    text: 'Please input Item Quantity.'
                }).then((result) => {

                    return;
                });
            } else {

                this.changeItemQuantityForm.submit('post', '/order/change_item_quantity', {
                    
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
                    this.$emit('return-home');
                    this.clickSubmit = false;

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

                        this.$parent.retrieveCustomerOrders();
                        this.changeItemQuantityForm.clear();
                        this.changeItemQuantityForm.reset();
                        $("div#change-quantity").modal('hide'); 

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
            }
        },
        closeModal() {

            this.changeItemQuantityForm.clear();
            this.changeItemQuantityForm.reset();
        },
    },
    watch : {
        productItem:function(item) {
      
            this.fetch_product_details(item[0].product_id, item[0].product_price_id);
            this.changeItemQuantityForm.productId = item[0].product_id;
            this.changeItemQuantityForm.orderId = item[0].order_id;
            this.changeItemQuantityForm.total_price = item[0].total_price;
        },
    }
}
</script>