<template>
  <div class="container-pp">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?"修改":"发布"}}文章</my-bread>
      </div>
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题：">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <quill-editor v-model="articleForm.content" :options="editOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">1张</el-radio>
            <el-radio :label="3">3张</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- //上传组件 -->
          <!-- 单图 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>

          <!-- 三图 -->
          <div v-if="articleForm.cover.type===3" class="thrid">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },

  data () {
    return {
      // 富文本编辑器的配置选项
      editOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      },
      articleForm: {
        content: '',
        title: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        articleId: null
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    // 监听地址栏参数是否发生改变,监听的是参数，并不是路由，是地址后面的参数
    $route () {
      this.articleId = null
      this.articleForm = {
        content: '',
        title: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        articleId: null
      }
    }
  },
  methods: {

    // 获取指定文章
    async getArticle () {
      const { data: { data } } = await this.axios.get('articles/' + this.articleId)
      this.articleForm = data
    },
    changeType () {
      this.articleForm.cover.images = []
    },
    // 发表或存入草稿
    async publish (draft) {
      await this.axios.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(!draft ? '发表成功' : ' 存入草稿成功')
      this.$router.push('/article')
    },
    // 修改文章
    async edit (draft) {
      await this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    }

  }
}
</script>

<style lang="less">

</style>
