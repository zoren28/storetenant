<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsCustomerOrderChoiceHistory extends Model
{
    protected $guarded = [];

    public function product_details()
    {
        return $this->belongsTo('App\FdProduct', 'choice_id', 'product_id');
    }

    public function unit_measure()
    {
        return $this->belongsTo('App\FdUom', 'uom_id', 'id');
    }
}
