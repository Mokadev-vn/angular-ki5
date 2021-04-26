<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ComicController;
use App\Http\Controllers\AuthorsController;
use App\Http\Controllers\HelperController;

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

Route::get('/errorsToken', function(){
    return response()->json([
        'message' => 'Token is required'
    ], 400);
})->name('errorToken');

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/infoUser', [AuthController::class, 'userProfile']);
});

Route::post('/search', [HelperController::class, 'search'])->middleware('auth:api');

Route::resource('category', CategoryController::class)->except([
    'create', 'edit'
]);

Route::resource('comic', ComicController::class)->except([
    'create', 'edit'
]);

Route::resource('author', AuthorsController::class)->except([
    'create', 'edit'
]);
