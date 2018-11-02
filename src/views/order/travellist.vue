<template>
    <div>
        <Row :gutter="10">
            <i-col span="4"><i-input clearable placeholder="线路"></i-input></i-col>
            <i-col span="6"><DatePicker type="daterange" placeholder="时间范围" style="width:100%;"></DatePicker></i-col>
            <i-col span="4"><Select clearable placeholder="订单状态"><Option value="1">1</Option></Select></i-col>
            <i-col span="4"><Select clearable placeholder="支付状态"><Option value="1">1</Option></Select></i-col>
            <i-col span="4"><i-input clearable placeholder="名字"></i-input></i-col>
            <i-col span="4" class-name="header_key"><i-input clearable placeholder="学校"></i-input></i-col>
            <i-col span="4" class-name="header_key"><i-input clearable placeholder="班级"></i-input></i-col>
            <i-col span="4" class-name="header_key"><i-input clearable placeholder="手机号"></i-input></i-col>
            <i-col span="4" class-name="header_key"><Button type="primary">查询</Button></i-col>
        </Row>
        <zsq-table :headers="headers" :bodys="tboay"></zsq-table>
    </div>
</template>
<style lang="less">
.header_key{padding-top:10px;}
</style>
<script>

    export default{
        data(){
            return{
                headers:[
                    {
                        title: '订单编号',
                        width:200,
                    },{
                        title: '线路名称',
                        width:100
                    },{
                        title: '出行人',
                        width:100,
                    },{
                        title: '学校',
                        width:200,
                    },{
                        title: '班级',
                        width:200
                    },{
                        title: '身份证',
                        width:100
                    },{
                        title: '手机号',
                        width:100
                    },{
                        title: '订单金额',
                        width:100
                    },{
                        title: '订单状态',
                        width:100,
                    },{
                        title: '支付状态',
                        width:100,
                    }
                ],
                tboay:[]
            }
        },
        components:{

        }
    }
</script>
