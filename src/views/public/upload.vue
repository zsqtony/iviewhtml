<template>
    <div>
        <Progress style="width:100px;" v-if="percent > 0" :stroke-width="5" hide-info :percent="percent" />
        <Upload v-else :action="uploadapi" :data="ossdatas" :headers="{'Authorization':'Bearer ' + configkey}" :on-progress="progressFun" :show-upload-list="false" :before-upload="beforeupload" :on-success="successFun" :on-error="errorFun">
            <div class="btn_coverImg"><Icon type="md-add" /></div>
        </Upload>
    </div>
</template>
<style lang="less">
    .btn_coverImg{
        width:100px;height:80px;line-height:80px;text-align:center;border:1px dashed #ccc;font-size:1rem;color:#ccc;cursor:pointer;margin-bottom:10px;
        &:hover{border:1px dashed #2d8cf0;color:#2d8cf0;}
    }
</style>
<script>
    import config from '../../config.js'
    export default{
        data(){
            return{
                percent:0, //上传进度
                ossconfig:{}, //oss配置信息
                uploadapi:'',
                filename:'',
                ossdatas: {},
                filePathName: '',
                configkey: config.JWTKEY
            }
        },
        methods:{
            beforeupload(file){
                let dates = new Date()
                let index = file.name.lastIndexOf('.')
                this.filename = file.name
                this.fileName = dates.getTime() + '.' + file.name.substring(index + 1, file.name.length)
                this.filePathName = this.ossconfig.dir+ dates.getFullYear()+dates.getMonth()+dates.getDate()+'/'+ this.fileName
                this.ossdatas.key = this.filePathName
            },
            successFun(){
                this.$emit('uploadimg',{url:this.ossconfig.host+'/'+this.filePathName})
                this.percent = 0
            },
            errorFun(file){
                this.error(this,'提示','上传失败')
            },
            progressFun(e, file, fileList){ //上传过程
                this.percent = e.percent
            },
            getossconfig(){ //获取oss配置
                let _this = this
                this.get(this,'tools/aliyun/oss_get_sign',function(json){
                    let row = json.data
                    _this.ossconfig = row
                    _this.uploadapi = row.host
                    _this.ossdatas = {
                        'OSSAccessKeyId': row.accessid,
                        'policy': row.policy,
                        'Signature': row.signature,
                        'success_action_status': '200'
                    }
                    console.log(row,'配置')
                })
            },
        },
        mounted(){
            this.getossconfig()
        },
        components:{

        }
    }
</script>
