<template>
  <el-dialog :visible.sync='visible' :title='!dataForm.id ? "新增":"修改"' width='1000px' @close='close'>
    <el-form :rules='dataRule' :model='dataForm' ref='dataForm' label-width='100px'>
      <el-form-item label='标题'>
        <el-input placeholder="标题" :model='dataForm.title'></el-input>
      </el-form-item>

      <el-form-item label='内容'>
        <!-- <el-input hidden placeholder="内容" :model='dataForm.describle'></el-input> -->
        <div style="width: 100%;height: 40px;"></div>
        <span id="wangEditor"></span>
        <!-- <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar> -->
      </el-form-item>
      <!-- <el-form-item label='图片'>
        <el-input placeholder="图片" :model='dataForm.imgUrl'></el-input>
      </el-form-item> -->
    </el-form>

  </el-dialog>
</template>

<script>
  // import EditorBar from './wangEditor'
  import E from 'wangeditor'
  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          id: '',
          title: '',
          describle: "",
          imgUrl: '',
          content: ''


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
      change(val) {
        console.log(val)

      },
      close() {
        this.editor.txt.html()
        this.editor.destroy()
        this.editor = null
      },
      init(id) {
        this.dataForm.id = id || 0
        console.log(id, 'id----------')
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.editor = new E(`#wangEditor`)
          this.editor.config.uploadImgServer = 'http://zxrlll.xyz/images/cuteAnimals'
          this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
            console.log(resultFiles,'resultFiles-----')
    // 上传图片，返回结果，将图片插入到编辑器中
    insertImgFn(['http://zxrlll.xyz/images/cuteAnimals/11.jpg'])
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
