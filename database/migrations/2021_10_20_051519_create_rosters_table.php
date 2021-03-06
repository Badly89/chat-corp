<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRostersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rosters', function (Blueprint $table) {
        //    $table->bigInteger('user_id')->unsigned();
        //     $table->foreign('user_id')->references('id')->on('users');

        //     $table->bigInteger('channel_id')->unsigned();
        //     $table->foreign('channel_id')->references('id')->on('channels');
        //     $table->timestamps();
        $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->foreignId('channel_id')
                ->constrained('channels')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rosters');
    }
}