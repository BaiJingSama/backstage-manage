<template>
  <div bgcolor="black" class="container">
    <div class="container9">
      <h1>404 WARNING</h1>
      <div class="txt">
        <p>嗯...本页面正在建设中</p>
        <p>请再多给一点时间</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.container {
  list-style: none;
  font-family: 'Noto Sans TC', sans-serif;
  margin: 220px 30px;
  background-color: #999;

  .container9 {
    width: 1300px;
    margin: auto;
    text-align: center;
  }

  .container9 h1 {
    width: 50%;
    display: inline-block;
    margin-top: 50px;
    box-sizing: border-box;
    font-size: 80px;
    background-color: #a00;
    color: #fff;
    margin-bottom: 0.5em;


  }

  .container9 .txt {
    flex-shrink: 0;
    box-sizing: border-box;
    color: #fff;
  }

  .container9 .txt P {
    display: inline-block;
    margin-bottom: 30px;
    font-size: 26px;
    padding: 0 100px;
  }

  .container9 .txt p:first-child:first-letter {
    font-size: 40px;
  }

}
</style>