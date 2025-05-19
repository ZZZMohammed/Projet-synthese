<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        // Check if the user is logged in and has the correct role
        if ($request->user() && $request->user()->role === $role) {
            return $next($request); // Allow the request to proceed
        }

        // If the role doesn't match, return an Unauthorized response
        return response()->json(['message' => 'Unauthorized.'], 403);
    }
}
