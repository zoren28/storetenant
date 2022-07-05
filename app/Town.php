<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Town extends Model
{
	protected $table = 'towns';
	protected $primaryKey = 'town_id';
	public $timestamps = false;

	public function barangay()
	{
		return $this->hasMany('App\Barangay', 'town_id', 'town_id');
	}
	public function province()
	{
		return $this->belongsTo('App\Province', 'prov_id', 'prov_id');
	}

	public function delivery_charge()
	{
		return $this->hasMany('App\DeliveryCharge', 'town_id')
			->where('vtype', 1);
	}
}
