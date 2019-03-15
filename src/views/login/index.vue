<style lang="less">
@import "./login.less";
</style>
<template>
  <div class="login_page">
    <div class="login_page_form">
      <Row :gutter="20">
        <i-col span="14">
          <div class="login_logo"><b>87UI</b></div>
          <div class="login_introduction">
            87UI是为了方便前端开发者，在开发后台管理系统时，能简单、快速的搭建好一个ui界面简洁美观的一个例子。
            <p>
              开发者只需"clone"拉取下来安装依赖，即可往里面装填页面组件开发。
            </p>
          </div>
        </i-col>
        <i-col span="10">
          <Form
            ref="formValidate"
            class="login_form_input"
            :model="formValidate"
            :rules="ruleValidate"
          >
            <FormItem prop="username">
              <i-input
                v-model="formValidate.username"
                placeholder="账户"
              ></i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input
                v-model="formValidate.password"
                placeholder="密码"
              ></i-input>
            </FormItem>
            <FormItem
              ><Button type="primary" long @click="login('formValidate')"
                >登录</Button
              ></FormItem
            >
          </Form>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import { getStorage, setStorage } from "_u/auth";
export default {
  data() {
    return {
      formValidate: {
        username: "",
        password: ""
      },
      ruleValidate: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          setStorage("UserInfo", JSON.stringify(_this.formValidate));
          _this.$router.push("/home");
        } else {
          this.$Message.error("请输入完整信息!");
        }
      });
    }
  }
};
</script>
