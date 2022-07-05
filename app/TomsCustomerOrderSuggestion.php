<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsCustomerOrderSuggestion extends Model
{
    protected $guarded = [];

    public function item_suggested()
    {
        return $this->belongsTo('App\FdProductSuggestion', 'product_suggestion_id', 'id');
    }

    public function suggestion()
    {
        return $this->belongsTo('App\FdSuggestion', 'suggestion_id', 'id');
    }
}
