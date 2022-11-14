<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Accounts>
 */
class AccountsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $Role = $this->faker->randomElement(['SuperAdmin','Admin']);
        return [
            'UserName'=> $this->faker->unique()->safeEmail(),        
            'Password'=> $this->faker->password(),
            'Role'=> $Role
        ];
    }
}
