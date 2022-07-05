<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">User Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <form @submit.prevent="checkTenantUserForm" method="post" enctype="multipart/form-data">
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-1" class="control-label">FullName</label><span class="text-danger">*</span>
                                <input v-model="tenantUserForm.name" type="text" class="form-control" :class="{ 'is-invalid': tenantUserForm.errors.has('name') }" id="field-1" placeholder="Firstname Lastname">
                                <has-error :form="tenantUserForm" field="name"></has-error>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-2" class="control-label">User Image</label>
                                <input type="file" class="form-control" :class="{ 'is-invalid': tenantUserForm.errors.has('image') }" id="field-2" ref="image" placeholder="Product Image">
                                <has-error :form="tenantUserForm" field="image"></has-error>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-3" class="control-label">Email</label>
                                <input v-model="tenantUserForm.email" type="email" id="field-3" class="form-control" :class="{ 'is-invalid': tenantUserForm.errors.has('email') }" placeholder="example@gmail.com"> 
                                <has-error :form="tenantUserForm" field="email"></has-error>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-4" class="control-label">User Type</label><span class="text-danger">*</span>
                                <select v-model="tenantUserForm.user_type" id="field-4" class="form-control" :class="{ 'is-invalid': tenantUserForm.errors.has('user_type') }">
                                    <option value="manager">Manager</option>
                                    <option value="picker">Picker</option>
                                </select>
                                <has-error :form="tenantUserForm" field="user_type"></has-error>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-5" class="control-label">Username</label><span class="text-danger">*</span>
                                <input v-model="tenantUserForm.username" type="username" id="field-5" class="form-control" :class="{ 'is-invalid': tenantUserForm.errors.has('username') }"> 
                                <has-error :form="tenantUserForm" field="username"></has-error>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="field-6" class="control-label">Password</label><span class="text-danger">*</span>
                                <input v-model="tenantUserForm.password" type="text" class="form-control" :class="{ 'is-invalid': tenantUserForm.errors.has('password') }" readonly>
                                <has-error :form="tenantUserForm" field="password"></has-error>
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
import Vue from 'vue';
import { Form, HasError, AlertError } from "vform";
import { serialize } from 'object-to-formdata';

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

export default {
    name : 'EditTenantUserComponent',
    props: ['tenantId'],
    data() {
        return {
            tenantUserForm : new Form({
                id : null,
                name : null,
                username : null,
                email : null,
                user_type : null,
                image : null,
                password: 'tenant2020',
                previous_image : null
            }),
        }
    },
    methods: {
        fetchTenantUserDetails(tenantId) {

            axios.get(`/tenantuser/fetch_tenant_user_details/${tenantId}`).then(({data}) => {
               
                this.tenantUserForm.fill(data);
                this.tenantUserForm.password = 'tenant2020';
                this.tenantUserForm.previous_image = data['image'];
            });
        },
        checkTenantUserForm() {

            this.tenantUserForm.image = this.$refs.image.files[0];
            this.tenantUserForm.submit('post', '/tenantuser/update_tenant_user', {

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

                    // this.$parent.fetchTenantUserList();
                    $("div#modal-edit-user").modal('hide');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);

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
        tenantId:function(tenantId) {
            
            this.fetchTenantUserDetails(tenantId);
        },
    },
}
</script>