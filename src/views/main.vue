<template>
    <div class="site-wrapper">
        <nav-sidebar></nav-sidebar>
        <sidebar></sidebar>
        <div class="content site-content__wrapper" :style="{'min-height':documentClient + 'px'}">
            <main-content></main-content>
        </div>
    </div>
</template>
<script>
    import NavSidebar from './navbar'
    import Sidebar from './sidebar.vue'
    import MainContent from './content.vue'
    export default {
        data(){
            return {
                documentClient:'' 
            }
        },
        components:{
            NavSidebar,
            Sidebar,
            MainContent
        },
        mounted(){
            this.resizeDocumentClinet()
        },
        methods:{
            resizeDocumentClinet(){
                this.documentClient = document.documentElement.clientHeight
                window.onresize = ()=>{
                    this.documentClient = document.documentElement.clientHeight
                }
            }
        }
    }
</script>