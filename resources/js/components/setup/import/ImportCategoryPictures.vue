<!-- @format -->

<template>
  <div class="container-fluid">
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <a href="javascript: void(0);">Setup</a>
              </li>
              <li class="breadcrumb-item active">Import Category Pictures</li>
            </ol>
          </div>
          <h4 class="page-title">Import Category Pictures</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="header-title m-t-0">File Upload</h4>

            <form
              id="categoryPicturesUpload"
              class="dropzone"
              enctype="multipart/form-data"
            >
              <input id="_token" type="hidden" name="_token" />
              <div class="dz-default dz-message">
                <div class="dz-icon">
                  <p class="h1 text-muted">
                    <i class="mdi mdi-cloud-upload"></i>
                  </p>
                </div>
                <div>
                  <span class="dz-text">Click to upload</span>
                  <p class="text-sm text-muted">Only zip file is accepted</p>
                </div>
              </div>
              <div class="fallback">
                <input name="file" type="file" />
              </div>
            </form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card-->
      </div>
      <!-- end col-->
    </div>
    <!-- end row -->
  </div>
  <!-- end container -->
</template>
<script>
Dropzone.options.categoryPicturesUpload = {
  paramName: 'file', // The name that will be used to transfer the file
  url: '/import/category_pictures',
  timeout: 100000000,
  acceptedFiles: '.zip',
  init: function() {
    // this.on('addedfile', function(file) {
    //   Swal.fire({
    //     html: "Please wait, don't close the browser.",
    //     title: 'Uploading in progress',
    //     allowOutsideClick: false,
    //     showConfirmButton: false
    //   }).then(function() {
    //     Swal.showLoading()
    //   })
    // })
    this.on('success', function(file) {
      Swal.fire({
        type: 'success',
        title: 'Upload successful!',
        text: 'Category pictures have been uploaded successfully',
        showConfirmButton: false,
        timer: 1000,
        allowOutsideClick: false
      }).then(() => {
        this.removeFile(file)
      })
    })
  }
}
export default {
  methods: {
    setCSRFToken() {
      document.getElementById('_token').value = document.head.querySelector(
        'meta[name="csrf-token"]'
      ).content
    }
  },
  mounted() {
    this.setCSRFToken()
  }
}
</script>
