<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comics extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'image', 'author_id', 'cate_id', 'status', 'views'];
    protected $hidden = [
        'created_at',
        'update_at'
    ];
}
