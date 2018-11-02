<template>
    <div>
        <Row :gutter="10">
            <i-col span="4"><i-input clearable placeholder="名称"></i-input></i-col>
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
                        width:100,
                    },{
                        title: '头像',
                        width:100
                    },{
                        title: '名称',
                        width:100,
                    },{
                        title: '注册时间',
                        width:200,
                    },{
                        title: '订单数',
                        width:200
                    },{
                        title: '操作',
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
                                    }
                                },'删除')
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
