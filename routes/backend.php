<?php

Route::get('/{any?}', function () {
    return view('backend.app');
})->where('any', '^(?!api).*$');