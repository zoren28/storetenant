<?php

namespace App\Http\Controllers;

use App\PickUpSchedule;
use Illuminate\Http\Request;

class PickUpScheduleController extends Controller
{
    public function __construct()
	{
		$this->middleware('auth');
    }

    public function show()
    {
        return PickUpSchedule::where('tenant_id', auth()->user()->tenant_id)
                        ->get();
    }

    public function update(Request $request)
    {
        PickUpSchedule::where('id', $request->id)
                                ->update(['status' => $request->status]);

        return response()->json(['message' => 'Pick up schedule status has been updated.'], 200);
    }

    public function fetch_pickup_schedule_details($id)
    {
        return PickUpSchedule::where('id', $id)
                                ->first();
    }

    public function update_pickup_schedule_details(Request $request) {

        PickUpSchedule::where('id', $request->id)
                                ->update([
                                    'time_start' => date('H:i:s', strtotime($request->time_start)),
                                    'time_end' => date('H:i:s', strtotime($request->time_end))
                                ]);

        return response()->json(['message' => 'Pick up schedule details has been updated.'], 200);
    }

    public function server_date()
    {
        return response()->json(date('Y-m-d'));
    }

    public function add_pickup_schedule_details(Request $request)
    {
        PickUpSchedule::create([
            'tenant_id' => auth()->user()->tenant_id,
            'time_start' => date('H:i:s', strtotime($request->time_start)),
            'time_end' => date('H:i:s', strtotime($request->time_end))
        ]);

        return response()->json(['message' => 'Pick up schedule details has been successfully saved.'], 200);
    }
}
