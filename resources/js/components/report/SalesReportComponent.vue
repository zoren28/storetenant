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
							<li class="breadcrumb-item active">Sales Report</li>
						</ol>
					</div>
					<h4 class="page-title">Sales Report</h4>
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
								<a
									href="javascript:window.print()"
									class="btn btn-sm btn-primary waves-effect waves-light"
									><i class="mdi mdi-printer mr-1"></i>
									Print</a
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
											@input="emptyDateTo"
										/>
									</div>
									<div class="form-group mr-2">
										<label for="date_from">Date To</label>
										<input
											type="date"
											v-model="date_to"
											class="form-control form-control-sm ml-1"
											@input="compareDateFrom"
										/>
									</div>
									<button
										class="btn btn-sm btn-info"
										@click="fetch_sales_report"
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
								<img
									:src="$root.adminAccess + '' + logo"
									alt=""
									width="100"
								/>
								<h3>
									{{ business_unit }}
								</h3>
								<h4 class="mb-2">Sales Summary Report</h4>
								<p
									class="text-muted w-50 m-auto"
									v-if="
										date_from !== null && date_to !== null
									"
								>
									{{ date_from | moment }} -
									{{ date_to | moment }}
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
												<th>Ticket #</th>
												<th>Customer's Name</th>
												<th>Date Transaction</th>
												<th>Sales Income</th>
											</tr>
										</thead>
										<tbody>
											<tr
												v-for="(g, index) in getList"
												:key="index"
											>
												<td>{{ index + 1 }}.</td>
												<td>
													{{
														g.ticket !== null
															? g.ticket.ticket
															: '000000-0-000'
													}}
												</td>
												<td>
													{{
														g.ticket !== null &&
														g.ticket.customer !==
															null
															? g.ticket.customer
																	.firstname +
															  ' ' +
															  g.ticket.customer
																	.lastname
															: 'Anonymous'
													}}
												</td>
												<td>
													{{
														g.created_at | datetime
													}}
												</td>
												<td>
													₱
													{{ g.sales | numberFormat }}
												</td>
											</tr>
										</tbody>
										<tfoot v-if="table_data.length > 0">
											<tr>
												<td colspan="4" align="right">
													<span
														class="font-weight-bold"
														>Total Sales Income
														:</span
													>
												</td>
												<td>
													<span
														class="font-weight-bold text-danger"
														>₱
														{{
															totalSalesIncome
																| numberFormat
														}}</span
													>
												</td>
											</tr>
											<tr>
												<td colspan="4" align="right">
													<span
														class="font-weight-bold"
														>Alturas Percent (10%)
														:</span
													>
												</td>
												<td>
													<span
														class="font-weight-bold text-danger"
														>₱
														{{
															alturasPercent
																| numberFormat
														}}</span
													>
												</td>
											</tr>
										</tfoot>
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
			table: {},
			total_sales_income: 0,
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
			this.total_sales_income = total
			return total
		},
		alturasPercent() {
			let total = 0
			total = this.total_sales_income * 0.1
			return total
		},
	},
	methods: {
		compareDateFrom() {
			let d1sec = Date.parse(this.date_from)
			let d2sec = Date.parse(this.date_to)

			if (d1sec <= d2sec) {
				return
			} else {
				this.date_to = null
				Swal.fire({
					type: 'error',
					title: 'Oops...',
					text:
						'Date from must be earlier or same date than or date to!',
				})
			}
		},
		emptyDateTo() {
			this.date_to = null
		},
		async fetch_sales_report() {
			const { data } = await axios.get(
				`/report/fetch_sales_report/${this.date_from}/${this.date_to}`
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
		},
	},
	mounted() {
		this.fetchTenantDetails()
	},
	filters: {
		moment: function(date) {
			return moment(date).format('MMMM DD, YYYY')
		},
		datetime: function(value) {
			const date = value.split(' ')
			if (date[1] == '00:00:00') {
				return `${new Intl.DateTimeFormat('default', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
				}).format(new Date(date))} ASAP`
			} else {
				return new Intl.DateTimeFormat('default', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
				}).format(new Date(date))
			}
		},
	},
}
</script>
