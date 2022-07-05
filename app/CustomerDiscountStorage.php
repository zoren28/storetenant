<?php

namespace App;

use App\TenantUser;
use Illuminate\Database\Eloquent\Model;

class CustomerDiscountStorage extends Model
{
    protected $table = 'customer_discount_storages';
    protected $primaryKey = 'id';

    public function global_discount_setup()
    {
        $access = TenantUser::select('global_cat_id as category_id')
            ->join('locate_tenants', 'tenant_users.tenant_id', '=', 'locate_tenants.tenant_id')
            ->where('tenant_users.id', auth()->user()->id)
            ->get();

        return $this->hasMany('App\GlobalDiscountSetup', 'discount_id', 'discount_id')
            ->where('global_cat_id', $access->first()->category_id);
    }
}
