<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Setup</a></li>
                            <li class="breadcrumb-item active">Container Type</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Container Type</h4>
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
                                <button class="btn btn-primary waves-effect waves-light float-right" @click="addContainer"> <i class="fas fa-plus-circle"></i> &nbsp; Add Container Type</button>
                            </div>
                        </div>
                        <hr>
                        <table id="dt-container-list" class="table table-sm table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th>Container Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="table_data.length > 0">
                                <tr v-for="(g,index) in getList" :key="index">
                                    <td>{{g.container_type}}</td>
                                    <td>
                                        <span v-if="g.status === 0">inactive</span>
                                        <span v-else>active</span>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-light btn-rounded" @click="editContainer(index, g.id)" data-wenk="Edit Container Type"><i class="text-primary remixicon-file-edit-line"></i></button>
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

        <div id="modal-add-container" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <add-container-type/>
        </div><!-- /.modal -->

        <div id="modal-edit-container" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <edit-container-type :containerDetails="params"/>
        </div><!-- /.modal -->

    </div>
</template>
<script>
import AddContainerType from "./container/AddContainerTypeComponent.vue";
import EditContainerType from "./container/EditContainerTypeComponent.vue";

export default {
    components : {
        'add-container-type' : AddContainerType,
        'edit-container-type' : EditContainerType,
    },
    data() {
        return {
            table: {},
            table_data : [],
            params : {},
        }
    },
    computed: {
        getList(){
            return this.table_data;
        }
    },
    methods: {
        fetchContainerType() {

            if ( $.fn.DataTable.isDataTable( '#dt-container-list' ) ) {
                this.table.destroy();
                this.table_data = [];
            }

            axios.get('/container/fetch_container_type').then((response) => {
                this.table_data = response.data ;

                var this_data = this;
                setTimeout(function(){ 

                    this_data.table = $('#dt-container-list').DataTable({
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
        addContainer() {
            
            $("div#modal-add-container").modal({

                backdrop: 'static',
                keyboard: false,
                show: true,
            });
        },
        editContainer(index, id) {
            
            this.params = {
                id:id
            }

            $("div#modal-edit-container").modal({

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
                    axios.put('/container/change_status', this.params).then(({ data, status }) => {
                        
                        const { message } = data;

                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.fetchContainerType();
                        });
                    });
                }
            });
        },
    },
    mounted() {
        this.fetchContainerType();
    },
}
</script>