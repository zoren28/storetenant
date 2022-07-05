<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Payment Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <form @submit.prevent="checkPaymentForm" method="post">
                <div class="modal-body p-4">
                    <div class="alert alert-info" role="alert">
                        <i class="mdi mdi-alert-circle-outline mr-2"></i>Total Amount Payable is <span class="font-weight-bold text-danger">₱ {{paymentOrderForm.total_amount}}</span>. 
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="field-1">Customer Tender</label>
                                <input type="text" id="field-1" class="form-control" v-model.number="paymentOrderForm.tender" :class="{ 'is-invalid': paymentOrderForm.errors.has('tender') }" autocomplete="off">
                                <has-error :form="paymentOrderForm" field="tender"></has-error>
                            </div>
                        </div>
                    </div>
                     <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="field-2">Change</label>
                                <input type="text" id="field-2" class="form-control" disabled :value="computedChange">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Form, HasError, AlertError } from "vform";
import { serialize } from 'object-to-formdata';

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

export default {
    
    name : 'PaymentAmountComponent',
    props: ['orderDetails'],
    data() {
        return {
            paymentOrderForm : new Form ({
                ticket_id : null,
                customer_id : null,
                total_amount : 0,
                tender : null
            }),
        }
    },
    computed: {
        
        computedChange: function () {
            // `this` points to the vm instance
            if (this.paymentOrderForm.tender === null || this.paymentOrderForm.tender === '') {
                return;
            } else {

                return this.paymentOrderForm.tender - this.paymentOrderForm.total_amount;
            }
        }
    },
    methods: {
        checkPaymentForm() {

            this.paymentOrderForm.submit('post', '/pickup_payment_monitoring/payment_order', {
                
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

                    this.$parent.fetchSuccessfullyPickUp();

                    this.paymentOrderForm.clear();
                    this.paymentOrderForm.reset();
                    $("div#payment-amount").modal('hide'); 

                }.bind(this));
            })
            .catch(error => {

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
    watch: {
        orderDetails:function(item) {
 
            this.paymentOrderForm.ticket_id = item.ticket_id;
            this.paymentOrderForm.total_amount = item.total_amt;
            this.paymentOrderForm.customer_id = item.customer_id;
        }
    },
}
</script>