<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppUser extends Model
{
    protected $table = 'app_users';
    protected $primaryKey = 'id';

    public function barangay()
    {
        return $this->belongsTo('App\Barangay', 'brgy_id', 'brgy_id')->join('towns', 'towns.town_id', 'barangays.town_id')->join('province', 'province.prov_id', 'towns.prov_id');
    }
}
