(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunks/category-list~chunks/product-list"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/AddProductComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/AddProductComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
  name: "AddProductComponent",
  data: function data() {
    return {
      fd_types: [],
      selected: [],
      table_data: [],
      product_ids: [],
      fd_unit_measures: [],
      product_quantities: [],
      list_product: false,
      addOnPrice: true,
      addProductForm: new vform__WEBPACK_IMPORTED_MODULE_1__["Form"]({
        product: null,
        description: null,
        price: 0,
        quantity: '',
        unit_measure: null,
        "package": null,
        addon: null,
        addon_price: 0
      })
    };
  },
  methods: {
    fetch_product_type: function fetch_product_type() {
      var _this = this;

      axios.get("/product/fetch_product_type").then(function (response) {
        _this.fd_types = response.data;
      });
    },
    fetch_unit_measures: function fetch_unit_measures() {
      var _this2 = this;

      axios.get("/product/fetch_unit_measures").then(function (response) {
        _this2.fd_unit_measures = response.data;
      });
    },
    addOn: function addOn() {
      if (this.addProductForm.addon == 0) {
        this.addOnPrice = true;
        this.addProductForm.addon_price = 0;
      } else {
        this.addOnPrice = false;
        this.addProductForm.addon_price = null;
      }
    },
    isPackage: function isPackage() {
      var _this3 = this;

      if (this.addProductForm["package"] == 0) {
        this.list_product = false;
        this.product_ids = [];
        this.product_quantities = [];
      } else {
        this.list_product = true;

        if ($.fn.DataTable.isDataTable('#dt-listProduct')) {
          var listProduct = $('#dt-listProduct').DataTable({
            destroy: true,
            "lengthMenu": [5, 10, 15, 20, 25],
            "order": [[1, "asc"]],
            "columnDefs": [{
              "targets": [0],
              "orderable": false
            }, {
              "targets": [2],
              "orderable": false
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
          listProduct.$('tr.selected').removeClass('selected');
          $("input.chk_").prop("checked", false);
          $("input.quantity_").prop("disabled", true);
          $("input.quantity_").val('');
          $('#dt-listProduct').on('change', 'input.chk', function () {
            if (!$(this).parents('tr').hasClass('selected')) {
              $(this).parents('tr').addClass('selected');
            } else {
              $(this).parents('tr').removeClass('selected');
            }
          });
        }

        axios.get('/product/fetch_product_list').then(function (response) {
          _this3.table_data = response.data;
        });
      }
    },
    productQuantity: function productQuantity(id) {
      var quantity = $("input.quantity_" + id).val();
      var product_id = $("span.product_" + id).text();

      if (parseInt(quantity) !== NaN || parseInt(quantity) !== "" || parseInt(quantity) !== 0) {
        var thisArray = this.product_ids;
        var thisArray2 = this.product_quantities;

        if (thisArray.indexOf(product_id) > -1) {
          var arryIndex = thisArray.indexOf(product_id);
          thisArray2.splice(arryIndex, 1, quantity);
        } else {
          this.product_ids.push(product_id);
          this.product_quantities.push(quantity);
        }
      }
    },
    selectChkbox: function selectChkbox(i) {
      var checkBox = $("input#chk_" + i);

      if (checkBox.is(":checked")) {
        $("input.chk_" + i).prop("checked", true);
        $("input.quantity_" + i).prop("disabled", false);
      } else {
        $("input.chk_" + i).prop("checked", false);
        $("input.quantity_" + i).prop("disabled", true);
        $("input.quantity_" + i).val('');
        var product_id = $("span.product_" + i).text();
        var quantity = $("input.quantity_" + i).val();
        var thisArray = this.product_ids;
        var thisArray2 = this.product_quantities;

        if (thisArray.indexOf(product_id) > -1) {
          var arryIndex = thisArray.indexOf(product_id);
          thisArray.splice(arryIndex, 1);

          if (parseInt(quantity) !== NaN || parseInt(quantity) !== "" || parseInt(quantity) !== 0) {
            thisArray2.splice(arryIndex, 1);
          }
        }
      }
    }
  },
  computed: {
    getList: function getList() {
      if (Object.keys(this.table_data).length) {
        loadData();
      }

      return this.table_data;
    }
  },
  mounted: function mounted() {
    this.fetch_product_type();
    this.fetch_unit_measures();
  }
});

function loadData() {
  setTimeout(function () {
    var listProduct = $('#dt-listProduct').DataTable({
      destroy: true,
      "lengthMenu": [5, 10, 15, 20, 25],
      "order": [[1, "asc"]],
      "columnDefs": [{
        "targets": [0],
        "orderable": false
      }, {
        "targets": [2],
        "orderable": false
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
    $('#dt-listProduct').on('change', 'input.chk', function () {
      if (!$(this).parents('tr').hasClass('selected')) {
        $(this).parents('tr').addClass('selected');
      } else {
        $(this).parents('tr').removeClass('selected');
      }
    });
  }, 100);
}

function destroyTable() {
  var listProduct = $('#dt-listProduct').DataTable();
  listProduct.destroy();
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/AddProductComponent.vue?vue&type=template&id=0b6c22bc&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/AddProductComponent.vue?vue&type=template&id=0b6c22bc& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _c(
              "label",
              { staticClass: "control-label", attrs: { for: "field-1" } },
              [_vm._v("Product Name")]
            ),
            _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.addProductForm.product,
                  expression: "addProductForm.product"
                }
              ],
              staticClass: "form-control",
              class: { "is-invalid": _vm.addProductForm.errors.has("product") },
              attrs: {
                type: "text",
                id: "field-1",
                placeholder: "Product Name"
              },
              domProps: { value: _vm.addProductForm.product },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.addProductForm, "product", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _c("has-error", {
              attrs: { form: _vm.addProductForm, field: "product" }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _c(
              "label",
              { staticClass: "control-label", attrs: { for: "field-2" } },
              [_vm._v("Product Image")]
            ),
            _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
            _vm._v(" "),
            _c("input", {
              ref: "image",
              staticClass: "form-control",
              class: { "is-invalid": _vm.addProductForm.errors.has("image") },
              attrs: {
                type: "file",
                id: "field-2",
                placeholder: "Product Image"
              }
            }),
            _vm._v(" "),
            _c("has-error", {
              attrs: { form: _vm.addProductForm, field: "image" }
            })
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _vm._m(0),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _vm._l(_vm.fd_types, function(fd_type, index) {
              return _c(
                "div",
                { key: index, staticClass: "checkbox checkbox-primary" },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.selected,
                        expression: "selected"
                      }
                    ],
                    attrs: {
                      type: "checkbox",
                      id: "category_id_" + fd_type.category_id
                    },
                    domProps: {
                      value: fd_type.category_id,
                      checked: Array.isArray(_vm.selected)
                        ? _vm._i(_vm.selected, fd_type.category_id) > -1
                        : _vm.selected
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.selected,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = fd_type.category_id,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 && (_vm.selected = $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              (_vm.selected = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.selected = $$c
                        }
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    { attrs: { for: "category_id_" + fd_type.category_id } },
                    [_vm._v(_vm._s(fd_type.category))]
                  ),
                  _vm._v(" "),
                  _c("br")
                ]
              )
            }),
            _vm._v(" "),
            !_vm.selected.length
              ? _c("small", [
                  _c("code", [_vm._v("Note:")]),
                  _vm._v(" Please choose atleast one category.")
                ])
              : _vm._e()
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-6" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-12" }, [
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _vm._m(1),
                _vm._v(" "),
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.addProductForm.description,
                      expression: "addProductForm.description"
                    }
                  ],
                  staticClass: "form-control",
                  class: {
                    "is-invalid": _vm.addProductForm.errors.has("description")
                  },
                  attrs: { id: "field-3", rows: "5" },
                  domProps: { value: _vm.addProductForm.description },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.addProductForm,
                        "description",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _c("has-error", {
                  attrs: { form: _vm.addProductForm, field: "description" }
                })
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-12" }, [
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _c("label", { attrs: { for: "field-4" } }, [_vm._v("Price")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.addProductForm.price,
                      expression: "addProductForm.price"
                    }
                  ],
                  staticClass: "form-control",
                  class: {
                    "is-invalid": _vm.addProductForm.errors.has("price")
                  },
                  attrs: { id: "field-4", type: "text" },
                  domProps: { value: _vm.addProductForm.price },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.addProductForm, "price", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _c("has-error", {
                  attrs: { form: _vm.addProductForm, field: "price" }
                })
              ],
              1
            )
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _c("label", { attrs: { for: "field-5" } }, [
              _vm._v("No of Item Available")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.addProductForm.quantity,
                  expression: "addProductForm.quantity"
                }
              ],
              staticClass: "form-control inputVal",
              class: {
                "is-invalid": _vm.addProductForm.errors.has("quantity")
              },
              attrs: { id: "field-5", type: "number" },
              domProps: { value: _vm.addProductForm.quantity },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.addProductForm, "quantity", $event.target.value)
                }
              }
            }),
            _vm._v(" "),
            _c("has-error", {
              attrs: { form: _vm.addProductForm, field: "quantity" }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _c("label", { attrs: { for: "field-6" } }, [
              _vm._v("Unit of Measurement")
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.addProductForm.unit_measure,
                    expression: "addProductForm.unit_measure"
                  }
                ],
                staticClass: "form-control",
                class: {
                  "is-invalid": _vm.addProductForm.errors.has("unit_measure")
                },
                attrs: { id: "field-6" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.$set(
                      _vm.addProductForm,
                      "unit_measure",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  }
                }
              },
              [
                _c("option", { attrs: { value: "" } }),
                _vm._v(" "),
                _vm._l(_vm.fd_unit_measures, function(um, i) {
                  return _c(
                    "option",
                    {
                      key: i,
                      domProps: { value: um.unit_measure.toLowerCase() }
                    },
                    [_vm._v(" " + _vm._s(um.unit_measure.toLowerCase()))]
                  )
                })
              ],
              2
            ),
            _vm._v(" "),
            _c("has-error", {
              attrs: { form: _vm.addProductForm, field: "unit_measure" }
            })
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _vm._m(2),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.addProductForm.addon,
                    expression: "addProductForm.addon"
                  }
                ],
                staticClass: "form-control",
                class: { "is-invalid": _vm.addProductForm.errors.has("addon") },
                attrs: { id: "field-7", type: "text" },
                on: {
                  change: [
                    function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.addProductForm,
                        "addon",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    },
                    _vm.addOn
                  ]
                }
              },
              [
                _c("option", { attrs: { value: "0" } }, [_vm._v("No")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "1" } }, [_vm._v("Yes")])
              ]
            ),
            _vm._v(" "),
            _c("has-error", {
              attrs: { form: _vm.addProductForm, field: "addon" }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _c("label", { attrs: { for: "field-8" } }, [
              _vm._v("Add On Price")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.addProductForm.addon_price,
                  expression: "addProductForm.addon_price"
                }
              ],
              staticClass: "form-control",
              class: {
                "is-invalid": _vm.addProductForm.errors.has("addon_price")
              },
              attrs: { id: "field-8", type: "text", disabled: _vm.addOnPrice },
              domProps: { value: _vm.addProductForm.addon_price },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.addProductForm,
                    "addon_price",
                    $event.target.value
                  )
                }
              }
            }),
            _vm._v(" "),
            _c("has-error", {
              attrs: { form: _vm.addProductForm, field: "addon_price" }
            })
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "div",
          { staticClass: "form-group" },
          [
            _vm._m(3),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.addProductForm.package,
                    expression: "addProductForm.package"
                  }
                ],
                staticClass: "form-control col-md-6 inputVal",
                class: {
                  "is-invalid": _vm.addProductForm.errors.has("package")
                },
                attrs: { id: "field-9", type: "text" },
                on: {
                  change: [
                    function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.$set(
                        _vm.addProductForm,
                        "package",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    },
                    _vm.isPackage
                  ]
                }
              },
              [
                _c("option", { attrs: { value: "0" } }, [_vm._v("No")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "1" } }, [_vm._v("Yes")])
              ]
            ),
            _vm._v(" "),
            _c("has-error", {
              attrs: { form: _vm.addProductForm, field: "package" }
            })
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.list_product,
            expression: "list_product"
          }
        ],
        staticClass: "row"
      },
      [
        _c("div", { staticClass: "col-md-12" }, [
          _c("div", { staticClass: "table-responsive" }, [
            _c(
              "table",
              {
                staticClass: "table table-sm table-bordered table-hover",
                attrs: { id: "dt-listProduct" }
              },
              [
                _vm._m(4),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.getList, function(g, index) {
                    return _c("tr", { key: index }, [
                      _c("input", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: false,
                            expression: "false"
                          }
                        ],
                        staticClass: "chk_",
                        class: "chk_" + g.product_id,
                        attrs: { name: "chkId[]", type: "checkbox" },
                        domProps: { value: g.product_id }
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: false,
                              expression: "false"
                            }
                          ],
                          staticClass: "product_",
                          class: "product_" + g.product_id
                        },
                        [_vm._v(_vm._s(g.product_id))]
                      ),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "div",
                          { staticClass: "custom-control custom-checkbox" },
                          [
                            _c("input", {
                              staticClass: "custom-control-input chk chk_",
                              attrs: {
                                type: "checkbox",
                                id: "chk_" + g.product_id
                              },
                              on: {
                                change: function($event) {
                                  return _vm.selectChkbox(g.product_id)
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("label", {
                              staticClass: "custom-control-label",
                              attrs: { for: "chk_" + g.product_id }
                            })
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c("img", {
                          attrs: { src: g.image, width: "90", height: "60" }
                        }),
                        _vm._v(" " + _vm._s(g.product_name))
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c("input", {
                          staticClass: "form-control quantity_",
                          class: "quantity_" + g.product_id,
                          attrs: {
                            type: "number",
                            size: "2",
                            min: "0",
                            id: g.product_id,
                            disabled: ""
                          },
                          on: {
                            keyup: function($event) {
                              return _vm.productQuantity(g.product_id)
                            }
                          }
                        })
                      ])
                    ])
                  }),
                  0
                )
              ]
            )
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Categories "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "field-3" } }, [
      _vm._v("Description "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "field-7" } }, [
      _vm._v("Add On "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "field-9" } }, [
      _vm._v("Package "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th"),
        _vm._v(" "),
        _c("th", [_vm._v("Product Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Quantity")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/setup/AddProductComponent.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/setup/AddProductComponent.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddProductComponent_vue_vue_type_template_id_0b6c22bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddProductComponent.vue?vue&type=template&id=0b6c22bc& */ "./resources/js/components/setup/AddProductComponent.vue?vue&type=template&id=0b6c22bc&");
/* harmony import */ var _AddProductComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddProductComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/setup/AddProductComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddProductComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddProductComponent_vue_vue_type_template_id_0b6c22bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddProductComponent_vue_vue_type_template_id_0b6c22bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/setup/AddProductComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/setup/AddProductComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/setup/AddProductComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AddProductComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/AddProductComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/setup/AddProductComponent.vue?vue&type=template&id=0b6c22bc&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/setup/AddProductComponent.vue?vue&type=template&id=0b6c22bc& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductComponent_vue_vue_type_template_id_0b6c22bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AddProductComponent.vue?vue&type=template&id=0b6c22bc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/AddProductComponent.vue?vue&type=template&id=0b6c22bc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductComponent_vue_vue_type_template_id_0b6c22bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductComponent_vue_vue_type_template_id_0b6c22bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);