<template>
    <div class="layout">
        <Layout>
            <div class="frame_header">
                <Menu mode="horizontal" theme="light" :active-name="activesmun" @on-select="topmenu">
                    <div class="layout-logo"><h3>惠选管理系统</h3></div>
                    <div class="layout-nav">
                        <MenuItem v-for="i in menulist" :key="i.num" :name="i.num" :to="i.url">
                            <Icon :type="i.icon" />
                            {{i.title}}
                        </MenuItem>
                        <Button type="text" @click="exitFun">退出</Button>
                    </div>
                </Menu>
            </div>
            <router-view />
        </Layout>
    </div>
</template>
<style lang="less">
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
    }
    .frame_header{width:100%;height:60px;}
    .layout-logo{
        width:200px;
        background-color:#000;
        color:#fff;
        text-align:center;
        height: 100%;
        line-height: 60px;
        float: left;
    }
    .layout-nav{
        float: right;
        margin-right: 20px;
    }
</style>
<script>

    export default{
        data(){
            return{
                activesmun:'0',
                menulist:[
                    {
                        title: '首页',
                        url: '/',
                        icon: 'md-home',
                        num:'0'
                    },{
                        title: '商品管理',
                        url: '/findpage',
                        num:'1',
                        icon:'ios-keypad'
                    },{
                        title: '订单管理',
                        url: '/findpage',
                        num:'2',
                        icon:'ios-paper'
                    },{
                        title: '出团管理',
                        url: '/findpage',
                        num:'3',
                        icon:'md-basket'
                    },{
                        title: '会员管理',
                        url: '/findpage',
                        num:'4',
                        icon:'ios-people'
                    }
                ]
            }
        },
        methods:{
            exitFun(){
                let _this = this
                _this.$Notice.success({
                    title: '登录提示',
                    desc: '退出成功，系统正在跳转！'
                });
                sessionStorage.clear()
                setTimeout(()=>{
                    _this.$router.replace({path: '/login'})
                },800)
            },
            ApiPost(url,datakey,funct){  //post请求
                let data = this.keynul(datakey)
                this.post(this,url,data,function(json){
                    return funct(json)
                })
            },
            topmenu(name){
                let _this = this
                this.activesmun = name
                sessionStorage.topactivesmun = name
                this.menulist.forEach((res)=>{
                    if(res.num == name){
                        _this.$store.commit('header_menu_leftmeny',{idx:name,title:res.title})
                    }
                })
            }
        },
        mounted(){
            if(sessionStorage.topactivesmun != undefined){
                this.activesmun = sessionStorage.topactivesmun
            }
        },
        components:{

        }
    }
</script>
