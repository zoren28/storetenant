<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerOrderHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_order_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('ticket_id');
            $table->bigInteger('tenant_id');
            $table->bigInteger('product_id');
            $table->integer('quantity_purchase');
            $table->string('product_quantity')->default('');
            $table->boolean('product_availability');
            $table->double('total_price', 8, 2);
            $table->boolean('mop');
            $table->dateTime('pickup_at', 0);
            $table->boolean('icoos');
            $table->boolean('cancelled_status');
            $table->boolean('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_order_histories');
    }
}
