<?php

namespace App\Http\Controllers;

use App\Models\Roster;
use App\Http\Requests\{UserCheckRequest, UserCreateRequest};

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{

    public function register(UserCreateRequest $request) {

        $fields = $request->only(['name', 'email', 'password', 'password_confirmation']);

        $user= User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'password_confirmation' => $fields['password_confirmation']
        ]);

        $roster = new Roster([
            'user_id' => $user->id,
            'channel_id' => 1,
        ]);

        $roster->save();

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

                return response ([
                'status'=>200,
                'username'=>$user,
                'token' => $token,
                'message'=> 'Регистрация прошла успешно',
            ]);
        // }
    }

    public function login(UserCheckRequest $request) {
        $fields = $request->only(['email', 'password']);

           // Check email
        $user = User::where('email', $fields['email'])->first();

            if(!$user || !Hash::check( $fields['password'],  $user->password)){
                return response ([
                'status'=>401,
                'message'=> 'Отказ в доступе. Не верно указан логин или пароль.',
                ]);
            }
            else
            {
                $token = $user->createToken($user->email.'_Token')->plainTextToken;

                return response()-> json([
                'status'=>200,
                'username'=>$user,
                'token' => $token,
                'message'=> 'Авторизация прошла успешно',
            ]);
            }

    }



    public function logout(Request $request) {

        auth()->user()->tokens()->delete();

        return response()->json( [
            'status' => 200,
            'message' => 'Successfully logged out'
        ]);
    }



    public function user(Request $request){
        $user = $request->user();
        error_log($request->user());
         if(User::find($request->user()->id->details)){}

    }

}
