<?php

namespace App\Http\Controllers;

use App\Gc_Transportation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GcTransportationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show()
    {
        return Gc_Transportation::where('status', true)->get();
    }

    public function count_rider($id)
    {
        $list = Gc_Transportation::where('status', true)->get();
        $data = array();
        foreach ($list as $v) {

            $count = DB::table('partial_tag_riders')
                ->join('toms_riders_data', 'partial_tag_riders.rider_id', '=', 'toms_riders_data.id')
                ->select(DB::raw('count(*) as rider_count'))
                ->where([
                    ['ticket_id', $id],
                    ['vehicle_type', $v->id]
                ])
                ->get();
            $data[] = [
                'vehicle' => $v,
                'count' => $count[0]->rider_count
            ];
        }

        return response()->json($data);
    }
}
