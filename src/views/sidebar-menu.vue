<template>
  <el-submenu :index="''+menu.menuId" :keys='menu.menuId' v-if='menu.list && menu.list.length >= 1'>
    <template slot="title">
      <span>{{menu.name}}</span>
    </template>
    <sub-menu v-for='(item,index) in menu.list' :key='""+item.menuId' :menu='item'>
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="''+menu.menuId" @click='gotoRouter(menu)'>
    <span>{{menu.name}}</span>
  </el-menu-item>

</template>

<script>
  import SubMenu from './sidebar-menu'
  export default {
    name: 'sub-menu',
    props: {
      menu: {
        type: Object,
        require: true
      }
    },
    components: {
      SubMenu
    },
    methods:{
      gotoRouter(menu){
        if(/^http[s]?:\/\/.*/.test(menu.url)){
          this.$router.push({path:`i-${menu.menuId}`})
        }else{
          this.$router.push({name:menu.url})
        }
        
        
      }
    },
    mounted() {
    }
  }

</script>
