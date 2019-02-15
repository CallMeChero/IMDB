<?php

use Illuminate\Database\Seeder;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('genres')->insert([
            'name' => 'Action'
        ]);
        DB::table('genres')->insert([
            'name' => 'Comedy'
        ]);
        DB::table('genres')->insert([
            'name' => 'SCI-FI'
        ]);
        DB::table('genres')->insert([
            'name' => 'Thriller'
        ]);
        DB::table('genres')->insert([
            'name' => 'Romance'
        ]);
        DB::table('genres')->insert([
            'name' => 'Adventure'
        ]);
        DB::table('genres')->insert([
            'name' => 'Crime'
        ]);
        DB::table('genres')->insert([
            'name' => 'Superhero'
        ]);
        DB::table('genres')->insert([
            'name' => 'Horror'
        ]);
        DB::table('genres')->insert([
            'name' => 'Animation'
        ]);
    }
}
