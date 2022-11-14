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
        Schema::create('clients', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('FullName');
            $table->string('Phone')->unique();           
            $table->string('Password');
            $table->text('Bio')->nullable();
            $table->string('WorkingDays')->nullable();
            $table->string('NoteWork')->nullable();
            $table->string('ProfilePhoto')->nullable();
            $table->integer('Rating1')->default(0);
            $table->integer('Rating2')->default(0);
            $table->integer('Rating3')->default(0);
            $table->integer('Rating4')->default(0);
            $table->integer('Rating5')->default(0);
            $table->boolean('Valid')->default(0);
            $table->boolean('Verified')->default(0);
            $table->integer('CountOfComments')->default(0);
            $table->integer('CountOfViewers')->default(0);
            $table->integer('CountOfPhone')->default(0);
            $table->string('Location')->nullable();
            $table->string('Governorate')->nullable();
            $table->string('City')->nullable();
            $table->string('Job')->nullable();
            $table->string('JobTitle')->nullable();
            $table->string('JobType')->nullable();
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
        Schema::dropIfExists('clients');
    }
};
