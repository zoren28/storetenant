<?php

namespace App\Http\Controllers;

use App\FdContainerType;
use Illuminate\Http\Request;

class FdContainerTypeController extends Controller
{
    public function __construct()
	{
		$this->middleware('auth');
    }

    public function show()
    {
        return FdContainerType::where('tenant_id', auth()->user()->tenant_id)
                                ->get();
    }

    public function add_container_type(Request $request)
    {
        $data = $request->validate([
            'container_type' => ['required', 'string', 'max:255']
        ]);
        
        FdContainerType::create([
            'tenant_id' => auth()->user()->tenant_id,
            'container_type' => $data['container_type']
        ]);

        return response()->json(['message' => 'Container Type details has been successfully saved.'], 200);
    }

    public function update(Request $request)
    {
        FdContainerType::where('id', $request->id)
                                ->update(['status' => $request->status]);

        return response()->json(['message' => 'Container status has been updated.'], 200);
    }

    public function fetch_container_type_details($id)
    {
        return FdContainerType::where('id', $id)
                        ->first();
    }

    public function update_container_type(Request $request)
    {
        $data = $request->validate([
            'container_type' => ['required', 'string', 'max:255']
        ]);

        FdContainerType::where('id', $request->id)
                                ->update([
                                    'container_type' => $data['container_type']
                                ]);

        return response()->json(['message' => 'Container Type details has been updated.'], 200);
    }

    public function fetch_active_container_type() {

        return FdContainerType::where([
                                    ['tenant_id', auth()->user()->tenant_id],
                                    ['status', true]
                                ])
                                ->get();
    }
}
