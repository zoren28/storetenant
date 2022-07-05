<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdProductPriceHistory extends Model
{
    protected $fillable = [
        'product_id','uom_id','price','previous_price'
    ];
}
