<?php

namespace App\Imports;

use App\FdCategory;
use App\FdProduct;
use App\FdProductCategory;
use App\FdProductPrice;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsImport implements ToCollection, WithHeadingRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $collection)
    {
        foreach ($collection as $row) {

            if (count($row) === 5) {

                $item = FdProduct::where([
                    ['item_code', trim($row['itemcode'])],
                    ['tenant_id', auth()->user()->tenant_id]
                ])
                    ->first();

                if (empty($item)) {

                    $category = FdCategory::where('category', trim($row['generic_name']))
                        ->first();

                    $category_id = '';
                    if (!empty($category)) {

                        $category_id = $category->category_id;
                    } else {

                        $category = FdCategory::create([
                            'category' => trim($row['generic_name']),
                            'tenant_id' => auth()->user()->tenant_id,
                            'active' => 1
                        ]);

                        $category_id = $category->id;
                    }

                    $product = FdProduct::create([
                        'tenant_id' => auth()->user()->tenant_id,
                        'item_code' => trim($row['itemcode']),
                        'product_name' => trim($row['description']),
                        'description' => trim($row['description']),
                        'active' => true
                    ]);

                    FdProductCategory::create([
                        'category_id' => $category_id,
                        'product_id' => $product->product_id
                    ]);

                    $unit_of_measure = DB::table('fd_uoms')
                        ->where([
                            ['unit_measure', trim($row['uom'])],
                            ['tenant_id', auth()->user()->tenant_id]
                        ])
                        ->first();

                    $uom = '';
                    if (!empty($unit_of_measure)) {
                        $uom = $unit_of_measure->id;
                    }

                    FdProductPrice::create([
                        'product_id' => $product->product_id,
                        'uom_id' => $uom,
                        'price' => trim($row['price']),
                        'primary_uom' => true
                    ]);
                } else {

                    FdProduct::where([
                        ['item_code', trim($row['itemcode'])],
                        ['tenant_id', auth()->user()->tenant_id]
                    ])
                        ->update([
                            'product_name' => trim($row['description']),
                            'product_name' => trim($row['description']),
                            'description' => trim($row['description']),
                            'active' => true
                        ]);

                    $product = FdProduct::where([
                        ['item_code', trim($row['itemcode'])],
                        ['tenant_id', auth()->user()->tenant_id]
                    ])
                        ->first();

                    $unit_of_measure = DB::table('fd_uoms')
                        ->where([
                            ['unit_measure', trim($row['uom'])],
                            ['tenant_id', auth()->user()->tenant_id]
                        ])
                        ->first();

                    $uom = '';
                    if (!empty($unit_of_measure)) {
                        $uom = $unit_of_measure->id;
                    }

                    FdProductPrice::where('product_id', $product->product_id)
                        ->update([
                            'uom_id' => $uom,
                            'price' => trim($row['price']),
                            'primary_uom' => true
                        ]);
                }
            } else {
                die('number of column not match');
            }
        }
    }
}
