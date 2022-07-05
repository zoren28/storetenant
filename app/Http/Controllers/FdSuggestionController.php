<?php

namespace App\Http\Controllers;

use App\FdSuggestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FdSuggestionController extends Controller
{
    public function show()
    {
        return DB::table('fd_suggestions')
            ->where('status', true)
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'suggestion' => ['required', 'unique:fd_suggestions', 'string', 'max:255']
        ]);

        DB::table('fd_suggestions')->insert(
            ['suggestion' => $data['suggestion']]
        );

        return response()->json(['message' => 'Suggestion has been successfully saved.'], 200);
    }

    public function get_suggestion_details($id)
    {
        return FdSuggestion::find($id);
    }

    public function edit_suggestion(Request $request)
    {
        $data = $request->validate([
            'suggest' => ['required', 'string', 'max:255']
        ]);

        DB::table('fd_suggestions')
            ->where('id', $request->id)
            ->update(
                ['suggestion' => $data['suggest']]
            );

        return response()->json(['message' => 'Suggestion has been successfully updated.'], 200);
    }
}
