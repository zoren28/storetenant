<?php

namespace App\Http\Controllers;

use App\CustomerBill;
use App\CustomerDiscount;
use App\CustomerDiscountedAmount;
use App\CustomerDiscountStatus;
use App\CustomerOrderHistory;
use App\DiscountList;
use App\Events\ForPickUp;
use App\Events\ForPreparing;
use App\Events\ItemReadyForPickUp;
use App\Events\SubmitOrder;
use App\FdContainerTypeDetail;
use App\FdCustomerOrderDetail;
use App\FdProduct;
use App\FdProductPrice;
use App\FdVtypeSuggestion;
use App\Gc_Transportation;
use App\GcVtypeSuggestion;
use App\LocateTenant;
use App\TblDeliveryCharge;
use App\TenantUser;
use App\Ticket;
use App\TomsCustomerOrder;
use App\TomsCustomerOrderAddon;
use App\TomsCustomerOrderAddonHistory;
use App\TomsCustomerOrderChoice;
use App\TomsCustomerOrderChoiceHistory;
use App\TomsCustomerOrderFlavor;
use App\TomsCustomerOrderFlavorHistory;
use App\TomsCustomerOrderSuggestion;
use App\TomsCustomerOrderSuggestionHistory;
use ArrayObject;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TomsCustomerOrderController extends Controller
{
    use SoftDeletes;
    public $now;

    public function __construct()
    {
        $this->middleware('auth');

        $this->now = Carbon::now(config('app.timezone'))->toDateTimeString();

        // date_default_timezone_set('Asia/Manila');
        // $this->now = date('Y-m-d H:i:s');
    }

    public function calculateProductPriceWithAddOns(object $request, $quantity)
    {
        $total_price = 0;
        $product_price = $request->cSize['price'];
        $calculateAddOns = function ($addOn) {
            $price = 0;

            if (is_array($addOn) === true) {
                foreach ($addOn as $addon) {
                    if (count($addon) > 0) {
                        $price += (float) $addon['price'];
                    }
                }

                return $price;
            }

            return (float) $addOn;
        };

        $suggestions = $request->suggestions;

        // Will only add the selected suggestion if the product does not require grams
        // It means that if there's no grams or is set to 0 in the request, that's the time we will add it's selected suggestion price
        if ($request->gram === 0 && count($suggestions) > 0) {
            foreach ($suggestions as $suggestion_id => $suggestion) {
                $suggestionPrice = $suggestion['addon_price'];

                $total_price += $calculateAddOns($suggestionPrice);
            }
        }

        $choicePrices = [];

        $choicePrices[] = $product_price ? $product_price : 0;
        $choicePrices[] = $request->upgradableItems['price'] ? $request->upgradableItems['price'] : 0;
        $choicePrices[] = $request->cDrink['price'] ? $request->cDrink['price'] : 0;
        $choicePrices[] = $request->cSide['price'] ? $request->cSide['price'] : 0;
        $choicePrices[] = $request->cFry['price'] ? $request->cFry['price'] : 0;

        if (count($choicePrices) > 0) {
            foreach ($choicePrices as $price) {
                $total_price += $calculateAddOns($price);
            }
        }

        $drinks_prices = $request->aDrinks;

        if (count($drinks_prices) > 0) $total_price += $calculateAddOns($drinks_prices);

        $sides_prices = $request->aSides;

        if (count($sides_prices) > 0) $total_price += $calculateAddOns($sides_prices);

        $desserts_price = $request->aDesserts;

        if (count($desserts_price) > 0) $total_price += $calculateAddOns($desserts_price);

        // return $total_price * $quantity;
        return ['product_price' => $product_price, 'total_price' => $total_price * $quantity];
    }
    // {
    //     $total_price = 0;
    //     $product_price = $request->cSize['price'];
    //     $total_price += $product_price ? (float) $product_price : 0;
    //     $suggestions = $request->suggestions;

    //     foreach ($suggestions as $suggestion_id => $suggestion) {
    //         $total_price += floatval($suggestion['addon_price']);
    //     }

    //     $total_price += $request->cDrink['price'] ? (float) $request->cDrink['price'] : 0;

    //     $total_price += $request->cSide['price'] ? (float) $request->cSide['price'] : 0;

    //     $total_price += $request->cFry['price'] ? (float) $request->cFry['price'] : 0;

    //     $total_price += $request->upgradableItems['price'] ? (float) $request->upgradableItems['price'] : 0;

    //     $drinks_prices = $request->aDrinks;
    //     if (count($drinks_prices)) {
    //         foreach ($drinks_prices as $side) {
    //             if ($side) {
    //                 $total_price += (float) $side['price'];
    //             }
    //         }
    //     }

    //     $sides_prices = $request->aSides;

    //     if (count($sides_prices)) {
    //         foreach ($sides_prices as $side) {
    //             if ($side) {
    //                 $total_price += (float) $side['price'];
    //             }
    //         }
    //     }

    //     $desserts_price = $request->aDesserts;

    //     if (count($desserts_price)) {
    //         foreach ($desserts_price as $dessert) {
    //             if ($dessert) {
    //                 $total_price += (float) $dessert['price'];
    //             }
    //         }
    //     }

    //     return ['product_price' => $product_price, 'total_price' => $total_price * $quantity];
    // }

    public function orderSingleUpdate($order_id, Request $request)
    {
        DB::transaction(function () use ($order_id, $request) {

            $order = TomsCustomerOrder::find($order_id);
            $quantity = $request->quantity;
            $uom_id   = $request->cSize['uomId'];
            $price = $this->calculateProductPriceWithAddOns($request, $quantity);

            $order->update([
                'uom_id'      => $uom_id,
                'quantity'    => $quantity,
                'product_price' => $price['product_price'],
                'total_price' => $price['total_price']
            ]);

            TomsCustomerOrderSuggestion::where('order_id', $order_id)->delete();

            $suggestions = $request->suggestions;

            foreach ($suggestions as $suggestion_id => $suggestion) {
                TomsCustomerOrderSuggestion::create([
                    'order_id'              => $order->id,
                    'suggestion_id'         => $suggestion_id,
                    'product_suggestion_id' => $suggestion['product_suggestion_id'],
                    'addon_price'           => $suggestion['addon_price'],
                ]);
            }

            $drink_choice = $request->cDrink;

            TomsCustomerOrderChoice::where([['order_id', $order_id], ['choice_drinks', 1]])->delete();

            if ($drink_choice['productId']) {

                TomsCustomerOrderChoice::create([
                    'order_id'      => $order->id,
                    'choice_id'     => $drink_choice['productId'],
                    'uom_id'        => $drink_choice['uomId'],
                    'choice_drinks' => 1,
                    'addon_price'   => $drink_choice['price'],
                ]);
            }

            $side_choice = $request->cSide;

            TomsCustomerOrderChoice::where([['order_id', $order_id], ['choice_sides', 1]])->delete();
            if ($side_choice['productId']) {

                TomsCustomerOrderChoice::create([
                    'order_id'     => $order->id,
                    'choice_id'    => $side_choice['productId'],
                    'uom_id'       => $side_choice['uomId'],
                    'choice_sides' => 1,
                    'addon_price'  => $side_choice['price'],
                ]);
            }

            $fry_choice = $request->cFry;

            TomsCustomerOrderChoice::where([['order_id', $order_id], ['choice_fries', 1]])->delete();
            if ($fry_choice['productId']) {

                TomsCustomerOrderChoice::create([
                    'order_id'     => $order->id,
                    'choice_id'    => $fry_choice['productId'],
                    'uom_id'       => $fry_choice['uomId'],
                    'choice_fries' => 1,
                    'addon_price'  => $fry_choice['price'],
                ]);
            }

            // newly add module for upgradable items
            $upgrade_choice = $request->upgradableItems;
            if ($request->upgradableItems['productId'] !== null) {

                TomsCustomerOrderAddon::where([['order_id', $order_id], ['upgradable_item', 1]])->delete();
                if (count($upgrade_choice) !== 0 && count($upgrade_choice) !== 1) {

                    TomsCustomerOrderAddon::create([
                        'order_id'     => $order->id,
                        'addon_id'    => $upgrade_choice['productId'],
                        'uom_id'       => $upgrade_choice['uomId'],
                        'upgradable_item' => 1,
                        'addon_price'  => $upgrade_choice['price'],
                    ]);
                } else {

                    foreach ($upgrade_choice as $upgrade) {
                        TomsCustomerOrderAddon::create([
                            'order_id'     => $order->id,
                            'addon_id'     => $upgrade['productId'],
                            'uom_id'       => $upgrade['uomId'],
                            'upgradable_item' => 1,
                            'addon_price'  => $upgrade['price'],
                        ]);
                    }
                }
            }

            $drinks_addons = $request->aDrinks;

            TomsCustomerOrderAddon::where([['order_id', $order_id], ['addon_drinks', 1]])->delete();
            if (count($drinks_addons)) {

                foreach ($drinks_addons as $side) {
                    TomsCustomerOrderAddon::create([
                        'order_id'     => $order->id,
                        'addon_id'     => $side['productId'],
                        'uom_id'       => $side['uomId'],
                        'addon_drinks' => 1,
                        'addon_price'  => $side['price'],
                    ]);
                }
            }

            $sides_addons = $request->aSides;

            TomsCustomerOrderAddon::where([['order_id', $order_id], ['addon_sides', 1]])->delete();
            if (count($sides_addons)) {

                foreach ($sides_addons as $side) {
                    TomsCustomerOrderAddon::create([
                        'order_id'    => $order->id,
                        'addon_id'    => $side['productId'],
                        'uom_id'      => $side['uomId'],
                        'addon_sides' => 1,
                        'addon_price' => $side['price'],
                    ]);
                }
            }

            $desserts_addons = $request->aDesserts;

            TomsCustomerOrderAddon::where([['order_id', $order_id], ['addon_dessert', 1]])->delete();
            if (count($desserts_addons)) {

                foreach ($desserts_addons as $dessert) {
                    TomsCustomerOrderAddon::create([
                        'order_id'      => $order->id,
                        'addon_id'      => $dessert['productId'],
                        'uom_id'        => $dessert['uomId'],
                        'addon_dessert' => 1,
                        'addon_price'   => $dessert['price'],
                    ]);
                }
            }
        });
    }

    public function getProductOrders($order_id)
    {
        $suggestions = TomsCustomerOrderSuggestion::with(['suggestion'])->where('order_id', $order_id)->get()->groupBy('suggestion_id');

        $drinks_choices = TomsCustomerOrderChoice::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['choice_drinks', 1]])->get();

        $fries_choices = TomsCustomerOrderChoice::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['choice_fries', 1]])->get();

        $sides_choices = TomsCustomerOrderChoice::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['choice_sides', 1]])->get();

        $sizes_choices = TomsCustomerOrderChoice::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['choice_sizes', 1]])->get();

        $drinks_addons = TomsCustomerOrderAddon::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['addon_drinks', 1]])->get();

        $sides_addons = TomsCustomerOrderAddon::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['addon_sides', 1]])->get();

        $desserts_addons = TomsCustomerOrderAddon::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['addon_dessert', 1]])->get();

        return response()->json(compact('suggestions', 'drinks_choices', 'fries_choices', 'sides_choices', 'drinks_addons', 'sides_addons', 'desserts_addons', 'sizes_choices'), 200);
    }

    public function addCustomerSingleOrder(Request $request)
    {
        $hasExistingOrder = $this->hasExistingOrder($request);

        if (is_array($hasExistingOrder) && $hasExistingOrder['same'] === true && $this->hasSameOrder($hasExistingOrder['order_id'], $request)) {
            $this->updateOrder($hasExistingOrder['order_id'], $request);
        } else {
            $this->addOrder($request);
        }
    }

    public function hasSameOrder($order_id, $request)
    {
        $hasExistingOrderArray = [];

        $suggestions = TomsCustomerOrderSuggestion::where('order_id', $order_id);

        $same_suggestions = ['exists' => false, 'same' => false];

        if ($suggestions->exists()) {
            $x = [];
            foreach ($suggestions as $key => $suggestion) {
                $x[] = $suggestion->suggestion_id == array_key_exists($suggestion->suggestion_id, $request->suggestions) && $suggestion->product_suggestion_id == $request->suggestions[$suggestion->suggestion_id][1]['product_suggestion_id'];
            }
            $same_suggestions = ['exists' => true, 'same' => !in_array(false, $x)];
        }

        $hasExistingOrderArray['suggestions'] = $same_suggestions;

        $order = TomsCustomerOrder::find($order_id);

        // $same_measurement = ['exists' => false, 'same' => false];

        // if ($request->gram != 0) {

        //     $same_measurement = ['exists' => true, 'same' => false];

        //     if ($request->gram == $order->measurement) {
        //         $same_measurement = ['exists' => true, 'same' => true];
        //     }
        // }

        // $hasExistingOrderArray['measurement'] = $same_measurement;

        $upgrade = TomsCustomerOrderAddon::where([
            ['order_id', $order->id],
            ['upgradable_item', 1],
        ]);

        $upgradeExists = $upgrade->exists();

        $upgrades = $upgradeExists ? [
            'productId' => $upgrade->first()->addon_id,
            'uomId'     => $upgrade->first()->uom_id,
            'price'     => $upgrade->first()->addon_price,
        ] : [];

        $same_upgrade = ['exists' => false, 'same' => false];

        if ($upgradeExists) {
            $same_upgrade = ['exists' => true, 'same' => false];
        }

        if ($upgradeExists && $request->upgradableItems['productId']) {
            $x = [];
            foreach ($upgrades as $key => $upgrade) {
                $x[] = $request->upgradableItems[$key] == $upgrade;
            }
            $same_upgrade = ['exists' => true, 'same' => !in_array(false, $x)];
        }

        $hasExistingOrderArray['upgrade'] = $same_upgrade;

        $drink = TomsCustomerOrderChoice::where([
            ['order_id', $order_id],
            ['choice_drinks', 1],
        ]);

        $choiceDrinkExists = $drink->exists();

        $choice_drink = $choiceDrinkExists ? [
            'productId' => $drink->first()->choice_id,
            'uomId'     => $drink->first()->uom_id,
            'price'     => $drink->first()->addon_price,
        ] : [];

        $same_drink = ['exists' => false, 'same' => false];

        if ($choiceDrinkExists) {
            $same_drink = ['exists' => true, 'same' => false];
        }

        if ($choiceDrinkExists && $request->cDrink['productId']) {
            $x = [];
            foreach ($choice_drink as $key => $drink) {
                $x[] = $request->cDrink[$key] == $drink;
            }

            $same_drink = ['exists' => true, 'same' => !in_array(false, $x)];
        }

        $hasExistingOrderArray['cDrink'] = $same_drink;

        $side = TomsCustomerOrderChoice::where([
            ['order_id', $order_id],
            ['choice_sides', 1],
        ]);

        $choiceSideExists = $side->exists();

        $choice_side = $choiceSideExists ? [
            'productId' => $side->first()->choice_id,
            'uomId'     => $side->first()->uom_id,
            'price'     => $side->first()->addon_price,
        ] : [];

        $same_side = ['exists' => false, 'same' => false];

        if ($choiceSideExists) {
            $same_side = ['exists' => true, 'same' => false];
        }

        if ($choiceSideExists && $request->cSide['productId']) {
            $x = [];
            foreach ($choice_side as $key => $side) {
                $x[] = $request->cSide[$key] == $side;
            }

            $same_side = ['exists' => true, 'same' => !in_array(false, $x)];
        }

        $hasExistingOrderArray['cSide'] = $same_side;

        $fry = TomsCustomerOrderChoice::where([
            ['order_id', $order_id],
            ['choice_fries', 1],
        ]);

        $choiceFryExists = $fry->exists();

        $choice_fry = $choiceFryExists ? [
            'productId' => $fry->first()->choice_id,
            'uomId'     => $fry->first()->uom_id,
            'price'     => $fry->first()->addon_price,
        ] : [];

        $same_fry = ['exists' => false, 'same' => false];

        if ($choiceFryExists) {
            $same_fry = ['exists' => true, 'same' => false];
        }

        if ($choiceFryExists && $request->cFry['productId']) {
            $x = [];
            foreach ($choice_fry as $key => $fry) {
                $x[] = $request->cFry[$key] == $fry;
            }

            $same_fry = ['exists' => true, 'same' => !in_array(false, $x)];
        }

        $hasExistingOrderArray['cFry'] = $same_fry;

        $aSideRequests = $request->aSides;

        $same_addon_sides = ['exists' => false, 'same' => false];

        $addon_sides = TomsCustomerOrderAddon::where([
            ['order_id', $order_id],
            ['addon_sides', 1],
        ]);

        $addonSidesExists = $addon_sides->exists();

        if ($addonSidesExists) {
            $same_addon_sides = ['exists' => true, 'same' => false];
        }

        if ($addonSidesExists && $addon_sides->count() == count($aSideRequests)) {

            $filterResult = collect();

            foreach ($addon_sides->get() as $key => $side) {

                $resultCount = collect($aSideRequests)->filter(function ($req) use ($side) {
                    // DATA FROM REQUEST
                    $reqUomId     = $req['uomId'];
                    $reqProductId = $req['productId'];
                    $reqPrice     = $req['price'];

                    // DATA FROM DB
                    $dbUomId   = $side->uom_id;
                    $dbAddOnId = $side->addon_id;
                    $dbPrice   = $side->addon_price;

                    $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

                    return $sameDataREQandDB;
                })->count();

                $filterResult->push($resultCount);
            }

            $everyStatusIsOne = $filterResult->every(function ($status) {
                return $status == 1;
            });

            $same_addon_sides = ['exists' => true, 'same' => $everyStatusIsOne];
        } else if (count($aSideRequests)) {
            $same_addon_sides = ['exists' => true, 'same' => false];
        }

        $hasExistingOrderArray['aSides'] = $same_addon_sides;

        $aDessertRequest = $request->aDesserts;

        $same_addon_desserts = ['exists' => false, 'same' => false];

        $addon_desserts = TomsCustomerOrderAddon::where([
            ['order_id', $order_id],
            ['addon_dessert', 1],
        ]);

        $addonDessertsExists = $addon_desserts->exists();

        if ($addonDessertsExists) {
            $same_addon_desserts = ['exists' => true, 'same' => false];
        }

        if ($addonDessertsExists && $addon_desserts->count() == count($aDessertRequest)) {

            $filterResult = collect();

            foreach ($addon_desserts->get() as $key => $dessert) {

                $resultCount = collect($aDessertRequest)->filter(function ($req) use ($dessert) {
                    // DATA FROM REQUEST
                    $reqUomId     = $req['uomId'];
                    $reqProductId = $req['productId'];
                    $reqPrice     = $req['price'];

                    // DATA FROM DB
                    $dbUomId   = $dessert->uom_id;
                    $dbAddOnId = $dessert->addon_id;
                    $dbPrice   = $dessert->addon_price;

                    $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

                    return $sameDataREQandDB;
                })->count();

                $filterResult->push($resultCount);
            }

            $everyStatusIsOne = $filterResult->every(function ($status) {
                return $status == 1;
            });

            $same_addon_desserts = ['exists' => true, 'same' => $everyStatusIsOne];
        } else if (count($aDessertRequest)) {
            $same_addon_desserts = ['exists' => true, 'same' => false];
        }

        $hasExistingOrderArray['aDesserts'] = $same_addon_desserts;

        $aDrinkRequest = $request->aDrinks;

        $same_addon_drinks = ['exists' => false, 'same' => false];

        $addon_drinks = TomsCustomerOrderAddon::where([
            ['order_id', $order_id],
            ['addon_drinks', 1],
        ]);

        $addonDrinksExists = $addon_drinks->exists();

        if ($addonDrinksExists) {
            $same_addon_drinks = ['exists' => true, 'same' => false];
        }

        if ($addonDrinksExists && $addon_drinks->count() == count($aDrinkRequest)) {

            $filterResult = collect();

            foreach ($addon_drinks->get() as $key => $drink) {

                $resultCount = collect($aDrinkRequest)->filter(function ($req) use ($drink) {
                    // DATA FROM REQUEST
                    $reqUomId     = $req['uomId'];
                    $reqProductId = $req['productId'];
                    $reqPrice     = $req['price'];

                    // DATA FROM DB
                    $dbUomId   = $drink->uom_id;
                    $dbAddOnId = $drink->addon_id;
                    $dbPrice   = $drink->addon_price;

                    $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

                    return $sameDataREQandDB;
                })->count();

                $filterResult->push($resultCount);
            }

            $everyStatusIsOne = $filterResult->every(function ($status) {
                return $status == 1;
            });

            $same_addon_drinks = ['exists' => true, 'same' => $everyStatusIsOne];
        } else if (count($aDrinkRequest)) {
            $same_addon_drinks = ['exists' => true, 'same' => false];
        }

        $hasExistingOrderArray['aDrinks'] = $same_addon_drinks;

        $hasExistingOrderArrayResult = collect($hasExistingOrderArray)->filter(function ($collection) {
            return $collection['exists'] === true;
        });

        if ($hasExistingOrderArrayResult->isEmpty()) {
            return false;
        }

        $hasExistingOrderArrayResult = $hasExistingOrderArrayResult->every(function ($collection) {
            return $collection['same'] === true;
        });

        return $hasExistingOrderArrayResult;
    }
    // {
    //     $xy = [];

    //     // $flavor = TomsCustomerOrderFlavor::where('order_id', $order_id);

    //     $suggestions = TomsCustomerOrderSuggestion::where('order_id', $order_id);

    //     $same_suggestions = ['exists' => false, 'same' => false];

    //     if ($suggestions->exists()) {
    //         $x = [];
    //         foreach ($suggestions as $key => $suggestion) {
    //             $x[] = $suggestion->suggestion_id == array_key_exists($suggestion->suggestion_id, $request->suggestions)  && $suggestion->product_suggestion_id == $request->suggestions[$suggestion->suggestion_id][1]['product_suggestion_id'];
    //         }
    //         $same_suggestions = ['exists' => true, 'same' => !in_array(false, $x)];
    //     }

    //     $xy['suggestions'] = $same_suggestions;

    //     $drink = TomsCustomerOrderChoice::where([
    //         ['order_id', $order_id],
    //         ['choice_drinks', 1]
    //     ]);

    //     $choice_drink = $drink->exists() ? [
    //         'productId' => $drink->first()->choice_id,
    //         'uomId' => $drink->first()->uom_id,
    //         'price' => $drink->first()->addon_price
    //     ] : [];

    //     $same_drink = ['exists' => false, 'same' => false];

    //     if (count($choice_drink) && $request->cDrink['productId']) {
    //         $x = [];
    //         foreach ($choice_drink as $key => $drink) {
    //             $x[] = $request->cDrink[$key] == $drink;
    //         }

    //         $same_drink = ['exists' => true, 'same' => !in_array(false, $x)];
    //     }

    //     $xy['cDrink'] = $same_drink;

    //     // dd();

    //     $side = TomsCustomerOrderChoice::where([
    //         ['order_id', $order_id],
    //         ['choice_sides', 1]
    //     ]);

    //     $choice_side = $side->exists() ? [
    //         'productId' => $side->first()->choice_id,
    //         'uomId' => $side->first()->uom_id,
    //         'price' => $side->first()->addon_price
    //     ] : [];

    //     $same_side = ['exists' => false, 'same' => false];

    //     if (count($choice_side) && $request->cSide['productId']) {
    //         $x = [];
    //         foreach ($choice_side as $key => $side) {
    //             $x[] = $request->cSide[$key] == $side;
    //         }

    //         $same_side = ['exists' => true, 'same' => !in_array(false, $x)];
    //     }

    //     $xy['cSide'] = $same_side;

    //     // dd($xy);

    //     $fry = TomsCustomerOrderChoice::where([
    //         ['order_id', $order_id],
    //         ['choice_fries', 1]
    //     ]);

    //     $choice_fry = $fry->exists() ? [
    //         'productId' => $fry->first()->choice_id,
    //         'uomId' => $fry->first()->uom_id,
    //         'price' => $fry->first()->addon_price
    //     ] : [];

    //     $same_fry = ['exists' => false, 'same' => false];

    //     if (count($choice_fry) && $request->cFry['productId']) {
    //         $x = [];
    //         foreach ($choice_fry as $key => $fry) {
    //             $x[] = $request->cFry[$key] == $fry;
    //         }

    //         $same_fry = ['exists' => true, 'same' => !in_array(false, $x)];
    //     }

    //     $xy['cFry'] = $same_fry;


    //     // dd($xy);

    //     $upgrade = TomsCustomerOrderChoice::where([
    //         ['order_id', $order_id],
    //         ['choice_fries', 1]
    //     ]);

    //     $choice_upgrade = $upgrade->exists() ? [
    //         'productId' => $upgrade->first()->addon_id,
    //         'uomId' => $upgrade->first()->uom_id,
    //         'price' => $upgrade->first()->addon_price
    //     ] : [];

    //     $same_upgrade = ['exists' => false, 'same' => false];

    //     if (count($choice_upgrade) && $request->upgradableItems['productId']) {
    //         $x = [];
    //         foreach ($choice_upgrade as $key => $upgrade) {
    //             $x[] = $request->upgradableItems[$key] == $upgrade;
    //         }

    //         $same_upgrade = ['exists' => true, 'same' => !in_array(false, $x)];
    //     }

    //     $xy['upgradableItems'] = $same_upgrade;

    //     // dd($xy);

    //     $addon_sides = TomsCustomerOrderAddon::where([
    //         ['order_id', $order_id],
    //         ['addon_sides', 1]
    //     ]);


    //     $same_addon_sides = ['exists' => false, 'same' => false];

    //     if ($addon_sides->exists() && $addon_sides->count() == count($request->aSides)) {

    //         $a_sides = [];
    //         $x = [];

    //         foreach ($addon_sides->get() as $key => $a_side) {
    //             $a_sides[] = [
    //                 'uomId' => $a_side->uom_id,
    //                 'productId' => $a_side->addon_id,
    //                 'price' => $a_side->addon_price
    //             ];


    //             foreach ($request->aSides[$key] as $key2 => $value1) {
    //                 $x[] = $value1 == $a_sides[$key][$key2];
    //             }
    //         }

    //         $same_addon_sides = ['exists' => true, 'same' => !in_array(false, $x)];
    //     } else if (count($request->aSides)) {
    //         $same_addon_sides = ['exists' => true, 'same' => false];
    //     }

    //     $xy['aSides'] = $same_addon_sides;

    //     // dd($xy);

    //     $addon_desserts = TomsCustomerOrderAddon::where([
    //         ['order_id', $order_id],
    //         ['addon_dessert', 1]
    //     ]);

    //     $same_addon_desserts = ['exists' => false, 'same' => false];

    //     if ($addon_desserts->exists() && $addon_desserts->count() == count($request->aDesserts)) {

    //         $a_desserts = [];
    //         $x = [];

    //         foreach ($addon_desserts->get() as $key => $dessert) {
    //             $a_desserts[] = [
    //                 'uomId' => $dessert->uom_id,
    //                 'productId' => $dessert->addon_id,
    //                 'price' => $dessert->addon_price
    //             ];

    //             foreach ($request->aDesserts[$key] as $key2 => $value1) {
    //                 $x[] = $value1 == $a_desserts[$key][$key2];
    //             }
    //         }

    //         $same_addon_desserts = ['exists' => true, 'same' => !in_array(false, $x)];
    //     } else if (count($request->aDesserts)) {
    //         $same_addon_desserts = ['exists' => true, 'same' => false];
    //     }

    //     $xy['aDesserts'] = $same_addon_desserts;

    //     // dd($xy);

    //     $xyz = collect($xy)->filter(function ($x) {
    //         return $x['exists'];
    //     })->every(function ($x) {
    //         return $x['same'];
    //     });

    //     return $xyz;
    // }

    public function hasExistingOrder($request)
    {
        $ticket_id = $request->ticket_id;

        $product_id = $request->productId;

        // $uom_id = $request->cSize['uomId'];
        $uom_id = $request->uomId;

        $orders = TomsCustomerOrder::where([
            ['ticket_id', $ticket_id],
            ['product_id', $product_id],
            ['uom_id', $uom_id],
            ['canceled_status', false]
        ]);

        if ($orders->exists() === false) {
            return false;
        }

        foreach ($orders->get() as $key => $order) {
            $hasExistingOrderArray = [];

            $suggestions = TomsCustomerOrderSuggestion::where('order_id', $order->id);

            $same_suggestions = ['exists' => false, 'same' => false];

            if ($suggestions->exists()) {
                $x = [];
                foreach ($suggestions->get() as $key => $suggestion) {
                    $x[] = $suggestion->suggestion_id == array_key_exists($suggestion->suggestion_id, $request->suggestions) &&
                        $suggestion->product_suggestion_id == $request->suggestions[$suggestion->suggestion_id]['product_suggestion_id'];
                }
                $same_suggestions = ['exists' => true, 'same' => !in_array(false, $x)];
            }

            $hasExistingOrderArray['suggestions'] = $same_suggestions;

            // $same_measurement = ['exists' => false, 'same' => false];

            // if ($request->gram != 0) {

            //     $same_measurement = ['exists' => true, 'same' => false];

            //     if ($request->gram == $order->measurement) {
            //         $same_measurement = ['exists' => true, 'same' => true];
            //     }
            // }

            // $hasExistingOrderArray['measurement'] = $same_measurement;

            $upgrade = TomsCustomerOrderAddon::where([
                ['order_id', $order->id],
                ['upgradable_item', 1],
            ]);

            $upgradeExists = $upgrade->exists();

            $upgrades = $upgradeExists ? [
                'productId' => $upgrade->first()->addon_id,
                'uomId'     => $upgrade->first()->uom_id,
                'price'     => $upgrade->first()->addon_price,
            ] : [];

            $same_upgrade = ['exists' => false, 'same' => false];

            if ($upgradeExists) {
                $same_upgrade = ['exists' => true, 'same' => false];
            }

            if ($upgradeExists && $request->upgradableItems['productId']) {
                $x = [];
                foreach ($upgrades as $key => $upgrade) {
                    $x[] = $request->upgradableItems[$key] == $upgrade;
                }
                $same_upgrade = ['exists' => true, 'same' => !in_array(false, $x)];
            }

            $hasExistingOrderArray['upgrade'] = $same_upgrade;

            $drink = TomsCustomerOrderChoice::where([
                ['order_id', $order->id],
                ['choice_drinks', 1],
            ]);

            $choiceDrinkExists = $drink->exists();

            $choice_drink = $choiceDrinkExists ? [
                'productId' => $drink->first()->choice_id,
                'uomId'     => $drink->first()->uom_id,
                'price'     => $drink->first()->addon_price,
            ] : [];

            $same_drink = ['exists' => false, 'same' => false];

            if ($choiceDrinkExists) {
                $same_drink = ['exists' => true, 'same' => false];
            }

            if ($choiceDrinkExists && $request->cDrink['productId']) {
                $x = [];
                foreach ($choice_drink as $key => $drink) {
                    $x[] = $request->cDrink[$key] == $drink;
                }

                $same_drink = ['exists' => true, 'same' => !in_array(false, $x)];
            }

            $hasExistingOrderArray['cDrink'] = $same_drink;

            $side = TomsCustomerOrderChoice::where([
                ['order_id', $order->id],
                ['choice_sides', 1],
            ]);

            $choiceSideExists = $side->exists();

            $choice_side = $choiceSideExists ? [
                'productId' => $side->first()->choice_id,
                'uomId'     => $side->first()->uom_id,
                'price'     => $side->first()->addon_price,
            ] : [];

            $same_side = ['exists' => false, 'same' => false];

            if ($choiceSideExists) {
                $same_side = ['exists' => true, 'same' => false];
            }

            if ($choiceSideExists && $request->cSide['productId']) {
                $x = [];
                foreach ($choice_side as $key => $side) {
                    $x[] = $request->cSide[$key] == $side;
                }

                $same_side = ['exists' => true, 'same' => !in_array(false, $x)];
            }

            $hasExistingOrderArray['cSide'] = $same_side;

            $fry = TomsCustomerOrderChoice::where([
                ['order_id', $order->id],
                ['choice_fries', 1],
            ]);

            $choiceFryExists = $fry->exists();

            $choice_fry = $choiceFryExists ? [
                'productId' => $fry->first()->choice_id,
                'uomId'     => $fry->first()->uom_id,
                'price'     => $fry->first()->addon_price,
            ] : [];

            $same_fry = ['exists' => false, 'same' => false];

            if ($choiceFryExists) {
                $same_fry = ['exists' => true, 'same' => false];
            }

            if ($choiceFryExists && $request->cFry['productId']) {
                $x = [];
                foreach ($choice_fry as $key => $fry) {
                    $x[] = $request->cFry[$key] == $fry;
                }

                $same_fry = ['exists' => true, 'same' => !in_array(false, $x)];
            }

            $hasExistingOrderArray['cFry'] = $same_fry;

            $aSideRequests = $request->aSides;

            $same_addon_sides = ['exists' => false, 'same' => false];

            $addon_sides = TomsCustomerOrderAddon::where([
                ['order_id', $order->id],
                ['addon_sides', 1],
            ]);

            $addonSidesExists = $addon_sides->exists();

            if ($addonSidesExists) {
                $same_addon_sides = ['exists' => true, 'same' => false];
            }

            if ($addonSidesExists && $addon_sides->count() == count($aSideRequests)) {

                $filterResult = collect();

                foreach ($addon_sides->get() as $key => $side) {

                    $resultCount = collect($aSideRequests)->filter(function ($req) use ($side) {
                        // DATA FROM REQUEST
                        $reqUomId     = $req['uomId'];
                        $reqProductId = $req['productId'];
                        $reqPrice     = $req['price'];

                        // DATA FROM DB
                        $dbUomId   = $side->uom_id;
                        $dbAddOnId = $side->addon_id;
                        $dbPrice   = $side->addon_price;

                        $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

                        return $sameDataREQandDB;
                    })->count();

                    $filterResult->push($resultCount);
                }

                $everyStatusIsOne = $filterResult->every(function ($status) {
                    return $status == 1;
                });

                $same_addon_sides = ['exists' => true, 'same' => $everyStatusIsOne];
            } else if (count($aSideRequests)) {
                $same_addon_sides = ['exists' => true, 'same' => false];
            }

            $hasExistingOrderArray['aSides'] = $same_addon_sides;

            $aDessertRequest = $request->aDesserts;

            $same_addon_desserts = ['exists' => false, 'same' => false];

            $addon_desserts = TomsCustomerOrderAddon::where([
                ['order_id', $order->id],
                ['addon_dessert', 1],
            ]);

            $addonDessertsExists = $addon_desserts->exists();

            if ($addonDessertsExists) {
                $same_addon_desserts = ['exists' => true, 'same' => false];
            }

            if ($addonDessertsExists && $addon_desserts->count() == count($aDessertRequest)) {

                $filterResult = collect();

                foreach ($addon_desserts->get() as $key => $dessert) {

                    $resultCount = collect($aDessertRequest)->filter(function ($req) use ($dessert) {
                        // DATA FROM REQUEST
                        $reqUomId     = $req['uomId'];
                        $reqProductId = $req['productId'];
                        $reqPrice     = $req['price'];

                        // DATA FROM DB
                        $dbUomId   = $dessert->uom_id;
                        $dbAddOnId = $dessert->addon_id;
                        $dbPrice   = $dessert->addon_price;

                        $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

                        return $sameDataREQandDB;
                    })->count();

                    $filterResult->push($resultCount);
                }

                $everyStatusIsOne = $filterResult->every(function ($status) {
                    return $status == 1;
                });

                $same_addon_desserts = ['exists' => true, 'same' => $everyStatusIsOne];
            } else if (count($aDessertRequest)) {
                $same_addon_desserts = ['exists' => true, 'same' => false];
            }

            $hasExistingOrderArray['aDesserts'] = $same_addon_desserts;

            $aDrinkRequest = $request->aDrinks;

            $same_addon_drinks = ['exists' => false, 'same' => false];

            $addon_drinks = TomsCustomerOrderAddon::where([
                ['order_id', $order->id],
                ['addon_drinks', 1],
            ]);

            $addonDrinksExists = $addon_drinks->exists();

            if ($addonDrinksExists) {
                $same_addon_drinks = ['exists' => true, 'same' => false];
            }

            if ($addonDrinksExists && $addon_drinks->count() == count($aDrinkRequest)) {

                $filterResult = collect();

                foreach ($addon_drinks->get() as $key => $drink) {

                    $resultCount = collect($aDrinkRequest)->filter(function ($req) use ($drink) {
                        // DATA FROM REQUEST
                        $reqUomId     = $req['uomId'];
                        $reqProductId = $req['productId'];
                        $reqPrice     = $req['price'];

                        // DATA FROM DB
                        $dbUomId   = $drink->uom_id;
                        $dbAddOnId = $drink->addon_id;
                        $dbPrice   = $drink->addon_price;

                        $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

                        return $sameDataREQandDB;
                    })->count();

                    $filterResult->push($resultCount);
                }

                $everyStatusIsOne = $filterResult->every(function ($status) {
                    return $status == 1;
                });

                $same_addon_drinks = ['exists' => true, 'same' => $everyStatusIsOne];
            } else if (count($aDrinkRequest)) {
                $same_addon_drinks = ['exists' => true, 'same' => false];
            }

            $hasExistingOrderArray['aDrinks'] = $same_addon_drinks;

            $hasExistingOrderArrayResult = collect($hasExistingOrderArray)->filter(function ($collection) {
                return $collection['exists'] === true;
            });
            // dump($hasExistingOrderArrayResult);

            if ($hasExistingOrderArrayResult->isEmpty()) {
                return false;
            }

            $hasExistingOrderArrayResult = $hasExistingOrderArrayResult->every(function ($collection) {
                return $collection['same'] === true;
            });

            if ($hasExistingOrderArrayResult) {
                return ['order_id' => $order->id, 'same' => $hasExistingOrderArrayResult];
            }
        }

        return false;
    }
    // {
    //     $ticket_id = $request->ticket_id;
    //     $product_id = $request->productId;
    //     $uom_id = $request->uomId;

    //     $orders = TomsCustomerOrder::where([
    //         ['ticket_id', $ticket_id],
    //         ['product_id', $product_id],
    //         ['uom_id', $uom_id]
    //     ]);

    //     if (!$orders->exists()) {
    //         return false;
    //     }

    //     foreach ($orders->get() as $key => $order) {
    //         $hasExistingOrderArray = [];

    //         $suggestions = TomsCustomerOrderSuggestion::where('order_id', $order->id);

    //         $same_suggestions = ['exists' => false, 'same' => false];

    //         if ($suggestions->exists()) {
    //             $x = [];
    //             foreach ($suggestions->get() as $key => $suggestion) {
    //                 $x[] = $suggestion->suggestion_id == array_key_exists($suggestion->suggestion_id, $request->suggestions) &&
    //                     $suggestion->product_suggestion_id == $request->suggestions[$suggestion->suggestion_id]['product_suggestion_id'];
    //             }
    //             $same_suggestions = ['exists' => true, 'same' => !in_array(false, $x)];
    //         }

    //         $hasExistingOrderArray['suggestions'] = $same_suggestions;

    //         $drink = TomsCustomerOrderChoice::where([
    //             ['order_id', $order->id],
    //             ['choice_drinks', 1],
    //         ]);

    //         $choice_drink = $drink->exists() ? [
    //             'productId' => $drink->first()->choice_id,
    //             'uomId'     => $drink->first()->uom_id,
    //             'price'     => $drink->first()->addon_price,
    //         ] : [];

    //         $same_drink = ['exists' => false, 'same' => false];

    //         if (count($choice_drink) && $request->cDrink['productId']) {
    //             $x = [];
    //             foreach ($choice_drink as $key => $drink) {
    //                 $x[] = $request->cDrink[$key] == $drink;
    //             }

    //             $same_drink = ['exists' => true, 'same' => !in_array(false, $x)];
    //         }

    //         $hasExistingOrderArray['cDrink'] = $same_drink;

    //         $side = TomsCustomerOrderChoice::where([
    //             ['order_id', $order->id],
    //             ['choice_sides', 1],
    //         ]);

    //         $choice_side = $side->exists() ? [
    //             'productId' => $side->first()->choice_id,
    //             'uomId'     => $side->first()->uom_id,
    //             'price'     => $side->first()->addon_price,
    //         ] : [];

    //         $same_side = ['exists' => false, 'same' => false];

    //         if (count($choice_side) && $request->cSide['productId']) {
    //             $x = [];
    //             foreach ($choice_side as $key => $side) {
    //                 $x[] = $request->cSide[$key] == $side;
    //             }

    //             $same_side = ['exists' => true, 'same' => !in_array(false, $x)];
    //         }

    //         $hasExistingOrderArray['cSide'] = $same_side;

    //         $fry = TomsCustomerOrderChoice::where([
    //             ['order_id', $order->id],
    //             ['choice_fries', 1],
    //         ]);

    //         $choice_fry = $fry->exists() ? [
    //             'productId' => $fry->first()->choice_id,
    //             'uomId'     => $fry->first()->uom_id,
    //             'price'     => $fry->first()->addon_price,
    //         ] : [];

    //         $same_fry = ['exists' => false, 'same' => false];

    //         if (count($choice_fry) && $request->cFry['productId']) {
    //             $x = [];
    //             foreach ($choice_fry as $key => $fry) {
    //                 $x[] = $request->cFry[$key] == $fry;
    //             }

    //             $same_fry = ['exists' => true, 'same' => !in_array(false, $x)];
    //         }

    //         $hasExistingOrderArray['cFry'] = $same_fry;

    //         $upgrade = TomsCustomerOrderAddon::where([
    //             ['order_id', $order->id],
    //             ['upgradable_item', 1],
    //         ]);

    //         $choice_upgrade = $upgrade->exists() ? [
    //             'productId' => $upgrade->first()->addon_id,
    //             'uomId'     => $upgrade->first()->uom_id,
    //             'price'     => $upgrade->first()->addon_price,
    //         ] : [];

    //         $same_upgrade = ['exists' => false, 'same' => false];

    //         if (count($choice_upgrade) && $request->upgradableItems['productId']) {
    //             $x = [];
    //             foreach ($choice_upgrade as $key => $upgrade) {
    //                 $x[] = $request->upgradableItems[$key] == $upgrade;
    //             }

    //             $same_upgrade = ['exists' => true, 'same' => !in_array(false, $x)];
    //         }

    //         $hasExistingOrderArray['upgradableItems'] = $same_upgrade;

    //         $aSideRequests = $request->aSides;

    //         $same_addon_sides = ['exists' => false, 'same' => false];

    //         $addon_sides = TomsCustomerOrderAddon::where([
    //             ['order_id', $order->id],
    //             ['addon_sides', 1],
    //         ]);

    //         if ($addon_sides->exists() && $addon_sides->count() == count($aSideRequests)) {

    //             $filterResult = collect();

    //             foreach ($addon_sides->get() as $key => $side) {

    //                 $resultCount = collect($aSideRequests)->filter(function ($req) use ($side) {
    //                     // DATA FROM REQUEST
    //                     $reqUomId     = $req['uomId'];
    //                     $reqProductId = $req['productId'];
    //                     $reqPrice     = $req['price'];

    //                     // DATA FROM DB
    //                     $dbUomId   = $side->uom_id;
    //                     $dbAddOnId = $side->addon_id;
    //                     $dbPrice   = $side->addon_price;

    //                     $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

    //                     return $sameDataREQandDB;
    //                 })->count();

    //                 $filterResult->push($resultCount);
    //             }

    //             $everyStatusIsOne = $filterResult->every(function ($status) {
    //                 return $status == 1;
    //             });

    //             $same_addon_sides = ['exists' => true, 'same' => $everyStatusIsOne];
    //         } else if (count($aSideRequests)) {
    //             $same_addon_sides = ['exists' => true, 'same' => false];
    //         }

    //         $hasExistingOrderArray['aSides'] = $same_addon_sides;

    //         $aDessertRequest = $request->aDesserts;

    //         $same_addon_desserts = ['exists' => false, 'same' => false];

    //         $addon_desserts = TomsCustomerOrderAddon::where([
    //             ['order_id', $order->id],
    //             ['addon_dessert', 1],
    //         ]);

    //         if ($addon_desserts->exists() && $addon_desserts->count() == count($aDessertRequest)) {

    //             $filterResult = collect();

    //             foreach ($addon_desserts->get() as $key => $dessert) {

    //                 $resultCount = collect($aDessertRequest)->filter(function ($req) use ($dessert) {
    //                     // DATA FROM REQUEST
    //                     $reqUomId     = $req['uomId'];
    //                     $reqProductId = $req['productId'];
    //                     $reqPrice     = $req['price'];

    //                     // DATA FROM DB
    //                     $dbUomId   = $dessert->uom_id;
    //                     $dbAddOnId = $dessert->addon_id;
    //                     $dbPrice   = $dessert->addon_price;

    //                     $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

    //                     return $sameDataREQandDB;
    //                 })->count();

    //                 $filterResult->push($resultCount);
    //             }

    //             $everyStatusIsOne = $filterResult->every(function ($status) {
    //                 return $status == 1;
    //             });

    //             $same_addon_desserts = ['exists' => true, 'same' => $everyStatusIsOne];
    //         } else if (count($aDessertRequest)) {
    //             $same_addon_desserts = ['exists' => true, 'same' => false];
    //         }

    //         $hasExistingOrderArray['aDesserts'] = $same_addon_desserts;

    //         $aDrinkRequest = $request->aDrinks;

    //         $same_addon_drinks = ['exists' => false, 'same' => false];

    //         $addon_drinks = TomsCustomerOrderAddon::where([
    //             ['order_id', $order->id],
    //             ['addon_drinks', 1],
    //         ]);

    //         if ($addon_drinks->exists() && $addon_drinks->count() == count($aDrinkRequest)) {

    //             $filterResult = collect();

    //             foreach ($addon_drinks->get() as $key => $drink) {

    //                 $resultCount = collect($aDrinkRequest)->filter(function ($req) use ($drink) {
    //                     // DATA FROM REQUEST
    //                     $reqUomId     = $req['uomId'];
    //                     $reqProductId = $req['productId'];
    //                     $reqPrice     = $req['price'];

    //                     // DATA FROM DB
    //                     $dbUomId   = $drink->uom_id;
    //                     $dbAddOnId = $drink->addon_id;
    //                     $dbPrice   = $drink->addon_price;

    //                     $sameDataREQandDB = $reqUomId == $dbUomId && $reqProductId == $dbAddOnId && $reqPrice == $dbPrice;

    //                     return $sameDataREQandDB;
    //                 })->count();

    //                 $filterResult->push($resultCount);
    //             }

    //             $everyStatusIsOne = $filterResult->every(function ($status) {
    //                 return $status == 1;
    //             });

    //             $same_addon_drinks = ['exists' => true, 'same' => $everyStatusIsOne];
    //         } else if (count($aDrinkRequest)) {
    //             $same_addon_drinks = ['exists' => true, 'same' => false];
    //         }

    //         $hasExistingOrderArray['aDrinks'] = $same_addon_drinks;

    //         $hasExistingOrderArrayResult = collect($hasExistingOrderArray)->filter(function ($collection) {
    //             return $collection['exists'] === true;
    //         })->every(function ($collection) {
    //             return $collection['same'] === true;
    //         });

    //         if ($hasExistingOrderArrayResult) {
    //             return ['order_id' => $order->id, 'same' => $hasExistingOrderArrayResult];
    //         }
    //     }
    //     return false;
    // }

    public function addOrder($request)
    {
        DB::transaction(function () use ($request) {

            $ticket_id = $request->ticket_id;
            $product_id = $request->productId;
            $uom_id = $request->uomId;
            $quantity = $request->quantity;
            // $price = $request->price;

            $icoos = $request->icoos;
            $pickup_at = $request->pickup_at;
            $mop = $request->mop;

            $total_price = $this->calculateProductPriceWithAddOns($request, $quantity);

            $current_order = DB::table('toms_customer_orders')
                ->where('ticket_id', $ticket_id)
                ->select('r_setup_stat', 'r_setup_stat_at', 'submitted_at')
                ->first();

            $order = TomsCustomerOrder::create([
                'ticket_id' => $ticket_id,
                'product_id' => $product_id,
                'uom_id' => $uom_id,
                'quantity' => $quantity,
                'product_price' => $total_price['product_price'],
                'total_price' => $total_price['total_price'],
                'icoos' => $icoos,
                'mop' => $mop,
                'pickup_at' => $pickup_at,
                'r_setup_stat' => $current_order->r_setup_stat,
                'r_setup_stat_at' => $current_order->r_setup_stat_at,
                'submitted_at' => $current_order->submitted_at,
                'user_id' => Auth::id()
            ]);

            $suggestions = $request->suggestions;

            foreach ($suggestions as $suggestion_id => $suggestion) {
                TomsCustomerOrderSuggestion::create([
                    'order_id' => $order->id,
                    'suggestion_id' => $suggestion_id,
                    'product_suggestion_id' => $suggestion['product_suggestion_id'],
                    'addon_price' => $suggestion['addon_price']
                ]);
            }

            $drink_choice = $request->cDrink;

            if ($drink_choice['productId']) {
                TomsCustomerOrderChoice::create([
                    'order_id' => $order->id,
                    'choice_id' => $drink_choice['productId'],
                    'uom_id' => $drink_choice['uomId'],
                    'choice_drinks' => 1,
                    'addon_price' => $drink_choice['price'],
                ]);
            }

            $side_choice = $request->cSide;

            if ($side_choice['productId']) {
                TomsCustomerOrderChoice::create([
                    'order_id' => $order->id,
                    'choice_id' => $side_choice['productId'],
                    'uom_id' => $side_choice['uomId'],
                    'choice_sides' => 1,
                    'addon_price' => $side_choice['price'],
                ]);
            }

            $fry_choice = $request->cFry;

            if ($fry_choice['productId']) {
                TomsCustomerOrderChoice::create([
                    'order_id' => $order->id,
                    'choice_id' => $fry_choice['productId'],
                    'uom_id' => $fry_choice['uomId'],
                    'choice_fries' => 1,
                    'addon_price' => $fry_choice['price'],
                ]);
            }

            $upgrade_choice = $request->upgradableItems;

            if ($upgrade_choice['productId']) {
                TomsCustomerOrderAddon::create([
                    'order_id' => $order->id,
                    'addon_id' => $upgrade_choice['productId'],
                    'uom_id' => $upgrade_choice['uomId'],
                    'upgradable_item' => 1,
                    'addon_price' => $upgrade_choice['price'],
                ]);
            }

            $sides_addons = $request->aSides;

            if (count($sides_addons)) {
                foreach ($sides_addons as $side) {
                    TomsCustomerOrderAddon::create([
                        'order_id' => $order->id,
                        'addon_id' => $side['productId'],
                        'uom_id' => $side['uomId'],
                        'addon_sides' => 1,
                        'addon_price' => $side['price']
                    ]);
                }
            }

            $drinks_addons = $request->aDrinks;

            if (count($drinks_addons)) {
                foreach ($drinks_addons as $drink) {
                    TomsCustomerOrderAddon::create([
                        'order_id' => $order->id,
                        'addon_id' => $drink['productId'],
                        'uom_id' => $drink['uomId'],
                        'addon_drinks' => 1,
                        'addon_price' => $drink['price']
                    ]);
                }
            }

            $desserts_addons = $request->aDesserts;

            if (count($desserts_addons)) {
                foreach ($desserts_addons as $dessert) {
                    TomsCustomerOrderAddon::create([
                        'order_id' => $order->id,
                        'addon_id' => $dessert['productId'],
                        'uom_id' => $dessert['uomId'],
                        'addon_dessert' => 1,
                        'addon_price' => $dessert['price']
                    ]);
                }
            }
        });
    }

    public function updateOrder($order_id, $request)
    {
        DB::transaction(function () use ($order_id, $request) {

            $ticket_id = $request->ticket_id;
            $product_id = $request->productId;
            $uom_id = $request->uomId;

            $order = TomsCustomerOrder::where([
                ['id', $order_id],
                ['ticket_id', $ticket_id],
                ['product_id', $product_id],
                ['uom_id', $uom_id]
            ]);

            $existing_quantity = $order->first()->quantity;

            $incoming_quantity = $request->quantity;

            $new_quantity = $existing_quantity + $incoming_quantity;

            $price = $this->calculateProductPriceWithAddOns($request, $new_quantity);

            $order->update(['quantity' => $new_quantity, 'product_price' => $price['product_price'], 'total_price' => $price['total_price']]);
        });
    }

    public function fetch_transaction_list()
    {
        $dateToday = date("Y-m-d");
        return  TomsCustomerOrder::with(['customer_delivery_info', 'tags', 'customer_order_detail', 'locate_tenant'])
            ->select(
                'toms_customer_orders.id as order_id',
                'tenant_id',
                'ticket_id',
                'ticket',
                'cancel_status',
                'customer_id',
                'type',
                'toms_customer_orders.product_id',
                'toms_customer_orders.quantity',
                'toms_customer_orders.canceled_status',
                'toms_customer_orders.pending_status',
                'toms_customer_orders.tag_status',
                'toms_customer_orders.r_setup_stat',
                'total_price',
                'pickup_at',
                'status'
            )
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->join('tickets', 'toms_customer_orders.ticket_id', '=', 'tickets.id')
            ->where([
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_customer_orders.mop', false]
            ])
            ->whereDate('toms_customer_orders.pickup_at', $dateToday)
            ->orderBy('toms_customer_orders.id', 'ASC')
            ->get()
            ->groupBy('ticket_id');
    }

    public function fetch_pickup_transaction_list()
    {
        $dateToday = date("Y-m-d");
        return  TomsCustomerOrder::with([
            'customer_delivery_info',
            'tags',
            'customer_discounted_amt',
            'customer_order_detail'
        ])
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->join('tickets', 'toms_customer_orders.ticket_id', '=', 'tickets.id')
            ->where([
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_customer_orders.mop', true]
            ])
            ->whereDate('toms_customer_orders.pickup_at', $dateToday)
            ->orderBy('toms_customer_orders.id', 'ASC')
            ->get()
            ->groupBy('ticket_id');
    }

    public function fetch_delivery_order()
    {
        $result = array();

        $dateToday = date("Y-m-d");
        $startTime = date("Y-m-d H:i:s", strtotime($dateToday . ' 00:00:00'));
        $currentTime = date("Y-m-d H:i:s", strtotime("+1 hours"));

        $delivery_order =  TomsCustomerOrder::select('toms_customer_orders.id as order_id', 'ticket_id', 'toms_customer_orders.product_id', 'toms_customer_orders.quantity', 'toms_customer_orders.canceled_status', 'toms_customer_orders.pending_status', 'toms_customer_orders.tag_status', 'total_price', 'status')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.pending_status', true],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['mop', false]
            ])
            ->whereDate('toms_customer_orders.pickup_at', $dateToday)
            ->get()
            ->groupBy('ticket_id');

        $sound_deliverOrder = TomsCustomerOrder::select('toms_customer_orders.id as order_id', 'ticket_id', 'toms_customer_orders.product_id', 'toms_customer_orders.quantity', 'toms_customer_orders.canceled_status', 'toms_customer_orders.pending_status', 'toms_customer_orders.tag_status', 'total_price', 'status')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.pending_status', true],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['mop', false]
            ])
            ->whereBetween('toms_customer_orders.pickup_at', [$startTime, $currentTime])
            ->get()
            ->groupBy('ticket_id');

        $result[] = [
            'delivery_order' => $delivery_order,
            'sound_deliverOrder' => $sound_deliverOrder
        ];

        return response()->json($result);
    }

    public function fetch_pickup_order()
    {
        $result = array();

        $dateToday = date("Y-m-d");
        $startTime = date("Y-m-d H:i:s", strtotime($dateToday . ' 00:00:00'));
        $currentTime = date("Y-m-d H:i:s", strtotime("+1 hours"));

        $pickup_order =  TomsCustomerOrder::select('toms_customer_orders.id as order_id', 'ticket_id', 'toms_customer_orders.product_id', 'toms_customer_orders.quantity', 'toms_customer_orders.canceled_status', 'toms_customer_orders.pending_status', 'toms_customer_orders.tag_pickup_status', 'total_price', 'pickup_at', 'status')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.status', true],
                ['toms_customer_orders.pending_status', true],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['mop', true]
            ])
            ->whereDate('toms_customer_orders.pickup_at', $dateToday)
            ->get()
            ->groupBy('ticket_id');

        $sound_pickupOrder = TomsCustomerOrder::select('toms_customer_orders.id as order_id', 'ticket_id', 'toms_customer_orders.product_id', 'toms_customer_orders.quantity', 'toms_customer_orders.canceled_status', 'toms_customer_orders.pending_status', 'toms_customer_orders.tag_pickup_status', 'total_price', 'pickup_at', 'status')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.status', true],
                ['toms_customer_orders.pending_status', true],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['mop', true]
            ])
            ->whereBetween('toms_customer_orders.pickup_at', [$startTime, $currentTime])
            ->get()
            ->groupBy('ticket_id');

        $result[] = [
            'pickup_order' => $pickup_order,
            'sound_pickupOrder' => $sound_pickupOrder
        ];

        return response()->json($result);
    }

    public function customerOrders($ticket)
    {

        $tenant_order =  TomsCustomerOrder::with([
            'ticket',
            'barangay.town.province',
            'barangay.town.delivery_charge',
            'praduct.tenant.businessUnit',
            'praduct.tenant',
            'customer_delivery_info.barangay.town.delivery_charge.vehicle_type',
            'order_remarks',
            'customer_order_remarks',
            'customer_tender',
            'ticket.app_user.barangay',
            'locate_tenant.time_setup',
            'pickup_schedule',
            'unit_measure',
            'product_prices.unit_measure',
            'product_suggestion.item_suggested',
            'product_suggestion.suggestion',
            'product_choices.product_details',
            'product_choices.unit_measure',
            'product_addons.product_details',
            'product_addons.unit_measure',
            'discount.discount_storage.global_discount_setup',
            'customer_discount',
            'customer_order_detail',
            'customer_discounted_amt',
            'vehicle_suggestion.vehicle'
        ])
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where('fd_products.tenant_id', auth()->user()->tenant_id)
            ->where('ticket_id', base64_decode($ticket))
            ->orderBy('product_name', 'ASC')
            ->get()
            ->groupBy('ticket_id');

        $other_tenant_order = TomsCustomerOrder::with([
            'praduct.tenant.businessUnit'
        ])
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where('fd_products.tenant_id', '!=', auth()->user()->tenant_id)
            ->where('ticket_id', base64_decode($ticket))
            ->get()
            ->groupBy('tenant_id');

        $ticket_id = null;
        $tenant_id = array();

        foreach ($other_tenant_order as $key) {

            $ticket_id = $key->first()->ticket_id;
            $tenant_id[] = $key->first()->tenant_id;
        }

        $other_discounted_amt = DB::table('customer_discounted_amounts')
            ->where('ticket_id', $ticket_id)
            ->whereIn('tenant_id', $tenant_id)
            ->get();

        $discount_list = DiscountList::where('status', true)
            ->get();

        $vehicle_list = Gc_Transportation::where('status', true)
            ->get();

        $deliverySchedules = [];
        $today = today()->subDay();
        $bu_schedules = DB::table('delivery_time_setups')->first();

        for ($i = 0; $i < 4; $i++) {
            $default   = $i === 0 ? true : false;
            $time_from = $i === 0 ? now()->addMinutes(30)->toTimeString() :

                Carbon::parse($bu_schedules->time_start)->addMinutes(30)->toTimeString();

            $time_to = $bu_schedules->time_end;

            $deliverySchedules[] = [
                'date'      => $today->addDay()->toDateString(),
                'time_from' => $time_from,
                'time_to'   => $time_to,
                'default'   => $default,
            ];
        }

        $recipient = Ticket::with([
            'recipient',
            'recipient_address.barangay.town',
            'recipient_numbers',
            'recipient_phones'
        ])->find(base64_decode($ticket));

        $responseData = compact(
            'tenant_order',
            'other_tenant_order',
            'other_discounted_amt',
            'discount_list',
            'vehicle_list',
            'deliverySchedules',
            'recipient'
        );

        return response()->json($responseData, 200);
    }

    public function customer_order_history($ticket)
    {
        $result = array();
        $tenantOrder =  CustomerOrderHistory::with([
            'barangay.town.province',
            'barangay.town.delivery_charge',
            'praduct.tenant.businessUnit',
            'praduct.tenant.minimum_order',
            'customer_delivery_info.barangay.town.delivery_charge',
            'order_remarks',
            'customer_order_remarks',
            'customer_tender',
            'ticket.app_user.barangay',
            'unit_measure',
            'product_suggestion.item_suggested',
            'product_suggestion.suggestion',
            'product_choices.product_details',
            'product_choices.unit_measure',
            'product_addons.product_details',
            'product_addons.unit_measure',
            'customer_discounted_amt',
            'customer_order_detail'
        ])
            ->join('fd_products', 'customer_order_histories.product_id', '=', 'fd_products.product_id')
            ->join('tickets', 'customer_order_histories.ticket_id', '=', 'tickets.id')
            ->where([
                ['fd_products.tenant_id', auth()->user()->tenant_id]
            ])
            ->where('ticket_id', base64_decode($ticket))
            ->orderBy('product_name', 'ASC')
            ->get()
            ->groupBy('ticket_id');

        $otherTenantOrder = TomsCustomerOrder::with('praduct.tenant.businessUnit')
            ->select(
                'id',
                'ticket_id',
                'toms_customer_orders.product_id',
                'toms_customer_orders.quantity as qty',
                'total_price',
                'pending_status',
                'canceled_status',
                'status',
                'tag_status',
                'r_setup_stat',
                'toms_customer_orders.created_at',
                'toms_customer_orders.updated_at',
                'tenant_id'
            )
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where('fd_products.tenant_id', '!=', auth()->user()->tenant_id)
            ->where('ticket_id', base64_decode($ticket))
            ->get()
            ->groupBy('tenant_id');

        $discountList = DiscountList::where('status', true)
            ->get();

        $recipient = Ticket::with([
            'recipient',
            'recipient_address.barangay.town',
            'recipient_numbers',
            'recipient_phones'
        ])->find(base64_decode($ticket));

        $result[] = [
            'tenant_order' => $tenantOrder,
            'other_tenant_order' => $otherTenantOrder,
            'discount_list' => $discountList,
            'recipient' => $recipient
        ];

        return response()->json($result);
    }

    public function server_datetime()
    {
        return response()->json(date('Y-m-d H:i:s'));
    }

    public function server_datetime_plus()
    {
        $result = array();
        $result[] = [
            'date_time' => date('Y-m-d H:i:s'),
            'date_time_plus' => date('Y-m-d H:i:s', strtotime("+30 mins"))
        ];

        return response()->json($result);
    }

    public function cancel_item(Request $request)
    {
        TomsCustomerOrder::where('id', $request->id)
            ->update(['canceled_status' => true]);

        return response()->json(['message' => 'Order Item has been cancelled.'], 200);
    }

    public function cancel_ticket(Request $request)
    {
        DB::transaction(function () use ($request) {

            $customerOrders = TomsCustomerOrder::select('toms_customer_orders.id as order_id')
                ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
                ->where([
                    ['fd_products.tenant_id', auth()->user()->tenant_id],
                    ['toms_customer_orders.ticket_id', $request->ticket_id]
                ])
                ->get();

            foreach ($customerOrders as $order) {

                TomsCustomerOrder::where('id', $order->order_id)
                    ->update(['canceled_status' => true]);
            }

            FdCustomerOrderDetail::create([
                'tenant_id' => auth()->user()->tenant_id,
                'ticket_id' => $request->ticket_id,
                'cancelled_status' => true
            ]);

            Ticket::where('id', $request->ticket_id)
                ->update([
                    'cancel_status' => true
                ]);
        });

        return response()->json(['message' => 'Customer Order has been cancelled.'], 200);
    }

    public function update_product_availability(Request $request)
    {
        if ($request->item_qty != "") {

            if ($request->item_qty == 0) {

                FdProductPrice::where('id', $request->id)
                    ->update([
                        'available' => false,
                        'stocks' => $request->item_qty
                    ]);
            } else {

                FdProductPrice::where('id', $request->id)
                    ->update([
                        'available' => true,
                        'stocks' => $request->item_qty
                    ]);
            }
        } else {


            FdProductPrice::where('id', $request->id)
                ->update([
                    'available' => true,
                    'stocks' => null
                ]);
        }

        return response()->json(['message' => 'Order Item has been updated.'], 200);
    }

    public function change_item_quantity(Request $request)
    {
        $stocks = $request->stocks;
        $inventory = '';
        if ($request->stocks == null || $request->stocks == "") {

            $stocks = 1000000000;
        }

        $data = $request->validate([
            'quantity' => [
                'required',
                'numeric',
                'min:1',
                'lte:' . $stocks
            ],
        ]);

        $totalPrice = floatval($request->total_price) * intval($request->quantity);

        TomsCustomerOrder::where('id', $request->orderId)
            ->update([
                'quantity' => $data['quantity'],
                'total_price' => $totalPrice,
                'status' => true
            ]);

        return response()->json(['message' => 'Item Quantity has been changed.'], 200);
    }

    public function change_item(Request $request)
    {
        $stocks = $request->stocks;
        if ($request->stocks == null || $request->stocks == "") {

            $stocks = 1000000000;
        }

        $data = $request->validate([
            'product_name' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'numeric', 'min:1', 'lte:' . $stocks]
        ]);

        $totalPrice = floatval($request->price) * intval($data['quantity']);

        $order = TomsCustomerOrder::where('id', $request->orderId)
            ->update([
                'product_id' => $request->productId,
                'quantity' => $data['quantity'],
                'total_price' => $totalPrice,
                'status' => true
            ]);

        return response()->json(['message' => 'Item has been successfully replaced.'], 200);
    }

    public function update_for_preparing(Request $request)
    {
        DB::transaction(function () use ($request) {

            // dd($request->transpo_id);

            $order = TomsCustomerOrder::with(['ticket'])
                ->select('tenant_id', 'first_tenant')
                ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
                ->where('ticket_id', $request->ticket_id)
                ->where('fd_products.tenant_id', '!=', auth()->user()->tenant_id)
                ->where('toms_customer_orders.first_tenant', true)
                ->first();

            if (empty($order)) {

                $customerOrders = TomsCustomerOrder::select('toms_customer_orders.id as order_id')
                    ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
                    ->where([
                        ['fd_products.tenant_id', auth()->user()->tenant_id],
                        ['toms_customer_orders.ticket_id', $request->ticket_id]
                    ])
                    ->get();

                foreach ($customerOrders as $orders) {

                    TomsCustomerOrder::where('id', $orders->order_id)
                        ->update(['first_tenant' => false]);
                }
            } else {

                $tenant = LocateTenant::where('tenant_id', $order->tenant_id)
                    ->first();

                return response()->json(['message' => 'failure', 'tenant' => $tenant->tenant], 200);
            }

            FdCustomerOrderDetail::create([
                'tenant_id' => auth()->user()->tenant_id,
                'ticket_id' => $request->ticket_id,
                'additional_charge' => $request->additional_charge
            ]);

            if (count($request->discount_details['discount_ids']) > 0) {

                // save discount for customer
                CustomerDiscountedAmount::where([
                    ['ticket_id', $request->ticket_id],
                    ['tenant_id', auth()->user()->tenant_id]
                ])
                    ->delete();

                for ($i = 0; $i < count($request->discount_details['discount_ids']); $i++) {

                    CustomerDiscountedAmount::create([
                        'ticket_id' => $request->ticket_id,
                        'tenant_id' => auth()->user()->tenant_id,
                        'discount_id' => $request->discount_details['discount_ids'][$i],
                        'no_approved' => $request->discount_details['no_approve'][$i],
                        'rider_no_approved' => $request->discount_details['no_approve'][$i],
                        'discount' => $request->discount_details['discount'][$i],
                        'rider_discount' => $request->discount_details['discount'][$i]
                    ]);
                }
            }

            CustomerBill::where('ticket_id', $request->ticket_id)
                ->update([
                    'amount' => $request->tender,
                    'change' => $request->change,
                    'delivery_charge' => $request->delivery_charge
                ]);

            // if ($request->transpo_id !== null) {
            // FdVtypeSuggestion::where([
            //     ['ticket_id', $request->ticket_id],
            //     ['tenant_id', auth()->user()->tenant_id]
            // ])
            //     ->update([
            //         'transpo_id' => $request->transpo_id,
            //         'delivery_charge' => $request->delivery_charge
            //     ]);

            // FdVtypeSuggestion::updateOrInsert(
            //     ['ticket_id' => $request->ticket_id, 'tenant_id' => auth()->user()->tenant_id],
            //     ['transpo_id' => $request->transpo_id, 'delivery_charge' => $request->delivery_charge]
            // );
            // }

            $customerOrders = TomsCustomerOrder::join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
                ->where([
                    ['fd_products.tenant_id', auth()->user()->tenant_id],
                    ['toms_customer_orders.ticket_id', $request->ticket_id]
                ])
                ->get();

            if (is_null($request->timePickUp) == 1) {
                $timePickUp = '00:00:00';
            } else {
                $timePickUp = $request->timePickUp;
            }
            $dateTimePickUp = "$request->datePickUp $timePickUp";
            // date_default_timezone_set('Asia/Manila');
            foreach ($customerOrders as $order) {

                $check = TomsCustomerOrder::where([
                    ['id', $order['id']],
                    ['prepared_at', '!=', '']
                ])
                    ->select('prepared_at')
                    ->first();

                if (!empty($check->prepared_at)) {

                    TomsCustomerOrder::where('id', $order['id'])
                        ->update([
                            'pickup_at' => $dateTimePickUp
                        ]);
                } else {

                    TomsCustomerOrder::where('id', $order['id'])
                        ->update([
                            'pending_status' => false,
                            'prepared_status' => true,
                            'prepared_at' => $this->now,
                            'pickup_at' => $dateTimePickUp
                        ]);
                }

                $product_price = FdProductPrice::where([
                    ['product_id', $order['product_id']],
                    ['uom_id', $order['uom_id']]
                ])
                    ->select('id', 'price', 'stocks', 'available')
                    ->first();

                CustomerOrderHistory::updateOrInsert(
                    [
                        'order_id' => $order['id'],
                        'ticket_id' => $order['ticket_id'],
                        'tenant_id' => $order['tenant_id']
                    ],
                    [
                        'product_id' => $order['product_id'],
                        'uom_id' => $order['uom_id'],
                        'product_price' => $product_price['price'],
                        'quantity_purchase' => $order['quantity'],
                        'product_quantity' => $product_price['stocks'],
                        'product_availability' => $product_price['available'],
                        'total_price' => $order['total_price'],
                        'mop' => $order['mop'],
                        'pickup_at' => $dateTimePickUp,
                        'submitted_at' => $order['submitted_at'],
                        'icoos' => $order['icoos'],
                        'cancelled_status' => $order['canceled_status'],
                        'status' => $order['status']
                    ]
                );
            }

            for ($i = 0; $i < count($request->changeQuantity_ids); $i++) {

                $inventory = $request->inventory[$i];
                if ($inventory == 0) {

                    FdProductPrice::where([
                        ['product_id', $request->changeQuantity_ids[$i]],
                        ['uom_id', $request->stocks_uom_ids[$i]]
                    ])
                        ->update([
                            'available' => false,
                            'stocks' => $inventory
                        ]);
                } else {

                    FdProductPrice::where([
                        ['product_id', $request->changeQuantity_ids[$i]],
                        ['uom_id', $request->stocks_uom_ids[$i]]
                    ])
                        ->update([
                            'stocks' => $inventory
                        ]);
                }
            }

            $customer = Ticket::find($request->ticket_id);

            broadcast(new ForPreparing($customer->customer_id, $request->ticket_id, auth()->user()->tenant_id))->toOthers();
        });

        return response()->json(['message' => 'Customer Order has been submitted.'], 200);
    }

    public function tag_for_pickup(Request $request)
    {
        DB::transaction(function () use ($request) {

            for ($i = 0; $i < count($request->container_ids); $i++) {

                FdContainerTypeDetail::create([
                    'tenant_id' => auth()->user()->tenant_id,
                    'ticket_id' => $request->ticket_id,
                    'container_id' => $request->container_ids[$i],
                    'quantity' => $request->container_quantities[$i]
                ]);
            }
        });

        $customerOrders = TomsCustomerOrder::select('toms_customer_orders.id as order_id')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.tag_status', false],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_customer_orders.ticket_id', $request->ticket_id]
            ])
            ->get();

        foreach ($customerOrders as $order) {

            TomsCustomerOrder::where('id', $order->order_id)
                ->update([
                    'tag_status' => true,
                    'tag_status_at' => $this->now
                ]);
        }

        $lastTouch = TomsCustomerOrder::select('fd_products.tenant_id', 'toms_customer_orders.updated_at')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.tag_status', false],
                ['toms_customer_orders.ticket_id', $request->ticket_id]
            ])
            ->get()
            ->groupBy('tenant_id');

        $tickets = Ticket::find($request->ticket_id);

        if (empty($lastTouch->first())) {

            $bill = CustomerBill::where('ticket_id', $request->ticket_id)
                ->first();

            $change = number_format($bill->change, 2);

            FdCustomerOrderDetail::where([
                ['tenant_id', auth()->user()->tenant_id],
                ['ticket_id', $request->ticket_id]
            ])
                ->update([
                    'change' => $bill->change,
                    'last_tenant' => true
                ]);

            broadcast(new ItemReadyForPickUp($tickets->customer_id, $request->ticket_id))->toOthers();
            broadcast(new ForPickUp())->toOthers();

            return response()->json([
                'message' => 'success',
                'change' => $change,
                'no_tenants' => count($lastTouch)
            ], 200);
        } else {

            broadcast(new ItemReadyForPickUp($tickets->customer_id, $request->ticket_id))->toOthers();
            broadcast(new ForPickUp())->toOthers();

            return response()->json([
                'message' => 'Customer Order has been tagged for pick up!',
                'no_tenants' => count($lastTouch)
            ], 200);
        }
    }

    public function add_order(Request $request)
    {
        DB::transaction(function () use ($request) {

            $order = TomsCustomerOrder::where('toms_customer_orders.ticket_id', $request->ticket_id)
                ->first();

            $canceled_status = array();
            for ($i = 0; $i < count($request->product_ids); $i++) {

                $price = 0;
                for ($x = 0; $x < count($request->order_productIds); $x++) {

                    if ($request->product_ids[$i] == $request->order_productIds[$x]) {

                        array_push($canceled_status, $request->canceled_status[$x]);
                    }
                }

                if (in_array($request->product_ids[$i], $request->order_productIds) && in_array(0, $canceled_status)) {
                    $order_quantity = $order_price = $quantity = $total_price = 0;

                    $customerOrder = TomsCustomerOrder::where([
                        ['toms_customer_orders.ticket_id', $request->ticket_id],
                        ['toms_customer_orders.product_id', $request->product_ids[$i]],
                        ['toms_customer_orders.canceled_status', false]
                    ])
                        ->select('id AS order_id', 'quantity', 'total_price')
                        ->first();

                    $order_quantity = intval($customerOrder->quantity);
                    $order_price = floatval($customerOrder->total_price);
                    $price = intval($request->product_quantities[$i]) * floatval($request->product_price[$i]);

                    $quantity = $order_quantity + intval($request->product_quantities[$i]);
                    $total_price = $order_price + floatval($price);

                    TomsCustomerOrder::where('id', $customerOrder->order_id)
                        ->update([
                            'quantity' => $quantity,
                            'total_price' => $total_price
                        ]);
                } else {
                    $price = intval($request->product_quantities[$i]) * floatval($request->product_price[$i]);

                    TomsCustomerOrder::create([
                        'ticket_id' => $request->ticket_id,
                        'product_id' => $request->product_ids[$i],
                        'quantity' => $request->product_quantities[$i],
                        'total_price' => $price,
                        'mop' => $request->mop,
                        'pickup_at' => $order->pickup_at,
                        'icoos' => false,
                        'submitted_at' => $order->submitted_at,
                        'user_id' => $order->user_id
                    ]);
                }
            }
        });

        return response()->json(['message' => 'Selected Item(s) has been successfully added!'], 200);
    }

    public function first_entry(Request $request)
    {

        $order = TomsCustomerOrder::select('tenant_id', 'first_tenant')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where('ticket_id', $request->ticket_id)
            ->where('fd_products.tenant_id', '!=', auth()->user()->tenant_id)
            ->where('toms_customer_orders.first_tenant', true)
            ->first();

        if (empty($order)) {

            $customerOrders = TomsCustomerOrder::select('toms_customer_orders.id as order_id')
                ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
                ->where([
                    ['fd_products.tenant_id', auth()->user()->tenant_id],
                    ['toms_customer_orders.ticket_id', $request->ticket_id]
                ])
                ->get();

            foreach ($customerOrders as $orders) {

                TomsCustomerOrder::where('id', $orders->order_id)
                    ->update(['first_tenant' => true]);
            }

            return response()->json(['message' => 'success'], 200);
        }
    }

    public function fetch_for_pickup_list()
    {
        $dateToday = date("Y-m-d");
        $pickup =  TomsCustomerOrder::with([
            'customer_delivery_info.barangay.town',
            'ticket',
            'tag_riders.rider_detail.vehicle',
            'customer_order_detail'
        ])
            ->select(
                'toms_customer_orders.id as order_id',
                'toms_customer_orders.ticket_id',
                'toms_customer_orders.total_price',
                'toms_customer_orders.canceled_status',
                'toms_customer_orders.status',
                'toms_customer_orders.quantity as qty',
                'toms_customer_orders.tag_status',
                'toms_customer_orders.tag_status_at',
                'toms_customer_orders.r_setup_stat',
                'toms_customer_orders.r_setup_stat_at',
                'toms_customer_orders.prepared_at',
                'toms_customer_orders.submitted_at',
                'toms_customer_orders.product_id',
                'toms_tag_riders.id as tag_riders_id',
                'rider_id',
                'toms_tag_riders.trans_at',
                'toms_tag_riders.trans_status',
                'toms_tag_riders.delevered_at',
                'toms_tag_riders.completed_at'
            )
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->join('toms_tag_riders', 'toms_customer_orders.ticket_id', '=', 'toms_tag_riders.ticket_id')
            ->where([
                ['toms_customer_orders.tag_status', true],
                ['toms_customer_orders.r_setup_stat', true],
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.status', true],
                ['toms_customer_orders.mop', false],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_tag_riders.tenant_id', auth()->user()->tenant_id]
            ])
            ->whereDate('toms_customer_orders.pickup_at', $dateToday)
            ->orderBy('toms_customer_orders.r_setup_stat_at', 'ASC')
            ->get()
            ->groupBy('ticket_id');

        if (empty($pickup->first())) {

            return response()->json(['message' => 'No data available in table'], 200);
        } else {

            return $pickup;
        }
    }

    public function fetch_delivered_order_list($filterDate)
    {
        $delivered =  TomsCustomerOrder::with([
            'customer_delivery_info.barangay.town',
            'rider_detail',
            'customer_order_detail',
            'ticket',
            'product_prices',
            'customer_discounted_amt'
        ])
            ->select(
                'toms_customer_orders.id as order_id',
                'toms_customer_orders.ticket_id',
                'toms_customer_orders.total_price',
                'toms_customer_orders.canceled_status',
                'toms_customer_orders.status',
                'toms_customer_orders.quantity',
                'toms_customer_orders.tag_status_at',
                'toms_customer_orders.r_setup_stat_at',
                'toms_customer_orders.prepared_at',
                'toms_customer_orders.submitted_at',
                'toms_customer_orders.product_id',
                'toms_tag_riders.id as tag_riders_id',
                'rider_id',
                'toms_tag_riders.trans_at',
                'toms_tag_riders.trans_status',
                'toms_tag_riders.cancelled_status',
                'toms_tag_riders.complete_status',
                'toms_tag_riders.delevered_at',
                'toms_tag_riders.completed_at'
            )
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->join('toms_tag_riders', 'toms_customer_orders.ticket_id', '=', 'toms_tag_riders.ticket_id')
            ->where([
                ['toms_customer_orders.r_setup_stat', true],
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.status', true],
                ['toms_customer_orders.mop', false],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_tag_riders.tenant_id', auth()->user()->tenant_id],
                ['toms_tag_riders.delevered_status', true]
            ])
            ->whereDate('toms_customer_orders.pickup_at', $filterDate)
            ->orderBy('toms_tag_riders.delevered_at', 'ASC')
            ->get()
            ->groupBy('ticket_id');

        // if (empty($delivered->first())) {

        //     return response()->json(['message' => 'No data available in table'], 200);
        // } else {

        return $delivered;
        // }
    }

    public function fetch_successfully_deliver_order()
    {
        $dateToday = date("Y-m-d");
        $remittance =  TomsCustomerOrder::with([
            'customer_delivery_info.barangay.town.delivery_charge',
            'rider_detail',
            'ticket',
            'remittance_detail',
            'customer_bill',
            'product_prices.unit_measure',
            'customer_discounted_amt'
        ])
            ->select(
                'toms_customer_orders.id as order_id',
                'toms_customer_orders.ticket_id',
                'toms_customer_orders.quantity',
                'toms_customer_orders.canceled_status',
                'toms_customer_orders.status',
                'toms_customer_orders.tag_status_at',
                'toms_customer_orders.r_setup_stat_at',
                'toms_customer_orders.prepared_at',
                'toms_customer_orders.submitted_at',
                'toms_customer_orders.product_id',
                'toms_tag_riders.id as tag_riders_id',
                'rider_id',
                'toms_tag_riders.trans_at',
                'toms_tag_riders.delevered_at',
                'toms_tag_riders.completed_at',
                DB::raw('SUM(toms_customer_orders.total_price) AS remittance_amt')
            )
            ->join('toms_tag_riders', 'toms_customer_orders.ticket_id', '=', 'toms_tag_riders.ticket_id')
            ->where([
                ['toms_customer_orders.r_setup_stat', true],
                ['toms_customer_orders.mop', false],
                ['toms_tag_riders.tenant_id', auth()->user()->tenant_id],
                ['toms_tag_riders.complete_status', true],
                ['toms_customer_orders.canceled_status', false]
            ])
            ->whereDate('toms_customer_orders.pickup_at', $dateToday)
            ->orderBy('toms_tag_riders.completed_at', 'ASC')
            ->groupBy('toms_customer_orders.ticket_id')
            ->get();

        if (empty($remittance->first())) {

            return response()->json(['message' => 'No data available in table'], 200);
        } else {

            return $remittance;
        }
    }


    public function fetch_pickup_payment()
    {
        $dateToday = date("Y-m-d");
        return  TomsCustomerOrder::with([
            'customer_delivery_info.barangay.town',
            'tags',
            'ticket',
            'customer_discounted_amt'
        ])
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.status', true],
                ['toms_customer_orders.mop', true],
                ['toms_customer_orders.tag_pickup_status', true],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
            ])
            ->whereDate('toms_customer_orders.pickup_at', '>=', $dateToday)
            ->orderBy('toms_customer_orders.pickup_at', 'ASC')
            ->get()
            ->groupBy('ticket_id');
    }

    public function fetch_remittance_balance()
    {
        $dateToday = date("Y-m-d");
        $remittance =  TomsCustomerOrder::with([
            'customer_delivery_info.barangay.town',
            'rider_detail',
            'remittance_detail'
        ])
            ->select(
                'toms_customer_orders.id as order_id',
                'toms_customer_orders.ticket_id',
                'toms_customer_orders.tag_status_at',
                'toms_customer_orders.r_setup_stat_at',
                'toms_customer_orders.prepared_at',
                'toms_customer_orders.submitted_at',
                'toms_customer_orders.product_id',
                'toms_tag_riders.id as tag_riders_id',
                'rider_id',
                'toms_tag_riders.trans_at',
                'toms_tag_riders.delevered_at',
                'toms_tag_riders.completed_at'
            )
            ->join('toms_tag_riders', 'toms_customer_orders.ticket_id', '=', 'toms_tag_riders.ticket_id')
            ->where([
                ['toms_customer_orders.r_setup_stat', true],
                ['toms_customer_orders.mop', false],
                ['toms_tag_riders.tenant_id', auth()->user()->tenant_id],
                ['toms_tag_riders.complete_status', true],
                ['toms_tag_riders.remitted_status', false]
            ])
            ->whereDate('toms_tag_riders.created_at', '>=', $dateToday)
            ->orderBy('toms_tag_riders.completed_at', 'ASC')
            ->get()
            ->groupBy('ticket_id');

        if (empty($remittance->first())) {

            return response()->json(['message' => 'No data available in table'], 200);
        } else {

            return $remittance;
        }
    }

    public function update_item_status(Request $request)
    {
        TomsCustomerOrder::where('id', $request->id)
            ->update(['status' => false]);

        return response()->json(true, 200);
    }

    public function check_order(Request $request)
    {
        // dd(auth()->user()->id);
        $user = TomsCustomerOrder::select('toms_customer_orders.id', 'toms_customer_orders.updated_by')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['tenant_id', auth()->user()->tenant_id],
                ['ticket_id', $request->ticket_id]
            ])
            ->get();

        if ($user[0]->updated_by == null || $user[0]->updated_by == "") {

            for ($i = 0; $i < count($user); $i++) {

                TomsCustomerOrder::where('id', $user[$i]['id'])
                    ->update(['updated_by' => auth()->user()->id]);
            }

            return response()->json(['order_status' => 'pending'], 200);
        } else {

            if ($user[0]->updated_by == auth()->user()->id) {

                return response()->json(['order_status' => 'reviewed'], 200);
            } else {

                $tenant = TenantUser::select('name')
                    ->where('id', $user[0]->updated_by)
                    ->first();

                return response()->json(['order_status' => 'preparing', 'name' => $tenant['name']], 200);
            }
        }
    }

    public function fetch_customer_bill(Request $request)
    {

        return CustomerBill::with([
            'grand_total',
            'discounted_amount'
        ])
            ->select('id', 'ticket_id', 'amount', 'delivery_charge', 'change')
            ->where('ticket_id', $request->ticket_id)
            ->first();
    }

    public function update_customer_bill(Request $request)
    {
        // $data = $request->validate([
        //     'amount' => ['required', 'numeric', 'gte:' . $request->grandTotal],
        //     'delivery_charge' => ['required', 'numeric'],
        //     'change' => ['required', 'numeric'],
        // ]);

        // CustomerBill::where('ticket_id', $request->ticket_id)
        //     ->update([
        //         'amount' => $data['amount'],
        //         'delivery_charge' => $data['delivery_charge'],
        //         'change' => $data['change']
        //     ]);

        $detail = FdCustomerOrderDetail::where([
            ['ticket_id', $request->ticket_id],
            ['last_tenant', true]
        ]);

        $detail->update(['change' => $request->change]);

        if ($detail->first()->tenant_id === auth()->user()->tenant_id) {

            return response()->json([
                'last_tenant' => 'true',
                'message' => 'Customer bill has been successfully updated',
                'change' => $request->change
            ], 200);
        } else {

            return response()->json([
                'last_tenant' => 'false',
                'message' => 'Customer bill has been successfully updated',
            ], 200);
        }
    }

    public function fetch_advance_order()
    {
        $dateTo = date("Y-m-d", strtotime("+3 days"));
        return  TomsCustomerOrder::select('toms_customer_orders.id as order_id', 'ticket_id', 'toms_customer_orders.pickup_at', 'toms_customer_orders.mop', 'toms_customer_orders.product_id', 'toms_customer_orders.quantity', 'toms_customer_orders.canceled_status', 'toms_customer_orders.pending_status', 'toms_customer_orders.tag_status', 'total_price', 'status')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.pending_status', true],
                ['fd_products.tenant_id', auth()->user()->tenant_id]
            ])
            ->whereDate('toms_customer_orders.pickup_at', '<=', $dateTo)
            ->whereDate('toms_customer_orders.pickup_at', '>', date("Y-m-d"))
            ->get()
            ->groupBy('ticket_id');
    }

    public function fetch_advance_delivery()
    {
        $dateTo = date("Y-m-d", strtotime("+3 days"));
        return  TomsCustomerOrder::with(['customer_delivery_info', 'tags'])
            ->select(
                'toms_customer_orders.id as order_id',
                'ticket_id',
                'ticket',
                'customer_id',
                'type',
                'toms_customer_orders.product_id',
                'toms_customer_orders.quantity',
                'toms_customer_orders.canceled_status',
                'toms_customer_orders.pending_status',
                'toms_customer_orders.tag_status',
                'toms_customer_orders.r_setup_stat',
                'total_price',
                'pickup_at',
                'status'
            )
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->join('tickets', 'toms_customer_orders.ticket_id', '=', 'tickets.id')
            ->where([
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.mop', false]
            ])
            ->whereDate('toms_customer_orders.pickup_at', '<=', $dateTo)
            ->whereDate('toms_customer_orders.pickup_at', '>', date("Y-m-d"))
            ->orderBy('toms_customer_orders.pickup_at', 'ASC')
            ->get()
            ->groupBy('ticket_id');
    }

    public function fetch_advance_pickup()
    {
        $dateTo = date("Y-m-d", strtotime("+3 days"));
        return  TomsCustomerOrder::with(['customer_delivery_info', 'products', 'tags'])
            ->select(
                'toms_customer_orders.id as order_id',
                'ticket_id',
                'ticket',
                'customer_id',
                'type',
                'toms_customer_orders.product_id',
                'toms_customer_orders.quantity',
                'toms_customer_orders.canceled_status',
                'toms_customer_orders.pending_status',
                'toms_customer_orders.tag_status',
                'toms_customer_orders.r_setup_stat',
                'total_price',
                'pickup_at',
                'status'
            )
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->join('tickets', 'toms_customer_orders.ticket_id', '=', 'tickets.id')
            ->where([
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_customer_orders.canceled_status', false],
                ['toms_customer_orders.mop', true]
            ])
            ->whereDate('toms_customer_orders.pickup_at', '<=', $dateTo)
            ->whereDate('toms_customer_orders.pickup_at', '>', date("Y-m-d"))
            ->orderBy('toms_customer_orders.pickup_at', 'ASC')
            ->get()
            ->groupBy('ticket_id');
    }

    public function fetch_product_details($order_id, $product_id)
    {
        return TomsCustomerOrder::with([
            'unit_measure',
            'addon_suggestion',
            'product_choice.product_details',
            'product_addon.product_details',
            'product_choices',
            'product_addons',
        ])
            ->select('id', 'toms_customer_orders.product_id', 'uom_id', 'product_price', 'product_name', 'image', 'no_flavor', 'no_drinks', 'no_fries', 'no_sides')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->find($order_id);
    }

    public function fetch_request_discounts($ticket_id)
    {
        // return CustomerDiscount::with('customer_discount_status')
        //     ->join('customer_discount_storages', 'customer_discounts.customer_discount_storage_id', '=', 'customer_discount_storages.id')
        //     ->where('ticket_id', $ticket_id)
        //     ->get();

        $access = TenantUser::select('global_cat_id as category_id')
            ->join('locate_tenants', 'tenant_users.tenant_id', '=', 'locate_tenants.tenant_id')
            ->where('tenant_users.id', auth()->user()->id)
            ->get();

        $discounts = array();
        $discount_lists = DiscountList::select(DB::raw('discount_lists.id as id, discount_name'))
            ->join('global_discount_setups', 'discount_lists.id', '=', 'global_discount_setups.discount_id')
            ->where([
                ['discount_lists.status', true],
                ['global_cat_id', $access->first()->category_id]
            ])->get();

        foreach ($discount_lists as $list) {

            $customer_discount = CustomerDiscount::with('customer_discount_status')
                ->select(DB::raw('customer_discounts.id as id, ticket_id, customer_discount_storage_id, status, customer_id, discount_id, name, id_number, image_path'))
                ->join('customer_discount_storages', 'customer_discounts.customer_discount_storage_id', '=', 'customer_discount_storages.id')
                ->where([
                    ['ticket_id', $ticket_id],
                    ['discount_id', $list->id]
                ])
                ->get();

            $discounts[] = [
                'discount_type' => $customer_discount,
                'discount_name' => $list->discount_name
            ];
        }

        return response()->json(compact('discounts'));
    }

    public function update_discount_amt(Request $request)
    {
        DB::transaction(function () use ($request) {

            for ($i = 0; $i < count($request->ids); $i++) {

                CustomerDiscountStatus::updateOrInsert(
                    ['tenant_id' => auth()->user()->tenant_id, 'ticket_id' => $request->ticket_id, 'customer_discount_id' => $request->ids[$i]],
                    ['discount_id' => $request->discountIds[$i], 'status' => $request->requests[$i]]
                );
            }

            $discounts = DB::table('customer_discounted_amounts')
                ->where([
                    ['ticket_id', $request->ticket_id],
                    ['tenant_id', auth()->user()->tenant_id]
                ])
                ->get();

            foreach ($discounts as $discount) {

                $per_discount = floatval($discount->discount) / intval($discount->no_approved);
                $count_approved = DB::table('customer_discount_statuses')
                    ->where([
                        ['tenant_id', auth()->user()->tenant_id],
                        ['ticket_id', $request->ticket_id],
                        ['discount_id', $discount->discount_id],
                        ['status', true]
                    ])
                    ->select(DB::raw('count(status) as approved'))
                    ->first();

                $discounted_amt = $per_discount * $count_approved->approved;

                CustomerDiscountedAmount::where([
                    ['ticket_id', $request->ticket_id],
                    ['tenant_id', auth()->user()->tenant_id],
                    ['discount_id', $discount->discount_id]
                ])
                    ->delete();

                CustomerDiscountedAmount::create([
                    'ticket_id' => $request->ticket_id,
                    'tenant_id' => auth()->user()->tenant_id,
                    'discount_id' => $discount->discount_id,
                    'no_approved' => $count_approved->approved,
                    'rider_no_approved' => $count_approved->approved,
                    'discount' => $discounted_amt,
                    'rider_discount' => $discounted_amt
                ]);
            }
        });

        return response()->json(['message' => 'Customer discounted amout has successfully updated'], 200);
    }

    public function update_unit_price(Request $request)
    {
        DB::transaction(function () use ($request) {

            $data = $request->validate([
                'product_price' => ['required', 'numeric'],
                'measurement' => ['required', 'numeric']
            ]);

            $total_price = intval($request->quantity) * floatval($data['product_price']);

            TomsCustomerOrder::where('id', $request->id)
                ->update([
                    'product_price' => $data['product_price'],
                    'measurement' => $data['measurement'],
                    'total_price' => $total_price
                ]);
        });

        return response()->json(['message' => 'Unit Price has been successfully updated', 200]);
    }

    public function fetch_best_items($date_from, $date_to)
    {
        // return $products = TomsCustomerOrder::join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
        //     ->select('toms_customer_orders.product_id', 'product_name', 'image')
        //     ->where('fd_products.tenant_id', auth()->user()->tenant_id)
        //     ->get()
        //     ->groupBy('toms_customer_orders.product_id');

        $products = FdProduct::with(['unit_measurement'])
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->select('fd_products.product_id', 'product_name', 'image', 'uom_id', 'price')
            ->where('tenant_id', auth()->user()->tenant_id)
            ->get();

        $responseData = array();
        foreach ($products as $product) {

            $orders = TomsCustomerOrder::where([
                ['product_id', $product->product_id],
                ['uom_id', $product->uom_id]
            ])
                ->select(DB::raw('count(*) as num_bought'))
                ->whereDate('submitted_at', '>=', $date_from)
                ->whereDate('submitted_at', '<=', $date_to)
                ->first();

            if ($orders['num_bought'] > 0) {

                $responseData[] = [
                    'order' => $orders['num_bought'],
                    'product_id' => $product->product_id,
                    'product_name' => $product->product_name,
                    'image' => $product->image,
                    'uom_id' => $product->uom_id,
                    'unit_measurement' => $product->unit_measurement,
                    'price' => $product->price
                ];
            }
        }

        arsort($responseData);
        $data = array();
        foreach ($responseData as $key => $val) {
            $data[] = $val;
        }

        return response()->json($data);
    }

    public function tfp_electronic(Request $request)
    {
        DB::beginTransaction();
        $customerOrders = TomsCustomerOrder::select('toms_customer_orders.id as order_id')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.tag_status', false],
                ['fd_products.tenant_id', auth()->user()->tenant_id],
                ['toms_customer_orders.ticket_id', $request->ticket_id]
            ])
            ->get();

        foreach ($customerOrders as $order) {

            TomsCustomerOrder::where('id', $order->order_id)
                ->update([
                    'tag_status' => true,
                    'tag_status_at' => $this->now
                ]);
        }

        $lastTouch = TomsCustomerOrder::select('fd_products.tenant_id', 'toms_customer_orders.updated_at')
            ->join('fd_products', 'toms_customer_orders.product_id', '=', 'fd_products.product_id')
            ->where([
                ['toms_customer_orders.tag_status', false],
                ['toms_customer_orders.ticket_id', $request->ticket_id]
            ])
            ->get()
            ->groupBy('tenant_id');

        $tickets = Ticket::find($request->ticket_id);

        if (empty($lastTouch->first())) {

            $bill = CustomerBill::where('ticket_id', $request->ticket_id)
                ->first();

            $change = number_format($bill->change, 2);

            FdCustomerOrderDetail::where([
                ['tenant_id', auth()->user()->tenant_id],
                ['ticket_id', $request->ticket_id]
            ])
                ->update([
                    'change' => $bill->change,
                    'last_tenant' => true
                ]);

            broadcast(new ItemReadyForPickUp($tickets->customer_id, $request->ticket_id))->toOthers();
            broadcast(new ForPickUp())->toOthers();
            DB::commit();
            return response()->json([
                'message' => 'success',
                'change' => $change,
                'no_tenants' => count($lastTouch)
            ], 200);
        } else {

            broadcast(new ItemReadyForPickUp($tickets->customer_id, $request->ticket_id))->toOthers();
            broadcast(new ForPickUp())->toOthers();
            DB::commit();
            return response()->json([
                'message' => 'Customer Order has been tagged for pick up!',
                'no_tenants' => count($lastTouch)
            ], 200);
        }
    }

    public function delivery_charge($param)
    {
        $data = json_decode(base64_decode($param));
        return TblDeliveryCharge::select('town_id', 'brgy_id', 'charge_amt')
            ->where([
                ['town_id', $data->customer_address->town_id],
                ['vtype', $data->vehicle]
            ])
            ->get();
    }

    public function check_time(Request $request)
    {
        $order_time = date('H:i:00', strtotime($request->order_time));

        if (strtotime($request->from_time) <=  strtotime($order_time) && strtotime($request->to_time) >= strtotime($order_time)) {
            return response()->json(['validate' => false], 200);
        } else {

            if (strtotime($request->from_time) >  strtotime($order_time)) {
                return response()->json(['validate' => true, 'message' => 'Schedule Time must be ' . date('h:i A', strtotime($request->from_time)) . ' or later.'], 200);
            } else {
                return response()->json(['validate' => true, 'message' => 'Schedule Time must be ' . date('h:i A', strtotime($request->to_time)) . ' or earlier.'], 200);
            }
        }
    }
}
