<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\alertController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\documentController;
use App\Http\Controllers\tagController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\JobTitleController;
use App\Http\Controllers\GovernorateController;
use App\Http\Controllers\CityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('Routes', function () {
    $routeCollection = Route::getRoutes();

    echo "<table style='width:100%'>";
    echo "<tr>";
    echo "<td width='10%'><h4>HTTP Method</h4></td>";
    echo "<td width='10%'><h4>Route</h4></td>";
    echo "<td width='10%'><h4>Name</h4></td>";
    echo "<td width='70%'><h4>Corresponding Action</h4></td>";
    echo "</tr>";
    foreach ($routeCollection as $value) {
        echo "<tr>";
        echo "<td>" . $value->methods()[0] . "</td>";
        echo "<td>" . $value->uri() . "</td>";
        echo "<td>" . $value->getName() . "</td>";
        echo "<td>" . $value->getActionName() . "</td>";
        echo "</tr>";
    }
    echo "</table>";
});
Route::resource('Clients', ClientController::class);
Route::get('/Clients/ShowComment/{id}', [ClientController::class, 'showComment']);
Route::get('/Clients/showVerifiedRequest/{id}', [ClientController::class, 'showVerifiedRequest']);
Route::post('/Clients/Login', [ClientController::class, 'Login']);
Route::put('/Clients/UpdateCustom/{id}', [ClientController::class, 'UpdateCustom']);
Route::put('/Clients/ChangePassword/{id}', [ClientController::class, 'ChangePassword']);
Route::resource('Comments', commentController::class);
Route::put('/Comments/ReportComment/{id}', [commentController::class, 'ReportComment']);
Route::put('/Comments/ReportIgnore/{id}', [commentController::class, 'ReportIgnore']);
Route::resource('Documents', documentController::class);
Route::resource('Tags', tagController::class);
Route::resource('Alerts', alertController::class);
Route::resource('Jobs', JobsController::class);
Route::resource('JobsTitle', JobTitleController::class);
Route::resource('Governorates', GovernorateController::class);
Route::resource('Cities', CityController::class);
Route::resource('Accounts', AccountsController::class);
