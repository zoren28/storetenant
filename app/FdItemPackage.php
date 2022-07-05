<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdItemPackage extends Model
{
    protected $table = 'fd_item_packages';
	protected $primaryKey = 'id';
    protected $guarded=[];

    public function product() {
        return $this->belongsTo('App\FdProduct','product_id','product_id');
    }

    public function product_packages() {
        return $this->belongsTo('App\FdProduct','sub_product_id','product_id');
    }

    public function subtituteproduct_packages() {
        return $this->hasMany('App\FdSubtituteProduct','sub_product_id','product_id');
    }
}
