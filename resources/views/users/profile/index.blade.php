<div class="user-profile">
    <div class="profile-header text-center">
        @if (! empty($user->avatarPath()))
            <img class="avatar" src="{{ $user->avatarPath() }}" title="{{ $user->fullName() }}" alt="">
        @else
            <span class="avatar" title="{{ $user->fullName() }}">{{ $user->initials() }}</span>
        @endif

        <h4 class="align-self-center">{{ $user->fullName() }}</h4>

        @if (! empty($user->extra_info['bio']))
            <div class="profile-bio">{{ $user->extra_info['bio'] }}</div>
        @endif
    </div>

    <div class="profile-body">
        <dl class="row">
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
                    <a href="{{ $user->extra_info['website'] }}">
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
                    <a href="{{ getSocialLink($user->extra_info['social']['twitter'], 'twitter') }}">
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
                    <a href="{{ getSocialLink($user->extra_info['social']['instagram'], 'instagram') }}">
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
                    <a href="{{ getSocialLink($user->extra_info['social']['facebook'], 'facebook') }}">
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
                    <a href="{{ getSocialLink($user->extra_info['social']['youtube'], 'youtube') }}">
                        {{ $user->extra_info['social']['youtube'] }}
                    </a>
                </dd>
            @endif
        </dl>

        <div class="text-center">
            @include('users.profile.stats')
        </div>
    </div>

    <div class="profile-footer">
        <div class="d-flex flex-column flex-md-row">
            @if ($user->writings()->count() > 0)
                <div class="flex-fill">
                    <a href="{{ $user->writingsPath() }}" class="btn btn-dark btn-block">View Writings</a>
                </div>
            @endif

            @if ($user->Shelf()->count() > 0)
                <div class="flex-fill">
                    <a href="{{ $user->shelfPath() }}" class="btn btn-dark btn-block">View Shelf</a>
                </div>
            @endif
        </div>
    </div>
</div>
