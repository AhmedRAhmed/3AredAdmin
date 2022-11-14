<?php

namespace App\Http\Controllers;

use App\Models\alert;
use App\Http\Requests\StorealertRequest;
use App\Http\Requests\UpdatealertRequest;

class AlertController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return alert::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorealertRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorealertRequest $request)
    {
        $alert =  alert::create($request->all());
        return response()->json($alert, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\alert  $alert
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $alert = alert::where('id', '=', $id)->get();
        return response()->json($alert, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\alert  $alert
     * @return \Illuminate\Http\Response
     */
    public function edit(alert $alert)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatealertRequest  $request
     * @param  \App\Models\alert  $alert
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatealertRequest $request, $id)
    {
        $alert = alert::findOrFail($id);
        $alert ->update($request->all());
        return response()->json($alert, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\alert  $alert
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $alert = alert::findOrFail($id);
        $alert->delete();
        return response()->json(null, 204);
    }
}
