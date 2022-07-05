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
                <a href="javascript: void(0);">ALTURUSH</a>
              </li>
              <li class="breadcrumb-item active">Home</li>
            </ol>
          </div>
          <h4 class="page-title">Welcome!</h4>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-lg-8 col-sm-12">
        <div class="card-box">
          <div class="row mt-4">
            <div class="col-lg-6">
              <div
                class="card text-center"
                style="border: 1px solid #d57f1154;"
              >
                <div
                  class="d-flex"
                  style="padding-top:1rem; margin-bottom: 0; background-color: #fff; border-bottom: 1px solid #e7eaed; border-radius: .25rem;"
                >
                  <img
                    src="assets/images/alturush/delivericon.png"
                    alt="deliver icon"
                    width="50"
                    height="50"
                    style="margin-left:30px; margin-right:40px; padding-bottom:13px;"
                  />
                  <h4 class="card-title">For Delivery Orders</h4>
                </div>
                <div class="card-body bg-warning" style="height: 110px;">
                  <h3 class="card-text mt-3" style="color:#fff">
                    New Orders
                    <router-link
                      tag="span"
                      :to="{
                        name: 'order-request'
                      }"
                      class="badge badge-pill ml-4"
                      style="color:#343a40; background-color:white; cursor: pointer;"
                    >
                      {{ Object.keys($root.getDeliveryOrders).length }}
                    </router-link>
                  </h3>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12">
              <div
                class="card text-center"
                style="border: 1px solid #d57f1154;"
              >
                <div
                  class="d-flex"
                  style="padding-top:1rem; margin-bottom: 0; background-color: #fff; border-bottom: 1px solid #e7eaed; border-radius: .25rem;"
                >
                  <img
                    src="assets/images/alturush/pickupicon.png"
                    alt="pickup icon"
                    width="50"
                    height="50"
                    style="margin-left:30px; margin-right:40px; padding-bottom:13px;"
                  />
                  <h4 class="card-title">For Pick-up Orders</h4>
                </div>
                <div class="card-body bg-warning" style="height: 110px;">
                  <h3 class="card-text mt-3" style="color:#fff">
                    New Orders
                    <router-link
                      tag="span"
                      :to="{
                        name: 'pickup-order'
                      }"
                      class="badge badge-pill ml-4"
                      style="color:#343a40; background-color:white; cursor: pointer;"
                    >
                      {{ Object.keys($root.getPickUpOrders).length }}
                    </router-link>
                  </h3>
                </div>
              </div>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card-box">
          <div class="card-body">
            <small>For IT Support:</small>
            <h5 class="card-title">Mobile Number & Phone Directores</h5>
            <table class="table table-sm table-bordered">
              <thead>
                <tr
                  style="background-color:#f7b84b; color: rgb(255, 255, 255);"
                >
                  <td>Mobile & Phone #</td>
                  <td>Dept./Names</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><i>09190796403</i></td>
                  <td>Alturas IT - Joel Sinon</td>
                </tr>
                <tr>
                  <td><i>09190795283</i></td>
                  <td>Alta Citta IT - Ivy Agohob</td>
                </tr>
                <tr>
                  <td><i>09190796485</i></td>
                  <td>Plaza Marcela IT - Kristofferson Rodrigo</td>
                </tr>
                <tr>
                  <td><i>09190793478</i></td>
                  <td>ICM IT - Roderick Go</td>
                </tr>
                <tr>
                  <td><i>09190795697</i></td>
                  <td>Sir Berting</td>
                </tr>
                <tr>
                  <td><i>(038) 4121065</i></td>
                  <td>PLDT Corporate IT</td>
                </tr>
                <tr>
                  <td><i>1807</i></td>
                  <td>Corporate IT - Technical</td>
                </tr>
                <tr>
                  <td><i>09190796051</i></td>
                  <td>Maam Tina</td>
                </tr>
                <tr>
                  <td><i>1844</i></td>
                  <td>Corporate IT - Sysdev</td>
                </tr>
                <tr>
                  <td><i>1953</i></td>
                  <td>Corporate IT - Sysdev</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
.fixed_header {
  width: 300px;
  table-layout: fixed;
  border-collapse: collapse;
}

.fixed_header tbody {
  display: block;
  width: 100%;
  overflow: auto;
  height: 245px;
}

.fixed_header thead tr {
  display: block;
}

.fixed_header th,
.fixed_header td {
  padding: 5px;
  text-align: left;
  width: 150px;
}
</style>
