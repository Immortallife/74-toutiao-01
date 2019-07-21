<template>
  <div class="container-set">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form v-model="userForm" label-width="120px">
              <el-form-item label="编号">
                {{userForm.id}}
              </el-form-item>
              <el-form-item label="手机">
              {{userForm.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称">
                <el-input type="text" v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea" :rows="3"  v-model="userForm.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input type="text"  v-model="userForm.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
              <!-- 这里自己上传头像，所以需要把默认的配置项都删除 -->
               <!-- http-request覆盖默认的上传行为 -->
            <el-upload
              class="avatar-uploader"

                action=""
                :show-file-list="false"
                 :http-request="myUpload"

            >
              <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center">修改头像</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('74-toutiao')).token
      },
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        photo: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // handlesuccess (res) {
    //   this.photo = res.data.photo
    //   // 这里的el-load默认的请求方式是post，也必须是post 但是修改头像的端口要求是patch
    //   // 所以需要自己上传头像
    // },
    myUpload (data) {
      const formData = new FormData()
      formData.append('photo', data.file)
      this.axios.patch('user/photo', formData).then((res) => {
        // console.log(res.data.data.photo)
        this.$message.success('修改成功')
        const Url = res.data.data.photo
        eventBus.$emit('updateHeaderPhoto', Url)
        const userInfo = JSON.parse(window.sessionStorage.getItem('74-toutiao'))
        userInfo.photo = Url
        window.sessionStorage.setItem('74-toutiao', JSON.stringify(userInfo))
      })
    },
    async  getUserInfo () {
      const { data: { data } } = await this.axios.get('user/profile')
      this.userForm = data
    },
    // 修改个人信息
    async updateUserInfo () {
      const { data: { data } } = await this.axios.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      eventBus.$emit('updateHeaderName', data.name)
      // 更新本地存储用户信息
      const userinfo = JSON.parse(window.sessionStorage.getItem('74-toutiao'))
      userinfo.name = data.name
      window.sessionStorage.setItem('74-toutiao', JSON.stringify(userinfo))
    }
  }
}
</script>

<style>
</style>
