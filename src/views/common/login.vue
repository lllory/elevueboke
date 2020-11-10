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
            <el-form-item label="验证码" prop="captcha_code">
              <el-row :gutter='20'>
                <el-col :span='14'>
                  <el-input type="text" v-model="ruleForm.captcha_code" autocomplete="off">
                  </el-input>
                </el-col>
                <el-col :span='9' ref='login-captcha'>
                  <div @click='refreshCode'>
                      <s-identify :identifyCode="identifyCode"></s-identify>
                  </div>
                  
                </el-col>
              </el-row>


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
  import {
    createCode,
    color
  } from '@/utils'
  import SIdentify from './sidentify'
  export default {
    data() {
      return {
        radio: '1',
        ruleForm: {
          username: '',
          password: '',
          captcha_code: ""
        },
        identifyCodes: "1234567890",
        identifyCode: "",
        rules: {},
        dataList: {}
      }
    },
    components: {
      SIdentify
    },
    created() {
      // 初始化验证码
      this.refreshCode()
    },
    mounted() {},
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },

      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
        console.log(this.identifyCode);
      },
      submitForm() {
        this.$http({
          url: this.$http.addUrl('/admin/login'),
          method: 'post',
          data: this.$http.adornData(this.ruleForm)
        }).then(res => {
          if (res.code === 0) {
            console.log(res, 'res');
            this.dataList = res.list
            this.$cookie.set('token', this.dataList.token)
            this.$cookie.set('username', this.dataList.username)
            this.$router.push({
              name: 'home'
            }).catch(err => {

            })
          } else {
            this.dataList = {}
          }
        }).catch(error => {
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
      background-position: -10px center;
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

          .login-captcha {
            display: inline-block;
            cursor: pointer;
            width: 25%;
            overflow: hidden;
            height: 38px;
            /* border:1px solid #999; */
            background: rgba(176, 179, 53, .5);
            margin: 0;
            padding: 0;
            margin-right: -4px;
          }

        }

      }
    }
  }

</style>
