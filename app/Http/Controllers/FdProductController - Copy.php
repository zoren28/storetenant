<?php

namespace App\Http\Controllers;

use App\Barangay;
use App\FdAddonFlavor;
use App\FdAddonSuggestion;
use App\FdItemPackage;
use App\FdProduct;
use App\FdProductAddon;
use App\FdProductCategory;
use App\FdProductChoice;
use App\FdProductPrice;
use App\FdProductPriceHistory;
use App\FdProductSuggestion;
use App\FdSubtituteProduct;
use App\Imports\ProductsImport;
use App\PriceHistory;
use App\TomsCustomerOrder;
use App\TomsCustomerOrderAddon;
use App\TomsCustomerOrderChoice;
use App\TomsCustomerOrderSuggestion;
use App\Town;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ZipArchive;

class FdProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function import_product_masterfile(Request $request)
    {

        $extension = request()->file('file')->getClientOriginalExtension();

        // $path = request()->file->storeAs('temp', time() . '.' . $extension);
        // $path = storage_path('app') . '/' . $path;

        $filename   = time() . "." . $extension;
        $path   = public_path() . '/storage/temp/' . $filename;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $path)) {

            Excel::import(new ProductsImport, $path);
            unlink($path);
        } else {

            return response()->json(['message' => 'failure to upload'], 500);
        }


        return response()->json(['message' => 'uploaded successfully'], 200);
    }

    public function import_category_pictures(Request $request)
    {
        DB::transaction(function () use ($request) {

            $target_dir = public_path() . '/storage/uploads/fd_categories/';

            if (!file_exists($target_dir . 'temp')) {

                mkdir($target_dir . 'temp', 0777, true);
            }

            $file_name = addslashes($_FILES['file']['name']);
            $array  = explode(".", $file_name);

            $filename   = date('Y-m-d H-i-s-A') . "." . end($array);
            $target_file   = $target_dir . 'temp/' . $filename;

            if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {

                $dir = $target_dir . 'temp/category';

                $zip = new ZipArchive;
                $res = $zip->open($target_file);
                if ($res === TRUE) {

                    $zip->extractTo($dir);
                    $zip->close();
                } else {

                    die("failure to extract");
                }

                if (is_dir($dir)) {
                    if ($dh = opendir($dir)) {

                        while (($file = readdir($dh)) !== false) {

                            $filename = explode(".", $file);
                            $category = reset($filename);
                            $file_type = end($filename);

                            if ($category !== '') {


                                $category_name = str_replace('+', '_', $category);
                                $image = $category_name . '.' . $file_type;

                                $fd_category = DB::table('fd_categories')
                                    ->where('category', trim($category))
                                    ->first();

                                if (!empty($fd_category) && $fd_category->image != '') {

                                    unlink(public_path() . '/storage/' . $fd_category->image);

                                    DB::table('fd_categories')
                                        ->where('category', trim($category))
                                        ->update([
                                            'image' => 'uploads/fd_categories/' . $image
                                        ]);

                                    rename($dir . '/' . $file, $target_dir . '' . $image);
                                } else if (!empty($fd_category) && $fd_category->image == '') {

                                    DB::table('fd_categories')
                                        ->where('category', trim($category))
                                        ->update([
                                            'image' => 'uploads/fd_categories/' . $image
                                        ]);

                                    rename($dir . '/' . $file, $target_dir . '' . $image);
                                } else {
                                }
                            }
                        }
                        closedir($dh);
                    }
                }

                $it = new RecursiveDirectoryIterator($target_dir . 'temp', RecursiveDirectoryIterator::SKIP_DOTS);
                $files = new RecursiveIteratorIterator(
                    $it,
                    RecursiveIteratorIterator::CHILD_FIRST
                );
                foreach ($files as $file) {
                    if ($file->isDir()) {
                        rmdir($file->getRealPath());
                    } else {
                        unlink($file->getRealPath());
                    }
                }
                rmdir($target_dir . 'temp');
            }
        });

        return response()->json(['message' => 'Category pictures have been uploaded successfully'], 200);
    }

    public function import_product_pictures(Request $request)
    {
        DB::transaction(function () use ($request) {

            $target_dir = public_path() . '/storage/uploads/fd_products/';

            if (!file_exists($target_dir . 'temp')) {

                mkdir($target_dir . 'temp', 0777, true);
            }

            $file_name = addslashes($_FILES['file']['name']);
            $array  = explode(".", $file_name);

            $filename   = date('Y-m-d H-i-s-A') . "." . end($array);
            $target_file   = $target_dir . 'temp/' . $filename;

            if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {

                $dir = $target_dir . 'temp/product';

                $zip = new ZipArchive;
                $res = $zip->open($target_file);
                if ($res === TRUE) {

                    $zip->extractTo($dir);
                    $zip->close();
                } else {

                    die("failure to extract");
                }

                if (is_dir($dir)) {
                    if ($dh = opendir($dir)) {

                        while (($file = readdir($dh)) !== false) {

                            $filename = explode(".", $file);
                            $product = reset($filename);
                            $file_type = end($filename);

                            if ($product !== '') {


                                $product_name = trim($product);
                                $image = $product_name . '.' . $file_type;

                                $fd_product = DB::table('fd_products')
                                    ->where('item_code', trim($product))
                                    ->first();

                                if (!empty($fd_product) && $fd_product->image != '') {

                                    unlink(public_path() . '/storage/' . $fd_product->image);

                                    DB::table('fd_products')
                                        ->where('item_code', trim($product))
                                        ->update([
                                            'image' => 'uploads/fd_products/' . $image
                                        ]);

                                    rename($dir . '/' . $file, $target_dir . '' . $image);
                                } else if (!empty($fd_product) && $fd_product->image == '') {

                                    DB::table('fd_products')
                                        ->where('item_code', trim($product))
                                        ->update([
                                            'image' => 'uploads/fd_products/' . $image
                                        ]);

                                    rename($dir . '/' . $file, $target_dir . '' . $image);
                                } else {
                                }
                            }
                        }
                        closedir($dh);
                    }
                }

                $it = new RecursiveDirectoryIterator($target_dir . 'temp', RecursiveDirectoryIterator::SKIP_DOTS);
                $files = new RecursiveIteratorIterator(
                    $it,
                    RecursiveIteratorIterator::CHILD_FIRST
                );
                foreach ($files as $file) {
                    if ($file->isDir()) {
                        rmdir($file->getRealPath());
                    } else {
                        unlink($file->getRealPath());
                    }
                }
                rmdir($target_dir . 'temp');
            }
        });

        return response()->json(['message' => 'Product pictures have been uploaded successfully'], 200);
    }

    public function retrieveProductDetails($product_id)
    {
        $product = FdProduct::with(['prices'])->find($product_id);

        $tenant_id = Auth::user()->tenant_id;

        $product_suggestions = DB::table('fd_addon_suggestions')->join('fd_product_suggestions', 'fd_product_suggestions.id', 'fd_addon_suggestions.product_suggestion_id')
            ->join('fd_suggestions', 'fd_suggestions.id', 'fd_product_suggestions.suggestion_id')
            ->join('fd_product_prices', 'fd_product_prices.product_id', 'fd_addon_suggestions.product_id')
            ->where('fd_addon_suggestions.product_id', $product_id)
            ->get()
            ->groupBy('suggestion_id');

        $drinks_choices = FdProductChoice::with(['availability', 'subFoodProducts', 'uom'])->where([['product_id', $product_id], ['choice_drinks', 1]])->get();

        $fries_choices = FdProductChoice::with(['availability', 'subFoodProducts', 'uom'])->where([['product_id', $product_id], ['choice_fries', 1]])->get();

        $sides_choices = FdProductChoice::with(['availability', 'subFoodProducts', 'uom'])->where([['product_id', $product_id], ['choice_sides', 1]])->get();

        $drinks_addons = FdProductAddOn::with(['availability', 'subFoodProducts', 'uom'])->where([['product_id', $product_id], ['addon_drinks', 1]])->get();

        $sides_addons = FdProductAddOn::with(['availability', 'subFoodProducts', 'uom'])->where([['product_id', $product_id], ['addon_sides', 1]])->get();

        $desserts_addons = FdProductAddOn::with(['availability', 'subFoodProducts', 'uom'])->where([['product_id', $product_id], ['addon_dessert', 1]])->get();

        $upgradable_items = FdProductAddOn::with(['availability', 'subFoodProducts', 'uom'])->where([['product_id', $product_id], ['upgradable_item', 1]])->get();

        $food_sizes = FdProductPrice::with(['availability', 'subFoodProducts', 'uom'])->where('product_id', $product_id)->get();

        $default_suggestions = [];

        foreach ($product_suggestions as $key => $suggestion) {
            $s = $suggestion->filter(function ($s) {
                return $s->default_choice;
            })->first();

            $default_suggestions[$key] = [
                'addon_price'           => $s->addon_price,
                'product_suggestion_id' => $s->product_suggestion_id,
            ];
        }

        // dump($default_suggestions);

        $primary_uom = $food_sizes->filter(function ($size) {
            return $size->primary_uom == 1 && $size->available == 1;
        });

        // dump($food_sizes);

        $default_size = $food_sizes->filter(function ($size) {
            $primary_uom = $size->primary_uom;

            $available = $size->available;

            return $primary_uom && $available;
        });

        // dd($default_size);

        $default_size = $default_size->count() ? ['price' => $default_size->first()->price, 'uomId' => $default_size->first()->uom_id] : null;

        $default_drink = $drinks_choices->filter(function ($drink) {
            $default_choice = $drink->default_choice;

            $uom_id = $drink->uom_id;

            $available = 0;

            $availability = $drink->availability->filter(function ($a) use ($uom_id) {
                return $a->uom_id == $uom_id;
            });

            if ($availability->count()) {
                $available = $availability->first()->available;
            } else {
                $available = $drink->availability->first()->available;
            }

            return $default_choice && $available;
        });

        $default_drink = $default_drink->count() ? ['price' => $default_drink->first()->addon_price, 'productId' => $default_drink->first()->choice_id, 'uomId' => $default_drink->first()->uom_id] : null;

        // dd($fries_choices);

        $default_fry = $fries_choices->filter(function ($fry) {
            $default_choice = $fry->default_choice;

            $uom_id = $fry->uom_id;

            $available = 0;

            $availability = $fry->availability->filter(function ($a) use ($uom_id) {
                return $a->uom_id == $uom_id;
            });

            // dump($availability, $availability->count());

            if ($availability->count()) {
                $available = $availability->first()->available;
            } else {
                $available = $fry->availability->first()->available;
            }

            return $default_choice && $available;
        });

        $default_fry = $default_fry->count() ? ['price' => $default_fry->first()->addon_price, 'productId' => $default_fry->first()->choice_id, 'uomId' => $default_fry->first()->uom_id] : null;

        $default_side = $sides_choices->filter(function ($side) {
            $default_choice = $side->default_choice;

            $uom_id = $side->uom_id;

            $available = 0;

            $availability = $side->availability->filter(function ($a) use ($uom_id) {
                return $a->uom_id == $uom_id;
            });

            if ($availability->count()) {
                $available = $availability->first()->available;
            } else {
                $available = $side->availability->first()->available;
            }

            return $default_choice && $available;
        });

        $default_side = $default_side->count() ? [
            'price'     => $default_side->first()->addon_price,
            'productId' => $default_side->first()->choice_id,
            'uomId'     => $default_side->first()->uom_id,
        ] : null;

        // $default_suggestion = $suggestions->filter(function ($flavor) {
        //     return $flavor->default_choice == 1;
        // });

        // $default_suggestion = $default_suggestion->count() ? ['price' => $default_suggestion->first()->addon_price, 'flavorId' => $default_suggestion->first()->flavor_id] : null;
        $primary_uom = $primary_uom->count() ? $primary_uom->first()->uom_id : null;

        $productDetails = compact(
            'product',
            'product_suggestions',
            'default_suggestions',
            'drinks_choices',
            'fries_choices',
            'sides_choices',
            'drinks_addons',
            'sides_addons',
            'desserts_addons',
            'upgradable_items',
            'food_sizes',
            'primary_uom',
            'default_drink',
            'default_fry',
            'default_side',
            'default_size'
        );

        $productSubs = [];

        // if (request()->tempOrderId) {
        //     $tempOrderId = request()->tempOrderId;
        //     $productSubs = $this->getProductTempOrders($tempOrderId, $product_id);
        // }

        if (request()->orderId) {
            $orderId = request()->orderId;
            $productSubs = $this->getProductOrders($orderId, $product_id);
        }

        return response()->json(compact('productDetails', 'productSubs'), 200);
    }

    public function getProductOrders($order_id, $product_id)
    {
        // $flavors = TomsCustomerOrderFlavor::with(['flavor'])->where('order_id', $order_id)->get();

        $suggestions = TomsCustomerOrderSuggestion::with(['suggestion'])->where('order_id', $order_id)->get()->groupBy('suggestion_id');

        $drinks_choices = TomsCustomerOrderChoice::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['choice_drinks', 1]])->get();

        $fries_choices = TomsCustomerOrderChoice::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['choice_fries', 1]])->get();

        $sides_choices = TomsCustomerOrderChoice::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['choice_sides', 1]])->get();

        $sizes_choices = TomsCustomerOrder::with(['uom'])->where([['id', $order_id], ['product_id', $product_id]])->get();

        $drinks_addons = TomsCustomerOrderAddon::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['addon_drinks', 1]])->get();

        $sides_addons = TomsCustomerOrderAddon::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['addon_sides', 1]])->get();

        $desserts_addons = TomsCustomerOrderAddon::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['addon_dessert', 1]])->get();

        $upgradable_items = TomsCustomerOrderAddon::with(['subFoodProducts', 'uom'])->where([['order_id', $order_id], ['upgradable_item', 1]])->get();

        return compact('suggestions', 'drinks_choices', 'fries_choices', 'sides_choices', 'drinks_addons', 'sides_addons', 'desserts_addons', 'sizes_choices', 'upgradable_items');
    }

    public function store(Request $request)
    {
        DB::transaction(function () use ($request) {

            // return response()->json($request->all(), 500);
            $data = $request->validate([
                'product_name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
                'image' => ['required', 'mimes:jpeg,jpg,png'],
                'location_range' => ['required', 'integer']
            ]);

            // storage/$imagePath
            // $imagePath = request('image')->store('uploads/fd_products', 'public');
            $image_name = addslashes($_FILES['image']['name']);
            $array  = explode(".", $image_name);

            $filename   = date('Y-m-d H-i-s-A') . "." . end($array);
            $imagePath   = "uploads/fd_products/" . $filename;

            move_uploaded_file($_FILES['image']['tmp_name'], "storage/" . $imagePath);
            // move_uploaded_file($_FILES['image']['tmp_name'], "../storetenant.alturush.com/storage/".$imagePath); 

            $time_start = null;
            $time_end = null;
            if ($request->breakfast == 1) {

                $time_start = date("H:i:s", strtotime($request->time_start));
                $time_end = date("H:i:s", strtotime($request->time_end));
            }

            if ($request->no_specific_price == 'true' || $request->no_specific_price == 1) {

                $no_specific_price = 1;
            } else {

                $no_specific_price = 0;
            }

            if ($request->free_menu == 'true' || $request->free_menu == 1) {

                $free_menu = 1;
            } else {

                $free_menu = 0;
            }

            if ($request->promo == 'true' || $request->promo == 1) {

                $promo = 1;
            } else {

                $promo = 0;
            }

            $products = FdProduct::create([
                'tenant_id' => auth()->user()->tenant_id,
                'product_name' => $data['product_name'],
                'description' => $data['description'],
                'image' => $imagePath,
                'variation' => $request->variation,
                'location_range' => $data['location_range'],
                'no_flavor' => $request->no_flavor,
                'no_drinks' => $request->no_drinks,
                'no_fries' => $request->no_fries,
                'no_sides' => $request->no_choice_sides,
                'no_specific_price' => $no_specific_price,
                'price_per_gram' => $request->price_per_gram,
                'free_menu' => $free_menu,
                'promo' => $promo,
                'breakfast' => $request->breakfast,
                'breakfast_start' => $time_start,
                'breakfast_end' => $time_end
            ]);

            foreach ($request->categories as $category) {

                FdProductCategory::create([
                    'category_id' => $category,
                    'product_id' => $products->product_id,
                ]);
            }

            if ($request->uom_ids != null) {

                for ($i = 0; $i < count($request->uom_ids); $i++) {

                    $availability = true;
                    $stocks = '';
                    if ($request->uom_stocks[$i] == null) {
                        $stocks = null;
                    } else if ($request->uom_stocks[$i] == '0') {
                        $availability = false;
                        $stocks = $request->uom_stocks[$i];
                    } else {
                        $availability = true;
                        $stocks = $request->uom_stocks[$i];
                    }

                    FdProductPrice::create([
                        'product_id' => $products->product_id,
                        'uom_id' => $request->uom_ids[$i],
                        'price' => $request->uom_prices[$i],
                        'stocks' => $stocks,
                        'primary_uom' => $request->uom_default[$i],
                        'available' => $availability
                    ]);
                }
            } else {

                $availability = true;
                $stocks = '';
                if ($request->stocks == null) {
                    $stocks = null;
                } else if ($request->stocks == '0') {
                    $availability = false;
                    $stocks = $request->stocks;
                } else {
                    $availability = true;
                    $stocks = $request->stocks;
                }

                FdProductPrice::create([
                    'product_id' => $products->product_id,
                    'price' => $request->price,
                    'stocks' => $stocks,
                    'primary_uom' => 1,
                    'available' => $availability
                ]);
            }

            if ($request->suggestion != null) {

                $suggestions = array_keys($request->suggestion);
                $suggestion_values = array_values($request->suggestion);

                foreach ($suggestions as $key => $suggestion_id) {

                    $ids = $suggestion_values[$key]['ids'];
                    $prices = $suggestion_values[$key]['prices'];
                    $default = $suggestion_values[$key]['default'];

                    for ($i = 0; $i < count($ids); $i++) {

                        FdAddonSuggestion::create([
                            'product_id' => $products->product_id,
                            'product_suggestion_id' => $ids[$i],
                            'default_choice' => $default[$i],
                            'addon_price' => $prices[$i]
                        ]);
                    }
                }
            }

            if ($request->drinks_ids != null) {

                for ($i = 0; $i < count($request->drinks_ids); $i++) {

                    FdProductChoice::create([
                        'product_id' => $products->product_id,
                        'choice_id' => $request->drinks_ids[$i],
                        'details_id' => $request->drinks_detail_ids[$i],
                        'uom_id' => $request->drinks_uom_ids[$i],
                        'default_choice' => $request->drinks_default[$i],
                        'choice_drinks' => true,
                        'addon_price' => $request->drinks_prices[$i]
                    ]);
                }
            }

            if ($request->fries_ids != null) {

                for ($i = 0; $i < count($request->fries_ids); $i++) {

                    FdProductChoice::create([
                        'product_id' => $products->product_id,
                        'choice_id' => $request->fries_ids[$i],
                        'details_id' => $request->fries_detail_ids[$i],
                        'uom_id' => $request->fries_uom_ids[$i],
                        'default_choice' => $request->fries_default[$i],
                        'choice_fries' => true,
                        'addon_price' => $request->fries_prices[$i]
                    ]);
                }
            }

            if ($request->choice_sides_ids != null) {

                for ($i = 0; $i < count($request->choice_sides_ids); $i++) {

                    FdProductChoice::create([
                        'product_id' => $products->product_id,
                        'choice_id' => $request->choice_sides_ids[$i],
                        'details_id' => $request->choice_sides_detail_ids[$i],
                        'uom_id' => $request->choice_sides_uom_ids[$i],
                        'default_choice' => $request->choice_sides_default[$i],
                        'choice_sides' => true,
                        'addon_price' => $request->choice_sides_prices[$i]
                    ]);
                }
            }

            if ($request->sides_ids != null) {

                for ($i = 0; $i < count($request->sides_ids); $i++) {

                    FdProductAddon::create([
                        'product_id' => $products->product_id,
                        'addon_id' => $request->sides_ids[$i],
                        'details_id' => $request->sides_detail_ids[$i],
                        'uom_id' => $request->sides_uom_ids[$i],
                        'addon_sides' => true,
                        'addon_price' => $request->sides_prices[$i]
                    ]);
                }
            }

            if ($request->addon_drinks_ids != null) {

                for ($i = 0; $i < count($request->addon_drinks_ids); $i++) {

                    FdProductAddon::create([
                        'product_id' => $products->product_id,
                        'addon_id' => $request->addon_drinks_ids[$i],
                        'details_id' => $request->addon_drinks_detail_ids[$i],
                        'uom_id' => $request->addon_drinks_uom_ids[$i],
                        'addon_sides' => true,
                        'addon_price' => $request->addon_drinks_prices[$i]
                    ]);
                }
            }

            if ($request->dessert_ids != null) {

                for ($i = 0; $i < count($request->dessert_ids); $i++) {

                    FdProductAddon::create([
                        'product_id' => $products->product_id,
                        'addon_id' => $request->dessert_ids[$i],
                        'details_id' => $request->dessert_detail_ids[$i],
                        'uom_id' => $request->dessert_uom_ids[$i],
                        'addon_dessert' => true,
                        'addon_price' => $request->dessert_prices[$i]
                    ]);
                }
            }

            if ($request->upgrade_ids != null) {

                for ($i = 0; $i < count($request->upgrade_ids); $i++) {

                    FdProductAddon::create([
                        'product_id' => $products->product_id,
                        'addon_id' => $request->upgrade_ids[$i],
                        'details_id' => $request->upgrade_detail_ids[$i],
                        'uom_id' => $request->upgrade_uom_ids[$i],
                        'upgradable_item' => true,
                        'addon_price' => $request->upgrade_prices[$i]
                    ]);
                }
            }
        });

        return response()->json(['message' => 'Product Details are successfully saved.'], 200);
    }

    public function show()
    {
        return FdProduct::with('uoms')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where('tenant_id', auth()->user()->tenant_id)
            ->get();
    }

    public function update_status(Request $request)
    {

        FdProduct::where('product_id', $request->id)
            ->update(['active' => $request->status]);

        return response()->json(['message' => 'Product Status has been updated.'], 200);
    }

    public function fetch_product_details($id)
    {

        return FdProduct::with([
            'product_categories',
            'product_price',
            'addon_suggestion.product_suggestion',
            'product_choice',
            'product_addon'
        ])->find($id);
    }

    public function update_product_stock(Request $request)
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

    public function update_product_details(Request $request)
    {

        DB::transaction(function () use ($request) {

            $data = $request->validate([
                'product_name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
                'image' => ['mimes:jpeg,jpg,png', 'nullable'],
                'location_range' => ['required', 'integer']
            ]);

            // storage/$imagePath
            if (request('image')) {

                $image_name = addslashes($_FILES['image']['name']);
                $array  = explode(".", $image_name);

                $filename   = date('Y-m-d H-i-s-A') . "." . end($array);
                $imagePath   = "uploads/fd_products/" . $filename;

                move_uploaded_file($_FILES['image']['tmp_name'], "storage/" . $imagePath);
                unlink('storage/' . $request->previous_image);
            } else {

                $imagePath = $request->previous_image;
            }

            $time_start = null;
            $time_end = null;
            if ($request->breakfast == 1) {

                $time_start = date("H:i:s", strtotime($request->time_start));
                $time_end = date("H:i:s", strtotime($request->time_end));
            }

            if ($request->no_specific_price == 'true' || $request->no_specific_price == 1) {

                $no_specific_price = 1;
            } else {

                $no_specific_price = 0;
            }

            if ($request->free_menu == 'true' || $request->free_menu == 1) {

                $free_menu = 1;
            } else {

                $free_menu = 0;
            }

            if ($request->promo == 'true' || $request->promo == 1) {

                $promo = 1;
            } else {

                $promo = 0;
            }

            FdProduct::where('product_id', $request->product_id)
                ->update([
                    'product_name' => $data['product_name'],
                    'description' => $data['description'],
                    'image' => $imagePath,
                    'variation' => $request->variation,
                    'location_range' => $data['location_range'],
                    'no_flavor' => $request->no_flavor,
                    'no_drinks' => $request->no_drinks,
                    'no_fries' => $request->no_fries,
                    'no_sides' => $request->no_choice_sides,
                    'no_specific_price' => $no_specific_price,
                    'price_per_gram' => $request->price_per_gram,
                    'free_menu' => $free_menu,
                    'promo' => $promo,
                    'breakfast' => $request->breakfast,
                    'breakfast_start' => $time_start,
                    'breakfast_end' => $time_end
                ]);

            // delete fd_product_categories table
            FdProductCategory::where('product_id', $request->product_id)->delete();

            foreach ($request->categories as $category) {

                // insert fd_product_categories table
                FdProductCategory::create([
                    'category_id' => $category,
                    'product_id' => $request->product_id,
                ]);
            }

            if ($request->uom_ids != null) {

                FdProductPrice::where('product_id', $request->product_id)
                    ->delete();

                for ($i = 0; $i < count($request->uom_ids); $i++) {

                    $availability = true;
                    $stocks = '';
                    if ($request->uom_stocks[$i] == null) {
                        $stocks = null;
                    } else if ($request->uom_stocks[$i] == '0') {
                        $availability = false;
                        $stocks = $request->uom_stocks[$i];
                    } else {
                        $availability = true;
                        $stocks = $request->uom_stocks[$i];
                    }

                    $previous = FdProductPrice::select('price')
                        ->where([
                            ['product_id', $request->product_id],
                            ['uom_id', $request->uom_ids[$i]]
                        ])
                        ->first();

                    if ($previous != null && $previous->price != $request->uom_prices[$i]) {
                        FdProductPriceHistory::create([
                            'product_id' => $request->product_id,
                            'uom_id' => $request->uom_ids[$i],
                            'price' => $request->uom_prices[$i],
                            'previous_price' => $previous->price
                        ]);
                    }

                    FdProductPrice::create([
                        'product_id' => $request->product_id,
                        'uom_id' => $request->uom_ids[$i],
                        'price' => $request->uom_prices[$i],
                        'stocks' => $stocks,
                        'primary_uom' => $request->uom_default[$i],
                        'available' => $availability
                    ]);
                }
            } else {

                $availability = true;
                $stocks = '';
                if ($request->stocks == null) {
                    $stocks = null;
                } else if ($request->stocks == '0') {
                    $availability = false;
                    $stocks = $request->stocks;
                } else {
                    $availability = true;
                    $stocks = $request->stocks;
                }

                $previous = FdProductPrice::select('price')
                    ->where('product_id', $request->product_id)
                    ->first();

                if ($previous != null && $previous->price != $request->price) {
                    FdProductPriceHistory::create([
                        'product_id' => $request->product_id,
                        'price' => $request->price,
                        'previous_price' => $previous->price
                    ]);
                }

                FdProductPrice::where('product_id', $request->product_id)
                    ->delete();

                FdProductPrice::create([
                    'product_id' => $request->product_id,
                    'price' => $request->price,
                    'stocks' => $request->stocks,
                    'primary_uom' => 1
                ]);
            }

            FdAddonSuggestion::where('product_id', $request->product_id)
                ->delete();

            if ($request->suggestion != null) {

                $suggestions = array_keys($request->suggestion);
                $suggestion_values = array_values($request->suggestion);

                foreach ($suggestions as $key => $suggestion_id) {

                    $ids = $suggestion_values[$key]['ids'];
                    $prices = $suggestion_values[$key]['prices'];
                    $default = $suggestion_values[$key]['default'];

                    for ($i = 0; $i < count($ids); $i++) {

                        FdAddonSuggestion::create([
                            'product_id' => $request->product_id,
                            'product_suggestion_id' => $ids[$i],
                            'default_choice' => $default[$i],
                            'addon_price' => $prices[$i]
                        ]);
                    }
                }
            }

            if ($request->drinks_ids != null) {

                FdProductChoice::where([
                    ['product_id', $request->product_id],
                    ['choice_drinks', true]
                ])
                    ->delete();

                for ($i = 0; $i < count($request->drinks_ids); $i++) {

                    FdProductChoice::create([
                        'product_id' => $request->product_id,
                        'choice_id' => $request->drinks_ids[$i],
                        'details_id' => $request->drinks_detail_ids[$i],
                        'uom_id' => $request->drinks_uom_ids[$i],
                        'default_choice' => $request->drinks_default[$i],
                        'choice_drinks' => true,
                        'addon_price' => $request->drinks_prices[$i]
                    ]);
                }
            } else {

                FdProductChoice::where([
                    ['product_id', $request->product_id],
                    ['choice_drinks', true]
                ])
                    ->delete();
            }

            if ($request->fries_ids != null) {

                FdProductChoice::where([
                    ['product_id', $request->product_id],
                    ['choice_fries', true]
                ])
                    ->delete();
                for ($i = 0; $i < count($request->fries_ids); $i++) {

                    FdProductChoice::create([
                        'product_id' => $request->product_id,
                        'choice_id' => $request->fries_ids[$i],
                        'details_id' => $request->fries_detail_ids[$i],
                        'uom_id' => $request->fries_uom_ids[$i],
                        'default_choice' => $request->fries_default[$i],
                        'choice_fries' => true,
                        'addon_price' => $request->fries_prices[$i]
                    ]);
                }
            } else {

                FdProductChoice::where([
                    ['product_id', $request->product_id],
                    ['choice_fries', true]
                ])
                    ->delete();
            }

            if ($request->choice_sides_ids != null) {

                FdProductChoice::where([
                    ['product_id', $request->product_id],
                    ['choice_sides', true]
                ])
                    ->delete();

                for ($i = 0; $i < count($request->choice_sides_ids); $i++) {

                    FdProductChoice::create([
                        'product_id' => $request->product_id,
                        'choice_id' => $request->choice_sides_ids[$i],
                        'details_id' => $request->choice_sides_detail_ids[$i],
                        'uom_id' => $request->choice_sides_uom_ids[$i],
                        'default_choice' => $request->choice_sides_default[$i],
                        'choice_sides' => true,
                        'addon_price' => $request->choice_sides_prices[$i]
                    ]);
                }
            } else {

                FdProductChoice::where([
                    ['product_id', $request->product_id],
                    ['choice_sides', true]
                ])
                    ->delete();
            }

            if ($request->addon_drinks_ids != null) {

                FdProductAddon::where([
                    ['product_id', $request->product_id],
                    ['addon_drinks', true]
                ])
                    ->delete();

                for ($i = 0; $i < count($request->addon_drinks_ids); $i++) {

                    FdProductAddon::create([
                        'product_id' => $request->product_id,
                        'addon_id' => $request->addon_drinks_ids[$i],
                        'details_id' => $request->addon_drinks_detail_ids[$i],
                        'uom_id' => $request->addon_drinks_uom_ids[$i],
                        'addon_drinks' => true,
                        'addon_price' => $request->addon_drinks_prices[$i]
                    ]);
                }
            } else {

                FdProductAddon::where([
                    ['product_id', $request->product_id],
                    ['addon_drinks', true]
                ])
                    ->delete();
            }

            if ($request->sides_ids != null) {

                FdProductAddon::where([
                    ['product_id', $request->product_id],
                    ['addon_sides', true]
                ])
                    ->delete();

                for ($i = 0; $i < count($request->sides_ids); $i++) {

                    FdProductAddon::create([
                        'product_id' => $request->product_id,
                        'addon_id' => $request->sides_ids[$i],
                        'details_id' => $request->sides_detail_ids[$i],
                        'uom_id' => $request->sides_uom_ids[$i],
                        'addon_sides' => true,
                        'addon_price' => $request->sides_prices[$i]
                    ]);
                }
            } else {

                FdProductAddon::where([
                    ['product_id', $request->product_id],
                    ['addon_sides', true]
                ])
                    ->delete();
            }

            if ($request->dessert_ids != null) {

                FdProductAddon::where([
                    ['product_id', $request->product_id],
                    ['addon_dessert', true]
                ])
                    ->delete();

                for ($i = 0; $i < count($request->dessert_ids); $i++) {

                    FdProductAddon::create([
                        'product_id' => $request->product_id,
                        'addon_id' => $request->dessert_ids[$i],
                        'details_id' => $request->dessert_detail_ids[$i],
                        'uom_id' => $request->dessert_uom_ids[$i],
                        'addon_dessert' => true,
                        'addon_price' => $request->dessert_prices[$i]
                    ]);
                }
            } else {

                FdProductAddon::where([
                    ['product_id', $request->product_id],
                    ['addon_dessert', true]
                ])
                    ->delete();
            }

            if ($request->upgrade_ids != null) {

                FdProductAddon::where([
                    ['product_id', $request->product_id],
                    ['upgradable_item', true]
                ])
                    ->delete();

                for ($i = 0; $i < count($request->upgrade_ids); $i++) {

                    FdProductAddon::create([
                        'product_id' => $request->product_id,
                        'addon_id' => $request->upgrade_ids[$i],
                        'details_id' => $request->upgrade_detail_ids[$i],
                        'uom_id' => $request->upgrade_uom_ids[$i],
                        'upgradable_item' => true,
                        'addon_price' => $request->upgrade_prices[$i]
                    ]);
                }
            } else {

                FdProductAddon::where([
                    ['product_id', $request->product_id],
                    ['upgradable_item', true]
                ])
                    ->delete();
            }
        });
        return response()->json(['message' => 'Product Details are successfully updated.'], 200);
    }

    public function product_packages()
    {
        $products = FdProduct::select('product_id', 'tenant_id', 'product_name', 'description', 'price', 'unit_measure', 'image', 'active', 'available')->where('package', true)->get();

        $result = array();
        foreach ($products as $product) {

            $imagePath = '/storage/' . $product->image;
            $status = ($product->active == 1) ? "active" : "inactive";
            $available = ($product->available == 1) ? "yes" : "no";
            $result[] = [
                'product_id' => $product->product_id,
                'product_name' => $product->product_name,
                'description' => $product->description,
                'price' => $product->price,
                'unit_measure' => $product->unit_measure,
                'image' => $imagePath,
                'status' => $status,
                'available' => $available
            ];
        }
        return response()->json($result);
    }

    public function fetch_product_packages(Request $request)
    {

        return FdProduct::with(['packages'])->where('package', 1)->get();
    }

    public function fetch_regularproducts(Request $request)
    {

        return FdProduct::where('product_id')->get();
    }

    public function fetch_subproduct_sel(Request $request)
    {

        return FdSubtituteProduct::with(['substitute_product'])
            ->where([['product_id', $request->prod_id], ['package_id', $request->pack_id]])
            ->get();
    }

    public function save_subproduct(Request $request)
    {


        if (!empty($request->for_insert)) {
            foreach ($request->for_insert as $key => $insert) {
                $create = FdSubtituteProduct::create([
                    'product_id' => $request->product_id,
                    'package_id' => $request->package_id,
                    'sub_product_id' => $insert,
                    'quantity' => $request->insert_qty[$key],
                ]);
            }
        }

        if (!empty($request->for_update)) {
            foreach ($request->for_update as $key => $update) {
                FdSubtituteProduct::where([
                    ['product_id', $request->product_id],
                    ['package_id', $request->package_id],
                    ['sub_product_id', $update],
                ])
                    ->update(['quantity' => $request->update_qty[$key]]);
            }
        }

        if (!empty($request->for_delete)) {
            foreach ($request->for_delete as $delete) {
                FdSubtituteProduct::where([
                    ['product_id', $request->product_id],
                    ['package_id', $request->package_id],
                    ['sub_product_id', $delete],
                ])
                    ->delete();
            }
        }
    }

    public function fetch_drinks()
    {
        return FdProduct::with('uoms')
            ->select('fd_products.product_id', 'product_name', 'fd_product_prices.id', 'fd_product_prices.uom_id')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where([
                ['drink', true],
                ['tenant_id', auth()->user()->tenant_id]
            ])
            ->get();
    }

    public function fetch_choice_sides()
    {
        return FdProduct::with('uoms')
            ->select('fd_products.product_id', 'product_name', 'fd_product_prices.id', 'fd_product_prices.uom_id', 'fd_product_prices.price')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where([
                ['choice_side', true],
                ['tenant_id', auth()->user()->tenant_id]
            ])
            ->get();
    }

    public function fetch_addon_sides()
    {
        return FdProduct::with('uoms')
            ->select('fd_products.product_id', 'product_name', 'fd_product_prices.id', 'fd_product_prices.uom_id', 'fd_product_prices.price')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where([
                ['addon_side', true],
                ['tenant_id', auth()->user()->tenant_id]
            ])
            ->get();
    }

    public function fetch_dessert()
    {
        return FdProduct::with('uoms')
            ->select('fd_products.product_id', 'product_name', 'fd_product_prices.id', 'fd_product_prices.uom_id', 'fd_product_prices.price')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where([
                ['dessert', true],
                ['tenant_id', auth()->user()->tenant_id]
            ])
            ->get();
    }

    public function fetch_fries()
    {
        return FdProduct::with('uoms')
            ->select('fd_products.product_id', 'product_name', 'fd_product_prices.id', 'fd_product_prices.uom_id')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where([
                ['fry', true],
                ['tenant_id', auth()->user()->tenant_id]
            ])
            ->get();
    }

    public function fetch_drinks_list($filter)
    {
        return FdProduct::where([
            ['tenant_id', auth()->user()->tenant_id],
            ['drink', $filter],
            ['active', true]
        ])
            ->select('product_id', 'product_name', 'description', 'image')
            ->get();
    }

    public function fetch_fries_list($filter)
    {
        return FdProduct::where([
            ['tenant_id', auth()->user()->tenant_id],
            ['fry', $filter],
            ['active', true]
        ])
            ->select('product_id', 'product_name', 'description', 'image')
            ->get();
    }

    public function fetch_product_choice($choice, $filter)
    {
        if ($choice == 1) {

            return FdProduct::where([
                ['tenant_id', auth()->user()->tenant_id],
                ['drink', $filter],
                ['active', true]
            ])
                ->select('product_id', 'product_name', 'description', 'image')
                ->get();
        } else if ($choice == 2) {

            return FdProduct::where([
                ['tenant_id', auth()->user()->tenant_id],
                ['fry', $filter],
                ['active', true]
            ])
                ->select('product_id', 'product_name', 'description', 'image')
                ->get();
        } else if ($choice == 3) {

            return FdProduct::where([
                ['tenant_id', auth()->user()->tenant_id],
                ['choice_side', $filter],
                ['active', true]
            ])
                ->select('product_id', 'product_name', 'description', 'image')
                ->get();
        }
    }

    public function fetch_addon_sides_list($addon, $filter)
    {
        if ($addon == 1) {

            return FdProduct::where([
                ['tenant_id', auth()->user()->tenant_id],
                ['addon_drink', $filter],
                ['active', true]
            ])
                ->select('product_id', 'product_name', 'description', 'image')
                ->get();
        } else if ($addon == 2) {

            return FdProduct::where([
                ['tenant_id', auth()->user()->tenant_id],
                ['addon_side', $filter],
                ['active', true]
            ])
                ->select('product_id', 'product_name', 'description', 'image')
                ->get();
        } else if ($addon == 3) {

            return FdProduct::where([
                ['tenant_id', auth()->user()->tenant_id],
                ['dessert', $filter],
                ['active', true]
            ])
                ->select('product_id', 'product_name', 'description', 'image')
                ->get();
        }
    }

    public function fetch_addon_dessert_list($filter)
    {
        return FdProduct::where([
            ['tenant_id', auth()->user()->tenant_id],
            ['upgradable_item', $filter],
            ['active', true]
        ])
            ->select('product_id', 'product_name', 'description', 'image')
            ->get();
    }

    public function remove_choice_drink(Request $request)
    {
        FdProduct::where('product_id', $request->product_id)
            ->update([
                'drink' => false
            ]);

        return response()->json(['message' => 'Product has been successfully removed.'], 200);
    }

    public function remove_choice_fries(Request $request)
    {
        FdProduct::where('product_id', $request->product_id)
            ->update([
                'fry' => false
            ]);

        return response()->json(['message' => 'Product has been successfully removed.'], 200);
    }

    public function remove_choice_sides(Request $request)
    {
        if ($request->product_choice == 1) {

            FdProduct::where('product_id', $request->product_id)
                ->update([
                    'drink' => false
                ]);
        } else if ($request->product_choice == 2) {

            FdProduct::where('product_id', $request->product_id)
                ->update([
                    'fry' => false
                ]);
        } else if ($request->product_choice == 3) {

            FdProduct::where('product_id', $request->product_id)
                ->update([
                    'choice_side' => false
                ]);
        }

        FdProductChoice::where('choice_id', $request->product_id)
            ->delete();

        return response()->json(['message' => 'Product has been successfully removed.'], 200);
    }

    public function remove_addon_sides(Request $request)
    {
        if ($request->product_addon == 1) {

            FdProduct::where('product_id', $request->product_id)
                ->update([
                    'addon_drink' => false
                ]);
        } else if ($request->product_addon == 2) {

            FdProduct::where('product_id', $request->product_id)
                ->update([
                    'addon_side' => false
                ]);
        } else if ($request->product_addon == 3) {

            FdProduct::where('product_id', $request->product_id)
                ->update([
                    'dessert' => false
                ]);
        }

        FdProductAddon::where('addon_id', $request->product_id)
            ->delete();

        return response()->json(['message' => 'Product has been successfully removed.'], 200);
    }

    public function remove_addon_dessert(Request $request)
    {
        FdProduct::where('product_id', $request->product_id)
            ->update([
                'upgradable_item' => false
            ]);

        return response()->json(['message' => 'Product has been successfully removed.'], 200);
    }

    public function add_choice_drink(Request $request)
    {
        DB::transaction(function () use ($request) {

            foreach ($request->product_ids as $product_id) {

                FdProduct::where('product_id', $product_id)
                    ->update([
                        'drink' => true
                    ]);
            }
        });

        return response()->json(['message' => 'Product(s) has been successfully added.'], 200);
    }

    public function add_choice_fries(Request $request)
    {
        DB::transaction(function () use ($request) {

            foreach ($request->product_ids as $product_id) {

                FdProduct::where('product_id', $product_id)
                    ->update([
                        'fry' => true
                    ]);
            }
        });

        return response()->json(['message' => 'Product(s) has been successfully added.'], 200);
    }

    public function add_choice_sides(Request $request)
    {
        DB::transaction(function () use ($request) {

            if ($request->product_choice == 1) {

                foreach ($request->product_ids as $product_id) {

                    FdProduct::where('product_id', $product_id)
                        ->update([
                            'drink' => true
                        ]);
                }
            } else if ($request->product_choice == 2) {

                foreach ($request->product_ids as $product_id) {

                    FdProduct::where('product_id', $product_id)
                        ->update([
                            'fry' => true
                        ]);
                }
            } else if ($request->product_choice == 3) {

                foreach ($request->product_ids as $product_id) {

                    FdProduct::where('product_id', $product_id)
                        ->update([
                            'choice_side' => true
                        ]);
                }
            }
        });

        return response()->json(['message' => 'Product(s) has been successfully added.'], 200);
    }

    public function add_addon_sides(Request $request)
    {

        DB::transaction(function () use ($request) {

            if ($request->product_addon == 1) {

                foreach ($request->product_ids as $product_id) {

                    FdProduct::where('product_id', $product_id)
                        ->update([
                            'addon_drink' => true
                        ]);
                }
            } else if ($request->product_addon == 2) {

                foreach ($request->product_ids as $product_id) {

                    FdProduct::where('product_id', $product_id)
                        ->update([
                            'addon_side' => true
                        ]);
                }
            } else if ($request->product_addon == 3) {

                foreach ($request->product_ids as $product_id) {

                    FdProduct::where('product_id', $product_id)
                        ->update([
                            'dessert' => true
                        ]);
                }
            }
        });

        return response()->json(['message' => 'Product(s) has been successfully added.'], 200);
    }

    public function add_addon_dessert(Request $request)
    {
        DB::transaction(function () use ($request) {

            foreach ($request->product_ids as $product_id) {

                FdProduct::where('product_id', $product_id)
                    ->update([
                        'upgradable_item' => true
                    ]);
            }
        });

        return response()->json(['message' => 'Product(s) has been successfully added.'], 200);
    }

    public function fetch_product_price_details($product_id, $id)
    {
        return FdProduct::select('product_name', 'price', 'stocks')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where([
                ['fd_products.product_id', $product_id],
                ['fd_product_prices.id', $id]
            ])
            ->first();
    }

    public function fetch_addon_drinks()
    {
        return FdProduct::with('uoms')
            ->select('fd_products.product_id', 'product_name', 'fd_product_prices.id', 'fd_product_prices.uom_id', 'fd_product_prices.price')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where([
                ['addon_drink', true],
                ['tenant_id', auth()->user()->tenant_id]
            ])
            ->get();
    }

    public function fetch_upgradable_item()
    {
        return FdProduct::with('uoms')
            ->select('fd_products.product_id', 'product_name', 'fd_product_prices.id', 'fd_product_prices.uom_id', 'fd_product_prices.price')
            ->join('fd_product_prices', 'fd_products.product_id', '=', 'fd_product_prices.product_id')
            ->where([
                ['upgradable_item', true],
                ['tenant_id', auth()->user()->tenant_id]
            ])
            ->get();
    }

    public function fetch_location_range()
    {
        $charges =  DB::table('tbl_delivery_charges')
            ->select('town_id', 'brgy_id', 'charge_amt')
            ->orderBy('charge_amt', 'ASC')
            ->get();

        $delivery_charges = [];
        foreach ($charges as $fee) {
            $location = null;
            if ($fee->brgy_id === null || $fee->brgy_id === '') {
                $town = Town::select('town_name')->find($fee->town_id);
                $location = $town->town_name;
            } else {

                $barangay = Barangay::with(['town'])
                    ->where([
                        ['brgy_id', $fee->brgy_id],
                        ['town_id', $fee->town_id]
                    ])
                    ->get();

                foreach ($barangay as $brgy) {

                    $location = $brgy->brgy_name . ", " . $brgy->town->town_name;
                }
            }

            $delivery_charges[] = [
                'location' => $location,
                'riders_fee' => $fee->charge_amt
            ];
        }

        return response()->json($delivery_charges, 200);
    }

    public function delete_product($product_id, $id)
    {
        $request = [
            'product_id' => $product_id,
            'id' => $id
        ];

        DB::transaction(function () use ($request) {

            FdProduct::where('product_id', $request['product_id'])
                ->delete();

            FdProductPrice::where([
                ['id', $request['id']],
                ['product_id', $request['product_id']]
            ])
                ->delete();

            FdProductChoice::where('product_id', $request['product_id'])
                ->orWhere('choice_id', $request['product_id'])
                ->delete();

            FdProductAddon::where('product_id', $request['product_id'])
                ->orWhere('addon_id', $request['product_id'])
                ->delete();

            FdAddonSuggestion::where('product_id', $request['product_id'])
                ->delete();
        });

        return response()->json(['message' => 'Product(s) has been successfully deleted.'], 200);
    }

    public function saved_all_product_details(Request $request)
    {
        // dd($request->all());
        DB::transaction(function () use ($request) {

            $data = $request->validate([
                'product_name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
                'image' => ['required', 'mimes:jpeg,jpg,png'],
                'price' => ['required', 'numeric'],
                'location_range' => ['required', 'integer']
            ]);

            // storage/$imagePath
            // $imagePath = request('image')->store('uploads/fd_products', 'public');
            $image_name = addslashes($_FILES['image']['name']);
            $array  = explode(".", $image_name);

            $filename   = date('Y-m-d H-i-s-A') . "." . end($array);
            $imagePath   = "uploads/fd_products/" . $filename;

            move_uploaded_file($_FILES['image']['tmp_name'], "storage/" . $imagePath);
            // move_uploaded_file($_FILES['image']['tmp_name'], "../storetenant.alturush.com/storage/".$imagePath); 

            $products = FdProduct::create([
                'tenant_id' => auth()->user()->tenant_id,
                'product_name' => $data['product_name'],
                'description' => $data['description'],
                'image' => $imagePath,
                'location_range' => $data['location_range']
            ]);

            foreach ($request->categories as $category) {

                FdProductCategory::create([
                    'category_id' => $category,
                    'product_id' => $products->product_id,
                ]);
            }

            $availability = true;
            $stocks = '';
            if ($request->stocks == null) {
                $stocks = null;
            } else if ($request->stocks == '0') {
                $availability = false;
                $stocks = $request->stocks;
            } else {
                $availability = true;
                $stocks = $request->stocks;
            }

            FdProductPrice::create([
                'product_id' => $products->product_id,
                'price' => $request->price,
                'stocks' => $stocks,
                'primary_uom' => true,
                'available' => $availability
            ]);
        });

        return response()->json(['message' => 'Product Details are successfully saved.'], 200);
    }

    public function fetch_all_product_details($id)
    {
        return FdProduct::with([
            'product_categories',
            'product_price'
        ])->find($id);
    }

    public function update_all_product_details(Request $request)
    {
        DB::transaction(function () use ($request) {

            $data = $request->validate([
                'product_name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
                'image' => ['nullable', 'mimes:jpeg,jpg,png'],
                'price' => ['required', 'numeric'],
                'location_range' => ['required', 'integer']
            ]);

            // storage/$imagePath
            if (request('image')) {

                $image_name = addslashes($_FILES['image']['name']);
                $array  = explode(".", $image_name);

                $filename   = date('Y-m-d H-i-s-A') . "." . end($array);
                $imagePath   = "uploads/fd_products/" . $filename;

                if (move_uploaded_file($_FILES['image']['tmp_name'], "storage/" . $imagePath)) {

                    unlink('storage/' . $request->previous_image);
                }
                // move_uploaded_file($_FILES['image']['tmp_name'], "../storetenant.alturush.com/storage/".$imagePath); 
            } else {

                $imagePath = $request->previous_image;
            }

            FdProduct::where('product_id', $request->product_id)
                ->update([
                    'product_name' => $data['product_name'],
                    'description' => $data['description'],
                    'image' => $imagePath,
                    'location_range' => $data['location_range']
                ]);

            // delete fd_product_categories table
            FdProductCategory::where('product_id', $request->product_id)->delete();

            foreach ($request->categories as $category) {

                // insert fd_product_categories table
                FdProductCategory::create([
                    'category_id' => $category,
                    'product_id' => $request->product_id,
                ]);
            }

            $availability = true;
            $stocks = '';
            if ($request->stocks == null) {
                $stocks = null;
            } else if ($request->stocks == '0') {
                $availability = false;
                $stocks = $request->stocks;
            } else {
                $availability = true;
                $stocks = $request->stocks;
            }

            $previous = FdProductPrice::select('price')
                ->where('product_id', $request->product_id)
                ->first();

            if ($previous != null && $previous->price != $request->price) {
                FdProductPriceHistory::create([
                    'product_id' => $request->product_id,
                    'price' => $request->price,
                    'previous_price' => $previous->price
                ]);
            }

            FdProductPrice::where('product_id', $request->product_id)
                ->update([
                    'price' => $request->price,
                    'stocks' => $stocks,
                    'available' => $availability
                ]);
        });

        return response()->json(['message' => 'Product Details are successfully updated.'], 200);
    }
}
