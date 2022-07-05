/** @format */

import VueRouter from 'vue-router'
import Vue from 'vue'
import NProgress from 'nprogress'

const HomePage = () =>
  import(
    /* webpackChunkName: "chunks/home-page" */ './components/HomePageComponent'
  )
const PageNotFound = () =>
  import(
    /* webpackChunkName: "chunks/page-not-found" */ './components/page/PageNotFoundComponent'
  )
const ProductList = () =>
  import(
    /* webpackChunkName: "chunks/product-list" */ './components/setup/ProductListComponent'
  )
const AllProductList = () =>
  import(
    /* webpackChunkName: "chunks/all-product-list" */ './components/setup/AllProductListComponent'
  )
const CategoryList = () =>
  import(
    /* webpackChunkName: "chunks/category-list" */ './components/setup/CategoryListComponent'
  )
const TenantUserList = () =>
  import(
    /* webpackChunkName: "tenant-user-list" */ './components/setup/TenantUserListComponent'
  )
const PickUpSchedule = () =>
  import(
    /* webpackChunkName: "pickup-schedule" */ './components/setup/PickUpScheduleComponent'
  )
const TimeInterval = () =>
  import(
    /* webpackChunkName: "time-interval" */ './components/setup/TimeIntervalComponent'
  )
const UnitMeasurement = () =>
  import(
    /* webpackChunkName: "unit-measurement" */ './components/setup/UnitMeasurementComponent'
  )
const ContainerType = () =>
  import(
    /* webpackChunkName: "unit-measurement" */ './components/setup/ContainerTypeComponent'
  )
const ProductChoice = () =>
  import(
    /* webpackChunkName: "product-choice" */ './components/setup/product/ProductChoiceComponent'
  )
const AddonProduct = () =>
  import(
    /* webpackChunkName: "addon-product" */ './components/setup/product/AddonProductComponent'
  )
const UpgradableItem = () =>
  import(
    /* webpackChunkName: "upgradable-item" */ './components/setup/product/UpgradableItemComponent'
  )
const ProductSuggestion = () =>
  import(
    /* webpackChunkName: "product-suggestion" */ './components/setup/ProductSuggestionComponent'
  )
const OrderRequest = () =>
  import(
    /* webpackChunkName: "chunks/order-request" */ './components/orderRequest/OrderRequestComponent'
  )
const PickUpOrder = () =>
  import(
    /* webpackChunkName: "chunks/order-request" */ './components/orderRequest/PickUpOrderComponent'
  )
const AdvanceOrder = () =>
  import(
    /* webpackChunkName: "chunks/advance-order" */ './components/orderRequest/AdvanceOrderComponent'
  )
const UndeliverTransaction = () =>
  import(
    /* webpackChunkName: "chunks/undeliver-transaction" */ './components/report/UndeliverTransactionComponent'
  )
const SalesReport = () =>
  import(
    /* webpackChunkName: "chunks/sales-report" */ './components/report/SalesReportComponent'
  )
const TransactionReport = () =>
  import(
    /* webpackChunkName: "chunks/transaction-report" */ './components/report/TransactionReportComponent'
  )
const BestItems = () =>
  import(
    /* webpackChunkName: "chunks/best-items" */ './components/report/BestItemsComponent'
  )
const MyAccount = () =>
  import(
    /* webpackChunkName: "chunks/my-account" */ './components/setup/MyAccountComponent'
  )
const ViewCustomerPickUpOrder = () =>
  import(
    /* webpackChunkName: "chunks/view-customer-order" */ './components/orderRequest/ViewCustomerPickUpOrderComponent'
  )
const ViewCustomerAdvanceOrder = () =>
  import(
    /* webpackChunkName: "chunks/view-customer-advance-order" */ './components/orderRequest/ViewCustomerAdvanceOrderComponent'
  )
import ViewCustomerOrder from './components/orderRequest/ViewCustomerOrderComponent'
import ViewCustomerOrderHistory from './components/orderRequest/ViewCustomerOrderHistoryComponent'
import SuggestionList from './components/setup/suggestion/SuggestionList'
import ImportProducts from './components/setup/import/ImportProducts'
import ImportProductPictures from './components/setup/import/ImportProductPictures'
import ImportCategoryPictures from './components/setup/import/ImportCategoryPictures'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/home',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/import_category_pictures',
      name: 'import-category-pictures',
      component: ImportCategoryPictures
    },
    {
      path: '/import_product_pictures',
      name: 'import-product-pictures',
      component: ImportProductPictures
    },
    {
      path: '/import_products',
      name: 'import-products',
      component: ImportProducts
    },
    {
      path: '/product_list',
      name: 'product-list',
      component: ProductList
    },
    {
      path: '/all_product_list',
      name: 'all-product-list',
      component: AllProductList
    },
    {
      path: '/category_list',
      name: 'category-list',
      component: CategoryList
    },
    {
      path: '/user_list',
      name: 'user-list',
      component: TenantUserList
    },
    {
      path: '/pickup_schedule',
      name: 'pickup-schedule',
      component: PickUpSchedule
    },
    {
      path: '/time_interval',
      name: 'time-interval',
      component: TimeInterval
    },
    {
      path: '/unit_measurement',
      name: 'unit-measurement',
      component: UnitMeasurement
    },
    {
      path: '/container_type',
      name: 'container-type',
      component: ContainerType
    },
    {
      path: '/product_choice',
      name: 'product-choice',
      component: ProductChoice
    },
    {
      path: '/addon_product',
      name: 'addon-product',
      component: AddonProduct
    },
    {
      path: '/upgradable_item',
      name: 'upgradable-item',
      component: UpgradableItem
    },
    {
      path: '/product_suggestion',
      name: 'product-suggestion',
      component: ProductSuggestion
    },
    {
      path: '/order_request',
      name: 'order-request',
      component: OrderRequest
    },
    {
      path: '/pickup_order',
      name: 'pickup-order',
      component: PickUpOrder
    },
    {
      path: '/advance_order',
      name: 'advance-order',
      component: AdvanceOrder
    },
    {
      path: '/undeliver_transaction',
      name: 'undeliver-transaction',
      component: UndeliverTransaction
    },
    {
      path: '/transaction_report',
      name: 'transaction-report',
      component: TransactionReport
    },
    {
      path: '/sales_report',
      name: 'sales-report',
      component: SalesReport
    },
    {
      path: '/best_items',
      name: 'best-items',
      component: BestItems
    },
    {
      path: '/suggestion_list',
      name: 'suggestion-list',
      component: SuggestionList
    },
    {
      path: '/my_account/:userId',
      name: 'my-account',
      component: MyAccount,
      props: true
    },
    {
      path: '/view_order/:ticketId',
      name: 'view-order',
      component: ViewCustomerOrder,
      props: true
    },
    {
      path: '/view_pickup_order/:ticketId',
      name: 'view-pickup-order',
      component: ViewCustomerPickUpOrder,
      props: true
    },
    {
      path: '/view_order_history/:ticketId/:mop',
      name: 'view-order-history',
      component: ViewCustomerOrderHistory,
      props: true
    },
    {
      path: '/view_advance_order/:ticketId',
      name: 'view-advance-order',
      component: ViewCustomerAdvanceOrder,
      props: true
    },
    { path: '*', component: PageNotFound }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

export default router
