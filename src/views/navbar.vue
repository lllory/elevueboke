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
              <el-dropdown-item @click.native = 'uploadPwdHandle()'>修改密码</el-dropdown-item>
              <el-dropdown-item @click.native='logout()'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 修改密码 -->
    <upload-pwd v-if='uploadPwdVisible' ref='uploadPwd'></upload-pwd>
  </nav>

</template>

<script>
  import {
    clearLoginInfo
  } from '@/utils'
  import UploadPwd from './navbar-password-upload'
  export default {
    data() {
      return {
        uploadPwdVisible:false
      }
    },
    components: {
      UploadPwd
    },
    methods: {
      uploadPwdHandle(){
        this.uploadPwdVisible = true
        this.$nextTick(()=>{
          this.$refs.uploadPwd.init()
        })
        // console.log(username,'username----');
        

      },      
      // 登出
      logout() {
        this.$confirm('确定退出吗？', '提示', {
          confirmButtonText: "确定",
          cancelmButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http({
            url: this.$http.addUrl('/admin/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(res => {
            if (res.code === 0) {
              clearLoginInfo()
              this.$router.push({
                name: 'login'
              })
            } else {

            }
          }).catch(error => {
            console.log(error)
          })
        })


      }
    }
  }

</script>
