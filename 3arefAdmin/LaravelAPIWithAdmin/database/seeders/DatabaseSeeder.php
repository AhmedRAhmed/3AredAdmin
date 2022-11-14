<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

use function Ramsey\Uuid\v1;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            AccountsSeeder::class
        ]);  

        $this->call([
            ClientSeeder::class
        ]);             
        $this->call([
            CommentSeeder::class
        ]);
        $this->call([
            DocumentSeeder::class
        ]);
        $this->call([
            AlertSeeder::class
        ]);
        $this->call([
            TagSeeder::class
        ]);

        $this->call([
            JobsSeeder::class
        ]);
        $this->call([
            GovernorateSeeder::class
        ]);
        $this->call([
            JobTitleSeeder::class
        ]);
        $this->call([
            CitySeeder::class
        ]);
    }
}
