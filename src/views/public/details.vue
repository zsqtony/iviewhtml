<template>
    <Row class="detailestyle">
        <i-col class="list_det" span="24" v-if="type == 1"><div class="lefttitle left_s"><span>课程编号：</span></div><div class="left_s imgobj">{{detailecourse.classes_code}}</div></i-col>
        <i-col class="list_det" span="24" v-if="type == 1"><div class="lefttitle left_s"><span>版本：</span></div><div class="left_s imgobj">{{detailecourse.version}}</div></i-col>
        <i-col class="list_det" span="24"><div class="lefttitle left_s"><span>名称：</span></div><div class="left_s imgobj">{{detailecourse.name}}</div></i-col>
        <i-col class="list_det" span="24"><div class="lefttitle left_s"><span>地址：</span></div><div class="left_s imgobj">{{detailecourse.province}} {{detailecourse.city}} {{detailecourse.area}} {{detailecourse.address}}</div></i-col>
        <i-col class="list_det" span="24"><div class="lefttitle left_s"><span>分类：</span></div><div class="left_s imgobj"><template v-if="type == 1">{{detailetype(detailecourse.classes_type_id)}}</template><template v-if="type == 2">{{detailetype(detailecourse.goods_type_id)}}</template><template v-if="type == 3">{{detailetype(detailecourse.lines_type_id)}}</template></div></i-col>
        <i-col  class="list_det"span="24"><div class="lefttitle left_s"><span>时长：</span></div><div class="left_s imgobj">{{detailecourse.duration}}分钟</div></i-col>
        <i-col class="list_det" span="24"><div class="lefttitle left_s"><span>价格：</span></div><div class="left_s imgobj detprice">¥{{detailecourse.price}}</div></i-col>
        <i-col class="list_det" span="24" v-if="type == 1"><div class="lefttitle left_s"><span>课程目的：</span></div><div class="left_s imgobj">{{detailecourse.goal}}</div></i-col>
        <i-col class="list_det" span="24"><div class="lefttitle left_s "><span>年龄：</span></div><div class="left_s imgobj">{{detailecourse.age_from}}岁 到 {{detailecourse.age_to}}岁</div></i-col>
        <i-col class="list_det" span="24">
            <div class="lefttitle left_s"><span>图片介绍：</span></div>
            <div class="left_s imgobj">
                <Row :gutter="5" v-if="typeof(detailecourse.img_url) == 'object'" class="Introductionimg">
                    <i-col v-for="(img,index) in detailecourse.img_url" :key="index" span="6"><img :src="img" /></i-col>
                </Row>
                <div style="width:100px;padding:8px 0 0 0;" v-else><img :src="detailecourse.img_url" /></div>
            </div>
        </i-col>
        <i-col class="list_det" span="24">
            <div class="lefttitle left_s"><span><template v-if="type == 1">课程详情：</template><template v-if="type == 2">商品详情：</template><template v-if="type == 3">课程简介：</template></span></div>
            <div class="left_s detaile_cont" v-html="detailecourse.content"></div>
        </i-col>
    </Row>
</template>
<style lang="less">
    .detailestyle{
        span{font-weight:bold;}
        img{width:100%;height:auto;border:1px solid #f5f5f5;font-size:0;}
        .list_det{
            line-height:35px;border-bottom:1px solid #e8eaec;border-left:1px solid #e8eaec;border-right:1px solid #e8eaec;
            &:first-child{border-top:1px solid #e8eaec;}
            .imgobj{width:78%;border-left:1px solid #e8eaec;padding:0 1% 0 1%;}
            .Introductionimg{padding:3px 0 0 0;}
        }
        .lefttitle{width:100px;text-align:right;}
        .detailetitle{border-right:1px solid #e8eaec;margin-right:8px;height:100%;}
        .detaile_cont{width:80%;line-height:20px;padding:8px;border-left:1px solid #e8eaec;}
        .detprice{color:#f00;}
    }
</style>
<script>

    export default{
        props:['detailecourse','classes_type_list','type'],
        data(){
            return{

            }
        },
        methods:{
            detailetype(id){ //分类
                let name = '--'
                this.classes_type_list.forEach((res)=>{
                    if(res.id == id){
                        name = res.name
                    }
                })
                return name
            },
        },
        components:{

        }
    }
</script>
