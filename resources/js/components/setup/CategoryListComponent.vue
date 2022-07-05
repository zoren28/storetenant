<template>
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Setup</a></li>
                            <li class="breadcrumb-item active">Category List</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Category List</h4>
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
                                <button class="btn btn-primary waves-effect waves-light float-right" @click="addCategory"> <i class="fas fa-plus-circle"></i> &nbsp; Add Category</button>
                            </div>
                        </div>
                        <hr>
                        <table id="dt-category-list" class="table table-sm table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                <tr v-for="(g,index) in getList" :key="index">
                                    <td>{{g.category}}</td>
                                    <td><img :src="'/storage/'+g.image" width='90' height='60'></td>
                                    <td>{{g.status}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-light btn-rounded" @click="editCategory(index, g.category_id)" data-wenk="Edit Category"><i class="text-primary remixicon-file-edit-line"></i></button>
                                        <button v-if="g.status === 'inactive'" class="btn btn-sm btn-light btn-rounded" @click="changeStatus(index, g.category_id, 1)" data-wenk="Activate Category" data-wenk-pos="left"><i class="text-success remixicon-check-fill"></i></button>
                                        <button v-else class="btn btn-sm btn-light btn-rounded" @click="changeStatus(index, g.category_id, 0)" data-wenk="Deactivate Category" data-wenk-pos="left"><i class="text-danger remixicon-close-fill"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div> <!-- end card body-->
                </div> <!-- end card -->
            </div><!-- end col-->
        </div>
        <!-- end row-->

        <div id="modal-add-category" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <add-category/>
        </div><!-- /.modal -->

        <div id="modal-edit-category" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <edit-category :categoryid="category_id"/>
        </div><!-- /.modal -->

    </div>
</template>
<script> 
import EditCategory from "./EditCategoryComponent.vue"
import AddCategory from "./AddCategoryComponent.vue"

export default {
    components : {
        AddCategory,
        EditCategory,
    },
    data() {
        return {
            table_data : [],
            table : {},
            params : {},
            category_id : null,
        }
    },
    computed: {
        getList(){

            return this.table_data
        }
    },
    methods: {
        async fetchCategoryList(){

            if ( $.fn.DataTable.isDataTable( '#dt-category-list' ) ) {
                this.table.destroy();
                this.table_data = [];
            }

            const {data} = await axios.get('/category/fetch_category_list');  
            this.table_data = data;

            var this_data = this;
            setTimeout(function(){ 

                this_data.table = $('#dt-category-list').DataTable({
                    retrieve        : true,
                    destroy:true,
                    "lengthMenu": [ 5, 10, 15, 20, 25 ],
                    "order": [[ 0, "asc" ]],
                    "columnDefs":[  
                        {
                            "targets":[ 3 ],  
                            "orderable":false,
                            "width": "15%",
                            "className": "text-center" 
                        }
                    ],
                    language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},
                    drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}
                }); 

            }, 100);
        },
        addCategory() {

            $("div#modal-add-category").modal({

                backdrop: 'static',
                keyboard: false,
                show: true,
            });
        },
        editCategory(i, category_id) {

            $("div#modal-edit-category").modal({

                backdrop: 'static',
                keyboard: false,
                show: true,

            });
            
            this.category_id = category_id;

            var this_data = this;
            $('#dt-category-list').on('click', 'button.btn-rounded', function () {
            
                if ( !$(this).parents('tr').hasClass('selected') ) {
                    this_data.table.$('tr.selected').removeClass('selected');
                    $(this).parents('tr').addClass('selected');
                }
            });
        },
        changeStatus(val, category_id, status) {

            this.params = {
                id: category_id,
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
                    axios.post('/category/update_status', this.params).then(({ data, status }) => {
                        
                        const { message } = data;

                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.fetchCategoryList();
                        });
                    });
                }
            });
        },
    },
    mounted() {
        this.fetchCategoryList();
    },
}
</script>