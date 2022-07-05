<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ItemReadyForPickUp implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $ticketId;
    public $customerId;

    public function __construct($customerId, $ticketId)
    {
        $this->customerId = $customerId;
        $this->ticketId = $ticketId;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('item-for-pickup-' . $this->customerId . '-' . $this->ticketId);
    }
}
