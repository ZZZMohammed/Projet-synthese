<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\SlotsController;
use App\Http\Controllers\API\ContactController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




// USER ROUTES

Route::post('/login' , [UserController::class , 'login']) ;
Route::post('/register' , [UserController::class , 'register']) ;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout' , [UserController::class , 'logout']) ;
});

Route::post('/contact' , [ContactController::class , 'store']) ;


// TIMES ROUTES 

Route::middleware(['auth:sanctum' ,'role:admin'])->group(function (){
    Route::get('/times' , [SlotsController::class , 'index']) ;
    Route::post('/times' , [SlotsController::class , 'store']) ;
});



