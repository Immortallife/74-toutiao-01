<template>
  <div class="container-fan">
    <el-card>
      <div slot="header">粉丝管理</div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="first">
          <div class="fans-item" v-for="item in fans" :key="item.id">
            <el-avatar shape="square" :size="80" :src="item.photo"></el-avatar>
            <el-button type="primary" size="mini">+关注</el-button>
          </div>
           <el-pagination
              v-if="total>reqParams.per_page"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
            ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second" >
            <div ref="bar" style="width:600px;height:400px">

            </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'second',
      reqParams: {
        page: 1,
        per_page: 20
      },
      fans: [],
      total: null
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    this.drawChars()
  },
  methods: {
    drawChars () {
      const dom = this.$refs.bar
      const myEcharts = echarts.init(dom)

      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myEcharts.setOption(option)
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFans()
    },
    async getFans () {
      const {
        data: { data }
      } = await this.axios.get('followers', { params: this.reqParams })
      this.fans = data.results
      this.total = data.total_count
      //   console.log(a)
    }
  }
}
</script>

<style lang="less">

.fans-item {
  display: inline-block;
  text-align: center;
  border: 1px dashed #ddd;
  width: 120px;
  height: 160px;
  padding: 20px;
}
</style>
