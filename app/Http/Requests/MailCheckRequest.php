<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MailCheckRequest extends FormRequest
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
            'email' => ['required', 'exists:users,email', 'email:rfc,dns', 'min:5'],
        ];
    }

    public function messages(): array
    {
        return [
            'exists' => 'Пользователь с таким email адресом не зарегистрирован',
            'required' => 'Поле :attribute нужно заполнить!',
            'min' => 'Поле :attribute содержит недопустимое количество символов!',
            'email' => 'Неверно указан e-mail!'
        ];
    }

    public function attributes(): array
    {
        return  [
            'email' => 'e-mail',
        ];
    }
}
