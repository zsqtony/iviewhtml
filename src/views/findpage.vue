<template>
    <Layout>
    <Sider hide-trigger :style="{background: '#fff'}">
        <Menu :active-name="active_num" ref="side_menu" theme="light" width="auto" :open-names='open_activeNum' @on-select="GoFun" @on-open-change="openzhanka" accordion>
            <Submenu v-for="i in menulist" :key="i.num" :name="i.num">
                <template slot="title">
                    <Icon :type="i.icon"></Icon>
                    {{i.title}}
                </template>
                <MenuItem v-for="(find,index) in i.children" :key="index" :name="i.num +'-'+ index" :to="find.url">{{find.title}}</MenuItem>
            </Submenu>
        </Menu>
    </Sider>
    <Layout :style="{padding: '0 24px 24px'}">
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem v-for="(i,index) in breadcrumbitem" :key="index">{{i}}</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view />
        </Content>
    </Layout>
    </Layout>
</template>
<script>
    export default{
        data(){
            return{
                menulist:[],
                active_num:'',
                open_activeNum:[],
                breadcrumbitem:[],
            }
        },
        methods:{
            openzhanka(num){
                this.open_activeNum = num
                sessionStorage.open_activeNums = JSON.stringify(num)
                console.log(num,'展开')
            },
            GoFun(num){
                let _this = this
                this.active_num = num
                sessionStorage.sactive_num = num
                this.menulist.forEach((res)=>{
                    res.children.forEach((re)=>{
                        if(re.num == num){
                            _this.breadcrumbitem[0] = res.title
                            _this.breadcrumbitem[1] = re.title
                            sessionStorage.breadcrumbitem = JSON.stringify(_this.breadcrumbitem)
                        }
                    })
                })
                console.log(num,'3232')
            }
        },
        computed:{
            breadcrum(){
                return this.$store.state.breadcrumbobj
            },
            menu(){
                this.menulist = this.$store.state.left_menu
                console.log(this.menulist,'ppp00')
                if(this.menulist.length != 0 && this.menulist[0].children != undefined){
                    sessionStorage.menulist = JSON.stringify(this.menulist)   //左侧菜单
                    sessionStorage.sactive_num = this.menulist[0].children[0].num //左侧子菜单高亮
                    this.active_num = this.menulist[0].children[0].num //左侧子菜单高亮
                    this.breadcrumbitem.push(this.menulist[0].children[0].title)  //面包小导航
                    this.open_activeNum = ['1']
                    sessionStorage.open_activeNums = JSON.stringify(['1'])
                    sessionStorage.breadcrumbitem = JSON.stringify(this.breadcrumbitem) //面包小导航
                    this.go(this,this.menulist[0].children[0].url) //跳转页面
                    this.$nextTick(()=>{
                        this.$refs.side_menu.updateOpened()
                        this.$refs.side_menu.updateActiveName()
                    })
                } else {
                    if(sessionStorage.menulist != undefined){
                        this.menulist = JSON.parse(sessionStorage.menulist)
                        console.log(this.menulist,'3311111')
                    }
                }
            }
        },
        watch:{
            menu(menu){
                console.log(menu,'333ppp')
            },
            breadcrum(item){
                this.breadcrumbitem = item
                sessionStorage.breadcrumbitem = JSON.stringify(this.breadcrumbitem)
            }
        },
        mounted(){
            if(sessionStorage.breadcrumbitem != undefined){
                this.breadcrumbitem = JSON.parse(sessionStorage.breadcrumbitem)
            }
            if(sessionStorage.sactive_num != undefined){
                this.active_num = sessionStorage.sactive_num
            }
            if(sessionStorage.open_activeNums != undefined){
                this.open_activeNum = JSON.parse(sessionStorage.open_activeNums)
            }
            this.$nextTick(()=>{
                this.$refs.side_menu.updateOpened()
                this.$refs.side_menu.updateActiveName()
            })
        },
        components:{
        }
    }
</script>
