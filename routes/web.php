<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Authenticate;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UserController;
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

//  Route::get('/', function () {
//      return view('welcome');
//  });

Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/users/search/{name}', [UserController::class, 'search']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {   return auth()->user();   });
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});




// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('conversations/store', 'ConversationController@store');

 Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


 Route::get('/{any}', function () {
     return view('welcome');
 })->where('any','.*');