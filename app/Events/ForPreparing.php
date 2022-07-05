<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ForPreparing implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $customerId;
    public $ticketId;
    public $tenantId;

    public function __construct($customerId, $ticketId, $tenantId)
    {
        $this->customerId = $customerId;
        $this->ticketId = $ticketId;
        $this->tenantId = $tenantId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('for-preparing-' . $this->customerId . '-' . $this->ticketId . '-' . $this->tenantId);
    }
}
