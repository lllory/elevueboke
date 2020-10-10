export function clearLoginInfo(){
    sessionStorage.clear()
    localStorage.clear()
}

/**
 * 树形数据转换
 * @param {*} data 
 * @param {*} id 
 * @param {*} pid 
 */

export function treeDataTranslate(data , menuId = 'id' , pid = 'parentId'){
    var temp = []
    var res = []
    for (let i = 0; i < data.length; i++) {
        temp[data[i][menuId]] = data[i];
    }
    // debugger
    for (let k = 0; k < data.length; k++) {
        if(temp[data[k][pid]] && data[k][menuId] !== data[k][pid]){
            if(!temp[data[k][pid]]['children']){
                temp[data[k][pid]]['children'] = []
            }
            temp[data[k][pid]]['children'].push(data[k]) 
        }else{
            res.push(data[k])
        }
    }
    return res
    // debugger
}

































// export function treeDataTranslate(data , id = 'id' , pid = 'parentId'){
//     var temp = []
//     var res = []
//     for (let i = 0; i < data.length; i++) {
//         temp[data[i]['menuId']] = data[i]
//     }
//     for (let k = 0; k < data.length; k++) {
//         if(temp[data[k][pid]] && data[k][id] !== data[k][pid]){
//             if(!temp[data[k][pid]]['children']){
//                 temp[data[k][pid]]['children'] = []
//             }
//             if (!temp[data[k][pid]]['_level']) {
//                 temp[data[k][pid]]['_level'] = 1
//               }
//               data[k]['_level'] = temp[data[k][pid]]._level + 1
//               temp[data[k][pid]]['children'].push(data[k])
//         }  else{
//             res.push(data[k])
//         }   
//     }
//     sessionStorage.setItem('temp',JSON.stringify(temp))
// }

