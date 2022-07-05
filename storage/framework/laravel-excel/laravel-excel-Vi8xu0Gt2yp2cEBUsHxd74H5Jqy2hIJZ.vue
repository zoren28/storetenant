<!-- @format -->
<template>
  <div id="page-body">
    <div id="page-content">
      <div class="panel">
        <div class="panel-body">
          <div class="row">
            <div class="col-lg-6 table-toolbar-left">
              <form class="form-horizontal">
                <!-- <div class="row" style="padding: 10px 15px 15px 10px">
                  <label
                    class="col-md-3 control-label text-bold"
                    style="text-align: right"
                  >
                    <h5>Company :</h5></label
                  >
                  <div class="col-md-6">
                    <select
                      class="demo_select2 form-control"
                      id="company"
                      data-placeholder="Select Company Unit to begin"
                      data-target="#navUpload"
                      @change="companySelected($event)"
                    >
                      <option value="">Select</option>
                      <option
                        v-for="opt in companyList"
                        :key="opt.company_code"
                        :value="opt.company_code"
                      >
                        {{ opt.acroname }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="row" style="padding: 10px 15px 15px 10px">
                  <label
                    class="col-md-3 control-label text-bold"
                    style="text-align: right"
                  >
                    <h5>Department :</h5></label
                  >
                  <div class="col-md-6">
                    <select
                      class="demo_select2 form-control"
                      id="department"
                      data-placeholder="Select Department Unit to proceed"
                      data-target="#navUpload"
                      :disabled="bu == null"
                      @change="departmentSelected($event)"
                    >
                      <option value="">Select</option>
                      <option
                        v-for="opt in deptList"
                        :key="opt.dept_code"
                        :value="opt.dept_code"
                      >
                        {{ opt.dept_name }}
                      </option>
                    </select>
                  </div>
                </div> -->

                <div class="row" style="padding: 10px 15px 15px 10px">
                  <label
                    class="col-md-3 control-label text-bold"
                    style="text-align: right"
                  >
                    <h5>Date From :</h5></label
                  >
                  <div class="col-md-6">
                    <input
                      class="form-control"
                      v-model="date"
                      type="date"
                      name="dateFrom"
                      id="dateFrom"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="col-lg-6 table-toolbar-right" style="text-align: left">
              <form
                action="consolidate"
                @submit.prevent="submitformorder"
                method="post"
                enctype="multipart/form-data"
                class="form-horizontal"
              >
                <!-- <div class="row" style="padding: 10px 15px 15px 10px">
                  <label
                    class="col-md-3 control-label text-bold"
                    style="text-align: right"
                  >
                    <h5>Business Unit :</h5></label
                  >
                  <div class="col-md-6">
                    <select
                      class="demo_select2 form-control"
                      id="b_unit"
                      data-placeholder="Select Business Unit to proceed"
                      :disabled="company == null"
                      @change="buSelected($event)"
                    >
                      <option value="">Select</option>
                      <option
                        v-for="opt in buList"
                        :key="opt.bunit_code"
                        :value="opt.bunit_code"
                      >
                        {{ opt.business_unit }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="row" style="padding: 10px 15px 15px 10px">
                  <label
                    class="col-md-3 control-label text-bold"
                    style="text-align: right"
                  >
                    <h5>Section :</h5></label
                  >
                  <div class="col-md-6">
                    <select
                      class="demo_select2 form-control"
                      id="section"
                      data-placeholder="Select Section Unit to proceed"
                      data-target="#navUpload"
                      :disabled="department == null"
                      @change="sectionSelected($event)"
                    >
                      <option value="">Select</option>
                      <option
                        v-for="opt in sectionList"
                        :key="opt.section_code"
                        :value="opt.section_code"
                      >
                        {{ opt.section_name }}
                      </option>
                    </select>
                  </div>
                </div> -->

                <div class="row" style="padding: 10px 15px 15px 10px">
                  <label
                    class="col-md-3 control-label text-bold"
                    style="text-align: right"
                  >
                    <h5>Date To :</h5></label
                  >
                  <div class="col-md-6">
                    <input
                      class="form-control"
                      v-model="date2"
                      type="date"
                      name="dateTo"
                      id="dateTo"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <form id="navUpload" class="dropzone" enctype="multipart/form-data">
            <input id="_token" type="hidden" name="_token" />
            <input type="hidden" :value="company" name="company_code" />
            <input type="hidden" :value="bu" name="bunit_code" />
            <input type="hidden" :value="department" name="dept_code" />
            <input type="hidden" :value="section" name="section_code" />
            <input type="hidden" :value="date" name="date" />
            <input type="hidden" :value="date2" name="date2" />
            <div class="dz-default dz-message">
              <div class="dz-icon">
                <i class="demo-pli-upload-to-cloud icon-5x"></i>
              </div>
              <div>
                <span class="dz-text">Drop files to upload</span>
                <p class="text-sm text-muted">or click to pick manually</p>
              </div>
            </div>
            <div class="fallback">
              <input name="file" type="file" multiple />
            </div>
          </form>

          <!--Dropzonejs-->
          <!--===================================================-->
          <!-- <form
            id="demo-dropzone"
            action="/uploading/nav_upload/navPcount"
            class="dropzone dz-clickable"
            enctype="multipart/form-data"
          >
            <input id="_token" type="hidden" name="_token" />
            <div class="dz-default dz-message">
              <div class="dz-icon">
                <i class="demo-pli-upload-to-cloud icon-5x"></i>
              </div>
              <div>
                <span class="dz-text">Drop files to upload</span>
                <p class="text-sm text-muted">or click to pick manually</p>
              </div>
            </div>
            <div class="fallback">
              <input name="file" type="file" multiple />
            </div>
          </form> -->
          <!--===================================================-->
          <!-- End Dropzonejs -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
// ?company=${this.company}&bu=${this.bu}&dept=${this.department}&section=${this.section}
Dropzone.options.navUpload = {
  paramName: 'file', // The name that will be used to transfer the file
  url: '/uploading/nav_upload/navPcount',
  timeout: 100000000,
  init: function() {
    this.on('addedfile', function(file) {
      Swal.fire({
        html: "Please wait, don't close the browser.",
        title: 'Uploading in progress',
        timerProgressBar: true,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {}
      }).then(result => {
        if (result.isConfirmed) {
        }
      })
    })
    this.on('success', function(file) {
      Swal.fire({
        icon: 'success',
        title: 'Upload successful!',
        showConfirmButton: false,
        timer: 1000,
        allowOutsideClick: false
      }).then(result => {
        if (result.isConfirmed | result.isDismissed) {
          this.removeFile(file)
        }
      })
    })
  }
}

Vue.component('pagination', require('laravel-vue-pagination'))
export default {
  data() {
    return {
      data: {
        data: [],
        current_page: null,
        from: null,
        to: null,
        total: null,
        per_page: null
      },
      searchProducts: null,
      name: null,
      total_result: null,
      companyList: {},
      company: null,
      buList: {},
      bu: null,
      deptList: {},
      department: null,
      sectionList: {},
      section: null,
      date: this.getFormattedDateToday(),
      date2: this.getFormattedDateToday()
    }
  },
  methods: {
    sectionSelected(e) {
      const sectionSelected = e.target.value
      const section = this.sectionList.filter(
        sm => sm.section_code == sectionSelected
      )[0]
      this.section = section.section_code
    },
    departmentSelected(e) {
      const departmentSelected = e.target.value
      const department = this.deptList.filter(
        sm => sm.dept_code == departmentSelected
      )[0]
      this.department = department.dept_code

      axios
        .get(
          `/uploading/nav_upload/getSection/?code=${this.company}&bu=${this.bu}&dept=${this.department}`
        )
        .then(response => {
          this.sectionList = response.data
          setTimeout(() => {
            var selectDropDown = $('#section').select2()
            selectDropDown.on('select2:select', function(e) {
              var event = new Event('change')
              e.target.dispatchEvent(event)
            })
          }, 100)
        })
        .catch(response => {
          console.log('error')
        })
    },
    buSelected(e) {
      const buSelected = e.target.value
      const bu = this.buList.filter(sm => sm.bunit_code == buSelected)[0]
      this.bu = bu.bunit_code

      axios
        .get(
          `/uploading/nav_upload/getDept/?code=${this.company}&bu=${this.bu}`
        )
        .then(response => {
          this.deptList = response.data
          setTimeout(() => {
            var selectDropDown = $('#department').select2()
            selectDropDown.on('select2:select', function(e) {
              var event = new Event('change')
              e.target.dispatchEvent(event)
            })
          }, 100)
        })
        .catch(response => {
          console.log('error')
        })
    },
    companySelected(e) {
      const companySelected = e.target.value
      const comp = this.companyList.filter(
        sm => sm.company_code == companySelected
      )[0]
      this.company = comp.company_code

      axios
        .get(`/uploading/nav_upload/getBU/?code=${this.company}`)
        .then(response => {
          this.buList = response.data
          setTimeout(() => {
            var selectDropDown = $('#b_unit').select2()
            selectDropDown.on('select2:select', function(e) {
              var event = new Event('change')
              e.target.dispatchEvent(event)
            })
          }, 100)
        })
        .catch(response => {
          console.log('error')
        })
    },
    getCompany() {
      axios
        .get('/uploading/nav_upload/getCompany')
        .then(response => {
          this.companyList = response.data
          setTimeout(() => {
            var selectDropDown = $('#company').select2()
            selectDropDown.on('select2:select', function(e) {
              var event = new Event('change')
              e.target.dispatchEvent(event)
            })
          }, 100)
        })
        .catch(response => {
          console.log('error')
        })
    },
    setCSRFToken() {
      document.getElementById('_token').value = document.head.querySelector(
        'meta[name="csrf-token"]'
      ).content
    },
    async uploadFiles() {
      const uri = ''
    },
    getFormattedDateToday() {
      return new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-')
    }
  },
  mounted() {
    this.$root.currentPage = this.$route.meta.name
    this.name = this.$root.authUser.name
    this.setCSRFToken()
    this.getCompany()

    setTimeout(() => {
      $('#company').select2()
      var selectDropDown = $('#company')
        .select2()
        .niftyOverlay({
          iconClass: 'demo-psi-repeat-2 spin-anim icon-4x',
          desc: 'Please wait while the content is loading.'
        })
      selectDropDown.on('select2:select', function(e) {
        var event = new Event('change')
        e.target.dispatchEvent(event)

        var $el = $(this),
          relTime
        $el.niftyOverlay('show')

        relTime = setInterval(function() {
          // Hide the screen overlay
          $el.niftyOverlay('hide')

          clearInterval(relTime)
        }, 500)
      })
    }, 100)
  }
}
</script>

<style lang="scss" scoped></style>
