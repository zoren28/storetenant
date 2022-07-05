<!-- @format -->

<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">View Rider Details</h4>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-hidden="true"
        >
          ×
        </button>
      </div>
      <div class="modal-body p-4">
        <div class="row">
          <div class="col-md-12">
            <ul class="nav nav-tabs">
              <li
                class="nav-item"
                v-for="(rd, index) in riderDetails.riders_details"
                :key="index"
              >
                <a
                  :href="'#rider_' + index"
                  data-toggle="tab"
                  aria-expanded="false"
                  class="nav-link"
                  :class="index === 0 ? 'active' : ''"
                >
                  <span class="d-inline-block d-sm-none"
                    ><i class="fas fa-motorcycle"></i
                  ></span>
                  <span class="d-none d-sm-inline-block" v-if="index === 0"
                    >Main Rider</span
                  >
                  <span class="d-none d-sm-inline-block" v-else
                    >Support Rider</span
                  >
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div
                class="tab-pane fade"
                :id="'rider_' + i"
                v-for="(info, i) in riderDetails.riders_details"
                :key="i"
                :class="i === 0 ? 'show active' : ''"
              >
                <div class="row">
                  <div class="col-md-6">
                    <h4>Rider's Information</h4>
                    <p>Rider's Picture</p>
                    <img
                      :src="
                        $root.riderAccess + '' + info.rider_detail.r_picture
                      "
                      width="130"
                      height="150"
                      alt="Rider's Picture"
                    />
                  </div>
                  <div class="col-md-6">
                    <h4>Rider's Motorcycle Information</h4>
                    <p>Rider's Motorcycle Picture</p>
                    <img
                      :src="
                        $root.riderAccess + '' + info.rider_detail.rm_picture
                      "
                      width="130"
                      height="150"
                      alt="Rider's Motorcycle Picture"
                    />
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="">Firstname</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        :value="info.rider_detail.r_firstname"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Lastname</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        :value="info.rider_detail.r_lastname"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Gender</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        :value="info.rider_detail.r_gender"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Mobile No.</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        :value="info.rider_detail.r_mobile"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="">Brand</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        :value="info.rider_detail.rm_brand"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Model</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        :value="info.rider_detail.rm_model"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Color</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        :value="info.rider_detail.rm_color"
                      />
                    </div>
                    <div class="form-group">
                      <label for="">Plate Number</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        :value="info.rider_detail.rm_plate_num"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViewRiderDetailComponent',
  props: ['riderDetails'],
  data() {
    return {
      firstname: null,
      address: null
    }
  },
  watch: {
    firstname: function() {
      console.log(this)
      alert('asd')
    }
  }
}
</script>
