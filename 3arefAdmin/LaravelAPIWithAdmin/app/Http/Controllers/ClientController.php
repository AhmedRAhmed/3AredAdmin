<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use App\Models\alert;
use App\Models\comment;
use App\Models\document;
use App\Models\tag;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Client::all();
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function showVerifiedRequest($id)
    {
        $Client = Client::where('Verified', '=', $id)->get();
        $R = [];
        foreach ($Client as $C) {
            $AllDocumentsClient = DB::table('documents')
                ->where('PersonId', $C->id)
                ->where('Type', 1)
                ->get();
                if (count($AllDocumentsClient)>0) {
                    array_push($R, ['Client' => $C, 'Documents' => $AllDocumentsClient]);
                }
        }
        return response()->json($R,200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClientRequest $request)
    {
        $Client =  Client::create($request->all());
        return response()->json($Client, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Client = Client::find($id);
        $AllCommentClient = comment::where('comments.PersonId', '=', $id)->get();
        $AllTagsClient = tag::where('tags.PersonId', '=', $id)->get();
        $AllDocumentsClient = document::where('documents.PersonId', '=', $id)->get();
        $AllAlertsClient = alert::where('alerts.PersonId', '=', $id)->get();

        return response()->json(array(
            'Client' => $Client,
            'Comments' => $AllCommentClient,
            'Tags' => $AllTagsClient,
            'Documents' => $AllDocumentsClient,
            'Alerts' => $AllAlertsClient,
        ), 200);
    }


    public function showComment($id)
    {
        $Client = Client::where('id', '=', $id)->get();
        return response()->json(array(
            'FullName' => $Client[0]["FullName"],
            'ProfilePhoto' => $Client[0]["ProfilePhoto"]
        ), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function Login(StoreClientRequest $request)
    {
        $Phone = $request->input('Phone');
        $Password = $request->input('Password');
        $Client = DB::table('clients')
            ->where('Phone', $Phone)
            ->where('Password', $Password)
            ->get();
        if (!$Client->isEmpty()) {
            return response()->json($Client, 200);
        } else {
            return response()->json($Client, 404);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClientRequest  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClientRequest $request, $id)
    {
        $Client = Client::findOrFail($id);
        $Client->update($request->all());
        return response()->json($Client, 200);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClientRequest  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function UpdateCustom(UpdateClientRequest $request, $id)
    {
        $Client1 = Client::findOrFail($id);
        $Client = DB::table('clients')
            ->where('id', $id)
            ->update([$request->input(('T')) => $Client1[$request->input(('T'))] + 1]);
        return response()->json($Client1, 200);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClientRequest  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function ChangePassword(UpdateClientRequest $request, $id)
    {
        $Client1 = Client::where('id', '=', $id)->get();
        $Client = DB::table('clients')
            ->where('id', $id)
            ->where('Password', $request->input(('OldPassword')))
            ->update(['Password' => $request->input(('Password'))]);
        return response()->json($Client, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Client = Client::findOrFail($id);
        $Client->delete();
        return response()->json(null, 204);
    }
}
