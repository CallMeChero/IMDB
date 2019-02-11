<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request) {
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFound();
    }

    private function getPasswordResetTableRow($request) {
        return DB::table('password_resets')
                    ->where([
                        'email' => $request->email,
                        'token' => $request->reset_token
                        ]);
    }

    private function changePassword($request) {
        DB::table('users')
            ->where('email', $request->email)
            ->update(['password' => bcrypt($request->password)]);

        $this->getPasswordResetTableRow($request)->delete();

        return response()->json(
            [
                'data' => 'Password successfully changed'
            ], Response::HTTP_CREATED);
    }

    private function tokenNotFound() {
        return response()->json(
            [
                'error' => 'Email or token missmatch.'
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
