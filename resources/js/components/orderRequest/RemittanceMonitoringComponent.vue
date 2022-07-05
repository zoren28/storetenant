<template>
	<div class="container">
		<div class="table-responsive">
			<table
				class="table table-sm table-hover"
				id="dt-remmitance-list"
				style="width:100%"
			>
				<thead>
					<tr>
						<th style="white-space: nowrap;"></th>
						<th style="white-space: nowrap;"></th>
						<th style="white-space: nowrap;">Rider's Name</th>
						<th style="white-space: nowrap;">Ticket</th>
						<th style="white-space: nowrap;">Customer's Name</th>
						<th style="white-space: nowrap;">Price</th>
						<th style="white-space: nowrap;">Remitted Amount</th>
						<th style="white-space: nowrap;">
							(Short)/Over Amount
						</th>
						<th style="white-space: nowrap;">
							(Collected)/Refunded Amount
						</th>
						<th style="white-space: nowrap;">
							Location/Destination
						</th>
						<th style="white-space: nowrap;">Rider's Fee</th>
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
							<i
								v-if="customerDetails(item).orderPlatform === 1"
								class="remixicon-phone-line"
							></i>
							<i
								v-else-if="
									customerDetails(item).orderPlatform === 3
								"
								class="remixicon-computer-line"
							></i>
							<i v-else class="remixicon-smartphone-line"></i>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark">{{
								riderDetail(item).riderName
							}}</span>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark">{{
								customerDetails(item).ticket_id
							}}</span>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark">{{
								customerDetails(item).customerName
							}}</span>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark"
								>₱
								{{ item.remittance_amt | numberFormat }}</span
							>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark"
								>₱
								{{ item.remittance_amt | numberFormat }}</span
							>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark"
								>(₱ {{ 0 | numberFormat }})</span
							>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark"
								>(₱ {{ 0 | numberFormat }})</span
							>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark">{{
								customerDetails(item).address
							}}</span>
						</td>
						<td style="white-space: nowrap;">
							<span class="font-weight-bold text-dark"
								>₱
								{{ item.customer_bill.delivery_charge }}</span
							>
						</td>
						<td style="white-space: nowrap;">
							{{
								orderTimeFrame(item).orderSubmitted.timestamp
									| dateTimeFormat
							}}
						</td>
						<td style="white-space: nowrap;">
							{{
								orderTimeFrame(item).preparation.timestamp
									| dateTimeFormat
							}}
							/ {{ orderTimeFrame(item).preparation.consumed }}
						</td>
						<td style="white-space: nowrap;">
							{{
								orderTimeFrame(item).picking.timestamp
									| dateTimeFormat
							}}
							/
							{{ orderTimeFrame(item).picking.consumed }}
						</td>
						<td style="white-space: nowrap;">
							{{
								orderTimeFrame(item).intransit.timestamp
									| dateTimeFormat
							}}
							/
							{{ orderTimeFrame(item).intransit.consumed }}
						</td>
						<td style="white-space: nowrap;">
							{{
								orderTimeFrame(item).delivered.timestamp
									| dateTimeFormat
							}}
							/
							{{ orderTimeFrame(item).delivered.consumed }}
						</td>
						<td style="white-space: nowrap;">
							{{
								orderTimeFrame(item).completed.timestamp
									| dateTimeFormat
							}}
							/
							{{ orderTimeFrame(item).completed.consumed }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import momentDurationFormatSetup from 'moment-duration-format'

export default {
	name: 'RemittanceMonitoringComponent',
	data() {
		return {
			table_data: [],
			table: {},
		}
	},
	computed: {
		getList() {
			// if(Object.keys(this.table_data).length){
			//     loadData();
			// }
			return this.table_data
		},
	},
	methods: {
		ridersFee(data) {
			console.log(data)
			let fuel_amt = 0,
				delivery_charge = 0,
				checker = 0

			delivery_charge = data.customer_bill.delivery_charge
			if (
				data.customer_delivery_info.barangay.town.delivery_charge
					.length === 1
			) {
				// delivery_charge =
				//   data.customer_delivery_info.barangay.town.delivery_charge[0]
				//     .charge_amt
				fuel_amt =
					data.customer_delivery_info.barangay.town.delivery_charge[0]
						.fuel_amt
			} else {
				data.customer_delivery_info.barangay.town.delivery_charge.forEach(
					charge => {
						if (
							charge.brgy_id ===
								data.customer_delivery_info.barangay.brgy_id &&
							charge.town_id ===
								data.customer_delivery_info.barangay.town_id
						) {
							checker++
							// delivery_charge = charge.charge_amt
							fuel_amt = charge.fuel_amt
						}
					}
				)

				if (checker === 0) {
					// delivery_charge =
					//   data.customer_delivery_info.barangay.town.delivery_charge[0]
					//     .charge_amt
					fuel_amt =
						data.customer_delivery_info.barangay.town
							.delivery_charge.fuel_amt
				}
			}

			return {
				fuel_amt,
				delivery_charge,
			}
		},
		fetchSuccessfullyDelivedOrder() {
			axios
				.get('/remittance_monitoring/fetch_successfully_deliver_order')
				.then(response => {
					this.table_data = response.data

					var this_data = this
					setTimeout(function() {
						this_data.table = $('#dt-remmitance-list')
							.removeAttr('width')
							.DataTable({
								destroy: true,
								order: [[3, 'asc']],
								scrollX: true,
								columnDefs: [
									{
										targets: [0],
										className: 'details-control',
										orderable: false,
										data: null,
										defaultContent: '',
									},
									{
										targets: [11, 12, 13, 14, 15, 16],
										visible: false,
									},
								],
								language: {
									paginate: {
										previous:
											"<i class='mdi mdi-chevron-left'>",
										next:
											"<i class='mdi mdi-chevron-right'>",
									},
								},
								drawCallback: function() {
									$(
										'.dataTables_paginate > .pagination'
									).addClass('pagination-rounded')
								},
							})

						$('#dt-remmitance-list tbody').on(
							'click',
							'td.details-control',
							function() {
								var tr = $(this).closest('tr')
								var row = this_data.table.row(tr)

								if (row.child.isShown()) {
									// This row is already open - close it
									row.child.hide()
									tr.removeClass('shown')
								} else {
									// Open this row
									row.child(format(row.data())).show()
									tr.addClass('shown')
								}
							}
						)
					}, 100)
				})
		},
		collectRefund(
			rider_id,
			ticket_id,
			tenant_id,
			amt_receivable,
			sales,
			expense_account
		) {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'warning',
				allowOutsideClick: false,
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, please proceed!',
			}).then(result => {
				if (result.value) {
					this.params = {
						rider_id: rider_id,
						ticket_id: ticket_id,
						tenant_id: tenant_id,
						amt_receivable: amt_receivable,
						sales: sales,
						expense_account: expense_account,
					}

					axios
						.post(
							'/remittance_monitoring/collect_refund',
							this.params
						)
						.then(({ data, status }) => {
							const { message } = data

							Swal.fire({
								type: 'success',
								title: 'Success',
								text: message,
							}).then(result => {
								this.table.clear().destroy()
								this.table_data = []
								this.fetchSuccessfullyDelivedOrder()

								var this_data = this
								$('#dt-remmitance-list').on(
									'click',
									'td.details-control',
									function() {
										var tr = $(this).closest('tr')
										var row = this_data.table.row(tr)

										if (row.child.isShown()) {
											// This row is already open - close it
											row.child.hide()
											tr.removeClass('shown')
										} else {
											// Open this row
											row.child(format(row.data())).show()
											tr.addClass('shown')
										}
									}
								)
							})
						})
				}
			})
		},
		customerDetails(order) {
			let customerName = null,
				mobileNo = null,
				telephoneNo = null,
				address = null,
				orderPlatform = null,
				ticket_id = null

			let complete_address = ''
			if (order.customer_delivery_info !== null) {
				if (
					order.customer_delivery_info.complete_address == null ||
					order.customer_delivery_info.complete_address == ''
				) {
					complete_address = ''
				} else {
					complete_address =
						order.customer_delivery_info.complete_address + ','
				}
			}

			customerName = `${order.customer_delivery_info.lastname}, ${order.customer_delivery_info.firstname}`
			orderPlatform = order.ticket.type
			mobileNo = order.customer_delivery_info.mobile_number
			telephoneNo = order.customer_delivery_info.telephone_number
			address = `${complete_address} ${order.customer_delivery_info.street_purok}, ${order.customer_delivery_info.barangay.brgy_name}, ${order.customer_delivery_info.barangay.town.town_name}, ${order.customer_delivery_info.barangay.town.prov_name}`
			ticket_id = order.ticket.ticket

			this.customerName = customerName

			return {
				customerName,
				mobileNo,
				telephoneNo,
				address,
				orderPlatform,
				ticket_id,
			}
		},
		riderDetail(data) {
			let riderName = null

			riderName = `${data.rider_detail.r_lastname}, ${data.rider_detail.r_firstname}`

			return {
				riderName,
			}
		},
		priceDetail(data) {
			let totalPrice = 0,
				discounted_amt = 0

			data.forEach(order => {
				var stocks = null
				for (const key in order.product_prices) {
					if (
						(order.uom_id != null || order.uom_id != '') &&
						order.product_prices[key].uom_id == order.uom_id
					) {
						stocks = order.product_prices[key].stocks
					} else {
						stocks = order.product_prices[key].stocks
					}
				}

				if (order.canceled_status === 0 && order.status === 1) {
					if (parseInt(order.quantity) > parseInt(stocks)) {
					} else {
						totalPrice += parseFloat(order.total_price)
					}
				}
			})

			data.customer_discounted_amt.forEach(discount => {
				discounted_amt += parseFloat(discount.rider_discount)
			})

			totalPrice = parseFloat(totalPrice) - parseFloat(discounted_amt)

			return {
				totalPrice,
			}
		},
		orderTimeFrame(data) {
			let orderSubmitted = {
					timestamp: null,
					consumed: null,
				},
				preparation = {
					timestamp: null,
					consumed: null,
				},
				picking = {
					timestamp: null,
					consumed: null,
				},
				intransit = {
					timestamp: null,
					consumed: null,
				},
				delivered = {
					timestamp: null,
					consumed: null,
				},
				completed = {
					timestamp: null,
					consumed: null,
				}

			orderSubmitted.timestamp = data.prepared_at

			preparation.timestamp = data.tag_status_at
				? data.tag_status_at
				: null

			preparation.consumed = preparation.timestamp
				? moment
						.duration(
							moment(preparation.timestamp).diff(
								moment(orderSubmitted.timestamp),
								'seconds'
							),
							'seconds'
						)
						.format('h [hrs], m [min], s [secs]')
				: '--, --'

			picking.timestamp = data.r_setup_stat_at
				? data.r_setup_stat_at
				: null

			picking.consumed = picking.timestamp
				? moment
						.duration(
							moment(picking.timestamp).diff(
								moment(preparation.timestamp),
								'seconds'
							),
							'seconds'
						)
						.format('h [hrs], m [min], s [secs]')
				: '--, --'

			intransit.timestamp = data.trans_at ? data.trans_at : null

			intransit.consumed = intransit.timestamp
				? moment
						.duration(
							moment(intransit.timestamp).diff(
								moment(picking.timestamp),
								'seconds'
							),
							'seconds'
						)
						.format('h [hrs], m [min], s [secs]')
				: '--, --'

			delivered.timestamp = data.delevered_at ? data.delevered_at : null

			delivered.consumed = delivered.timestamp
				? moment
						.duration(
							moment(delivered.timestamp).diff(
								moment(intransit.timestamp),
								'seconds'
							),
							'seconds'
						)
						.format('h [hrs], m [min], s [secs]')
				: '--, --'

			completed.timestamp = data.completed_at ? data.completed_at : null

			completed.consumed = completed.timestamp
				? moment
						.duration(
							moment(completed.timestamp).diff(
								moment(delivered.timestamp),
								'seconds'
							),
							'seconds'
						)
						.format('h [hrs], m [min], s [secs]')
				: '--, --'

			return {
				orderSubmitted,
				preparation,
				picking,
				intransit,
				delivered,
				completed,
			}
		},
	},
	mounted() {
		this.fetchSuccessfullyDelivedOrder()
	},
}

function format(d) {
	// `d` is the original data object for the row
	return (
		'<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
		'<tr>' +
		'<td><span class="font-weight-bold">Order Submitted:</span></td>' +
		'<td></td>' +
		'<td>' +
		d[11] +
		'</td>' +
		'</tr>' +
		'<tr>' +
		'<td><span class="font-weight-bold">Food Preparation / Time Consumed:</span></td>' +
		'<td><span class="text-danger">(Order Submission -> For Pick-up Tagging)</span></td>' +
		'<td>' +
		d[12] +
		'</td>' +
		'</tr>' +
		'<tr>' +
		'<td><span class="font-weight-bold">Picking Assignment / Time Consumed:</span></td>' +
		'<td><span class="text-danger">(For Pick-up Tagging -> Rider To Setup)</span></td>' +
		'<td>' +
		d[13] +
		'</td>' +
		'</tr>' +
		'<tr>' +
		'<td><span class="font-weight-bold">Order Claiming / Time Consumed:</span></td>' +
		'<td><span class="text-danger">(Rider To Setup -> In Transit Taggging by Tenant)</span></td>' +
		'<td>' +
		d[14] +
		'</td>' +
		'</tr>' +
		'<tr>' +
		'<td><span class="font-weight-bold">Delivery Period / Time Consumed:</span></td>' +
		'<td><span class="text-danger">(In Transit Taggging by Tenant -> Customer)</span></td>' +
		'<td>' +
		d[15] +
		'</td>' +
		'</tr>' +
		'<tr>' +
		'<td><span class="font-weight-bold">Completed Period / Time Consumed:</span></td>' +
		'<td><span class="text-danger">(Remitted Amount by Rider -> Tagging Succesfully Remitted by Tenant)</span></td>' +
		'<td>' +
		d[16] +
		'</td>' +
		'</tr>' +
		'</table>'
	)
}
</script>
