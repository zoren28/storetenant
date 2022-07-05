<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsRiderData extends Model
{
    protected $table = 'toms_riders_data';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function vehicle()
    {
        return $this->belongsTo('App\Gc_Transportation', 'vehicle_type', 'id');
    }
}
