<?php

namespace App\Http\Controllers;

use App\FdUom;
use Illuminate\Http\Request;

class FdUomController extends Controller
{
    public function __construct()
	{
		$this->middleware('auth');
    }

    public function show()
    {
        return FdUom::where('tenant_id', auth()->user()->tenant_id)
                        ->get();
    }

    public function add_unit_measure(Request $request)
    {
        $data = $request->validate([
            'unit_measure' => ['required', 'string', 'max:255']
        ]);
        
        FdUom::create([
            'tenant_id' => auth()->user()->tenant_id,
            'unit_measure' => $data['unit_measure'],
            'abbreviate' => $request->abbreviate
        ]);

        return response()->json(['message' => 'Unit of Measurement details has been successfully saved.'], 200);
    }

    public function update(Request $request)
    {
        FdUom::where('id', $request->id)
                                ->update(['status' => $request->status]);

        return response()->json(['message' => 'Unit of Measurement status has been updated.'], 200);
    }

    public function fetch_unit_measure_details($id)
    {
        return FdUom::where('id', $id)
                        ->first();
    }

    public function update_unit_measure(Request $request)
    {
        $data = $request->validate([
            'unit_measure' => ['required', 'string', 'max:255']
        ]);

        FdUom::where('id', $request->id)
                                ->update([
                                    'unit_measure' => $data['unit_measure'],
                                    'abbreviate' => $request->abbreviate
                                ]);

        return response()->json(['message' => 'Unit of Measurement details has been updated.'], 200);
    }

    public function fetch_unit_measures()
    {
        return FdUom::where([
                            ['tenant_id', auth()->user()->tenant_id],
                            ['status', true]
                        ])
                        ->get();
    }
}
