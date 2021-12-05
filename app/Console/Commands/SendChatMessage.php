<?php

namespace App\Console\Commands;

use App\Events\ChatMessageReceived;
use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use Illuminate\Console\Command;

class SendChatMessage extends Command
{
  protected $signature = 'chat:message {content}';

    protected $description = 'Send chat message.';

    public function handle()
    {

        // Fire off an event, just randomly grabbing the first user for now
        $user = User::first();
        $channel=Channel::first();
        $is_read=0;
        $content = Message::create([
        'user_id'=>$user->id,
        'channel_id'=>$channel->id,
        'is_read'=> $is_read,

        'content' => $this->argument('content')
        ]);


        event(new ChatMessageReceived($content, $user,$channel,$is_read));
    }
}