<?php

namespace App\Http\Controllers;

use App\DiscountList;
use Illuminate\Http\Request;

class DiscountListController extends Controller
{
    public function discount_lists()
    {
        return DiscountList::where('status', true)
                            ->get();
    }
}
