(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunks/all-product-list~chunks/product-list~chunks/view-customer-order"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      "default": 0
    },
    dessertsAddons: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedDessertsAddons: function sortedDessertsAddons() {
      return this.dessertsAddons.sort(function (a, b) {
        return a.sub_food_products.product_name.localeCompare(b.sub_food_products.product_name);
      });
    }
  },
  methods: {
    productStatus: function productStatus(availability, uomId) {
      var available = availability.filter(function (a) {
        return a.uom_id == uomId;
      });

      if (available.length) {
        return available[0].available;
      }

      return availability[0].available;
    },
    productDrinkDetails: function productDrinkDetails(productDrink, UOM) {
      return {
        name: productDrink.product_name,
        uom: UOM ? UOM.unit_measure : ''
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
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
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'DrinksAddOns',
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      "default": 0
    },
    drinksAddons: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedDrinksAddons: function sortedDrinksAddons() {
      return this.drinksAddons.sort(function (a, b) {
        return a.sub_food_products.product_name.localeCompare(b.sub_food_products.product_name);
      });
    }
  },
  methods: {
    productStatus: function productStatus(availability, uomId) {
      var available = availability.filter(function (a) {
        return a.uom_id == uomId;
      });

      if (available.length) {
        return available[0].available;
      }

      return availability[0].available;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
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
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      "default": 0
    },
    drinksChoices: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedDrinksChoices: function sortedDrinksChoices() {
      return this.drinksChoices.sort(function (a, b) {
        return a.sub_food_products.product_name.localeCompare(b.sub_food_products.product_name);
      });
    }
  },
  methods: {
    productStatus: function productStatus(availability, uomId) {
      var available = availability.filter(function (a) {
        return a.uom_id == uomId;
      });

      if (available.length) {
        return available[0].available;
      }

      return availability[0].available;
    },
    productDrinkDetails: function productDrinkDetails(productDrink, UOM) {
      return {
        name: productDrink.product_name,
        uom: UOM ? UOM.unit_measure : ''
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      "default": 0
    },
    sizes: {
      type: Array,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    friesChoices: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedFriesChoices: function sortedFriesChoices() {
      return this.friesChoices.sort(function (a, b) {
        return a.sub_food_products.product_name.localeCompare(b.sub_food_products.product_name);
      });
    }
  },
  methods: {
    productStatus: function productStatus(availability, uomId) {
      var available = availability.filter(function (a) {
        return a.uom_id == uomId;
      });

      if (available.length) {
        return available[0].available;
      }

      return availability[0].available;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SuggestionChoices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SuggestionChoices */ "./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue");
/* harmony import */ var _DrinksChoices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DrinksChoices */ "./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue");
/* harmony import */ var _SidesChoices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SidesChoices */ "./resources/js/components/orderRequest/Food/Items/SidesChoices.vue");
/* harmony import */ var _FriesChoices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FriesChoices */ "./resources/js/components/orderRequest/Food/Items/FriesChoices.vue");
/* harmony import */ var _DrinksAddOns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DrinksAddOns */ "./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue");
/* harmony import */ var _SidesAddOns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SidesAddOns */ "./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue");
/* harmony import */ var _DessertsAddOns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DessertsAddOns */ "./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue");
/* harmony import */ var _UpgradableItems__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UpgradableItems */ "./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue");
/* harmony import */ var _FoodSizes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./FoodSizes */ "./resources/js/components/orderRequest/Food/Items/FoodSizes.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: {
    mode: {
      type: String,
      "default": 'Add'
    },
    addItemOrderForm: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    editItemOrderForm: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    foodProductDetails: {
      type: Object,
      required: true
    }
  },
  components: {
    SuggestionChoices: _SuggestionChoices__WEBPACK_IMPORTED_MODULE_1__["default"],
    DrinksChoices: _DrinksChoices__WEBPACK_IMPORTED_MODULE_2__["default"],
    SidesChoices: _SidesChoices__WEBPACK_IMPORTED_MODULE_3__["default"],
    FriesChoices: _FriesChoices__WEBPACK_IMPORTED_MODULE_4__["default"],
    DrinksAddOns: _DrinksAddOns__WEBPACK_IMPORTED_MODULE_5__["default"],
    SidesAddOns: _SidesAddOns__WEBPACK_IMPORTED_MODULE_6__["default"],
    DessertsAddOns: _DessertsAddOns__WEBPACK_IMPORTED_MODULE_7__["default"],
    UpgradableItems: _UpgradableItems__WEBPACK_IMPORTED_MODULE_8__["default"],
    FoodSizes: _FoodSizes__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  data: function data() {
    return {
      clickSubmit: false,
      unit_price: 0,
      updateModal: false
    };
  },
  watch: {
    foodProductDetails: function foodProductDetails(newValue) {
      if (Object.keys(newValue).length) {
        if (this.mode === 'Edit') {
          this.editItemOrderForm.productId = newValue.product.product_id;
          this.editItemOrderForm.uomId = newValue.primary_uom;
        } else {
          this.addItemOrderForm.productId = newValue.product.product_id;
          this.addItemOrderForm.uomId = newValue.primary_uom;

          if (Object.keys(newValue.default_suggestions).length) {
            this.addItemOrderForm.suggestions = newValue.default_suggestions;
          }

          if (newValue.default_drink !== null) {
            this.addItemOrderForm.cDrink = newValue.default_drink;
          }

          if (newValue.default_fry !== null) {
            this.addItemOrderForm.cFry = newValue.default_fry;
          }

          if (newValue.default_side !== null) {
            this.addItemOrderForm.cSide = newValue.default_side;
          }

          if (newValue.default_size !== null) {
            this.addItemOrderForm.cSize = newValue.default_size;
          }
        }
      }
    }
  },
  computed: {
    invalidItemOrderForm: function invalidItemOrderForm() {
      var form = this.addItemOrderForm;

      for (var _i = 0, _Object$entries = Object.entries(form); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (key === 'suggestions') {
          for (var _i2 = 0, _Object$values = Object.values(value); _i2 < _Object$values.length; _i2++) {
            var data = _Object$values[_i2];

            if (!data.product_suggestion_id) {
              return true;
            }
          }
        }

        if (key === 'cDrink' && this.foodProductDetails.hasOwnProperty('drinks_choices') && this.foodProductDetails.drinks_choices.length > 0 && !value.productId) {
          return true;
        }

        if (key === 'cFry' && this.foodProductDetails.hasOwnProperty('fries_choices') && this.foodProductDetails.fries_choices.length > 0 && !value.productId) {
          return true;
        }

        if (key === 'cSide' && this.foodProductDetails.hasOwnProperty('sides_choices') && this.foodProductDetails.sides_choices.length > 0 && !value.productId) {
          return true;
        }

        if (key === 'cSize' && this.foodProductDetails.hasOwnProperty('food_sizes') && this.foodProductDetails.food_sizes.length > 0 && !value.price) {
          return true;
        } // if (key === 'uomId' && !value && form.cSize.required) {
        // 	return true
        // }


        if (key === 'quantity' && value <= 0) {
          return true;
        }
      }

      return false;
    },
    productHasNoUOM: function productHasNoUOM() {
      if (this.foodProductDetails.hasOwnProperty('product')) {
        var b = this.foodProductDetails.product.prices.length == 1;
        var c = this.foodProductDetails.product.prices.every(function (price) {
          return !price.uom_id;
        });
        return b && c;
      }

      return false;
    },
    foodItemPrice: function foodItemPrice() {
      var _this = this;

      var product_price = 0;

      if (this.foodProductDetails.hasOwnProperty('product')) {
        var prices = this.foodProductDetails.product.prices; // if (prices.every(price => price.primary_uom === 0)) {
        // 	return prices[0].price
        // }
        // return prices.filter(price => price.primary_uom === 1)[0].price

        product_price = prices.filter(function (price) {
          return price.uom_id === _this.foodProductDetails.uom_id;
        })[0].price;
        return product_price;
      }

      return product_price;
    },
    hasTenantSuggestions: function hasTenantSuggestions() {
      return this.foodProductDetails.hasOwnProperty('product_suggestions') && Object.keys(this.foodProductDetails.product_suggestions).length > 0;
    },
    hasDrinks: function hasDrinks() {
      if (this.foodProductDetails.hasOwnProperty('drinks_choices') && this.foodProductDetails.drinks_choices.length > 0) {
        // const defaultDrink = this.foodProductDetails.drinks_choices.filter(
        // 	drink => drink.default_choice
        // )[0].choice_id
        return true;
      }

      return false;
    },
    hasSides: function hasSides() {
      return this.foodProductDetails.hasOwnProperty('sides_choices') && this.foodProductDetails.sides_choices.length > 0;
    },
    hasFries: function hasFries() {
      return this.foodProductDetails.hasOwnProperty('fries_choices') && this.foodProductDetails.fries_choices.length > 0;
    },
    hasSizes: function hasSizes() {
      return this.foodProductDetails.hasOwnProperty('food_sizes') && this.foodProductDetails.food_sizes.length > 1;
    },
    hasDrinksAddons: function hasDrinksAddons() {
      return this.foodProductDetails.hasOwnProperty('drinks_addons') && this.foodProductDetails.drinks_addons.length > 0;
    },
    hasSidesAddons: function hasSidesAddons() {
      return this.foodProductDetails.hasOwnProperty('sides_addons') && this.foodProductDetails.sides_addons.length > 0;
    },
    hasDessertsAddons: function hasDessertsAddons() {
      return this.foodProductDetails.hasOwnProperty('desserts_addons') && this.foodProductDetails.desserts_addons.length > 0;
    },
    hasUpgradableItems: function hasUpgradableItems() {
      return this.foodProductDetails.hasOwnProperty('upgradable_items') && this.foodProductDetails.upgradable_items.length > 0;
    },
    defaultDrink: function defaultDrink() {
      return 1;
    }
  },
  methods: {
    updateProduct: function updateProduct() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.editItemOrderForm.price = _this2.foodItemPrice;
                _context.next = 3;
                return axios.put("/order/single_update/".concat(_this2.editItemOrderForm.order_id), _this2.editItemOrderForm);

              case 3:
                swal({
                  title: 'Success!',
                  text: 'Product has been updated',
                  type: 'success',
                  allowOutsideClick: false,
                  buttonsStyling: false,
                  confirmButtonClass: 'btn btn-primary'
                }).then(function () {
                  $('div#updateFoodProductDetail').modal('hide');
                  this.$emit('closeFoodProductDetail');
                  this.$parent.retrieveCustomerOrders();
                }.bind(_this2));

                _this2.$parent.retrieveCustomerOrders(); // this.$emit('retrieveCheckoutOrders')


              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    addToCart: function addToCart() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this3.addItemOrderForm.price = _this3.foodItemPrice;
                _context2.next = 3;
                return axios.post('/order/single_store', _this3.addItemOrderForm);

              case 3:
                swal({
                  title: 'Success!',
                  text: 'Product has been added',
                  type: 'success',
                  allowOutsideClick: false,
                  buttonsStyling: false,
                  confirmButtonClass: 'btn btn-primary'
                }).then(function () {
                  $('div#addFoodProductDetail').modal('hide');
                  this.$emit('closeFoodProductDetail');
                  this.$parent.retrieveCustomerOrders();
                }.bind(_this3));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    incrementQuantity: function incrementQuantity() {
      if (this.mode === 'Edit') {
        this.editItemOrderForm.quantity += 1;
      } else {
        this.addItemOrderForm.quantity += 1;
      }
    },
    decrementQuantity: function decrementQuantity() {
      if (this.mode === 'Edit') {
        if (this.editItemOrderForm.quantity > 1) {
          this.editItemOrderForm.quantity -= 1;
        }
      } else {
        if (this.addItemOrderForm.quantity > 0) {
          this.addItemOrderForm.quantity -= 1;
        }
      }
    },
    closeFoodProductDetail: function closeFoodProductDetail() {
      this.$emit('closeFoodProductDetail');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      "default": 0
    },
    sidesAddons: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedSidesAddons: function sortedSidesAddons() {
      return this.sidesAddons.sort(function (a, b) {
        return a.sub_food_products.product_name.localeCompare(b.sub_food_products.product_name);
      });
    }
  },
  methods: {
    productStatus: function productStatus(availability, uomId) {
      var available = availability.filter(function (a) {
        return a.uom_id == uomId;
      });

      if (available.length) {
        return available[0].available;
      }

      return availability[0].available;
    },
    productDrinkDetails: function productDrinkDetails(productDrink, UOM) {
      return {
        name: productDrink.product_name,
        uom: UOM ? UOM.unit_measure : ''
      };
    },
    setSelectedSideAddon: function setSelectedSideAddon(e) {
      this.$emit('setSelectedSideAddon', e.target.value);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    sidesChoices: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedSidesChoices: function sortedSidesChoices() {
      return this.sidesChoices.sort(function (a, b) {
        return a.sub_food_products.product_name.localeCompare(b.sub_food_products.product_name);
      });
    }
  },
  methods: {
    productStatus: function productStatus(availability, uomId) {
      var available = availability.filter(function (a) {
        return a.uom_id == uomId;
      });

      if (available.length) {
        return available[0].available;
      }

      return availability[0].available;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      "default": 0
    },
    suggestions: {
      type: Array,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemOrderForm: {
      type: Object,
      required: true
    },
    piece: {
      "default": 0
    },
    upgradableItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedupgradableItems: function sortedupgradableItems() {
      return this.upgradableItems.sort(function (a, b) {
        return a.sub_food_products.product_name.localeCompare(b.sub_food_products.product_name);
      });
    }
  },
  methods: {
    productStatus: function productStatus(availability, uomId) {
      var available = availability.filter(function (a) {
        return a.uom_id == uomId;
      });

      if (available.length) {
        return available[0].available;
      }

      return availability[0].available;
    },
    productupgradeDetails: function productupgradeDetails(productupgrade, UOM) {
      return {
        name: productupgrade.product_name,
        uom: UOM ? UOM.unit_measure : ''
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=template&id=a806c486&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=template&id=a806c486& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.dessertsAddons, function(dessert) {
            return _c(
              "div",
              {
                key: dessert.id,
                staticClass: "form-group d-flex justify-content-between"
              },
              [
                _c("div", { staticClass: "custom-control custom-checkbox" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.itemOrderForm.aDesserts,
                        expression: "itemOrderForm.aDesserts"
                      }
                    ],
                    staticClass: "custom-control-input check-option dessert_",
                    attrs: {
                      type: "checkbox",
                      name: "food-dessert",
                      disabled:
                        _vm.productStatus(
                          dessert.availability,
                          dessert.uom_id
                        ) === 0,
                      id: "food-dessert-" + dessert.id
                    },
                    domProps: {
                      value: {
                        uomId: dessert.uom_id,
                        productId: dessert.addon_id,
                        price: dessert.addon_price
                      },
                      checked: Array.isArray(_vm.itemOrderForm.aDesserts)
                        ? _vm._i(_vm.itemOrderForm.aDesserts, {
                            uomId: dessert.uom_id,
                            productId: dessert.addon_id,
                            price: dessert.addon_price
                          }) > -1
                        : _vm.itemOrderForm.aDesserts
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.itemOrderForm.aDesserts,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = {
                              uomId: dessert.uom_id,
                              productId: dessert.addon_id,
                              price: dessert.addon_price
                            },
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(
                                _vm.itemOrderForm,
                                "aDesserts",
                                $$a.concat([$$v])
                              )
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.itemOrderForm,
                                "aDesserts",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(_vm.itemOrderForm, "aDesserts", $$c)
                        }
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "custom-control-label",
                      attrs: { for: "food-dessert-" + dessert.id }
                    },
                    [
                      _vm.productStatus(
                        dessert.availability,
                        dessert.uom_id
                      ) === 0
                        ? _c("span", { staticClass: "text-danger" }, [
                            _c("del", [
                              _vm._v(
                                _vm._s(
                                  dessert.uom ? dessert.uom.unit_measure : ""
                                ) +
                                  "\n                  " +
                                  _vm._s(
                                    dessert.sub_food_products.product_name
                                  ) +
                                  " "
                              )
                            ]),
                            _vm._v("(Unavailable)\n              ")
                          ])
                        : _c("span", [
                            _vm._v(
                              _vm._s(
                                dessert.uom ? dessert.uom.unit_measure : ""
                              ) +
                                "\n                " +
                                _vm._s(dessert.sub_food_products.product_name)
                            )
                          ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    class:
                      _vm.productStatus(
                        dessert.availability,
                        dessert.uom_id
                      ) === 0
                        ? "text-danger"
                        : ""
                  },
                  [
                    _vm._v(
                      _vm._s(
                        dessert.addon_price == "0.00"
                          ? ""
                          : "+ ₱ " + dessert.addon_price
                      )
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
      _c("h5", [_vm._v("Add-on Desserts")]),
      _vm._v(" "),
      _c("span")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=template&id=b1292b6a&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=template&id=b1292b6a& ***!
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.drinksAddons, function(drink) {
            return _c(
              "div",
              {
                key: drink.id,
                staticClass: "form-group d-flex justify-content-between"
              },
              [
                _c("div", { staticClass: "custom-control custom-checkbox" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.itemOrderForm.aDrinks,
                        expression: "itemOrderForm.aDrinks"
                      }
                    ],
                    staticClass: "custom-control-input check-option dessert_",
                    attrs: {
                      type: "checkbox",
                      name: "food-drink",
                      disabled:
                        _vm.productStatus(drink.availability, drink.uom_id) ===
                        0,
                      id: "food-drink-" + drink.id
                    },
                    domProps: {
                      value: {
                        uomId: drink.uom_id,
                        productId: drink.addon_id,
                        price: drink.addon_price
                      },
                      checked: Array.isArray(_vm.itemOrderForm.aDrinks)
                        ? _vm._i(_vm.itemOrderForm.aDrinks, {
                            uomId: drink.uom_id,
                            productId: drink.addon_id,
                            price: drink.addon_price
                          }) > -1
                        : _vm.itemOrderForm.aDrinks
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.itemOrderForm.aDrinks,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = {
                              uomId: drink.uom_id,
                              productId: drink.addon_id,
                              price: drink.addon_price
                            },
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(
                                _vm.itemOrderForm,
                                "aDrinks",
                                $$a.concat([$$v])
                              )
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.itemOrderForm,
                                "aDrinks",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(_vm.itemOrderForm, "aDrinks", $$c)
                        }
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "custom-control-label",
                      attrs: { for: "food-drink-" + drink.id }
                    },
                    [
                      _vm.productStatus(drink.availability, drink.uom_id) === 0
                        ? _c("span", { staticClass: "text-danger" }, [
                            _c("del", [
                              _vm._v(
                                _vm._s(
                                  drink.uom ? drink.uom.unit_measure : ""
                                ) +
                                  "\n                  " +
                                  _vm._s(drink.sub_food_products.product_name) +
                                  " "
                              )
                            ]),
                            _vm._v("(Unavailable)\n              ")
                          ])
                        : _c("span", [
                            _vm._v(
                              _vm._s(drink.uom ? drink.uom.unit_measure : "") +
                                "\n                " +
                                _vm._s(drink.sub_food_products.product_name)
                            )
                          ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    class:
                      _vm.productStatus(drink.availability, drink.uom_id) === 0
                        ? "text-danger"
                        : ""
                  },
                  [
                    _vm._v(
                      _vm._s(
                        drink.addon_price == "0.00"
                          ? ""
                          : "+ ₱ " + drink.addon_price
                      )
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
      _c("h5", [_vm._v("Add-on Drinks")]),
      _vm._v(" "),
      _c("span")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=template&id=5ab8cd2c&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=template&id=5ab8cd2c& ***!
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.drinksChoices, function(drink) {
            return _c(
              "div",
              {
                key: drink.id,
                staticClass: "form-group d-flex justify-content-between"
              },
              [
                _c("div", { staticClass: "custom-control custom-radio" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.itemOrderForm.cDrink,
                        expression: "itemOrderForm.cDrink"
                      }
                    ],
                    staticClass: "custom-control-input check-option drinks_",
                    attrs: {
                      type: "radio",
                      name: "food-drink",
                      disabled:
                        _vm.productStatus(drink.availability, drink.uom_id) ===
                        0,
                      id: "food-drink-" + drink.id
                    },
                    domProps: {
                      value: {
                        uomId: drink.uom_id,
                        productId: drink.choice_id,
                        price: drink.addon_price
                      },
                      checked: _vm._q(_vm.itemOrderForm.cDrink, {
                        uomId: drink.uom_id,
                        productId: drink.choice_id,
                        price: drink.addon_price
                      })
                    },
                    on: {
                      change: function($event) {
                        return _vm.$set(_vm.itemOrderForm, "cDrink", {
                          uomId: drink.uom_id,
                          productId: drink.choice_id,
                          price: drink.addon_price
                        })
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "custom-control-label",
                      attrs: { for: "food-drink-" + drink.id }
                    },
                    [
                      _vm.productStatus(drink.availability, drink.uom_id) === 0
                        ? _c("span", { staticClass: "text-danger" }, [
                            _c("del", [
                              _vm._v(
                                _vm._s(
                                  drink.uom ? drink.uom.unit_measure : ""
                                ) +
                                  "\n                  " +
                                  _vm._s(drink.sub_food_products.product_name) +
                                  " "
                              )
                            ]),
                            _vm._v("(Unavailable)\n              ")
                          ])
                        : _c("span", [
                            _vm._v(
                              _vm._s(drink.uom ? drink.uom.unit_measure : "") +
                                "\n                " +
                                _vm._s(drink.sub_food_products.product_name)
                            )
                          ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    class:
                      _vm.productStatus(drink.availability, drink.uom_id) === 0
                        ? "text-danger"
                        : ""
                  },
                  [
                    _vm._v(
                      _vm._s(
                        drink.addon_price == "0.00"
                          ? ""
                          : "+ ₱ " + drink.addon_price
                      )
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
      _c("h5", [_vm._v("Choice of Drinks")]),
      _vm._v(" "),
      _c("span", [_vm._v(" 1REQUIRED")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=template&id=0853dfa7&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=template&id=0853dfa7& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.sizes, function(size) {
            return _c(
              "div",
              {
                key: size.id,
                staticClass: "form-group d-flex justify-content-between"
              },
              [
                _c("div", { staticClass: "custom-control custom-radio" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.itemOrderForm.cSize,
                        expression: "itemOrderForm.cSize"
                      }
                    ],
                    staticClass: "custom-control-input check-option dessert_",
                    attrs: {
                      type: "radio",
                      name: "food-size",
                      disabled: size.available === 0,
                      id: "food-uom-" + size.id
                    },
                    domProps: {
                      value: { uomId: size.uom_id, price: size.price },
                      checked: _vm._q(_vm.itemOrderForm.cSize, {
                        uomId: size.uom_id,
                        price: size.price
                      })
                    },
                    on: {
                      change: function($event) {
                        return _vm.$set(_vm.itemOrderForm, "cSize", {
                          uomId: size.uom_id,
                          price: size.price
                        })
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "custom-control-label",
                      attrs: { for: "food-uom-" + size.id }
                    },
                    [
                      size.available === 0
                        ? _c("span", { staticClass: "text-danger" }, [
                            _c("del", [
                              _vm._v(
                                _vm._s(
                                  size.uom ? "" + size.uom.unit_measure : ""
                                ) + " "
                              )
                            ]),
                            _vm._v("(Unavailable)\n                      ")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("span", [
                        _vm._v(
                          _vm._s(size.uom ? "" + size.uom.unit_measure : "")
                        )
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  { class: size.available === 0 ? "text-danger" : "" },
                  [
                    _vm._v(
                      _vm._s(size.price == "0.00" ? "" : "₱ " + size.price)
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
      _c("h5", [_vm._v("Choice of Size")]),
      _vm._v(" "),
      _c("span", [_vm._v(" 1REQUIRED")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=template&id=0ac776e4&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=template&id=0ac776e4& ***!
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.friesChoices, function(fry) {
            return _c(
              "div",
              {
                key: fry.id,
                staticClass: "form-group d-flex justify-content-between"
              },
              [
                _c("div", { staticClass: "custom-control custom-radio" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.itemOrderForm.cFry,
                        expression: "itemOrderForm.cFry"
                      }
                    ],
                    staticClass: "custom-control-input check-option dessert_",
                    attrs: {
                      type: "radio",
                      name: "food-fry",
                      disabled:
                        _vm.productStatus(fry.availability, fry.uom_id) === 0,
                      id: "food-fry-" + fry.choice_id
                    },
                    domProps: {
                      value: {
                        uomId: fry.uom_id,
                        productId: fry.choice_id,
                        price: fry.addon_price
                      },
                      checked: _vm._q(_vm.itemOrderForm.cFry, {
                        uomId: fry.uom_id,
                        productId: fry.choice_id,
                        price: fry.addon_price
                      })
                    },
                    on: {
                      change: function($event) {
                        return _vm.$set(_vm.itemOrderForm, "cFry", {
                          uomId: fry.uom_id,
                          productId: fry.choice_id,
                          price: fry.addon_price
                        })
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "custom-control-label",
                      attrs: { for: "food-fry-" + fry.choice_id }
                    },
                    [
                      _vm.productStatus(fry.availability, fry.uom_id) === 0
                        ? _c("span", { staticClass: "text-danger" }, [
                            _c("del", [
                              _vm._v(
                                _vm._s(fry.uom ? fry.uom.unit_measure : "") +
                                  " " +
                                  _vm._s(fry.sub_food_products.product_name) +
                                  " "
                              )
                            ]),
                            _vm._v("(Unavailable)\n                      ")
                          ])
                        : _c("span", [
                            _vm._v(
                              _vm._s(fry.uom ? fry.uom.unit_measure : "") +
                                " " +
                                _vm._s(fry.sub_food_products.product_name)
                            )
                          ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    class:
                      _vm.productStatus(fry.availability, fry.uom_id) === 0
                        ? "text-danger"
                        : ""
                  },
                  [
                    _vm._v(
                      _vm._s(
                        fry.addon_price == "0.00"
                          ? ""
                          : "+ ₱ " + fry.addon_price
                      )
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
      _c("h5", [_vm._v("Choice of Fries")]),
      _vm._v(" "),
      _c("span", [_vm._v(" 1REQUIRED")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=template&id=3fee342d&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=template&id=3fee342d& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
      _c(
        "div",
        { staticClass: "modal-body" },
        [
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
            [_vm._v("\n        ×\n      ")]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "d-flex justify-content-center mt-4" }, [
            _vm.foodProductDetails.hasOwnProperty("product")
              ? _c("img", {
                  attrs: {
                    src: "/storage/" + _vm.foodProductDetails.product.image,
                    alt: _vm.foodProductDetails.product.product_name + " image",
                    width: "350"
                  }
                })
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "product-informations mt-3" }, [
            _c(
              "div",
              { staticClass: "product-header d-flex justify-content-between" },
              [
                _vm.foodProductDetails.hasOwnProperty("product")
                  ? _c("h4", { staticClass: "product-name" }, [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.foodProductDetails.product.product_name) +
                          "\n          "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("span", { staticClass: "product-price mt-1" }, [
                  _vm._v("PHP " + _vm._s(_vm.foodItemPrice))
                ])
              ]
            )
          ]),
          _vm._v(" "),
          _vm.hasUpgradableItems ? _c("hr") : _vm._e(),
          _vm._v(" "),
          _vm.hasUpgradableItems
            ? _c("UpgradableItems", {
                attrs: {
                  upgradableItems: _vm.foodProductDetails.upgradable_items,
                  itemOrderForm:
                    _vm.mode === "Edit"
                      ? _vm.editItemOrderForm
                      : _vm.addItemOrderForm,
                  mode: _vm.mode
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasSizes ? _c("hr") : _vm._e(),
          _vm._v(" "),
          _vm.hasSizes
            ? _c("FoodSizes", {
                attrs: {
                  sizes: _vm.foodProductDetails.food_sizes,
                  itemOrderForm:
                    _vm.mode === "Edit"
                      ? _vm.editItemOrderForm
                      : _vm.addItemOrderForm
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasTenantSuggestions
            ? [
                _c("hr"),
                _vm._v(" "),
                _vm._l(_vm.foodProductDetails.product_suggestions, function(
                  suggestions,
                  key
                ) {
                  return _c("SuggestionChoices", {
                    key: key,
                    attrs: {
                      suggestions: suggestions,
                      itemOrderForm:
                        _vm.mode === "Edit"
                          ? _vm.editItemOrderForm
                          : _vm.addItemOrderForm
                    }
                  })
                })
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.hasDrinks ? _c("hr") : _vm._e(),
          _vm._v(" "),
          _vm.hasDrinks
            ? _c("DrinksChoices", {
                attrs: {
                  drinksChoices: _vm.foodProductDetails.drinks_choices,
                  itemOrderForm:
                    _vm.mode === "Edit"
                      ? _vm.editItemOrderForm
                      : _vm.addItemOrderForm
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasSides ? _c("hr") : _vm._e(),
          _vm._v(" "),
          _vm.hasSides
            ? _c("SidesChoices", {
                attrs: {
                  sidesChoices: _vm.foodProductDetails.sides_choices,
                  itemOrderForm:
                    _vm.mode === "Edit"
                      ? _vm.editItemOrderForm
                      : _vm.addItemOrderForm
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasFries ? _c("hr") : _vm._e(),
          _vm._v(" "),
          _vm.hasFries
            ? _c("FriesChoices", {
                attrs: {
                  friesChoices: _vm.foodProductDetails.fries_choices,
                  itemOrderForm:
                    _vm.mode === "Edit"
                      ? _vm.editItemOrderForm
                      : _vm.addItemOrderForm
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasDrinksAddons ? _c("hr") : _vm._e(),
          _vm._v(" "),
          _vm.hasDrinksAddons
            ? _c("DrinksAddOns", {
                attrs: {
                  drinksAddons: _vm.foodProductDetails.drinks_addons,
                  itemOrderForm:
                    _vm.mode === "Edit"
                      ? _vm.editItemOrderForm
                      : _vm.addItemOrderForm
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasSidesAddons ? _c("hr") : _vm._e(),
          _vm._v(" "),
          _vm.hasSidesAddons
            ? _c("SidesAddOns", {
                attrs: {
                  sidesAddons: _vm.foodProductDetails.sides_addons,
                  itemOrderForm:
                    _vm.mode === "Edit"
                      ? _vm.editItemOrderForm
                      : _vm.addItemOrderForm
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.hasDessertsAddons ? _c("hr") : _vm._e(),
          _vm._v(" "),
          _vm.hasDessertsAddons
            ? _c("DessertsAddOns", {
                attrs: {
                  dessertsAddons: _vm.foodProductDetails.desserts_addons,
                  itemOrderForm:
                    _vm.mode === "Edit"
                      ? _vm.editItemOrderForm
                      : _vm.addItemOrderForm
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "row d-flex justify-content-between mb-0" },
            [
              _c("div", { staticClass: "col-md-6" }, [
                _vm.mode !== "View"
                  ? _c("div", { staticClass: "row" }, [
                      _vm._m(0),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-9" }, [
                        _vm.mode === "Edit"
                          ? _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model.number",
                                  value: _vm.editItemOrderForm.quantity,
                                  expression: "editItemOrderForm.quantity",
                                  modifiers: { number: true }
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { type: "number", min: "1" },
                              domProps: {
                                value: _vm.editItemOrderForm.quantity
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.editItemOrderForm,
                                    "quantity",
                                    _vm._n($event.target.value)
                                  )
                                },
                                blur: function($event) {
                                  return _vm.$forceUpdate()
                                }
                              }
                            })
                          : _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model.number",
                                  value: _vm.addItemOrderForm.quantity,
                                  expression: "addItemOrderForm.quantity",
                                  modifiers: { number: true }
                                }
                              ],
                              staticClass: "form-control",
                              attrs: { type: "number", min: "1" },
                              domProps: {
                                value: _vm.addItemOrderForm.quantity
                              },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.addItemOrderForm,
                                    "quantity",
                                    _vm._n($event.target.value)
                                  )
                                },
                                blur: function($event) {
                                  return _vm.$forceUpdate()
                                }
                              }
                            })
                      ])
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-6 d-flex flex-row-reverse" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-secondary waves-effect",
                    attrs: { type: "button", "data-dismiss": "modal" }
                  },
                  [_vm._v("\n            Close\n          ")]
                ),
                _vm._v("\n            \n          "),
                _vm.mode === "Add"
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-info waves-effect waves-light",
                        attrs: {
                          type: "button",
                          disabled: _vm.invalidItemOrderForm
                        },
                        on: { click: _vm.addToCart }
                      },
                      [_vm._v("\n            Add To Cart\n          ")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.mode === "Edit"
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-info waves-effect waves-light",
                        attrs: { type: "button" },
                        on: { click: _vm.updateProduct }
                      },
                      [_vm._v("\n            Update\n          ")]
                    )
                  : _vm._e()
              ])
            ]
          )
        ],
        2
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "col-md-3", staticStyle: { "padding-top": "8px" } },
      [_c("label", { staticClass: "bold" }, [_vm._v("Quantity")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=template&id=d07bb87c&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=template&id=d07bb87c& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.sidesAddons, function(side) {
            return _c(
              "div",
              {
                key: side.id,
                staticClass: "form-group d-flex justify-content-between"
              },
              [
                _c("div", { staticClass: "custom-control custom-checkbox" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.itemOrderForm.aSides,
                        expression: "itemOrderForm.aSides"
                      }
                    ],
                    staticClass: "custom-control-input check-option dessert_",
                    attrs: {
                      type: "checkbox",
                      name: "food-side",
                      disabled:
                        _vm.productStatus(side.availability, side.uom_id) === 0,
                      id: "food-side-" + side.id
                    },
                    domProps: {
                      value: {
                        uomId: side.uom_id,
                        productId: side.addon_id,
                        price: side.addon_price
                      },
                      checked: Array.isArray(_vm.itemOrderForm.aSides)
                        ? _vm._i(_vm.itemOrderForm.aSides, {
                            uomId: side.uom_id,
                            productId: side.addon_id,
                            price: side.addon_price
                          }) > -1
                        : _vm.itemOrderForm.aSides
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.itemOrderForm.aSides,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = {
                              uomId: side.uom_id,
                              productId: side.addon_id,
                              price: side.addon_price
                            },
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              _vm.$set(
                                _vm.itemOrderForm,
                                "aSides",
                                $$a.concat([$$v])
                              )
                          } else {
                            $$i > -1 &&
                              _vm.$set(
                                _vm.itemOrderForm,
                                "aSides",
                                $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                              )
                          }
                        } else {
                          _vm.$set(_vm.itemOrderForm, "aSides", $$c)
                        }
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "custom-control-label",
                      attrs: { for: "food-side-" + side.id }
                    },
                    [
                      _vm.productStatus(side.availability, side.uom_id) === 0
                        ? _c("span", { staticClass: "text-danger" }, [
                            _c("del", [
                              _vm._v(
                                _vm._s(side.uom ? side.uom.unit_measure : "") +
                                  " " +
                                  _vm._s(side.sub_food_products.product_name) +
                                  " "
                              )
                            ]),
                            _vm._v("(Unavailable)\n                          ")
                          ])
                        : _c("span", [
                            _vm._v(
                              _vm._s(side.uom ? side.uom.unit_measure : "") +
                                " " +
                                _vm._s(side.sub_food_products.product_name)
                            )
                          ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    class:
                      _vm.productStatus(side.availability, side.uom_id) === 0
                        ? "text-danger"
                        : ""
                  },
                  [
                    _vm._v(
                      _vm._s(
                        side.addon_price == "0.00"
                          ? ""
                          : "+ ₱ " + side.addon_price
                      )
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
      _c("h5", [_vm._v("Add-on Sides")]),
      _vm._v(" "),
      _c("span")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=template&id=25b7e25a&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=template&id=25b7e25a& ***!
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.sidesChoices, function(side) {
            return _c(
              "div",
              {
                key: side.id,
                staticClass: "form-group d-flex justify-content-between"
              },
              [
                _c("div", { staticClass: "custom-control custom-radio" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.itemOrderForm.cSide,
                        expression: "itemOrderForm.cSide"
                      }
                    ],
                    staticClass: "custom-control-input check-option dessert_",
                    attrs: {
                      type: "radio",
                      name: "food-side",
                      disabled:
                        _vm.productStatus(side.availability, side.uom_id) === 0,
                      id: "food-side-" + side.choice_id
                    },
                    domProps: {
                      value: {
                        uomId: side.uom_id,
                        productId: side.choice_id,
                        price: side.addon_price
                      },
                      checked: _vm._q(_vm.itemOrderForm.cSide, {
                        uomId: side.uom_id,
                        productId: side.choice_id,
                        price: side.addon_price
                      })
                    },
                    on: {
                      change: function($event) {
                        return _vm.$set(_vm.itemOrderForm, "cSide", {
                          uomId: side.uom_id,
                          productId: side.choice_id,
                          price: side.addon_price
                        })
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "custom-control-label",
                      attrs: { for: "food-side-" + side.choice_id }
                    },
                    [
                      _vm.productStatus(side.availability, side.uom_id) === 0
                        ? _c("span", { staticClass: "text-danger" }, [
                            _c("del", [
                              _vm._v(
                                _vm._s(side.uom ? side.uom.unit_measure : "") +
                                  " " +
                                  _vm._s(side.sub_food_products.product_name) +
                                  " "
                              )
                            ]),
                            _vm._v("(Unavailable)\n                      ")
                          ])
                        : _c("span", [
                            _vm._v(
                              _vm._s(side.uom ? side.uom.unit_measure : "") +
                                " " +
                                _vm._s(side.sub_food_products.product_name)
                            )
                          ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    class:
                      _vm.productStatus(side.availability, side.uom_id) === 0
                        ? "text-danger"
                        : ""
                  },
                  [
                    _vm._v(
                      _vm._s(
                        side.addon_price == "0.00"
                          ? ""
                          : "+ ₱ " + side.addon_price
                      )
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
      _c("h5", [_vm._v("Choice of Sides")]),
      _vm._v(" "),
      _c("span", [_vm._v(" 1REQUIRED")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=template&id=390addbe&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=template&id=390addbe& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
        _c("h5", [_vm._v(_vm._s(_vm.suggestions[0].suggestion))]),
        _vm._v(" "),
        _c("span", [_vm._v(" 1REQUIRED")])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.suggestions, function(suggestion, sIndex) {
            return _c(
              "div",
              {
                key: sIndex,
                staticClass: "form-group d-flex justify-content-between"
              },
              [
                _c("div", { staticClass: "custom-control custom-radio" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value:
                          _vm.itemOrderForm.suggestions[
                            suggestion.suggestion_id
                          ],
                        expression:
                          "itemOrderForm.suggestions[suggestion.suggestion_id]"
                      }
                    ],
                    staticClass: "custom-control-input check-option dessert_",
                    attrs: {
                      type: "radio",
                      name: "food-suggestion-" + suggestion.suggestion_id,
                      disabled: suggestion.available === 0,
                      id:
                        "food-suggestion-" +
                        suggestion.suggestion_id +
                        "-" +
                        sIndex
                    },
                    domProps: {
                      value: {
                        product_suggestion_id: suggestion.product_suggestion_id,
                        addon_price: suggestion.addon_price
                      },
                      checked: _vm._q(
                        _vm.itemOrderForm.suggestions[suggestion.suggestion_id],
                        {
                          product_suggestion_id:
                            suggestion.product_suggestion_id,
                          addon_price: suggestion.addon_price
                        }
                      )
                    },
                    on: {
                      change: function($event) {
                        return _vm.$set(
                          _vm.itemOrderForm.suggestions,
                          suggestion.suggestion_id,
                          {
                            product_suggestion_id:
                              suggestion.product_suggestion_id,
                            addon_price: suggestion.addon_price
                          }
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    {
                      staticClass: "custom-control-label",
                      attrs: {
                        for:
                          "food-suggestion-" +
                          suggestion.suggestion_id +
                          "-" +
                          sIndex
                      }
                    },
                    [
                      suggestion.available === 0
                        ? _c("span", { staticClass: "text-danger" }, [
                            _c("del", [
                              _vm._v(_vm._s(suggestion.description) + " ")
                            ]),
                            _vm._v("(Unavailable)\n                      ")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(suggestion.description))])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  { class: suggestion.available === 0 ? "text-danger" : "" },
                  [
                    _vm._v(
                      _vm._s(
                        suggestion.addon_price == "0.00"
                          ? ""
                          : "+ ₱ " + suggestion.addon_price
                      )
                    )
                  ]
                )
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=template&id=7e24cd60&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=template&id=7e24cd60& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c(
          "div",
          { staticClass: "col-md-12" },
          _vm._l(_vm.upgradableItems, function(upgrade) {
            return _c(
              "div",
              {
                key: upgrade.id,
                staticClass: "d-flex justify-content-between"
              },
              [
                _c("div", {}, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.itemOrderForm.upgradableItems,
                        expression: "itemOrderForm.upgradableItems"
                      }
                    ],
                    attrs: {
                      type: "radio",
                      name: "food-upgrade",
                      disabled:
                        _vm.productStatus(
                          upgrade.availability,
                          upgrade.uom_id
                        ) === 0,
                      id: "food-upgrade-" + upgrade.id
                    },
                    domProps: {
                      value: {
                        uomId: upgrade.uom_id,
                        productId: upgrade.addon_id,
                        price: upgrade.addon_price
                      },
                      checked: _vm._q(_vm.itemOrderForm.upgradableItems, {
                        uomId: upgrade.uom_id,
                        productId: upgrade.addon_id,
                        price: upgrade.addon_price
                      })
                    },
                    on: {
                      change: function($event) {
                        return _vm.$set(_vm.itemOrderForm, "upgradableItems", {
                          uomId: upgrade.uom_id,
                          productId: upgrade.addon_id,
                          price: upgrade.addon_price
                        })
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.productStatus(upgrade.availability, upgrade.uom_id) === 0
                    ? _c("span", { staticClass: "text-danger" }, [
                        _c("del", [
                          _vm._v(
                            _vm._s(
                              upgrade.uom ? upgrade.uom.unit_measure : ""
                            ) +
                              "\n                " +
                              _vm._s(upgrade.sub_food_products.product_name) +
                              " "
                          )
                        ]),
                        _vm._v("(Unavailable)\n            ")
                      ])
                    : _c("span", [
                        _vm._v(
                          _vm._s(upgrade.uom ? upgrade.uom.unit_measure : "") +
                            "\n              " +
                            _vm._s(upgrade.sub_food_products.product_name)
                        )
                      ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-right" }, [
                  _c(
                    "span",
                    {
                      class:
                        _vm.productStatus(
                          upgrade.availability,
                          upgrade.uom_id
                        ) === 0
                          ? "text-danger"
                          : ""
                    },
                    [
                      _vm._v(
                        _vm._s(
                          upgrade.addon_price == "0.00"
                            ? ""
                            : "+ ₱ " + upgrade.addon_price
                        )
                      )
                    ]
                  )
                ])
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-between mb-0" }, [
      _c("h5", [_vm._v("Upgrades")]),
      _vm._v(" "),
      _c("span")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DessertsAddOns_vue_vue_type_template_id_a806c486___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DessertsAddOns.vue?vue&type=template&id=a806c486& */ "./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=template&id=a806c486&");
/* harmony import */ var _DessertsAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DessertsAddOns.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DessertsAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DessertsAddOns_vue_vue_type_template_id_a806c486___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DessertsAddOns_vue_vue_type_template_id_a806c486___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DessertsAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./DessertsAddOns.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DessertsAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=template&id=a806c486&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=template&id=a806c486& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DessertsAddOns_vue_vue_type_template_id_a806c486___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./DessertsAddOns.vue?vue&type=template&id=a806c486& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DessertsAddOns.vue?vue&type=template&id=a806c486&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DessertsAddOns_vue_vue_type_template_id_a806c486___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DessertsAddOns_vue_vue_type_template_id_a806c486___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DrinksAddOns_vue_vue_type_template_id_b1292b6a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrinksAddOns.vue?vue&type=template&id=b1292b6a& */ "./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=template&id=b1292b6a&");
/* harmony import */ var _DrinksAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DrinksAddOns.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DrinksAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DrinksAddOns_vue_vue_type_template_id_b1292b6a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DrinksAddOns_vue_vue_type_template_id_b1292b6a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./DrinksAddOns.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=template&id=b1292b6a&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=template&id=b1292b6a& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksAddOns_vue_vue_type_template_id_b1292b6a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./DrinksAddOns.vue?vue&type=template&id=b1292b6a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DrinksAddOns.vue?vue&type=template&id=b1292b6a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksAddOns_vue_vue_type_template_id_b1292b6a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksAddOns_vue_vue_type_template_id_b1292b6a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DrinksChoices_vue_vue_type_template_id_5ab8cd2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrinksChoices.vue?vue&type=template&id=5ab8cd2c& */ "./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=template&id=5ab8cd2c&");
/* harmony import */ var _DrinksChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DrinksChoices.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DrinksChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DrinksChoices_vue_vue_type_template_id_5ab8cd2c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DrinksChoices_vue_vue_type_template_id_5ab8cd2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/DrinksChoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./DrinksChoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=template&id=5ab8cd2c&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=template&id=5ab8cd2c& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksChoices_vue_vue_type_template_id_5ab8cd2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./DrinksChoices.vue?vue&type=template&id=5ab8cd2c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/DrinksChoices.vue?vue&type=template&id=5ab8cd2c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksChoices_vue_vue_type_template_id_5ab8cd2c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DrinksChoices_vue_vue_type_template_id_5ab8cd2c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/FoodSizes.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/FoodSizes.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FoodSizes_vue_vue_type_template_id_0853dfa7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FoodSizes.vue?vue&type=template&id=0853dfa7& */ "./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=template&id=0853dfa7&");
/* harmony import */ var _FoodSizes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FoodSizes.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FoodSizes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FoodSizes_vue_vue_type_template_id_0853dfa7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FoodSizes_vue_vue_type_template_id_0853dfa7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/FoodSizes.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FoodSizes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FoodSizes.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FoodSizes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=template&id=0853dfa7&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=template&id=0853dfa7& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FoodSizes_vue_vue_type_template_id_0853dfa7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FoodSizes.vue?vue&type=template&id=0853dfa7& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/FoodSizes.vue?vue&type=template&id=0853dfa7&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FoodSizes_vue_vue_type_template_id_0853dfa7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FoodSizes_vue_vue_type_template_id_0853dfa7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/FriesChoices.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/FriesChoices.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FriesChoices_vue_vue_type_template_id_0ac776e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FriesChoices.vue?vue&type=template&id=0ac776e4& */ "./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=template&id=0ac776e4&");
/* harmony import */ var _FriesChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FriesChoices.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FriesChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FriesChoices_vue_vue_type_template_id_0ac776e4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FriesChoices_vue_vue_type_template_id_0ac776e4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/FriesChoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FriesChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FriesChoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FriesChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=template&id=0ac776e4&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=template&id=0ac776e4& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FriesChoices_vue_vue_type_template_id_0ac776e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FriesChoices.vue?vue&type=template&id=0ac776e4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/FriesChoices.vue?vue&type=template&id=0ac776e4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FriesChoices_vue_vue_type_template_id_0ac776e4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FriesChoices_vue_vue_type_template_id_0ac776e4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductDetailsModal_vue_vue_type_template_id_3fee342d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductDetailsModal.vue?vue&type=template&id=3fee342d& */ "./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=template&id=3fee342d&");
/* harmony import */ var _ProductDetailsModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductDetailsModal.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProductDetailsModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductDetailsModal_vue_vue_type_template_id_3fee342d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProductDetailsModal_vue_vue_type_template_id_3fee342d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailsModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProductDetailsModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailsModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=template&id=3fee342d&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=template&id=3fee342d& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailsModal_vue_vue_type_template_id_3fee342d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProductDetailsModal.vue?vue&type=template&id=3fee342d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/ProductDetailsModal.vue?vue&type=template&id=3fee342d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailsModal_vue_vue_type_template_id_3fee342d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDetailsModal_vue_vue_type_template_id_3fee342d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SidesAddOns_vue_vue_type_template_id_d07bb87c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidesAddOns.vue?vue&type=template&id=d07bb87c& */ "./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=template&id=d07bb87c&");
/* harmony import */ var _SidesAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidesAddOns.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SidesAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SidesAddOns_vue_vue_type_template_id_d07bb87c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SidesAddOns_vue_vue_type_template_id_d07bb87c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/SidesAddOns.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SidesAddOns.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesAddOns_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=template&id=d07bb87c&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=template&id=d07bb87c& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesAddOns_vue_vue_type_template_id_d07bb87c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SidesAddOns.vue?vue&type=template&id=d07bb87c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SidesAddOns.vue?vue&type=template&id=d07bb87c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesAddOns_vue_vue_type_template_id_d07bb87c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesAddOns_vue_vue_type_template_id_d07bb87c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SidesChoices.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SidesChoices.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SidesChoices_vue_vue_type_template_id_25b7e25a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SidesChoices.vue?vue&type=template&id=25b7e25a& */ "./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=template&id=25b7e25a&");
/* harmony import */ var _SidesChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SidesChoices.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SidesChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SidesChoices_vue_vue_type_template_id_25b7e25a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SidesChoices_vue_vue_type_template_id_25b7e25a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/SidesChoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SidesChoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=template&id=25b7e25a&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=template&id=25b7e25a& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesChoices_vue_vue_type_template_id_25b7e25a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SidesChoices.vue?vue&type=template&id=25b7e25a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SidesChoices.vue?vue&type=template&id=25b7e25a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesChoices_vue_vue_type_template_id_25b7e25a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SidesChoices_vue_vue_type_template_id_25b7e25a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SuggestionChoices_vue_vue_type_template_id_390addbe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SuggestionChoices.vue?vue&type=template&id=390addbe& */ "./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=template&id=390addbe&");
/* harmony import */ var _SuggestionChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SuggestionChoices.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SuggestionChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SuggestionChoices_vue_vue_type_template_id_390addbe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SuggestionChoices_vue_vue_type_template_id_390addbe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SuggestionChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SuggestionChoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SuggestionChoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=template&id=390addbe&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=template&id=390addbe& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SuggestionChoices_vue_vue_type_template_id_390addbe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SuggestionChoices.vue?vue&type=template&id=390addbe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/SuggestionChoices.vue?vue&type=template&id=390addbe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SuggestionChoices_vue_vue_type_template_id_390addbe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SuggestionChoices_vue_vue_type_template_id_390addbe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UpgradableItems_vue_vue_type_template_id_7e24cd60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UpgradableItems.vue?vue&type=template&id=7e24cd60& */ "./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=template&id=7e24cd60&");
/* harmony import */ var _UpgradableItems_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UpgradableItems.vue?vue&type=script&lang=js& */ "./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UpgradableItems_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UpgradableItems_vue_vue_type_template_id_7e24cd60___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UpgradableItems_vue_vue_type_template_id_7e24cd60___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/orderRequest/Food/Items/UpgradableItems.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpgradableItems_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UpgradableItems.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UpgradableItems_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=template&id=7e24cd60&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=template&id=7e24cd60& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpgradableItems_vue_vue_type_template_id_7e24cd60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UpgradableItems.vue?vue&type=template&id=7e24cd60& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/orderRequest/Food/Items/UpgradableItems.vue?vue&type=template&id=7e24cd60&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpgradableItems_vue_vue_type_template_id_7e24cd60___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UpgradableItems_vue_vue_type_template_id_7e24cd60___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);