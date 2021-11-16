<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('channels')->insert([
            'title' => 'Общий чат',
            'type' =>'public',
            'user_id_creator' => 1,
        ]);
    }
}
