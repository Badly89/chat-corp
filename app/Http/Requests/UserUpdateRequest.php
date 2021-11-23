<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'email' => ['email:rfc,dns', 'min:5'],
            'password' => ['min:6', 'max:100'],
            'avatar' => ['image'],
            'description' => ['string:nullable', 'min:6', 'max:200'],
        ];
    }

    public function messages(): array
    {
        return [
            'min' => 'Поле :attribute содержит недопустимое количество символов!',
            'max' => 'Поле :attribute содержит недопустимое количество символов!',
            'email' => 'Неверно указан e-mail!',
            'image' => 'В поле аватар могут быть загружены только файлы в форматах: jpg, jpeg, png или svg!'
        ];
    }

    public function attributes(): array
    {
        return  [
            'email' => 'e-mail',
            'password' => 'пароль',
            'description' => 'описание'
        ];
    }
}
