<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">User Details</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          ×
        </button>
      </div>
      <form
        @submit.prevent="checkTenantUserForm"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="fullname" class="control-label">FullName</label
                ><span class="text-danger">*</span>
                <input
                  v-model="tenantUserForm.name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': tenantUserForm.errors.has('name') }"
                  id="fullname"
                  placeholder="Firstname Lastname"
                />
                <has-error :form="tenantUserForm" field="name"></has-error>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="image" class="control-label">User Image</label
                ><span class="text-danger">*</span>
                <input
                  type="file"
                  class="form-control"
                  :class="{ 'is-invalid': tenantUserForm.errors.has('image') }"
                  id="image"
                  ref="image"
                  placeholder="Product Image"
                />
                <has-error :form="tenantUserForm" field="image"></has-error>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="email" class="control-label">Email</label>
                <span class="text-danger">*</span>
                <input
                  v-model="tenantUserForm.email"
                  type="email"
                  id="email"
                  class="form-control"
                  :class="{ 'is-invalid': tenantUserForm.errors.has('email') }"
                  placeholder="example@gmail.com"
                  required
                />
                <has-error :form="tenantUserForm" field="email"></has-error>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="user_type" class="control-label">User Type</label>
                <span class="text-danger">*</span>
                <input
                  id="user_type"
                  type="text"
                  class="form-control"
                  value="picker"
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="username" class="control-label">Username</label
                ><span class="text-danger">*</span>
                <input
                  v-model="tenantUserForm.username"
                  type="username"
                  id="username"
                  class="form-control"
                  :class="{
                    'is-invalid': tenantUserForm.errors.has('username')
                  }"
                  required
                />
                <has-error :form="tenantUserForm" field="username"></has-error>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="password" class="control-label">Password</label
                ><span class="text-danger">*</span>
                <input
                  v-model="tenantUserForm.password"
                  type="text"
                  id="password"
                  class="form-control"
                  :class="{
                    'is-invalid': tenantUserForm.errors.has('password')
                  }"
                  readonly
                />
                <has-error :form="tenantUserForm" field="password"></has-error>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary waves-effect"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-info waves-effect waves-light">
            Save changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'
import { serialize } from 'object-to-formdata'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

export default {
  name: 'AddTenantUserComponent',
  data() {
    return {
      tenantUserForm: new Form({
        name: null,
        username: null,
        email: null,
        user_type: 'picker',
        image: null,
        password: 'Tenant2020'
      })
    }
  },
  methods: {
    async fetch_username() {
      const { data } = await axios.get('/tenantuser/fetch_username')
      this.tenantUserForm.username = data.username
    },
    checkTenantUserForm() {
      this.tenantUserForm.image = this.$refs.image.files[0]
      this.tenantUserForm
        .submit('post', '/tenantuser/add_tenant_user', {
          // Transform form data to FormData
          transformRequest: [
            function(data, headers) {
              return serialize(data)
            }
          ],

          onUploadProgress: e => {
            // Do whatever you want with the progress event
            // console.log(e)
          }
        })
        .then(({ data, status }) => {
          const { message } = data

          // Command: toastr["success"](message, "Success");
          //Success Message
          swal({
            title: 'Success!',
            text: message,
            type: 'success',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary'
          }).then(
            function() {
              // this.$parent.table.clear().destroy();
              // this.$parent.fetchTenantUserList();
              $('div#modal-add-user').modal('hide')
              setTimeout(() => {
                location.reload()
              }, 1000)
            }.bind(this)
          )
        })
        .catch(error => {
          var { data, status } = error.response
          if (status == 401) {
            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: 'Session has been expired.'
            })
          } else if (status === 422) {
            const { message } = data

            Swal.fire({
              type: 'warning',
              title: 'Warning',
              text: message
            })
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Oops, something went wrong!'
            })
          }
        })
    }
  },
  mounted() {
    this.fetch_username()
  }
}
</script>
