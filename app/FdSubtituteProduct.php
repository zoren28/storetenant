<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdSubtituteProduct extends Model
{
    protected $table = 'fd_subtitute_products';
	protected $primaryKey = 'id';
    protected $guarded=[];
    
    public function substitute_product() {
        return $this->belongsTo('App\FdProduct','sub_product_id','product_id');
    }
}
