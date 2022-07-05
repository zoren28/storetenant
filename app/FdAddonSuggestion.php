<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdAddonSuggestion extends Model
{
    protected $guarded = [];

    public function product_suggestion()
    {
        return $this->belongsTo('App\FdProductSuggestion', 'product_suggestion_id', 'id');
    }

    public function availability()
    {
        return $this->hasMany('App\FdProductPrice', 'product_id', 'product_id');
    }
}
