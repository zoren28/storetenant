<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class TenantUser extends Authenticatable
{
    use Notifiable;

    protected $table = 'tenant_users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tenant_id', 'name', 'username', 'password', 'email', 'user_type', 'active', 'image'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public function getAuthPassword()
    {
        return $this->password;
    }

    public function tenant()
    {
        return $this->belongsTo('App\LocateTenant', 'tenant_id', 'tenant_id');
    }
}
