<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use PhpParser\Node\Stmt\TryCatch;

class UserController extends Controller
{
    public function purchase(Request $request)
    {
    //    return $request->all();

       $user = User::firstOrCreate([
            'email' => $request->input('email')
       ],[
            'name' => $request->input('first_name').' '.$request->input('last_name'),
            'password' => bcrypt('password')
       ]);

       try {
           $payment = $user->charge(
                (int)$request->input('amount') * 100,
                $request->input('payment_method_id')
           );

           $payment = $payment->asStripePaymentIntent();
           $order = $user->orders()
                        ->create([
                            'transaction_id' => $payment->charges->data[0]->id,
                            'total' => ($payment->charges->data[0]->amount) / 100
                        ]);
            foreach ($request->input('cart') as $item) {
                $order->products()
                    ->attach($item['id'], ['quantity' => $item['quantity']]);
            }

            return response()->json($order->load('products'), 200);
       } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
       }
    }
}
