<?php

namespace App\Http\Controllers;

use App\Models\Accounts;
use App\Http\Requests\StoreAccountsRequest;
use App\Http\Requests\UpdateAccountsRequest;

class AccountsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Accounts::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAccountsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAccountsRequest $request)
    {
        $Account =  Accounts::create($request->all());
        return response()->json($Account, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Accounts  $accounts
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Account = Accounts::where('id', '=', $id)->get();
        return response()->json($Account, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAccountsRequest  $request
     * @param  \App\Models\Accounts  $accounts
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAccountsRequest $request, $id)
    {
        $Account = Accounts::findOrFail($id);
        $Account ->update($request->all());
        return response()->json($Account, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Accounts  $accounts
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Account = Accounts::findOrFail($id);
        $Account->delete();
        return response()->json(null, 204);
    }
}
