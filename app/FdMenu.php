<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FdMenu extends Model
{
    public function submenus()
    {
        return $this->hasMany('App\FdSubMenu', 'menu_id', 'id')
            ->where('fd_sub_menus.status', true)
            ->orderBy('id', 'ASC');
    }
}
