<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Authors;
use App\Models\Comics;
use App\Models\Categories;
use Validator;

class HelperController extends Controller
{
    public function search(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'model' => 'required|string|between:2,100',
            'field' => 'required|string',
            'query' => ''
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $dataInput = $validator->validated();
        if(empty($dataInput['query'])){
            $dataInput['query'] = "";
        }
        
        switch ($dataInput['model']) {
            case "Authors":
                $data = Authors::addSelect(['comics' => Comics::selectRaw("COUNT(*)")->whereColumn('author_id', 'authors.id')])->where($dataInput['field'], 'like', '%' . $dataInput['query'] . '%')->get();
                return response()->json($data);
            case "Comics":
                $data = Comics::addSelect(['author' => Authors::select('name')->whereColumn('author_id', 'authors.id'), 'category' => Categories::select('name')->whereColumn('cate_id', 'categories.id')])->where($dataInput['field'], 'like', '%' . $dataInput['query'] . '%')->get();
                return response()->json($data);
            case "Categories":
                $data = Categories::addSelect(['comics' => Comics::selectRaw("COUNT(*)")->whereColumn('cate_id', 'categories.id')])->where($dataInput['field'], 'like', '%' . $dataInput['query'] . '%')->get();
                return response()->json($data);
            default:
                return response()->json(['error' => "Model error"]);
        }
        return;
    }
}
