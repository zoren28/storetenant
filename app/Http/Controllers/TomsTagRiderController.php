<?php

namespace App\Http\Controllers;

use App\FdRemittanceDetail;
use App\FdSalesDetail;
use App\TomsCustomerOrder;
use App\TomsTagRider;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class TomsTagRiderController extends Controller
{
    public $now;
    public function __construct()
    {
        $this->middleware('auth');
        $this->now = Carbon::now(config('app.timezone'))->toDateTimeString();

        // date_default_timezone_set('Asia/Manila');
        // $this->now = date('Y-m-d H:i:s');
    }

    public function tag_for_in_transit(Request $request)
    {

        TomsTagRider::where('id', $request->id)
            ->update(
                ['trans_status' => true, 'toms_tag_riders.trans_at' => $this->now]
            );

        return response()->json(['message' => 'Order has been tag for in transit!'], 200);
    }

    public function tag_for_successfully_delivered(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'amount_remitted' => [
                'required',
                'numeric',
                'min:1',
                'same:total_remitted'
            ]
        ]);

        $remitted_amt = str_replace(',', '', $data['amount_remitted']);
        $total_amount = floatval($request->total_remitted) * 1;
        $remitted_amt = floatval($remitted_amt) * 1;
        $total_amt = floatval($request->total_amount);

        $balance = 0;
        $income = "";
        if ($total_amount <= $remitted_amt) {
            $balance = $total_amount - $remitted_amt;
            if ($balance != 0.0) {
                $income = "over";
                $remitted_status = false;
            } else {
                $remitted_status = true;
            }
        } else {
            $remitted_status = false;
            $balance = $total_amount - $remitted_amt;
            $income = "short";
        }

        FdRemittanceDetail::create([
            'rider_id' => $request->rider_id,
            'tenant_id' => auth()->user()->tenant_id,
            'ticket_id' => $request->ticket_id,
            'amt_receivable' => $total_amt,
            'remitted_amount' => $remitted_amt,
            'balance' => $balance,
            'expense_account' => $income,
            'status' => $remitted_status
        ]);

        FdSalesDetail::create([
            'rider_id' => $request->rider_id,
            'tenant_id' => auth()->user()->tenant_id,
            'ticket_id' => $request->ticket_id,
            'sales' => $remitted_amt
        ]);

        TomsTagRider::where('id', $request->id)
            ->update(
                ['complete_status' => true, 'toms_tag_riders.completed_at' => $this->now, 'remitted_status' => $remitted_status, 'remitted_at' => $this->now]
            );

        return response()->json(['message' => 'Order has been successfully delivered!'], 200);
    }

    public function tag_for_pickup(Request $request)
    {

        $customerOrders = TomsCustomerOrder::select('toms_customer_orders.id as order_id')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.tag_pickup_status', false],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_customer_orders.ticket_id', $request->ticket_id]
            ])
            ->get();

        foreach ($customerOrders as $order) {

            TomsCustomerOrder::where('id', $order->order_id)
                ->update([
                    'tag_pickup_status' => true,
                    'tag_pickup_at' => $this->now
                ]);
        }

        return response()->json(['message' => 'Customer order is ready for pick up!'], 200);
    }

    public function collect_refund(Request $request)
    {
        $remittance_detail = FdRemittanceDetail::where([
            ['tenant_id', $request->tenant_id],
            ['rider_id', $request->rider_id],
            ['ticket_id', $request->ticket_id]
        ])
            ->update([
                'remitted_amount' => $request->amt_receivable,
                'balance' => 0,
                'collected_refunded_amt' => $request->sales,
                'status' => true
            ]);

        $sales_detail = FdSalesDetail::create([
            'rider_id' => $request->rider_id,
            'tenant_id' => $request->tenant_id,
            'ticket_id' => $request->ticket_id,
            'sales' => $request->sales,
            'expense_account' => $request->expense_account,
        ]);

        $order = TomsTagRider::where([
            ['tenant_id', $request->tenant_id],
            ['rider_id', $request->rider_id],
            ['ticket_id', $request->ticket_id]
        ])
            ->update(
                ['complete_status' => true, 'toms_tag_riders.completed_at' => $this->now, 'remitted_status' => true, 'remitted_at' => $this->now]
            );

        return response()->json(['message' => 'Remaining Balance has been collected!'], 200);
    }

    public function payment_order(Request $request)
    {
        $request->validate([
            'tender' => ['required', 'numeric', 'gte:' . $request->total_amount],
        ]);

        FdRemittanceDetail::create([
            'tenant_id' => auth()->user()->tenant_id,
            'ticket_id' => $request->ticket_id,
            'amt_receivable' => floatval($request->total_amount),
            'remitted_amount' => floatval($request->total_amount),
            'balance' => 0,
            'expense_account' => "",
            'status' => true
        ]);

        FdSalesDetail::create([
            'tenant_id' => auth()->user()->tenant_id,
            'ticket_id' => $request->ticket_id,
            'sales' => floatval($request->total_amount)
        ]);

        TomsTagRider::create([
            'ticket_id' => $request->ticket_id,
            'tenant_id' => auth()->user()->tenant_id,
            'remitted_status' => true,
            'remitted_at' => $this->now
        ]);

        return response()->json(['message' => 'Customer order has been successfully paid!'], 200);
    }

    public function fetch_transaction_report($date_from, $date_to)
    {
        return TomsTagRider::with([
            'ticket',
            'ticket.customer'
        ])
            ->where('tenant_id', auth()->user()->tenant_id)
            ->where('complete_status', true)
            ->whereDate('created_at', '>=', $date_from)
            ->whereDate('created_at', '<=', $date_to)
            ->get();
    }

    public function fetch_undeliver_transaction($date_from, $date_to)
    {
        return TomsTagRider::with([
            'ticket',
            'ticket.customer'
        ])
            ->where('tenant_id', auth()->user()->tenant_id)
            ->where('complete_status', false)
            ->whereDate('created_at', '>=', $date_from)
            ->whereDate('created_at', '<=', $date_to)
            ->get();
    }

    public function server_date()
    {
        $deliverySchedules = [];
        $today = today();

        for ($i = 0; $i < 4; $i++) {

            if ($i === 0) {

                $deliverySchedules[] = [
                    'date'      => $today->toDateString()
                ];
            } else {
                $deliverySchedules[] = [
                    'date'      => $today->subDays(1)->toDateString()
                ];
            }
        }

        $responseData = compact(
            'deliverySchedules'
        );

        return response()->json($responseData, 200);
    }
}
