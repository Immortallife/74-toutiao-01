<template>
<div class="container-e">
<img src="../../assets/images/welcome.jpg" alt="">

</div>
</template>

<script>
export default {
  created () {
    this.axios.get('articles').then((res) => {
      console.log(res.data)
    })
  }
}
</script>

<style lang="less">
.container-e{
    text-align: center;
}

</style>
