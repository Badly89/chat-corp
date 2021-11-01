<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sender_id')->unsigned();
            $table->text('rec_id');
            $table->text('message');
            $table->timestamps();
        });

        // Schema::create('messages', function (Blueprint $table) {
        //     $table->id();
        //     $table->foreignId('user_id')
        //         ->constrained('users')
        //         ->onDelete('cascade');
        //     $table->foreignId('chat_id')
        //         ->constrained('chats')
        //         ->onDelete('cascade');
        //     $table->text('content')->nullable();
        //     $table->integer('is_read');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}