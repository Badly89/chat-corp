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

    public $user;

    public $content;

    public $channel;
    // public $type;

    public function __construct($content, $channel, $user)
    {
        // error_log($user);

        $this->user = $user;

        $this->content = $content;

         $this->channel = $channel;

        // $this->type = $type;

    }

    public function broadcastOn()
    {

            return new Channel("chat-corp");

    }

}
