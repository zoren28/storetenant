<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Setup</a></li>
                            <li class="breadcrumb-item active">Serving Time Schedule</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Serving Time Schedule</h4>
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
                                <button :disabled="table_data.length > 0" class="btn btn-primary waves-effect waves-light float-right" @click="setupSchedule"><i class="fas fa-wrench"></i> Setup Schedule</button>
                            </div>
                        </div>
                        <hr>
                        <table id="dt-pickup-schedule" class="table table-sm table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th>Time Start</th>
                                    <th>Time End</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="table_data.length > 0">
                                <tr v-for="(g,index) in getList" :key="index">
                                    <td>{{'2020-09-16 '+g.time_start | momentTime}}</td>
                                    <td>{{'2020-09-16 '+g.time_end | momentTime}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-light btn-rounded" @click="editSchedule(index, g.id)" data-wenk="Edit Schedule"><i class="text-primary remixicon-file-edit-line"></i></button>
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

        <div id="modal-edit-schedule" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <edit-pickup-schedule :scheduleDetails="id"/>
        </div><!-- /.modal -->

        <div id="modal-add-schedule" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <add-pickup-schedule/>
        </div><!-- /.modal -->

    </div>
</template>
<script>
import EditSchedule from "./pickup/EditScheduleComponent.vue";
import AddSchedule from "./pickup/AddScheduleComponent.vue";

export default {
    components : {
        'edit-pickup-schedule':EditSchedule,
        'add-pickup-schedule':AddSchedule
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
        fetchPickUpSchedule() {

            if ( $.fn.DataTable.isDataTable( '#dt-pickup-schedule' ) ) {
                this.table.destroy();
                this.table_data = [];
            }

            axios.get('/schedule/fetch_pickup_schedule').then((response) => {
                this.table_data = response.data ;

                var this_data = this;
                setTimeout(function(){ 

                    this_data.table = $('#dt-pickup-schedule').DataTable({
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
        setupSchedule() {

            $("div#modal-add-schedule").modal({

                backdrop: 'static',
                keyboard: false,
                show: true,
            });
        },
        editSchedule(index, id) {
            this.id = id;

            $("div#modal-edit-schedule").modal({

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
                    axios.put('/schedule/pickup_status', this.params).then(({ data, status }) => {
                        
                        const { message } = data;

                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.fetchPickUpSchedule();
                        });
                    });
                }
            });
        }
    },
    mounted() {
        this.fetchPickUpSchedule();
    },
    filters : {
        momentTime: function (time) {
            return moment(time).format('h:mm A');
        }
    }
}
</script>