<div id="admin-pages-form-wrapper" class="modal fade form-wrapper" data-bs-backdrop="static" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title all-caps">
                    <span class="create">{{ __('New page') }}</span>
                    <span class="update d-none">{{ __('Edit page') }}</span>
                </h5>

                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="{{ __('Close') }}"></button>
            </div>

            <div class="modal-body">
                <form id="admin-pages-form" action="{{ route('admin.pages.edit') }}" method="POST">
                    @csrf
                    @method('put')

                    <input type="hidden" name="id" value="-1">

                    <div class="mb-3">
                        <label for="title" class="col-form-label">{{ __('Title') }}:</label>

                        <input
                            type="text"
                            name="title"
                            id="title"
                            class="form-control"
                            value=""
                            minlength="3"
                            maxlength="40"
                            placeholder=""
                            required
                            autocomplete="off">
                        <small id="title-error" class="text-danger d-none"></small>
                    </div>

                    <div class="mb-3">
                        <label for="text" class="col-form-label">{{ __('Text') }}:</label>

                        <textarea
                            class="form-control"
                            name="text"
                            id="text"
                            rows="8"
                            minlength="10"
                            required></textarea>
                        <small id="text-error" class="text-danger d-none"></small>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="reset" id="reset" class="btn btn-danger" form="admin-pages-form">{{ __('Reset') }}</button>
                <button type="submit" id="submit" class="btn btn-primary" form="admin-pages-form">{{ __('Save') }}</button>
            </div>
        </div>
    </div>
</div>
