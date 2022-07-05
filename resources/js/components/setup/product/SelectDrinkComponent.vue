<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Select Product(s)</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <form @submit.prevent="selectProductForm" method="post" enctype="multipart/form-data">
                <div class="modal-body p-4">
                    <table class="table table-bordered table-hover" id="dt-product-option-list" width="100%">
                        <thead>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Product Name</td>
                                <td>Image</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = "(p,index) in getProductList" :key="index">
                                <td></td>
                                <td>{{p.product_id}}</td>
                                <td><span class="font-weight-bold text-dark">{{p.product_name}}</span></td>
                                <td><img :src="'storage/'+p.image" width='90' height='60' alt=""></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                    <button v-if="clickSubmit === false" type="submit" class="btn btn-info waves-effect waves-light">Save changes</button>
                    <button v-else class="btn btn-info waves-effect waves-light" disabled="">
                        <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name : 'SelectDrinkComponent',
    props : ['fd_products'],
    data() {
        return {
            clickSubmit : false,
            params : {},
        }
    },
    computed: {
        getProductList() {

            this.loadTable();
            return this.fd_products;
        }
    },
    methods: {
        loadTable() {

            if ( $.fn.DataTable.isDataTable( '#dt-product-option-list' ) ) {
                this.table.destroy();
                this.table_data = [];
            }

            var this_data = this;
            setTimeout(function(){ 

                this_data.table = $('#dt-product-option-list').DataTable({
                    destroy : true,
                    "order": [[ 2, "asc" ]],
                    columnDefs: [ 
                        {
                            orderable: false,
                            className: 'select-checkbox',
                            targets:   0
                        },
                        {
                            "targets": [ 1 ],
                            "visible": false,
                            "searchable": false
                        },
                    ],
                    select: {
                        style:    'multi',
                        selector: 'td:first-child'
                    },
                    language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},
                    drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}
                });
            }, 100);
        },
        selectProductForm() {

			var value =  this.table.rows('.selected').data(); 

			var newCHK = [];
			$.each(value, function (i) {
              	var id 	= value[i][1];
              	newCHK.push(id);
            });

            this.params = {
                product_ids : newCHK
            }

            axios.post('/product/add_choice_drink', this.params).then(({ data, status }) => {
                
                const { message } = data;

                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    text: message,
                    allowOutsideClick: false
                }).then((result) => {

                    $("div#modal-select-product").modal('hide');
                    this.$parent.fetchProductList(1);
                });
            });
        }
    },
}
</script>