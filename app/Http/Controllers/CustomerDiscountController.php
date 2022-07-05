<?php

namespace App\Http\Controllers;

use App\CustomerDiscount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerDiscountController extends Controller
{
    public function update(Request $request)
    {
        
        DB::transaction(function () use($request) {

            for ($i=0; $i < count($request->ids); $i++) { 
                
                CustomerDiscount::where('id', $request->ids[$i])
                                    ->update(['approved' => $request->requests[$i]]);
            }
        });

        return response()->json(['message' => 'Customer Discount(s) has been updated'], 200);
    }
}
