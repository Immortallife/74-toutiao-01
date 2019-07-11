<template>
  <div class="container">
    <el-card class="container-box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 登陆表单 -->
      <!-- 使用element-ui组件，步骤 -->
      <!-- 根据需求找到需要的组件 -->
      <!-- 去看例子，是否有时候的demo -->
      <!-- 看源码，分析（试一试），明白结构的含义 -->
      <!-- 提供标签，属性，事件，函数的文档 -->
      <!-- 根据需求修改代码 -->
      <!-- 在项目中使用即可 -->
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机好"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证吗" style="width:240px"></el-input>
          <el-button style="float:right">发送验证吗</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意</el-checkbox>
        </el-form-item>
        <el-button style="width:100%" type="primary" @click="login()">登陆</el-button>
        <el-form-item></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号不正确'))
      }
    }
    return {

      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { len: 6, message: '请输入', trigger: 'blur' }
        ]

      }

    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 提交登陆请求 axios是基于primise封装的 post() 返回一个promise对象

          this.axios.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then((res) => {
              // res是响应对象  包含后台返回的数据 res.data
              // 1.跳转首页
              // 2.保存用户的信息，用来判断登陆的状态
            //   console.log(res.data)
              this.$router.push('/')
            }).catch(() => {
              this.$message.error('错了')
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  background-color: green;
  position: absolute;
  background: url('../../assets/images/login_bg.jpg');
  .container-box {
    width: 400px;
    height: 340px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
