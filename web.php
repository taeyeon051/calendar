<?php

use Calendar\App\Route;

Route::get('/', 'MainController@index');

if (__SESSION) {
    Route::get('/user/logout', 'UserController@logout');

    // schedule
    Route::post('/get/schedule', 'MainController@getSchedule');
    Route::post('/set/schedule', 'MainController@setSchedule');
    Route::post('/get/userData', 'UserController@getUserData');

    Route::post('/schedule/modify', 'MainController@scheduleModify');
    Route::post('/schedule/delete', 'MainController@scheduleDelete');
} else {
    Route::get('/user/register', 'UserController@registerPage');
    Route::post('/user/register', 'UserController@registerProcess');
    Route::get('/user/login', 'UserController@loginPage');
    Route::post('/user/login', 'UserController@loginProcess');

    // form 입력 값 체크
    Route::post('/user/login/check', 'FormCheckController@loginCheck');
    Route::post('/user/reg/idCheck', 'FormCheckController@registerIdCheck');
    Route::post('/user/reg/check', 'FormCheckController@registerCheck');
}