<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DeliveryCharge extends Model
{
    protected $table = 'tbl_delivery_charges';
    protected $primaryKey = 'id';

    public function town()
    {
        return $this->belongsTo('App\Town', 'town_id');
    }

    public function vehicle_type()
    {
        return $this->belongsTo('App\Gc_Transportation', 'vtype', 'id');
    }
}
