<?php

namespace App\Http\Controllers;

use App\FdAddon;
use Illuminate\Http\Request;

class FdAddonController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function fetch_addons()
    {
        return FdAddon::get();
    }
}
