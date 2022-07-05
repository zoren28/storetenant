<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Ticket extends Model
{
    protected $table = 'tickets';
    protected $primaryKey = 'id';

    public function app_user()
    {
        return $this->belongsTo('App\AppUser', 'customer_id', 'customer_id');
    }

    public function customer()
    {
        return $this->belongsTo('App\TomsCustomerDetail', 'customer_id', 'id');
    }

    public function recipient()
    {
        return $this->belongsTo('App\TomsCustomerDetail', 'customer_id', 'id')
            ->select(
                'id',
                DB::raw("CONCAT(lastname, ', ', firstname) AS name")
            );
    }

    public function recipient_address()
    {
        return $this->belongsTo('App\CustomerAddress', 'customer_id', 'customer_id')
            ->where('customer_addresses.shipping', true);
    }

    public function recipient_numbers()
    {
        return $this->hasMany('App\CustomerNumber', 'customer_id', 'customer_id');
    }

    public function recipient_phones()
    {
        return $this->belongsTo('App\CustomerPhone', 'customer_id', 'customer_id')
            ->where('customer_phones.in_use', true);
    }
}
