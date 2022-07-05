<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TomsCustomerOrderFlavor extends Model
{
    protected $table = 'toms_customer_order_flavors';
	protected $primaryKey = 'id';

    protected $guarded=[];

    public function flavor_choice()
    {
        return $this->belongsTo('App\FdFlavor', 'flavor_id', 'id');
    }
}
