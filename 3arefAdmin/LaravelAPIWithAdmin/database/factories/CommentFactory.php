<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'CommentText' =>$this->faker->paragraph(2,true),
            'CommentFlag' => $this->faker->boolean(),
            'CommentPersonId' => Client::inRandomOrder()->first()->id,
            'PersonId' => Client::inRandomOrder()->first()->id,
        ];
    }
}
