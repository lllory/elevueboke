<template>
  <div class="mod-menu">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table class="menu_class" :data="dataList" row-key="menuId" border style="width: 100%; " >
      <el-table-column prop="name" header-align="center" min-width="150" label="名称">
      </el-table-column>
      <el-table-column prop="parentName" header-align="center" align="center" width="120" label="上级菜单">
      </el-table-column>
      <el-table-column prop="type" header-align="center" align="center" label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" header-align="center" align="center" label="排序号">
      </el-table-column>
      <el-table-column prop="url" header-align="center" align="center" width="150" :show-overflow-tooltip="true"
        label="菜单URL">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button  type="text" size="small" @click="addOrUpdateHandle(scope.row.menuId)">修改</el-button>
          <el-button  type="text" size="small" @click="deleteHandle(scope.row.menuId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template> 

<script>
  import AddOrUpdate from './menu-add-or-update'
  import {
    treeDataTranslate
  } from '@/utils'
  export default {
    data() {
      return {
        dataForm: {},
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false,
        dataTree: [{
          "menuId": 1,
          "parentId": 0,
          "parentName": null,
          "name": "系统管理",
          "url": null,
          "perms": null,
          "type": 0,
          "icon": "system",
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 2,
          "parentId": 1,
          "parentName": "系统管理",
          "name": "管理员列表",
          "url": "sys/user",
          "perms": null,
          "type": 1,
          "icon": "admin",
          "orderNum": 1,
          "open": null,
          "list": null
        }, {
          "menuId": 3,
          "parentId": 1,
          "parentName": "系统管理",
          "name": "角色管理",
          "url": "sys/role",
          "perms": null,
          "type": 1,
          "icon": "role",
          "orderNum": 2,
          "open": null,
          "list": null
        }, {
          "menuId": 4,
          "parentId": 1,
          "parentName": "系统管理",
          "name": "菜单管理",
          "url": "sys/menu",
          "perms": null,
          "type": 1,
          "icon": "menu",
          "orderNum": 3,
          "open": null,
          "list": null
        }, {
          "menuId": 5,
          "parentId": 1,
          "parentName": "系统管理",
          "name": "SQL监控",
          "url": "http://localhost:8080/renren-fast/druid/sql.html",
          "perms": null,
          "type": 1,
          "icon": "sql",
          "orderNum": 4,
          "open": null,
          "list": null
        }, {
          "menuId": 6,
          "parentId": 1,
          "parentName": "系统管理",
          "name": "定时任务",
          "url": "job/schedule",
          "perms": null,
          "type": 1,
          "icon": "job",
          "orderNum": 5,
          "open": null,
          "list": null
        }, {
          "menuId": 7,
          "parentId": 6,
          "parentName": "定时任务",
          "name": "查看",
          "url": null,
          "perms": "sys:schedule:list,sys:schedule:info",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 8,
          "parentId": 6,
          "parentName": "定时任务",
          "name": "新增",
          "url": null,
          "perms": "sys:schedule:save",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 9,
          "parentId": 6,
          "parentName": "定时任务",
          "name": "修改",
          "url": null,
          "perms": "sys:schedule:update",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 10,
          "parentId": 6,
          "parentName": "定时任务",
          "name": "删除",
          "url": null,
          "perms": "sys:schedule:delete",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 11,
          "parentId": 6,
          "parentName": "定时任务",
          "name": "暂停",
          "url": null,
          "perms": "sys:schedule:pause",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 12,
          "parentId": 6,
          "parentName": "定时任务",
          "name": "恢复",
          "url": null,
          "perms": "sys:schedule:resume",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 13,
          "parentId": 6,
          "parentName": "定时任务",
          "name": "立即执行",
          "url": null,
          "perms": "sys:schedule:run",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 14,
          "parentId": 6,
          "parentName": "定时任务",
          "name": "日志列表",
          "url": null,
          "perms": "sys:schedule:log",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 15,
          "parentId": 2,
          "parentName": "管理员列表",
          "name": "查看",
          "url": null,
          "perms": "sys:user:list,sys:user:info",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 16,
          "parentId": 2,
          "parentName": "管理员列表",
          "name": "新增",
          "url": null,
          "perms": "sys:user:save,sys:role:select",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 17,
          "parentId": 2,
          "parentName": "管理员列表",
          "name": "修改",
          "url": null,
          "perms": "sys:user:update,sys:role:select",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 18,
          "parentId": 2,
          "parentName": "管理员列表",
          "name": "删除",
          "url": null,
          "perms": "sys:user:delete",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 19,
          "parentId": 3,
          "parentName": "角色管理",
          "name": "查看",
          "url": null,
          "perms": "sys:role:list,sys:role:info",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 20,
          "parentId": 3,
          "parentName": "角色管理",
          "name": "新增",
          "url": null,
          "perms": "sys:role:save,sys:menu:list",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 21,
          "parentId": 3,
          "parentName": "角色管理",
          "name": "修改",
          "url": null,
          "perms": "sys:role:update,sys:menu:list",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 22,
          "parentId": 3,
          "parentName": "角色管理",
          "name": "删除",
          "url": null,
          "perms": "sys:role:delete",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 23,
          "parentId": 4,
          "parentName": "菜单管理",
          "name": "查看",
          "url": null,
          "perms": "sys:menu:list,sys:menu:info",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 24,
          "parentId": 4,
          "parentName": "菜单管理",
          "name": "新增",
          "url": null,
          "perms": "sys:menu:save,sys:menu:select",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 25,
          "parentId": 4,
          "parentName": "菜单管理",
          "name": "修改",
          "url": null,
          "perms": "sys:menu:update,sys:menu:select",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 26,
          "parentId": 4,
          "parentName": "菜单管理",
          "name": "删除",
          "url": null,
          "perms": "sys:menu:delete",
          "type": 2,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 27,
          "parentId": 1,
          "parentName": "系统管理",
          "name": "参数管理",
          "url": "sys/config",
          "perms": "sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete",
          "type": 1,
          "icon": "config",
          "orderNum": 6,
          "open": null,
          "list": null
        }, {
          "menuId": 29,
          "parentId": 1,
          "parentName": "系统管理",
          "name": "系统日志",
          "url": "sys/log",
          "perms": "sys:log:list",
          "type": 1,
          "icon": "log",
          "orderNum": 7,
          "open": null,
          "list": null
        }, {
          "menuId": 30,
          "parentId": 1,
          "parentName": "系统管理",
          "name": "文件上传",
          "url": "oss/oss",
          "perms": "sys:oss:all",
          "type": 1,
          "icon": "oss",
          "orderNum": 6,
          "open": null,
          "list": null
        }]
      }
    },
    components: {
      AddOrUpdate
    },
    activated() {
      // this.getDataList()


    },
    mounted() {
      // this.getDataList()
      this.screenclick()
    },
    methods: {
      screenclick() {
        this.getDataList();
      //点击筛选的时候 让筛选出来的数据展开
      this.listExpand(this.dataList, true);
     
    },
      // 列表展开和收起
      listExpand(arr , isExpand){
        arr.forEach(i => {
        this.$refs.theTable.toggleRowExpansion(i, isExpand);
        if (i.children) {
          this.listExpand(i.children, isExpand);
        }
      });
      },
      // 获取数据列表
      getDataList() {
        // treeDataTranslate(this.dataTree, 'menuId')
        this.dataListLoading = true
        this.$http({
          url: this.$http.addUrl('/admin/list'),
          method: 'get',
        }).then(data => {
          this.dataList = treeDataTranslate(data.list, 'menuId')
          console.log(this.dataList, 'this.dataList');

        })
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle(id) {
        this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.addUrl(`/admin/delete`),
            method: 'post',
            data: {
              id:id
            }
          }).then(data => {
            if (data && data.code === 0) {
              this.$message({
                message: data.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
    }
  }

</script>
