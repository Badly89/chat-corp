<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChannelCreateRequest;

use App\Events\MessageSent;
use App\Events\UserOffline;
use App\Events\UserOnline;
use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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

        broadcast(new MessageSent($user, $content, $request->channel_id, ));

     }

    public function getMessages(Request $request, $channel_id) {
        return Message::where("channel_id", $channel_id)->with('user')->get();
    }

    public function getChannelsUsers($channel_id) {
        $channel = Channel::where("type","channel")->where('id',$channel_id)->with(["users"])->get();


        error_log("Получаем список пользователей канала");
        error_log($channel);


        return response()->json($channel);
    }

    public function isOnline(Request $request, $user_id) {
        $user['id'] = $user_id;
        Cache::put('user-online'.$user_id, $user_id, 3600);
        broadcast(new UserOnline($user));
    }

    public function isOffline(Request $request, $user_id)
    {
        $user['id'] = $user_id;
        Cache::forget('user-offline'.$user_id);
        broadcast(new UserOffline($user));
    }

    public function createChannel(ChannelCreateRequest $request) {

        $fields = $request->only(['title', 'description', 'user_id_creator', 'image', 'type']);

        $channel =  new Channel([
            'title' => $fields['title'],
            'user_id_creator' => $fields['user_id_creator'],
            'image' => $fields['image'],
            'description' => $fields['description'],
            'type' => $fields['type'],
        ]);

        $channel->save();

    }
}
