<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocateTenant extends Model
{
    protected $table = 'locate_tenants';
    protected $primaryKey = 'tenant_id';

    protected $guarded = [];

    public function businessUnit()
    {
        return $this->belongsTo('App\BusinessUnit', 'bunit_code', 'bunit_code');
    }

    public function minimum_order()
    {
        return $this->hasOne('App\MinimumOrder', 'tenant_id', 'tenant_id');
    }

    public function time_setup()
    {
        return $this->belongsTo('App\BuTimeSetup', 'bunit_code', 'bunit_code')
            ->where('status', true);
    }
}
