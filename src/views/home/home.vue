<template>
  <el-container class="home-container">
    <el-aside :width="collapse?'64px':'200px'" class="my-aside">
          <div class="logo" :class="{collapse:collapse}"></div>
         <el-menu
         router
         style="border-right:none"
      :default-active="$route.path"
      class="el-menu-vertical-demo"

      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="collapse"
      :collapse-transition="false"
      >

      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       <el-menu-item index="/article">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
       <el-menu-item index="/image">
        <i class="el-icon-menu"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
       <el-menu-item index="/publish">
        <i class="el-icon-menu"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="/comment">
        <i class="el-icon-menu"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
       <el-menu-item index="/fans">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
       <el-menu-item index="/setting">
        <i class="el-icon-menu"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>

    </el-menu>
    </el-aside>

    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="iscollapse()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
              <img  style="width:30px;height:30px;vertical-align:middle"   :src="avatar" alt="">
            <i class="el-icon-arrow-down el-icon--right" style="vertical-align:middle;padding-left:5px">{{name}} </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock"  @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      collapse: false,
      avatar: '',
      name: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('74-toutiao'))
    this.avatar = user.photo
    this.name = user.name
    eventBus.$on('updateHeaderName', (name) => {
      this.name = name
    })
    eventBus.$on('updateHeaderPhoto', (url) => {
      this.avatar = url
    })
  },

  methods: {
    iscollapse () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('74-toutiao')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.home-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .my-aside {
    background: #002033;
    .logo{
        height: 60px;
        width: 100%;
        background: #024 url(../../assets/images/logo_admin.png) no-repeat center/140px auto;
    }
    .collapse{
        background-image: url(../../assets/images/logo_admin_01.png);
        background-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    height: 60px;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
}
</style>
