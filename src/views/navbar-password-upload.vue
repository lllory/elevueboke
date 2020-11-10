<template>
  <el-dialog title="修改密码" :visible.sync="visible" :append-to-body="true">
    <el-form :model='uploadForm' ref='uploadForm' id='uploadForm' :rules='uploadForms' @keyup.enter.native='dataFormSubmit'
      label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="用户名" disabled readonly></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop='password'>
        <el-input type='password' v-model="uploadForm.password" placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop='newPassword'>
        <el-input type='password' v-model="uploadForm.newPassword" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop='confirmPassword'>
        <el-input type='password' v-model="uploadForm.confirmPassword" placeholder="确认密码"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
        var validateConfirmPwd = (rule , value , callback)=>{
            if(this.uploadForm.newPassword !== value){
                callback(new Error("确认密码与新密码不一致"))
            }else{
                callback()
            }
        }
      return {
        visible: false,
        username: '',
        uploadForm: {
          password: "",
          newPassword: "",
          confirmPassword: ''
        },
        uploadForms:{
            password:[
                {required:true,message:'原密码不能为空',trigger:'blur'}
            ],
            newPassword:[
                {required:true,message:'新密码不能为空',trigger:'blur'}
            ],
            confirmPassword:[
                {required:true,message:'确认密码不能为空',trigger:'blur'},
                {validator:validateConfirmPwd,trigger:'blur'}
            ]
        }
      }
    },
    created() {
      this.username = this.$cookie.get('username')
    },
    methods: {
      init() {
        this.visible = true
      },
      dataFormSubmit() {
        this.$http({
            url: this.$http.addUrl('/admin/uploadPwd'),
            method: 'post',
            data: this.$http.adornData({
              username:this.username,
              password:this.uploadForm.password,
              newPassword:this.uploadForm.newPassword
            })
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                  }
                })
            } else {
              this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                  }
                })
            }
          }).catch(error => {
            console.log(error)
          })
      }
    }
  }

</script>
