<?php

namespace App\Http\Controllers;

use App\FdUom;
use Illuminate\Http\Request;

class TblUnitMeasureController extends Controller
{
    public function __construct()
	{
		$this->middleware('auth');
    }
    
    public function fetch_unit_measures()
    {
        return FdUom::where([
                            ['tenant_id', auth()->user()->tenant_id],
                            ['status', true]
                        ])->get();
    }
}
