<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Database\Seeder;

class GeneralChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $channel = new Channel([
            'id' => 1,
            'title' => 'Главный канал',
            'type' =>'channel',
            'user_id_creator' => 1,
        ]);
        $channel->save();

        $user = User::find(1);
        $channel->users()->attach($user->id);

    }
}
