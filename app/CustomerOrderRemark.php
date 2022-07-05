<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerOrderRemark extends Model
{
    use SoftDeletes;
    protected $table = "customer_special_instructions";
}
