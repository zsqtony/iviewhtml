<template>
    <div class="addcourse">

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Card :bordered="false" dis-hover>
                <p slot="title">基本信息</p>
                <FormItem label="线路名称：" prop="name">
                    <i-input v-model="formValidate.name" style="width:200px" placeholder="请输入课程名称"></i-input>
                </FormItem>
                <FormItem label="商品所属地：" prop="hostaddress">
                    <Button type="primary" @click="getmap">获取详细地址</Button>
                    <Row :gutter="10" style="padding:10px 0 10px 0;">
                        <i-col span="10"><al-selector level="2" :disabled="formValidate.hostaddress.longitude == ''" v-model="formValidate.addressobj"/></i-col>
                        <!--<i-col span="4"><i-input disabled v-model="formValidate.hostaddress.province" placeholder="省份"></i-input></i-col>-->
                        <!--<i-col span="4"><i-input disabled v-model="formValidate.hostaddress.city" placeholder="市区"></i-input></i-col>-->
                        <!--<i-col span="4"><i-input disabled v-model="formValidate.hostaddress.district" placeholder="区/镇"></i-input></i-col>-->
                    </Row>
                    <div><i-input v-model="formValidate.hostaddress.address" clearable placeholder="详细地址可以修改" style="width:446px;"></i-input></div>
                </FormItem>
                <FormItem label="线路分类：" prop="lines_type_id">
                    <Select style="width:200px" v-model="formValidate.lines_type_id"><Option v-for="i in classes_type_list" :key="i.id" :value="i.id">{{i.name}}</Option></Select>
                </FormItem>
                <FormItem label="线路天数：" prop="age_for_to">
                    <Row>
                        <i-col span="3"><i-input v-model="formValidate.age_for_to.days"><span slot="append">天</span></i-input></i-col>
                        <i-col span="1" style="text-align:center;">至</i-col>
                        <i-col span="3"><i-input v-model="formValidate.age_for_to.nights"><span slot="append">夜</span></i-input></i-col>
                    </Row>
                </FormItem>
                <FormItem label="成团人数：" prop="max_members">
                    <i-input v-model="formValidate.max_members" style="width:200px" placeholder="请输入最大人数"><span slot="append">人数</span></i-input>
                </FormItem>
                <FormItem label="体验年龄：" prop="age_obj">
                    <Row>
                        <i-col span="3"><i-input v-model="formValidate.age_obj.age_from"><span slot="append">岁</span></i-input></i-col>
                        <i-col span="1" style="text-align:center;">至</i-col>
                        <i-col span="3"><i-input v-model="formValidate.age_obj.age_to"><span slot="append">岁</span></i-input></i-col>
                    </Row>
                </FormItem>
                <FormItem label="线路时间：" prop="linedate">
                    <DatePicker v-model="formValidate.linedate" :value="formValidate.linedate" @on-change="linedateFun" type="daterange" placement="bottom-end" placeholder="设置时间" style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="封面图片：" prop="cover_img_url">
                    <div v-if="formValidate.cover_img_url != ''"><Tooltip placement="top"><img :src="formValidate.cover_img_url" style="width:110px;height:auto;" /><div slot="content"><Button type="error" size="small" @click="delete_cover_Fun">删除</Button></div></Tooltip></div>
                    <zsq-upload v-else @uploadimg="uploadcover"></zsq-upload>
                </FormItem>
                <FormItem label="介绍图片：" prop="img_urls">
                    <Row :gutter="5">
                        <i-col v-for="(i,index) in formValidate.img_urls" span="3" :key="index"><div class="courselistImg"><Tooltip placement="top"><img :src="i" /><div slot="content"><Button type="error" size="small" @click="delete_course_ImgFun(index)">删除</Button></div></Tooltip></div></i-col>
                        <i-col span="4"><zsq-upload @uploadimg="uploadFun"></zsq-upload></i-col>
                    </Row>
                </FormItem>
                <FormItem label="课程简介：" prop="content">
                    <quill-editor ref="myTextEditor3" v-model="formValidate.content" :content="formValidate.content"></quill-editor>
                </FormItem>
                <FormItem label="研学目的：" prop="content_goal">
                    <quill-editor ref="myTextEditor2" v-model="formValidate.content_goal" :content="formValidate.content_goal"></quill-editor>
                </FormItem>
                <FormItem label="研学特色：" prop="content_special">
                    <quill-editor ref="myTextEditor1" v-model="formValidate.content_special" :content="formValidate.content_special"></quill-editor>
                </FormItem>
            </Card>
            <Card :bordered="false" dis-hover>
                <p slot="title">课程信息</p>
                <div style="padding:0 0 10px 0;"><Button icon="ios-add" type="primary" @click="addcourseFun">添加课程</Button></div>
                <Table stripe :columns="headcourse" :data="bodycourse"></Table>
                <div class="total_price">TOTAL：<span>{{courseinfo.coursenumber}}</span>个课程，<span>¥{{courseinfo.totalprice}}</span>/人</div>
            </Card>
            <Card :bordered="false" dis-hover>
                <p slot="title">商品信息</p>
                <div style="padding:0 0 10px 0;"><Button icon="ios-add" type="primary" @click="addgoods_showFun">添加商品</Button></div>
                <Table stripe :columns="headercommodity" :data="bodycommodity"></Table>
                <div class="total_price">TOTAL：<span>{{goodsinfo.goodsnumber}}</span>个商品，<span>¥{{goodsinfo.totalprice}}</span>/人</div>
            </Card>
            <Card :bordered="false" dis-hover>
                <p slot="title">定价信息</p>
                <FormItem label="成本总价：" prop="price_origin">
                    <i-input style="width:200px;" disabled v-model="formValidate.price_origin = courseinfo.totalprice + goodsinfo.totalprice"></i-input>
                </FormItem>
                <FormItem label="加价：" prop="price_addition">
                    <i-input style="width:200px;" @on-change="parseFloat_toFun" v-model="formValidate.price_addition"></i-input>
                </FormItem>
                <FormItem label="最终价：">
                    <div class="totalprices"><h3>¥{{formValidate.price}}</h3></div>
                </FormItem>
            </Card>
            <FormItem>
                <Button type="primary" @click="submit_ok_data('formValidate')">保存</Button>
            </FormItem>
        </Form>
        <Modal v-model="courseshow" title="选择课程" width="800" :mask-closable="false" :styles="{top:'20px'}">
            <Row :gutter="10" style="padding:0 0 10px 0;">
                <i-col span="5">
                    <i-input placeholder="编号" clearable v-model="coursepagedata.code"></i-input>
                </i-col>
                <i-col span="5">
                    <i-input placeholder="名称" clearable v-model="coursepagedata.name"></i-input>
                </i-col>
                <i-col span="5">
                    <Select placeholder="分类" clearable v-model="coursepagedata.classes_type_id"><Option v-for="i in courseclasses_type_list" :key="i.id" :value="i.id">{{i.name}}</Option></Select>
                </i-col>
                <i-col span="5">
                    <Button type="primary" @click="courseQueryFun">查询</Button>
                </i-col>
            </Row>
            <Table stripe :columns="addcourse_header" height="360" :data="addcourse_body"></Table>
            <div style="text-align:right;padding:10px 0 0 0;"><Page size="small" :total="coursepagedata.total" :current="coursepagedata.page" :page-size="coursepagedata.per_page" @on-change="coursepagesFun" @on-page-size-change="coursesizepageFun" show-elevator show-sizer /></div>
            <div slot="footer">
                <Button @click="OK_courseFun" type="primary">确定</Button>
            </div>
        </Modal>
        <Modal v-model="commodityshow" title="选择商品" width="800" :mask-closable="false" :styles="{top:'20px'}">
            <Row :gutter="10" style="padding:0 0 10px 0;">
                <i-col span="5">
                    <i-input placeholder="编号" v-model="goospagedata.code" clearable></i-input>
                </i-col>
                <i-col span="5">
                    <i-input placeholder="名称" v-model="goospagedata.name" clearable></i-input>
                </i-col>
                <i-col span="5">
                    <Select placeholder="分类" v-model="goospagedata.goods_type_id" clearable><Option v-for="i in goodsclasses_type_list" :key="i.id" :value="i.id">{{i.name}}</Option></Select>
                </i-col>
                <i-col span="5">
                    <Button type="primary" @click="goodsqueryFun">查询</Button>
                </i-col>
            </Row>
            <Table stripe :columns="addcommodity_header" :data="addcommodity_body"></Table>
            <div style="text-align:right;padding:10px 0 0 0;"><Page size="small" :total="goospagedata.total" :current="goospagedata.page" :page-size="goospagedata.per_page" @on-change="goodspagesFun" @on-page-size-change="goodssizepageFun" show-elevator show-sizer /></div>
            <div slot="footer">
                <Button type="primary" @click="OK_goodsFun">确定</Button>
            </div>
        </Modal>
        <Modal v-model="mapshow" title="获取详细地址" width="900" :mask-closable="false" :styles="{top:'20px'}">
            <Spin size="large" fix v-if="spinShow">正在为你准备好地图...</Spin>
            <div class="map_page">
                <div class="tipinputs"><i-input v-model="search_Key" element-id="tipinput" placeholder="地址搜索，按enter"></i-input></div>
                <div id="container"></div>
            </div>
            <div slot="footer"><Button @click="cancelFun">取消</Button><Button type="primary" @click="mapok">确定</Button></div>
        </Modal>
        <Modal v-model="showdetaile" title="详情" :styles="{top:'20px'}" width="600" :mask-closable="false">
            <zsq-detaile :detailecourse="detailecourse" :classes_type_list="allclasses_type_list" :type="typedet_num"></zsq-detaile>
            <div slot="footer"><Button @click="showdetaile = false">关闭</Button></div>
        </Modal>
    </div>
</template>
<style lang="less">
    .coverImg{
        width:80px;height:80px;line-height:80px;text-align:center;border:1px dashed #ccc;font-size:1rem;color:#ccc;cursor:pointer;
        &:hover{border:1px dashed #2d8cf0;color:#2d8cf0;}
    }
    .total_price{padding:10px 0 0 0;span{color:#f00;}}
    .totalprices{color:#f00;}
</style>
<script>
    import zsq_detaile from '../public/details.vue'
    import zsq_upload from '../public/upload.vue'
    export default{
        data(){
            const hostaddress = (rule, value, callback) => {
                if (this.formValidate.addressobj.length == 0 || value.longitude == '') {
                    callback(new Error('请选择地址'));
                } else {
                    callback();
                }
            };
            const age_for_tofun = (rule, value, callback) => {
                if (value.days == '' || value.nights == '') {
                    callback(new Error('请设置天数'));
                } else if((parseInt(value.nights) > parseInt(value.days))){
                    callback(new Error('请设置正确的天数'));
                } else {
                    callback();
                }
            };
            const age_fun = (rule, value, callback) => {
                if (value.age_from == '' || value.age_to == '') {
                    callback(new Error('请设置体验年龄'));
                } else if((parseInt(value.age_from) > parseInt(value.age_to))){
                    callback(new Error('请设置正确的体验年龄'));
                } else {
                    callback();
                }
            };
            const img_list_up = (rule, value, callback) => {
                if (value.length == 0) {
                    callback(new Error('请选择课程图片'));
                } else {
                    callback();
                }
            }
            const nullokfun = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请输入人数'));
                } else {
                    callback();
                }
            }
            const linetime = (rule, value, callback) => {
                console.log(value[0],value,';;;')
                if (value.length == 0 || (value[0] == '' || value[1] == '')) {
                    callback(new Error('请选择时间'));
                } else {
                    callback();
                }
            }
            return{
                mapshow:false,
                spinShow:true,
                courseshow:false,
                commodityshow:false,
                showdetaile:false, //查看详情
                search_Key:'',
                detailecourse:{}, //详情
                allclasses_type_list:[], //详情分类
                typedet_num:1,//详情类型
                lastafternoon:[
                    {title: '上午',code:'1'},
                    {title: '下午',code:'2'},
                ],
                daysarr:[
                    {title: '第一天',code:'1'},
                    {title: '第二天',code:'2'},
                    {title: '第三天',code:'3'},
                    {title: '第四天',code:'4'},
                    {title: '第五天',code:'5'},
                    {title: '第六天',code:'6'},
                    {title: '第七天',code:'7'},
                    {title: '第八天',code:'8'},
                ],
                addcourse_header:[ //选择课程
//                    {title: 'id',width:100,key: 'id'},
                    {
                        title: '封面',
                        width:80,
                        render:(h,params)=>{
                            return h('Avatar',{
                                props:{
                                    src:params.row.cover_img_url
                                }
                            })
                        }
                    },
                    {title: '分类',width:100,tooltip:true,key: 'classes_type_name'},
                    {
                        title: '名称',
                        width:190,
                        key: 'name',
                        tooltip:true,
                        render:(h,params)=>{
                            let row = params.row
                            return h('Button',{
                                props:{
                                    type:'text',
                                    size: 'small'
                                },
                                on:{
                                    click:()=>{
                                        this.querydetaileFun('classes/show',row.id,1)
                                    }
                                }
                            },row.name)
                        }
                    },
                    {title: '时长(分钟)',width:100,key: 'duration'},
                    {
                        title: '单价',
                        width:90,
                        render:(h,params)=>{
                            let row = params.row
                            return h('div',{
                                style:{
                                    color:'#f00'
                                }
                            },'¥'+row.price)
                        }
                    },
                    {
                        title: '上下架',
                        minWidth:80,
                        render:(h,params)=>{
                            let row = params.row
                            return h('div',{
                                style:{
                                    color:row.enable==0?'#999':'#2d8cf0'
                                }
                            },row.enable==0?'已下架':'已上架')
                        }
                    },
                    {
                        title: '操作',
                        width:80,
                        fixed: 'right',
                        render:(h,params)=>{
                            let row = params.row
                            let name = '添加'
                            if(this.courseid.length > 0){
                                if(this.courseid.indexOf(params.row.id) != -1){
                                    name = '取消'
                                }
                            }
                            return h('Button',{
                                props:{
                                    type: name == '取消'?'error':'primary',
                                    size: 'small',
                                    disabled:row.enable == 0?true:false
                                },
                                on:{
                                    click:()=>{
                                        row.days = {code:'1',title: '第一天'}
                                        row.last = {code:'1',title: '上午'}
                                        this.add_conatFun(row.id,row)
                                    }
                                }
                            },name)
                        }
                    },
                ],
                addcourse_body:[],
                addcommodity_header:[
//                    {title: 'id',width:100,key: 'id'},
                    {
                        title: '封面',
                        width:80,
                        render:(h,params)=>{
                            return h('Avatar',{
                                props:{
                                    src:params.row.cover_img_url
                                }
                            })
                        }
                    },
                    {
                        title: '分类',
                        width:100,
                        key: 'goods_type_name',
                    },
                    {
                        title: '名称',
                        width:180,
                        key: 'name',
                        tooltip:true,
                        render:(h,params)=>{
                            let row = params.row
                            return h('Button',{
                                props:{
                                    type:'text',
                                    size: 'small'
                                },
                                on:{
                                    click:()=>{
                                        this.querydetaileFun('goods/show',row.id,2)
                                    }
                                }
                            },row.name)
                        }
                    },
                    {
                        title: '单价',
                        minWidth:80,
                        render:(h,params)=>{
                            return h('div',{
                                style:{
                                    color: '#f00'
                                }
                            },'¥'+params.row.price)
                        }
                    },
                    {
                        title: '上下架',
                        width:80,
                        render:(h,params)=>{
                            let row = params.row
                            return h('div',{
                                style:{
                                    color:row.enable==0?'#999':'#2d8cf0'
                                }
                            },row.enable==0?'已下架':'已上架')
                        }
                    },
                    {
                        title: '操作',
                        minWidth:100,
                        render:(h,params)=>{
                            let row = params.row
                            let name = '添加'
                            if(this.goodsid.length > 0){
                                if(this.goodsid.indexOf(params.row.id) != -1){
                                    name = '取消'
                                }
                            }
                            return h('Button',{
                                props:{
                                    type: name == '取消'?'error':'primary',
                                    size: 'small',
                                    disabled:row.enable == 0?true:false
                                },
                                on:{
                                    click:()=>{
                                        this.add_goodsFun(row.id,row)
                                    }
                                }
                            },name)
                        }
                    },
                ], //选择商品
                addcommodity_body:[],
                headcourse:[
                    {title: 'id',width:70,key: 'id'},
                    {
                        title: '封面',
                        width:80,
                        render:(h,params)=>{
                            return h('Avatar',{
                                props:{
                                    src:params.row.cover_img_url
                                }
                            })
                        }
                    },
                    {
                        title: '分类',
                        width:100,
                        key: 'classes_type_name',
                        render:(h,params)=>{
                            let row = params.row
                            console.log(row,'34')
                            return h('div',{},row.classes_type_name == undefined?row.classes_type.name:row.classes_type_name)
                        }
                    },
                    {
                        title: '名称',
                        width:170,
                        key: 'name',
                        tooltip:true,
                        render:(h,params)=>{
                            let row = params.row
                            return h('Button',{
                                props:{
                                    type:'text',
                                    size: 'small'
                                },
                                on:{
                                    click:()=>{
                                        this.querydetaileFun('classes/show',row.id,1)
                                    }
                                }
                            },row.name)
                        }
                    },
                    {title: '时长(分钟)',width:100,key: 'duration'},
                    {
                        title: '单价',
                        width:100,
                        render:(h,params)=>{
                            return h('div',{
                                style:{
                                    color: '#f00'
                                }
                            },'¥'+params.row.price)
                        }
                    },{
                        title: '第几天',
                        width:120,
                        render:(h,params)=>{
                            let _this = this
                            let row = params.row
                            return h('Select',{
                                props:{
                                    value: row.days.code
                                },
                                on:{
                                    'on-change':(val)=>{
                                        this.bodycourse[params.index].days.code = val
                                        this.daysarr.forEach((res)=>{
                                            if(res.code == val){
                                                _this.bodycourse[params.index].days.title = res.title
                                            }
                                        })
                                        console.log(this.bodycourse)
                                    }
                                }
                            },this.daysarr.map((res)=>{
                                return h('Option',{
                                    props:{value:res.code}
                                },res.title)
                            }))
                        }
                    },{
                        title: '上下午',
                        width:100,
                        render:(h,params)=>{
                            let _this = this
                            let row = params.row
                            return h('Select',{
                                props:{
                                    value: row.last.code,
                                    placeholder:'选择'
                                },
                                on:{
                                    'on-change':(val)=>{
                                        this.bodycourse[params.index].last.code = val
                                        this.lastafternoon.forEach((res)=>{
                                            if(res.code == val){
                                                _this.bodycourse[params.index].last.title = res.title
                                            }
                                        })
                                        console.log(this.bodycourse)
                                    }
                                }
                            },this.lastafternoon.map((res)=>{
                                return h('Option',{
                                    props:{value:res.code}
                                },res.title)
                            }))
                        }
                    },{
                        title: '操作',
                        minWidth:100,
                        render:(h,params)=>{
                            let row = params.row
                            return h('Button',{
                                props:{
                                    type: 'error',
                                    size: 'small'
                                },
                                on:{
                                    click:()=>{
                                        this.removecourseFun(row.id,params.index)
                                        console.log(row.id,'3232')
                                    }
                                }
                            },'移除')
                        }
                    }
                ],
                bodycourse:[], //添加课程
                headercommodity:[
                    {title: 'id',width:70,key: 'id'},
                    {
                        title: '封面',
                        width:80,
                        render:(h,params)=>{
                            return h('Avatar',{
                                props:{
                                    src:params.row.cover_img_url
                                }
                            })
                        }
                    },
                    {
                        title: '分类',
                        width:100,
                        key: 'goods_type_name',
                        render:(h,params)=>{
                            let row = params.row
                            console.log(row,'34')
                            return h('div',{},row.goods_type_name == undefined?row.goods_type.name:row.goods_type_name)
                        }
                    },
                    {
                        title: '名称',
                        width:170,
                        key: 'name',
                        tooltip:true,
                        render:(h,params)=>{
                            let row = params.row
                            return h('Button',{
                                props:{
                                    type:'text',
                                    size: 'small'
                                },
                                on:{
                                    click:()=>{ //商品查看详情
                                        this.querydetaileFun('goods/show',row.id,2)
                                    }
                                }
                            },row.name)
                        }
                    },
                    {title: '时间',width:180,key: 'created_at'},
                    {
                        title: '单价',
                        width:200,
                        render:(h,params)=>{
                            return h('div',{
                                style:{
                                    color: '#f00'
                                }
                            },'¥'+params.row.price)
                        }
                    },{
                        title: '操作',
                        minWidth:100,
                        render:(h,params)=>{
                            let row = params.row
                            return h('Button',{
                                props:{
                                    type: 'error',
                                    size: 'small'
                                },
                                on:{
                                    click:()=>{
                                        this.removegoodsFun(row.id,params.index)
                                        console.log(row.id,'3232')
                                    }
                                }
                            },'移除')
                        }
                    }
                ],
                bodycommodity:[], //商品信息
                formValidate:{
                    name: '',
                    lines_type_id:null,//分类
                    longitude: '', //经度
                    latitude: '', //纬度
                    addressobj:[], //省市区
                    province: '',//省份
                    city: '',//市区
                    area: '', //区县
                    address: '', //详情地址
                    days: '', //几天
                    nights: '', //几夜
                    max_members: '', //最大多少人
                    cover_img_url: '', //封面图片
                    img_urls: [], //线路图片
                    content: '', //课程简介
                    content_goal:'', //研学目的
                    content_special:'',//研学特色
                    price_origin: '', //原价
                    price_addition: '', //加价
                    price: '0',//价格
                    date_start:'', //开始时间
                    date_end:'',//结束时间
                    linedate:[], //线路时间
                    lines_has_classes: '',//线路包含的课程
                    lines_has_goods: '',//线路包含的商品
                    hostaddress:{
                        address:'',
                        province:'',
                        city:'',
                        district:'',
                        longitude: ''
                    },
                    age_for_to:{ //几天几夜
                        days:'',
                        nights:''
                    },
                    age_obj:{ //体验年龄
                        age_from:'',
                        age_to:''
                    },
                    lines_has_classes:'', //选择的课程
                    lines_has_goods: '', //选的商品
                },
                ruleValidate:{
                    name: [
                        { required: true, message: '请输入线路名称', trigger: 'blur' }
                    ],
                    lines_type_id:[
                        { required: true, type:'number', message: '请选择分类', trigger: 'change' }
                    ],
                    hostaddress:[
                        { required: true, message: '请选择地址',validator:hostaddress, trigger: 'change' }
                    ],
                    age_for_to:[
                        { required: true, message: '请设置天数',validator:age_for_tofun, trigger: 'change' }
                    ],
                    age_obj:[
                        { required: true,validator:age_fun, trigger: 'change' }
                    ],
                    linedate:[
                        { required: true,validator:linetime, trigger: 'change' }
                    ],
                    max_members:[
                        { required: true, validator:nullokfun, message: '请输入人数', trigger: 'blur' }
                    ],
                    cover_img_url:[
                        { required: true, message: '请选择封面', trigger: 'blur' }
                    ],
                    img_urls:[
                        { required: true,validator:img_list_up, trigger: 'blur' }
                    ],
                    content:[
                        { required: true, message: '请编辑课程简介', trigger: 'change' }
                    ],
                    content_goal:[
                        { required: true, message: '请编辑研学目的', trigger: 'change' }
                    ],
                    content_special:[
                        { required: true, message: '请编辑研学特色', trigger: 'change' }
                    ],
                    price_origin:[
                        { required: true, validator:nullokfun, message: '请输入总价', trigger: 'blur' }
                    ],
                    price_addition:[
                        { required: true, validator:nullokfun, message: '请输入加价格', trigger: 'blur' }
                    ]
                },
                classes_type_list:[],
                coursepagedata:{
                    code: '',
                    name: '',
                    classes_type_id: '',
                    page:1,
                    total:0,
                    per_page:10
                },
                goospagedata:{ //商品参数
                    code:'',
                    name: '',
                    goods_type_id: '',
                    page:1,
                    total:0,
                    per_page:10
                },
                courseclasses_type_list: [], //课程分类
                courseid:[], //课程选择id
                course_arr:[], //已经选择的课程
                courseinfo:{ //选择的课程个数和多少钱/人
                    coursenumber:0,
                    totalprice:0,
                },
                goodsclasses_type_list:[], //商品分类
                goodsid:[], //已选择商品id
                goods_arr:[], //已经选择商品
                goodsinfo:{ //选择的商品个数和多少钱/人
                    goodsnumber:0,
                    totalprice:0
                }
            }
        },
        methods:{
            querydetaileFun(url,id,num){ //查看详情  classes/show
                let _this = this
                this.showdetaile = true
                this.ApiPost(url,{id:id},function(json){
                    _this.detailecourse = json
                    let imgarr = JSON.parse(json.img_url)
                    if(typeof(imgarr) == 'object'){
                        _this.detailecourse.img_url = imgarr
                    }
                    _this.typedet_num = num
                    if(num == 1){
                        _this.allclasses_type_list = _this.courseclasses_type_list
                    }
                    if(num == 2){
                        _this.allclasses_type_list = _this.goodsclasses_type_list
                    }
                })
            },
            linedateFun(time){ //线路时间
                this.formValidate.date_start = time[0]
                this.formValidate.date_end = time[1]
                console.log(time)
            },
            removegoodsFun(id,idx){ //移除商品
                let _this = this
                this.goodsid.forEach((res,index)=>{
                    if(res == id){
                        _this.goodsid.splice(index,1)
                        _this.goods_arr.splice(index,1)
                        _this.bodycommodity.splice(idx,1)
                        _this.OK_goodsFun()
                    }
                })
            },
            removecourseFun(id,idx){ //移除课程
                let _this = this
                this.courseid.forEach((res,index)=>{
                    if(res == id){
                        _this.courseid.splice(index,1)
                        _this.course_arr.splice(index,1)
                        _this.bodycourse.splice(idx,1)
                        _this.OK_courseFun()
                    }
                })
            },
            parseFloat_toFun(){ //计算最终价格
                this.formValidate.price = this.courseinfo.totalprice + this.goodsinfo.totalprice + (this.formValidate.price_addition != ''?parseFloat(this.formValidate.price_addition):0)
            },
            delete_cover_Fun(){
                this.formValidate.cover_img_url = ''
            },
            delete_course_ImgFun(idx){ //删除课程图片
                this.formValidate.img_urls.splice(idx,1)
            },
            uploadcover(obj){ //封面
                this.formValidate.cover_img_url = obj.url
            },
            uploadFun(obj){
                this.formValidate.img_urls.push(obj.url)
                console.log(obj,this.formValidate.img_urls,'照片')
            },
            submit_ok_data(name){ //提交
                let _this = this
                console.log(this.formValidate)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log()
                        if(_this.bodycourse.length == 0){
                            _this.error(_this,'提示','请至少选择一门课程')
                            return false
                        }
                        console.log(_this.bodycourse)
                        if(_this.bodycommodity.length == 0){
                            _this.error(_this,'提示','请至少选择一个商品')
                            return false
                        }
                        let longlat = _this.formValidate.hostaddress.longitude.split(',')
                        let lines_has_classes = ''
                        let lines_has_goods = ''
                        _this.formValidate.longitude = longlat[0]
                        _this.formValidate.latitude = longlat[1]
                        _this.formValidate.age_from = _this.formValidate.age_obj.age_from
                        _this.formValidate.age_to = _this.formValidate.age_obj.age_to
                        _this.formValidate.img_url = JSON.stringify(_this.formValidate.img_urls)
                        _this.formValidate.province = _this.formValidate.addressobj[0].name
                        _this.formValidate.city = _this.formValidate.addressobj[1].name
                        _this.formValidate.area = _this.formValidate.addressobj[2].name
                        _this.formValidate.address = _this.formValidate.hostaddress.address
                        _this.formValidate.days = _this.formValidate.age_for_to.days
                        _this.formValidate.nights = _this.formValidate.age_for_to.nights
                        _this.bodycourse.forEach((res)=>{
                            lines_has_classes += res.id + '|' + res.days.code+','+res.days.title + ',' + res.last.code+','+res.last.title + '--'
                        })
                        _this.bodycommodity.forEach((res)=>{
                            lines_has_goods += res.id + ','
                        })
                        _this.formValidate.lines_has_classes = lines_has_classes.substring(0,(lines_has_classes.length-2))
                        _this.formValidate.lines_has_goods = lines_has_goods.substring(0,(lines_has_goods.length-1))
                        console.log(_this.formValidate)
                        //return false
                        _this.ApiPost('lines/update',_this.formValidate,function(json){
                            if(json.code == 1){
                                _this.success(_this,'提示','添加成功，系统正在更新')
                                setTimeout(()=>{
                                    _this.$router.go(-1)
                                },600)
                            }
                            console.log(json,'提交')
                        })
                        console.log(_this.formValidate)
                    } else {
                        this.$Message.error('请输入完整信息');
                    }
                })
            },
            add_conatFun(id,row){ //课程选择变化
                let _this = this
                if(this.courseid.indexOf(id) != -1){ //是否有？取消：添加
                    this.courseid.forEach((res,index)=>{
                        if(res == id){
                            _this.courseid.splice(index,1)
                            _this.course_arr.splice(index,1)
                        }
                    })
                } else {
                    this.courseid.push(id)
                    this.course_arr.push(row)
                }
                console.log(this.courseid,id,'课程')
            },
            add_goodsFun(id,row){ //商品选择
                let _this = this
                if(this.goodsid.indexOf(id) != -1){ //是否有？取消：添加
                    this.goodsid.forEach((res,index)=>{
                        if(res == id){
                            _this.goodsid.splice(index,1)
                            _this.goods_arr.splice(index,1)
                        }
                    })
                } else {
                    this.goodsid.push(id)
                    this.goods_arr.push(row)
                }
            },
            OK_courseFun(){ //确定课程选择
                let _this = this
                let number = 0
                let price = 0
                _this.bodycourse = []
                this.course_arr.forEach((res)=>{
                    _this.bodycourse.push(res)
                    number++
                    price += parseFloat(res.price)
                })
                this.courseinfo.coursenumber = number
                this.courseinfo.totalprice = price
                this.courseshow = false
                this.parseFloat_toFun()
            },
            OK_goodsFun(){ //确定选择商品
                let _this = this
                let number = 0
                let price = 0
                _this.bodycommodity = []
                this.goods_arr.forEach((res)=>{
                    _this.bodycommodity.push(res)
                    number++
                    price += parseFloat(res.price)
                })
                this.goodsinfo.goodsnumber = number
                this.goodsinfo.totalprice = price
                this.commodityshow = false
                this.parseFloat_toFun()
            },
            coursepagesFun(num){ //课程分页
                this.coursepagedata.page = num
                this.ListFun()
            },
            coursesizepageFun(size){ //课程条数
                this.coursepagedata.page = 1
                this.coursepagedata.per_page = size
                this.ListFun()
            },
            courseQueryFun(){ //查询
                this.coursepagedata.page = 1
                this.ListFun()
            },
            addcourseFun(){
                this.courseshow = true
                this.ListFun()
            },
            ListFun(){ //课程列表
                let _this = this
                this.ApiPost('classes/list',this.coursepagedata,function(json){
                    _this.addcourse_body = json.data
                    _this.coursepagedata.page = json.current_page
                    _this.coursepagedata.total = json.total
                    _this.coursepagedata.per_page = json.per_page
                })
            },
            classes_type(){ //课程分类
                let _this = this
                this.ApiPost('classes_type/list',{},function(json){
                    _this.courseclasses_type_list = json
                    console.log(json,'k分类')
                    _this.goodsclasses_type()

                })
            },
            addgoods_showFun(){ //选择商品
                this.commodityshow = true
                this.goodsqueryFun()
            },
            goodsclasses_type(){ //商品分类
                let _this = this
                this.ApiPost('goods_type/list',{},function(json){
                    _this.goodsclasses_type_list = json
                    console.log(json,'分类')
                })
            },
            goodspagesFun(num){ //商品分页
                this.goospagedata.page = num
                this.GoodsListFun()
            },
            goodssizepageFun(size){ //商品条数
                this.goospagedata.page = 1
                this.goospagedata.per_page = size
                this.GoodsListFun()
            },
            goodsqueryFun(){ //商品查询
                this.goospagedata.page = 1
                this.GoodsListFun()
            },
            GoodsListFun(){ //商品列表列表
                let _this = this
                this.ApiPost('goods/list',this.goospagedata,function(json){
                    _this.addcommodity_body = json.data
                    _this.goospagedata.page = json.current_page
                    _this.goospagedata.total = json.total
                    _this.goospagedata.per_page = json.per_page
                })
            },
            cancelFun(){
                let _this = this
                _this.search_Key = ''
                for(let i in _this.formValidate.hostaddress){
                    _this.formValidate.hostaddress[i] = ''
                }
                _this.mapshow = false
            },
            mapok(){
                let _this = this
                if(_this.formValidate.hostaddress.longitude == '' || _this.formValidate.hostaddress.address == '' || (_this.formValidate.hostaddress.province == '' && _this.formValidate.hostaddress.city == '') || _this.formValidate.hostaddress.district == ''){
                    this.$Notice.error({
                        title: '地图提示',
                        desc: '请点击地图或者搜素地址！'
                    });
                    return false
                } else {
                    _this.mapshow = false
                }
            },
            getmap(){
                let _this = this
                let geocoder,marker
                this.mapshow = true
                let map = new AMap.Map('container', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom:14, //初始化地图层级
                })
                map.on('complete', function() { //地图加载完毕
                    _this.spinShow = false
                })
                if(!geocoder){
                    geocoder = new AMap.Geocoder({
                        city: "010", //城市设为北京，默认：“全国”
                        radius: 1000 //范围，默认：500
                    });
                }
                if(!marker){
                    marker = new AMap.Marker();
                    map.add(marker);
                }
                map.on('click', function(e) {
                    marker.setPosition([e.lnglat.getLng(),e.lnglat.getLat()])
                    _this.geocoders(geocoder,[e.lnglat.getLng(),e.lnglat.getLat()],e.lnglat.getLng()+','+e.lnglat.getLat())
                });
                let auto = new AMap.Autocomplete({
                    input: "tipinput"
                });
                AMap.event.addListener(auto, "select", select);//注册监听
                function select(e) {
                    if (e.poi && e.poi.location) {
                        let lnglatss = e.poi.location
                        marker.setPosition([lnglatss.getLng(),lnglatss.getLat()])
                        _this.geocoders(geocoder,[lnglatss.getLng(),lnglatss.getLat()],lnglatss.getLng()+','+lnglatss.getLat())
                        map.setZoom(15);
                        map.setCenter(e.poi.location);
                    }
                }
            },
            geocoders(obj,lnglat,langlatss){
                let _this = this
                obj.getAddress(lnglat, function(status, result) {
                    if (status === 'complete'&&result.regeocode) {
                        let address = result.regeocode.formattedAddress;
                        let datas = result.regeocode.addressComponent
                        _this.search_Key = address //详细地址
                        _this.formValidate.hostaddress.address = address  //详细地址
                        _this.formValidate.addressobj = [datas.province,datas.city,datas.district]
                        _this.formValidate.hostaddress.province = datas.province
                        _this.formValidate.hostaddress.city = datas.city
                        _this.formValidate.hostaddress.district = datas.district
                        _this.formValidate.hostaddress.longitude = langlatss //经纬度
                    }else{alert(JSON.stringify(result))}
                });
                console.log(obj,'3232')
            },
            lineclasses_type(){ //线路分类
                let _this = this
                this.ApiPost('lines_type/list',{},function(json){
                    _this.classes_type_list = json
                    console.log(json,'分类')
                })
            },
            ApiPost(url,datakey,funct){  //post请求
                let data = this.keynul(datakey)
                this.post(this,url,data,function(json){
                    if(json.data != undefined){
                        return funct(json.data)
                    } else {
                        return funct(json)
                    }
                })
            },
            detaileline(id){  ///lines/show
                let _this = this
                this.ApiPost('lines/show',{id:id},function(json){
                    json.hostaddress = {}
                    json.age_for_to = {}
                    json.age_obj = {}
                    json.linedate = []
                    json.linedate[0] = json.date_start
                    json.linedate[1] = json.date_end
                    _this.formValidate = json
                    _this.formValidate.addressobj = [json.province,json.city,json.area]
                    _this.formValidate.img_urls = JSON.parse(json.img_url)
                    _this.imgarr = JSON.parse(json.img_url)
                    _this.formValidate.hostaddress.address = json.address  //详细地址
                    json.classes.forEach((res)=>{
                        _this.courseinfo.coursenumber++
                        _this.courseinfo.totalprice += parseFloat(res.price)
                        _this.courseid.push(res.id)
                        res.days = {code:res.pivot.day_id==null?'':(res.pivot.day_id).toString(),title: res.pivot.day_name==null?'':res.pivot.day_name}
                        res.last = {code:res.pivot.apm_id==null?'':(res.pivot.apm_id).toString(),title: res.pivot.apm_name==null?'':res.pivot.apm_name}
                        _this.bodycourse.push(res)
                        _this.course_arr.push(res)
                    })
                    _this.bodycommodity = json.goods
                    _this.goods_arr = json.goods
                    json.goods.forEach((res)=>{
                        _this.goodsinfo.goodsnumber++
                        _this.goodsinfo.totalprice += parseFloat(res.price)
                        _this.goodsid.push(res.id)
                    })
                    _this.formValidate.age_obj.age_from = json.age_from
                    _this.formValidate.age_obj.age_to = json.age_to
                    _this.formValidate.price = parseFloat(json.price)
                    _this.formValidate.age_for_to.days = json.days
                    _this.formValidate.age_for_to.nights = json.nights
                    _this.formValidate.hostaddress.longitude = json.longitude + ',' + json.latitude //经纬度
                    _this.formValidate.price = _this.courseinfo.totalprice + _this.goodsinfo.totalprice+ parseFloat(_this.formValidate.price_addition)
                    console.log(json,_this.formValidate,'详情')
                })
            }
        },
        mounted(){
            this.classes_type()
            this.lineclasses_type()
            this.detaileline(sessionStorage.astuid)
        },
        components:{
            'zsq-upload':zsq_upload,
            'zsq-detaile':zsq_detaile
        }
    }
</script>
