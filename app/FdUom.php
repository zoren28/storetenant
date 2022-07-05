<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdUom extends Model
{
    protected $fillable = [
        'tenant_id','unit_measure','abbreviate'
    ];
}
