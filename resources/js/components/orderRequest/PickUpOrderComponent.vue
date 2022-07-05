<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Order Request</a></li>
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Pick Up</a></li>
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
                            <a href="#onGoing-transaction" @click="tabTo('ongoingTransaction')" data-toggle="tab" aria-expanded="false" class="nav-link active">
                                <span class="d-inline-block d-sm-none"><i class="fas fa-home"></i></span>
                                <span class="d-none d-sm-inline-block">On Going Transaction</span>   
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#remittance-monitoring" @click="tabTo('remittanceMonitoring')" data-toggle="tab" aria-expanded="false" class="nav-link">
                                <span class="d-inline-block d-sm-none"><i class="fas fa-cog"></i></span>
                                <span class="d-none d-sm-inline-block">Payment Monitoring</span>
                            </a>
                        </li>
                    </ul>
                    <hr>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="onGoing-transaction">
                            <ongoing-transaction v-if="transaction"/>
                        </div>
                        <div class="tab-pane fade" id="remittance-monitoring">
                            <remittance-monitoring v-if="remittanceMonitoring"/>
                        </div>
                    </div>
                </div>
            </div> <!-- end col -->
        </div>
        <!-- end row -->

    </div> <!-- end container -->
</template>
<script>
import OngoingTransaction from "./pickUpOrder/OngoingTransactionComponent.vue"
import RemittanceMonitoring from "./pickUpOrder/RemittanceMonitoringComponent.vue"

export default {
    
    components:{

        OngoingTransaction,
        RemittanceMonitoring,
    },
    data() {
        return {
            transaction : true,
            remittanceMonitoring : false,
        }
    },
    methods : {
        tabTo(goToTab) {

            if(goToTab == "ongoingTransaction"){

                this.transaction = true;
                this.remittanceMonitoring = false;
            } else if(goToTab == "remittanceMonitoring") {

                this.transaction = false;
                this.remittanceMonitoring = true;
            } else {

                this.transaction = false;
                this.remittanceMonitoring = false;
            }
        }
    }
}
</script>