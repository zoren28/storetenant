(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{nhbY:function(t,e,a){"use strict";a.r(e);var s=a("o0o1"),r=a.n(s),n=a("XuX8"),i=a.n(n),o=a("4HBT"),l=a("uUT0");function c(t,e,a,s,r,n,i){try{var o=t[n](i),l=o.value}catch(t){return void a(t)}o.done?e(l):Promise.resolve(l).then(s,r)}i.a.component(o.HasError.name,o.HasError),i.a.component(o.AlertError.name,o.AlertError);var m={name:"AddTenantUserComponent",data:function(){return{tenantUserForm:new o.Form({name:null,username:null,email:null,user_type:"picker",image:null,password:"Tenant2020"})}},methods:{fetch_username:function(){var t,e=this;return(t=r.a.mark((function t(){var a,s;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,axios.get("/tenantuser/fetch_username");case 2:a=t.sent,s=a.data,e.tenantUserForm.username=s.username;case 5:case"end":return t.stop()}}),t)})),function(){var e=this,a=arguments;return new Promise((function(s,r){var n=t.apply(e,a);function i(t){c(n,s,r,i,o,"next",t)}function o(t){c(n,s,r,i,o,"throw",t)}i(void 0)}))})()},checkTenantUserForm:function(){var t=this;this.tenantUserForm.image=this.$refs.image.files[0],this.tenantUserForm.submit("post","/tenantuser/add_tenant_user",{transformRequest:[function(t,e){return Object(l.serialize)(t)}],onUploadProgress:function(t){}}).then((function(e){var a=e.data,s=(e.status,a.message);swal({title:"Success!",text:s,type:"success",buttonsStyling:!1,confirmButtonClass:"btn btn-primary"}).then(function(){$("div#modal-add-user").modal("hide"),setTimeout((function(){location.reload()}),1e3)}.bind(t))})).catch((function(t){var e=t.response,a=e.data,s=e.status;if(401==s)Swal.fire({type:"warning",title:"Warning",text:"Session has been expired."});else if(422===s){var r=a.message;Swal.fire({type:"warning",title:"Warning",text:r})}else Swal.fire({type:"error",title:"Error",text:"Oops, something went wrong!"})}))}},mounted:function(){this.fetch_username()}},d=a("KHd+"),u=Object(d.a)(m,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-dialog modal-lg"},[a("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),a("form",{attrs:{method:"post",enctype:"multipart/form-data"},on:{submit:function(e){return e.preventDefault(),t.checkTenantUserForm(e)}}},[a("div",{staticClass:"modal-body p-4"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"fullname"}},[t._v("FullName")]),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.name,expression:"tenantUserForm.name"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("name")},attrs:{type:"text",id:"fullname",placeholder:"Firstname Lastname"},domProps:{value:t.tenantUserForm.name},on:{input:function(e){e.target.composing||t.$set(t.tenantUserForm,"name",e.target.value)}}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"name"}})],1)]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"image"}},[t._v("User Image")]),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("input",{ref:"image",staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("image")},attrs:{type:"file",id:"image",placeholder:"Product Image"}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"image"}})],1)])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"email"}},[t._v("Email")]),t._v(" "),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.email,expression:"tenantUserForm.email"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("email")},attrs:{type:"email",id:"email",placeholder:"example@gmail.com",required:""},domProps:{value:t.tenantUserForm.email},on:{input:function(e){e.target.composing||t.$set(t.tenantUserForm,"email",e.target.value)}}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"email"}})],1)]),t._v(" "),t._m(1)]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"username"}},[t._v("Username")]),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.username,expression:"tenantUserForm.username"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("username")},attrs:{type:"username",id:"username",required:""},domProps:{value:t.tenantUserForm.username},on:{input:function(e){e.target.composing||t.$set(t.tenantUserForm,"username",e.target.value)}}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"username"}})],1)]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"password"}},[t._v("Password")]),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.password,expression:"tenantUserForm.password"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("password")},attrs:{type:"text",id:"password",readonly:""},domProps:{value:t.tenantUserForm.password},on:{input:function(e){e.target.composing||t.$set(t.tenantUserForm,"password",e.target.value)}}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"password"}})],1)])])]),t._v(" "),t._m(2)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h4",{staticClass:"modal-title"},[this._v("User Details")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-hidden":"true"}},[this._v("\n        ×\n      ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"control-label",attrs:{for:"user_type"}},[this._v("User Type")]),this._v(" "),e("span",{staticClass:"text-danger"},[this._v("*")]),this._v(" "),e("input",{staticClass:"form-control",attrs:{id:"user_type",type:"text",value:"picker",readonly:""}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary waves-effect",attrs:{type:"button","data-dismiss":"modal"}},[this._v("\n          Close\n        ")]),this._v(" "),e("button",{staticClass:"btn btn-info waves-effect waves-light",attrs:{type:"submit"}},[this._v("\n          Save changes\n        ")])])}],!1,null,null,null).exports;i.a.component(o.HasError.name,o.HasError),i.a.component(o.AlertError.name,o.AlertError);var v={name:"EditTenantUserComponent",props:["tenantId"],data:function(){return{tenantUserForm:new o.Form({id:null,name:null,username:null,email:null,user_type:null,image:null,password:"tenant2020",previous_image:null})}},methods:{fetchTenantUserDetails:function(t){var e=this;axios.get("/tenantuser/fetch_tenant_user_details/".concat(t)).then((function(t){var a=t.data;e.tenantUserForm.fill(a),e.tenantUserForm.password="tenant2020",e.tenantUserForm.previous_image=a.image}))},checkTenantUserForm:function(){var t=this;this.tenantUserForm.image=this.$refs.image.files[0],this.tenantUserForm.submit("post","/tenantuser/update_tenant_user",{transformRequest:[function(t,e){return Object(l.serialize)(t)}],onUploadProgress:function(t){}}).then((function(e){var a=e.data,s=(e.status,a.message);swal({title:"Success!",text:s,type:"success",buttonsStyling:!1,confirmButtonClass:"btn btn-primary"}).then(function(){$("div#modal-edit-user").modal("hide"),setTimeout((function(){location.reload()}),1e3)}.bind(t))})).catch((function(t){var e=t.response,a=e.data,s=e.status;if(401==s)Swal.fire({type:"warning",title:"Warning",text:"Session has been expired."});else if(422===s){var r=a.message;Swal.fire({type:"warning",title:"Warning",text:r})}else Swal.fire({type:"error",title:"Error",text:"Oops, something went wrong!"})}))}},watch:{tenantId:function(t){this.fetchTenantUserDetails(t)}}},f={components:{AddTenantUser:u,EditTenantUser:Object(d.a)(v,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-dialog modal-lg"},[a("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),a("form",{attrs:{method:"post",enctype:"multipart/form-data"},on:{submit:function(e){return e.preventDefault(),t.checkTenantUserForm(e)}}},[a("div",{staticClass:"modal-body p-4"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"field-1"}},[t._v("FullName")]),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.name,expression:"tenantUserForm.name"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("name")},attrs:{type:"text",id:"field-1",placeholder:"Firstname Lastname"},domProps:{value:t.tenantUserForm.name},on:{input:function(e){e.target.composing||t.$set(t.tenantUserForm,"name",e.target.value)}}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"name"}})],1)]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"field-2"}},[t._v("User Image")]),t._v(" "),a("input",{ref:"image",staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("image")},attrs:{type:"file",id:"field-2",placeholder:"Product Image"}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"image"}})],1)])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"field-3"}},[t._v("Email")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.email,expression:"tenantUserForm.email"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("email")},attrs:{type:"email",id:"field-3",placeholder:"example@gmail.com"},domProps:{value:t.tenantUserForm.email},on:{input:function(e){e.target.composing||t.$set(t.tenantUserForm,"email",e.target.value)}}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"email"}})],1)]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"field-4"}},[t._v("User Type")]),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.user_type,expression:"tenantUserForm.user_type"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("user_type")},attrs:{id:"field-4"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.tenantUserForm,"user_type",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"manager"}},[t._v("Manager")]),t._v(" "),a("option",{attrs:{value:"picker"}},[t._v("Picker")])]),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"user_type"}})],1)])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"field-5"}},[t._v("Username")]),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.username,expression:"tenantUserForm.username"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("username")},attrs:{type:"username",id:"field-5"},domProps:{value:t.tenantUserForm.username},on:{input:function(e){e.target.composing||t.$set(t.tenantUserForm,"username",e.target.value)}}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"username"}})],1)]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label",attrs:{for:"field-6"}},[t._v("Password")]),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tenantUserForm.password,expression:"tenantUserForm.password"}],staticClass:"form-control",class:{"is-invalid":t.tenantUserForm.errors.has("password")},attrs:{type:"text",readonly:""},domProps:{value:t.tenantUserForm.password},on:{input:function(e){e.target.composing||t.$set(t.tenantUserForm,"password",e.target.value)}}}),t._v(" "),a("has-error",{attrs:{form:t.tenantUserForm,field:"password"}})],1)])])]),t._v(" "),t._m(1)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h4",{staticClass:"modal-title"},[this._v("User Details")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-hidden":"true"}},[this._v("×")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary waves-effect",attrs:{type:"button","data-dismiss":"modal"}},[this._v("Close")]),this._v(" "),e("button",{staticClass:"btn btn-info waves-effect waves-light",attrs:{type:"submit"}},[this._v("Save changes")])])}],!1,null,null,null).exports},data:function(){return{table_data:[],params:[],tenant_id:null}},computed:{getList:function(){return this.table_data}},methods:{fetchTenantUserList:function(){var t=this;axios.get("/tenantuser/fetch_tenant_user_list").then((function(e){t.table_data=e.data;var a=t;setTimeout((function(){$.fn.DataTable.isDataTable("#dt-tenantuser-list")&&$("#dt-tenantuser-list").clear().destroy(),a.table=$("#dt-tenantuser-list").DataTable({destroy:!0,order:[[2,"asc"]],lengthMenu:[5,10,15,20,25],columnDefs:[{targets:[6],orderable:!1,width:"15%",className:"text-center"}],language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}})}),100)}))},addUser:function(){$("div#modal-add-user").modal({backdrop:"static",keyboard:!1,show:!0})},editUser:function(t,e){this.tenant_id=e,$("div#modal-edit-user").modal({backdrop:"static",keyboard:!1,show:!0})},changeStatus:function(t,e,a){var s=this;this.params={id:e,status:a},Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",type:"warning",allowOutsideClick:!1,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, change it!"}).then((function(t){t.value&&axios.put("/tenantuser/update_status",s.params).then((function(t){var e=t.data,a=(t.status,e.message);Swal.fire({type:"success",title:"Success",text:a}).then((function(t){s.fetchTenantUserList()}))}))}))}},mounted:function(){this.fetchTenantUserList()}},p=Object(d.a)(f,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid"},[t._m(0),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("button",{staticClass:"btn btn-primary waves-effect waves-light float-right",on:{click:t.addUser}},[a("i",{staticClass:"fas fa-plus-circle"}),t._v("   Add User\n              ")])])]),t._v(" "),a("hr"),t._v(" "),a("table",{staticClass:"table table-sm table-hover",attrs:{id:"dt-tenantuser-list"}},[t._m(1),t._v(" "),a("tbody",t._l(t.getList,(function(e,s){return a("tr",{key:s},[a("td",[a("img",{staticClass:"rounded-circle",attrs:{src:t.$root.adminAccess+""+e.image,width:"50",height:"50",alt:"User"}})]),t._v(" "),a("td",[t._v(t._s(e.name))]),t._v(" "),a("td",[t._v(t._s(e.username))]),t._v(" "),a("td",[t._v(t._s(e.email))]),t._v(" "),a("td",[t._v(t._s(e.user_type))]),t._v(" "),a("td",[1===e.active?a("span",[t._v("Active")]):a("span",[t._v("Inactive")])]),t._v(" "),a("td",{attrs:{align:"center"}},["inactive"===e.status?a("button",{staticClass:"btn btn-sm btn-light btn-rounded",attrs:{"data-wenk":"Activate User","data-wenk-pos":"left"},on:{click:function(a){return t.changeStatus(s,e.id,1)}}},[a("i",{staticClass:"text-success remixicon-check-fill"})]):a("button",{staticClass:"btn btn-sm btn-light btn-rounded",attrs:{"data-wenk":"Deactivate User","data-wenk-pos":"left"},on:{click:function(a){return t.changeStatus(s,e.id,0)}}},[a("i",{staticClass:"text-danger remixicon-close-fill"})])])])})),0)])])])])]),t._v(" "),a("div",{staticClass:"modal fade",staticStyle:{display:"none"},attrs:{id:"modal-add-user",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[a("add-tenant-user")],1),t._v(" "),a("div",{staticClass:"modal fade",staticStyle:{display:"none"},attrs:{id:"modal-edit-user",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[a("edit-tenant-user",{attrs:{tenantId:t.tenant_id}})],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"page-title-box"},[e("div",{staticClass:"page-title-right"},[e("ol",{staticClass:"breadcrumb m-0"},[e("li",{staticClass:"breadcrumb-item"},[e("a",{attrs:{href:"javascript: void(0);"}},[this._v("Setup")])]),this._v(" "),e("li",{staticClass:"breadcrumb-item active"},[this._v("User List")])])]),this._v(" "),e("h4",{staticClass:"page-title"},[this._v("User List")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("Image")]),t._v(" "),a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Username")]),t._v(" "),a("th",[t._v("Email")]),t._v(" "),a("th",[t._v("Usertype")]),t._v(" "),a("th",[t._v("Status")]),t._v(" "),a("th",[t._v("Actions")])])])}],!1,null,null,null);e.default=p.exports}}]);