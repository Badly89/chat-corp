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
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender_id;
    public $rec_id;
    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    // public function __construct($sender_id,$rec_id,$msg)
    // {
    //    $this->sender_id = $sender_id;
    //     $this->rec_id = $rec_id;
    //     $this->message = $msg;
    // }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    // public function broadcastOn()
    // {
    //     return[
    //         new PrivateChannel('chat-'.$this->sender_id),
    //         new PrivateChannel('chat-'.$this->rec_id)
    //     ];

    //     // return new PrivateChannel('channel-name');
    // }
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
    // public $message;


    public $channel;

    public $type;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $message, $channel, $type)
    {
        error_log($user);

        $this->user = $user;

        $this->message = $message;

        $this->channel = $channel;

        $this->type = $type;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
         return new PresenceChannel("chat.channel.".$this->channel);

    }

}
