<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comics;
use App\Models\Authors;
use App\Models\Categories;
use Validator;

class ComicController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['index', 'show']]);
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $data = Comics::all();
        $comic = Comics::addSelect(['author' => Authors::select('name')->whereColumn('author_id', 'authors.id'), 'category' => Categories::select('name')->whereColumn('cate_id', 'categories.id')]);
        if($request->has('title')){
            $comic->orderBy('title', $request->title);
        }
        if($request->has('title')){
            $comic->orderBy('title', $request->title);
        }
        if($request->has('author')){
            $comic->orderBy('author_id', $request->author);
        }
        if($request->has('category')){
            $comic->orderBy('cate_id', $request->category);
        }
        if($request->has('status')){
            $comic->orderBy('status', $request->status);
        }
        if($request->has('views')){
            $comic->orderBy('views', $request->views);
        }
        $data = $comic->paginate(5);
        
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
            'title' => 'required|string|between:3,200',
            'author_id' => 'required|integer|exists:authors,id',
            'cate_id' => 'required|integer|exists:categories,id',
            'status' => 'required|integer|in:1,2,3',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $image = time() . '.' . $request->image->extension();

        $request->image->move(storage_path('app/public/images'), $image);

        $urlImage = 'storage/images/' . $image;

        $data = Comics::Create(array_merge(
            $validator->validated(),
            [
                'image' => $urlImage
            ]
        ));
        return response()->json([
            'message' => 'Comic successfully created',
            'data' => $data
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
        $data = Comics::addSelect(['author' => Authors::select('name')->whereColumn('author_id', 'authors.id'), 'category' => Categories::select('name')->whereColumn('cate_id', 'categories.id')])->where('id', $id)->get();
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
            'title' => 'required|string|between:3,200',
            'author_id' => 'required|integer|exists:authors,id',
            'cate_id' => 'required|integer|exists:categories,id',
            'status' => 'required|integer|in:1,2,3',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $firstData = [];

        if (isset($validator->validated()['image'])) {
            $image = time() . '.' . $request->image->extension();
            $request->image->move(storage_path('app/public/images'), $image);
            $urlImage = 'storage/images/' . $image;
            $firstData['image'] = $urlImage;
        }

        Comics::where('id', $id)->update(array_merge(
            $validator->validated(),
            $firstData
        ));
        return response()->json([
            'message' => 'Comic successfully updated'
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
        Comics::where('id', $id)->delete();
        return response()->json([
            'message' => 'Comic successfully deleted'
        ], 201);
    }
}
