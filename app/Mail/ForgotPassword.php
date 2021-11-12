<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $details;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $new_password = Str::random(10);

        $user = User::firstWhere('email', $request->email);
        $user->password = Hash::make($new_password);
        $user->save();

        $this->details = [
            'title' => 'Mail from Chat Corp',
            'body' => $request->email,
            'password' => $new_password,

        ];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Test mail from Chat Corp')
                    ->view('emails.forgotpassword');
    }
}
