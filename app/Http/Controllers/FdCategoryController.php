<?php

namespace App\Http\Controllers;

use App\FdCategory;
use Illuminate\Http\Request;

class FdCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function fetch_product_type()
    {
        $types = FdCategory::where([
            ['active', 1],
            ['tenant_id', auth()->user()->tenant_id]
        ])
            ->get();
        return $types;
    }

    public function fetch_category_list()
    {
        $categories = FdCategory::where('tenant_id', auth()->user()->tenant_id)
            ->select('category_id', 'tenant_id', 'category', 'image', 'active')
            ->get();

        $result = array();
        foreach ($categories as $category) {

            $status = ($category->active == 1) ? "active" : "inactive";

            $result[] = [
                'category_id' => $category->category_id,
                'tenant_id' => $category->tenant_id,
                'category' => $category->category,
                'image' => $category->image,
                'status' => $status
            ];
        }
        return response()->json($result);
    }

    public function add_category(Request $request)
    {
        $data = $request->validate([
            'category' => ['required', 'string', 'max:255'],
            'image' => ['required', 'image'],
        ]);

        // storage/$imagePath
        // $imagePath = request('image')->store('uploads/fd_categories', 'public');
        $image_name = addslashes($_FILES['image']['name']);
        $array  = explode(".", $image_name);

        $filename   = date('Y-m-d H-i-s-A') . "." . end($array);
        $imagePath   = "uploads/fd_categories/" . $filename;

        move_uploaded_file($_FILES['image']['tmp_name'], "../storetenant.alturush.com/storage/".$imagePath); 

        $category = FdCategory::create([
            'tenant_id' => auth()->user()->tenant_id,
            'category' => $data['category'],
            'image' => $imagePath,
            'active' => 1
        ]);

        return response()->json(['message' => 'Category Details are successfully saved.'], 200);
    }

    public function update_status(Request $request)
    {
        $category = FdCategory::where('category_id', $request->id)
            ->update(['active' => $request->status]);

        return response()->json(['message' => 'Category Status has been updated.'], 200);
    }

    public function fetch_category_details($category_id)
    {
        return FdCategory::where('category_id', $category_id)
            ->first();
    }

    public function update_category(Request $request)
    {

        $data = $request->validate([
            'category' => ['required', 'string', 'max:255'],
            'image' => ['image'],
        ]);

        if (request('image')) {
            // $imagePath = request('image')->store('uploads/fd_categories', 'public');
            // $imageArray = ['image' => $imagePath];
            
            $image      = addslashes(file_get_contents($_FILES['image']['tmp_name']));
            $image_name = addslashes($_FILES['image']['name']);    
            $array  = explode(".",$image_name); 
            
            $filename   = date('Y-m-d H-i-s-A').".".end($array);
            $imagePath   = "uploads/fd_categories/".$filename; 
            $imageArray = ['image' => $imagePath];

            // unlink('storage/'.$request->previous_image);
            move_uploaded_file($_FILES['image']['tmp_name'], "../storetenant.alturush.com/storage/".$imagePath);

            unlink('../storetenant.alturush.com/storage/'.$request->previous_image);
        }

        $arrayData = array_merge(
            $data,
            $imageArray ?? []
        );

        $category = FdCategory::where('category_id', $request->category_id)
                                ->update($arrayData);

        return response()->json(['message' => 'Category Detail has been updated.'], 200);
    }
}
