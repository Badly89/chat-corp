<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChannelCreateRequest extends FormRequest
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
            'title' => ['required', 'string', 'min:3', 'max:100'],
            'description' => ['string', 'min:5'],
            'user_id_creator' => ['required', 'integer'],
            'image' => ['image'],
            'type' => ['string', 'min:3', 'max:100']
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'Поле :attribute нужно заполнить!',
            'min' => 'Поле :attribute содержит недопустимое количество символов!',
            'max' => 'Поле :attribute содержит недопустимое количество символов!',
            'string' => 'Поле :attribute должно содержать текст!',
            'integer' => 'Поле :attribute должно содержать только цифры!',
            'image' => 'В поле с изображением могут быть загружены только файлы в форматах: jpg, jpeg, png или svg!'
        ];
    }

    public function attributes(): array
    {
        return  [
            'title' => 'название',
            'description' => 'описание',
            'user_id_creator' => 'создатель канала',
            'image' => 'изображение',
            'type' => 'тип'
        ];
    }
}
