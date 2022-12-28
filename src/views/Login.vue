<template>
  <div>
    <el-form ref="form" label-width="70px" class="login-container" :model="form" :rules="rules" :inline="true">
      <h3 class="login_title">白境后台管理系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary">登录</el-button>
      </el-form-item>
      <el-form-item size="mini">
        <el-button @click="user1" type="primary">完整权限</el-button>
        <el-button @click="user2" type="primary">部分权限</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { mapMutations } from 'vuex'
import { getMenu } from '../api/index'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setMenu', 'addMenu', 'setUser']),
    submit() {
      // 第一步校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data)
            if (data.code === 20000) {
              data.data.token
              // token信息存进cookie用于不同页面之间的通信
              Cookie.set('token', data.data.token)

              // 获取菜单的数据，存入store中
              this.setMenu(data.data.menu)
              this.addMenu(this.$router)
              // 获取用户数据，存入store中
              this.setUser(data.data.user)
              // 跳转到首页
              this.$message.success('登录成功，跳转到首页')
              this.$router.push('/home')
            } else {
              this.$message.error(data.data.message)
            }
          })
        }
      })

    },
    user1() {
      this.form.username = "baijing";
      this.form.password = '123'
    },
    user2() {
      this.form.username = 'xiaoxiao';
      this.form.password = 'xiaoxiao'
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 0 25px #cac6c6;

  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458
  }

  .el-button {
    margin-top: 10px;
    width: 100px;
  }

  .el-input {
    width: 198px;
  }
}

.userContainer {
  display: flex;
  margin: 0 50%;
  transform: translateX(-100%);

}
</style>