<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:100'],
            'email' => ['required', 'unique:users,email', 'email:rfc,dns', 'min:5'],
            'password' => ['required', 'confirmed', 'min:6', 'max:100'],
            'password_confirmation' => ['required', 'min:6']
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'Поле :attribute нужно заполнить!',
            'min' => 'Поле :attribute содержит недопустимое количество символов!',
            'max' => 'Поле :attribute содержит недопустимое количество символов!',
            'email' => 'Неверно указан e-mail!',
            'unique' => 'Пользователь с таким :attribute уже зарегистрирован!',
        ];
    }

    public function attributes(): array
    {
        return  [
            'name' => 'имя',
            'password_confirmation' => 'подтверждение пароля',
            'password' => 'пароль',
            'email' => 'e-mail',
        ];
    }
}
