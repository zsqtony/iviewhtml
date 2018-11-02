<template>
    <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="线路选择：">
                <Select style="width:200px" placeholder="请选择"><Option value="1">1</Option></Select> <Button type="primary">选择</Button>
            </FormItem>
            <FormItem label="出团时间：">
                <DatePicker type="date" placeholder="选择" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="天数：">
                <Row>
                    <i-col span="4"><i-input><span slot="append">天</span></i-input></i-col>
                    <i-col span="4"><i-input><span slot="append">晚</span></i-input></i-col>
                </Row>
            </FormItem>
            <FormItem label="执行负责人：">
               <i-input style="width:200px;"></i-input>
            </FormItem>
            <FormItem label="年龄段：">
                <i-input style="width:200px;"></i-input>
            </FormItem>
            <FormItem label="老师：">
                <quill-editor ref="myTextEditor1" :options="editorOption" v-model="formValidate.content1" :content="formValidate.content"></quill-editor>
            </FormItem>
            <FormItem label="教官：">
                <quill-editor ref="myTextEditor2" :options="editorOption" v-model="formValidate.content2" :content="formValidate.content"></quill-editor>
            </FormItem>
            <FormItem label="导游：">
                <quill-editor ref="myTextEditor3" :options="editorOption" v-model="formValidate.content3" :content="formValidate.content"></quill-editor>
            </FormItem>
            <FormItem label="执行团队：">
                <quill-editor ref="myTextEditor4" :options="editorOption" v-model="formValidate.content4" :content="formValidate.content"></quill-editor>
            </FormItem>
            <FormItem>
                <Button type="primary">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return{
                editorOption: {

                },
                formValidate:{
                    content1:'',
                    content2:'',
                    content3:'',
                    content4:'',
                },
                ruleValidate:{

                }
            }
        },
        components:{
        }
    }
</script>
