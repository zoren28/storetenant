<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Registration disabled
Auth::routes(['register' => false]);

// Landing Page
Route::get('/', 'LandingPageController@index');

// Authenticated Users Only Routes
Route::middleware('auth')->group(function () {

    Route::prefix('menu')->group(function () {

        Route::get('project_menu', 'FdMenuController@show');
    });

    Route::prefix('product')->group(function () {

        Route::get('details/{product_id}', 'FdProductController@retrieveProductDetails');
        Route::get('fetch_product_list', 'FdProductController@show');
        Route::get('fetch_product_type', 'FdCategoryController@fetch_product_type');
        Route::get('fetch_addons', 'FdAddonController@fetch_addons');
        Route::get('fetch_unit_measures', 'FdUomController@fetch_unit_measures');
        Route::get('fetch_flavors', 'FdFlavorController@fetch_flavors');
        Route::get('fetch_cooking_ways', 'FdCookingWayController@show');
        Route::get('fetch_sauce_types', 'FdSauceTypeController@show');
        Route::get('fetch_drinks', 'FdProductController@fetch_drinks');
        Route::get('fetch_fries', 'FdProductController@fetch_fries');
        Route::get('fetch_choice_sides', 'FdProductController@fetch_choice_sides');
        Route::get('fetch_addon_drinks', 'FdProductController@fetch_addon_drinks');
        Route::get('fetch_addon_sides', 'FdProductController@fetch_addon_sides');
        Route::get('fetch_dessert', 'FdProductController@fetch_dessert');
        Route::get('fetch_upgradable_item', 'FdProductController@fetch_upgradable_item');
        Route::get('fetch_location_range', 'FdProductController@fetch_location_range');
        Route::get('fetch_product_details/{id}', 'FdProductController@fetch_product_details');
        Route::get('fetch_all_product_details/{id}', 'FdProductController@fetch_all_product_details');
        Route::get('fetch_item_product_list/{id}', 'FdProductController@fetch_item_product_list');
        Route::get('fetch_drinks_list/{filter}', 'FdProductController@fetch_drinks_list');
        Route::get('fetch_fries_list/{filter}', 'FdProductController@fetch_fries_list');
        Route::get('fetch_product_choice/{any}/{filter}', 'FdProductController@fetch_product_choice');
        Route::get('fetch_addon_sides_list/{any}/{filter}', 'FdProductController@fetch_addon_sides_list');
        Route::get('fetch_addon_dessert_list/{filter}', 'FdProductController@fetch_addon_dessert_list');
        Route::get('fetch_product_price_details/{product_id}/{id}', 'FdProductController@fetch_product_price_details');
        Route::put('update_product_stock', 'FdProductController@update_product_stock');
        Route::put('remove_choice_drink', 'FdProductController@remove_choice_drink');
        Route::put('remove_choice_fries', 'FdProductController@remove_choice_fries');
        Route::put('remove_choice_sides', 'FdProductController@remove_choice_sides');
        Route::put('remove_addon_sides', 'FdProductController@remove_addon_sides');
        Route::put('remove_addon_dessert', 'FdProductController@remove_addon_dessert');
        Route::post('update_availability', 'FdProductController@update_availability');
        Route::post('update_status', 'FdProductController@update_status');
        Route::post('saved_product_details', 'FdProductController@store');
        Route::post('saved_all_product_details', 'FdProductController@saved_all_product_details');
        Route::post('update_product_details', 'FdProductController@update_product_details');
        Route::post('update_all_product_details', 'FdProductController@update_all_product_details');
        Route::post('add_choice_drink', 'FdProductController@add_choice_drink');
        Route::post('add_choice_fries', 'FdProductController@add_choice_fries');
        Route::post('add_choice_sides', 'FdProductController@add_choice_sides');
        Route::post('add_addon_sides', 'FdProductController@add_addon_sides');
        Route::post('add_addon_dessert', 'FdProductController@add_addon_dessert');
        Route::delete('delete_product/{any}/{id}', 'FdProductController@delete_product');
    });

    Route::prefix('category')->group(function () {

        Route::get('fetch_category_list', 'FdCategoryController@fetch_category_list');
        Route::get('fetch_category_details/{category_id}', 'FdCategoryController@fetch_category_details');
        Route::post('update_status', 'FdCategoryController@update_status');
        Route::post('add_category', 'FdCategoryController@add_category');
        Route::post('update_category', 'FdCategoryController@update_category');
    });

    Route::prefix('tenantuser')->group(function () {

        Route::get('fetch_tenant_user_list', 'TenantUserController@show');
        Route::get('fetch_username', 'TenantUserController@fetch_username');
        Route::get('fetch_tenant_user_details/{tenantId}', 'TenantUserController@fetch_tenant_user_details');
        Route::put('update_status', 'TenantUserController@update_status');
        Route::post('update_tenant_user', 'TenantUserController@update_tenant_user');
        Route::post('add_tenant_user', 'TenantUserController@add_tenant_user');
    });

    Route::prefix('schedule')->group(function () {

        Route::get('fetch_pickup_schedule', 'PickUpScheduleController@show');
        Route::get('fetch_pickup_schedule_details/{id}', 'PickUpScheduleController@fetch_pickup_schedule_details');
        Route::get('server_date', 'PickUpScheduleController@server_date');
        Route::put('pickup_status', 'PickUpScheduleController@update');
        Route::put('update_pickup_schedule_details', 'PickUpScheduleController@update_pickup_schedule_details');
        Route::post('add_pickup_schedule_details', 'PickUpScheduleController@add_pickup_schedule_details');
    });

    Route::prefix('unit_measure')->group(function () {

        Route::get('fetch_unit_measure', 'FdUomController@show');
        Route::get('fetch_unit_measure_details/{id}', 'FdUomController@fetch_unit_measure_details');
        Route::put('change_status', 'FdUomController@update');
        Route::post('update_unit_measure', 'FdUomController@update_unit_measure');
        Route::post('add_unit_measure', 'FdUomController@add_unit_measure');
    });

    Route::prefix('flavor')->group(function () {

        Route::get('fetch_flavor_types', 'FdFlavorController@show');
        Route::get('fetch_flavor_details/{id}', 'FdFlavorController@fetch_flavor_details');
        Route::put('change_status', 'FdFlavorController@update');
        Route::post('update_flavor', 'FdFlavorController@update_flavor');
        Route::post('add_flavor', 'FdFlavorController@add_flavor');
    });

    Route::prefix('discount')->group(function () {

        Route::get('discount_lists', 'DiscountListController@discount_lists');
        Route::get('fetch_approved_discount/{any}', 'CustomerDiscountStatusController@fetch_approved_discount');
    });

    Route::prefix('suggestion')->group(function () {

        Route::get('fetch_suggestion_list', 'FdSuggestionController@show');
        Route::get('fetch_suggestion', 'FdProductSuggestionController@fetch_suggestion');
        Route::get('fetch_product_suggestion', 'FdProductSuggestionController@fetch_product_suggestion');
        Route::get('fetch_suggestion_details/{id}', 'FdProductSuggestionController@fetch_suggestion_details');
        Route::get('get_suggestion_details/{id}', 'FdSuggestionController@get_suggestion_details');
        Route::get('fetch_active_suggestions', 'FdProductSuggestionController@fetch_active_suggestions');
        Route::put('change_status', 'FdProductSuggestionController@change_status');
        Route::post('update_suggestion', 'FdProductSuggestionController@update_suggestion');
        Route::post('add_suggestion', 'FdProductSuggestionController@add_suggestion');
        Route::post('insert_suggestion', 'FdSuggestionController@store');
        Route::post('edit_suggestion', 'FdSuggestionController@edit_suggestion');
        Route::delete('delete_suggestion/{any}', 'FdProductSuggestionController@destroy');
    });

    Route::prefix('container')->group(function () {

        Route::get('fetch_container_type', 'FdContainerTypeController@show');
        Route::get('fetch_container_type_details/{id}', 'FdContainerTypeController@fetch_container_type_details');
        Route::get('fetch_active_container_type', 'FdContainerTypeController@fetch_active_container_type');
        Route::put('change_status', 'FdContainerTypeController@update');
        Route::post('update_container_type', 'FdContainerTypeController@update_container_type');
        Route::post('add_container_type', 'FdContainerTypeController@add_container_type');
    });

    Route::prefix('order')->group(function () {

        Route::post('single_store', 'TomsCustomerOrderController@addCustomerSingleOrder');
        Route::get('product/{product_id}', 'FdProductController@getProductDetails');
        Route::get('view/{order_id}', 'TomsCustomerOrderController@getProductOrders');
        Route::get('fetch_transaction_list', 'TomsCustomerOrderController@fetch_transaction_list');
        Route::get('fetch_delivery_order', 'TomsCustomerOrderController@fetch_delivery_order');
        Route::get('customer/{ticket}', 'TomsCustomerOrderController@customerOrders');
        Route::get('customer_history/{ticket}', 'TomsCustomerOrderController@customer_order_history');
        Route::get('server_datetime', 'TomsCustomerOrderController@server_datetime');
        Route::get('server_datetime_plus', 'TomsCustomerOrderController@server_datetime_plus');
        Route::get('fetch_advance_order', 'TomsCustomerOrderController@fetch_advance_order');
        Route::get('fetch_product_details/{order_id}/{product_id}', 'TomsCustomerOrderController@fetch_product_details');
        Route::get('fetch_request_discounts/{ticket_id}', 'TomsCustomerOrderController@fetch_request_discounts');
        Route::get('delivery_charge/{param}', 'TomsCustomerOrderController@delivery_charge');
        Route::put('single_update/{order_id}', 'TomsCustomerOrderController@orderSingleUpdate');
        Route::put('cancel_item', 'TomsCustomerOrderController@cancel_item');
        Route::put('cancel_ticket', 'TomsCustomerOrderController@cancel_ticket');
        Route::put('update_product_availability', 'TomsCustomerOrderController@update_product_availability');
        Route::put('update_for_preparing', 'TomsCustomerOrderController@update_for_preparing');
        Route::put('approve_disapprove_discount', 'CustomerDiscountStatusController@store');
        Route::post('change_item_quantity', 'TomsCustomerOrderController@change_item_quantity');
        Route::post('change_item', 'TomsCustomerOrderController@change_item');
        Route::post('tag_for_pickup', 'TomsCustomerOrderController@tag_for_pickup');
        Route::post('tfp_electronic', 'TomsCustomerOrderController@tfp_electronic');
        Route::post('add_order', 'TomsCustomerOrderController@add_order');
        Route::post('first_entry', 'TomsCustomerOrderController@first_entry');
        Route::post('update_item_status', 'TomsCustomerOrderController@update_item_status');
        Route::post('check_order', 'TomsCustomerOrderController@check_order');
        Route::post('fetch_customer_bill', 'TomsCustomerOrderController@fetch_customer_bill');
        Route::post('update_customer_bill', 'TomsCustomerOrderController@update_customer_bill');
        Route::post('update_discount_amt', 'TomsCustomerOrderController@update_discount_amt');
        Route::post('update_unit_price', 'TomsCustomerOrderController@update_unit_price');
        Route::post('check_time', 'TomsCustomerOrderController@check_time');
    });

    Route::prefix('advance_order')->group(function () {

        Route::get('fetch_advance_delivery', 'TomsCustomerOrderController@fetch_advance_delivery');
        Route::get('fetch_advance_pickup', 'TomsCustomerOrderController@fetch_advance_pickup');
    });

    Route::prefix('pickup_order')->group(function () {

        Route::get('fetch_pickup_transaction_list', 'TomsCustomerOrderController@fetch_pickup_transaction_list');
        Route::get('fetch_pickup_order', 'TomsCustomerOrderController@fetch_pickup_order');
        Route::post('tag_for_pickup', 'TomsTagRiderController@tag_for_pickup');
    });

    Route::prefix('pickup')->group(function () {

        Route::get('fetch_for_pickup_list', 'TomsCustomerOrderController@fetch_for_pickup_list');
        Route::post('tag_for_in_transit', 'TomsTagRiderController@tag_for_in_transit');
    });

    Route::prefix('rider_accountability')->group(function () {

        Route::get('fetch_delivered_order_list/{filterDate}', 'TomsCustomerOrderController@fetch_delivered_order_list');
        Route::get('server_date', 'TomsTagRiderController@server_date');
        Route::post('tag_for_successfully_delivered', 'TomsTagRiderController@tag_for_successfully_delivered');
    });

    Route::prefix('remittance_monitoring')->group(function () {

        Route::get('fetch_successfully_deliver_order', 'TomsCustomerOrderController@fetch_successfully_deliver_order');
        Route::post('collect_refund', 'TomsTagRiderController@collect_refund');
    });

    Route::prefix('pickup_payment_monitoring')->group(function () {

        Route::get('fetch_pickup_payment', 'TomsCustomerOrderController@fetch_pickup_payment');
        Route::post('payment_order', 'TomsTagRiderController@payment_order');
    });

    Route::prefix('unsettled_balance')->group(function () {

        Route::get('fetch_remittance_balance', 'TomsCustomerOrderController@fetch_remittance_balance');
    });

    Route::prefix('report')->group(function () {

        Route::get('fetch_sales_report/{date_from}/{date_to}', 'FdSalesDetailController@fetch_sales_report');
        Route::get('fetch_transaction_report/{date_from}/{date_to}', 'TomsTagRiderController@fetch_transaction_report');
        Route::get('fetch_undeliver_transaction/{date_from}/{date_to}', 'TomsTagRiderController@fetch_undeliver_transaction');
        Route::get('fetch_best_items/{date_from}/{date_to}', 'TomsCustomerOrderController@fetch_best_items');
    });

    Route::prefix('tenant')->group(function () {

        Route::get('fetch_tenant_details', 'LocateTenantController@fetch_tenant_details');
    });

    Route::prefix('vehicle')->group(function () {

        Route::get('vehicle_list', 'GcTransportationController@show');
        Route::get('count_rider/{id}', 'GcTransportationController@count_rider');
    });

    Route::prefix('setup')->group(function () {

        Route::get('fetch_user_profile/{id}', 'TenantUserController@fetch_user_profile');
        Route::post('change_password', 'TenantUserController@change_password');
        Route::post('change_username', 'TenantUserController@change_username');
        Route::post('change_basic_info', 'TenantUserController@change_basic_info');
        Route::post('change_profile_picture', 'TenantUserController@change_profile_picture');
        Route::post('change_default_password', 'TenantUserController@change_default_password');
    });

    Route::prefix('import')->group(function () {

        Route::post('product_masterfile', 'FdProductController@import_product_masterfile');
        Route::post('category_pictures', 'FdProductController@import_category_pictures');
        Route::post('product_pictures', 'FdProductController@import_product_pictures');
    });

    Route::get('force_change_password', 'TenantUserController@force_change_password');
});

Route::middleware('auth')->get('{any}', 'HomeController@index')->where('any', '.*');
