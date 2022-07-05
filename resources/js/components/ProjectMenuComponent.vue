<!-- @format -->

<template>
  <ul class="navigation-menu">
    <li
      :class="menu.submenu === 1 ? 'has-submenu' : ''"
      v-for="(menu, index) in getList"
      :key="index"
    >
      <a href="#" v-if="menu.submenu === 1">
        <i :class="menu.icon"></i>{{ menu.menu }}
        <div class="arrow-down"></div
      ></a>
      <ul class="submenu" v-if="menu.submenu === 1">
        <li v-for="(sub, subIndex) in menu.submenus" :key="subIndex">
          <router-link :to="{ name: sub.router }">
            {{ sub.submenu }}
          </router-link>
        </li>
      </ul>
      <router-link
        href="javascript:void(0);"
        v-else
        :to="{ name: menu.router }"
      >
        <i :class="menu.icon"></i>{{ menu.menu }}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      table_data: {}
    }
  },
  computed: {
    getList() {
      return this.table_data
    }
  },
  methods: {
    fetchProjectMenu() {
      axios.get('/menu/project_menu').then(response => {
        this.table_data = response.data
        console.log(response.data)
      })
    }
  },
  mounted() {
    this.fetchProjectMenu()
  }
}
</script>
