<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GcVtypeSuggestion extends Model
{
    protected $table = 'gc_vtype_suggestions';
    protected $primaryKey = 'id';

    public function vehicle()
    {
        return $this->belongsTo('App\Gc_Transportation', 'transpo_id', 'id');
    }
}
