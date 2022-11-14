<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\alert>
 */
class AlertFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'alert' =>$this->faker->paragraph(1,true),
            'alertType' => $this->faker->boolean(),
            'PersonId' => Client::inRandomOrder()->first()->id,
        ];
    }
}
