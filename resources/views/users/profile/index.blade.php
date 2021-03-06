<div class="user-profile">
    <div class="profile-header text-center">
        {!! getUserAvatar($user, $size = 'xxl') !!}

        <div class="user-name align-self-center">
            {{ $user->getName() }}
        </div>

        @if (! empty($user->extra_info['bio']))
            <div class="profile-bio">{{ $user->extra_info['bio'] }}</div>
        @endif
    </div>

    <div class="profile-body">
        <dl class="row">
            <dt class="col-sm-3">
                <i class="fas fa-calendar-check fa-fw"></i>
                {{ __('Registered') }}:
            </dt>

            <dd class="col-sm-9">{{ Carbon\Carbon::parse($user->created_at)->diffForHumans() }}</dd>

            @if (! empty($user->extra_info['location']))
                <dt class="col-sm-3">
                    <i class="fas fa-fw fa-map-marker-alt"></i>
                    {{ __('Location') }}:
                </dt>

                <dd class="col-sm-9">{{ $user->extra_info['location'] }}</dd>
            @endif

            @if (! empty($user->extra_info['occupation']))
                <dt class="col-sm-3">
                    <i class="fas fa-fw fa-toolbox"></i>
                    {{ __('Occupation') }}:
                </dt>

                <dd class="col-sm-9">{{ $user->extra_info['occupation'] }}</dd>
            @endif

            @if (! empty($user->extra_info['interests']))
                <dt class="col-sm-3">
                    <i class="fas fa-fw fa-tv"></i>
                    {{ __('Interests') }}:
                </dt>

                <dd class="col-sm-9">{{ $user->extra_info['interests'] }}</dd>
            @endif

            @if (! empty($user->extra_info['website']))
                <dt class="col-sm-3">
                    <i class="fas fa-fw fa-at"></i>
                    {{ __('Website') }}:
                </dt>

                <dd class="col-sm-9">
                    <a href="{{ $user->extra_info['website'] }}" target="_blank">
                        {{ $user->extra_info['website'] }}
                    </a>
                </dd>
            @endif

            @if (! empty($user->extra_info['social']['twitter']))
                <dt class="col-sm-3">
                    <i class="fab fa-fw fa-twitter"></i>
                    {{ __('Twitter') }}:
                </dt>

                <dd class="col-sm-9">
                    <a href="{{ getSocialLink($user->extra_info['social']['twitter'], 'twitter') }}" target="_blank">
                        {{ $user->extra_info['social']['twitter'] }}
                    </a>
                </dd>
            @endif

            @if (! empty($user->extra_info['social']['instagram']))
                <dt class="col-sm-3">
                    <i class="fab fa-fw fa-instagram"></i>
                    {{ __('Instagram') }}:
                </dt>

                <dd class="col-sm-9">
                    <a href="{{ getSocialLink($user->extra_info['social']['instagram'], 'instagram') }}" target="_blank">
                        {{ $user->extra_info['social']['instagram'] }}
                    </a>
                </dd>
            @endif

            @if (! empty($user->extra_info['social']['facebook']))
                <dt class="col-sm-3">
                    <i class="fab fa-fw fa-facebook"></i>
                    {{ __('Facebook') }}:
                </dt>

                <dd class="col-sm-9">
                    <a href="{{ getSocialLink($user->extra_info['social']['facebook'], 'facebook') }}" target="_blank">
                        {{ $user->extra_info['social']['facebook'] }}
                    </a>
                </dd>
            @endif

            @if (! empty($user->extra_info['social']['youtube']))
                <dt class="col-sm-3">
                    <i class="fab fa-fw fa-youtube"></i>
                    {{ __('Youtube') }}:
                </dt>

                <dd class="col-sm-9">
                    <a href="{{ getSocialLink($user->extra_info['social']['youtube'], 'youtube') }}" target="_blank">
                        {{ $user->extra_info['social']['youtube'] }}
                    </a>
                </dd>
            @endif

            @if (! empty($user->extra_info['social']['goodreads']))
                <dt class="col-sm-3">
                    <i class="fab fa-fw fa-goodreads-g"></i>
                    {{ __('Goodreads') }}:
                </dt>

                <dd class="col-sm-9">
                    <a href="{{ getSocialLink($user->extra_info['social']['goodreads'], 'goodreads') }}" target="_blank">
                        {{ $user->extra_info['social']['goodreads'] }}
                    </a>
                </dd>
            @endif
        </dl>

        <div class="text-center">
            @include('users.profile.stats')
        </div>
    </div>

    <div class="profile-footer">
        <div class="actions">
            @can('update', $user)
                <a href="{{ route('users.edit', $user) }}" class="btn btn-primary">
                    <i class="fas fa-user-edit fa-fw"></i>
                    {{ __('Update profile') }}
                </a>
            @endcan

            @if ($user->writings()->count() > 0)
                <a href="{{ $user->writingsPath() }}" class="btn btn-primary">
                    <i class="fas fa-feather fa-fw"></i>
                    @if (auth()->check() && auth()->user()->is($user))
                        {{ __('My writings') }}
                    @else
                        {{ __('View writings') }}
                    @endif
                </a>
            @endif

            @if ($user->Shelf()->count() > 0)
                <a href="{{ $user->shelfPath() }}" class="btn btn-primary">
                    <i class="fas fa-book-reader fa-fw"></i>
                    @if (auth()->check() && auth()->user()->is($user))
                        {{ __('My shelf') }}
                    @else
                        {{ __('View shelf') }}
                    @endif
                </a>
            @endif
        </div>
    </div>
</div>
