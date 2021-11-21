<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageReceived implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $content;
    public $user;
    public $channel;
    public $is_read;


    public function __construct($content, $user, $channel,$is_read)
    {
        $this->content = $content;
        $this->user = $user;
        $this->channel = $channel;
        $this->is_read = $is_read;
    }

    public function broadcastOn()
    {
        return ["chat-corp.1"];
    }

    public function broadcastAs() {
        return "ChatMessageWasReceived";
    }
}