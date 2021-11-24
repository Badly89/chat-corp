<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User([

                'name' => 'admin',
                'email' => 'chat-corp@mail.ru',
                'password' => Hash::make('123456'),
            ]);
            $user->save();

         $channel = Channel::find(1);
          $channel->users()->attach($user->id);

    }
}
