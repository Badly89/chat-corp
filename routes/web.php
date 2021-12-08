<?php

use App\Events\MessageSent;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController as HomeController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/home', [HomeController::class, 'index'])
    ->name('home');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::post('/users', [UserController::class, 'store']);

    Route::post('/users/update/{id}', [UserController::class, 'update']);

    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    //Route from Channels
    Route::get('/getAllChannels',[ChannelController::class,'getAllChannels']);
    Route::post('/createChannel',[ChannelController::class,'createChannel']);
    Route::post('/sendMessage',[ChannelController::class,'sendMessage']);

    Route::get('/online/{user_id}', [ChannelController::class,'isOnline']);
    Route::get('/offline/{user_id}', [ChannelController::class,'isOffline']);

    Route::get('/getMessages/{channel_id}', [ChannelController::class,'getMessages']);
    Route::get('/getUsers/{channel_id}',[ChannelController::class,'getChannelsUsers']);
});

Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login'])
    ->name('login');

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/users/search/{name}', [UserController::class, 'search']);

Route::post('/forgot-password/{email}', [MailController::class, 'forgotPassword'])
    ->name('forgot-password');



Route::get('/{any}', function () {
    return view('welcome');
})
    ->where('any','.*');
