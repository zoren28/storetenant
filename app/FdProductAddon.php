<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdProductAddon extends Model
{
    protected $guarded = [];

    public function product_details()
    {
        return $this->belongsTo('App\FdProduct', 'product_id', 'product_id');
    }

    public function subFoodProducts()
    {
        return $this->belongsTo('App\FdProduct', 'addon_id', 'product_id');
    }

    public function uom()
    {
        return $this->belongsTo('App\FdUom', 'uom_id', 'id');
    }

    public function availability()
    {
        return $this->hasMany('App\FdProductPrice', 'product_id', 'addon_id');
    }
}
