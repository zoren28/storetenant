<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CustomerBill extends Model
{
    protected $table = 'customer_bills';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo('App\TomsCustomerDetail');
    }

    public function grand_total()
    {
        return $this->hasMany('App\TomsCustomerOrder', 'ticket_id', 'ticket_id')
            ->where([
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.status', true]
            ]);
    }
    public function discounted_amount()
    {
        return $this->hasMany('App\CustomerDiscountedAmount', 'ticket_id', 'ticket_id');
    }
}
