<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChannelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('channels', function (Blueprint $table) {
           $table->id();
           $table->text('title')->nullable();
           $table->text('description');
           $table->foreignId('user_id_creator')
               ->constrained('users')
               ->onDelete('cascade');
           $table->timestamps();
           $table->text('image');
           $table->boolean('visible');
           $table->enum("type", array("public", "private"));
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('channels');
    }
}