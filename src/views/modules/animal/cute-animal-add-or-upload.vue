<template>
  <el-dialog :visible.sync='visible' :title='!dataForm._id ? "新增":"修改"' width='1000px' @close='close'>
    <el-form id="cute_form" :rules='dataRule' :model='dataForm' ref='dataForm' label-width='100px'>
      <el-form-item label='标题'>
        <el-input placeholder="标题" v-model='dataForm.title' ></el-input>
      </el-form-item>
      <el-form-item label='展示图片'>
        <div class="add_img_class">
          <p>+</p>
          <p>上传图片</p>
          <span class="close_X" v-if='dataForm.imgUrl' @click='closeImg'>x</span>
        </div>
        <input type="file" ref='imgSelect' name="imgSelect" id="imgSelect"
          accept="image/jpg,image/jpeg,image/png,image/bmp" @change='changeImg'>
        <img v-if='this.dataForm.imgUrl' :src="dataForm.imgUrl" class="imgShow" alt="" @click='selectClick'>
      </el-form-item>
      <el-form-item label='描述'>
        <el-input placeholder="描述" v-model='dataForm.describle'></el-input>
      </el-form-item>
      <el-form-item label='内容'>
        <!-- <el-input hidden placeholder="内容" :model='dataForm.describle'></el-input> -->
        <div style="width: 100%;height: 40px;"></div>
        <div id="wangEditor" ref='refwangEditor'></div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import E from 'wangeditor'
  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          id: '',
          _id: "",
          mId: null,
          title: '12',
          describle: "",
          imgUrl: '',
          content: '',
          expireTime: null,
          type: null,
        },
        FormData: new FormData(),
        dataRule: {},
        editor: '',
        imgOnloadEnd:''


      }
    },
    components: {
      // EditorBar
    },
    mounted() {
      this.$nextTick(() => {
        console.log(new Date().getTime())
      })

    },
    beforeDestroy() {
      // 调用销毁 API 对当前编辑器实例进行销毁
      this.editor.destroy()
      this.editor = null
    },
    watch:{
      imgOnloadEnd(newVal , oldVal){
        console.log(this.dataForm);
        // console.log(newVal,'==============11111');
        // console.log(oldVal,'--==============22222222');
        this.dataForm.imgUrl = newVal
      }
    },
    methods: {
      
      // 已有图片，改变图片点击事件
      selectClick() {
        this.$refs.imgSelect.click()
      },
      //  上传图片
      changeImg(e) {
        // console.log(e.target.files[0]);
        let that = this
        // let imgSrc = window.URL.createObjectURL(e.target.files[0])  //blob流数据
        // // this.imgSrc = imgSrc
        let files = e.target.files[0]
        let img = new Image()
        if (!e || !window.FileReader) return
        let reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onloadend = function (result) {
          // that.dataForm.imgUrl = result.currentTarget.result
          // console.log('图片加载完成');
          // console.log(that,this);
          that.imgOnloadEnd = this.result
          // that.dataForm.imgUrl = this.result
          // that.dataForm = ({
          //   imgUrl: result.currentTarget.result
          // })

          console.log(that.dataForm, 'result.currentTarget.result')
        }
      },
      close() {
        this.editor.txt.html()
        this.editor.destroy()
        this.editor = null
        this.dataForm = ({
          imgUrl: ''
        })
      },
      closeImg() {
        this.dataForm = ({
          imgUrl: ''
        })
      },
      init(row) {
        console.log(row, '----row----');
        
        let row1 = JSON.parse(JSON.stringify(row))
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm = row1 || {}
          console.log(this.dataForm,'=====this.dataForm');
          this.editor = new E(`#wangEditor`)
          this.editor.config.uploadImgServer = 'http://zxrlll.xyz:9000/admin/wangeditorImg/uploadImg'
          // this.editor.config.uploadImgServer = 'http://localhost:9000/admin/wangeditorImg/uploadImg'
          this.editor.config.uploadImgShowBase64 = true
          this.editor.config.debug = true
          this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024, //图片大小限制为 1M
            this.editor.config.uploadFileName = 'wangeditorImg'
          this.editor.config.uploadImgHooks = {
            success: function (xhr, editor, result) {
              console.log('图片上传并返回结果,图片插入成功')
            },
            fail: function (xhr, editor, result) {
              console.log('图片上传并返回结果，但图片插入错误')
            },
            error: function (xhr, editor) {
              console.log('图片上传出错')
            },
            timeout: function (xhr, editor) {
              console.log('图片上传超时')
            },
            customInsert: function (insertImg, result, editor) {
              console.log(result, ' 图片上传并返回结果');
              var url = result.contentUrl[0];
              insertImg(url)
            }
          }
          let that = this
          this.editor.config.onchange = function (newHtml) {
            that.dataForm.content = newHtml
          }
          this.editor.create()

        })


      },
      // 表单提交
      dataFormSubmit() {

        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            console.log(this.FormData, 'FormData')
            let params = new FormData()
            this.FormData.append('_id', this.dataForm._id)
            this.FormData.append('mId', this.dataForm.mId)
            this.FormData.append('title', this.dataForm.title)
            this.FormData.append('describle', this.dataForm.describle)
            this.FormData.append('imgUrl', this.dataForm.imgUrl)
            this.FormData.append('content', this.dataForm.content)
            this.FormData.append('expireTime', this.dataForm.expireTime)
            this.FormData.append('type', this.dataForm.type)

            this.$http({
              url: this.$http.addUrl('/wxApi/cute/wangEditor/imgSave'),
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              data: this.FormData,
            }).then(data => {
              if (data.code === 0) {
                this.$message.success(data.msg);
                this.visible = false
                this.$emit('refrshList')
              } else {
                this.$message.error(data.msg);
              }

              //   console.log(this.dataList, 'this.dataList');

            })
          }
        })
      },
    },

  }

</script>

<style lang="scss">
  #cute_form .add_img_class {
    width: 150px;
    height: 150px;
    border: 1px solid #999;
    box-shadow: #999 0 0 10px 1px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 110px;
    position: relative;
  }

  #cute_form .add_img_class p:first-child {
    height: 30px;
  }

  #cute_form .add_img_class p {
    font-size: 20px;
  }

  #cute_form #imgSelect {
    position: absolute;
    top: 30px;
    height: 80px;
    width: 150px;
    /* background-color: rgba(0, 0, 0, 0); */
    opacity: 0;
  }

  #cute_form .imgShow {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: #999 0 0 10px 1px;
    border-radius: 8px;

  }

  #cute_form .close_X {
    color: rgba(0, 0, 0, .4);
    display: inline-block;
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 18px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    z-index: 1;
  }

</style>
