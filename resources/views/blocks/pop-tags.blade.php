<div class="block">
    <div class="block-title">
        {{ __('Popular Tags') }}
    </div>

    <div class="block-body">
        @forelse (App\Tag::popular(20) as $tag)
            <a href="{{ $tag->path() }}" class="btn btn-outline-primary btn-sm writing-tag d-title">
                <span>{{ $tag->name }}</span>
                <span>({{ $tag->writings_count }})</span>
            </a>
        @empty
            @include('partials.empty-block')
        @endforelse
    </div>
</div>
