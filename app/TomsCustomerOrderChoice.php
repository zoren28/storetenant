<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsCustomerOrderChoice extends Model
{
    protected $table = 'toms_customer_order_choices';
    protected $primaryKey = 'id';

    protected $guarded = [];

    public function product_details()
    {
        return $this->belongsTo('App\FdProduct', 'choice_id', 'product_id');
    }

    public function unit_measure()
    {
        return $this->belongsTo('App\FdUom', 'uom_id', 'id');
    }

    public function subFoodProducts()
    {
        return $this->belongsTo('App\FdProduct', 'choice_id', 'product_id');
    }

    public function uom()
    {
        return $this->belongsTo('App\FdUom', 'uom_id', 'id');
    }
}
