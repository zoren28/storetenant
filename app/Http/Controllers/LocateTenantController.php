<?php

namespace App\Http\Controllers;

use App\LocateTenant;
use Illuminate\Http\Request;

class LocateTenantController extends Controller
{
    public function fetch_tenant_details()
    {
        return LocateTenant::with('businessUnit')
            ->find(auth()->user()->tenant_id);
    }
}
