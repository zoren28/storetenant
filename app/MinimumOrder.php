<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MinimumOrder extends Model
{
    protected $table = 'tbl_min_orders';
	protected $primaryKey = 'id';
    protected $guarded=[];

    public function tenant()
    {
        return $this->belongsTo('App\LocateTenant', 'tenant_id', 'tenant_id');
    }
}
