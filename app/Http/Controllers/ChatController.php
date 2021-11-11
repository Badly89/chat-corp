<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Channel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function getAllChannels(Request $request)
    {
        $user = auth()->user()->id;
        // $channels=DB::table('channels')->select('name','id')->get();
         $channels=Channel::where('type','public')->select('name','id')->get();
        // $channels=Channel::join('detail_channels', 'channels.id', '=', 'detail_channels.channel_id')->join('users', 'users.id', '=', 'detail_channels.owner_id')
        //     ->select('channels.id', 'detail_channels.name', 'users.name as owner', 'detail_channels.desc', 'detail_channels.type', 'detail_channels.visible', 'detail_channels.owner_id')->distinct()->get();

            return response ([
                'channels' => $channels,
                'message'=> 'Выгрузка списка чатов',]);
    }


     public function sendMessage(Request $request)
    {
        $message = auth()->user()->messages()->create([
            'message' => $request->message,
            'channel_id' => $request->channel_id
        ]);

        $user = User::where('id', auth()->user()->id)->with('detail')->first();

        broadcast(new MessageSent($user, $message, $request->channel_id, $request->channel_type));
    }

}