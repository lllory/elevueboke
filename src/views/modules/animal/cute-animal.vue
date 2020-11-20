<template>
  <div class="mod-cute-animal" id="mod-config">
    <el-form :model='dataForm' id="mod-form">
      <el-form-item>
        <el-button type="primary" @click='addOrUpdateHandle()'>新增</el-button>
      </el-form-item>
    </el-form>
    <!-- <script :id="ueId" class="ueditor-box" type="text/plain" style="width: 100%; height: 260px;">hello world!</script> -->
    <el-table id="mod-table" :height='tabHeight ? tabHeight : 320' :data='dataList' border :row-key="getRowKey">
      <el-table-column label="最萌动物管理" align="center">
        <el-table-column type="selection" header-align="center" align="center" width="50" :reserve-selection="true">
        </el-table-column>
        <el-table-column prop="mId" header-align="center" min-width="80" label="anId">
        </el-table-column>
        <el-table-column prop="title" header-align="center" min-width="150" label="标题">
        </el-table-column>
        <el-table-column prop="describle" header-align="center" min-width="150" label="描述">
        </el-table-column>
        <el-table-column prop="imgUrl" header-align="center" min-width="150" label="图片路径">
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click='addOrUpdateHandle(scope.row)'>修改</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination v-if="paginationShow" @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    <cute-animal-add-or-upload v-if='cuteanimaladdorupload' ref='refcuteanimaladdorupload'></cute-animal-add-or-upload>
  </div>


</template>

<script>
  import cuteAnimalAddOrUpload from './cute-animal-add-or-upload'
  export default {
    data() {
      return {
        dataForm: {},
        dataList: [],
        pageSize: 10,
        pageIndex: 1,
        totalPage: 0,
        paginationShow: true,
        tabHeight: window.innerHeight - 400,
        ue: null,
        ueId: `J_ueditorBox_${new Date().getTime()}`,
        ueContent: '',
        cuteanimaladdorupload: false

      }
    },
    components: {
      cuteAnimalAddOrUpload
    },
    mounted() {
      this.getDataList()
      // this.ue = ueditor.getEditor(this.ueId, {
      //   // serverUrl: '', // 服务器统一请求接口路径
      //   zIndex: 3000
      // })
    },
    methods: {
      getRowKey(row) {
        return row.mId
      },
      getDataList() {
        this.paginationShow = false
        this.currentChangeHandle(1)
        this.$nextTick(() => {
          this.paginationShow = true
        })

      },
      // 新增或者修改
      addOrUpdateHandle(row) {
        this.cuteanimaladdorupload = true
        this.$nextTick(() => {
          this.$refs.refcuteanimaladdorupload.init(row)
        })

      },
      sizeChangeHandle(val) {
        this.pageIndex = 1
        this.pageSize = val
        this.getDataList()
      },
      currentChangeHandle(val) {
        this.pageIndex = val
        this.$http({
          url: this.$http.addUrl('/wxApi/mostAdorable/animal'),
          method: 'post',
          data: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        }).then(data => {
          if (data.code === 0) {
            this.dataList = data.list
            this.totalPage = data.total
          } else {
            this.dataList = []
            this.totalPage = 0
            this.$message.error(data.msg);
          }

          //   console.log(this.dataList, 'this.dataList');

        })
      },
    },

  }

</script>
