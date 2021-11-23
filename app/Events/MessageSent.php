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
   use Dispatchable, InteractsWithSockets;

    public $user;

    public $message;

    public $channel;
    // public $type;

    // public function __construct($user, $message, $channel,$type)
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
        // if($this->type === "channel") {
            return new Channel("chat-corp.".$this->channel);
        // } else if ($this->type === "direct") {
            // return new PresenceChannel("chat-corp.direct.".$this->channel);
        // }
    }

}