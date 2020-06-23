import * as fx from './functions';
import BSN from "bootstrap.native";

// Wait for the DOM to be readay
document.addEventListener('DOMContentLoaded', () => {
    // Enable scrolling on the document
    document.body.classList.remove('overflow-hidden');

    // Create the side menu for small screens
    fx.createSideMenu();

    // Hide Whatsapp sharer on Desktop
    if (! fx.isMobile()) {
        document.querySelectorAll('.whatsapp-link').forEach(function (link) {
            link.classList.add('d-none');
        })
    }

    // Working with admin modal forms
    let modalForm = document.querySelector('.form-wrapper');

    if (null !== modalForm && modalForm.classList.contains('modal')) {
        let targetForm = modalForm.querySelector('form');
        let modalTitleElement = modalForm.querySelector('.modal-title');

        // Change title if updating
        modalForm.addEventListener('show.bs.modal', function (event) {
            let relatedTarget = event.relatedTarget;

            if (null === relatedTarget) {
                modalTitleElement.querySelector('.create').classList.add('d-none');
                modalTitleElement.querySelector('.update').classList.remove('d-none');
            }
        });

        // Do some cleaning when the modal is closed
        modalForm.addEventListener('hidden.bs.modal', function () {
            // Reset title
            modalTitleElement.querySelector('.create').classList.remove('d-none');
            modalTitleElement.querySelector('.update').classList.add('d-none');

            // Reset form to default empty values
            fx.resetAdminFormCreate(targetForm);

            // Hide all the error helpers
            targetForm.querySelectorAll('.text-danger').forEach(function (helper) {
                helper.innerHTML = '';
                helper.classList.add('d-none');
            });
        });
    }

    // Initialize flash messages toast
    let toastFlashSelector = '.toast:not(.reuse)';
    let toastFlash = document.querySelector(toastFlashSelector);

    if (null !== toastFlash) {
        fx.showToast({
            'selector': toastFlashSelector
        });
    }

    /* document.querySelector('#okok').addEventListener('click', function() {
        fx.showToast({
            'message': 'Toast is looking good.'
        });
    }); */

    // Listen to the toast show event and act accordingly
    document.querySelector('.toast').addEventListener('show.bs.toast', function(event){
        this.closest('.toast-wrapper').classList.add('show');
    }, false);

    // Listen to the toast hidden event and act accordingly
    document.querySelector('.toast').addEventListener('hidden.bs.toast', function(event){
        this.closest('.toast-wrapper').classList.remove('show');
    }, false);

    // Reset toast look/info when closed
    document.querySelector('.toast.reuse').addEventListener('hidden.bs.toast', function(event){
        // Set default look & feel
        this.classList.remove('success', 'danger');
        this.classList.add('default');

        // Remove last message
        this.querySelector('.toast-body').innerHTML = '';
    }, false);

    // Listen to the window resize event and act accordingly
    window.addEventListener('resize', function () {
        document.body.classList.remove('overflow-hidden');
        document.querySelector('#side-menu-overlay').classList.add('d-none');
        document.querySelector('#toggler i').classList.remove('fa-times');
        document.querySelectorAll('.side-menu').forEach(function (aside) {
            aside.classList.remove('show');
        });
    });

    // Listen to the on click event on the page and act accordingly
    document.addEventListener('click', function (event) {
        let element = event.target;

        // Bubble up click event on certain elements
        let bubble = element.closest('a, label, button, .btn, .avatar-chooser') || false;

        if (bubble) {
            element = bubble;
        }

        // Scroll to the top of the document
        if (element.hasAttribute('id') && 'back-to-top' === element.attributes['id'].value) {
            document.querySelector('.header').scrollIntoView({ behavior: 'smooth', block: 'end' });
        }

        // Populate and/or show the side menu
        if (element.hasAttribute('id') && 'toggler' === element.attributes['id'].value) {
            let targetNav = document.querySelector(element.attributes['data-target'].value);
            let dataSource = null;
            let sourceNav = null;

            if (element.hasAttribute('data-source')) {
                dataSource = element.attributes['data-source'].value;
            }

            if (null !== dataSource) {
                sourceNav = document.querySelector(dataSource);
            }

            if (null !== sourceNav && '' === targetNav.innerHTML) {
                targetNav.innerHTML = sourceNav.innerHTML;
            }

            document.querySelector('#side-menu-overlay').classList.toggle('d-none');
            targetNav.classList.toggle('show');
            element.querySelector('i').classList.toggle('fa-times');
            element.classList.toggle('rotate');
            document.body.classList.toggle('overflow-hidden');
        }

        // Hide the side menu when clicking off bounds
        if (element.hasAttribute('id') && 'side-menu-overlay' === element.attributes['id'].value) {
            document.querySelector('#toggler').click();
        }

        // Dynamically load comments for a writing
        if (element.parentElement.hasAttribute('id') && 'load-more' === element.parentElement.attributes['id'].value) {
            let url = element.attributes['data-href'].value;

            fx.loadComments(url);
        }

        // Show/hide the comment reply form
        if (element.classList.contains('badge-reply')) {
            let target = element.attributes['data-target'].value;
            let targetForm = document.querySelector(target);
            targetForm.classList.toggle('d-none');

            if (!targetForm.classList.contains('d-none')) {
                targetForm.querySelector('.form-control').focus();
            }
        }

        // Trigger the cover chooser
        if (element.hasAttribute('id') && 'cover-chooser' === element.attributes['id'].value) {
            event.preventDefault();
            let fileChooser = document.querySelector(element.attributes['data-target'].value);

            fileChooser.click();
        }

        // Trigger the avatar chooser
        if (element.classList.contains('avatar-chooser')) {
            event.preventDefault();
            let fileChooser = document.querySelector(element.attributes['data-target'].value);

            fileChooser.click();
        }

        // Counters
        if (element.classList.contains('btn-counter')) {
            event.preventDefault();

            // Liking a writing
            if (element.classList.contains('like')) {
                if (element.hasAttribute('data-target') && element.hasAttribute('data-id') && element.hasAttribute('data-value')) {
                    let url = element.attributes['data-target'].value;
                    let id = element.attributes['data-id'].value;
                    let value = element.attributes['data-value'].value;
                    let params = new FormData();

                    params.append('id', id);
                    params.append('value', value);

                    axios.post(url, params)
                        .then(function (response) {
                            let created = response.data.created;
                            let count = response.data.count;

                            if (created > 0) {
                                element.classList.add('voted');
                                element.querySelector('.counter').textContent = count;
                            }
                        })
                        .catch(function (error) {
                            //
                        })
                        .then(function () {
                            //
                        });
                }
            }

            // Adding to shelf
            if (element.classList.contains('shelf')) {
                if (element.hasAttribute('data-target') && element.hasAttribute('data-id')) {
                    let url = element.attributes['data-target'].value;
                    let id = element.attributes['data-id'].value;
                    let params = new FormData();

                    params.append('id', id);

                    axios.post(url, params)
                        .then(function (response) {
                            let count = response.data.count;

                            if (count > 0) {
                                element.classList.add('shelved');
                                element.querySelector('.counter').textContent = count;
                            }
                        })
                        .catch(function (error) {
                            //
                        })
                        .then(function () {
                            //
                        });
                }
            }

            // Share button
            if (element.classList.contains('share')) {
                // Check if Share API is supported
                if (navigator.share) {
                    navigator.share({
                        title: element.attributes['data-writing-title'].value,
                        url: element.attributes['data-url'].value
                    });
                } else {
                    new BSN.Dropdown(element).toggle();
                }
            }
        }

        // Share links
        if (element.classList.contains('share-link')) {
            event.preventDefault();

            let url = element.attributes['href'].value;

            if (element.classList.contains('copy-to-clipboard-link')) {
                navigator.clipboard.writeText(url);
            } else {
                let params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=500,left=100,top=100';
                let sharer = open(url, 'sharer', params);
            }
        }

        // Admin edit link
        if (element.classList.contains('admin-edit')) {
            event.preventDefault();

            let targetModal = document.querySelector(element.attributes['data-target-modal'].value);
            let targetModel = element.attributes['data-target-model'].value;
            let targetForm = document.querySelector(element.attributes['data-target-form'].value);
            let targetData = JSON.parse(element.attributes['data-target-form-data'].value);

            console.log(targetModel);
            if ('type' === targetModel || 'category' === targetModel) {
                targetForm.id.value = targetData.id;
                targetForm.name.value = targetData.name;
                targetForm.description.value = targetData.description;
            }

            if ('page' === targetModel) {
                targetForm.id.value = targetData.id;
                targetForm.title.value = targetData.title;
                targetForm.text.value = targetData.text;
            }

            fx.showModal(targetModal, {
                'backdrop': 'static'
            });
        }

        // Deleting a record (confirmation prompt)
        if (element.classList.contains('admin-content-delete') || element.classList.contains('user-content-delete')) {
            let targetModal = element.attributes['href'].value;
            let btnDelete = document.querySelector('#btn-modal-delete');
            let warningDelete = document.querySelector('#content-delete-warning');

            if (null !== warningDelete && element.hasAttribute('data-warning')) {
                warningDelete.innerHTML = element.attributes['data-warning'].value;
                warningDelete.parentElement.classList.remove('d-none');
            }

            if (null !== btnDelete && element.hasAttribute('data-target')) {
                btnDelete.attributes['data-delete-url'].value = element.attributes['data-target'].value;
            }

            fx.showModal(targetModal, {
                'backdrop': 'static'
            });
        }

        // Deleting a record
        if (element.hasAttribute('id') && 'btn-modal-delete' === element.attributes['id'].value) {
            let url = element.attributes['data-delete-url'].value;
            let params = new FormData();

            params.append('_method', 'delete');

            // Post the form to the server
            axios.post(url, params)
                .then(function (response) {
                    fx.showToast({
                        'message': response.data.message,
                        'theme': 'success'
                    });
                })
                .catch(function (error) {
                    fx.showToast({
                        'message': 'msg-save-error',
                        'theme': 'danger'
                    });
                })
                .then(function () {
                    //
                });
        }
    });

    // Listen to the on submit event on the page and act accordingly
    document.addEventListener('submit', function (event) {
        let element = event.target;
        let id = element.attributes['id'].value;

        // Post the writing create/update form
        if ('writing-form' === id) {
            event.preventDefault();
            fx.handleForm(element, 'submit');

            // Initialize form and helpers
            let params = new FormData(element);
            let url = element.attributes['action'].value;

            // Post the form to the server
            axios.post(url, params)
                .then(function (response) {
                    let method = element.elements['_method'] || false;

                    // Form posted successfully, let's reset it
                    if (! method) {
                        element.reset();
                    }

                    // Update file helpers
                    element.querySelector('#selected-file').classList.add('d-none');
                    element.querySelector('#selected-error').classList.add('d-none');

                    // Show toast
                    fx.showToast({
                        'theme': 'success',
                        'message': response.data.message
                    });
                })
                .catch(function (error) {
                    // Oh no, something went wrong
                    let errors = error.response.data.errors;

                    // Handle the error messages
                    fx.handleFormErrors(errors);

                    // Show toast
                    fx.showToast({
                        'theme': 'danger',
                        'message': error.response.data.message
                    });
                })
                .then(function () {
                    fx.handleForm(element, 'response');

                    // Scroll back to the form header
                    document.querySelector('#writing-form-wrapper h3').scrollIntoView({ behavior: 'smooth', block: 'end' });
                });
        }

        // Post the user profile update form
        if ('profile-form' === id) {
            event.preventDefault();
            fx.handleForm(element, 'submit');

            // Initialize form and helpers
            let params = new FormData(element);
            let url = element.attributes['action'].value;

            // Post the form to the server
            axios.post(url, params)
                .then(function (response) {
                    // Show toast
                    fx.showToast({
                        'message': response.data.message,
                        'theme': 'success'
                    });
                })
                .catch(function (error) {
                    // Oh no, something went wrong
                    let errors = error.response.data.errors;

                    // Handle the error messages
                    fx.handleFormErrors(errors);

                    // Show toast
                    fx.showToast({
                        'message': error.response.data.message,
                        'theme': 'danger'
                    });
                })
                .then(function () {
                    fx.handleForm(element, 'response');

                    // Scroll back to the form header
                    document.querySelector('#profile-form-wrapper h3').scrollIntoView({ behavior: 'smooth', block: 'end' });
                });
        }

        // Post the comment form
        if ('post-comment-form' === id) {
            event.preventDefault();

            let params = new FormData(element);
            let url = element.attributes['action'].value;
            let commentList = document.querySelector('#embed-comments .comment-list');
            let postCommentSuccess = document.querySelector('#post-comment-success');
            let postCommentError = document.querySelector('#post-comment-error');
            let commentsEmpty = document.querySelector('.comments-empty');

            // Display the wait cursor
            document.body.classList.add('cursor-wait');

            axios.post(url, params)
                .then(function (response) {
                    element.reset();
                    commentList.insertAdjacentHTML('beforeend', response.data);
                    postCommentSuccess.classList.remove('d-none');
                    postCommentError.classList.add('d-none');

                    if (null !== commentsEmpty && '' !== commentsEmpty) {
                        commentsEmpty.classList.add('d-none');
                    }
                })
                .catch(function (error) {
                    postCommentError.textContent = error.response.data.errors.comment[0];
                    postCommentSuccess.classList.add('d-none');
                    postCommentError.classList.remove('d-none');
                })
                .then(function () {
                    // Display the standard cursor
                    document.body.classList.remove('cursor-wait');
                });
        }

        // Post the comment reply form
        if (element.classList.contains('reply-form')) {
            event.preventDefault();

            let params = new FormData(element);
            let url = element.attributes['action'].value;
            let commentReplyList = document.querySelector('#reply-list-' + element.comment_id.value);
            let commentReplyError = document.querySelector('#reply-error-' + element.comment_id.value);

            // Display the wait cursor
            document.body.classList.add('cursor-wait');

            axios.post(url, params)
                .then(function (response) {
                    element.reset();
                    commentReplyList.insertAdjacentHTML('beforeend', response.data);
                    element.classList.add('d-none');
                    commentReplyError.classList.add('d-none');
                })
                .catch(function (error) {
                    commentReplyError.textContent = error.response.data.errors.reply[0];
                    commentReplyError.classList.remove('d-none');
                })
                .then(function () {
                    // Display the standard cursor
                    document.body.classList.remove('cursor-wait');
                });
        }

        let adminForms = ['admin-settings-form', 'admin-types-form', 'admin-categories-form', 'admin-pages-form'];

        // Save data from admin panel
        if (adminForms.includes(id)) {
            event.preventDefault();
            fx.handleForm(element, 'submit');

            // Initialize form and helpers
            let params = new FormData(element);
            let url = element.attributes['action'].value;

            // Post the form to the server
            axios.post(url, params)
                .then(function (response) {
                    // Reset form
                    if ('create' === response.data.action) {
                        element.reset.click();
                    }

                    fx.showToast({
                        'message': response.data.message,
                        'theme': 'success'
                    });
                })
                .catch(function (error) {
                    // Oh no, something went wrong
                    let errors = error.response.data.errors;

                    // Handle the error messages
                    fx.handleFormErrors(errors);

                    fx.showToast({
                        'message': error.response.data.message,
                        'theme': 'danger'
                    });
                })
                .then(function () {
                    fx.handleForm(element, 'response');
                });
        }
    });

    // Listen to the on change event on the page and act accordingly
    document.addEventListener('change', function (event) {
        let element = event.target;

        // Trigger the cover file validation
        if (element.hasAttribute('id') && 'cover' === element.attributes['id'].value) {
            const file = element.files[0];
            const fileSizeKb = parseInt(file.size / 1024);
            const maxFileSizeKb = element.attributes['data-max-size'].value;
            let info = document.querySelector(element.attributes['data-target'].value);
            let error = element.parentElement.querySelector('#selected-error');

            if (null !== file && '' !== file && fileSizeKb <= maxFileSizeKb && fx.isImage(file)) {
                info.textContent = file.name + ' [' + fileSizeKb + 'kb]';
                info.classList.remove('d-none');
                error.classList.add('d-none');
            } else {
                element.value = '';
                info.textContent = '';
                info.classList.add('d-none');
                error.classList.remove('d-none');
            }
        }

        // Trigger the avatar file validation
        if (element.hasAttribute('id') && 'avatar' === element.attributes['id'].value) {
            const file = element.files[0];
            const fileSizeKb = parseInt(file.size / 1024);
            const maxFileSizeKb = element.attributes['data-max-size'].value;
            let error = document.querySelector('#avatar-error');

            if (null !== file && '' !== file && fileSizeKb <= maxFileSizeKb && fx.isImage(file)) {
                fx.readImage(file, fx.previewAvatar);
                error.classList.add('d-none');
            } else {
                element.value = '';
                fx.previewAvatar('');
                error.classList.remove('d-none');
            }
        }

        // Trigger the avatar delete checkbox validation
        if (element.hasAttribute('id') && 'avatar-remove' === element.attributes['id'].value) {
            if (element.checked) {
                let avatarInput = document.querySelector('#avatar');

                fx.previewAvatar('');
                avatarInput.value = '';
            }
        }
    });
});
