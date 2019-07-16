<template>
   <el-select :value="value" @change="fn">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-channel',
  data () {
    return {

      channelOptions: []
    }
  },
  created () {
    this.getChannelOption()
  },
  methods: {
    fn (data) {
      this.$emit('input', data)
    },
    async getChannelOption () {
      // 解构赋值 res响应内容{data:{data:{channels:{}}}}

      const {
        data: { data }
      } = await this.axios.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>

</style>
