import Vue from 'vue'
import Vuex from ''

export default {
    // state:{
    //     menuList:[{
    //         name: '系统1',
    //         menuId: 1,
    //         list: [{
    //           name: '系统1-1',
    //           menuId: 11,
    //           url:'/test1'
    //         }]
    //       },
    //       {
    //         name: '系统2',
    //         menuId: 2,
    //         list: [{
    //           name: '系统2-1',
    //           menuId: 21,
    //           url:'/test2'
    //         }]
    //       },
    //       {
    //         name: '系统3',
    //         menuId: 3,
    //       },

    //     ]
    // },
    mutations:{
        updateMenuList(state,menu){
            state.menuList = menu
        },
        resetStore(state){
          Object.keys(state).forEach(key=>{

          })
        }
    }
}