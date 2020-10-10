<template>
    <div class="site-home">

        <div class="site-home__header mBottom">
            <div class="site-home_card" v-for='(item) in cardList'>
                <div class="site-home-icon" :style="{background:item.backgrond}">
                    <span>
                        <i class="iconfont" >{{item.icon}}</i>
                    </span>
                    
                </div>
                <div class="site-home-number">
                    <div class="number">{{item.num}}</div>
                    <div class="title">{{item.title}}</div>
                </div>
            </div>
        </div>

        <div class="site-home__section mBottom">
            <div class="site-home-pie" id="site-home-pie">
                <div-pie class="pie"></div-pie>
            </div>
            <div class="site-home-plain" id="site-home-plain">
                <div-bar class="plain"></div-bar>
            </div>
        </div>


        <div class="site-home-footer">
            <div class="site-footer-line">
                <div-line></div-line>
            </div>
        </div>


    </div>
</template>

<script>
    import DivPie from '../modules/echarts/pie-echarts'
    import DivBar from '../modules/echarts/plain-echarts'
    import DivLine from '../modules/echarts/line-echarts'
    export default {
        data(){
            return {
                tabIndex:-1,
                cardList:[
                    {
                       icon: `\ue603`,
                       backgrond:'rgba(45, 140, 240,1)',
                        num:'23',
                        title:'新增用户'
                    },
                    {
                        icon:'\ue62f',
                        backgrond:'rgba(25, 190, 107)',
                        num:'368',
                        title:'累计点击'
                    },
                    {
                        icon:'\ue627',
                        backgrond:'rgba(255, 153, 0)',
                        num:'23',
                        title:'新增问答'
                    },
                    {
                        icon:'\ue625',
                        backgrond:'rgba(237, 63, 20)',
                        num:'23',
                        title:'分享统计'
                    },
                    {
                        icon:'\ue62c',
                        backgrond:'rgba(228, 108, 187)',
                        num:'23',
                        title:'新增互动'
                    },
                    {
                        icon:'\ue629',
                        backgrond:'rgba(154, 102, 228)',
                        num:'23',
                        title:'新增页面'
                    },
                ]
            }
        },
        components:{
            DivPie,
            DivBar,
            DivLine
        },
        computed:{
            returnBackground(){

            }
        }
    }

</script>

<style lang="scss"  scoped>
  
     .site-home{
        width: 100%;
        height: 100%;
        background: #f1f4f5;
        .site-home__header{
            height: 110px;
           
            display:flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-around;
            .site-home_card{
                flex: 1;
                background: #fff;
                margin:0 10px;
                display: flex;
                flex-direction: row;
                border-radius: 5px;
                .site-home-icon{
                   width: 50px; 
                   span{
                       width: 100%;
                       height: 100%;
                       display: inline-block;
                       line-height: 108px;
                       text-align: center;
                   }
                }
                .site-home-number{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .number{
                        font-size: 50px;
                        text-align:center;
                        color:#676565;


                    }
                    .title{
                        height: 20%;
                        text-align: center;
                        color: #524c4c;
                    }
                }
            }
        }


        .site-home__section{
            height: 350px;
            display: flex;
            flex-direction: row;
            margin: 0 10px;
            .site-home-pie{
                width: 330px;
                background:#fff;
                .pie{
                    height: 350px;
                }
            }
            .site-home-plain{
            flex: 1;
            height: 350px;
            background: #fff;
            margin-left: 20px;
        }
        }

        .site-home-footer{
            margin: 20px 10px 0px ;
            height: 35vh;
            background: #fff;
            .site-footer-line{
            }
        }
    }

    .mBottom{
      margin-bottom: 20px
  } 
</style>