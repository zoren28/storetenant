<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerAddress extends Model
{
    protected $table = 'customer_addresses';
    protected $primaryKey = 'id';

    protected $guarded = [];

    public function customer()
    {
        return $this->hasMany('App\TomsCustomerDetails', 'customer_id', 'id');
    }

    public function town()
    {
        return $this->belongsTo('App\Town', 'town_id', 'town_id')->join('province', 'province.prov_id', 'towns.prov_id');
    }

    public function barangay()
    {
        return $this->belongsTo('App\Barangay', 'barangay_id', 'brgy_id')->join('towns', 'towns.town_id', 'barangays.town_id')->join('province', 'province.prov_id', 'towns.prov_id');
    }

    public function townn()
    {
        return $this->belongsTo('App\Town', 'town_id', 'town_id');
    }

    public function barangayy()
    {
        return $this->belongsTo('App\Barangay', 'barangay_id', 'brgy_id');
    }

    public function location()
    {
        return $this->belongsTo('App\Barangay', 'barangay_id', 'brgy_id')->join('towns', 'towns.town_id', 'barangays.town_id');
    }
}
