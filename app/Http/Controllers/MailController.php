<?php

namespace App\Http\Controllers;

use App\Http\Requests\MailCheckRequest;
use App\Mail\ForgotPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function forgotPassword(MailCheckRequest $request) {

        Mail::to($request->email)->send(new ForgotPassword($request));

    }

}
