<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Setup</a></li>
                            <li class="breadcrumb-item active">Unit of Measurement</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Unit of Measurement</h4>
                </div>
            </div>
        </div>     
        <!-- end page title --> 

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <button class="btn btn-primary waves-effect waves-light float-right" @click="setupUnitMeasure"><i class="fas fa-plus-circle"></i> Add Unit of Measurement</button>
                            </div>
                        </div>
                        <hr>
                        <table id="dt-unit-measure" class="table table-sm table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th>Unit of Measurement</th>
                                    <th>Abbreviate</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody v-if="table_data.length > 0">
                                <tr v-for="(g,index) in getList" :key="index">
                                    <td>{{g.unit_measure}}</td>
                                    <td>{{g.abbreviate}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-light btn-rounded" @click="editUOM(index, g.id)" data-wenk="Edit Unit of Measurement"><i class="text-primary remixicon-file-edit-line"></i></button>
                                        <button v-if="g.status === 0" class="btn btn-sm btn-light btn-rounded" @click="changeStatus(index, g.id, 1)" data-wenk="Activate Status" data-wenk-pos="left"><i class="text-success remixicon-check-fill"></i></button>
                                        <button v-else class="btn btn-sm btn-light btn-rounded" @click="changeStatus(index, g.id, 0)" data-wenk="Deactivate Status" data-wenk-pos="left"><i class="text-danger remixicon-close-fill"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div> <!-- end card body-->
                </div> <!-- end card -->
            </div><!-- end col-->
        </div>
        <!-- end row-->

        <div id="modal-add-unitmeasure" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <add-unit-measure/>
        </div><!-- /.modal -->

        <div id="modal-edit-unitmeasure" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <edit-unit-measure :uomDetails="id"/>
        </div><!-- /.modal -->

    </div>
</template>
<script>
import AddUnitMeasure from "./uom/AddUnitMeasureComponent.vue";
import EditUnitMeasure from "./uom/EditUnitMeasureComponent.vue";

export default {
    components : {
        AddUnitMeasure,
        EditUnitMeasure
    },
    data() {
        return {
            table: {},
            table_data : [],
            params : {},
            id : null,
        }
    },
    computed: {
        getList(){
            return this.table_data;
        }
    },
    methods: {
        fetchUOM() {

            if ( $.fn.DataTable.isDataTable( '#dt-unit-measure' ) ) {
                this.table.destroy();
                this.table_data = [];
            }

            axios.get('/unit_measure/fetch_unit_measure').then((response) => {
                this.table_data = response.data ;

                var this_data = this;
                setTimeout(function(){ 

                    this_data.table = $('#dt-unit-measure').DataTable({
                        destroy : true,
                        "order": [[ 0, "asc" ]],
                        "columnDefs":[  
                            {  
                                "targets":[0, 1],  
                                "orderable":false
                            }, 
                            {
                                "targets":[2],  
                                "orderable":false,
                                "width": "20%",
                                "className": "text-center" 
                            },
                        ],
                        language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},
                        drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}
                    });
                }, 100);
            });
        },
        setupUnitMeasure() {

            $("div#modal-add-unitmeasure").modal({

                backdrop: 'static',
                keyboard: false,
                show: true,
            });
        },
        changeStatus(index, id, status) {

            this.params = {
                id: id,
                status: status
            }

            //Warning Message
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it!'
            }).then((result) => {
        
                if (result.value) {
                    axios.put('/unit_measure/change_status', this.params).then(({ data, status }) => {
                        
                        const { message } = data;

                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.fetchUOM();
                        });
                    });
                }
            });
        },
        editUOM(index, id) {
            this.id = id;

            $("div#modal-edit-unitmeasure").modal({

                backdrop: 'static',
                keyboard: false,
                show: true,
            });
        }
    },
    mounted() {
        this.fetchUOM();
    },
}
</script>