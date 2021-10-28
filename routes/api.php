<?php

use App\Http\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/login',[AuthenticatedSessionController::class,'create'])
->middleware(['guest'])
->name('login');

$limiter = config('fortify.limiter.login');

Route::post('/login',[AuthenticatedSessionController::class,'store'])
->middleware(array_filter([
    'guest',
    $limiter ? 'throttle'. $limiter : null,
]));

Route::post('/logout',[AuthenticatedSessionController::class,'destroy'])
->name('logout');

Route::get('/register', [RegisteredUserController::class,'create'])
->middleware(['guest'])
->name('register');

Route::post('/register',[RegisteredUserController::class,'store'])
->middleware(['guest']);




// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('conversations/store', 'ConversationController@store');