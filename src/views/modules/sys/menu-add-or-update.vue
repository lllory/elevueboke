<template>
  <el-dialog :title="!dataForm.id ? '新增':'修改'" :visible.sync="visible" width="60%">
    <el-form :model='dataForm' :rules='dataRule' ref='dataForm' label-width="80px">
      <el-form-item label="类型">
        <el-radio-group v-model="dataForm.type">
          <el-radio v-for='(item,index) in dataType' :label="index" :key='index'>{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="dataType[dataForm.type]+'名称'" prop='name'>
        <el-input v-model="dataForm.name" :placeholder="dataType[dataForm.type]+'名称'"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop='parentName'>
        <el-popover placement="bottom-start" trigger="click" ref="iconListPopover" prop='parentName'>
          <el-tree :data="menuList" ref='menuListTree' :props="menuListTreeProps" node-key='menuId' :default-expand-all="false"
          @current-change="handleNodeClick" @node-click="handleNodeClick"  :highlight-current="true"></el-tree>
          <el-input v-model="dataForm.parentName" slot="reference" :readonly="true" placeholder="点击选择上级菜单"
            class="menu-list__input"></el-input>
        </el-popover>
        <!-- <el-input v-model="dataForm.parentName" v-popover:iconListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input> -->

      </el-form-item>
      <el-form-item v-if='dataForm.type === 1' label="菜单路由" prop='url'>
        <el-input v-model="dataForm.url"></el-input>
      </el-form-item>
      <el-form-item label="排序号">
        <!-- <el-input v-model="dataForm.orderNum"></el-input> -->
        <el-input-number v-model="dataForm.orderNum" :min="0" label="排序号"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  import {
    treeDataTranslate
  } from '@/utils'
  export default {
    data() {
      return {
        dataForm: {
          id: 0,
          menuId:0,
          type: 0,
          name: '',
          parentId: 0,
          parentName: '',
          orderNum: 0,
          url: '',
          perms: '',
        },
        dataType: ['目录', '菜单'],
        visible: false,
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        menuList: [],
        dataRule: {
          name: [{
            required: true,
            message: '菜单名称不能为空',
            trigger: 'blur'
          }],
          parentName: [{
            required: true,
            message: '上级目录不能为空',
            trigger: 'change'
          }],
          url: [{
            required: true,
            message: '菜单路由不能为空',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      init(id) {
        this.dataForm.id = id || 0
        console.log(this.dataForm.id, 'this.dataForm.id');

        this.$http({
          url: this.$http.addUrl('/admin/select'),
          method: 'get',
        }).then(data => {
          this.menuList = treeDataTranslate(data.list, 'menuId')
          this.visible = true
          this.$nextTick(() => {
            this.dataForm.type = 0
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (!this.dataForm.id) {
            // 新增
            this.menuListTreeSetCurrentNode()
          } else {
            // 修改
            this.$http({
              url: this.$http.addUrl('/admin/info?id=' + this.dataForm.id),
              method: 'get',
            }).then(data => {
              if (data.code === 0) {
                this.dataForm = data.list[0]
                this.dataForm.id = data.list[0].menuId
                this.menuListTreeSetCurrentNode()
                // this.handleNodeClick(this.dataForm)
              } else {
                this.dataForm = {}
              }
            })
          }
        })

      },
      handleNodeClick(data) {
        this.dataForm.parentId = data.menuId
        this.dataForm.parentName =data.name
      },
      // 菜单树设置当前选中节点
      menuListTreeSetCurrentNode () {
        // this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
        // this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
      },
      //   表单保存
      dataFormSubmit() {
          let url = ''
          if(!this.dataForm.id){
              url='/admin/menuSave'
          }else{
              url = '/admin/menuUpdate'
          }
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.addUrl(url),
              method: 'post',
              data:{
                "menuId":this.dataForm.id || 0,
                "type":this.dataForm.type,
                "name":this.dataForm.name,
                "parentId":this.dataForm.parentId,
                "parentName":this.dataForm.parentName,
                "url":this.dataForm.url,
                'perms':this.dataForm.perms,
                'orderNum':this.dataForm.orderNum
              }
               
            }).then(data => {
              if (data.code === 0) {
                this.$message({
                  message: data.msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }

                })
              } else {
                this.dataForm = {}
                this.visible = false
              }
            })
          }
        })
      },

    },
  }

</script>
