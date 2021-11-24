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

class ChatMessageReceived implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $content;
    public $user;



    public function __construct($content, $user, $channel)
    {
        $this->content = $content;
        $this->user = $user;
        $this->channel = $channel;
        // $this->is_read = $is_read;
    }

    public function broadcastOn()
    {
        return new PresenceChannel("chat-corp");
    }

    public function broadcastAs() {
        return "ChatMessageWasReceived";
    }
}
