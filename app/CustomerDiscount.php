<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerDiscount extends Model
{
    protected $table = 'customer_discounts';
    protected $primaryKey = 'id';

    protected $guarded = [];

    public function customer_discount_status()
    {
        return $this->belongsTo('App\CustomerDiscountStatus', 'id', 'customer_discount_id')
            ->where('tenant_id', auth()->user()->tenant_id);
    }

    public function discount_storage()
    {
        return $this->belongsTo('App\CustomerDiscountStorage', 'customer_discount_storage_id', 'id');
    }
}
