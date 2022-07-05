<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerPhone extends Model
{
    protected $table = 'customer_phones';
	protected $primaryKey = 'id';
    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo('App\TomsCustomerDetail', 'customer_id', 'id');
    }
}
