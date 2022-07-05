(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["noodles-types"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=template&id=84d4070a&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=template&id=84d4070a& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
                    on: { click: _vm.setupUnitMeasure }
                  },
                  [
                    _c("i", { staticClass: "fas fa-plus-circle" }),
                    _vm._v(" Add Unit of Measurement")
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
                attrs: { id: "dt-unit-measure", width: "100%" }
              },
              [
                _vm._m(1),
                _vm._v(" "),
                _vm.table_data.length > 0
                  ? _c(
                      "tbody",
                      _vm._l(_vm.getList, function(g, index) {
                        return _c("tr", { key: index }, [
                          _c("td", [_vm._v(_vm._s(g.unit_measure))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(g.abbreviate))]),
                          _vm._v(" "),
                          _c("td", [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-sm btn-light btn-rounded",
                                attrs: {
                                  "data-wenk": "Edit Unit of Measurement"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.editUOM(index, g.id)
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
          id: "modal-add-unitmeasure",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel",
          "aria-hidden": "true"
        }
      },
      [_c("add-unit-measure")],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        staticStyle: { display: "none" },
        attrs: {
          id: "modal-edit-unitmeasure",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "myModalLabel",
          "aria-hidden": "true"
        }
      },
      [_c("edit-unit-measure", { attrs: { uomDetails: _vm.id } })],
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
                _vm._v("Unit of Measurement")
              ])
            ])
          ]),
          _vm._v(" "),
          _c("h4", { staticClass: "page-title" }, [
            _vm._v("Unit of Measurement")
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
        _c("th", [_vm._v("Unit of Measurement")]),
        _vm._v(" "),
        _c("th", [_vm._v("Abbreviate")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/setup/NoodlesTypesComponent.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/setup/NoodlesTypesComponent.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NoodlesTypesComponent_vue_vue_type_template_id_84d4070a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NoodlesTypesComponent.vue?vue&type=template&id=84d4070a& */ "./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=template&id=84d4070a&");
/* harmony import */ var _NoodlesTypesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NoodlesTypesComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NoodlesTypesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NoodlesTypesComponent_vue_vue_type_template_id_84d4070a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NoodlesTypesComponent_vue_vue_type_template_id_84d4070a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/setup/NoodlesTypesComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NoodlesTypesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NoodlesTypesComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NoodlesTypesComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=template&id=84d4070a&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=template&id=84d4070a& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NoodlesTypesComponent_vue_vue_type_template_id_84d4070a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NoodlesTypesComponent.vue?vue&type=template&id=84d4070a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/setup/NoodlesTypesComponent.vue?vue&type=template&id=84d4070a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NoodlesTypesComponent_vue_vue_type_template_id_84d4070a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NoodlesTypesComponent_vue_vue_type_template_id_84d4070a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);