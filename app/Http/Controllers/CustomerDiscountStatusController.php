<?php

namespace App\Http\Controllers;

use App\CustomerDiscount;
use Illuminate\Http\Request;
use App\CustomerDiscountStatus;
use Illuminate\Support\Facades\DB;

class CustomerDiscountStatusController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request)
    {
        DB::transaction(function () use ($request) {

            for ($i = 0; $i < count($request->ids); $i++) {

                CustomerDiscountStatus::updateOrInsert(
                    ['tenant_id' => auth()->user()->tenant_id, 'ticket_id' => $request->ticket_id, 'customer_discount_id' => $request->ids[$i]],
                    ['discount_id' => $request->discountIds[$i], 'status' => $request->requests[$i]]
                );
            }
        });

        return response()->json(['message' => 'Customer Discount(s) has been updated'], 200);
    }

    public function fetch_approved_discount($ticket_id)
    {
        // $senior = CustomerDiscountStatus::with(['customer_discount.discount_storage', 'discount_list'])
        //     ->where([
        //         ['tenant_id', auth()->user()->tenant_id],
        //         ['customer_discount_statuses.ticket_id', $ticket_id],
        //         ['discount_id', 1],
        //         ['status', true]
        //     ])
        //     ->get();

        // $pwd = CustomerDiscountStatus::with(['customer_discount.discount_storage', 'discount_list'])
        //     ->where([
        //         ['tenant_id', auth()->user()->tenant_id],
        //         ['customer_discount_statuses.ticket_id', $ticket_id],
        //         ['discount_id', 2],
        //         ['status', true]
        //     ])
        //     ->get();

        // $manager = CustomerDiscountStatus::with(['customer_discount.discount_storage', 'discount_list'])
        //     ->where([
        //         ['tenant_id', auth()->user()->tenant_id],
        //         ['customer_discount_statuses.ticket_id', $ticket_id],
        //         ['discount_id', 3],
        //         ['status', true]
        //     ])
        //     ->get();

        // $owner = CustomerDiscountStatus::with(['customer_discount.discount_storage', 'discount_list'])
        //     ->where([
        //         ['tenant_id', auth()->user()->tenant_id],
        //         ['customer_discount_statuses.ticket_id', $ticket_id],
        //         ['discount_id', 4],
        //         ['status', true]
        //     ])
        //     ->get();

        $discount_list = DB::table('discount_lists')
            ->where('status', true)
            ->get();

        $customer_discounts = array();
        foreach ($discount_list as $key) {

            $discount = CustomerDiscountStatus::with(['customer_discount.discount_storage', 'discount_list'])
                ->where([
                    ['tenant_id', auth()->user()->tenant_id],
                    ['customer_discount_statuses.ticket_id', $ticket_id],
                    ['discount_id', $key->id],
                    ['status', true]
                ])
                ->get();

            $customer_discounts[] = $discount;
        }

        $responseData = compact(
            'customer_discounts'
        );

        return response()->json($responseData, 200);
    }
}
