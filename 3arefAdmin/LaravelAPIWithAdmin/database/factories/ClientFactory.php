<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $Type = $this->faker->randomElement(['Employee','Worker','Company']);
        return [
            'FullName' => $this->faker->unique()->name(), 
            'Phone' => $this->faker->unique()->phoneNumber(),     
            'Password' => $this->faker->password(),
            'Bio' => $this->faker->paragraph(1,true),
            'WorkingDays' =>$this->faker->dayOfWeek(),
            'NoteWork'=> $this->faker->paragraph(1,true),
            'ProfilePhoto' => $this->faker->imageUrl(),
            'Rating1' => $this->faker->numberBetween(1,1000),
            'Rating2'=> $this->faker->numberBetween(1,1000),
            'Rating3'=> $this->faker->numberBetween(1,1000),
            'Rating4'=> $this->faker->numberBetween(1,1000),
            'Rating5'=> $this->faker->numberBetween(1,1000),
            'Valid'=> $this->faker->boolean(),
            'Verified'=> $this->faker->boolean(),
            'CountOfComments'=> $this->faker->numberBetween(1,1000),
            'CountOfViewers'=> $this->faker->numberBetween(1,1000),
            'CountOfPhone'=> $this->faker->numberBetween(1,1000),
            'Location'=> $this->faker->streetAddress(),
            'Governorate'=> $this->faker->country(),
            'City'=> $this->faker->city(),
            'Job'=>$this->faker->jobTitle(),
            'JobTitle'=>$this->faker->jobTitle(),
            'JobType'=>$Type
        ];
    }
}
