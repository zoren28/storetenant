<!-- @format -->

<template>
  <div class="card card-body">
    <div class="form-settings">
      <label>Password</label>
    </div>
    <p style="border-bottom: 1px solid #eee;"></p>
    <div class="row">
      <div class="col-md-12">
        <div class="alert alert-info" role="alert">
          <i class="mdi mdi-alert-circle-outline mr-2"></i> Password must
          contain (UpperCase, LowerCase, Number/SpecialChar and minimum of 8
          characters).
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <form
          @submit.prevent="changePasswordForm"
          class="form-horizontal"
          role="form"
        >
          <div class="form-group row">
            <label for="current_password" class="col-sm-3 col-form-label"
              >Current Password</label
            >
            <div class="col-sm-9">
              <input
                v-model="account.current_password"
                type="password"
                class="form-control"
                :class="{
                  'is-invalid': account.errors.has('current_password')
                }"
                id="current_password"
                autocomplete="false"
                required
              />
              <span
                toggle="#current_password"
                class="fa fa-fw fa-eye-slash field-icon toggle-password"
                data-toggle="tooltip"
                title=""
                data-original-title="Show password"
              ></span>
              <has-error :form="account" field="current_password"></has-error>
            </div>
          </div>
          <div class="form-group row">
            <label for="new_password" class="col-sm-3 col-form-label"
              >New Password</label
            >
            <div class="col-sm-9">
              <input
                v-model="account.password"
                type="password"
                class="form-control"
                :class="{
                  'is-invalid': account.errors.has('password')
                }"
                id="new_password"
                autocomplete="false"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <span
                toggle="#new_password"
                class="fa fa-fw fa-eye-slash field-icon toggle-password"
                data-toggle="tooltip"
                title=""
                data-original-title="Show password"
              ></span>
              <has-error :form="account" field="password"></has-error>
            </div>
          </div>
          <div class="form-group row">
            <label for="re_password" class="col-sm-3 col-form-label"
              >Retype Password</label
            >
            <div class="col-sm-9">
              <input
                v-model="account.password_confirmation"
                type="password"
                class="form-control"
                :class="{
                  'is-invalid': account.errors.has('password_confirmation ')
                }"
                id="re_password"
                autocomplete="false"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <span
                toggle="#re_password"
                class="fa fa-fw fa-eye-slash field-icon toggle-password"
                data-toggle="tooltip"
                title=""
                data-original-title="Show password"
              ></span>
              <has-error
                :form="account"
                field="password_confirmation "
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
        current_password: null,
        password: null,
        password_confirmation: null,
        id: this.userId
      }),
      clickSubmit: false
    }
  },
  methods: {
    changePasswordForm() {
      this.clickSubmit = true
      this.account
        .submit('post', '/setup/change_password', {
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
          const { password } = data

          if (password == 'Match') {
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
    },
    showHidePassword() {
      $('[data-toggle="tooltip"]').tooltip()

      $('.toggle-password').click(function() {
        $(this).toggleClass('fa-eye-slash fa-eye')

        var input = $($(this).attr('toggle'))
        if (input.attr('type') == 'password') {
          input.attr('type', 'text')
          $(this).attr('data-original-title', 'Hide password')
        } else {
          input.attr('type', 'password')
          $(this).attr('data-original-title', 'Show password')
        }
      })

      var password = document.getElementById('new_password'),
        confirm_password = document.getElementById('confirm_pass')

      function validatePassword() {
        if (password.value != confirm_password.value) {
          confirm_password.setCustomValidity("Passwords Don't Match")
        } else {
          confirm_password.setCustomValidity('')
        }
      }

      password.onchange = validatePassword
      confirm_password.onkeyup = validatePassword
    }
  },
  mounted() {
    this.showHidePassword()
  }
}
</script>
