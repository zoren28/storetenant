(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{TgDG:function(t,e,r){"use strict";var a={name:"LocationRangeComponent",props:["location_range"],methods:{closeModal:function(){this.$emit("close-modal")}}},o=r("KHd+"),s=Object(o.a)(a,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"modal-dialog modal-lg"},[r("div",{staticClass:"modal-content"},[r("div",{staticClass:"modal-header"},[r("h4",{staticClass:"modal-title"},[t._v("Location Range")]),t._v(" "),r("button",{staticClass:"close",attrs:{type:"button","aria-hidden":"true"},on:{click:t.closeModal}},[t._v("\n          ×\n        ")])]),t._v(" "),r("div",{staticClass:"modal-body p-4"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("table",{staticClass:"table table-sm table-hover table-bordered",attrs:{id:"dt-product-menu",width:"100%"}},[t._m(0),t._v(" "),r("tbody",t._l(t.location_range,(function(e,a){return r("tr",{key:a},[r("td",[t._v(t._s(e.location))]),t._v(" "),r("td",[t._v(t._s(e.riders_fee))])])})),0)])])])]),t._v(" "),r("div",{staticClass:"modal-footer"},[r("button",{staticClass:"btn btn-secondary waves-effect",attrs:{type:"button"},on:{click:t.closeModal}},[t._v("\n          Close\n        ")])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("Location")]),this._v(" "),e("th",[this._v("Rider's Fee")])])])}],!1,null,null,null);e.a=s.exports},fbc7:function(t,e,r){"use strict";r.r(e);var a=r("o0o1"),o=r.n(a),s=r("XuX8"),i=r.n(s),c=r("4HBT"),n=r("uUT0");i.a.component(c.HasError.name,c.HasError),i.a.component(c.AlertError.name,c.AlertError);var d={name:"AddProductComponent",props:["fd_types"],data:function(){return{productForm:new c.Form({product_name:null,description:null,categories:[],stocks:null,price:null,location_range:0}),clickSubmit:!1}},methods:{inputPrice:function(t,e){var r=e.target.value;""!==r&&!1===isNaN(parseFloat(r))||(this.productForm.price=null,$("input#"+t).val(""))},checkProductForm:function(){var t=this;this.productForm.categories.length?(this.clickSubmit=!0,this.productForm.image=this.$refs.image.files[0],this.productForm.submit("post","/product/saved_all_product_details",{transformRequest:[function(t,e){return Object(n.serialize)(t)}],onUploadProgress:function(t){}}).then((function(e){var r=e.data,a=(e.status,r.message);swal({title:"Success!",text:a,type:"success",allowOutsideClick:!1,buttonsStyling:!1,confirmButtonClass:"btn btn-primary"}).then(function(){this.clickSubmit=!1,this.productForm.clear(),this.productForm.reset(),this.$refs.image.value=null,$("div#modal-add-product").modal("hide"),this.$parent.fetchProductList()}.bind(t))})).catch((function(e){t.clickSubmit=!1;var r=e.response,a=r.data,o=r.status;if(401===o)Swal.fire({type:"warning",title:"Warning",text:"Session has been expired."});else if(422===o){var s=a.message;Swal.fire({type:"warning",title:"Warning",text:s})}else Swal.fire({type:"error",title:"Error",text:"Oops, something went wrong!"})}))):Swal.fire({type:"warning",title:"Warning",text:"Please choose atleast one category."}).then((function(t){}))},locationRange:function(){$("div#modal-location-range").modal({backdrop:"static",keyboard:!1,show:!0})}}},l=r("KHd+"),u=Object(l.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"modal-dialog modal-lg"},[r("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),r("form",{attrs:{method:"post",enctype:"multipart/form-data"},on:{submit:function(e){return e.preventDefault(),t.checkProductForm(e)}}},[r("div",{staticClass:"modal-body p-4"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[r("label",{staticClass:"control-label",attrs:{for:"field-1"}},[t._v("Product Name")]),t._v(" "),r("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.productForm.product_name,expression:"productForm.product_name"}],staticClass:"form-control",class:{"is-invalid":t.productForm.errors.has("product_name")},attrs:{type:"text",id:"field-1",placeholder:"Product Name",autocomplete:"off"},domProps:{value:t.productForm.product_name},on:{input:function(e){e.target.composing||t.$set(t.productForm,"product_name",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.productForm,field:"product_name"}})],1)]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[r("label",{staticClass:"control-label",attrs:{for:"product-image"}},[t._v("Product Image")]),t._v(" "),r("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),r("input",{ref:"image",staticClass:"form-control",class:{"is-invalid":t.productForm.errors.has("image")},attrs:{type:"file",id:"product-image",placeholder:"Product Image"}}),t._v(" "),r("has-error",{attrs:{form:t.productForm,field:"image"}})],1)])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[t._m(1),t._v(" "),r("br"),t._v(" "),t._l(t.fd_types,(function(e,a){return r("div",{key:a,staticClass:"checkbox checkbox-primary"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.productForm.categories,expression:"productForm.categories"}],attrs:{type:"checkbox",id:"category_id_"+e.category_id},domProps:{value:e.category_id,checked:Array.isArray(t.productForm.categories)?t._i(t.productForm.categories,e.category_id)>-1:t.productForm.categories},on:{change:function(r){var a=t.productForm.categories,o=r.target,s=!!o.checked;if(Array.isArray(a)){var i=e.category_id,c=t._i(a,i);o.checked?c<0&&t.$set(t.productForm,"categories",a.concat([i])):c>-1&&t.$set(t.productForm,"categories",a.slice(0,c).concat(a.slice(c+1)))}else t.$set(t.productForm,"categories",s)}}}),t._v(" "),r("label",{attrs:{for:"category_id_"+e.category_id}},[t._v(t._s(e.category))]),t._v(" "),r("br")])})),t._v(" "),t.productForm.categories.length?t._e():r("small",[r("code",[t._v("Note:")]),t._v(" Please choose atleast one category.")])],2)]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"form-group"},[t._m(2),t._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.productForm.description,expression:"productForm.description"}],staticClass:"form-control",class:{"is-invalid":t.productForm.errors.has("description")},attrs:{id:"field-3",rows:"4"},domProps:{value:t.productForm.description},on:{input:function(e){e.target.composing||t.$set(t.productForm,"description",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.productForm,field:"description"}})],1)])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"form-group"},[r("a",{attrs:{href:"javascript:void(0)"},on:{click:t.locationRange}},[r("label",[t._v("Location Range")])]),t._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:t.productForm.location_range,expression:"productForm.location_range"}],staticClass:"form-control",class:{"is-invalid":t.productForm.errors.has("location_range")},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.productForm,"location_range",e.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"0"}},[t._v("Within the agreed location")]),t._v(" "),r("option",{attrs:{value:"1"}},[t._v("Rider's Fee is ₱ 30")]),t._v(" "),r("option",{attrs:{value:"2"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 50")]),t._v(" "),r("option",{attrs:{value:"3"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 70")]),t._v(" "),r("option",{attrs:{value:"4"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 90")]),t._v(" "),r("option",{attrs:{value:"5"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 110")]),t._v(" "),r("option",{attrs:{value:"6"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 135")]),t._v(" "),r("option",{attrs:{value:"7"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 150")])]),t._v(" "),r("has-error",{attrs:{form:t.productForm,field:"location_range"}})],1)])])])]),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"form-group"},[t._m(3),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.productForm.price,expression:"productForm.price",modifiers:{number:!0}}],staticClass:"form-control",class:{"is-invalid":t.productForm.errors.has("price")},attrs:{type:"text",id:"price",autocomplete:"off"},domProps:{value:t.productForm.price},on:{keyup:function(e){return t.inputPrice("price",e)},input:function(e){e.target.composing||t.$set(t.productForm,"price",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),r("has-error",{attrs:{form:t.productForm,field:"price"}})],1)])])]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"stocks"}},[t._v("No. of Item Available")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.productForm.stocks,expression:"productForm.stocks",modifiers:{number:!0}}],staticClass:"form-control",class:{"is-invalid":t.productForm.errors.has("stocks")},attrs:{id:"stocks",type:"number",min:"0"},domProps:{value:t.productForm.stocks},on:{input:function(e){e.target.composing||t.$set(t.productForm,"stocks",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),r("has-error",{attrs:{form:t.productForm,field:"stocks"}})],1)])])])])]),t._v(" "),r("div",{staticClass:"modal-footer"},[r("button",{staticClass:"btn btn-secondary waves-effect",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n          Close\n        ")]),t._v(" "),!1===t.clickSubmit?r("button",{staticClass:"btn btn-info waves-effect waves-light",attrs:{type:"submit"}},[t._v("\n          Save changes\n        ")]):r("button",{staticClass:"btn btn-info waves-effect waves-light",attrs:{disabled:""}},[r("span",{staticClass:"spinner-border spinner-border-sm mr-1",attrs:{role:"status","aria-hidden":"true"}}),t._v("\n          Loading...\n        ")])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h4",{staticClass:"modal-title"},[this._v("Product Details")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-hidden":"true"}},[this._v("\n        ×\n      ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("Categories "),e("span",{staticClass:"text-danger"},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"field-3"}},[this._v("Description "),e("span",{staticClass:"text-danger"},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"price"}},[this._v("Price "),e("span",{staticClass:"text-danger"},[this._v("*")])])}],!1,null,null,null).exports;function m(t,e,r,a,o,s,i){try{var c=t[s](i),n=c.value}catch(t){return void r(t)}c.done?e(n):Promise.resolve(n).then(a,o)}i.a.component(c.HasError.name,c.HasError),i.a.component(c.AlertError.name,c.AlertError);var p={name:"EditProductComponent",props:["fd_types","product_info"],data:function(){return{editProductForm:new c.Form({product_id:null,product_name:null,description:null,categories:[],stocks:null,price:null,location_range:0}),clickSubmit:!1}},methods:{fetch_product_details:function(t){var e,r=this;return(e=o.a.mark((function e(){var a,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,axios.get("/product/fetch_all_product_details/".concat(t));case 2:a=e.sent,s=a.data,r.product_details(s),r.category_type(s.product_categories),r.product_price(s.product_price);case 7:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(a,o){var s=e.apply(t,r);function i(t){m(s,a,o,i,c,"next",t)}function c(t){m(s,a,o,i,c,"throw",t)}i(void 0)}))})()},product_details:function(t){this.editProductForm.product_name=t.product_name,this.editProductForm.description=t.description,this.editProductForm.previous_image=t.image,this.editProductForm.location_range=t.location_range},category_type:function(t){for(var e in t)this.editProductForm.categories.push(t[e].category_id)},product_price:function(t){this.editProductForm.stocks=t[0].stocks,this.editProductForm.price=t[0].price},inputPrice:function(t,e){var r=e.target.value;""!==r&&!1===isNaN(parseFloat(r))||(this.productForm.price=null,$("input#"+t).val(""))},checkProductForm:function(){var t=this;this.editProductForm.categories.length?(this.clickSubmit=!0,this.editProductForm.image=this.$refs.image.files[0],this.editProductForm.submit("post","/product/update_all_product_details",{transformRequest:[function(t,e){return Object(n.serialize)(t)}],onUploadProgress:function(t){}}).then((function(e){var r=e.data,a=(e.status,r.message);swal({title:"Success!",text:a,type:"success",allowOutsideClick:!1,buttonsStyling:!1,confirmButtonClass:"btn btn-primary"}).then(function(){this.clickSubmit=!1,this.editProductForm.clear(),this.editProductForm.reset(),this.$refs.image.value=null,$("div#modal-edit-product").modal("hide"),this.$parent.fetchProductList()}.bind(t))})).catch((function(e){t.clickSubmit=!1;var r=e.response,a=r.data,o=r.status;if(401===o)Swal.fire({type:"warning",title:"Warning",text:"Session has been expired."});else if(422===o){var s=a.message;Swal.fire({type:"warning",title:"Warning",text:s})}else Swal.fire({type:"error",title:"Error",text:"Oops, something went wrong!"})}))):Swal.fire({type:"warning",title:"Warning",text:"Please choose atleast one category."}).then((function(t){}))},locationRange:function(){$("div#modal-location-range").modal({backdrop:"static",keyboard:!1,show:!0})}},watch:{product_info:function(t){this.editProductForm.clear(),this.editProductForm.reset(),this.editProductForm.product_id=t.product_id,this.$refs.image.value=null,this.fetch_product_details(t.product_id)}}},v=Object(l.a)(p,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"modal-dialog modal-lg"},[r("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),r("form",{attrs:{method:"post",enctype:"multipart/form-data"},on:{submit:function(e){return e.preventDefault(),t.checkProductForm(e)}}},[r("div",{staticClass:"modal-body p-4"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[r("label",{staticClass:"control-label"},[t._v("Product Name")]),t._v(" "),r("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.editProductForm.product_name,expression:"editProductForm.product_name"}],staticClass:"form-control",class:{"is-invalid":t.editProductForm.errors.has("product_name")},attrs:{type:"text",placeholder:"Product Name",autocomplete:"off"},domProps:{value:t.editProductForm.product_name},on:{input:function(e){e.target.composing||t.$set(t.editProductForm,"product_name",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.editProductForm,field:"product_name"}})],1)]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[r("label",{staticClass:"control-label"},[t._v("Product Image")]),t._v(" "),r("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),r("input",{ref:"image",staticClass:"form-control",class:{"is-invalid":t.editProductForm.errors.has("image")},attrs:{type:"file",placeholder:"Product Image"}}),t._v(" "),r("has-error",{attrs:{form:t.editProductForm,field:"image"}})],1)])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"form-group"},[t._m(1),t._v(" "),r("br"),t._v(" "),t._l(t.fd_types,(function(e,a){return r("div",{key:a,staticClass:"checkbox checkbox-primary"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.editProductForm.categories,expression:"editProductForm.categories"}],attrs:{type:"checkbox",id:"editcategory_id_"+e.category_id},domProps:{value:e.category_id,checked:Array.isArray(t.editProductForm.categories)?t._i(t.editProductForm.categories,e.category_id)>-1:t.editProductForm.categories},on:{change:function(r){var a=t.editProductForm.categories,o=r.target,s=!!o.checked;if(Array.isArray(a)){var i=e.category_id,c=t._i(a,i);o.checked?c<0&&t.$set(t.editProductForm,"categories",a.concat([i])):c>-1&&t.$set(t.editProductForm,"categories",a.slice(0,c).concat(a.slice(c+1)))}else t.$set(t.editProductForm,"categories",s)}}}),t._v(" "),r("label",{attrs:{for:"editcategory_id_"+e.category_id}},[t._v(t._s(e.category))]),t._v(" "),r("br")])})),t._v(" "),t.editProductForm.categories.length?t._e():r("small",[r("code",[t._v("Note:")]),t._v(" Please choose atleast one category.")])],2)]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"form-group"},[t._m(2),t._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.editProductForm.description,expression:"editProductForm.description"}],staticClass:"form-control",class:{"is-invalid":t.editProductForm.errors.has("description")},attrs:{rows:"4"},domProps:{value:t.editProductForm.description},on:{input:function(e){e.target.composing||t.$set(t.editProductForm,"description",e.target.value)}}}),t._v(" "),r("has-error",{attrs:{form:t.editProductForm,field:"description"}})],1)])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"form-group"},[r("a",{attrs:{href:"javascript:void(0)"},on:{click:t.locationRange}},[r("label",[t._v("Location Range")])]),t._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:t.editProductForm.location_range,expression:"editProductForm.location_range"}],staticClass:"form-control",class:{"is-invalid":t.editProductForm.errors.has("location_range")},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.editProductForm,"location_range",e.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"0"}},[t._v("Within the agreed location")]),t._v(" "),r("option",{attrs:{value:"1"}},[t._v("Rider's Fee is ₱ 30")]),t._v(" "),r("option",{attrs:{value:"2"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 50")]),t._v(" "),r("option",{attrs:{value:"3"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 70")]),t._v(" "),r("option",{attrs:{value:"4"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 90")]),t._v(" "),r("option",{attrs:{value:"5"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 110")]),t._v(" "),r("option",{attrs:{value:"6"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 135")]),t._v(" "),r("option",{attrs:{value:"7"}},[t._v("Rider's Fee is from ₱ 30 to ₱ 150")])]),t._v(" "),r("has-error",{attrs:{form:t.editProductForm,field:"location_range"}})],1)])])])]),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"form-group"},[t._m(3),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.editProductForm.price,expression:"editProductForm.price",modifiers:{number:!0}}],staticClass:"form-control",class:{"is-invalid":t.editProductForm.errors.has("price")},attrs:{type:"text",autocomplete:"off"},domProps:{value:t.editProductForm.price},on:{keyup:function(e){return t.inputPrice("price",e)},input:function(e){e.target.composing||t.$set(t.editProductForm,"price",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),r("has-error",{attrs:{form:t.editProductForm,field:"price"}})],1)])])]),t._v(" "),r("div",{staticClass:"col-md-6"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"form-group"},[r("label",[t._v("No. of Item Available")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model.number",value:t.editProductForm.stocks,expression:"editProductForm.stocks",modifiers:{number:!0}}],staticClass:"form-control",class:{"is-invalid":t.editProductForm.errors.has("stocks")},attrs:{type:"number",min:"0"},domProps:{value:t.editProductForm.stocks},on:{input:function(e){e.target.composing||t.$set(t.editProductForm,"stocks",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),r("has-error",{attrs:{form:t.editProductForm,field:"stocks"}})],1)])])])])]),t._v(" "),r("div",{staticClass:"modal-footer"},[r("button",{staticClass:"btn btn-secondary waves-effect",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n          Close\n        ")]),t._v(" "),!1===t.clickSubmit?r("button",{staticClass:"btn btn-info waves-effect waves-light",attrs:{type:"submit"}},[t._v("\n          Save changes\n        ")]):r("button",{staticClass:"btn btn-info waves-effect waves-light",attrs:{disabled:""}},[r("span",{staticClass:"spinner-border spinner-border-sm mr-1",attrs:{role:"status","aria-hidden":"true"}}),t._v("\n          Loading...\n        ")])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h4",{staticClass:"modal-title"},[this._v("Product Details")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-hidden":"true"}},[this._v("\n        ×\n      ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("Categories "),e("span",{staticClass:"text-danger"},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("Description "),e("span",{staticClass:"text-danger"},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("Price "),e("span",{staticClass:"text-danger"},[this._v("*")])])}],!1,null,null,null).exports,f=r("TgDG");function _(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var r=[],a=!0,o=!1,s=void 0;try{for(var i,c=t[Symbol.iterator]();!(a=(i=c.next()).done)&&(r.push(i.value),!e||r.length!==e);a=!0);}catch(t){o=!0,s=t}finally{try{a||null==c.return||c.return()}finally{if(o)throw s}}return r}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,a=new Array(e);r<e;r++)a[r]=t[r];return a}function g(t,e,r,a,o,s,i){try{var c=t[s](i),n=c.value}catch(t){return void r(t)}c.done?e(n):Promise.resolve(n).then(a,o)}function b(t){return function(){var e=this,r=arguments;return new Promise((function(a,o){var s=t.apply(e,r);function i(t){g(s,a,o,i,c,"next",t)}function c(t){g(s,a,o,i,c,"throw",t)}i(void 0)}))}}var C={components:{AddProduct:u,EditProduct:v,ProductDetailsModal:r("BV55").a,LocationRange:f.a},data:function(){return{table_data:[],table:{},clickAddProduct:!1,fd_types:[],location_range:[],product_info:{},foodProductDetails:{},modalMode:"View",addItemOrderForm:this.newAddForm(),editItemOrderForm:{}}},computed:{getList:function(){return this.table_data}},methods:{closeFoodProductDetail:function(){this.addItemOrderForm=this.newAddForm()},newAddForm:function(){return{productId:null,uomId:null,quantity:1,price:null,suggestions:{},cFlavor:{flavorId:null,price:null},cDrink:{uomId:null,productId:null,price:null},cSide:{uomId:null,productId:null,price:null},cFry:{uomId:null,productId:null,price:null},cSize:{uomId:null,productId:null,price:null},aDrinks:[],aSides:[],aDesserts:[]}},viewProduct:function(t,e){var r=this;return b(o.a.mark((function a(){var s,i;return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r.modalMode="View",a.next=3,axios.get("/product/details/".concat(t));case 3:s=a.sent,i=s.data,r.foodProductDetails=i.productDetails,r.addItemOrderForm.uomId=e,r.$set(r.foodProductDetails,"quantity",0),r.$set(r.foodProductDetails,"uom_id",e),$("#viewFoodProductDetail").modal("show");case 10:case"end":return a.stop()}}),a)})))()},editProduct:function(t){var e=this;return b(o.a.mark((function r(){var a,s,i,c;return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return $("button.update-button-"+t).hide(),$("button.update-product-"+t).show(),r.next=4,Promise.all([e.fetch_product_type(),e.fetch_location_range()]);case 4:a=r.sent,s=_(a,2),i=s[0],c=s[1],e.fd_types=i.data,e.location_range=c.data,e.product_info={product_id:t},$("div#modal-edit-product").modal({backdrop:"static",keyboard:!1,show:!0}),$("button.update-button-"+t).show(),$("button.update-product-"+t).hide();case 14:case"end":return r.stop()}}),r)})))()},changeStatus:function(t,e,r){var a=this;this.params={id:e,status:r},Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",type:"warning",allowOutsideClick:!1,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, change it!"}).then((function(t){t.value&&axios.post("/product/update_status",a.params).then((function(t){var e=t.data,r=(t.status,e.message);Swal.fire({type:"success",title:"Success",text:r}).then((function(t){a.fetchProductList()}))}))}))},updateStocks:function(t){Swal.fire({title:"Input available stocks:",type:"question",input:"number",showCancelButton:!0,confirmButtonText:"Submit",showLoaderOnConfirm:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",allowOutsideClick:!1}).then(function(e){var r=this;!0!==$.isNumeric(e.value)&&""!==e.value||Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",type:"warning",allowOutsideClick:!1,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, change it!"}).then((function(a){a.value&&(r.params={id:t,item_qty:e.value},axios.put("/product/update_product_stock",r.params).then((function(t){var e=t.data,a=(t.status,e.message);Swal.fire({type:"success",title:"Success",text:a}).then((function(t){r.fetchProductList()}))})))}))}.bind(this))},closeModal:function(){$("div#modal-location-range").modal("hide"),setTimeout((function(){$("body").addClass("modal-open")}),500)},fetch_location_range:function(){return b(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",axios.get("/product/fetch_location_range"));case 1:case"end":return t.stop()}}),t)})))()},fetch_product_type:function(){return b(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",axios.get("/product/fetch_product_type"));case 1:case"end":return t.stop()}}),t)})))()},addProduct:function(){var t=this;return b(o.a.mark((function e(){var r,a,s,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.clickAddProduct=!0,e.next=3,Promise.all([t.fetch_product_type(),t.fetch_location_range()]);case 3:r=e.sent,a=_(r,2),s=a[0],i=a[1],t.fd_types=s.data,t.location_range=i.data,$("div#modal-add-product").modal({backdrop:"static",keyboard:!1,show:!0}),t.clickAddProduct=!1;case 11:case"end":return e.stop()}}),e)})))()},fetchProductList:function(){var t=this;return b(o.a.mark((function e(){var r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return $.fn.DataTable.isDataTable("#dt-product-list")&&(t.table.destroy(),t.table_data=[]),e.next=3,axios.get("/product/fetch_product_list");case 3:r=e.sent,t.table_data=r.data,a=t,setTimeout((function(){a.table=$("#dt-product-list").DataTable({destroy:!0,order:[[0,"asc"]],columnDefs:[{targets:[1,2,3],orderable:!1},{targets:[4,5,6],orderable:!1,className:"text-center"},{targets:[7],orderable:!1,width:"20%",className:"text-center"}],language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}})}),100);case 7:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.fetchProductList()}},y=Object(l.a)(C,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-fluid"},[t._m(0),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-12"},[r("div",{staticClass:"card"},[r("div",{staticClass:"card-body"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[!1===t.clickAddProduct?r("button",{staticClass:"btn btn-primary waves-effect waves-light float-right",on:{click:t.addProduct}},[r("i",{staticClass:"fas fa-plus-circle"}),t._v("   Add Product\n              ")]):r("button",{staticClass:"btn btn-primary waves-effect waves-light float-right",attrs:{disabled:""}},[r("span",{staticClass:"spinner-border spinner-border-sm mr-1",attrs:{role:"status","aria-hidden":"true"}}),t._v("\n                Loading...\n              ")])])]),t._v(" "),r("hr"),t._v(" "),r("table",{staticClass:"table table-sm table-hover",attrs:{id:"dt-product-list",width:"100%"}},[t._m(1),t._v(" "),r("tbody",t._l(t.getList,(function(e,a){return r("tr",{key:a},[r("td",[r("a",{staticStyle:{cursor:"pointer"},attrs:{href:"javascript:void(0);"},on:{click:function(r){return t.viewProduct(e.product_id,e.uom_id)}}},[r("span",{staticClass:"font-weight-bold text-dark"},[t._v(t._s(e.product_name))])])]),t._v(" "),r("td",[r("span",{staticClass:"text-dark"},[t._v(t._s(e.description))])]),t._v(" "),r("td",[0!==e.price?r("span",{staticClass:"text-dark"},[t._v("₱ "+t._s(t._f("numberFormat")(e.price)))]):t._e()]),t._v(" "),r("td",[r("span",{staticClass:"text-dark"},[t._v(t._s(e.stocks))])]),t._v(" "),r("td",[r("img",{attrs:{src:"storage/"+e.image,width:"90",height:"60",loading:"lazy"}})]),t._v(" "),r("td",[1===e.active?r("span",{staticClass:"text-dark"},[t._v("yes")]):r("span",{staticClass:"text-dark"},[t._v("no")])]),t._v(" "),r("td",[1===e.available?r("span",{staticClass:"text-dark"},[t._v("yes")]):r("span",{staticClass:"text-dark"},[t._v("no")])]),t._v(" "),r("td",[r("button",{staticClass:"btn btn-sm btn-light btn-rounded",class:"update-button-"+e.product_id,attrs:{"data-wenk":"Edit Product"},on:{click:function(r){return t.editProduct(e.product_id)}}},[r("i",{staticClass:"text-primary remixicon-file-edit-line"})]),t._v(" "),r("button",{staticClass:"btn btn-sm btn-light btn-rounded",class:"update-product-"+e.product_id,staticStyle:{display:"none"}},[r("span",{staticClass:"spinner-border spinner-border-sm text-primary",attrs:{role:"status","aria-hidden":"true"}})]),t._v(" "),0===e.active?r("button",{staticClass:"btn btn-sm btn-light btn-rounded",attrs:{"data-wenk":"Activate Product","data-wenk-pos":"left"},on:{click:function(r){return t.changeStatus(a,e.product_id,1)}}},[r("i",{staticClass:"text-success remixicon-check-fill"})]):r("button",{staticClass:"btn btn-sm btn-light btn-rounded",attrs:{"data-wenk":"Deactivate Product","data-wenk-pos":"left"},on:{click:function(r){return t.changeStatus(a,e.product_id,0)}}},[r("i",{staticClass:"text-danger remixicon-close-fill"})]),t._v(" "),r("button",{staticClass:"btn btn-sm btn-light btn-rounded",attrs:{"data-wenk":"Input Available Stocks","data-wenk-pos":"left"},on:{click:function(r){return t.updateStocks(e.id)}}},[r("i",{staticClass:"text-primary remixicon-shopping-bag-line"})])])])})),0)])])])])]),t._v(" "),r("div",{staticClass:"modal fade",staticStyle:{display:"none"},attrs:{id:"modal-add-product",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[r("add-product",{attrs:{fd_types:t.fd_types}})],1),t._v(" "),r("div",{staticClass:"modal fade",staticStyle:{display:"none"},attrs:{id:"modal-location-range",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[r("location-range",{attrs:{location_range:t.location_range},on:{"close-modal":t.closeModal}})],1),t._v(" "),r("div",{staticClass:"modal fade",staticStyle:{display:"none"},attrs:{id:"modal-edit-product",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[r("edit-product",{attrs:{fd_types:t.fd_types,product_info:t.product_info}})],1),t._v(" "),r("div",{staticClass:"modal fade",staticStyle:{display:"none"},attrs:{id:"viewFoodProductDetail",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[r("product-details-modal",{attrs:{mode:t.modalMode,addItemOrderForm:t.addItemOrderForm,editItemOrderForm:t.editItemOrderForm,foodProductDetails:t.foodProductDetails},on:{closeFoodProductDetail:t.closeFoodProductDetail}})],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"page-title-box"},[e("div",{staticClass:"page-title-right"},[e("ol",{staticClass:"breadcrumb m-0"},[e("li",{staticClass:"breadcrumb-item"},[e("a",{attrs:{href:"javascript: void(0);"}},[this._v("Setup")])]),this._v(" "),e("li",{staticClass:"breadcrumb-item active"},[this._v("Product List")])])]),this._v(" "),e("h4",{staticClass:"page-title"},[this._v("Product List")])])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",[t._v("Product Name")]),t._v(" "),r("th",[t._v("Description")]),t._v(" "),r("th",[t._v("Price")]),t._v(" "),r("th",[t._v("Stocks")]),t._v(" "),r("th",[t._v("Image")]),t._v(" "),r("th",[t._v("Status")]),t._v(" "),r("th",[t._v("Available")]),t._v(" "),r("th",[t._v("Actions")])])])}],!1,null,null,null);e.default=y.exports}}]);