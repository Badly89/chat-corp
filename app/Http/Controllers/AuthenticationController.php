<?php

namespace App\Http\Controllers;

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
    // protected function authenticated(Request $request, $user)
    // {
    //     return response([
    //         $user->id,
    //         $user->name,
    //         $user->email,
    //     ]);
    // }


    public function register(Request $request) {

          $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        //  if($validator->fails()){
        //     return response()-> json([
        //         'validation_errors'=> $validator->messages(),
        //     ]);
        // }
        // else
        // {
        $user= User::create([
            'name'=>$fields['name'],
            'email'=>$fields['email'],
            'password'=>bcrypt($fields['password'])
        ]);
        $token = $user->createToken($user->email.'_Token')->plainTextToken;

                return response ([
                'status'=>200,
                'username'=>$user,
                'token' => $token,
                'message'=> 'Регистрация прошла успешно',
            ]);
        // }
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);




           // Check email
        $user = User::where('email', $fields['email'])->first();

            if(!$user || !Hash::check( $fields['password'],  $user->password)){
                return response ([
                'status'=>401,
                'message'=> 'Invalid Credential',
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