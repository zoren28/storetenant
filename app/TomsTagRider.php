<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsTagRider extends Model
{
    protected $table = 'toms_tag_riders';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function ticket()
    {
        return $this->belongsTo('App\Ticket', 'ticket_id');
    }
}
