@extends('admin.index')

@section('admin-main-content')
    <div id="tags-admin" class="admin-section">
        <div class="top-section">
            <h3 class="all-caps">{{ __('Tags') }}</h3>

            <div class="d-flex flex-nowrap">
                <div class="filter-box flex-grow-1">
                    <input type="text"
                        class="filter-box-input form-control"
                        data-wh-target=".filter-table"
                        placeholder="{{ __('Filter by') }}..."
                        autocomplete="off">
                </div>

                <div class="buttons">
                    <button id="btn-create-tag"
                        class="btn btn-primary btn-create"
                        type="button"
                        title="{{ __('Create new tag') }}"
                        data-bs-toggle="modal"
                        data-bs-target="#tag-form-wrapper"
                        aria-expanded="false"
                        disabled>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>

        {{-- @include('admin.forms.tag') --}}
        @include('partials.delete-modal')

        @if ($tags->count() > 0)
            <div class="table-responsive">
                <table class="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th scope="col">{{ __('Id') }}</th>
                            <th scope="col">{{ __('Name') }}</th>
                            <th scope="col">{{ __('Writings') }}</th>
                            <th scope="col">{{ __('Actions') }}</th>
                        </tr>
                    </thead>

                    <tbody class="filter-table">
                        @foreach ($tags as $tag)
                            <tr>
                                <th scope="row">{{ $tag->id }}</th>
                                <td>{{ $tag->name }}</td>
                                <td>{{ $tag->writings()->count() }}</td>
                                <td class="action-links">
                                    <a href="{{ route('tags.show', $tag) }}"
                                        class="btn">
                                        <i class="fas fa-fw fa-eye"></i>
                                    </a>

                                    <a href="#"
                                        class="admin-edit btn" disabled>
                                        <i class="fas fa-fw fa-edit"></i>
                                    </a>

                                    <a href="#delete-modal"
                                        class="admin-content-delete btn"
                                        data-wh-target="{{ route('admin.tags.destroy', $tag) }}"
                                        data-wh-warning="{{ __('Deleting a tag will not delete associated writings') }}.">
                                        <i class="fas fa-fw fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            @include('partials.empty')
        @endif
    </div>

    {{ $tags->withQueryString()->links() }}
@endsection
