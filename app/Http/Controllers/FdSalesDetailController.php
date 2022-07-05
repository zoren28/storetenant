<?php

namespace App\Http\Controllers;

use App\FdSalesDetail;
use App\TomsCustomerOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FdSalesDetailController extends Controller
{
    public function fetch_sales_report($date_from, $date_to)
    {
        // return FdSalesDetail::with([
        //     'ticket',
        //     'ticket.customer'
        // ])
        //     ->where('tenant_id', auth()->user()->tenant_id)
        //     ->whereDate('created_at', '>=', $date_from)
        //     ->whereDate('created_at', '<=', $date_to)
        //     ->get();

        return TomsCustomerOrder::with([
            'ticket',
            'ticket.customer'
        ])
            ->select('toms_customer_orders.id', 'toms_customer_orders.ticket_id', 'toms_customer_orders.product_id', DB::raw('SUM(total_price) as sales'), DB::raw('pickup_at as created_at'))
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->join('toms_tag_riders', 'toms_customer_orders.ticket_id', '=', 'toms_tag_riders.ticket_id')
            ->where('canceled_status', false)
            ->where('complete_status', true)
            ->where('fd_products.tenant_id', auth()->user()->tenant_id)
            ->whereDate('pickup_at', '>=', $date_from)
            ->whereDate('pickup_at', '<=', $date_to)
            ->orderBy('pickup_at', 'ASC')
            ->groupBy('ticket_id')
            ->get();
    }
}
