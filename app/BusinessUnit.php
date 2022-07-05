<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BusinessUnit extends Model
{
    protected $table = 'locate_business_units';
    protected $primaryKey = 'bunit_code';
    protected $guarded=[];

    public function minimumOrder()
    {
        return $this->hasOne('App\MinimumOrder', 'bunit_code', 'bunit_code');
    }
}
