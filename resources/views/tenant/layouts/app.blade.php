<!DOCTYPE html>
<html lang="en">

@if(!auth()->check())
{{ redirect()->route('login') }}
@endif

<head>
    <meta charset="utf-8" />
    <meta name="auth_user" content="{{Auth::user()->tenant_id}}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('assets/images/alturush/favicon-16x16.png') }}">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <!-- third party css -->
    <link href="{{ asset('assets/libs/datatables/dataTables.bootstrap4.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/libs/datatables/responsive.bootstrap4.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/libs/datatables/buttons.bootstrap4.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/libs/datatables/select.bootstrap4.css') }}" rel="stylesheet" type="text/css" />
    <!-- third party css end -->

    <!-- Sweet Alert-->
    <link href="{{ asset('assets/libs/sweetalert2/sweetalert2.min.css') }}" rel="stylesheet" type="text/css" />

    <!-- Dropzone-->
    <link href="{{ asset('assets/libs/dropzone/dist/dropzone.css') }}" rel="stylesheet" type="text/css" />

    <!-- Plugins css-->
    <link href="{{ asset('assets/libs/wenk/wenk.min.css') }}" rel="stylesheet" type="text/css">

    <!-- App css -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/app.min.css') }}" rel="stylesheet" type="text/css" />

    <style type="text/css">
        td.details-control {
            background: url('{{ asset("assets/images/datatables/details_open.png") }}') no-repeat center center;
            cursor: pointer;
        }

        tr.shown td.details-control {
            background: url('{{ asset("assets/images/datatables/details_close.png") }}') no-repeat center center;
        }

        .theme-orange .vdatetime-popup__header,
        .theme-orange .vdatetime-calendar__month__day--selected>span>span,
        .theme-orange .vdatetime-calendar__month__day--selected:hover>span>span {
            background: #FF9800;
        }

        .theme-orange .vdatetime-year-picker__item--selected,
        .theme-orange .vdatetime-time-picker__item--selected,
        .theme-orange .vdatetime-popup__actions__button {
            color: #ff9800;
        }
    </style>

</head>

<body class="unsticky-header">

    <div id="app">

        <!-- Navigation Bar-->
        <header id="topnav">

            @if (session('status'))
            <div class="alert alert-success">
                {{ session('status') }}
            </div>
            @endif

            <!-- Topbar Start -->
            <div class="navbar-custom">
                <div class="container-fluid">
                    <ul class="list-unstyled topnav-menu float-right mb-0">

                        <li class="dropdown notification-list">
                            <!-- Mobile menu toggle-->
                            <a class="navbar-toggle nav-link">
                                <div class="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </a>
                            <!-- End mobile menu toggle-->
                        </li>

                        <li class="notification-list">
                            <router-link :to="{
                                        name:'order-request'
                                    }" class="nav-link waves-effect waves-light" href="#" role="button">
                                Delivery Order
                                <delivery-order></delivery-order>
                            </router-link>
                        </li>

                        <li class="notification-list">
                            <router-link :to="{
                                        name:'pickup-order'
                                    }" class="nav-link waves-effect waves-light" href="#" role="button">
                                Pick-up Order
                                <pickup-order></pickup-order>
                            </router-link>
                        </li>

                        <li class="notification-list">
                            <router-link :to="{
                                        name:'advance-order'
                                    }" class="nav-link waves-effect waves-light" href="#" role="button">
                                Advance Order
                                <advance-order></advance-order>
                            </router-link>
                        </li>

                        <li class="dropdown notification-list">
                            <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light"
                                data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                aria-expanded="false">
                                <img src="{{ config('app.admin_access').'/'.Auth::user()->image }}" alt="user-image"
                                    class="rounded-circle">
                                <span class="pro-user-name ml-1">
                                    {{ Auth::user()->name }} <i class="mdi mdi-chevron-down"></i>
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                                <!-- item-->
                                <a href="{{ 'http://172.16.43.134:8000/my_account/'. base64_encode(Auth::user()->id)}}"
                                    class="dropdown-item notify-item">
                                    <i class="remixicon-account-circle-line"></i>
                                    <span>My Account</span>
                                </a>

                                <div class="dropdown-divider"></div>

                                <!-- item-->
                                <a href="{{ route('logout') }}" class="dropdown-item notify-item"
                                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <i class="remixicon-logout-box-line"></i>
                                    <span>Logout</span>
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                    style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </li>

                    </ul>

                    <!-- LOGO -->
                    @php
                    $logo = \App\LocateTenant::where('tenant_id', Auth::user()->tenant_id)
                    ->select('logo')
                    ->get();
                    @endphp
                    <div class="logo-box">
                        <a href="http://172.16.43.134:8000/home" class="logo text-center">
                            <span class="logo-lg">
                                <img src="{{ config('app.admin_access').'/'.$logo->first()->logo }}" alt="logo"
                                    width="58">
                                <!-- <span class="logo-lg-text-light">Xeria</span> -->
                            </span>
                            <span class="logo-sm">
                                <!-- <span class="logo-sm-text-dark">X</span> -->
                                <img src="{{ config('app.admin_access').'/'.$logo->first()->logo }}" alt="" height="24">
                            </span>
                        </a>
                    </div>

                    <div class="clearfix"></div>
                </div>
            </div>
            <!-- end Topbar -->

            <div class="topbar-menu">
                <div class="container-fluid">
                    <div id="navigation">
                        <!-- Navigation Menu-->
                        {{-- <project-menu></project-menu> --}}
                        <ul class="navigation-menu">

                            @foreach ($menus as $menu)

                            @if ($menu['menu']->submenu === 1)
                            <li class="has-submenu">
                                <a href="#">
                                    <i class="{{$menu['menu']->icon}}"></i>{{$menu['menu']->menu}} <div
                                        class="arrow-down">
                                    </div>
                                </a>
                                <ul class="submenu">
                                    @foreach ($menu['submenu'] as $sub)
                                    <li>
                                        <a href="http://172.16.43.134:8000/{{$sub->router}}">{{ $sub->submenu }}</a>
                                    </li>
                                    @endforeach
                                </ul>
                            </li>
                            @else
                            <li>
                                <a href="http://172.16.43.134:8000/{{$menu['menu']->router}}">
                                    <i class="{{$menu['menu']->icon}}"></i>{{ $menu['menu']->menu }}
                                </a>
                            </li>
                            @endif

                            @endforeach
                        </ul>
                        <!-- End navigation menu -->

                        <div class="clearfix"></div>
                    </div>
                    <!-- end #navigation -->
                </div>
                <!-- end container -->
            </div>
            <!-- end navbar-custom -->

        </header>
        <!-- End Navigation Bar-->

        <!-- ============================================================== -->
        <!-- Start Page Content here -->
        <!-- ============================================================== -->

        <div class="wrapper">

            @yield('content')

        </div>
        <!-- end wrapper -->

        <!-- ============================================================== -->
        <!-- End Page content -->
        <!-- ============================================================== -->

        <!-- Footer Start -->
        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        {{-- 2020 &copy; Minton theme by <a href="#">Coderthemes</a> --}}
                    </div>
                    <div class="col-md-6">
                        <div class="text-md-right footer-links d-none d-sm-block">
                            <a href="javascript:void(0);">About Us</a>
                            <a href="javascript:void(0);">Help</a>
                            <a href="javascript:void(0);">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- end Footer -->

    </div>

    <!-- Vendor js -->
    <script src="{{ asset('assets/js/vendor.min.js') }}"></script>

    <!-- third party js -->
    <script src="{{ asset('assets/libs/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('assets/libs/datatables/dataTables.bootstrap4.js') }}"></script>
    <script src="{{ asset('assets/libs/datatables/dataTables.responsive.min.js') }}"></script>
    <script src="{{ asset('assets/libs/datatables/responsive.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('assets/libs/datatables/dataTables.select.min.js') }}"></script>
    <!-- third party js ends -->

    <!-- Sweet Alerts js -->
    <script src="{{ asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>

    <!-- Dropzone js -->
    <script src="{{ asset('assets/libs/dropzone/dist/dropzone.js') }}"></script>

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}"></script>

    <!-- App js -->
    <script src="{{ asset('assets/js/app.min.js') }}"></script>

    <script>
        $(function() {
                $("div#updateFoodProductDetail").on('hidden.bs.modal', function (e) {
                    $("body").removeClass("modal-open");
                });

                $("div#addFoodProductDetail").on('hidden.bs.modal', function (e) {
                    $("body").addClass("modal-open");
                });
        });

            function PlaySound() {
               
                let plucky = new Audio('/assets/sound/plucky/plucky.mp3');
                plucky.play();
            }

            function PlaySound2() {
               
               let coins = new Audio('/assets/sound/coins/coins.mp3');
               coins.play();
           }
    </script>
</body>

</html>