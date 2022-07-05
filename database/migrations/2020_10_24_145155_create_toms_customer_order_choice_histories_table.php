<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTomsCustomerOrderChoiceHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('toms_customer_order_choice_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('order_id');
            $table->bigInteger('choice_id');
            $table->bigInteger('uom_id')->nullable();
            $table->boolean('choice_drinks')->default(0);
            $table->boolean('choice_fries')->default(0);
            $table->boolean('choice_sides')->default(0);
            $table->decimal('addon_price', 8, 2)->nullable();
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
        Schema::dropIfExists('toms_customer_order_choice_histories');
    }
}
