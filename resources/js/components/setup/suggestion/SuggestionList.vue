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
              <li class="breadcrumb-item active">Suggestion List</li>
            </ol>
          </div>
          <h4 class="page-title">Suggestion List</h4>
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
                  @click="addSuggestion"
                >
                  <i class="fas fa-plus-circle"></i> &nbsp; Add Suggestion
                </button>
              </div>
            </div>
            <hr />
            <table
              id="dt-suggestion-list"
              class="table table-sm table-hover"
              width="100%"
            >
              <thead>
                <tr>
                  <th>Suggestion</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(g, index) in getList" :key="index">
                  <td>{{ g.suggestion }}</td>
                  <td v-if="g.status === 1">active</td>
                  <td v-if="g.status === 0">inactive</td>
                  <td>
                    <button
                      class="btn btn-sm btn-light btn-rounded"
                      :class="`update-button-${g.id}`"
                      @click="editSuggestion(g.id)"
                      data-wenk="Edit Suggestion"
                    >
                      <i class="text-primary remixicon-pencil-line"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-light btn-rounded"
                      :class="'update-suggestion-' + g.id"
                      style="display:none;"
                    >
                      <span
                        class="spinner-border spinner-border-sm text-primary"
                        role="status"
                        aria-hidden="true"
                      ></span>
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
      id="modal-add-suggestion"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <add-suggestion />
    </div>
    <!-- /.modal -->

    <div
      id="modal-edit-suggestion"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: none;"
    >
      <edit-suggestion :suggestion="suggestion" />
    </div>
    <!-- /.modal -->
  </div>
</template>
<script>
import AddSuggestion from './AddSuggestion.vue'
import EditSuggestion from './EditSuggestion.vue'

export default {
  components: {
    AddSuggestion,
    EditSuggestion
  },
  data() {
    return {
      table_data: [],
      table: {},
      suggestion: {}
    }
  },
  computed: {
    getList() {
      return this.table_data
    }
  },
  methods: {
    async editSuggestion(id) {
      $(`.update-button-${id}`).hide()
      $(`.update-suggestion-${id}`).show()

      const { data } = await axios.get(
        `/suggestion/get_suggestion_details/${id}`
      )

      this.suggestion = data

      $('div#modal-edit-suggestion').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })

      $(`.update-button-${id}`).show()
      $(`.update-suggestion-${id}`).hide()
    },
    async fetchSuggestionList() {
      if ($.fn.DataTable.isDataTable('#dt-suggestion-list')) {
        this.table.destroy()
        this.table_data = []
      }

      const { data } = await axios.get('/suggestion/fetch_suggestion_list')
      this.table_data = data

      var this_data = this
      setTimeout(function() {
        this_data.table = $('#dt-suggestion-list').DataTable({
          retrieve: true,
          destroy: true,
          lengthMenu: [5, 10, 15, 20, 25],
          order: [[0, 'asc']],
          columnDefs: [
            {
              targets: [2],
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
    },
    addSuggestion() {
      $('div#modal-add-suggestion').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      })
    }
  },
  mounted() {
    this.fetchSuggestionList()
  }
}
</script>
