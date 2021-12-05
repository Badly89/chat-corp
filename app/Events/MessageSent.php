<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
   use Dispatchable, InteractsWithSockets, SerializesModels;


    public $message;
    public $user;
    public $channel;

    public function __construct($user, $message, $channel)
    {
        $this->user = $user;
        $this->message = $message;
        $this->channel= $channel;

    }

    public function broadcastOn()
    {

            return new PresenceChannel("chat.channel.".$this->channel);

    }

}