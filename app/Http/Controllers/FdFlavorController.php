<?php

namespace App\Http\Controllers;

use App\FdFlavor;
use Illuminate\Http\Request;

class FdFlavorController extends Controller
{
    public function __construct()
	{
		$this->middleware('auth');
    }

    public function show()
    {
        return FdFlavor::where('tenant_id', auth()->user()->tenant_id)
                            ->get();
    }

    public function update(Request $request)
    {
        FdFlavor::where('id', $request->id)
                                ->update(['status' => $request->status]);

        return response()->json(['message' => 'Flavor status has been updated.'], 200);
    }

    public function add_flavor(Request $request)
    {
        $data = $request->validate([
            'flavor' => ['required', 'string', 'max:255']
        ]);
        
        FdFlavor::create([
            'tenant_id' => auth()->user()->tenant_id,
            'flavor' => $data['flavor'],
        ]);

        return response()->json(['message' => 'Flavor details has been successfully saved.'], 200);
    }

    public function fetch_flavor_details($id) {

        return FdFlavor::find($id);

    }

    public function update_flavor(Request $request) {

        $data = $request->validate([
            'flavor' => ['required', 'string', 'max:255']
        ]);

        FdFlavor::where('id', $request->id)
                                ->update(['flavor' => $data['flavor']]);

        return response()->json(['message' => 'Flavor details has been updated.'], 200);
    }

    public function fetch_flavors()
    {
        return FdFlavor::where([
                                ['tenant_id', auth()->user()->tenant_id],
                                ['status', true]
                            ])
                            ->get();
    }
}
