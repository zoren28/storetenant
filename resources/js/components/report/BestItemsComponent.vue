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
                <a href="javascript: void(0);">Report</a>
              </li>
              <li class="breadcrumb-item active">Best Items</li>
            </ol>
          </div>
          <h4 class="page-title">Best Items</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row d-print-none">
              <div class="col-md-2">
                <!-- <button
                      class="btn btn-sm btn-danger"
                      :disabled="this.table_data.length === 0"
                      @click="printContent('print_state')"
                    >
                      <i class="remixicon-printer-line"></i> Print
                    </button> -->
                <a
                  href="javascript:window.print()"
                  class="btn btn-sm btn-primary waves-effect waves-light"
                  ><i class="mdi mdi-printer mr-1"></i> Print</a
                >
              </div>
              <div class="col-md-10">
                <div class="form-inline float-right">
                  <div class="form-group mr-3">
                    <label for="date_from">Date From</label>
                    <input
                      type="date"
                      v-model="date_from"
                      class="form-control form-control-sm ml-1"
                    />
                  </div>
                  <div class="form-group mr-2">
                    <label for="date_from">Date To</label>
                    <input
                      type="date"
                      v-model="date_to"
                      class="form-control form-control-sm ml-1"
                    />
                  </div>
                  <button
                    class="btn btn-sm btn-info"
                    @click="fetch_best_items"
                    :disabled="
                      date_from === null ||
                        date_to === null ||
                        date_to < date_from
                    "
                  >
                    <i class="fas fa-filter"></i> Filter
                  </button>
                </div>
              </div>
            </div>
            <div class="d-print-none"><br /><br /></div>
            <div class="row">
              <!-- Report Title-->
              <div class=" col-md-12 text-center pb-2">
                <img :src="$root.adminAccess + '' + logo" alt="" width="100" />
                <h3>
                  {{ business_unit }}
                </h3>
                <h4 class="mb-2">Best Items Summary Report</h4>
                <p
                  class="text-muted w-50 m-auto"
                  v-if="date_from !== null && date_to !== null"
                >
                  {{ date_from | moment }} - {{ date_to | moment }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="table-responsive">
                  <table
                    class="table table-sm table-centered"
                    id="dt-sales-income"
                  >
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Product Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>No. of Best Seller Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(g, index) in getList" :key="index">
                        <td>{{ index + 1 }}.</td>
                        <td>
                          {{
                            g.unit_measurement !== null
                              ? g.unit_measurement.unit_measure
                              : ''
                          }}
                          {{ g.product_name }}
                        </td>
                        <td>
                          <img
                            :src="'/storage/' + g.image"
                            alt=""
                            width="75"
                            loading="lazy"
                          />
                        </td>
                        <td>₱ {{ g.price | numberFormat }}</td>
                        <td>{{ g.order }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date_from: null,
      date_to: null,
      table_data: [],
      logo: null,
      business_unit: null,
      table: {}
    }
  },
  computed: {
    getList() {
      return this.table_data
    },
    totalSalesIncome() {
      let total = 0
      const sales = this.table_data
      for (const i in sales) {
        total += parseFloat(sales[i].sales)
      }

      return total
    }
  },
  methods: {
    async fetch_best_items() {
      const { data } = await axios.get(
        `/report/fetch_best_items/${this.date_from}/${this.date_to}`
      )
      this.table_data = data
    },
    printContent(id) {
      var restorePage = document.body.innerHTML
      var printContent = document.getElementById(id).innerHTML
      document.body.innerHTML = printContent
      window.print()
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    async fetchTenantDetails() {
      const { data } = await axios.get('/tenant/fetch_tenant_details')

      this.logo = data.logo
      this.business_unit = data.business_unit.business_unit
    }
  },
  mounted() {
    this.fetchTenantDetails()
  },
  filters: {
    moment: function(date) {
      return moment(date).format('MMMM DD, YYYY')
    }
  }
}
</script>
