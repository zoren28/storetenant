<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdVtypeSuggestion extends Model
{
    protected $table = 'fd_vtype_suggestions';
    protected $primaryKey = 'id';

    public function vehicle()
    {
        return $this->belongsTo('App\Gc_Transportation', 'transpo_id', 'id');
    }
}
