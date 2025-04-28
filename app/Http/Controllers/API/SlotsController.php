<?php

namespace App\Http\Controllers\API;

use App\Models\Slot;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SlotsController extends Controller
{
    public function index(){

        $times = Slot::orderBy('date')->orderBy('time')->get() ;
        return response()->json($times) ;
    }
}
