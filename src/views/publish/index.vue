<template>
  <div class="container-pp">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题：">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
            <quill-editor v-model="articleForm.content" style="width:800px;"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.type">
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">1张</el-radio>
            <el-radio :label="3">3张</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="img-btn">
              <img src="../../assets/images/default.png" alt="">
          </div>
        </el-form-item>
        <el-form-item label="频道：">
            <my-channel v-model="channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">发表</el-button>
            <el-button>存入草稿</el-button>
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
      articleForm: {
        content: '',
        title: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null

      }
    }
  }
}
</script>

<style lang="less">
.img-btn{
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
