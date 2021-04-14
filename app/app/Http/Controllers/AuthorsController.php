<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Authors;
use App\Models\Comics;
use App\Models\Categories;
use Validator;

class AuthorsController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api',['except' => ['index','show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Authors::addSelect(['comics' => Comics::selectRaw("COUNT(*)")->whereColumn('author_id', 'authors.id')])->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $author = Authors::create($validator->validated());

        return response()->json([
            'message' => 'Author successfully created',
            'data' => $author
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Authors::find($id);
        $data['comics'] = Comics::addSelect(['category' => Categories::select('name')->whereColumn('cate_id', 'categories.id')])->where('author_id', $id)->get();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        Authors::where('id', $id)->update($validator->validated());

        return response()->json([
            'message' => 'Author successfully updated'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Authors::where('id', $id)->delete();
        return response()->json([
            'message' => 'Author successfully deleted'
        ], 201);
    }
}
