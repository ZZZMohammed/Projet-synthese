<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\SlotsController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\API\SocialAuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);


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
    Route::get('slots/date/{date}', [SlotsController::class, 'getByDate']);
    Route::post('/slots/generate', [SlotsController::class, 'generateSlots']);
    Route::get('/times/{id}', [SlotsController::class, 'show']);    
    Route::put('/times/{id}', [SlotsController::class, 'update']);   
    Route::delete('/times/{id}', [SlotsController::class, 'destroy']);
    Route::get('/users' , [UserController::class , 'index']) ;

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



// EMAIL VERIFICATION

Route::middleware('auth:sanctum')->group(function () {

    // Resend verification email
    Route::post('/email/verification-notification', function (Request $request) {

        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.'
            ]);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification link sent.'
        ]);
    })->middleware('throttle:6,1');

});

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {

    $request->fulfill();

    return redirect('http://localhost:5173/email-verified');

})->middleware(['auth:sanctum', 'signed'])
  ->name('verification.verify');



//   email verfy
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {

    $user = User::findOrFail($id);

    // Check that the hash belongs to this user's email
    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json([
            'message' => 'Invalid verification link.'
        ], 403);
    }

    // Already verified
    if ($user->hasVerifiedEmail()) {
        return redirect('http://localhost:5173/email-verified');
    }

    // Mark email as verified
    $user->markEmailAsVerified();

    return redirect('http://localhost:5173/email-verified');

})->middleware('signed')
  ->name('verification.verify');