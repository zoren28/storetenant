<!-- @format -->

<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add Suggestion</h4>
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
        @submit.prevent="checkSuggestionForm"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="suggestion">Suggestion</label>
                <span class="text-danger">*</span>
                <input
                  type="text"
                  id="suggestion"
                  class="form-control"
                  v-model="suggestionForm.suggestion"
                  :class="{
                    'is-invalid': suggestionForm.errors.has('suggestion')
                  }"
                />
                <has-error
                  :form="suggestionForm"
                  field="suggestion"
                ></has-error>
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
import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
export default {
  data() {
    return {
      clickSubmit: false,
      suggestionForm: new Form({
        suggestion: null
      })
    }
  },
  methods: {
    checkSuggestionForm() {
      this.clickSubmit = true
      this.suggestionForm
        .submit('post', '/suggestion/insert_suggestion')
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
              this.suggestionForm.clear()
              this.suggestionForm.reset()
              this.$parent.fetchSuggestionList()
              $('div#modal-add-suggestion').modal('hide')
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
  }
}
</script>
