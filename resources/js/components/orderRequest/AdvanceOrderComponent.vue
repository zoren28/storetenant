<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Advance Order</a></li>
                            <li class="breadcrumb-item active">Customer Monitoring</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Customer Monitoring</h4>
                </div>
            </div>
        </div>     
        <!-- end page title --> 

        <div class="row">

            <div class="col-lg-12">
                <div class="card-box">
                    <ul class="nav nav-pills navtab-bg nav-justified">
                        <li class="nav-item">
                            <a href="#delivery-order" @click="tabTo('deliveryOrder')" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                <span class="d-inline-block d-sm-none"><i class="fas fa-home"></i></span>
                                <span class="d-none d-sm-inline-block">Delivery Order</span>   
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#pickup-order" @click="tabTo('pickUpOrder')" data-toggle="tab" aria-expanded="false" class="nav-link">
                                <span class="d-inline-block d-sm-none"><i class="fas fa-cog"></i></span>
                                <span class="d-none d-sm-inline-block">Pick Up Order</span>
                            </a>
                        </li>
                    </ul>
                    <hr>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="delivery-order">
                            <delivery-order v-if="deliver"/>
                        </div>
                        <div class="tab-pane fade" id="pickup-order">
                            <pick-up-order v-if="pickup"/>
                        </div>
                    </div>
                </div>
            </div> <!-- end col -->
        </div>
        <!-- end row -->

    </div> <!-- end container -->
</template>
<script>
import DeliveryOrder from "./advanceOrder/DeliveryOrderComponent.vue";
import PickUpOrder from "./advanceOrder/PickUpOrderComponent.vue";

export default {
    
    components:{

        'delivery-order' : DeliveryOrder,
        'pick-up-order' : PickUpOrder
    },
    data() {
        return {
            deliver : true,
            pickup : false
        }
    },
    methods : {
        tabTo(goToTab) {

            if(goToTab == "deliveryOrder"){

                this.deliver = true;
                this.pickup = false;
            } else if(goToTab == "pickUpOrder") {

                this.deliver = false;
                this.pickup = true;
            } else {

                this.deliver = false;
                this.pickup = false;
            }
        }
    }
}
</script>