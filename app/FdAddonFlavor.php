<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdAddonFlavor extends Model
{
    protected $guarded = [];

    public function flavor_details()
    {
        return $this->belongsTo('App\FdFlavor', 'flavor_id', 'id');
    }
}
