<?php

namespace App\Http\Controllers;

use App\Mail\ForgotPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function forgotPassword(Request $request) {

        Mail::to($request->email)->send(new ForgotPassword($request));

    }

}
