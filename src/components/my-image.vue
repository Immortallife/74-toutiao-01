<template>
  <div class="container-mm">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog">
      <img :src="value||dafaultImage" alt />
    </div>
    <!-- 对话框 -->

    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- activeName的值是name属性的值，选中哪个就是哪个name的值 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材页" name="image">
          <!-- 单选框 -->
          <div>
            <el-radio-group v-model="reqParams.collect" @change="searchImage()">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img-item " v-for="item in images" :key="item.id" :class="{selected:selectedImageUrl===item.url}" @click="selectImage(item.url)">
            <img :src="item.url" alt />
          </div>
          <!-- 分页 -->
          <el-pagination
           background
           layout="prev, pager, next"
           :total="total"
           :page-size="reqParams.per_page"
           :current-page="reqParams.page"
           @current-change="pager"
           ></el-pagination>
        </el-tab-pane>
        <!-- 上传图片页 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="headers"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dafaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('74-toutiao')).token
      },
      dafaultImage,
      // 控制对话框显示/隐藏
      dialogVisible: false,
      // 选项卡选中的值
      activeName: 'image',
      // 图片切换 全部/收藏
      reqParams: {
        page: 1,
        per_page: 8,
        collect: false
      },
      total: 0,
      images: [],
      selectedImageUrl: null,
      // 上传图片后预览的图片地址
      uploadImageUrl: null
      // 选中的图片 默认的是图片
      // 我们现在项目是基于vue.cli  使用的是webpack打包工具，webpack只会去打包标签上的src或者url的资源，不会去打包在数据中定义的地址对应的资源
      // 解决的办法，自己主动导入需要的图片资源
      // 注意： webpack不会去打包本地的资源，而网络资源就不存在这个问题，像selectedImageUrl uploadImageUrl都是网络图片地址，所以直接就解析了
      // value: dafaultImage

    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
      // 如果选中的是素材页，那么就使用selectedImageUrl
        if (!this.selectedImageUrl) return this.$message.warning('请选中素材')
        this.$emit('input', this.selectedImageUrl)
        // this.value = this.selectedImageUrl
      } else {
        // 如果选中的是上传页，那么就使用uploadImageUrl
        if (!this.uploadImageUrl) return this.$message.warning('请选中素材')
        this.$emit('input', this.uploadImageUrl)
        // this.value = this.uploadImageUrl
      }
      this.dialogVisible = false
    },

    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    selectImage (url) {
      this.selectedImageUrl = url
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async searchImage () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    openDialog () {
      // 清空上一次选中的地址
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      this.dialogVisible = true
      // 做其他事情
      this.getImages()
    }
  }
}
</script>

<style lang="less">
.container-mm{
  display: inline-block;
  margin-right: 20px;
  margin-top: 10px;
}
.img-item {
  display: inline-block;

  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  margin-top: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
  &.selected{
    //before是伪元素，也可以实现元素能实现的效果 .img-item.selected::before的样式
    &::before{
      content: '';
      position: absolute;
      left:0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;

    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    // 等比例缩放，且完整显示在容器内，是个图片显示规则
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
