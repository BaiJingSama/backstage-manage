<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px" @click="handleMenu" icon="el-icon-menu" size="mini" />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data() {
    return {}
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    handleClick(command) {
      if (command === 'cancel') {
        // 清除用户登录成功保存的token
        Cookie.remove('token')
        // 清除localStorage中的menu
        localStorage.removeItem('menu')
        // 跳转到登录页面
        this.$message.success('退出登录成功，跳转到登录界面')
        this.$router.replace('/login')
      }
      if (command === 'personal') {
        this.$message.success('正在努力建设中。。。')
      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    color: #fff;
    font-size: 14px;
    margin: 0 10px;
  }

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {


      .el-breadcrumb__inner {
        font-weight: normal;

        &.is-link {
          color: #666
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: #fff
        }
      }
    }
  }

}
</style>