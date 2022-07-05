<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsCustomerDetail extends Model
{
    protected $table = 'toms_customer_details';
	protected $primaryKey = 'id';

    protected $guarded=[];

    public function orders()
    {
        return $this->hasMany('App\TomsCustomerOrder', 'customer_id', 'id');
    }

    public function address()
    {
        return $this->hasMany('App\CustomerAddress', 'customer_id');
    }

    public function customernumber()
    {
        return $this->hasMany('App\CustomerNumber', 'customer_id');
    }

    public function customerphones()
    {
        return $this->hasMany('App\CustomerPhone', 'customer_id');
    }

    public function bills()
    {
        return $this->hasMany('App\CustomerBill', 'customer_id');
    }
}
