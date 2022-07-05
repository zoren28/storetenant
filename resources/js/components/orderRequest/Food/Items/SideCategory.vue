<template>
  <ul class="list-group margin-bottom-25 sidebar-menu">
    <li class="list-group-item clearfix">
      <a
        href="javascript:;"
        @click="retrieveFoodProductsByCategory({ category_id: 0, category: 'All' })"
      >
        <i class="fa fa-angle-right"></i>
        All
      </a>
    </li>
    <li
      v-for="category in foodCategories"
      :key="category.category_id"
      class="list-group-item clearfix"
    >
      <a href="javascript:;" @click="retrieveFoodProductsByCategory(category)">
        <i class="fa fa-angle-right"></i>
        {{ category.category }}
      </a>
    </li>
  </ul>
</template>

<script>
/** @format */

export default {
  props: {
    foodCategories: {
      type: Array,
      required: true
    }
  },
  methods: {
    retrieveFoodProductsByCategory(category) {
      this.$emit('retrieveFoodProductsByCategory', category)
    }
  }
}
</script>