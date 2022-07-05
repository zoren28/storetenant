(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cooking-ways"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/CookingWaysComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/CookingWaysComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cooking_AddCookingWayComponent_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cooking/AddCookingWayComponent.vue */ "./resources/js/components/setup/cooking/AddCookingWayComponent.vue");
/* harmony import */ var _cooking_EditCookingWayComponent_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cooking/EditCookingWayComponent.vue */ "./resources/js/components/setup/cooking/EditCookingWayComponent.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AddCookingWay: _cooking_AddCookingWayComponent_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    EditCookingWay: _cooking_EditCookingWayComponent_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      table: {},
      table_data: [],
      params: {},
      cooking_details: {}
    };
  },
  computed: {
    getList: function getList() {
      return this.table_data;
    }
  },
  methods: {
    fetchCookingWays: function fetchCookingWays() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _yield$axios$get, data, this_data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ($.fn.DataTable.isDataTable('#dt-cooking-ways')) {
                  _this.table.destroy();

                  _this.table_data = [];
                }

                _context.next = 3;
                return axios.get('/suggestion/fetch_cooking_ways');

              case 3:
                _yield$axios$get = _context.sent;
                data = _yield$axios$get.data;
                _this.table_data = data;
                this_data = _this;
                setTimeout(function () {
                  this_data.table = $('#dt-cooking-ways').DataTable({
                    destroy: true,
                    "order": [[0, "asc"]],
                    "columnDefs": [{
                      "targets": [0],
                      "width": "10%"
                    }, {
                      "targets": [2],
                      "orderable": false,
                      "width": "10%",
                      "className": "text-center"
                    }],
                    language: {
                      paginate: {
                        previous: "<i class='mdi mdi-chevron-left'>",
                        next: "<i class='mdi mdi-chevron-right'>"
                      }
                    },
                    drawCallback: function drawCallback() {
                      $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
                    }
                  });
                }, 100);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    setupCookingWay: function setupCookingWay() {
      $("div#modal-add-cooking-way").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      });
    },
    editCookingType: function editCookingType(index, id) {
      this.cooking_details = {
        id: id
      };
      $("div#modal-edit-cooking-way").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      });
    },
    changeStatus: function changeStatus(index, id, status) {
      var _this2 = this;

      this.params = {
        id: id,
        status: status
      }; //Warning Message

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      }).then(function (result) {
        if (result.value) {
          axios.put('/suggestion/change_cooking_status', _this2.params).then(function (_ref) {
            var data = _ref.data,
                status = _ref.status;
            var message = data.message;
            Swal.fire({
              type: 'success',
              title: 'Success',
              text: message
            }).then(function (result) {
              _this2.fetchCookingWays();
            });
          });
        }
      });
    }
  },
  mounted: function mounted() {
    this.fetchCookingWays();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vform */ "./node_modules/vform/dist/vform.common.js");
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var object_to_formdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! object-to-formdata */ "./node_modules/object-to-formdata/dist/index.module.js");
/* harmony import */ var object_to_formdata__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(object_to_formdata__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



vue__WEBPACK_IMPORTED_MODULE_0___default.a.component(vform__WEBPACK_IMPORTED_MODULE_1__["HasError"].name, vform__WEBPACK_IMPORTED_MODULE_1__["HasError"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component(vform__WEBPACK_IMPORTED_MODULE_1__["AlertError"].name, vform__WEBPACK_IMPORTED_MODULE_1__["AlertError"]);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AddCookingWayComponent',
  data: function data() {
    return {
      clickSubmit: false,
      cookingForm: new vform__WEBPACK_IMPORTED_MODULE_1__["Form"]({
        cooking_way: null
      })
    };
  },
  methods: {
    checkCookingForm: function checkCookingForm() {
      var _this = this;

      this.clickSubmit = true;
      this.cookingForm.submit('post', '/cooking/add_cooking', {
        // Transform form data to FormData
        transformRequest: [function (data, headers) {
          return Object(object_to_formdata__WEBPACK_IMPORTED_MODULE_2__["serialize"])(data);
        }],
        onUploadProgress: function onUploadProgress(e) {// Do whatever you want with the progress event
          // console.log(e)
        }
      }).then(function (_ref) {
        var data = _ref.data,
            status = _ref.status;
        var message = data.message; //Success Message

        swal({
          title: 'Success!',
          text: message,
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-primary'
        }).then(function () {
          this.clickSubmit = false;
          this.cookingForm.clear();
          this.cookingForm.reset();
          this.$parent.fetchCookingWays();
          $("div#modal-add-cooking-way").modal('hide');
        }.bind(_this));
      })["catch"](function (error) {
        _this.clickSubmit = false;
        var _error$response = error.response,
            data = _error$response.data,
            status = _error$response.status;

        if (status == 401) {
          Swal.fire({
            type: 'warning',
            title: 'Warning',
            text: 'Session has been expired.'
          });
        } else if (status === 422) {
          var message = data.message;
          Swal.fire({
            type: 'warning',
            title: 'Warning',
            text: message
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Oops, something went wrong!'
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vform */ "./node_modules/vform/dist/vform.common.js");
/* harmony import */ var vform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var object_to_formdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! object-to-formdata */ "./node_modules/object-to-formdata/dist/index.module.js");
/* harmony import */ var object_to_formdata__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(object_to_formdata__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



vue__WEBPACK_IMPORTED_MODULE_0___default.a.component(vform__WEBPACK_IMPORTED_MODULE_1__["HasError"].name, vform__WEBPACK_IMPORTED_MODULE_1__["HasError"]);
vue__WEBPACK_IMPORTED_MODULE_0___default.a.component(vform__WEBPACK_IMPORTED_MODULE_1__["AlertError"].name, vform__WEBPACK_IMPORTED_MODULE_1__["AlertError"]);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EditCookingWayComponent',
  props: ['cooking_details'],
  data: function data() {
    return {
      clickSubmit: false,
      cookingForm: new vform__WEBPACK_IMPORTED_MODULE_1__["Form"]({
        id: null,
        cooking_way: null
      })
    };
  },
  methods: {
    fetchCookingDetails: function fetchCookingDetails(id) {
      var _this = this;

      axios.get("/cooking/fetch_cooking_details/".concat(id)).then(function (_ref) {
        var data = _ref.data;

        _this.cookingForm.fill(data);
      });
    },
    checkCookingForm: function checkCookingForm() {
      var _this2 = this;

      this.clickSubmit = true;
      this.cookingForm.submit('post', '/cooking/update_cooking_way', {
        // Transform form data to FormData
        transformRequest: [function (data, headers) {
          return Object(object_to_formdata__WEBPACK_IMPORTED_MODULE_2__["serialize"])(data);
        }],
        onUploadProgress: function onUploadProgress(e) {// Do whatever you want with the progress event
          // console.log(e)
        }
      }).then(function (_ref2) {
        var data = _ref2.data,
            status = _ref2.status;
        var message = data.message; //Success Message

        swal({
          title: 'Success!',
          text: message,
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-primary'
        }).then(function () {
          this.clickSubmit = false;
          this.$parent.fetchCookingWays();
          $("div#modal-edit-cooking-way").modal('hide');
        }.bind(_this2));
      })["catch"](function (error) {
        _this2.clickSubmit = false;
        var _error$response = error.response,
            data = _error$response.data,
            status = _error$response.status;

        if (status == 401) {
          Swal.fire({
            type: 'warning',
            title: 'Warning',
            text: 'Session has been expired.'
          });
        } else if (status === 422) {
          var message = data.message;
          Swal.fire({
            type: 'warning',
            title: 'Warning',
            text: message
          });
        } else {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Oops, something went wrong!'
          });
        }
      });
    }
  },
  watch: {
    cooking_details: function cooking_details(data) {
      this.fetchCookingDetails(data.id);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/CookingWaysComponent.vue?vue&type=template&id=713476fc&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/CookingWaysComponent.vue?vue&type=template&id=713476fc& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-md-12" }, [
                _c(
                  "button",
                  {
                    staticClass:
                      "btn btn-primary waves-effect waves-light float-right",
                    on: { click: _vm.setupCookingWay }
                  },
                  [
                    _c("i", { staticClass: "fas fa-plus-circle" }),
                    _vm._v(" Add Cooking Ways")
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("hr"),
            _vm._v(" "),
            _c(
              "table",
              {
                staticClass: "table table-sm table-hover",
                attrs: { id: "dt-cooking-ways", width: "100%" }
              },
              [
                _vm._m(1),
                _vm._v(" "),
                _vm.table_data.length > 0
                  ? _c(
                      "tbody",
                      _vm._l(_vm.getList, function(g, index) {
                        return _c("tr", { key: index }, [
                          _c("td", [_vm._v(_vm._s(index + 1) + ".")]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(g.cooking_way))]),
                          _vm._v(" "),
                          _c("td", [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-sm btn-light btn-rounded",
                                attrs: { "data-wenk": "Edit Cooking Type" },
                                on: {
                                  click: function($event) {
                                    return _vm.editCookingType(index, g.id)
                                  }
                                }
                              },
                              [
                                _c("i", {
                                  staticClass:
                                    "text-primary remixicon-file-edit-line"
                                })
                              ]
                            ),
                            _vm._v(" "),
                            g.status === 0
                              ? _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-sm btn-light btn-rounded",
                                    attrs: {
                                      "data-wenk": "Activate Status",
                                      "data-wenk-pos": "left"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.changeStatus(index, g.id, 1)
                                      }
                                    }
                                  },
                                  [
                                    _c("i", {
                                      staticClass:
                                        "text-success remixicon-check-fill"
                                    })
                                  ]
                                )
                              : _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-sm btn-light btn-rounded",
                                    attrs: {
                                      "data-wenk": "Deactivate Status",
                                      "data-wenk-pos": "left"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.changeStatus(index, g.id, 0)
                                      }
                                    }
                                  },
                                  [
                                    _c("i", {
                                      staticClass:
                                        "text-danger remixicon-close-fill"
                                    })
                                  ]
                                )
                          ])
                        ])
                      }),
                      0
                    )
                  : _vm._e()
              ]
            )
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        staticStyle: { display: "none" },
        attrs: {
          id: "modal-add-cooking-way",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel",
          "aria-hidden": "true"
        }
      },
      [_c("add-cooking-way")],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        staticStyle: { display: "none" },
        attrs: {
          id: "modal-edit-cooking-way",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c("edit-cooking-way", {
          attrs: { cooking_details: _vm.cooking_details }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "page-title-box" }, [
          _c("div", { staticClass: "page-title-right" }, [
            _c("ol", { staticClass: "breadcrumb m-0" }, [
              _c("li", { staticClass: "breadcrumb-item" }, [
                _c("a", { attrs: { href: "javascript: void(0);" } }, [
                  _vm._v("Setup")
                ])
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "breadcrumb-item active" }, [
                _vm._v("Types of Cooking Ways")
              ])
            ])
          ]),
          _vm._v(" "),
          _c("h4", { staticClass: "page-title" }, [
            _vm._v("Types of Cooking Ways")
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("No.")]),
        _vm._v(" "),
        _c("th", [_vm._v("Cooking ways")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=template&id=553748f9&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=template&id=553748f9& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-dialog" }, [
    _c("div", { staticClass: "modal-content" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "form",
        {
          attrs: { method: "post", enctype: "multipart/form-data" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.checkCookingForm($event)
            }
          }
        },
        [
          _c("div", { staticClass: "modal-body p-4" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-md-12" }, [
                _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c("label", { attrs: { for: "cooking_way" } }, [
                      _vm._v("Way of Cooking")
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.cookingForm.cooking_way,
                          expression: "cookingForm.cooking_way"
                        }
                      ],
                      staticClass: "form-control",
                      class: {
                        "is-invalid": _vm.cookingForm.errors.has("cooking_way")
                      },
                      attrs: {
                        type: "text",
                        id: "cooking_way",
                        placeholder: "Way of Cooking"
                      },
                      domProps: { value: _vm.cookingForm.cooking_way },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.cookingForm,
                            "cooking_way",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("has-error", {
                      attrs: { form: _vm.cookingForm, field: "cooking_way" }
                    })
                  ],
                  1
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-secondary waves-effect",
                attrs: { type: "button", "data-dismiss": "modal" }
              },
              [_vm._v("Close")]
            ),
            _vm._v(" "),
            _vm.clickSubmit === false
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-info waves-effect waves-light",
                    attrs: { type: "submit" }
                  },
                  [_vm._v("Save changes")]
                )
              : _c(
                  "button",
                  {
                    staticClass: "btn btn-info waves-effect waves-light",
                    attrs: { disabled: "" }
                  },
                  [
                    _c("span", {
                      staticClass: "spinner-border spinner-border-sm mr-1",
                      attrs: { role: "status", "aria-hidden": "true" }
                    }),
                    _vm._v("\n                    Loading...\n                ")
                  ]
                )
          ])
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c("h4", { staticClass: "modal-title" }, [_vm._v("Cooking Details")]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-hidden": "true"
          }
        },
        [_vm._v("×")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=template&id=91a57988&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=template&id=91a57988& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-dialog" }, [
    _c("div", { staticClass: "modal-content" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "form",
        {
          attrs: { method: "post", enctype: "multipart/form-data" },
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.checkCookingForm($event)
            }
          }
        },
        [
          _c("div", { staticClass: "modal-body p-4" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-md-12" }, [
                _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c("label", { attrs: { for: "cooking_way" } }, [
                      _vm._v("Way of Cooking")
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.cookingForm.cooking_way,
                          expression: "cookingForm.cooking_way"
                        }
                      ],
                      staticClass: "form-control",
                      class: {
                        "is-invalid": _vm.cookingForm.errors.has("cooking_way")
                      },
                      attrs: {
                        type: "text",
                        id: "cooking_way",
                        placeholder: "Way of Cooking"
                      },
                      domProps: { value: _vm.cookingForm.cooking_way },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.cookingForm,
                            "cooking_way",
                            $event.target.value
                          )
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("has-error", {
                      attrs: { form: _vm.cookingForm, field: "cooking_way" }
                    })
                  ],
                  1
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "modal-footer" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-secondary waves-effect",
                attrs: { type: "button", "data-dismiss": "modal" }
              },
              [_vm._v("Close")]
            ),
            _vm._v(" "),
            _vm.clickSubmit === false
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-info waves-effect waves-light",
                    attrs: { type: "submit" }
                  },
                  [_vm._v("Save changes")]
                )
              : _c(
                  "button",
                  {
                    staticClass: "btn btn-info waves-effect waves-light",
                    attrs: { disabled: "" }
                  },
                  [
                    _c("span", {
                      staticClass: "spinner-border spinner-border-sm mr-1",
                      attrs: { role: "status", "aria-hidden": "true" }
                    }),
                    _vm._v("\n                    Loading...\n                ")
                  ]
                )
          ])
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c("h4", { staticClass: "modal-title" }, [_vm._v("Cooking Details")]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-hidden": "true"
          }
        },
        [_vm._v("×")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/setup/CookingWaysComponent.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/setup/CookingWaysComponent.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CookingWaysComponent_vue_vue_type_template_id_713476fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CookingWaysComponent.vue?vue&type=template&id=713476fc& */ "./resources/js/components/setup/CookingWaysComponent.vue?vue&type=template&id=713476fc&");
/* harmony import */ var _CookingWaysComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CookingWaysComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/setup/CookingWaysComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CookingWaysComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CookingWaysComponent_vue_vue_type_template_id_713476fc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CookingWaysComponent_vue_vue_type_template_id_713476fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/setup/CookingWaysComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/setup/CookingWaysComponent.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/setup/CookingWaysComponent.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CookingWaysComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CookingWaysComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/CookingWaysComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CookingWaysComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/setup/CookingWaysComponent.vue?vue&type=template&id=713476fc&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/setup/CookingWaysComponent.vue?vue&type=template&id=713476fc& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookingWaysComponent_vue_vue_type_template_id_713476fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CookingWaysComponent.vue?vue&type=template&id=713476fc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/CookingWaysComponent.vue?vue&type=template&id=713476fc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookingWaysComponent_vue_vue_type_template_id_713476fc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookingWaysComponent_vue_vue_type_template_id_713476fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/setup/cooking/AddCookingWayComponent.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/setup/cooking/AddCookingWayComponent.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddCookingWayComponent_vue_vue_type_template_id_553748f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddCookingWayComponent.vue?vue&type=template&id=553748f9& */ "./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=template&id=553748f9&");
/* harmony import */ var _AddCookingWayComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddCookingWayComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddCookingWayComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddCookingWayComponent_vue_vue_type_template_id_553748f9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddCookingWayComponent_vue_vue_type_template_id_553748f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/setup/cooking/AddCookingWayComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCookingWayComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddCookingWayComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCookingWayComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=template&id=553748f9&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=template&id=553748f9& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCookingWayComponent_vue_vue_type_template_id_553748f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddCookingWayComponent.vue?vue&type=template&id=553748f9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/cooking/AddCookingWayComponent.vue?vue&type=template&id=553748f9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCookingWayComponent_vue_vue_type_template_id_553748f9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddCookingWayComponent_vue_vue_type_template_id_553748f9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/setup/cooking/EditCookingWayComponent.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/setup/cooking/EditCookingWayComponent.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditCookingWayComponent_vue_vue_type_template_id_91a57988___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditCookingWayComponent.vue?vue&type=template&id=91a57988& */ "./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=template&id=91a57988&");
/* harmony import */ var _EditCookingWayComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditCookingWayComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditCookingWayComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditCookingWayComponent_vue_vue_type_template_id_91a57988___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditCookingWayComponent_vue_vue_type_template_id_91a57988___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/setup/cooking/EditCookingWayComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCookingWayComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditCookingWayComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCookingWayComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=template&id=91a57988&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=template&id=91a57988& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCookingWayComponent_vue_vue_type_template_id_91a57988___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EditCookingWayComponent.vue?vue&type=template&id=91a57988& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/cooking/EditCookingWayComponent.vue?vue&type=template&id=91a57988&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCookingWayComponent_vue_vue_type_template_id_91a57988___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCookingWayComponent_vue_vue_type_template_id_91a57988___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);