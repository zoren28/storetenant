<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Serving Time Schedule Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <form @submit.prevent="checkScheduleForm" method="post" enctype="multipart/form-data">
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="time_start">Time Start</label> <span class="text-danger">*</span>
                                <timeStart
                                    v-model="scheduleForm.time_start"
                                    input-class="form-control"
                                    class="theme-orange"
                                    type="time"
                                    title="Schedule Time Start"
                                    use12-hour
                                    value-zone="Asia/Manila"
                                    zone="Asia/Manila"
                                    :format="{ hour: 'numeric', minute: '2-digit' }"
                                >
                                </timeStart>
                                <has-error :form="scheduleForm" field="time_start"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="time_end">Time End</label> <span class="text-danger">*</span>
                                <timeEnd
                                    v-model="scheduleForm.time_end"
                                    input-class="form-control"
                                    class="theme-orange"
                                    type="time"
                                    title="Schedule Time End"
                                    use12-hour
                                    value-zone="Asia/Manila"
                                    zone="Asia/Manila"
                                    :format="{ hour: 'numeric', minute: '2-digit' }"
                                >
                                </timeEnd>
                                <has-error :form="scheduleForm" field="time_end"></has-error>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Form, HasError, AlertError } from "vform";
import { serialize } from 'object-to-formdata';
import { Datetime } from 'vue-datetime';
import { DateTime } from 'luxon';
import 'vue-datetime/dist/vue-datetime.css';

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
export default {
    name : 'AddScheduleComponent',
    components : {
        timeStart: Datetime,
        timeEnd: Datetime,
    },
    data() {
        return {
            scheduleForm : new Form({
                time_start : null,
                time_end : null,
                id : null
            }),
        }
    },
    methods: {
        checkScheduleForm() {

            if (this.scheduleForm.time_start === null || this.scheduleForm.time_start === null) {
                
                Swal.fire({
                    type: 'warning',
                    title: 'Opps!',
                    text: 'Time Start is required'
                });
            } else if (this.scheduleForm.time_end === null || this.scheduleForm.time_end === null) {
                
                Swal.fire({
                    type: 'warning',
                    title: 'Opps!',
                    text: 'Time End is required'
                });
            } else {

                var dateToday = null;
                axios.get('/schedule/server_date').then((response) => {
                    
                    dateToday = response.data;
                    var time_start = new Date(this.scheduleForm.time_start);
                    if( isNaN(time_start.getTime()) ) {

                        time_start = new Date(dateToday+' '+this.scheduleForm.time_start);
                    }

                    var time_end = new Date(this.scheduleForm.time_end);
                    if( isNaN(time_end.getTime()) ) {

                        time_end = new Date(dateToday+' '+this.scheduleForm.time_end);
                    }

                    if (time_start.getTime() >= time_end.getTime()) {
                        
                        Swal.fire({
                            type: 'warning',
                            title: 'Opps!',
                            text: 'Time End must be greater than Time Start'
                        });

                        return;
                    }

                    axios.post('/schedule/add_pickup_schedule_details', this.scheduleForm).then(({ data, status }) => {
                        
                        const { message } = data;

                        Swal.fire({
                            type: 'success',
                            title: 'Success',
                            text: message
                        }).then((result) => {

                            this.$parent.fetchPickUpSchedule();
                            $("div#modal-add-schedule").modal('hide');
                        });
                    });
                });
            }
        }
    }
}
</script>