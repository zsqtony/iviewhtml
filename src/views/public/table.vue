<template>
    <div class="tables">
        <Spin v-if="loadingst && !shows" fix><div class="loadings">加载中...</div></Spin>
        <div v-if="!shows && !loadingst && bodys.length == 0" class="protext">暂无数据</div>
        <Table v-if="shows" stripe :columns="headers" :loading="loadingst" :data="bodys"></Table>
        <Row v-else :gutter="10">
            <i-col span="6" class="list_proget" v-for="(time,index) in bodys" :key="index">
                <Card dis-hover>
                    <div class="cover_Img"><img :src="time.cover_img_url"></div>
                    <div class="proget_title"><Tooltip max-width="200" :content="time.name">{{time.name}}</Tooltip></div>
                    <div class="proget_time">
                        <Tooltip>
                            <!--{{time.code}}<br />-->
                            {{time.created_at}}
                            <div slot="content">
                                {{time.code}}<br />
                                {{time.created_at}}
                            </div>
                        </Tooltip>
                    </div>
                    <div class="price_proget">价格：{{time.price}}元/人 <span class="right_s"><template v-if="time.enable==0"><Button size="small" @click="shelvesFun(1,time.id)">已下架</Button></template><template v-else><Button type="primary" size="small" @click="shelvesFun(0,time.id)">已上架</Button></template></span></div>
                    <div class="number_data">浏览数：{{time.count_visit}}<span class="right_s">采购数：{{time.count_sale}}</span></div>
                    <div class="footer_btn">
                        <Button type="primary" size="small" @click="qrcodeFun(time)">二维码</Button>
                        <Button type="primary" size="small" @click="editorFun(time.id)">编辑</Button>
                        <Button type="primary" size="small" @click=queryFun(time.id)>查看</Button>
                        <Button type="error" size="small" @click="deletesfun(time.id)">删除</Button>
                    </div>
                </Card>
            </i-col>
        </Row>
        <div style="text-align:right;padding:10px 0 0 0;"><Page :total="pageobj.total" :current="pageobj.page" :page-size-opts="[12,20,32,40]" :page-size="pageobj.per_page" @on-change="topages" @on-page-size-change="pagesize" show-elevator show-sizer /></div>
    </div>
</template>
<style lang="less">
    .loadings{min-height:300px;line-height:300px;text-align:center;}
    .tables{padding-top:10px;}
    .protext{height:300px;line-height:300px;text-align:center;background-color:#f5f5f5;}
    .list_proget{
        margin-bottom:15px;
        .cover_Img{width:100%;height:150px;text-align:center;overflow:hidden;background-color:#f5f5f5;img{height:100%;width:auto;}}
        .proget_title{font-size:13px;font-weight:bold;overflow:hidden;line-height:28px;height:28px;}
        .proget_time{font-size:12px;color:#666;overflow:hidden;}
        .price_proget{color:#f00;font-size:12px;padding:10px 0 10px 0;}
        .number_data{color:#999;font-size:12px;padding:0 0 10px 0;}
        .footer_btn{button{margin-right:5px;}}
    }
</style>
<script>

    export default{
        props:['headers','bodys','pageobj','loadingst','shows'],
        data(){
            return{

            }
        },
        methods:{
            qrcodeFun(row){
                this.$emit('qrcodesetfun',{code:row.code,name:row.name})
            },
            shelvesFun(num,id){ //上下架
                let _this = this
                if(num == 0){
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>你确定要下架？</p><p>【数据】微信上将不可见</p>',
                        onOk: () => {
                            _this.$emit('shelvesfuns',{val:(num).toString(),id:id})
                            console.log({val:num,id:id})
                        },
                        onCancel: () => {
                            _this.$Message.info('已取消');
                        }
                    });
                } else {
                    this.$emit('shelvesfuns',{val:num,id:id})
                }
            },
            topages(num){
                this.$emit('topage',num)
                console.log(num)
            },
            pagesize(size){
                this.$emit('pagesize',size)
                console.log(size)
            },
            editorFun(id){ //编辑
                this.$emit('editorfun',id)
            },
            deletesfun(id){ //删除
                this.$emit('deletesfun',id)
            },
            queryFun(id){ //查看
                this.$emit('querydetailefun',id)
            },
        },
        components:{

        }
    }
</script>
