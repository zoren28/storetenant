<?php

namespace App\Http\Controllers;

use App\FdProductSuggestion;
use App\FdSuggestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FdProductSuggestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function fetch_suggestion()
    {
        return FdSuggestion::where('status', true)
            ->get();
    }

    public function fetch_product_suggestion()
    {
        return FdProductSuggestion::select('suggestion', 'fd_product_suggestions.id', 'description', 'fd_product_suggestions.status')
            ->join('fd_suggestions', 'fd_product_suggestions.suggestion_id', '=', 'fd_suggestions.id')
            ->where('tenant_id', auth()->user()->tenant_id)
            ->orderBy('suggestion', 'ASC')
            ->get();
    }

    public function fetch_active_suggestions()
    {
        // return FdProductSuggestion::where([
        //                                 ['tenant_id', auth()->user()->tenant_id],
        //                                 ['status', true]
        //                             ])
        //                             ->get();
        $suggestions = DB::table('fd_suggestions')
            ->where('status', true)
            ->get();

        $responseData = array();
        foreach ($suggestions as $suggestion) {

            // $responseData[] = $suggestion->id;
            $product_suggestion = DB::table('fd_product_suggestions')
                ->where([
                    ['suggestion_id', $suggestion->id],
                    ['tenant_id', auth()->user()->tenant_id]
                ])
                ->get();

            // $responseData[] = count($product_suggestion);

            if (count($product_suggestion) > 0) {
                $responseData[] = [
                    'id' => $suggestion->id,
                    'suggestion' => $suggestion->suggestion,
                    'product_suggestion' => $product_suggestion
                ];
            }
        }

        return response()->json($responseData);
    }

    public function change_status(Request $request)
    {
        FdProductSuggestion::where('id', $request->id)
            ->update(['status' => $request->status]);

        return response()->json(['message' => 'Suggestion Status has been updated.'], 200);
    }

    public function fetch_suggestion_details($id)
    {
        return FdProductSuggestion::find($id);
    }

    public function update_suggestion(Request $request)
    {
        $data = $request->validate([
            'suggestion_id' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255']
        ]);

        FdProductSuggestion::where('id', $request->id)
            ->update([
                'suggestion_id' => $data['suggestion_id'],
                'description' => $data['description']
            ]);

        return response()->json(['message' => 'Suggestion details has been updated.'], 200);
    }

    public function add_suggestion(Request $request)
    {
        $data = $request->validate([
            'suggestion_id' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255']
        ]);

        FdProductSuggestion::create([
            'tenant_id' => auth()->user()->tenant_id,
            'suggestion_id' => $data['suggestion_id'],
            'description' => $data['description'],
        ]);

        return response()->json(['message' => 'Suggestion has been successfully saved.'], 200);
    }

    public function destroy($id)
    {
        FdProductSuggestion::find($id)
            ->delete();

        return response()->json(['message' => 'Suggestion has been successfully deleted.'], 200);
    }
}
