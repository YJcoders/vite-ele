<template>
  <div class="login">
    <img :src="bg" class="img" />

    <div class="login-form">
      <div class="title">登录测试平台</div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :hide-required-asterisk="true"
        :rules="rules"
        label-width="0"
      >
        <el-form-item prop="name">
          <el-input
            v-model="loginForm.name"
            autocomplete="off"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="btn-container">
            <el-button type="primary" style="width: 100%" @click="submitForm()"
              >登录</el-button
            >
          </div>
          <!-- <div class="operation">
          <span class="free-register" @click="showLogin = !showLogin">免费注册</span>
          <span class="forget-password" @click="handleForget">忘记密码</span>
        </div> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, shallowRef } from "vue";
import { useRouter, useRoute } from "vue-router";
import useStore from "@/store";
import { encrypt } from "@/utils/aes"; // aes 密码加密
import "element-plus/es/components/form/style/css";
import bg from "@/assets/bg.jpg";

const router = useRouter();
const route = useRoute();

const loginFormRef = shallowRef();
const loginForm = reactive({
  name: "",
  password: "",
});
const rules = {
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码用户名", trigger: "blur" }],
};
const submitForm = () => {
  loginFormRef.value.validate(async (valid: any) => {
    if (valid) {
      const { name, password } = loginForm;
      const data = {
        name,
        password: encrypt(password),
      };
      sessionStorage.setItem("auth", "true");

      if (route.query.redirect) {
        const path = route.query.redirect;
        router.push({ path: path as string });
      } else {
        router.push("/home");
      }
    }
  });
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 100vh;
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(0, -50%);
    min-height: 460px;
    width: 360px;
    margin-top: 32px;
    padding: 0 50px;
    border-radius: 4px;
    opacity: 0.95;
    background: url("@/assets/login.png") center;

    .title {
      margin: 50px 0;
      font-size: 24px;
    }

    .btn-container {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
