<template>
  <el-container class="home-container">
    <el-aside :width="collapse?'64px':'200px'" class="my-aside">
          <div class="logo" :class="{collapse:collapse}"></div>
         <el-menu
         style="border-right:none"
      default-active="2"
      class="el-menu-vertical-demo"

      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="collapse"
      :collapse-transition="false"
      >

      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
       <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
       <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
       <el-menu-item index="6">
        <i class="el-icon-menu"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
       <el-menu-item index="7">
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
              <img  style="width:30px;height:30px;vertical-align:middle"   src="../../assets/images/avatar.jpg" alt="">
            <i class="el-icon-arrow-down el-icon--right" style="vertical-align:middle;padding-left:5px">黑马小哥 </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    iscollapse () {
      this.collapse = !this.collapse
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
