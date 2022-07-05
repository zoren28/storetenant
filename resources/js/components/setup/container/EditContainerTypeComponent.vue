<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Container Type Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <form @submit.prevent="checkContainerTypeForm" method="post" enctype="multipart/form-data">
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="container_type">Container Type</label> <span class="text-danger">*</span>
                                <input type="text" class="form-control" id="container_type" v-model="containerTypeForm.container_type" :class="{ 'is-invalid': containerTypeForm.errors.has('container_type') }" placeholder="Container Type">
                                <has-error :form="containerTypeForm" field="container_type"></has-error>
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
// import Vue from "vue";  
import { Form, HasError, AlertError } from "vform";
import { serialize } from 'object-to-formdata';

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
export default {
    name: 'EditContainerTypeComponent',
    props: ['containerDetails'],
    data() {
        return {
            containerTypeForm : new Form({
                container_type : null,
                id : null
            }),
        }
    },
    methods: {
        fetchContainerDetails(id) {
            axios.get(`/container/fetch_container_type_details/${id}`).then(({data}) => {
                this.containerTypeForm.fill(data);
            });
        },
        checkContainerTypeForm() {

            this.containerTypeForm.submit('post', '/container/update_container_type', {

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

                    this.containerTypeForm.clear();
                    this.containerTypeForm.reset();
                    this.$parent.fetchContainerType();
                    $("div#modal-edit-container").modal('hide');

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
    },
    watch: {
        containerDetails:function(data){

            this.fetchContainerDetails(data.id);
        }
    },
}
</script>