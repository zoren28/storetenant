<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    protected $table = 'barangays';
	protected $primaryKey = 'brgy_id';
	public $timestamps = false;

	public function town()
	{
		return $this->belongsTo('App\Town', 'town_id', 'town_id')->join('province', 'province.prov_id', 'towns.prov_id');
	}

	public function townn()
	{
		return $this->belongsTo('App\Town', 'town_id', 'town_id');
	}
}
