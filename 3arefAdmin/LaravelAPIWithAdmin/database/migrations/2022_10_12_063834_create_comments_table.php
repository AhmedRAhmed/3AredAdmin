<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->text('CommentText');
            $table->text('CommentFlag')->nullable();
            $table->bigInteger('CommentPersonId')->unsigned();
            $table->foreign('CommentPersonId')->references('id')->on('clients')->onDelete("cascade");;
            $table->bigInteger('PersonId')->unsigned();
            $table->foreign('PersonId')->references('id')->on('clients')->onDelete("cascade");;
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
        Schema::dropIfExists('comments');
    }
};
