<template>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <slot>内容管理</slot>

                </el-breadcrumb-item>
                </el-breadcrumb>

</template>

<script>
export default {
  name: 'my-bread'
}
</script>

<style>

</style>
