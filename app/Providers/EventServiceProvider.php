<?php

namespace App\Providers;

use App\Events\ItemReadyForPickUp;
use App\Events\OrderSubmitted;
use App\Events\SubmitOrder;
use App\Listeners\ItemReadyForPickUpListener;
use App\Listeners\OrderSubmittedListener;
use App\Listeners\SubmitOrderListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        OrderSubmitted::class => [
            OrderSubmittedListener::class
        ],
        ItemReadyForPickUp::class => [
            ItemReadyForPickUpListener::class
        ],
        SubmitOrder::class => [
            SubmitOrderListener::class
        ],
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
