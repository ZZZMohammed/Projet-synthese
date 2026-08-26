<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;


class UserController extends Controller
{

     public function index()
    {
        return response()->json([
            'users' => User::latest()->paginate(10),
            'message' => 'Users retrieved successfully'
        ]);
    }

    

    // login 
    
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    if (!$user->hasVerifiedEmail()) {
        return response()->json([
            'message' => 'Please verify your email before logging in.',
            'email_verified' => false
        ], 403);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user,
        'email_verified' => true
    ]);
}

   public function register(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
        'role' => 'nullable|string|in:admin,patient',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role ?? 'patient',
    ]);

    // Send email verification
    event(new Registered($user));

    return response()->json([
        'message' => 'Registration successful. Please check your email.',
        'user' => $user,
    ], 201);
}



    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function profile(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
            'message' => 'Profile retrieved successfully'
        ]);
    }



}

