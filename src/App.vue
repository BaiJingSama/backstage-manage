<template>
  <div id="app">
    <!-- <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row> -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>


<style lang="less">
blockquote,
body,
code,
dd,
div,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
input,
legend,
li,
ol,
p,
pre,
td,
textarea,
th,
ul {
  margin: 0;
  padding: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

fieldset,
img {
  border: 0;
}


li {
  list-style: none;
}


h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}

q:after,
q:before {
  content: "";
}

abbr,
acronym {
  border: 0;
  font-variant: normal;
}

sup {
  vertical-align: text-top;
}

sub {
  vertical-align: text-bottom;
}

input,
select,
textarea {
  // font-family: inherit;
  font-size: inherit;
  *font-size: 100%;
  font-weight: inherit;
}


a:hover {
  text-decoration: underline;
}
</style>

