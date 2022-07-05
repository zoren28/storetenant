<?php

namespace App\Http\Controllers;

use App\FdSauceType;
use Illuminate\Http\Request;

class FdSauceTypeController extends Controller
{
    public function __construct()
	{
		$this->middleware('auth');
    }
    
    public function show()
    {
        return FdSauceType::where([
                                    ['tenant_id', auth()->user()->tenant_id],
                                    ['status', true]
                                ])
                                ->get();
    }
}
