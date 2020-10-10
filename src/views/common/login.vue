<template>
  <div class="site-wrapper site-login-page">
    <div class="site-content_wrapper">
      <div class="site-content">
        <div class="login-tile">
          <span>管理系统</span>
        </div>
        <div class="login-main">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="pass">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="main-button">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        radio: '1',
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {},
        dataList: {}
      }
    },
    methods: {
      submitForm() {
        // axios.post('/admin/login',
        //   JSON.stringify(this.ruleForm)
        // )
        // axios.post('api/admin/login',
        //   JSON.stringify(this.ruleForm)
        // )
        this.$http({
          url: this.$http.addUrl('/admin/login'),
          method: 'post',
          data:this.$http.adornData(this.ruleForm)
        }).then(res => {
          if (res.code === 0) {
            console.log(res,'res');
            this.dataList = res.list
            this.$cookie.set('token', this.dataList.token)
            this.$cookie.set('username', this.dataList.username)
            this.$router.replace({name:'home'})
          } else {
            this.dataList = {}
          }
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    // 重置
    resetForm() {
      this.ruleForm = ({
        username: '',
        password: ''
      })
    }

  }

</script>

<style lang="scss" scoped>
  .site-wrapper.site-login-page {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: 100px center;

    &:after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url('~@/assets/img/login-bg.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: -50px center;
    }

    .site-content_wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;

      .site-content {
        width: 400px;
        height: 350px;
        position: absolute;
        right: 100px;
        top: 30%;
        z-index: 1;
        box-shadow: 0 0 10px grey;
        background: rgba(243, 240, 240, .5);

        .login-tile {
          font-size: 20px;
          color: #fff;
          font-weight: 600;
          text-align: center;
          height: 70px;
          line-height: 70px;
          border-bottom: 1px dashed #755555;
          margin-bottom: 10px;

        }

        .login-main {
          padding: 20px 35px 0 0;
        }
      }
    }
  }

</style>
