<template>
  <main class="site-content">
    <el-tabs v-model="$route.name" v-if='$route.meta.isTab'>
      <el-tab-pane v-for='item in mainTabs' :key='item.name' :label="item.name" :name="item.name">
        <el-card class="box-card" :body-style="getContentHeight">
          <iframe
          v-if="item.type === 'iframe'"
          :src="item.iframeUrl"
          width="100%" height="100%" frameborder="0" scrolling="yes">
        </iframe>
        <keep-alive v-else>
          <router-view></router-view>
        </keep-alive>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-card v-else  :body-style="getContentHeight">
        <keep-alive>
        <router-view />
        </keep-alive>
    </el-card>
  </main>
</template>

<script>
    export default {
        data(){
            return {
                mainTabs:[]
            }
        },
        created(){
            this.mainTabs = sessionStorage.getItem('dynamicMenuRoutes')
        },
        mounted(){
            console.log(this,'ggfggf');
            
        },
        computed:{
            getContentHeight(){
                var height = document.documentElement.clientHeight -50 - 30 -2
            //    if(this.$route.meta.isTab){
            //         height-=40
            //         return
            //    }
               return {minHeight:height + 'px'}
            }
        }
    }
</script>
