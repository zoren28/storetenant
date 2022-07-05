<!-- @format -->

<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Category Details</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
          @click="closeModal"
        >
          ×
        </button>
      </div>
      <form
        @submit.prevent="checkAddCategoryForm"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="category1">Category Name</label
                ><span class="text-danger">*</span>
                <input
                  type="text"
                  class="form-control"
                  id="category1"
                  v-model="categoryForm.category"
                  :class="{ 'is-invalid': categoryForm.errors.has('category') }"
                  placeholder="Category Name"
                />
                <has-error :form="categoryForm" field="category"></has-error>
              </div>
              <div class="form-group">
                <label for="image1">Category Image</label
                ><span class="text-danger">*</span>
                <input
                  type="file"
                  name="image"
                  id="image1"
                  class="form-control"
                  :class="{ 'is-invalid': categoryForm.errors.has('image') }"
                  ref="image"
                  placeholder="Category Image"
                />
                <has-error :form="categoryForm" field="image"></has-error>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary waves-effect"
            data-dismiss="modal"
            @click="closeModal"
          >
            Close
          </button>
          <button
            v-if="clickSubmit === false"
            type="submit"
            class="btn btn-info waves-effect waves-light"
          >
            Save changes
          </button>
          <button
            v-else
            class="btn btn-info waves-effect waves-light"
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
      </form>
    </div>
  </div>
</template>
<script>
import { Form, HasError, AlertError } from 'vform'
import { serialize } from 'object-to-formdata'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

export default {
  name: 'AddCategoryComponent',
  data() {
    return {
      clickSubmit: false,
      categoryForm: new Form({
        category: null,
        image: null
      })
    }
  },
  methods: {
    closeModal() {
      this.categoryForm.clear()
      this.categoryForm.reset()
    },
    checkAddCategoryForm() {
      this.clickSubmit = true
      this.categoryForm.image = this.$refs.image.files[0]
      this.categoryForm
        .submit('post', '/category/add_category', {
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

          //Success Message
          swal({
            title: 'Success!',
            text: message,
            type: 'success',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-primary'
          }).then(
            function() {
              this.clickSubmit = false
              this.categoryForm.clear()
              this.categoryForm.reset()
              this.$refs.image.value = null
              this.$parent.fetchCategoryList()
              $('div#modal-add-category').modal('hide')
            }.bind(this)
          )
        })
        .catch(error => {
          this.clickSubmit = false
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
  mounted() {}
}
</script>
