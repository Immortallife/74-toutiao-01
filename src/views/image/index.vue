<template>
  <div class="container-sc" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group v-model="reqParams.collect" @change="search()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- <el-button size="small " @change="search" style="float:right" type="success" >添加素材</el-button> -->
        <el-button type="success" @click="dialogVisible = true" style="float:right">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
              <!-- 星星按钮 -->
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="toggleFav(item)"></span>
            <span class="el-icon-delete" @click="delImage(item.id)"></span>
          </div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        v-if="total>reqParams.per_page"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
      <span>上传组件</span>
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="headers"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      loading: false,
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('74-toutiao')).token
      }
    }
  },

  created () {
    this.getImages()
  },
  methods: {
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {})
    },
    // 切换收藏和取消收藏
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功
      this.$message.success('操作成功')
      // 把当前的图片的状态改成操作后后台给的状态
      item.is_collected = data.collect
    },
    // 上传成功
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // - 自动关闭对话框，更新列表数据。
        this.dialogVisible = false
        this.getImages()
        // 再次打开对话框的时候，预览的是上传按钮 而不是 之前的图片
        this.imageUrl = null
      }, 2000)
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      // 发送ajax之前开启加载效果
      this.loading = true
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    float: left;
    margin-right: 30px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
