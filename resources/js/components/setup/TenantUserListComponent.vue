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
                <a href="javascript: void(0);">Setup</a>
              </li>
              <li class="breadcrumb-item active">User List</li>
            </ol>
          </div>
          <h4 class="page-title">User List</h4>
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
                <button
                  class="btn btn-primary waves-effect waves-light float-right"
                  @click="addUser"
                >
                  <i class="fas fa-plus-circle"></i> &nbsp; Add User
                </button>
              </div>
            </div>
            <hr />
            <table id="dt-tenantuser-list" class="table table-sm table-hover">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Usertype</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in getList" :key="index">
                  <td>
                    <img
                      :src="$root.adminAccess + '' + item.image"
                      class="rounded-circle"
                      width="50"
                      height="50"
                      alt="User"
                    />
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.username }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.user_type }}</td>
                  <td>
                    <span v-if="item.active === 1">Active</span>
                    <span v-else>Inactive</span>
                  </td>
                  <td align="center">
                    <button
                      v-if="item.status === 'inactive'"
                      class="btn btn-sm btn-light btn-rounded"
                      @click="changeStatus(index, item.id, 1)"
                      data-wenk="Activate User"
                      data-wenk-pos="left"
                    >
                      <i class="text-success remixicon-check-fill"></i>
                    </button>
                    <button
                      v-else
                      class="btn btn-sm btn-light btn-rounded"
                      @click="changeStatus(index, item.id, 0)"
                      data-wenk="Deactivate User"
                      data-wenk-pos="left"
                    >
                      <i class="text-danger remixicon-close-fill"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end card body-->
        </div>
        <!-- end card -->
      </div>
      <!-- end col-->
    </div>
    <!-- end row-->

    <div
      id="modal-add-user"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <add-tenant-user></add-tenant-user>
    </div>
    <!-- /.modal -->

    <div
      id="modal-edit-user"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <edit-tenant-user :tenantId="tenant_id"></edit-tenant-user>
    </div>
    <!-- /.modal -->
  </div>
</template>
<script>
import AddTenantUser from './AddTenantUserComponent.vue'
import EditTenantUser from './EditTenantUserComponent.vue'

export default {
  components: {
    AddTenantUser,
    EditTenantUser
  },
  data() {
    return {
      table_data: [],
      params: [],
      tenant_id: null
    }
  },
  computed: {
    getList() {
      return this.table_data
    }
  },
  methods: {
    fetchTenantUserList() {
      axios.get('/tenantuser/fetch_tenant_user_list').then(response => {
        this.table_data = response.data

        var this_data = this
        setTimeout(function() {
          if ($.fn.DataTable.isDataTable('#dt-tenantuser-list')) {
            $('#dt-tenantuser-list')
              .clear()
              .destroy()
          }

          this_data.table = $('#dt-tenantuser-list').DataTable({
            destroy: true,
            order: [[2, 'asc']],
            lengthMenu: [5, 10, 15, 20, 25],
            columnDefs: [
              {
                targets: [6],
                orderable: false,
                width: '15%',
                className: 'text-center'
              }
            ],
            language: {
              paginate: {
                previous: "<i class='mdi mdi-chevron-left'>",
                next: "<i class='mdi mdi-chevron-right'>"
              }
            },
            drawCallback: function() {
              $('.dataTables_paginate > .pagination').addClass(
                'pagination-rounded'
              )
            }
          })
        }, 100)
      })
    },
    addUser() {
      $('div#modal-add-user').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    editUser(index, tenant_id) {
      this.tenant_id = tenant_id
      $('div#modal-edit-user').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    },
    changeStatus(val, product_id, status) {
      this.params = {
        id: product_id,
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
      }).then(result => {
        if (result.value) {
          axios
            .put('/tenantuser/update_status', this.params)
            .then(({ data, status }) => {
              const { message } = data

              Swal.fire({
                type: 'success',
                title: 'Success',
                text: message
              }).then(result => {
                this.fetchTenantUserList()
              })
            })
        }
      })
    }
  },
  mounted() {
    this.fetchTenantUserList()
  }
}
</script>
