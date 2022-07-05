<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerDiscountedAmountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_discounted_amounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('ticket_id')->index();
            $table->bigInteger('tenant_id')->index();
            $table->bigInteger('discount_id')->index();
            $table->integer('no_approved');
            $table->integer('rider_no_approved');
            $table->decimal('discount', 8, 2);
            $table->decimal('rider_discount', 8, 2);
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
        Schema::dropIfExists('customer_discounted_amounts');
    }
}
