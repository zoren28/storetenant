<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdProduct extends Model
{
    protected $table = 'fd_products';
    protected $primaryKey = 'product_id';
    protected $guarded = [];

    public function categories()
    {
        return $this->hasMany('App\FdProductCategory', 'product_id', 'product_id')
            ->join('fd_categories as db', 'db.category_id', 'fd_product_categories.category_id')
            ->select('product_id', 'fd_product_categories.category_id', 'db.category');
    }

    public function item_package()
    {
        return $this->hasMany('App\FdItemPackage', 'product_id', 'product_id')
            ->select('product_id', 'id', 'sub_product_id', 'quantity');
    }

    public function packages()
    {
        return $this->hasMany('App\FdItemPackage', 'product_id', 'product_id')->with(['product_packages']);
    }

    public function tenant()
    {
        return $this->belongsTo('App\LocateTenant', 'tenant_id', 'tenant_id');
    }

    public function uoms()
    {
        return $this->hasMany('App\FdUom', 'id', 'uom_id')
            ->where('fd_uoms.tenant_id', auth()->user()->tenant_id);
    }

    public function product_categories()
    {
        return $this->hasMany('App\FdProductCategory', 'product_id', 'product_id');
    }

    public function product_price()
    {
        return $this->hasMany('App\FdProductPrice', 'product_id', 'product_id');
    }

    public function prices()
    {
        return $this->hasMany('App\FdProductPrice', 'product_id', 'product_id');
    }

    public function addon_suggestion()
    {
        return $this->hasMany('App\FdAddonSuggestion', 'product_id', 'product_id');
    }

    public function product_choice()
    {
        return $this->hasMany('App\FdProductChoice', 'product_id', 'product_id');
    }

    public function product_addon()
    {
        return $this->hasMany('App\FdProductAddon', 'product_id', 'product_id');
    }

    public function unit_measurement()
    {
        return $this->belongsTo('App\FdUom', 'uom_id');
    }
}
