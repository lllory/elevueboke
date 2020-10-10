<template>
  <nav class="site-navbar">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand">
        <a href="" class="site-navbar__brand-lg">管理系统</a>
      </h1>
    </div>
    <div class="site-navbar__body">
        <el-menu>
            <el-menu-item index="0">
        <el-dropdown :show-timeout='0'>
          <span class="el-dropdown-link">
            <img src="~@/assets/img/admin.jpg" alt="">admin
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
        </el-menu>
      

    </div>

  </nav>

</template>
