<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
    ];

     /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function path()
    {
        return route('tags.show', $this->slug);
    }

    public function writings()
    {
        return $this->belongsToMany(Writing::class);
    }

    public static function popular($count = 20)
    {
        return Self::withCount('writings')
            ->orderByDesc('writings_count')
            ->having('writings_count', '>', 0)
            ->take($count)
            ->get();
    }
}
