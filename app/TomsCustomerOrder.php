<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class TomsCustomerOrder extends Model
{
    protected $table = 'toms_customer_orders';
    protected $primaryKey = 'id';

    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo('App\TomsCustomerDetail', 'customer_id', 'id')
            ->select(
                'id',
                DB::raw("CONCAT(lastname, ', ', firstname) AS name")
            );
    }

    public function customer_delivery_info()
    {
        return $this->belongsTo('App\CustomerDeliveryInfo', 'ticket_id', 'ticket_id');
    }

    public function customer_bill()
    {
        return $this->belongsTo('App\CustomerBill', 'ticket_id', 'ticket_id');
    }

    public function ticket()
    {
        return $this->belongsTo('App\Ticket', 'ticket_id', 'id');
    }

    public function customer_detail()
    {
        return $this->belongsTo('App\TomsCustomerDetail', 'customer_id', 'id');
    }

    public function rider_detail()
    {
        return $this->belongsTo('App\TomsRiderData', 'rider_id', 'id');
    }

    public function praduct()
    {
        return $this->belongsTo('App\FdProduct', 'product_id', 'product_id');
    }

    public function barangay()
    {
        return $this->belongsTo('App\Barangay', 'barangay_id', 'brgy_id');
    }

    public function tags()
    {
        return $this->hasMany('App\TomsTagRider', 'ticket_id', 'ticket_id')
            ->where('toms_tag_riders.tenant_id', auth()->user()->tenant_id);
    }

    public function customer_order_detail()
    {
        return $this->belongsTo('App\FdCustomerOrderDetail', 'ticket_id', 'ticket_id')
            ->where('fd_customer_order_details.tenant_id', auth()->user()->tenant_id);
    }

    public function locate_tenant()
    {
        return $this->belongsTo('App\LocateTenant', 'tenant_id', 'tenant_id');
    }

    public function pickup_schedule()
    {
        return $this->belongsTo('App\PickUpSchedule', 'tenant_id', 'tenant_id');
    }

    public function tag_riders()
    {
        return $this->hasMany('App\PartialTagRider', 'ticket_id', 'ticket_id')
            ->orderby('main_rider_stat', 'DESC');
    }

    public function rider()
    {
        return $this->belongsTo('App\TomsRiderData', 'rider_id', 'id')
            ->select(
                'id',
                DB::raw("CONCAT(r_lastname, ', ', r_firstname) AS name")
            );
    }

    public function remittance_detail()
    {
        return $this->belongsTo('App\FdRemittanceDetail', 'ticket_id', 'ticket_id')
            ->where('fd_remittance_details.tenant_id', auth()->user()->tenant_id);
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

    public function products()
    {
        return $this->belongsTo('App\FdProduct', 'product_id', 'product_id');
    }

    public function unit_measure()
    {
        return $this->belongsTo('App\FdUom', 'uom_id', 'id');
    }

    public function product_prices()
    {
        return $this->hasMany('App\FdProductPrice', 'product_id', 'product_id');
    }

    public function product_suggestion()
    {
        return $this->hasMany('App\TomsCustomerOrderSuggestion', 'order_id', 'id');
    }

    public function product_choices()
    {
        return $this->hasMany('App\TomsCustomerOrderChoice', 'order_id', 'id');
    }

    public function product_addons()
    {
        return $this->hasMany('App\TomsCustomerOrderAddon', 'order_id', 'id');
    }

    public function customer_tender()
    {
        return $this->belongsTo('App\CustomerBill', 'ticket_id', 'ticket_id');
    }

    public function addon_suggestion()
    {
        return $this->hasMany('App\FdAddonSuggestion', 'product_id', 'product_id');
    }

    public function product_choice()
    {
        return $this->hasMany('App\FdProductChoice', 'product_id', 'product_id');
    }

    public function product_addon()
    {
        return $this->hasMany('App\FdProductAddon', 'product_id', 'product_id');
    }

    public function discount()
    {
        return $this->hasMany('App\CustomerDiscount', 'ticket_id', 'ticket_id');
    }

    public function customer_discount()
    {
        return $this->hasMany('App\CustomerDiscountStatus', 'ticket_id', 'ticket_id')
            ->where('tenant_id', auth()->user()->tenant_id);
    }

    public function customer_discounted_amt()
    {
        return $this->hasMany('App\CustomerDiscountedAmount', 'ticket_id', 'ticket_id')
            ->where('tenant_id', auth()->user()->tenant_id);
    }

    public function uom()
    {
        return $this->belongsTo('App\FdUom', 'uom_id', 'id');
    }

    public function vehicle_suggestion()
    {
        return $this->belongsTo('App\FdVtypeSuggestion', 'ticket_id', 'ticket_id')
            ->where('tenant_id', auth()->user()->tenant_id);
    }
}
