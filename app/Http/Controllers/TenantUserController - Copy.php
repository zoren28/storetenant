<?php

namespace App\Http\Controllers;

use App\TenantUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class TenantUserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show()
    {
        return TenantUser::where([
            ['tenant_id', auth()->user()->tenant_id],
            ['user_type', '!=', 'manager']
        ])
            ->get();
    }

    public function fetch_tenant_user_details($tenantId)
    {
        return TenantUser::where([
            ['tenant_id', auth()->user()->tenant_id],
            ['id', $tenantId]
        ])
            ->first();
    }

    public function update_status(Request $request)
    {
        TenantUser::where('id', $request->id)
            ->update(['active' => $request->status]);

        return response()->json(['message' => 'User status has been updated.'], 200);
    }

    public function add_tenant_user(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:tenant_users,username'],
            'email' => ['string', 'email', 'max:255', 'unique:tenant_users,email'],
            'user_type' => ['required', 'string', 'max:255'],
            'image' => ['required', 'mimes:jpeg,jpg,png'],
            'password' => ['required', 'string', 'max:255'],
        ]);

        // storage/$imagePath
        $imagePath = request('image')->store('uploads/tenant_users', 'public');
        // sprintf("%'.05d\n-".date('Y'), 5);

        // $image_name = addslashes($_FILES['image']['name']);    
        // $array  = explode(".",$image_name); 

        // $filename   = "tenant_".time().".".end($array);
        // $destination_path   = "172.16.43.239:7000/images/tenant_users/".$filename; 
        // $imagePath = "images/tenant_users/".$filename;
        // move_uploaded_file($_FILES['image']['tmp_name'], $destination_path);

        TenantUser::create([
            'tenant_id' => auth()->user()->tenant_id,
            'name' => $data['name'],
            'username' => $data['username'],
            'password' => Hash::make($data['password']),
            'email' => $data['email'],
            'user_type' => $data['user_type'],
            'active' => true,
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'User Details are successfully saved.'], 200);
    }

    public function update_tenant_user(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'user_type' => ['required', 'string', 'max:255'],
            'image' => ['image'],
            'password' => ['required', 'string', 'max:255'],
        ]);

        // storage/$imagePath
        if (request('image')) {
            $imagePath = request('image')->store('uploads/tenant_users', 'public');
            $imageArray = ['image' => $imagePath];

            unlink('storage/' . $request->previous_image);

            // $image_name = addslashes($_FILES['image']['name']);    
            // $array  = explode(".",$image_name); 

            // $filename   = "tenant_".time().".".end($array);
            // $destination_path   = "172.16.43.239:7000/images/tenant_users/".$filename; 
            // $imagePath = "images/tenant_users/".$filename;
            // move_uploaded_file($_FILES['image']['tmp_name'], $destination_path);
        }

        $password = ['password' => Hash::make($data['password'])];
        $arrayData = array_merge(
            $data,
            $password,
            $imageArray ?? []
        );

        // update fd_products table
        TenantUser::where('id', $request->id)
            ->update($arrayData);

        return response()->json(['message' => 'User details has been updated.'], 200);
    }

    public function change_password(Request $request)
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'required_with:password_confirmation|confirmed']
        ]);

        $user = TenantUser::find(base64_decode($request->id));

        if (Hash::check($data['current_password'], $user->password)) {

            TenantUser::where('id', base64_decode($request->id))
                ->update(['password' => Hash::make($data['password']), 'first_login' => '0']);

            Auth::logout();

            return response()->json(['password' => 'Match', 'message' => 'Password has been updated'], 200);
        } else {

            return response()->json(['password' => 'Mismatch', 'message' => 'Current Password dont match'], 200);
        }
    }

    public function change_username(Request $request)
    {
        // $data = $request->validate([
        //     'current_username' => ['required'],
        //     'username' => ['required', 'unique:App\TenantUser,username', 'required_with:username_confirmation|confirmed']
        // ]);
        $data = $request->validate([
            'current_username' => ['required'],
            'username' => ['required', Rule::unique('tenant_users')->ignore(auth()->user()), 'required_with:username_confirmation|confirmed']
        ]);


        $user = TenantUser::where([
            ['id', base64_decode($request->id)],
            ['username', $data['current_username']]
        ])->first();

        if ($user !== null) {

            TenantUser::where('id', base64_decode($request->id))
                ->update(['username' => $data['username']]);

            // Auth::logout();

            return response()->json(['username' => 'Match', 'message' => 'Username has been updated'], 200);
        } else {

            return response()->json(['username' => 'Mismatch', 'message' => "Current username dont match"], 200);
        }
    }

    public function fetch_user_profile($id)
    {
        return TenantUser::with(['tenant'])
            ->select('id', 'tenant_id', 'email', 'name', 'image', 'user_type')
            ->find(base64_decode($id));
    }

    public function change_basic_info(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc,dns']
        ]);

        TenantUser::where('id', base64_decode($request->id))
            ->update([
                'name' => $data['name'],
                'email' => $data['email']
            ]);

        return response()->json(['message' => 'Basic Information has been updated'], 200);
    }

    public function change_profile_picture(Request $request)
    {
        $request->validate([
            'image' => ['required', 'mimes:jpeg,jpg,png']
        ]);

        // $imagePath = request('image')->store('uploads/fd_products', 'public');
        $image_name = addslashes($_FILES['image']['name']);
        $array  = explode(".", $image_name);

        $filename   = date('Y-m-d H-i-s-A') . "." . end($array);
        $imagePath   = "uploads/tenant_users/" . $filename;

        move_uploaded_file($_FILES['image']['tmp_name'], "storage/" . $imagePath);
        // move_uploaded_file($_FILES['image']['tmp_name'], "../storetenant.alturush.com/storage/".$imagePath); 
        // unlink('storage/' . $request->previous_image);

        TenantUser::where('id', base64_decode($request->id))
            ->update(['image' => $imagePath]);

        return response()->json(['message' => 'Profile picture has successfully updated.'], 200);
    }

    public function force_change_password()
    {
        return view('tenant.layouts.change_password');
    }

    public function change_default_password(Request $request)
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'required_with:password_confirmation|confirmed']
        ]);

        $user = TenantUser::find(auth()->user()->id);

        if (Hash::check($data['current_password'], $user->password)) {

            TenantUser::where('id', auth()->user()->id)
                ->update(['password' => Hash::make($data['password']), 'first_login' => '0']);

            return response()->json(['password' => 'Match', 'message' => 'Password has been updated'], 200);
        } else {

            return response()->json(['password' => 'Mismatch', 'message' => 'Current Password dont match'], 200);
        }
    }

    public function fetch_username()
    {
        $last_id = DB::table('tenant_users')->max('id');

        return response()->json(['username' => sprintf("%'.05d-" . date('Y'), $last_id + 1)]);
    }
}
