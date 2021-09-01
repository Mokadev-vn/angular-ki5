<?php

namespace App\Http\Controllers;
use App\Models\Categories;
use App\Models\Comics;
use App\Models\Authors;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function getAllCategory(){
        $data = Categories::addSelect(['comics' => Comics::selectRaw("COUNT(*)")->whereColumn('cate_id', 'categories.id')])->get();
        return response()->json($data);
    }

    public function getOneCategory($id){
        $data = Categories::find($id);
        $data['comics'] = Comics::addSelect(['author' => Authors::select('name')
            ->whereColumn('author_id', 'comics.id')])->where('cate_id', $id)->get();
        return response()->json($data);
    }

    public function getAllComic(){
        $comic = Comics::addSelect(['author' => Authors::select('name')->whereColumn('author_id', 'authors.id'), 'category' => Categories::select('name')->whereColumn('cate_id', 'categories.id')])->get();
        return response()->json($comic);
    }

    public function getOneComic($id){
        $data = Comics::addSelect(['author' => Authors::select('name')->whereColumn('author_id', 'authors.id'), 'category' => Categories::select('name')->whereColumn('cate_id', 'categories.id')])->where('id', $id)->get();
        $view = $data->toArray()[0]['views'];
        $view += 1;
        Comics::where('id', $id)->update(['views' => $view]);
        return response()->json($data);
    }
}
