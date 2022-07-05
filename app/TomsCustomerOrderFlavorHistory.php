<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsCustomerOrderFlavorHistory extends Model
{
    protected $guarded = [];

    public function flavor_choice()
    {
        return $this->belongsTo('App\FdFlavor', 'flavor_id', 'id');
    }
}
