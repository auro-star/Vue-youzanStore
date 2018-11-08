import '@/modules/css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
// import Foot from '@/components/Foot.vue'
import url from '@/modules/js/api.js'
import mixin from '@/modules/js/mixin.js'


new Vue({
    el:'#app',
    data:{
        topLists:null,
        topIndex:0,
        subData:null,
        rankData:null,
        
    },
    created(){
        this.getTopList()
        this.getSublist(0,0)
    },
    methods:{
        getTopList(){
            axios.get(url.topList).then(res=>{
                this.topLists = res.data.lists
                console.log(res);                
            })
        },
        getSublist(id,index){
            this.topIndex = index
            if(index===0){
                this.getRank()
            }else{
                axios.get(url.subList,{id}).then(res=>{
                    this.subData = res.data.data
                })
            }
        },
        getRank(){
            axios.get(url.rank).then(res=>{
                
                this.rankData = res.data.data
                console.log( this.rankData);
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    
    },
    mixins:[mixin]
    // components:{
    //     Foot
    // },
    // filters:{
    //     number(price){
    //         let priceStr = ''+ price
    //         if(priceStr.indexOf('.') >-1){
    //             let arr = priceStr.split('.')
    //             return arr[0]+ '.' + (arr[1] + '0').substr(0,2)
    //         }else{
    //             return priceStr + '.00'
    //         }
    //     }
    // }
})