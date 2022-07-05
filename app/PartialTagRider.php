<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PartialTagRider extends Model
{
    protected $table = 'partial_tag_riders';
    protected $primaryKey = 'id';
    protected $guarded=[];

    public function rider_detail()
    {
        return $this->belongsTo('App\TomsRiderData', 'rider_id', 'id');
    }
}
