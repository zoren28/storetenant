<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Setup</a></li>
                            <li class="breadcrumb-item active">Suggestion Types</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Suggestion Types</h4>
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
                                <button v-if="clickAddSuggestion === false" class="btn btn-primary waves-effect waves-light float-right" @click="setupSuggestion"><i class="fas fa-plus-circle"></i> Add Suggestion</button>
                                <button v-else class="btn btn-primary waves-effect waves-light float-right" disabled="">
                                    <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                            </div>
                        </div>
                        <hr>
                        <table id="dt-suggestion" class="table table-sm table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Suggestion</th>
                                    <th>Types</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="table_data.length > 0">
                                <tr v-for="(g,index) in getList" :key="index">
                                    <td>{{index+1}}.</td>
                                    <td>{{g.suggestion}}</td>
                                    <td>{{g.description}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-light btn-rounded" @click="editSuggestion(index, g.id)" data-wenk="Edit Suggestion"><i class="text-primary remixicon-file-edit-line"></i></button>
                                        <button v-if="g.status === 0" class="btn btn-sm btn-light btn-rounded" @click="changeStatus(index, g.id, 1)" data-wenk="Activate Status" data-wenk-pos="left"><i class="text-success remixicon-check-fill"></i></button>
                                        <button v-else class="btn btn-sm btn-light btn-rounded" @click="changeStatus(index, g.id, 0)" data-wenk="Deactivate Status" data-wenk-pos="left"><i class="text-danger remixicon-close-fill"></i></button>
                                        <button class="btn btn-sm btn-light btn-rounded" @click="deleteSuggestion(g.id)" data-wenk="Delete Suggestion"><i class="text-danger remixicon-delete-bin-2-line"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div> <!-- end card body-->
                </div> <!-- end card -->
            </div><!-- end col-->
        </div>
        <!-- end row-->

         <div id="modal-add-suggestion" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <add-suggestion :suggestions="suggestions"/>
        </div><!-- /.modal -->

        <div id="modal-edit-suggestion" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <edit-suggestion :suggestions="suggestions" :suggestion_details="suggestion_details"/>
        </div><!-- /.modal -->


    </div>
</template>
<script>
import AddSuggestion from "./suggestion/AddSuggestionComponent.vue";
import EditSuggestion from "./suggestion/EditSuggestionComponent.vue";

export default {
    components : {
        AddSuggestion,
        EditSuggestion
    },
    data() {
        return {
            clickAddSuggestion  :false,
            table: {},
            table_data : [],
            params : {},
            suggestions : {},
            suggestion_details : {},
        }
    },
    computed: {
        getList(){
            return this.table_data;
        }
    },
    methods: {
        async fetchSuggestionTypes() {

            if ( $.fn.DataTable.isDataTable( '#dt-suggestion' ) ) {
                this.table.destroy();
                this.table_data = [];
            }

            const {data} = await axios.get('/suggestion/fetch_product_suggestion');
            this.table_data = data;

            var this_data = this;
            setTimeout(function(){ 

                this_data.table = $('#dt-suggestion').DataTable({
                    destroy : true,
                    "order": [[ 1, "asc" ]],
                    "columnDefs":[  
                        {  
                            "targets":[0],  
                            "width": "10%"
                        },
                        {
                            "targets":[3],  
                            "orderable":false,
                            "width": "15%",
                            "className": "text-center" 
                        },
                    ],
                    language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},
                    drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}
                });
            }, 100);
        },
        async setupSuggestion() {

            this.clickAddSuggestion = true;

            const {data} = await axios.get("/suggestion/fetch_suggestion");
            this.suggestions = data;

            $("div#modal-add-suggestion").modal({

                backdrop: 'static',
                keyboard: false,
                show: true,
            });

            this.clickAddSuggestion = false;
        },
        async editSuggestion(index, id) {

            const {data} = await axios.get("/suggestion/fetch_suggestion");
            this.suggestions = data;
            
            this.suggestion_details = {
                id : id
            }

            $("div#modal-edit-suggestion").modal({

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
                    axios.put('/suggestion/change_status', this.params).then(({ data, status }) => {
                        
                        const { message } = data;

                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.fetchSuggestionTypes();
                        });
                    });
                }
            });
        },
        deleteSuggestion(id) {

            this.params = {
                id: id,
                status: status
            }

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
        
                if (result.value) {
                    axios.delete(`/suggestion/delete_suggestion/${id}`).then(({ data, status }) => {
                        
                        const { message } = data;

                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.fetchSuggestionTypes();
                        });
                    });
                }
            });
        }
    },
    mounted() {
        this.fetchSuggestionTypes();
    },
}
</script>