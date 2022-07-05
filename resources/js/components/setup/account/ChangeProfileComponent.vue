<!-- @format -->

<template>
  <form @submit.prevent="changeProfileForm">
    <div class="card card-body">
      <div class="form-settings">
        <label>Profile</label>
        <div class="modf">
          <label class="title">Basic Information</label>
          <button
            v-if="editable"
            name="edit"
            id="edit-basicinfo"
            class="btn btn-primary btn-xs"
            type="button"
            @click="editable = false"
          >
            edit
          </button>
          <button
            v-else
            class="btn btn-primary btn-sm"
            id="update-basicinfo"
            type="submit"
          >
            update
          </button>
        </div>
      </div>
      <p style="border-bottom: 1px solid #eee;"></p>
      <div class="row">
        <div class="col-md-5">
          <center>
            <div class="card" style="border:none">
              <center>
                <img
                  class="rounded-circle"
                  width="270px"
                  height="270px"
                  loading="lazy"
                  :src="$root.adminAccess + '' + user_details.image"
                  alt="User Image"
                  title="User Image"
                />
              </center>
              <div class="card-body">
                <h5
                  class="card-title"
                  v-if="Object.entries(user_details).length !== 0"
                >
                  {{ user_details.tenant.tenant }}
                </h5>
                <p class="card-text">
                  {{ user_details.user_type }}
                </p>
                <a
                  href="javascript:;"
                  id="change_photo"
                  class="btn btn-sm btn-success"
                  @click="changeUserPhoto(account.id)"
                  >Change User Photo</a
                >
              </div>
            </div>
          </center>
        </div>
        <div class="col-md-7">
          <div class="form-group form-group-sm col-sm-12">
            <div class="row">
              <label for="address" class="col-sm-3 col-form-label"
                >Fullname</label
              >
              <div class="col-sm-9">
                <input
                  v-model="account.name"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': account.errors.has('name')
                  }"
                  pattern="[a-zA-Z ]+"
                  required
                  :disabled="editable"
                />
                <has-error :form="account" field="name"></has-error>
              </div>
            </div>
          </div>
          <div class="form-group form-group-sm col-sm-12">
            <div class="row">
              <label for="address" class="col-sm-3 col-form-label"
                >Email Address</label
              >
              <div class="col-sm-9">
                <input
                  v-model="account.email"
                  type="email"
                  class="form-control"
                  :class="{
                    'is-invalid': account.errors.has('email')
                  }"
                  required
                  :disabled="editable"
                />
                <has-error :form="account" field="email"></has-error>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- The Modal -->
    <div class="modal fade" id="profilePic">
      <div class="modal-dialog" style="width: 35%;">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Upload Photo</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <profile-picture :userId="userId"></profile-picture>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import ProfilePicture from './ProfilePictureComponent'
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
  components: {
    ProfilePicture
  },
  data() {
    return {
      editable: true,
      account: new Form({
        name: null,
        email: null,
        id: this.userId
      }),
      user_details: {},
      count: 0
    }
  },
  methods: {
    changeUserPhoto(id) {
      $('div#profilePic').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    async getUserProfile() {
      const { data } = await axios.get(
        `/setup/fetch_user_profile/${this.userId}`
      )

      this.user_details = data
      this.account.name = data.name
      this.account.email = data.email
    },
    changeProfileForm() {
      this.count += 1

      if (this.count > 1) {
        this.clickSubmit = true
        this.account
          .submit('post', '/setup/change_basic_info', {
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

            Swal.fire({
              type: 'success',
              title: 'Success',
              text: message
            }).then(result => {
              if (result) {
                location.reload()
              }
            })
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
    },
    string_ucwords(str) {
      str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase()
      })
      return str
    }
  },
  mounted() {
    this.getUserProfile(this.userId)
  }
}
</script>
