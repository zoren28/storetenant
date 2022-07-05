<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdProductCategory extends Model
{
    protected $table = 'fd_product_categories';
    protected $primaryKey = 'id';
    protected $guarded=[];

    public function product()
    {
        return $this->belongsTo('App\FdProduct', 'product_id', 'product_id');
    }

    public function category()
    {
        return $this->belongsTo('App\FdCategory', 'category_id', 'category_id');
    }
}
