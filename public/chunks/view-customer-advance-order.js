(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{WUro:function(t,e,r){var a=r("WwiN");"string"==typeof a&&(a=[[t.i,a,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(a,s);a.locals&&(t.exports=a.locals)},WwiN:function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,".custom-container-fluid{max-width:100%}button.spanHover:hover{color:#fff}",""])},arTT:function(t,e,r){"use strict";r.r(e);var a=r("o0o1"),s=r.n(a);function i(t,e,r,a,s,i,n){try{var o=t[i](n),l=o.value}catch(t){return void r(t)}o.done?e(l):Promise.resolve(l).then(a,s)}var n={name:"ViewCustomerAdvanceOrderComponent",props:{ticketId:{type:String,required:!0}},data:function(){return{customerOrders:[],otherTenantOrder:[],customerName:null,isChecked:null,product_id:null,order_id:null,productItem:[],CQProductItem:[],orderDetails:[],params:{},inventory:[],changeQuantity_ids:[],returnButton:!0,totalPrice:0,otherTotalPrice:0,delivery_fee:0,tender:0,customer_tender:0,change:0,mop:0,productIds:[],qtyIds:[],deliverySchedule:{date:null,time:null},clickSubmit:!1,deliverySchedules:[]}},methods:{retrieveCustomerOrders:function(){var t,e=this;return(t=s.a.mark((function t(){var r,a,i;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,axios.get("/order/customer/".concat(e.ticketId));case 2:r=t.sent,a=r.data,e.customerOrders=a.tenant_order,e.otherTenantOrder=a.other_tenant_order,e.deliverySchedules=a.deliverySchedules,e.customerTender(a.tenant_order),e.calculateInventory(a.tenant_order),e.getTenantPrice(a.other_tenant_order),t.t0=s.a.keys(a.tenant_order);case 11:if((t.t1=t.t0()).done){t.next=18;break}return i=t.t1.value,e.deliverySchedule.date=a.tenant_order[i][0].pickup_at.split(" ")[0],e.deliverySchedule.time="00:00:00"==a.tenant_order[i][0].pickup_at.split(" ")[1]?null:a.tenant_order[i][0].pickup_at.split(" ")[1],t.abrupt("break",18);case 18:0===e.customerOrders.length&&location.replace("/order_request");case 19:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(a,s){var n=t.apply(e,r);function o(t){i(n,a,s,o,l,"next",t)}function l(t){i(n,a,s,o,l,"throw",t)}o(void 0)}))})()},getTenantPrice:function(t){var e=0;for(var r in t){var a=0;for(var s in t[r])0===t[r][s].canceled_status&&1===t[r][s].status&&(a+=parseFloat(t[r][s].total_price));e+=parseFloat(a)}this.otherTotalPrice=e},customerDetails:function(t){var e=null,r=null,a=null,s=null,i=null,n=null,o=null,l=null;for(var c in t){var d=t[c].customer_delivery_info.complete_address+",";null!=t[c].customer_delivery_info.complete_address&&""!=t[c].customer_delivery_info.complete_address||(d=""),e="".concat(t[c].customer_delivery_info.lastname,", ").concat(t[c].customer_delivery_info.firstname),o=t[c].praduct.tenant.tenant,n=t[c].ticket.type,r=t[c].customer_delivery_info.mobile_number,a=t[c].customer_delivery_info.telephone_number,s="".concat(d," ").concat(t[c].customer_delivery_info.street_purok,", ").concat(t[c].customer_delivery_info.barangay.brgy_name,", ").concat(t[c].customer_delivery_info.barangay.town.town_name,", ").concat(t[c].customer_delivery_info.barangay.town.prov_name),i=t[c].submitted_at,l=t[c].ticket.ticket;break}return this.customerName=e,{customerName:e,mobileNo:r,telephoneNo:a,address:s,dateOrdered:i,orderPlatform:n,tenantName:o,ticket_id:l}},customerTender:function(t){var e=0;for(var r in t){e=parseFloat(t[r][0].customer_tender.amount);break}this.tender=e},calculateInventory:function(t){this.inventory=[],this.changeQuantity_ids=[],this.productIds=[],this.qtyIds=[];var e=0;for(var r in t)for(var a=0;a<t[r].length;a++)0===t[r][a].canceled_status&&(this.productIds.push(t[r][a].product_id),this.qtyIds.push(t[r][a].qty)),""!==t[r][a].quantity&&"0"!==t[r][a].quantity&&(e=parseInt(t[r][a].quantity)-parseInt(t[r][a].qty),this.inventory.push(e),this.changeQuantity_ids.push(t[r][a].product_id))},disabledItem:function(t,e){t=parseInt(t),e=parseInt(e);return!!isNaN(e)||!(t>e)},orderSummary:function(t){var e,r,a="",s="",i=0,n=0,o=0;return a=null===t[0].order_remarks?"":t[0].order_remarks.remarks,s=null===t[0].customer_order_remarks?"":t[0].customer_order_remarks.instructions,e=t[0].customer_tender.delivery_charge,r=parseFloat(t[0].customer_delivery_info.barangay.town.delivery_charge.customer_to_pay)-parseFloat(t[0].customer_delivery_info.barangay.town.delivery_charge.charge_amt),t.forEach((function(t){var e=null;for(var r in t.product_prices)e=(null==t.uom_id&&""==t.uom_id||(t.product_prices[r].uom_id,t.uom_id),t.product_prices[r].stocks);0===t.canceled_status&&1===t.status&&(parseInt(t.quantity)>parseInt(e)||(o+=parseFloat(t.total_price),n+=parseInt(t.quantity),i++))})),this.totalPrice=o,this.delivery_fee=e,{customerRemarks:a,customerOrderRemarks:s,totalItems:i,totalQuantity:n,totalPrice:o,minimumOrder:r,delivery_charge:e}},productDetails:function(t){var e=null,r=null,a=null,s=0;for(var i in t.product_prices)null!=t.uom_id?t.product_prices[i].uom_id==t.uom_id&&(e=t.product_prices[i].id,r=t.product_prices[i].unit_measure.unit_measure,a=t.product_prices[i].stocks,s=t.product_prices[i].available):(e=t.product_prices[i].id,r=null,a=t.product_prices[i].stocks,s=t.product_prices[i].available);return{id:e,unit_measure:r,stocks:a,available:s}}},filters:{moment:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){return moment(t).format("MMM DD, YYYY")})),momentTime:function(t){return moment(t).format("h:mm A")}},mounted:function(){this.retrieveCustomerOrders()}},o=(r("e9vY"),r("KHd+")),l=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"custom-container-fluid"},[t._m(0),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[r("div",{staticClass:"card-box"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-6"},[r("h4",{staticClass:"header-title"},[t._v("Orders of "+t._s(t.customerName))])]),t._v(" "),r("div",{staticClass:"col-lg-6"},[r("router-link",{staticClass:"btn btn-sm btn-bordered-warning waves-effect waves-light float-right",attrs:{to:{path:"/advance_order"},replace:""}},[r("i",{staticClass:"remixicon-arrow-left-circle-line"}),t._v(" Back\n            ")])],1)]),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[r("table",{staticClass:"table table-bordered",attrs:{width:"100%"}},[t._m(1),t._v(" "),r("tbody",t._l(t.customerOrders,(function(e,a,s){return r("tr",{key:s},[r("td",[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("table",{staticClass:"table table-sm"},[r("tbody",[r("tr",[r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Ticket ID:\n                                "),r("i",[t._v(t._s(t.customerDetails(e).ticket_id))])])]),t._v(" "),r("tr",[r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Customer Name:\n                                "),r("i",[t._v(t._s(t.customerDetails(e).customerName))])])]),t._v(" "),r("tr",[r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Mobile No:\n                                "),r("i",[t._v(t._s(t.customerDetails(e).mobileNo))])])]),t._v(" "),r("tr",[r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Telephone No:\n                                "),r("i",[null!==t.customerDetails(e).telephoneNo?r("span",[t._v(t._s(t.customerDetails(e).telephoneNo))]):r("span",[t._v("N/A")])])])]),t._v(" "),r("tr",[r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Address:\n                                "),r("i",[t._v(t._s(t.customerDetails(e).address))])])]),t._v(" "),r("tr",[r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Date Order:\n                                "),r("i",[t._v(t._s(t._f("dateTimeFormat")(t.customerDetails(e).dateOrdered)))])])]),t._v(" "),r("tr",[1===t.customerDetails(e).orderPlatform?r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Order From:\n                                "),r("i",{staticClass:"remixicon-phone-line"}),r("i",[t._v("Tele-Ordering")])]):3===t.customerDetails(e).orderPlatform?r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Order From:\n                                "),r("i",{staticClass:"remixicon-computer-line"}),r("i",[t._v("Web Application")])]):r("td",{staticClass:"font-weight-normal"},[t._v("\n                                Order From:\n                                "),r("i",{staticClass:"remixicon-smartphone-line"}),r("i",[t._v("Mobile Application")])])])])])])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("hr"),t._v(" "),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:""}},[t._v("Schedule Date")]),t._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:t.deliverySchedule.date,expression:"deliverySchedule.date"}],staticClass:"form-control",attrs:{disabled:""},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.deliverySchedule,"date",e.target.multiple?r:r[0])}}},t._l(t.deliverySchedules,(function(e,a){return r("option",{key:a,domProps:{value:e.date}},[t._v(t._s(t._f("moment")(e.date)))])})),0)]),t._v(" "),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:""}},[t._v("Schedule Time")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.deliverySchedule.time,expression:"deliverySchedule.time"}],staticClass:"form-control",attrs:{type:"time",min:t.deliverySchedule.time,max:t.deliverySchedules[0].time_to,readonly:""},domProps:{value:t.deliverySchedule.time},on:{input:function(e){e.target.composing||t.$set(t.deliverySchedule,"time",e.target.value)}}})])])])]),t._v(" "),r("td",[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticStyle:{}},[r("table",{staticClass:"table table-sm table-hover"},[r("thead",[r("tr",[r("th",[r("center",[t._v("Image")])],1),t._v(" "),r("th",{staticStyle:{"white-space":"nowrap"}},[t._v("\n                                  Product Name\n                                ")]),t._v(" "),r("th",{staticStyle:{"white-space":"nowrap"},attrs:{align:"right"}},[t._v("\n                                  Unit Price\n                                ")]),t._v(" "),r("th",[t._v("Qty.")]),t._v(" "),r("th",{staticStyle:{"white-space":"nowrap"},attrs:{align:"right"}},[t._v("\n                                  Total Price\n                                ")]),t._v(" "),r("th",[t._v("Availability")]),t._v(" "),r("th",{staticStyle:{"white-space":"nowrap"}},[r("center",[t._v("Item Served")])],1)])]),t._v(" "),r("tbody",t._l(e,(function(e,a){return r("tr",{key:a},[r("td",{attrs:{align:"center"}},[r("img",{staticClass:"rounded-circle",attrs:{height:"66",width:"70",src:"/storage/"+e.image,alt:e.product_name}})]),t._v(" "),r("td",[null!==t.productDetails(e).unit_measure?r("dt",{staticStyle:{"font-size":"12px"}},[t._v("\n                                    "+t._s(t.productDetails(e).unit_measure+" "+e.product_name)+"\n                                  ")]):r("dt",{staticStyle:{"font-size":"12px"}},[t._v("\n                                    "+t._s(e.product_name)+"\n                                  ")]),t._v(" "),e.product_suggestion.length>0?r("dd",{staticStyle:{"font-size":"10px"}},t._l(e.product_suggestion,(function(e,a){return r("div",{key:"suggestion"+a},[r("span",[t._v("+\n                                        "),r("span",{staticClass:"text-danger"},[t._v(t._s(e.suggestion.suggestion)+"\n                                          :")]),t._v("\n                                        "+t._s(e.item_suggested.description))]),t._v(" "),"0.00"!==e.addon_price?r("span",{staticClass:"float-right"},[t._v("₱ "+t._s(e.addon_price))]):t._e()])})),0):t._e(),t._v(" "),t._l(e.product_choices,(function(e,a){return r("dd",{key:"choice"+a,staticStyle:{"font-size":"10px"}},[r("div",[null!=e.product_details?r("span",[t._v("+\n                                        "),null!==e.uom_id?r("span",[t._v(t._s(e.unit_measure.unit_measure)+" ")]):t._e(),t._v(t._s(e.product_details.product_name))]):t._e(),t._v(" "),"0.00"!==e.addon_price?r("span",{staticClass:"float-right"},[t._v("₱ "+t._s(e.addon_price))]):t._e()])])})),t._v(" "),t._l(e.product_addons,(function(e,a){return r("dd",{key:"addon"+a,staticStyle:{"font-size":"10px"}},[r("div",[null!=e.product_details?r("span",[t._v("+\n                                        "),null!==e.uom_id?r("span",[t._v(t._s(e.unit_measure.unit_measure)+" ")]):t._e(),t._v(t._s(e.product_details.product_name))]):t._e(),t._v(" "),"0.00"!==e.addon_price?r("span",{staticClass:"float-right"},[t._v("₱ "+t._s(e.addon_price))]):t._e()])])}))],2),t._v(" "),r("td",[t._v("\n                                  ₱\n                                  "+t._s(t._f("numberFormat")(parseFloat(e.product_price)))+"\n                                ")]),t._v(" "),r("td",[t._v(t._s(e.quantity))]),t._v(" "),r("td",[t._v("\n                                  ₱\n                                  "+t._s(t._f("numberFormat")(parseFloat(e.total_price)))+"\n                                ")]),t._v(" "),r("td",{attrs:{align:"center"}},[r("div",{staticClass:"custom-control custom-switch"},[r("input",{staticClass:"custom-control-input",attrs:{type:"checkbox",id:"onoffswitch"+a,disabled:""},domProps:{checked:1===e.status&&1===t.productDetails(e).available&&t.disabledItem(e.quantity,t.productDetails(e).stocks)}}),t._v(" "),r("label",{staticClass:"custom-control-label",attrs:{for:"onoffswitch"+a}})])]),t._v(" "),r("td",{attrs:{align:"center"}},[null===t.productDetails(e).stocks?r("span",{staticClass:"badge badge-light-success"},[t._v("no limit")]):t._e(),t._v(" "),0===t.productDetails(e).stocks?r("span",{staticClass:"badge badge-light-danger"},[t._v("out of stock")]):r("span",[t._v(t._s(t.productDetails(e).stocks))])])])})),0)])])])]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-5"},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"text-1"}},[t._v("Unfound Items")]),t._v(" "),r("textarea",{staticClass:"form-control",attrs:{name:"",id:"text-1",cols:"30",rows:"3",readonly:""},domProps:{value:t.orderSummary(e).customerRemarks}})]),t._v(" "),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"text-2"}},[t._v("Special Instructions")]),t._v(" "),r("textarea",{staticClass:"form-control",attrs:{name:"",id:"text-2",cols:"30",rows:"3",readonly:""},domProps:{value:t.orderSummary(e).customerOrderRemarks}})])]),t._v(" "),r("div",{staticClass:"col-md-7"},[r("table",{staticClass:"table table-sm",attrs:{width:"100%"}},[r("thead",[r("tr",[r("th",{staticClass:"font-weight-bold",attrs:{colspan:"2"}},[t._v("\n                                "+t._s(t.customerDetails(e).tenantName)+" Order\n                                Summary\n                              ")])])]),t._v(" "),r("tbody",[r("tr",[r("td",{attrs:{width:"75%"}},[t._v("No of Item:")]),t._v(" "),r("td",{attrs:{align:"right",width:"25%"}},[t._v("\n                                "+t._s(t.orderSummary(e).totalItems)+"\n                              ")])]),t._v(" "),r("tr",[r("td",[t._v("Total Quantity:")]),t._v(" "),r("td",{attrs:{align:"right"}},[t._v("\n                                "+t._s(t.orderSummary(e).totalQuantity)+"\n                              ")])]),t._v(" "),r("tr",[r("td",[t._v("\n                                "+t._s(t.customerDetails(e).tenantName)+" Total\n                                Amt. Purchase:\n                                "),r("br")]),t._v(" "),r("td",{attrs:{align:"right"}},[t._v("\n                                ₱\n                                "+t._s(t._f("numberFormat")(t.orderSummary(e).totalPrice))+"\n                              ")])])])])])])])])})),0)])])])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"page-title-box"},[e("div",{staticClass:"page-title-right"},[e("ol",{staticClass:"breadcrumb m-0"},[e("li",{staticClass:"breadcrumb-item"},[e("a",{attrs:{href:"javascript: void(0);"}},[this._v("Advance Order")])]),this._v(" "),e("li",{staticClass:"breadcrumb-item active"},[this._v("Customer Monitoring")])])]),this._v(" "),e("h4",{staticClass:"page-title"},[this._v("Customer Monitoring")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("td",{staticClass:"font-weight-bold",attrs:{width:"25%"}},[this._v("\n                    Customer Details\n                  ")]),this._v(" "),e("td",{staticClass:"font-weight-bold",attrs:{width:"75%"}},[this._v("Order Details")])])])}],!1,null,null,null);e.default=l.exports},e9vY:function(t,e,r){"use strict";var a=r("WUro");r.n(a).a}}]);