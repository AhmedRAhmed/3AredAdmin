<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\comment;
use App\Models\alert;
use App\Models\document;
use App\Models\tag;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Client::factory(400)->create();
    }
}
