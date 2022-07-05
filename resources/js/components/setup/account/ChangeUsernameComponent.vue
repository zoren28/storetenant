<!-- @format -->

<template>
  <div class="card card-body">
    <div class="form-settings">
      <label>Username</label>
    </div>
    <p style="border-bottom: 1px solid #eee;"></p>
    <div class="row">
      <div class="col-md-12">
        <div class="alert alert-info" role="alert">
          <i class="mdi mdi-alert-circle-outline mr-2"></i> Username should be
          greater than or equal to 5 characters.
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <form
          @submit.prevent="changeUsernameForm"
          class="form-horizontal"
          role="form"
        >
          <div class="form-group row">
            <label for="current_username" class="col-sm-3 col-form-label"
              >Current Username</label
            >
            <div class="col-sm-9">
              <input
                v-model="account.current_username"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': account.errors.has('current_username')
                }"
                id="current_username"
                autocomplete="false"
                required
              />
              <has-error :form="account" field="current_username"></has-error>
            </div>
          </div>
          <div class="form-group row">
            <label for="new_username" class="col-sm-3 col-form-label"
              >New Username</label
            >
            <div class="col-sm-9">
              <input
                v-model="account.username"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': account.errors.has('username')
                }"
                id="new_username"
                autocomplete="false"
                required
              />
              <has-error :form="account" field="username"></has-error>
            </div>
          </div>
          <div class="form-group row">
            <label for="re_username" class="col-sm-3 col-form-label"
              >Retype Username</label
            >
            <div class="col-sm-9">
              <input
                v-model="account.username_confirmation"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': account.errors.has('username_confirmation')
                }"
                id="re_username"
                autocomplete="false"
                required
              />
              <has-error
                :form="account"
                field="username_confirmation"
              ></has-error>
            </div>
          </div>
          <div class="form-group mb-0 justify-content-end row">
            <div class="col-sm-9">
              <button
                v-if="clickSubmit === false"
                type="submit"
                class="btn btn-info waves-effect waves-light"
              >
                Confirm
              </button>
              <button
                v-else
                class="btn btn-primary waves-effect waves-light"
                disabled=""
              >
                <span
                  class="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            </div>
          </div>
        </form>
      </div>
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
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      account: new Form({
        current_username: null,
        username: null,
        username_confirmation: null,
        id: this.userId
      }),
      clickSubmit: false
    }
  },
  methods: {
    changeUsernameForm() {
      this.clickSubmit = true
      this.account
        .submit('post', '/setup/change_username', {
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
          const { username } = data

          if (username == 'Match') {
            Swal.fire({
              type: 'success',
              title: 'Success',
              text: message
            }).then(result => {
              if (result) {
                location.reload()
              }
            })
          } else {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: message
            }).then(result => {
              if (result) {
                this.clickSubmit = false
              }
            })
          }
        })
        .catch(error => {
          this.clickSubmit = false
          var { data, status } = error.response
          if (status === 401) {
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
  }
}
</script>
