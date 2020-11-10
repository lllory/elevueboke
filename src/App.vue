<template>

  <transition name='fade'>
    <router-view />
  </transition>


</template>

<script>
  export default {

  }

</script>

<style>
  #mod-config{
    padding: 0 10px;

  }
  #mod-form{
    border-bottom: 1px solid #ccc;
  }
  #mod-table{
    margin-top: 10px;
  }
  .site-content .el-card .el-card__body{
    padding: 10px 0;
  }
  .el-form-item{
    margin-bottom: 10px !important;
  }
</style>
