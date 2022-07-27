<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{

    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $productSuffixes = ['Shoes', 'Pants', 'Shirt', 'Glasses', 'Sweaters', 'Watches'];
        $name = $this->faker->company(). ' ' .Arr::random($productSuffixes);
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->realText(200),
            'price' => $this->faker->numberBetween(100, 1000)
        ];
    }
}
