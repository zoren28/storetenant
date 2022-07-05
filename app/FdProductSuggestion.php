<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdProductSuggestion extends Model
{
    protected $guarded = [];

    public function suggestion()
    {
        return $this->belongsTo('App\FdSuggestion', 'suggestion_id', 'id');
    }

    public function addonSuggestion()
    {
        return $this->hasOne('App\FdAddonSuggestion', 'product_suggestion_id');
    }
}
