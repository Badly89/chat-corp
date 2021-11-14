<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function getAllChannels(Request $request)
    {
        $user = auth()->user()->id;

         $channels=Channel::where('type','public')->select('name','id')->get();


            return response ([
                'status' => 200,
                'channels' => $channels,
                'message'=> 'Список чатов выгружен успешно',]);
    }


     public function sendMessage(Request $request)
    {
        $message = auth()->user()->messages()->create([
            'message' => $request->message,
            'channel_id' => $request->channel_id
        ]);

        $user = User::where('id', auth()->user()->id)->with('detail_channels')->first();

        broadcast(new MessageSent($user, $message, $request->channel_id));

    }

        public function getMessages(Request $request, $channel_id)
    {
        return Message::where("channel_id", $channel_id)->with('user.detail_channels')->get();
    }
    public function getChannelsUsers($channel_id) {
        $channel = Channel::where("type","public")->where('id',$channel_id)->with(["users"])->get();

        $channel = $this->listOnlineUsers($channel);

        error_log("Получаем список пользователей канала");
        error_log($channel);


        return response()->json($channel);
    }
}