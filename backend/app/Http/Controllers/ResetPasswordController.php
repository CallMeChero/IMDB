<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;

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
        Mail::to($email)->send(new ResetPasswordMail);
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
