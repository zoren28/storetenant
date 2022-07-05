<?php

namespace App\Http\Controllers;

use App\FdMenu;
use App\FdSubMenu;
use App\TenantUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $access = TenantUser::select('global_cat_id as category_id')
            ->join('locate_tenants', 'tenant_users.tenant_id', '=', 'locate_tenants.tenant_id')
            ->where('tenant_users.id', auth()->user()->id)
            ->get();


        // $menus = FdMenu::with('submenus')
        //     ->where([
        //         [Auth::user()->user_type, 1],
        //         ['status', true]
        //     ])
        //     ->orderBy('order_no', 'ASC')
        //     ->get();

        $fd_menus = FdMenu::select('fd_menus.id as menu_id', 'order_no', 'menu', 'router', 'icon', 'submenu')
            ->join('category_menus', 'fd_menus.id', '=', 'category_menus.menu_id')
            ->where([
                [auth()->user()->user_type, true],
                ['fd_menus.status', true],
                ['category_menus.category_id', $access->first()->category_id],
                ['category_menus.status', true]
            ])
            ->orderBy('order_no', 'ASC')
            ->get();

        $menus = array();
        foreach ($fd_menus as $menu) {

            $fd_submenus = FdSubMenu::select('submenu', 'router')
                ->join('category_sub_menus', 'fd_sub_menus.id', '=', 'category_sub_menus.submenu_id')
                ->where([
                    ['menu_id', $menu->menu_id],
                    [auth()->user()->user_type, true],
                    ['fd_sub_menus.status', true],
                    ['category_sub_menus.category_id', $access->first()->category_id],
                    ['category_sub_menus.status', true]
                ])
                ->orderBy('order_no', 'ASC')
                ->get();

            $menus[] = [
                'menu' => $menu,
                'submenu' => $fd_submenus
            ];
        }

        return view('tenant.home', compact('menus'));
    }
}
