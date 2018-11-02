<template>
    <div>
        <Row :gutter="10">
            <i-col span="4"><al-cascader placeholder="选择省市区" @on-change="addressfun" level="2" v-model="addressobj"/></i-col>
            <i-col span="3"><Select clearable v-model="pagedata.lines_type_id" placeholder="分类"><Option v-for="i in classes_type_list" :key="i.id" :value="i.id">{{i.name}}</Option></Select></i-col>
            <i-col span="3"><Select clearable v-model="pagedata.sort_by" placeholder="排序"><Option v-for="i in sort_byobj" :key="i.id" :value="i.id">{{i.name}}</Option></Select></i-col>
            <i-col span="4"><i-input clearable v-model="pagedata.code" placeholder="请输入编号"></i-input></i-col>
            <i-col span="3"><i-input clearable v-model="pagedata.name" placeholder="请输入名称"></i-input></i-col>
            <i-col span="3"><i-input clearable v-model="pagedata.max_members" placeholder="成团数"></i-input></i-col>
            <i-col span="3"><Button type="primary" @click="query_Btn_Fun">查询</Button></i-col>
        </Row>
        <zsq-table :headers="headers" :bodys="tboay" @qrcodesetfun="qrcode_setFun" @shelvesfuns="shelveslowerFun" :pageobj="pagedata" @querydetailefun="querydetaileFun" @editorfun="editor_courseFun" @deletesfun="deleteFun" :shows="true" @topage="querypage" :loadingst="loadingst" @pagesize="pagesizeFun"></zsq-table>
        <Modal v-model="showdetaile" title="详情" :styles="{top:'20px'}" width="600" :mask-closable="false">
            <zsq-detaile :detailecourse="detailecourse" :classes_type_list="classes_type_list" :type="3"></zsq-detaile>
            <div slot="footer"><Button @click="showdetaile = false">关闭</Button></div>
        </Modal>
        <Modal v-model="showdetailes" title="扫码查看" width="600" :mask-closable="false">
            <div class="qrcode_cont">
                <div id="qrcode"></div>
                <div>微信扫码</div>
            </div>
            <div slot="footer"><Button @click="showdetailes = false">关闭</Button> <Button type="primary" @click="downloadImg">下载二维码</Button></div>
        </Modal>
    </div>
</template>
<style lang="less">
    .qrcode_cont{padding:20px 0 20px 0;text-align:center;}
    #qrcode{display:inline-block;padding:5px;img{padding:8px;background-color:#f5f5f5;border-radius:5px;}}
</style>
<script>
    import QRCode from 'qrcodejs2'
    import zsq_detaile from '../public/details.vue'
    import config from '../../config.js'
    export default{
        data(){
            return{
                loadingst:false,
                showdetaile:false,
                showdetailes:false,
                sort_byobj:config.SORT_BY,
                addressobj:[],
                detailecourse:{},
                headers:[
                    {
                        title: 'id',
                        width:100,
                        key: 'id'
                    },{
                        title: '分类',
                        width:200,
                        tooltip:true,
                        key: 'lines_type_name'
                    },{
                        title: '编号',
                        width:300,
                        tooltip:true,
                        key: 'code'
                    },{
                        title: '名称',
                        width:200,
                        key: 'name'
                    },{
                        title: '最大人数',
                        width:100,
                        render:(h,params)=>{
                            let row = params.row
                            return h('div',{},row.max_members+'人')
                        },
                    },{
                        title: '天数',
                        width:100,
                        render:(h,params)=>{
                            let row = params.row
                            return h('div',{},row.days+'天'+row.nights+'夜')
                        }
                    },{
                        title: '单价',
                        width:160,
                        render:(h,params)=>{
                            return h('div',{
                                style:{
                                    color:'#f00'
                                }
                            },'¥'+params.row.price)
                        },
                    },{
                        title: '操作',
                        minWidth:130,
                        fixed: 'right',
                        render:(h,params)=>{
                            let row = params.row
                            return h('div',[
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size: 'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    }
                                },'编辑'),
                                h('Button',{
                                    props:{
                                        type:'error',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.deleteFun(row.id)
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }
                ],
                tboay:[],
                pagedata:{
                    province:'',
                    city:'',
                    area:'',
                    code:'',
                    name: '',
                    sort_by:'',
                    lines_type_id: '',
                    max_members:null,
                    page:1,
                    total:0,
                    per_page:12
                },
                classes_type_list:[],
                qrcode:{},
                oqrcodename:''
            }
        },
        methods:{
            qrcode_setFun(row){ //查看二维码
                this.showdetailes = true
                this.oqrcodename = '萌芽平台'+row.name + '代理商'
                this.qrcode.clear()
                this.qrcode.makeCode('https://amy.astu.cc?astucode='+row.code)
            },
            downloadImg(){
                let oQrcode = document.querySelector('#qrcode img')
                let url = oQrcode.src
                let a = document.createElement('a')
                let event = new MouseEvent('click')
                // 下载图名字
                a.download = this.oqrcodename
                //url 
                a.href = url
                a.dispatchEvent(event)
                this.success(this,'提示','二维码下载成功')
            },
            addressfun(row){ //省市区选择
                console.log(row,'cssd')
                if(row.length == 0){
                    this.pagedata.province = ''
                    this.pagedata.city = ''
                    this.pagedata.area = ''
                    return false
                }
                this.pagedata.province = row[0].name
                this.pagedata.city = row[1].name
                this.pagedata.area = row[2].name
            },
            shelveslowerFun(obj){ //上下架
                let _this = this
                _this.ApiPost('lines/enable',{id:obj.id,flag:obj.val},function(json){
                    console.log(json,'3232')
                    if(json.code == 1){
                        _this.success(_this,'提示',(obj.val==0?'下架':'上架')+'成功,系统正在更新')
                        setTimeout(()=>{
                            _this.ListFun()
                        },600)
                    }
                })
            },
            querydetaileFun(id){ //查看
                console.log(id,'查看')
                let _this = this
                this.showdetaile = true
                this.ApiPost('lines/show',{id:id},function(json){
                    _this.detailecourse = json.data
                    let imgarr = JSON.parse(json.data.img_url)
                    if(typeof(imgarr) == 'object'){
                        _this.detailecourse.img_url = imgarr
                    }
                })
            },
            editor_courseFun(id){
                sessionStorage.astuid = id
                this.go(this,'/line/editorline')
                console.log(id,'编辑')
            },
            deleteFun(id){
                let _this = this
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '<p>你确定要删除当前线路？</p><p>数据将不可恢复</p>',
                    onOk: () => {
                        _this.ApiPost('lines/destroy',{id:id},function(json){
                            if(json.code == 1){
                                _this.success(_this,'提示','删除成功，系统正在更新')
                                setTimeout(()=>{
                                    _this.query_Btn_Fun()
                                },600)
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('已取消');
                    }
                });
            },
            querypage(num){
                this.pagedata.page = num
                this.ListFun()
                console.log(num,'分页')
            },
            pagesizeFun(size){
                this.pagedata.page = 1
                this.per_page.per_page = size
                this.ListFun()
            },
            query_Btn_Fun(){ //查询
                this.pagedata.page = 1
                this.ListFun()
            },
            ListFun(){ //列表
                let _this = this
                this.loadingst = true
                this.ApiPost('lines/list',this.pagedata,function(json){
                    let datast = json.data
                    _this.tboay = datast.data
                    _this.pagedata.page = datast.current_page
                    _this.pagedata.total = datast.total
                    _this.pagedata.per_page = datast.per_page
                    _this.loadingst = false
                })
            },
            classes_type(){ //线路分类
                let _this = this
                this.ApiPost('lines_type/list',{},function(json){
                    _this.classes_type_list = json.data
                    console.log(json,'分类')
                })
            },
            ApiPost(url,datakey,funct){  //post请求
                let data = this.keynul(datakey)
                this.post(this,url,data,function(json){
                    return funct(json)
                })
            }
        },
        mounted(){
            this.qrcode = new QRCode('qrcode', {
                width: 200,
                height: 200, // 高度code
            })
            this.classes_type()
           // this.ListFun()
        },
        components:{
            'zsq-detaile':zsq_detaile
        }
    }
</script>
