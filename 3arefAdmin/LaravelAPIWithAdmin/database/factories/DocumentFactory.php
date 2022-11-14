<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'Document' =>$this->faker->imageUrl(),
            'Brief' =>$this->faker->paragraph(3,true),
            'Type' => $this->faker->boolean(),
            'PersonId' => Client::inRandomOrder()->first()->id,
        ];
    }
}
