<template>
  <div class="container-v">

    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="reqParams" label-width="80px">
        <el-form-item label="状态：">

          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- :value="reqParams.channel_id" @input="将变化的值赋值给reqParams.channel_id" -->
          <my-channel v-model="reqParams.channel_id"></my-channel>

        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            @change="dateChange"
            value-format="yyyy-MM-dd"
            v-model="ValueDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header">
        根据筛选条件共查到
        <b>{{total}}</b>条结果:
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px" alt>

                <div slot="error" >
                <img src="../../assets/images/error.gif" width="100" height="75" alt="">
                </div>
            </el-image>

          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- {{scope.row.id}} -->
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button  @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
             <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="page"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import MyBread from '@/components/my-bread.vue'
export default {
  //   components: { MyBread },
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null

      },

      articles: [],
      ValueDate: [],
      total: 0
    }
  },
  created () {
    // 获取文章列表数据
    this.getArticles()
    console.log(this.articles)
  },
  methods: {

    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    del (id) {
      this.$confirm('baby，此操作将永久删除该文当, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`articles/${id}`)
        // 删除成功提示
        this.$message.success('删除成功')
        // 删除成功之后重新获取列表渲染
        this.getArticles()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    page (value) {
      this.reqParams.page = value
      this.getArticles()
    },
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    dateChange (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
      console.log(this.reqParams.begin_pubdate)
      console.log(this.reqParams.end_pubdate)
    },

    async getArticles () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      // console.log({ data: { data } })
      this.articles = data.results
      // 列表请求成功渲染之后，将获取到的数据总条数赋值给data中的total
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less">
.el-card {
  margin-bottom: 20px;
}
.box {
  text-align: center;
}
</style>
