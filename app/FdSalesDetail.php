<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdSalesDetail extends Model
{
    protected $guarded = [];

    public function ticket()
    {
        return $this->belongsTo('App\Ticket', 'ticket_id');
    }

    public function tenant()
    {
        return $this->belongsTo('App\LocateTenant', 'tenant_id');
    }
}
