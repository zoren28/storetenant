<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerNumber extends Model
{
    protected $table = 'customer_numbers';
	protected $primaryKey = 'id';
    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo('App\TomsCustomerDetail', 'customer_id', 'id');
    }
}
