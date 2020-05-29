@extends('layouts.index')

@section('title', __('Password Recovery'))

@section('header')
    @include('partials.header')
@endsection

@section('main')
    <div id="email-password" class="d-flex justify-content-center">
        <div class="wrapper">
            @if (session('status'))
                <div class="alert alert-success" role="alert">
                    {{ session('status') }}
                </div>
            @endif

            <div class="header">
                <h4 class="all-caps">{{ __('So you forgot your password') }}</h4>
                <p class="text-muted">{{ __('No problem, let\'s reset it') }}</p>
            </div>

            <div class="body">
                <form method="POST" action="{{ route('password.email') }}">
                    @csrf

                    <div class="form-group">
                        <input id="email" type="email" class="form-control form-control-lg @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="{{ __('Enter your email address') }}">

                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-dark btn-block">
                            {{ __('Send recovery link') }}
                        </button>

                        <a href="{{ route('login') }}" class="btn btn-success btn-block">{{ __('Login') }}</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('footer')
    @include('partials.footer')
@endsection
