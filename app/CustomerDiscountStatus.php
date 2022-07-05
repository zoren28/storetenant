<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerDiscountStatus extends Model
{
    protected $table = 'customer_discount_statuses';
    protected $primaryKey = 'id';

    protected $guarded = [];

    public function customer_discount()
    {
        return $this->belongsTo('App\CustomerDiscount', 'customer_discount_id', 'id');
    }

    public function discount_list()
    {
        return $this->belongsTo('App\DiscountList', 'discount_id', 'id');
    }
}
