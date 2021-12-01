<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = new Role([
            'id' => 1,
            'role_name' => 'Администратор',
        ]);
        $role->save();

        $role = new Role([
            'id' => 2,
            'role_name' => 'Пользователь',
        ]);
        $role->save();

        $role = new Role([
            'id' => 3,
            'role_name' => 'Модератор',
        ]);
        $role->save();
    }
}
