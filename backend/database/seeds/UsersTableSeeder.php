<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'test',
            'email' => 'test@test.com',
            'email_verified_at' => null,
            'password' => bcrypt('test'),
            'remember_token' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('users')->insert([
            'username' => 'dceranic',
            'email' => 'ceranic@gmail.com',
            'email_verified_at' => null,
            'password' => bcrypt('asd'),
            'remember_token' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
