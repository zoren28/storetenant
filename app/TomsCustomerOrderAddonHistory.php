<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsCustomerOrderAddonHistory extends Model
{
    protected $guarded = [];

    public function product_details()
    {
        return $this->belongsTo('App\FdProduct', 'addon_id', 'product_id');
    }

    public function unit_measure()
    {
        return $this->belongsTo('App\FdUom', 'uom_id', 'id');
    }
}
