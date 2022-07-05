<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Unit of Measurement Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <form @submit.prevent="checkUOMForm" method="post" enctype="multipart/form-data">
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="unit_measure">Unit of Measurement</label> <span class="text-danger">*</span>
                                <input type="text" class="form-control" id="unit_measure" v-model="UOMForm.unit_measure" :class="{ 'is-invalid': UOMForm.errors.has('unit_measure') }" placeholder="Unit of Measurement">
                                <has-error :form="UOMForm" field="unit_measure"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="abbreviate">Abbreviate</label>
                                <input type="text" class="form-control" id="abbreviate" v-model="UOMForm.abbreviate" :class="{ 'is-invalid': UOMForm.errors.has('abbreviate') }" placeholder="Abbreviate">
                                <has-error :form="UOMForm" field="abbreviate"></has-error>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Save changes</button>
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
    name : 'AddUnitMeasureComponent',
    data() {
        return {
            UOMForm : new Form({
                unit_measure : null,
                abbreviate : null
            }),
        }
    },
    methods: {
        checkUOMForm() {
            this.UOMForm.submit('post', '/unit_measure/add_unit_measure', {

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

                // Command: toastr["success"](message, "Success");
                //Success Message
                swal(
                    {
                        title: 'Success!',
                        text: message,
                        type: 'success',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-primary'
                    }
                ).then(function () {

                    this.UOMForm.clear();
                    this.UOMForm.reset();
                    this.$parent.fetchUOM();
                    $("div#modal-add-unitmeasure").modal('hide');

                    // setTimeout(function(){ 

                    //     location.reload();
                    // }, 500)
                }.bind(this));
            })
            .catch(error => {

                var { data, status } = error.response;
                if (status == 401) {
                    
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
    }
}
</script>