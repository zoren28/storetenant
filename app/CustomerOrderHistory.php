<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerOrderHistory extends Model
{
    protected $guarded = [];

    public function barangay()
    {
        return $this->belongsTo('App\Barangay', 'barangay_id', 'brgy_id');
    }

    public function praduct()
    {
        return $this->belongsTo('App\FdProduct', 'product_id', 'product_id');
    }

    public function customer_delivery_info()
    {
        return $this->belongsTo('App\CustomerDeliveryInfo', 'ticket_id', 'ticket_id');
    }

    public function order_remarks()
    {
        return $this->belongsTo('App\OrderRemark', 'ticket_id', 'ticket_id')
            ->where('order_remarks.tenant_id', auth()->user()->tenant_id);
    }

    public function customer_order_remarks()
    {
        return $this->belongsTo('App\CustomerOrderRemark', 'ticket_id', 'ticket_id')
            ->where('customer_special_instructions.tenant_id', auth()->user()->tenant_id);
    }

    public function customer_tender()
    {
        return $this->belongsTo('App\CustomerBill', 'ticket_id', 'ticket_id');
    }

    public function ticket()
    {
        return $this->belongsTo('App\Ticket', 'ticket_id', 'id');
    }

    public function unit_measure()
    {
        return $this->belongsTo('App\FdUom', 'uom_id', 'id');
    }

    public function product_suggestion()
    {
        return $this->hasMany('App\TomsCustomerOrderSuggestion', 'order_id', 'order_id');
    }

    public function product_choices()
    {
        return $this->hasMany('App\TomsCustomerOrderChoice', 'order_id', 'order_id');
    }

    public function product_addons()
    {
        return $this->hasMany('App\TomsCustomerOrderAddon', 'order_id', 'order_id');
    }

    public function customer_discounted_amt()
    {
        return $this->hasMany('App\CustomerDiscountedAmount', 'ticket_id', 'ticket_id')
            ->where('tenant_id', auth()->user()->tenant_id);
    }

    public function customer_order_detail()
    {
        return $this->belongsTo('App\FdCustomerOrderDetail', 'ticket_id', 'ticket_id')
            ->where('fd_customer_order_details.tenant_id', auth()->user()->tenant_id);
    }
}
