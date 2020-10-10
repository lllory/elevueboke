<template>
  <div>
    <div id="pie" style="height:350px"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
        this.getPie()
    },
    methods: {
      getPie() {
        var mychart1 = this.$echarts.init(document.getElementById('pie'))
        var option = {
          title: {
            text: '用户访问来源',
            left: 'center',
            color:'##676565'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 10,
            top: 20,
            bottom: 20,
            data:  ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          tooltip: {},
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '48%',
            center: ['45%', '60%'],
            color:['rgba(45, 140, 240,1)','rgba(25, 190, 107)','rgba(255, 153, 0)','rgba(237, 63, 20)','rgba(228, 108, 187)'],
            data:[
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
          }]
        }
        mychart1.setOption(option)

        window.addEventListener('resize',()=>{
          mychart1.resize()
        })

      }
    }
  }

</script>
