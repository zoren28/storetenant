<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdProductPrice extends Model
{
    protected $guarded = [];

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

    public function availability()
    {
        return $this->hasMany('App\FdProductPrice', 'product_id', 'choice_id');
    }
}
