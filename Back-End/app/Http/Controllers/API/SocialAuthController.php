<?php


namespace App\Http\Controllers\API;  
use App\Http\Controllers\Controller;  
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

  public function handleGoogleCallback()
{
    $googleUser = Socialite::driver('google')
        ->stateless()
        ->user();

    $user = User::where('google_id', $googleUser->id)->first();

    if (!$user) {
        $user = User::create([
            'name' => $googleUser->name,
            'email' => $googleUser->email,
            'google_id' => $googleUser->id,
            'avatar' => $googleUser->avatar,
            'role' => 'patient',
        ]);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
}
}