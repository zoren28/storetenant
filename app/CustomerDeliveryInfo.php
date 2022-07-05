<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerDeliveryInfo extends Model
{
    public function barangay()
    {
        return $this->belongsTo('App\Barangay', 'barangay_id', 'brgy_id');
    }
}
