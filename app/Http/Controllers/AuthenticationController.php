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

class AuthenticationController extends Controller
{
    protected function authenticated(Request $request, $user)
    {
        return response([
            $user->id,
            $user->name,
            $user->email,
        ]);
    }

    //this method adds new users
    public function register(Request $request) {
        $messages = [
            "name.required" => "Name cannot be empty",
            "name.max" => "Name cannot be more than 50 characters",
            "email.required" => "Email cannot be empty",
            "email.email" => "Email is not valid",
            "password.required" => "Password cannot be empty",
            "password.min" => "Password must be at least 6 characters"
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ], $messages);


        if ($validator->fails()) {
            return response(['message'=> $validator->getMessageBag()->first()], 422);
        } else if (!empty(User::where('email',$request->email)->first())) {
            return response(['message'=> "A User with that E-Mail already exists."], 422);

        } else {
            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);
            $user->save();

            return response()->json([
                'message' => 'You have Registered Successfully! Redirecting you to the Login page'
            ], 201);



        return response($response, 201);
        }
    }
    //use this method to signin users
    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad creds'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }


    public function logout(Request $request) {
        // auth()->user()->token()->delete();
        $request->user()->token()->revoke();
        Cache::forget('user-is-online'.$request->user()->id);
        return response()->json( [
            'message' => 'Successfully logged out'
        ],200)->cookie(Cookie::forget('jwt'));
    }
}