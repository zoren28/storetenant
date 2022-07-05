(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["choice-sides"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SelectChoiceSidesComponent_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectChoiceSidesComponent.vue */ "./resources/js/components/setup/product/SelectChoiceSidesComponent.vue");


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
    SelectProduct: _SelectChoiceSidesComponent_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      clickSetup: false,
      table_data: [],
      params: [],
      fd_products: [],
      product_choice: 1
    };
  },
  computed: {
    getList: function getList() {
      return this.table_data;
    }
  },
  methods: {
    fetchProductList: function fetchProductList(choice, filter) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response, this_data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ($.fn.DataTable.isDataTable('#dt-product-list')) {
                  _this.table.destroy();

                  _this.table_data = [];
                }

                _context.next = 3;
                return axios.get("/product/fetch_product_choice/".concat(choice, "/").concat(filter));

              case 3:
                response = _context.sent;
                _this.table_data = response.data;
                this_data = _this;
                setTimeout(function () {
                  this_data.table = $('#dt-product-list').DataTable({
                    destroy: true,
                    "order": [[0, "asc"]],
                    "columnDefs": [{
                      "targets": [1],
                      "orderable": false
                    }, {
                      "targets": [2, 3],
                      "orderable": false,
                      "width": "20%",
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

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    selectProduct: function selectProduct() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _yield$axios$get, data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.clickSetup = true;
                _context2.next = 3;
                return axios.get("/product/fetch_product_choice/".concat(_this2.product_choice, "/0"));

              case 3:
                _yield$axios$get = _context2.sent;
                data = _yield$axios$get.data;
                _this2.fd_products = data;
                $("div#modal-select-product").modal({
                  backdrop: 'static',
                  keyboard: false,
                  show: true
                });
                _this2.clickSetup = false;

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    removeProduct: function removeProduct(product_id) {
      var _this3 = this;

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
          _this3.params = {
            product_id: product_id,
            product_choice: _this3.product_choice
          };
          axios.put('/product/remove_choice_sides', _this3.params).then(function (_ref) {
            var data = _ref.data,
                status = _ref.status;
            var message = data.message;
            Swal.fire({
              type: 'success',
              title: 'Success',
              text: message
            }).then(function (result) {
              _this3.fetchProductList(_this3.product_choice, 1);
            });
          });
        }
      });
    }
  },
  mounted: function mounted() {
    this.fetchProductList(this.product_choice, 1);
  },
  watch: {
    product_choice: function product_choice() {
      this.fetchProductList(this.product_choice, 1);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: 'SelectChoiceSidesComponent',
  props: ['fd_products', 'product_choice'],
  data: function data() {
    return {
      clickSubmit: false,
      params: {}
    };
  },
  computed: {
    getProductList: function getProductList() {
      this.loadTable();
      return this.fd_products;
    }
  },
  methods: {
    loadTable: function loadTable() {
      if ($.fn.DataTable.isDataTable('#dt-product-option-list')) {
        this.table.destroy();
        this.table_data = [];
      }

      var this_data = this;
      setTimeout(function () {
        this_data.table = $('#dt-product-option-list').DataTable({
          destroy: true,
          "order": [[2, "asc"]],
          columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0
          }, {
            "targets": [1],
            "visible": false,
            "searchable": false
          }],
          select: {
            style: 'multi',
            selector: 'td:first-child'
          },
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
    },
    selectProductForm: function selectProductForm() {
      var _this = this;

      var value = this.table.rows('.selected').data();
      var newCHK = [];
      $.each(value, function (i) {
        var id = value[i][1];
        newCHK.push(id);
      });
      this.params = {
        product_ids: newCHK,
        product_choice: this.product_choice
      };
      axios.post('/product/add_choice_sides', this.params).then(function (_ref) {
        var data = _ref.data,
            status = _ref.status;
        var message = data.message;
        Swal.fire({
          type: 'success',
          title: 'Success',
          text: message,
          allowOutsideClick: false
        }).then(function (result) {
          $("div#modal-select-product").modal('hide');

          _this.$parent.fetchProductList(_this.product_choice, 1);
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=template&id=c22d0102&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=template&id=c22d0102& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
              _c("div", { staticClass: "col-md-4" }, [
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model.number",
                        value: _vm.product_choice,
                        expression: "product_choice",
                        modifiers: { number: true }
                      }
                    ],
                    staticClass: "form-control",
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return _vm._n(val)
                          })
                        _vm.product_choice = $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "1" } }, [
                      _vm._v("Choice of Drinks")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "2" } }, [
                      _vm._v("Choice of Fries")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "3" } }, [
                      _vm._v("Choice of Sides")
                    ])
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-8" }, [
                _vm.clickSetup === false
                  ? _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-primary waves-effect waves-light float-right",
                        on: { click: _vm.selectProduct }
                      },
                      [
                        _c("i", { staticClass: "fas fa-plus-circle" }),
                        _vm._v("   Select Product")
                      ]
                    )
                  : _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-primary waves-effect waves-light float-right",
                        attrs: { disabled: "" }
                      },
                      [
                        _c("span", {
                          staticClass: "spinner-border spinner-border-sm mr-1",
                          attrs: { role: "status", "aria-hidden": "true" }
                        }),
                        _vm._v(
                          "\n                                Loading...\n                            "
                        )
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
                attrs: { id: "dt-product-list", width: "100%" }
              },
              [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.getList, function(g, index) {
                    return _c("tr", { key: index }, [
                      _c("td", [
                        _c(
                          "span",
                          { staticClass: "font-weight-bold text-dark" },
                          [_vm._v(_vm._s(g.product_name))]
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c("span", { staticClass: "text-dark" }, [
                          _vm._v(_vm._s(g.description))
                        ])
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c("img", {
                          attrs: {
                            src: "storage/" + g.image,
                            width: "90",
                            height: "60"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-sm btn-light btn-rounded",
                            class: "remove-button-" + g.product_id,
                            attrs: { "data-wenk": "Remove Product" },
                            on: {
                              click: function($event) {
                                return _vm.removeProduct(g.product_id)
                              }
                            }
                          },
                          [
                            _c("i", {
                              staticClass:
                                "text-danger remixicon-delete-bin-2-line"
                            })
                          ]
                        )
                      ])
                    ])
                  }),
                  0
                )
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
          id: "modal-select-product",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c("select-product", {
          attrs: {
            fd_products: _vm.fd_products,
            product_choice: _vm.product_choice
          }
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
                _vm._v("Product Choice")
              ])
            ])
          ]),
          _vm._v(" "),
          _c("h4", { staticClass: "page-title" }, [_vm._v("Product Choice")])
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
        _c("th", [_vm._v("Product Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Description")]),
        _vm._v(" "),
        _c("th", [_vm._v("Image")]),
        _vm._v(" "),
        _c("th", [_vm._v("Action")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=template&id=e0eba64a&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=template&id=e0eba64a& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "modal-dialog modal-lg" }, [
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
              return _vm.selectProductForm($event)
            }
          }
        },
        [
          _c("div", { staticClass: "modal-body p-4" }, [
            _c(
              "table",
              {
                staticClass: "table table-bordered table-hover",
                attrs: { id: "dt-product-option-list", width: "100%" }
              },
              [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.getProductList, function(p, index) {
                    return _c("tr", { key: index }, [
                      _c("td"),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(p.product_id))]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "span",
                          { staticClass: "font-weight-bold text-dark" },
                          [_vm._v(_vm._s(p.product_name))]
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c("img", {
                          attrs: {
                            src: "storage/" + p.image,
                            width: "90",
                            height: "60",
                            alt: ""
                          }
                        })
                      ])
                    ])
                  }),
                  0
                )
              ]
            )
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
      _c("h4", { staticClass: "modal-title" }, [_vm._v("Select Product(s)")]),
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
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("td"),
        _vm._v(" "),
        _c("td"),
        _vm._v(" "),
        _c("td", [_vm._v("Product Name")]),
        _vm._v(" "),
        _c("td", [_vm._v("Image")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/setup/product/ChoiceSidesComponent.vue":
/*!************************************************************************!*\
  !*** ./resources/js/components/setup/product/ChoiceSidesComponent.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChoiceSidesComponent_vue_vue_type_template_id_c22d0102___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChoiceSidesComponent.vue?vue&type=template&id=c22d0102& */ "./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=template&id=c22d0102&");
/* harmony import */ var _ChoiceSidesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChoiceSidesComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ChoiceSidesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChoiceSidesComponent_vue_vue_type_template_id_c22d0102___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ChoiceSidesComponent_vue_vue_type_template_id_c22d0102___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/setup/product/ChoiceSidesComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChoiceSidesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ChoiceSidesComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChoiceSidesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=template&id=c22d0102&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=template&id=c22d0102& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChoiceSidesComponent_vue_vue_type_template_id_c22d0102___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ChoiceSidesComponent.vue?vue&type=template&id=c22d0102& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/product/ChoiceSidesComponent.vue?vue&type=template&id=c22d0102&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChoiceSidesComponent_vue_vue_type_template_id_c22d0102___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChoiceSidesComponent_vue_vue_type_template_id_c22d0102___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/setup/product/SelectChoiceSidesComponent.vue":
/*!******************************************************************************!*\
  !*** ./resources/js/components/setup/product/SelectChoiceSidesComponent.vue ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectChoiceSidesComponent_vue_vue_type_template_id_e0eba64a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectChoiceSidesComponent.vue?vue&type=template&id=e0eba64a& */ "./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=template&id=e0eba64a&");
/* harmony import */ var _SelectChoiceSidesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectChoiceSidesComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SelectChoiceSidesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SelectChoiceSidesComponent_vue_vue_type_template_id_e0eba64a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SelectChoiceSidesComponent_vue_vue_type_template_id_e0eba64a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/setup/product/SelectChoiceSidesComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectChoiceSidesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectChoiceSidesComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectChoiceSidesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=template&id=e0eba64a&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=template&id=e0eba64a& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectChoiceSidesComponent_vue_vue_type_template_id_e0eba64a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectChoiceSidesComponent.vue?vue&type=template&id=e0eba64a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/product/SelectChoiceSidesComponent.vue?vue&type=template&id=e0eba64a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectChoiceSidesComponent_vue_vue_type_template_id_e0eba64a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectChoiceSidesComponent_vue_vue_type_template_id_e0eba64a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);