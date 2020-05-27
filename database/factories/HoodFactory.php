<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Hood;
use App\User;
use Faker\Generator as Faker;

$factory->define(Hood::class, function (Faker $faker) {
    return [
        'user_id' => factory(User::class),
        'fellow_user_id' => factory(User::class)
    ];
});
