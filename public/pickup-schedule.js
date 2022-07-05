(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"/+is":function(t,e,a){"use strict";a.r(e);var s=a("XuX8"),i=a.n(s),l=a("4HBT"),n=(a("uUT0"),a("hZsf"));a("01VR");i.a.component(l.HasError.name,l.HasError),i.a.component(l.AlertError.name,l.AlertError);var r={name:"EditScheduleComponent",props:["scheduleDetails"],components:{timeStart:n.Datetime,timeEnd:n.Datetime},data:function(){return{scheduleForm:new l.Form({time_start:null,time_end:null,id:null})}},methods:{fetchSchedule:function(t){var e=this;axios.get("/schedule/fetch_pickup_schedule_details/".concat(t)).then((function(t){var a=t.data;e.scheduleForm.fill(a)}))},checkScheduleForm:function(){var t=this;if(null===this.scheduleForm.time_start||null===this.scheduleForm.time_start)Swal.fire({type:"warning",title:"Opps!",text:"Time Start is required"});else if(null===this.scheduleForm.time_end||null===this.scheduleForm.time_end)Swal.fire({type:"warning",title:"Opps!",text:"Time End is required"});else{var e=null;axios.get("/schedule/server_date").then((function(a){e=a.data;var s=new Date(t.scheduleForm.time_start);isNaN(s.getTime())&&(s=new Date(e+" "+t.scheduleForm.time_start));var i=new Date(t.scheduleForm.time_end);isNaN(i.getTime())&&(i=new Date(e+" "+t.scheduleForm.time_end)),s.getTime()>=i.getTime()?Swal.fire({type:"warning",title:"Opps!",text:"Time End must be greater than Time Start"}):axios.put("/schedule/update_pickup_schedule_details",t.scheduleForm).then((function(e){var a=e.data,s=(e.status,a.message);Swal.fire({type:"success",title:"Success",text:s}).then((function(e){t.$parent.fetchPickUpSchedule(),$("div#modal-edit-schedule").modal("hide")}))}))}))}}},watch:{scheduleDetails:function(t){this.fetchSchedule(t)}}},d=a("KHd+"),c=Object(d.a)(r,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-dialog"},[a("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),a("form",{attrs:{method:"post",enctype:"multipart/form-data"},on:{submit:function(e){return e.preventDefault(),t.checkScheduleForm(e)}}},[a("div",{staticClass:"modal-body p-4"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"time_start"}},[t._v("Time Start")]),t._v(" "),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("timeStart",{staticClass:"theme-orange",attrs:{"input-class":"form-control",type:"time",title:"Schedule Time Start","use12-hour":"","value-zone":"Asia/Manila",zone:"Asia/Manila",format:{hour:"numeric",minute:"2-digit"}},model:{value:t.scheduleForm.time_start,callback:function(e){t.$set(t.scheduleForm,"time_start",e)},expression:"scheduleForm.time_start"}}),t._v(" "),a("has-error",{attrs:{form:t.scheduleForm,field:"time_start"}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"time_end"}},[t._v("Time End")]),t._v(" "),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("timeEnd",{staticClass:"theme-orange",attrs:{"input-class":"form-control",type:"time",title:"Schedule Time End","use12-hour":"","value-zone":"Asia/Manila",zone:"Asia/Manila",format:{hour:"numeric",minute:"2-digit"}},model:{value:t.scheduleForm.time_end,callback:function(e){t.$set(t.scheduleForm,"time_end",e)},expression:"scheduleForm.time_end"}}),t._v(" "),a("has-error",{attrs:{form:t.scheduleForm,field:"time_end"}})],1)])])]),t._v(" "),t._m(1)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h4",{staticClass:"modal-title"},[this._v("Serving Time Schedule Details")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-hidden":"true"}},[this._v("×")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary waves-effect",attrs:{type:"button","data-dismiss":"modal"}},[this._v("Close")]),this._v(" "),e("button",{staticClass:"btn btn-info waves-effect waves-light",attrs:{type:"submit"}},[this._v("Save changes")])])}],!1,null,null,null).exports;i.a.component(l.HasError.name,l.HasError),i.a.component(l.AlertError.name,l.AlertError);var o={name:"AddScheduleComponent",components:{timeStart:n.Datetime,timeEnd:n.Datetime},data:function(){return{scheduleForm:new l.Form({time_start:null,time_end:null,id:null})}},methods:{checkScheduleForm:function(){var t=this;if(null===this.scheduleForm.time_start||null===this.scheduleForm.time_start)Swal.fire({type:"warning",title:"Opps!",text:"Time Start is required"});else if(null===this.scheduleForm.time_end||null===this.scheduleForm.time_end)Swal.fire({type:"warning",title:"Opps!",text:"Time End is required"});else{var e=null;axios.get("/schedule/server_date").then((function(a){e=a.data;var s=new Date(t.scheduleForm.time_start);isNaN(s.getTime())&&(s=new Date(e+" "+t.scheduleForm.time_start));var i=new Date(t.scheduleForm.time_end);isNaN(i.getTime())&&(i=new Date(e+" "+t.scheduleForm.time_end)),s.getTime()>=i.getTime()?Swal.fire({type:"warning",title:"Opps!",text:"Time End must be greater than Time Start"}):axios.post("/schedule/add_pickup_schedule_details",t.scheduleForm).then((function(e){var a=e.data,s=(e.status,a.message);Swal.fire({type:"success",title:"Success",text:s}).then((function(e){t.$parent.fetchPickUpSchedule(),$("div#modal-add-schedule").modal("hide")}))}))}))}}}},u={components:{"edit-pickup-schedule":c,"add-pickup-schedule":Object(d.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-dialog"},[a("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),a("form",{attrs:{method:"post",enctype:"multipart/form-data"},on:{submit:function(e){return e.preventDefault(),t.checkScheduleForm(e)}}},[a("div",{staticClass:"modal-body p-4"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"time_start"}},[t._v("Time Start")]),t._v(" "),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("timeStart",{staticClass:"theme-orange",attrs:{"input-class":"form-control",type:"time",title:"Schedule Time Start","use12-hour":"","value-zone":"Asia/Manila",zone:"Asia/Manila",format:{hour:"numeric",minute:"2-digit"}},model:{value:t.scheduleForm.time_start,callback:function(e){t.$set(t.scheduleForm,"time_start",e)},expression:"scheduleForm.time_start"}}),t._v(" "),a("has-error",{attrs:{form:t.scheduleForm,field:"time_start"}})],1),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"time_end"}},[t._v("Time End")]),t._v(" "),a("span",{staticClass:"text-danger"},[t._v("*")]),t._v(" "),a("timeEnd",{staticClass:"theme-orange",attrs:{"input-class":"form-control",type:"time",title:"Schedule Time End","use12-hour":"","value-zone":"Asia/Manila",zone:"Asia/Manila",format:{hour:"numeric",minute:"2-digit"}},model:{value:t.scheduleForm.time_end,callback:function(e){t.$set(t.scheduleForm,"time_end",e)},expression:"scheduleForm.time_end"}}),t._v(" "),a("has-error",{attrs:{form:t.scheduleForm,field:"time_end"}})],1)])])]),t._v(" "),t._m(1)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h4",{staticClass:"modal-title"},[this._v("Serving Time Schedule Details")]),this._v(" "),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-hidden":"true"}},[this._v("×")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-footer"},[e("button",{staticClass:"btn btn-secondary waves-effect",attrs:{type:"button","data-dismiss":"modal"}},[this._v("Close")]),this._v(" "),e("button",{staticClass:"btn btn-info waves-effect waves-light",attrs:{type:"submit"}},[this._v("Save changes")])])}],!1,null,null,null).exports},data:function(){return{table:{},table_data:[],params:{},id:null}},computed:{getList:function(){return this.table_data}},methods:{fetchPickUpSchedule:function(){var t=this;$.fn.DataTable.isDataTable("#dt-pickup-schedule")&&(this.table.destroy(),this.table_data=[]),axios.get("/schedule/fetch_pickup_schedule").then((function(e){t.table_data=e.data;var a=t;setTimeout((function(){a.table=$("#dt-pickup-schedule").DataTable({destroy:!0,order:[[0,"asc"]],columnDefs:[{targets:[0,1],orderable:!1},{targets:[2],orderable:!1,width:"20%",className:"text-center"}],language:{paginate:{previous:"<i class='mdi mdi-chevron-left'>",next:"<i class='mdi mdi-chevron-right'>"}},drawCallback:function(){$(".dataTables_paginate > .pagination").addClass("pagination-rounded")}})}),100)}))},setupSchedule:function(){$("div#modal-add-schedule").modal({backdrop:"static",keyboard:!1,show:!0})},editSchedule:function(t,e){this.id=e,$("div#modal-edit-schedule").modal({backdrop:"static",keyboard:!1,show:!0})},changeStatus:function(t,e,a){var s=this;this.params={id:e,status:a},Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",type:"warning",allowOutsideClick:!1,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, change it!"}).then((function(t){t.value&&axios.put("/schedule/pickup_status",s.params).then((function(t){var e=t.data,a=(t.status,e.message);Swal.fire({type:"success",title:"Success",text:a}).then((function(t){s.fetchPickUpSchedule()}))}))}))}},mounted:function(){this.fetchPickUpSchedule()},filters:{momentTime:function(t){return moment(t).format("h:mm A")}}},m=Object(d.a)(u,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid"},[t._m(0),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("button",{staticClass:"btn btn-primary waves-effect waves-light float-right",attrs:{disabled:t.table_data.length>0},on:{click:t.setupSchedule}},[a("i",{staticClass:"fas fa-wrench"}),t._v(" Setup Schedule")])])]),t._v(" "),a("hr"),t._v(" "),a("table",{staticClass:"table table-sm table-hover",attrs:{id:"dt-pickup-schedule",width:"100%"}},[t._m(1),t._v(" "),t.table_data.length>0?a("tbody",t._l(t.getList,(function(e,s){return a("tr",{key:s},[a("td",[t._v(t._s(t._f("momentTime")("2020-09-16 "+e.time_start)))]),t._v(" "),a("td",[t._v(t._s(t._f("momentTime")("2020-09-16 "+e.time_end)))]),t._v(" "),a("td",[a("button",{staticClass:"btn btn-sm btn-light btn-rounded",attrs:{"data-wenk":"Edit Schedule"},on:{click:function(a){return t.editSchedule(s,e.id)}}},[a("i",{staticClass:"text-primary remixicon-file-edit-line"})]),t._v(" "),0===e.status?a("button",{staticClass:"btn btn-sm btn-light btn-rounded",attrs:{"data-wenk":"Activate Status","data-wenk-pos":"left"},on:{click:function(a){return t.changeStatus(s,e.id,1)}}},[a("i",{staticClass:"text-success remixicon-check-fill"})]):a("button",{staticClass:"btn btn-sm btn-light btn-rounded",attrs:{"data-wenk":"Deactivate Status","data-wenk-pos":"left"},on:{click:function(a){return t.changeStatus(s,e.id,0)}}},[a("i",{staticClass:"text-danger remixicon-close-fill"})])])])})),0):t._e()])])])])]),t._v(" "),a("div",{staticClass:"modal fade",staticStyle:{display:"none"},attrs:{id:"modal-edit-schedule",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[a("edit-pickup-schedule",{attrs:{scheduleDetails:t.id}})],1),t._v(" "),a("div",{staticClass:"modal fade",staticStyle:{display:"none"},attrs:{id:"modal-add-schedule",tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel","aria-hidden":"true"}},[a("add-pickup-schedule")],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"page-title-box"},[e("div",{staticClass:"page-title-right"},[e("ol",{staticClass:"breadcrumb m-0"},[e("li",{staticClass:"breadcrumb-item"},[e("a",{attrs:{href:"javascript: void(0);"}},[this._v("Setup")])]),this._v(" "),e("li",{staticClass:"breadcrumb-item active"},[this._v("Serving Time Schedule")])])]),this._v(" "),e("h4",{staticClass:"page-title"},[this._v("Serving Time Schedule")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("Time Start")]),this._v(" "),e("th",[this._v("Time End")]),this._v(" "),e("th",[this._v("Actions")])])])}],!1,null,null,null);e.default=m.exports}}]);