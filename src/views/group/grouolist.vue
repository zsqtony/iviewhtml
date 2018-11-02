<template>
    <div>
        <Row :gutter="10">
            <i-col span="4"><i-input clearable placeholder="线路"></i-input></i-col>
            <i-col span="6"><DatePicker type="daterange" placeholder="出团时间" style="width:100%;"></DatePicker></i-col>
            <i-col span="4"><Select clearable placeholder="出团状态"><Option value="1">1</Option></Select></i-col>
            <i-col span="4"><Button type="primary">查询</Button></i-col>
        </Row>
        <zsq-table :headers="headers" :pageobj="pagedata" :loadingst="loadingst" :shows="true" :bodys="tboay"></zsq-table>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{
                loadingst:false,
                pagedata:{
                    total:1,
                    page:1,
                    per_page:12,
                },
                headers:[
                    {
                        title: 'id',
                        width:200,
                    },{
                        title: '出团编号',
                        width:100
                    },{
                        title: '线路名称',
                        width:100,
                    },{
                        title: '出行时间',
                        width:200,
                    },{
                        title: '成人数',
                        width:200
                    },{
                        title: '儿童数',
                        width:100
                    },{
                        title: '天数',
                        width:100
                    },{
                        title: '出行人',
                        width:100
                    },{
                        title: '保险',
                        width:100,
                    },{
                        title: '操作',
                        fixed: 'right',
                        minWidth:130,
                        render:(h,params)=>{
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
                                },'删除'),
                            ])
                        }
                    }
                ],
                tboay:[]
            }
        },
        components:{

        }
    }
</script>
