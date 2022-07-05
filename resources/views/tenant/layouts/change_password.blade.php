<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>{{ config('app.name', 'Laravel') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('assets/images/alturush/favicon-16x16.png') }}">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Sweet Alert-->
    <link href="{{ asset('assets/libs/sweetalert2/sweetalert2.min.css') }}" rel="stylesheet" type="text/css" />

    <!-- App css -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/app.min.css') }}" rel="stylesheet" type="text/css" />

    <style type="text/css">
        .field-icon {
            float: right;
            margin-left: -40px;
            margin-top: -25px;
            padding-right: 25px;
            position: relative;
            z-index: 2;
        }
    </style>
</head>

<body>

    <div class="account-pages mt-5 mb-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card">

                        <div class="card-body p-4">

                            <div class="text-center w-90 m-auto">
                                <a href="http://172.16.43.134:8000/force_change_password">
                                    <span><img src="{{ asset('assets/images/alturush/Alturush4.png') }}"
                                            alt="Alturush Logo" height="100"></span>
                                </a>
                                <p class="text-muted mb-4 mt-2">The system recognizes that your default password is not
                                    yet change.
                                    Therefore, you are advised to change your password now!
                                </p>
                            </div>

                            {{-- <form action="{{ url('setup/change_default_password') }}" method="post"> --}}
                            <form id="data_password" action="" method="post">
                                @csrf

                                <div class="form-group">
                                    <label for="current_pass">Current Password</label>
                                    <input class="form-control" type="password" name="current_password"
                                        id="current_pass" required autocomplete="off">
                                    <span toggle="#current_pass"
                                        class="fa fa-fw fa-eye-slash field-icon toggle-password" data-toggle="tooltip"
                                        title="Show password"></span>
                                </div>
                                <div class="form-group">
                                    <label for="new_pass">New Password</label>
                                    <input class="form-control" type="password" name="password" id="new_password"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required autocomplete="off">
                                    <span toggle="#new_password"
                                        class="fa fa-fw fa-eye-slash field-icon toggle-password" data-toggle="tooltip"
                                        title="Show password"></span>
                                </div>
                                <div class="form-group">
                                    <label for="re_password">Re Password</label>
                                    <input class="form-control" type="password" name="password_confirmation"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="re_password" required
                                        autocomplete="off">
                                    <span toggle="#re_password" class="fa fa-fw fa-eye-slash field-icon toggle-password"
                                        data-toggle="tooltip" title="Show password"></span>
                                </div>
                                <div class="form-group mb-0 text-center">
                                    <button class="btn btn-primary btn-block submit_btn" type="submit"> Confirm
                                    </button>
                                    <button class="btn btn-primary btn-block loading_btn" disabled=""
                                        style="display: none">
                                        <span class="spinner-border spinner-border-sm mr-1" role="status"
                                            aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                </div>

                            </form>

                        </div> <!-- end card-body -->
                    </div>
                    <!-- end card -->

                </div> <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->

    <!-- Vendor js -->
    <script src="{{ asset('assets/js/vendor.min.js') }}"></script>

    <!-- Sweet Alerts js -->
    <script src="{{ asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>

    <!-- App js -->
    <script src="{{ asset('assets/js/app.min.js') }}"></script>
    <script>
        $(document).ready(function() {

            $('[data-toggle="tooltip"]').tooltip(); 

            $(".toggle-password").click(function() {

                $(this).toggleClass("fa-eye-slash fa-eye");

                var input = $($(this).attr("toggle"));
                if (input.attr("type") == "password") {
                        
                        input.attr("type", "text");
                        $(this).attr('data-original-title', 'Hide password');
                } else {
                        input.attr("type", "password");
                        $(this).attr('data-original-title', 'Show password');
                }
            });

            var password = document.getElementById('new_password'),
            confirm_password = document.getElementById('re_password')

            function validatePassword() {
                if (password.value != confirm_password.value) {
                    confirm_password.setCustomValidity("Passwords Don't Match")
                } else {
                    confirm_password.setCustomValidity('')
                }
            }

            password.onchange = validatePassword
            confirm_password.onkeyup = validatePassword

            $("form#data_password").submit(function(e) {

                e.preventDefault();
                var formData = $(this).serialize();

                $(".submit_btn").hide();
                $(".loading_btn").show();

                $.ajax({
                    url: '/setup/change_default_password',
                    type: 'POST',
                    data: formData,
                    success: function (data) {
                     
                        const { message } = data
                        const { password } = data

                        if (password == 'Match') {
                            Swal.fire({
                                type: 'success',
                                title: 'Success',
                                text: message
                                }).then(result => {
                                if (result) {
                                    location.replace('/home')
                                }   
                            })
                        } else {
                            Swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: message
                                }).then(result => {
                                if (result) {
                                    $(".submit_btn").show();
                                    $(".loading_btn").hide();
                                }
                            })
                        }
                    },
                    error: function(xhr, status, error) {
                        $(".submit_btn").show();
                        $(".loading_btn").hide();
                       
                        Swal.fire({
                            type: 'warning',
                            title: 'Oops...',
                            text: "The given data was invalid."
                        })
                    }
                })
            });
        });
    </script>

</body>

</html>