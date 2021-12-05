<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCheckRequest extends FormRequest
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
            'email' => ['required', 'email:rfc,dns', 'min:5'],
            'password' => ['required', 'min:6', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'Поле :attribute нужно заполнить!',
            'min' => 'Поле :attribute содержит недопустимое количество символов!',
            'max' => 'Поле :attribute содержит недопустимое количество символов!',
            'email' => 'Неверно указан e-mail!'
        ];
    }

    public function attributes(): array
    {
        return  [
            'email' => 'e-mail',
            'password' => 'пароль',
        ];
    }
}
