<!-- @format -->

<template>
  <form
    @submit.prevent="changeProfilePicture"
    method="post"
    enctype="multipart/form-data"
  >
    <div class="modal-body">
      <small
        ><i
          ><span class="text-danger">Note:</span> Acceptable file format are [
          jpg, png ] and file size should not be greater than 2MB.</i
        ></small
      ><br /><br />

      <div class="row justify-content-md-center">
        <div class="col"></div>
        <div class="col-md-8">
          <center>
            <img
              id="photoprofile"
              class="rounded-circle center profilePhoto"
              width="270px"
              height="270px"
            /><br /><br />
            <input v-model="previous_image" type="hidden" />
            <input
              type="button"
              id="profile_change"
              style="display:none;"
              class="btn btn-primary btn-md btn-block"
              :class="{
                'is-invalid': image_details.errors.has('image')
              }"
              value="Change Photo?"
              @click="changePhoto('profile', 'profile_change')"
            />
            <has-error :form="image_details" field="image"></has-error>
            <input
              type="file"
              name="profile"
              ref="input"
              id="profile"
              class="btn btn-light btn-block"
              @change="readURL('profile')"
            />
            <input
              type="button"
              name="clearprofile"
              id="clearprofile"
              style="display:none"
              class="btn btn-warning btn-block"
              value="Clear"
              @click="clears('profile', 'photoprofile', 'clearprofile')"
            />
          </center>
        </div>
        <div class="col"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        v-if="submit_image === true && clickSubmit === false"
        type="submit"
        class="btn btn-primary"
      >
        Upload
      </button>
      <button
        v-else-if="submit_image === true && clickSubmit === true"
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
      <button type="button" class="btn btn-danger" data-dismiss="modal">
        Close
      </button>
    </div>
  </form>
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
      submit_image: false,
      clickSubmit: false,
      image_details: new Form({
        id: this.userId,
        previous_image: null
      })
    }
  },
  methods: {
    changeProfilePicture() {
      this.clickSubmit = true
      this.image_details.image = this.$refs.input.files[0]
      this.image_details
        .submit('post', '/setup/change_profile_picture', {
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

          swal({
            title: 'Success!',
            text: message,
            type: 'success',
            allowOutsideClick: false,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary'
          }).then(
            function() {
              this.clickSubmit = false
              this.$refs.input.value = null
              location.reload()
            }.bind(this)
          )
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
    validateForm(imgid) {
      const validate = 0
      var img = $('#' + imgid).val()
      var res = ''
      var i = img.length - 1
      while (img[i] != '.') {
        res = img[i] + res
        i--
      }

      //checks the file format
      if (res != 'PNG' && res != 'jpg' && res != 'JPG' && res != 'png') {
        $('#' + imgid).val('')
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Invalid File Format. Take note on the allowed file!'
        })
        validate = 1
      }

      //checks the filesize- should not be greater than 2MB
      var uploadedFile = document.getElementById(imgid)
      var fileSize = uploadedFile.files[0].size < 1024 * 1024 * 2
      if (fileSize == false) {
        $('#' + imgid).val('')
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'The size of the file exceeds 2MB!'
        })
        validate = 1
      }

      return validate
    },
    changePhoto(photoid, change) {
      $('#' + change).hide()
      $('#' + photoid).show()
    },
    readURL(upload) {
      $('#clear' + upload).show()
      var res = this.validateForm(upload)

      if (res != 1) {
        this.submit_image = true
        if (this.$refs.input.files && this.$refs.input.files[0]) {
          var reader = new FileReader()
          reader.onload = function(e) {
            $('#photo' + upload).attr('src', e.target.result)
          }
          reader.readAsDataURL(this.$refs.input.files[0])
        }
      } else {
        $('#clear' + upload).hide()
        $('#photo' + upload).removeAttr('src')
        this.submit_image = false
      }
    },
    clears(file, preview, clrbtn) {
      $('#' + file).val('')
      $('#' + preview).attr(
        'src',
        this.$root.adminAccess + '' + this.image_details.previous_image
      )
      $('#' + clrbtn).hide()
      this.submit_image = false
    },
    async getProfilePicture() {
      $('#photoprofile').removeAttr('src')

      const { data } = await axios.get(
        `/setup/fetch_user_profile/${this.userId}`
      )
      this.image_details.previous_image = data.image
      if (data.image !== null) {
        document.getElementById('photoprofile').src =
          this.$root.adminAccess + '' + data.image
        $('#profile').hide()
        $('#profile_change').show()
      } else {
        $('#profile_change').hide()
        $('#profile').show()
      }
    }
  },
  mounted() {
    this.getProfilePicture()
  }
}
</script>
