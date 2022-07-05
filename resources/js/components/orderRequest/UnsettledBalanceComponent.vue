<template>
    <div class="container">
        <div class="table-responsive">
            <table class="table table-sm table-hover" id="dt-unsettled-list">
                <thead>
                    <tr>
                        <th style="white-space: nowrap;"></th>
                        <th style="white-space: nowrap;"></th>
                        <th style="white-space: nowrap;">Rider's Name</th>
                        <th style="white-space: nowrap;">Ticket</th>
                        <th style="white-space: nowrap;">Customer's Name</th>
                        <th style="white-space: nowrap;">Price</th>
                        <th style="white-space: nowrap;">Remitted Amount</th>
                        <th style="white-space: nowrap;">(Short)/Over Amount</th>
                        <th style="white-space: nowrap;">(Collected)/Refunded Amount</th>
                        <th style="white-space: nowrap;">Action</th>
                        <th style="white-space: nowrap;"></th>
                        <th style="white-space: nowrap;"></th>
                        <th style="white-space: nowrap;"></th>
                        <th style="white-space: nowrap;"></th>
                        <th style="white-space: nowrap;"></th>
                        <th style="white-space: nowrap;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, ticket, index) in getList" :key="index">
                        <td style="white-space: nowrap;"></td>
                        <td style="white-space: nowrap;">
                            <i v-if="customerDetails(item).orderPlatform === 1" class="remixicon-phone-line"></i>
                            <i v-else-if="customerDetails(item).orderPlatform === 3" class="remixicon-computer-line"></i>
                            <i v-else class="remixicon-smartphone-line"></i>
                        </td>
                        <td style="white-space: nowrap;"><span class="text-dark">{{riderDetail(item).riderName}}</span></td>
                        <td style="white-space: nowrap;"><span class="text-dark">{{customerDetails(item).ticket_id}}</span></td>
                        <td style="white-space: nowrap;"><span class="text-dark">{{customerDetails(item).customerName}}</span></td>
                        <td style="white-space: nowrap;"><span class="text-dark">₱ {{item[0].remittance_detail.amt_receivable | numberFormat}}</span></td>
                        <td style="white-space: nowrap;"><span class="text-dark">₱ {{item[0].remittance_detail.remitted_amount | numberFormat}}</span></td>
                        <td style="white-space: nowrap;">
                            <span class="text-dark" v-if="item[0].remittance_detail.expense_account === 'short' && item[0].remittance_detail.status === 0">(₱ {{item[0].remittance_detail.balance | numberFormat}})</span>
                            <span class="text-dark" v-else-if="item[0].remittance_detail.expense_account === 'short' && item[0].remittance_detail.status === 1">₱ {{item[0].remittance_detail.balance | numberFormat}}</span>
                            <span class="text-dark" v-else-if="item[0].remittance_detail.expense_account === 'over' && item[0].remittance_detail.status === 0">₱ {{(item[0].remittance_detail.balance * -1) | numberFormat}}</span>
                            <span class="text-dark" v-else-if="item[0].remittance_detail.expense_account === 'over' && item[0].remittance_detail.status === 1">₱ {{item[0].remittance_detail.balance | numberFormat}}</span>
                            <span class="text-dark" v-else>₱ {{item[0].remittance_detail.balance | numberFormat}}</span>
                        </td>
                        <td style="white-space: nowrap;">
                            <span class="text-dark" v-if="item[0].remittance_detail.expense_account === 'short' && item[0].remittance_detail.status === 1">(₱ {{item[0].remittance_detail.collected_refunded_amt | numberFormat}})</span>
                            <span class="text-dark" v-else-if="item[0].remittance_detail.expense_account === 'over' && item[0].remittance_detail.status === 1">₱ {{(item[0].remittance_detail.collected_refunded_amt * -1) | numberFormat}}</span>
                            <span class="text-dark" v-else>₱ {{item[0].remittance_detail.collected_refunded_amt | numberFormat}}</span>
                        </td>
                        <td>
                            <button class="btn btn-bordered-warning btn-sm waves-effect waves-light" v-if="item[0].remittance_detail.expense_account === 'short' && item[0].remittance_detail.status === 0" @click="collectRefund(item[0].rider_id, ticket, item[0].remittance_detail.tenant_id, item[0].remittance_detail.amt_receivable, item[0].remittance_detail.balance, item[0].remittance_detail.expense_account)">Collect</button>
                            <button class="btn btn-bordered-warning btn-sm waves-effect waves-light" v-else-if="item[0].remittance_detail.expense_account === 'over' && item[0].remittance_detail.status === 0" @click="collectRefund(item[0].rider_id, ticket, item[0].remittance_detail.tenant_id, item[0].remittance_detail.amt_receivable, item[0].remittance_detail.balance, item[0].remittance_detail.expense_account)">Refund</button>
                            <span class="text-dark" v-else-if="item[0].remittance_detail.expense_account === 'short' && item[0].remittance_detail.status === 1">Collected</span>
                            <span class="text-dark" v-else-if="item[0].remittance_detail.expense_account === 'over' && item[0].remittance_detail.status === 1">Refunded</span>
                        </td>
                        <td style="white-space: nowrap;">{{orderTimeFrame(item).orderSubmitted.timestamp | dateTimeFormat}}</td>
                        <td style="white-space: nowrap;">{{orderTimeFrame(item).preparation.timestamp | dateTimeFormat}} / {{orderTimeFrame(item).preparation.consumed}}</td>
                        <td style="white-space: nowrap;">{{orderTimeFrame(item).picking.timestamp | dateTimeFormat}} / {{orderTimeFrame(item).picking.consumed}}</td>
                        <td style="white-space: nowrap;">{{orderTimeFrame(item).intransit.timestamp | dateTimeFormat}} / {{orderTimeFrame(item).intransit.consumed}}</td>
                        <td style="white-space: nowrap;">{{orderTimeFrame(item).delivered.timestamp | dateTimeFormat}} / {{orderTimeFrame(item).delivered.consumed}}</td>
                        <td style="white-space: nowrap;">{{orderTimeFrame(item).completed.timestamp | dateTimeFormat}} / {{orderTimeFrame(item).completed.consumed}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Vue from "vue"; 
import momentDurationFormatSetup from "moment-duration-format";

export default {
    
    name : 'UnsettledBalanceComponent',
    data() {
        return {
            table_data : [],
            table : {},
        }
    },
    computed: {
        getList(){

            // if(Object.keys(this.table_data).length){
            //     loadData();
            // }
            return this.table_data
        }
    },
    methods: {
        fetchRemittanceBalance() {

            axios.get('/unsettled_balance/fetch_remittance_balance').then((response) => {
                this.table_data = response.data 

                var this_data = this;
                setTimeout( function() { 

                    this_data.table = $('#dt-unsettled-list').removeAttr('width').DataTable({
                        destroy:true,
                        "order": [[ 3, "asc" ]],
                        "scrollX": true,
                        "columnDefs":[  
                            {  
                                "targets": [ 0 ],
                                "className":      'details-control',
                                "orderable":      false,
                                "data":           null,
                                "defaultContent": ''
                            }, 
                            {
                                "targets": [ 10, 11, 12, 13, 14, 15 ],
                                "visible": false
                            }
                        ],
                        language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},
                        drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}
                    }); 

                    $('#dt-unsettled-list tbody').on('click', 'td.details-control', function () {
                        var tr = $(this).closest('tr');
                        var row = this_data.table.row( tr );
                
                        if ( row.child.isShown() ) {
                            // This row is already open - close it
                            row.child.hide();
                            tr.removeClass('shown');
                        }
                        else {
                            // Open this row
                            row.child( format(row.data()) ).show();
                            tr.addClass('shown');
                        }
                    } );
                }, 100);
            });
        },
        collectRefund(rider_id, ticket_id, tenant_id, amt_receivable, sales, expense_account) {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, please proceed!'
            }).then((result) => {
        
                if (result.value) {

                    this.params = {
                        rider_id: rider_id,
                        ticket_id: ticket_id,
                        tenant_id: tenant_id,
                        amt_receivable : amt_receivable,
                        sales : sales,
                        expense_account : expense_account,
                    }

                    axios.post('/remittance_monitoring/collect_refund', this.params).then(({ data, status }) => {
                        
                        const { message } = data;
                            
                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.table.clear().destroy();
                            this.table_data = [];
                            this.fetchRemittanceBalance();

                            var this_data = this;
                            $('#dt-unsettled-list').on('click', 'td.details-control', function () {
                                var tr = $(this).closest('tr');
                                var row = this_data.table.row( tr );
                        
                                if ( row.child.isShown() ) {
                                    // This row is already open - close it
                                    row.child.hide();
                                    tr.removeClass('shown');
                                }
                                else {
                                    // Open this row
                                    row.child( format(row.data()) ).show();
                                    tr.addClass('shown');
                                }
                            } );
                        });
                    });
                }
            });
        },
        customerDetails(order) {
			let customerName = null,
				mobileNo = null,
				telephoneNo = null,
				address = null,
				orderPlatform = null,
                ticket_id  = null;

			for (const bu in order) {
         
                customerName = `${order[bu].customer_delivery_info.lastname}, ${order[bu].customer_delivery_info.firstname}`;
                orderPlatform = order[bu].ticket.type;
                mobileNo = order[bu].customer_delivery_info.mobile_number;
                telephoneNo = order[bu].customer_delivery_info.telephone_number;
                address = `${order[bu].customer_delivery_info.complete_address}, ${order[bu].customer_delivery_info.street_purok}, ${order[bu].customer_delivery_info.barangay.brgy_name}, ${order[bu].customer_delivery_info.barangay.town.town_name}, ${order[bu].customer_delivery_info.barangay.town.prov_name}`;
                ticket_id = order[bu].ticket.ticket;
                break;
			}

            this.customerName = customerName;

			return {
				customerName,
				mobileNo,
				telephoneNo,
				address,
                orderPlatform,
                ticket_id
			};
        },
        riderDetail(data) {

            let riderName = null;

            for(const dtl in data) {
                riderName = `${data[dtl].rider_detail.r_lastname}, ${data[dtl].rider_detail.r_firstname}`;
                break;
            }

            return {
                riderName
            };
        },
        priceDetail(data) {
            let totalPrice = 0;

            data.forEach(order => {
                totalPrice += parseFloat(order.total_price);
            });

            return {
                totalPrice
            }
        },
        orderTimeFrame(data) {
            
			let orderSubmitted = {
					timestamp: null,
					consumed: null
				},
				preparation = {
					timestamp: null,
					consumed: null
                },
                picking = {
                    timestamp: null,
					consumed: null  
                },
                intransit = {
                    timestamp: null,
                    consumed: null
                },
                delivered = {
                    timestamp: null,
                    consumed: null
                },
                completed = {
                    timestamp: null,
                    consumed: null
                };

			orderSubmitted.timestamp = data[0].prepared_at;

			preparation.timestamp = data[0].tag_status_at
				? data[0].tag_status_at
				: null;

			preparation.consumed = preparation.timestamp
				? moment
						.duration(
							moment(preparation.timestamp).diff(
								moment(orderSubmitted.timestamp),
								"seconds"
							),
							"seconds"
						)
						.format("h [hrs], m [min], s [secs]")
				: "--, --";
            
			picking.timestamp = data[0].r_setup_stat_at
				? data[0].r_setup_stat_at
				: null;

			picking.consumed = picking.timestamp
				? moment
						.duration(
							moment(picking.timestamp).diff(
								moment(preparation.timestamp),
								"seconds"
							),
							"seconds"
						)
						.format("h [hrs], m [min], s [secs]")
				: "--, --";
            
            intransit.timestamp = data[0].trans_at
				? data[0].trans_at
				: null;

			intransit.consumed = intransit.timestamp
				? moment
						.duration(
							moment(intransit.timestamp).diff(
								moment(picking.timestamp),
								"seconds"
							),
							"seconds"
						)
						.format("h [hrs], m [min], s [secs]")
                : "--, --";
                
            delivered.timestamp = data[0].delevered_at
				? data[0].delevered_at
				: null;

			delivered.consumed = delivered.timestamp
				? moment
						.duration(
							moment(delivered.timestamp).diff(
								moment(intransit.timestamp),
								"seconds"
							),
							"seconds"
						)
						.format("h [hrs], m [min], s [secs]")
                : "--, --";
                
            completed.timestamp = data[0].completed_at
                ? data[0].completed_at
                : null;

			completed.consumed = completed.timestamp
				? moment
						.duration(
							moment(completed.timestamp).diff(
								moment(delivered.timestamp),
								"seconds"
							),
							"seconds"
						)
						.format("h [hrs], m [min], s [secs]")
				: "--, --";

			return {
				orderSubmitted,
                preparation,
                picking,
                intransit,
                delivered,
                completed
			};
		},
    },
    mounted() {
        this.fetchRemittanceBalance();
    },
}

function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td><span class="font-weight-bold">Order Submitted:</span></td>'+
            '<td></td>'+
            '<td>'+d[10]+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td><span class="font-weight-bold">Food Preparation / Time Consumed:</span></td>'+
            '<td><span class="text-danger">(Order Submission -> For Pick-up Tagging)</span></td>'+
            '<td>'+d[11]+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td><span class="font-weight-bold">Picking Assignment / Time Consumed:</span></td>'+
            '<td><span class="text-danger">(For Pick-up Tagging -> Rider To Setup)</span></td>'+
            '<td>'+d[12]+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td><span class="font-weight-bold">Order Claiming / Time Consumed:</span></td>'+
            '<td><span class="text-danger">(Rider To Setup -> In Transit Taggging by Tenant)</span></td>'+
            '<td>'+d[13]+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td><span class="font-weight-bold">Delivery Period / Time Consumed:</span></td>'+
            '<td><span class="text-danger">(In Transit Taggging by Tenant -> Customer)</span></td>'+
            '<td>'+d[14]+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td><span class="font-weight-bold">Completed Period / Time Consumed:</span></td>'+
            '<td><span class="text-danger">(Remitted Amount by Rider -> Tagging Succesfully Remitted by Tenant)</span></td>'+
            '<td>'+d[15]+'</td>'+
        '</tr>'+
    '</table>';
}
</script>