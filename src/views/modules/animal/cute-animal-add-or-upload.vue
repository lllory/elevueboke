<template>
  <el-dialog :visible.sync='visible' :title='!dataForm._id ? "新增":"修改"' width='1000px' @close='close'>
    <el-form id="cute_form" :rules='dataRule' :model='dataForm' ref='dataForm' label-width='100px'>
      <el-form-item label='标题'>
        <el-input placeholder="标题" v-model='dataForm.title'></el-input>
      </el-form-item>
      <el-form-item label='展示图片'>
        <div class="add_img_class">
          <p>+</p>
          <p>上传图片</p>
          <span class="close_X" v-if='dataForm.imgUrl' @click='closeImg'>x</span>
        </div>
        <input type="file" ref='imgSelect' name="imgSelect" id="imgSelect"
          accept="image/jpg,image/jpeg,image/png,image/bmp" @change='changeImg'>
        <img v-if='dataForm.imgUrl' :src="dataForm.imgUrl" class="imgShow" alt="" @click='selectClick'>
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
          title: '',
          describle: "",
          imgUrl: '',
          content: '',
          expireTime: null,
          type: null,
        },

        titleUeditor: null,
        dataRule: {},
        isClear: false,
        detail: "",

        editor: '',

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
    methods: {
      // 已有图片，改变图片点击事件
      selectClick() {
        this.$refs.imgSelect.click()
        console.log(this.dataForm, 'this.dataForm----');
      },
      //  上传图片
      changeImg(e) {
        console.log(e.target.files[0]);
        let _this = this
        // let imgSrc = window.URL.createObjectURL(e.target.files[0])  //blob流数据
        // // this.imgSrc = imgSrc
        let files = e.target.files[0]
        let img = new Image()
        if (!e || !window.FileReader) return
        let reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onloadend = function (result) {
          _this.dataForm.imgUrl = result.currentTarget.result
        }
      },
      close() {
        this.editor.txt.html()
        this.editor.destroy()
        this.editor = null
        this.dataForm.imgUrl = ''
      },
      closeImg() {
        this.dataForm.imgUrl = ''
      },
      init(row) {
        let row1 = JSON.parse(JSON.stringify(row || {}))
        this.$http({
              url: this.$http.addUrl('/admin/cute/wangEditor/imgSave'),
              method: 'post',
              data: {
                
              }
            }).then(data => {
              if (data.code === 0) {
                // this.dataList = data.list
                // this.totalPage = data.total
              } else {
                // this.dataList = []
                // this.totalPage = 0
                this.$message.error(data.msg);
              }

              //   console.log(this.dataList, 'this.dataList');

            })
        this.visible = true
        this.$nextTick(() => {
          // this.$refs['dataForm'].resetFields()
          this.dataForm = row1 || {}
          this.editor = new E(`#wangEditor`)
          // this.editor.config.uploadImgServer = 'http://zxrlll.xyz/images/wangeditorImg'
          this.editor.config.uploadImgShowBase64 = true
          this.editor.config.debug = true
          this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            // resultFiles 是 input 中选中的文件列表
            // insertImgFn 是获取图片 url 后，插入到编辑器的方法
            var formData = new FormData()
            formData.append('fileImg', resultFiles[0])
          
            // console.log(resultFiles[0], 'resultFiles-----')
            // 上传图片，返回结果，将图片插入到编辑器中
            insertImgFn(['http://zxrlll.xyz/images/cuteAnimals/1.jpg'])
          }
          this.editor.config.onchange = function (newHtml) {
            console.log('change 之后最新的 html', newHtml)
          }
          this.editor.create()

        })


      }
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
