<template>
    <div class="login_page">
           <div class="form_center" @keyup.enter="login('formTop')">
               <Row :gutter="10">
                   <i-col span="13">
                       <div class="loging"><img src="../assets/image/logo.jpg" /></div>
                       <div class="aims_cont">本套模版用于快速搭建后端管理系统ui</div>
                   </i-col>
                   <i-col span="11">
                       <div class="header_form"><h2>欢迎使用本套系统</h2></div>
                       <Form ref="formTop" :model="formTop" :rules="ruleformTop" class="form_style">
                           <FormItem prop="mobile">
                               <i-input v-model="formTop.mobile" placeholder="请输入手机号"><Icon type="ios-phone-portrait" slot="prepend"></Icon></i-input>
                           </FormItem>
                           <FormItem prop="password">
                               <i-input v-model="formTop.password" type="password" placeholder="请输入密码"><Icon type="ios-lock-outline" slot="prepend"></Icon></i-input>
                           </FormItem>
                           <FormItem>
                               <Button type="primary" long @click="login('formTop')">登录</Button>
                           </FormItem>
                       </Form>
                   </i-col>
               </Row>
           </div>
    </div>
</template>
<style lang="less">
.login_page{
    width:100%;height:100%;position:absolute;top:0;background-color:rgba(132,185,252,0.5);
    .form_center{
        position:relative;top:20%;margin:0 auto;width:550px;padding:0 0 20px 0;background-color:#fff;border:1px solid #90C6F8;border-radius:6px;box-shadow: 0px 0px 30px 1px #90C6F8;
        .loging{width:100%;padding:20% 0 0 0;text-align:center;img{width:50%;height:auto;}}
        .aims_cont{width:100%;font-size:12px;padding:10px 0 0 0;text-align:center;}
        .header_form{padding:45px 0 10px 0;margin:0 20px 20px 0;border-bottom:1px solid #d7dde4;}
        .form_style{padding:0 20px 0 0;}
    }
}
</style>
<script>
    import config from '../config.js'
    export default{
        data(){
            return{
                formTop:{
                    mobile: '',
                    password: ''
                },
                ruleformTop:{
                    mobile:[
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            login(name){
                let _this = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        sessionStorage.userdata = JSON.stringify({name:'admin'})
                        sessionStorage.topactivesmun = 0
                        _this.$Notice.success({
                            title: '登录提示',
                            desc: '登录成功，系统正在初始！'
                        });
                        setTimeout(()=>{
                            _this.$router.replace({path: '/'})
                        },1000)
                    } else {
                        _this.msgerror(_this,'请输入完整信息')
                    }
                })
            }
        },
        components:{
        }
    }
</script>
