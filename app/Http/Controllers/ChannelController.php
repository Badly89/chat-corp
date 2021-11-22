<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChannelController extends Controller
{
    public function getAllChannels() {
         auth()->user()->id;

         $channels = Channel::where('type','channel')->select('title','id')->get();

         return response ([
                'status' => 200,
                'channels' => $channels,
                'message'=> 'Список чатов выгружен успешно',
         ]);
    }


     public function sendMessage(Request $request) {
        $content = auth()->user()->messages()->create([
            'content' => $request->content,
            'channel_id' => $request->channel_id,
        ]);

        $user = User::where('id', auth()->user()->id)->first();

        broadcast(new MessageSent($user, $content, $request->channel_id));

     }

    public function getMessages(Request $request, $channel_id) {
        return Message::where("channel_id", $channel_id)->get();
    }

    public function getChannelsUsers($channel_id) {
        $channel = Channel::where("type","channel")->where('id',$channel_id)->with(["users"])->get();


        error_log("Получаем список пользователей канала");
        error_log($channel);


        return response()->json($channel);
    }
}