<?php

namespace App\Http\Controllers;

use App\FdMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FdMenuController extends Controller
{
    public function show()
    {
        return FdMenu::with('submenus')
                                ->where([
                                    [Auth::user()->user_type, 1],
                                    ['status', true]
                                ])
                                ->orderBy('order_no', 'ASC')
                                ->get();
    }
}
