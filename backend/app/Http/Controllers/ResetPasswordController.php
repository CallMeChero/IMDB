<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request) {
        if(!$this->ValidateEmail($request->email)) {
            return $this->faliedResponse();
        }

        $this->send($request->email);
        return $this->successResponse();
    }

    public function send($email) {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email) {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if($oldToken) {
            return $oldToken->token;
        }
        $token = str_random(60);
        $this->savePasswordResetToken($token, $email);
        return $token;
    }

    public function savePasswordResetToken($token, $email) {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function ValidateEmail($email) {
        return !!User::where('email', $email)->first();
    }

    public function faliedResponse() {
        return response()->json([
            'error' => 'Email doesn\'t exist in database'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse() {
        return response()->json([
            'data' => 'Reset email is sent. Check your mailbox'
        ], Response::HTTP_OK);   
    }
}
