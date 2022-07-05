<!-- @format -->

<template>
  <div>
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Location Range</h4>
          <button
            type="button"
            class="close"
            aria-hidden="true"
            @click="closeModal"
          >
            ×
          </button>
        </div>
        <div class="modal-body p-4">
          <div class="row">
            <div class="col-md-12">
              <table
                class="table table-sm table-hover table-bordered"
                id="dt-product-menu"
                width="100%"
              >
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Rider's Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in location_range" :key="index">
                    <td>{{ item.location }}</td>
                    <td>{{ item.riders_fee }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary waves-effect"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LocationRangeComponent',
  props: ['location_range'],
  methods: {
    closeModal() {
      this.$emit('close-modal')
    }
  }
}
</script>
