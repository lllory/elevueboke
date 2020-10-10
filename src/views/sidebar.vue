<template>
  <aside class="site-sidebar site-sidebar--dark">

    <div class="site-sidebar-inner">
      <el-menu :default-active='""+1' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index='home' @click='$router.push({name:"home"})'>
          <span>首页</span>
        </el-menu-item>
        <sub-menu v-for='(menu,index) in menuList' :key='menu.menuId' :menu='menu' :index='""+menu.menuId'></sub-menu>
      </el-menu>
    </div>


  </aside>
</template>

<script>
  import SubMenu from './sidebar-menu.vue'
  export default {
    data() {
      return {
        menuList: []
      }
    },
    created() {

    },
    mounted() {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList'))

    },
    components: {
      SubMenu
    },
    methods: {
      handleOpen() {},
      handleClose() {}
    }
  }

</script>
