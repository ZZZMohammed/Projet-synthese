<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\SlotsController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\AppointmentController;

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
    
    Route::post('/times' , [SlotsController::class , 'store']) ;
    Route::get('/times/{id}', [SlotsController::class, 'show']);    
    Route::put('/times/{id}', [SlotsController::class, 'update']);   
    Route::delete('/times/{id}', [SlotsController::class, 'destroy']);
    // Get unread notifications
    Route::get('/notifications', function() {
    return response()->json([
        'unread' => auth()->user()->unreadNotifications,
        'read' => auth()->user()->readNotifications
    ]);
});


Route::post('/notifications/mark-read', function(Request $request) {
    if ($request->has('notification_id')) {
        // Mark single notification as read
        auth()->user()->unreadNotifications()
            ->where('id', $request->notification_id)
            ->update(['read_at' => now()]);
    } else {
        // Mark all as read
        auth()->user()->unreadNotifications->markAsRead();
    }
    return response()->json(['success' => true]);
});
});

Route::get('/times' , [SlotsController::class , 'index']) ;


// APPOINTEMNT ROUTES

Route::middleware(['auth:sanctum'])->group(function (){
    Route::apiResource('appointments', AppointmentController::class);
       Route::get('profile', [UserController::class , 'profile']);
});



