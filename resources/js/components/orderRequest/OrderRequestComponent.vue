<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Order Request</a></li>
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Delivery</a></li>
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
                            <a href="#for-pickup" @click="tabTo('forPickUpComponent')" data-toggle="tab" aria-expanded="true" class="nav-link">
                                <span class="d-inline-block d-sm-none"><i class="far fa-user"></i></span>
                                <span class="d-none d-sm-inline-block">For Pick Up</span> 
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#riders-accountability" @click="tabTo('ridersAccountabilityComponent')" data-toggle="tab" aria-expanded="false" class="nav-link">
                                <span class="d-inline-block d-sm-none"><i class="far fa-envelope"></i></span>
                                <span class="d-none d-sm-inline-block">Rider's Accountability</span>  
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#remittance-monitoring" @click="tabTo('remittanceMonitoringComponent')" data-toggle="tab" aria-expanded="false" class="nav-link">
                                <span class="d-inline-block d-sm-none"><i class="fas fa-cog"></i></span>
                                <span class="d-none d-sm-inline-block">Remittance Monitoring</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#unsettled-balance" @click="tabTo('unsettledBalanceComponent')" data-toggle="tab" aria-expanded="false" class="nav-link">
                                <span class="d-inline-block d-sm-none"><i class="fas fa-cog"></i></span>
                                <span class="d-none d-sm-inline-block">Unsettled Balance</span>
                            </a>
                        </li>
                    </ul>
                    <hr>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="onGoing-transaction">
                            <ongoing-transaction v-if="transaction"/>
                        </div>
                        <div class="tab-pane fade" id="for-pickup">
                            <for-pickup v-if="forPickUpComponent"/>
                        </div>
                        <div class="tab-pane fade" id="riders-accountability">
                            <riders-accountability v-if="ridersAccountabilityComponent"/>
                        </div>
                        <div class="tab-pane fade" id="remittance-monitoring">
                            <remittance-monitoring v-if="remittanceMonitoringComponent"/>
                        </div>
                        <div class="tab-pane fade" id="unsettled-balance">
                            <unsettled-balance v-if="unsettledBalanceComponent"/>
                        </div>
                    </div>
                </div>
            </div> <!-- end col -->
        </div>
        <!-- end row -->

    </div> <!-- end container -->
</template>
<script>

import Vue from "vue"; 
import OngoingTransaction from "./OngoingTransactionComponent.vue"
import ForPickup from "./ForPickUpComponent.vue"
import RidersAccountability from "./RidersAccountabilityComponent.vue"
import RemittanceMonitoring from "./RemittanceMonitoringComponent.vue"
import UnsettledBalance from "./UnsettledBalanceComponent.vue"

export default {
    
    components:{

        OngoingTransaction,
        ForPickup,
        RidersAccountability,
        RemittanceMonitoring,
        UnsettledBalance,
    },
    data() {
        return {
            transaction : true,
            forPickUpComponent : false,
            ridersAccountabilityComponent : false,
            remittanceMonitoringComponent : false,
            unsettledBalanceComponent : false
        }
    },
    methods : {
        tabTo(goToTab) {

            if(goToTab == "ongoingTransaction"){

                this.transaction = true;
                this.forPickUpComponent = false;
                this.ridersAccountabilityComponent = false;
                this.remittanceMonitoringComponent = false;
                this.unsettledBalanceComponent = false;
            } else if(goToTab == "forPickUpComponent") {

                this.transaction = false;
                this.forPickUpComponent = true;
                this.ridersAccountabilityComponent = false;
                this.remittanceMonitoringComponent = false;
                this.unsettledBalanceComponent = false;
            } else if(goToTab == "ridersAccountabilityComponent") {

                this.transaction = false;
                this.forPickUpComponent = false;
                this.ridersAccountabilityComponent = true;
                this.remittanceMonitoringComponent = false;
                this.unsettledBalanceComponent = false;
            } else if(goToTab == "remittanceMonitoringComponent") {

                this.transaction = false;
                this.forPickUpComponent = false;
                this.ridersAccountabilityComponent = false;
                this.remittanceMonitoringComponent = true;
                this.unsettledBalanceComponent = false;
            } else {

                this.transaction = false;
                this.forPickUpComponent = false;
                this.ridersAccountabilityComponent = false;
                this.remittanceMonitoringComponent = false;
                this.unsettledBalanceComponent = true;
            }
        }
    }
}
</script>