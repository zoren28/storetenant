<?php

namespace App\Http\Controllers;

use App\FdCookingWay;
use Illuminate\Http\Request;

class FdCookingWayController extends Controller
{
    public function __construct()
	{
		$this->middleware('auth');
    }
    
    public function show()
    {
        return FdCookingWay::where([
                                    ['tenant_id', auth()->user()->tenant_id],
                                    ['status', true]
                                ])
                                ->get();
    }

    public function fetch_cooking_ways()
    {
        return FdCookingWay::where('tenant_id', auth()->user()->tenant_id)
                            ->get();
    }

    public function update(Request $request)
    {
        FdCookingWay::where('id', $request->id)
                                ->update(['status' => $request->status]);

        return response()->json(['message' => 'Status has been updated.'], 200);
    }

    public function fetch_cooking_details($id)
    {
        return FdCookingWay::find($id);
    }

    public function update_cooking_way(Request $request)
    {
        $data = $request->validate([
            'cooking_way' => ['required', 'string', 'max:255']
        ]);

        FdCookingWay::where('id', $request->id)
                                ->update(['cooking_way' => $data['cooking_way']]);

        return response()->json(['message' => 'Details has been updated.'], 200);
    }

    public function add_cooking(Request $request)
    {
        $data = $request->validate([
            'cooking_way' => ['required', 'string', 'max:255']
        ]);
        
        FdCookingWay::create([
            'tenant_id' => auth()->user()->tenant_id,
            'cooking_way' => $data['cooking_way'],
        ]);

        return response()->json(['message' => 'Type of cooking ways has been successfully saved.'], 200);
    }
}
