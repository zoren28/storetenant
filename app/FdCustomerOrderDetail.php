<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdCustomerOrderDetail extends Model
{
    protected $table = 'fd_customer_order_details';
	protected $primaryKey = 'id';
    protected $guarded=[];
}
