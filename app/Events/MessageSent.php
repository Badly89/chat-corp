<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent
{
   use Dispatchable, InteractsWithSockets;

    /**
     * User that sent the message
     *
     * @var \App\User
     */
    public $user;

    /**
     * Message details
     *
     * @var \App\Message
     */
    public $message;


    public $channel;

    // public $type;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $message, $channel)
    {
        error_log($user);

        $this->user = $user;

        $this->message = $message;

        $this->channel = $channel;

        // $this->type = $type;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        if($this->type === "public") {
            return new PresenceChannel("chat.channel.".$this->channel);
        } else if ($this->type === "private") {
            return new PresenceChannel("chat.dm.".$this->channel);
        }
    }

}