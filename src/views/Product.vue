<template>
  <div class="manage">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 用户的表单信息 -->

      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="商品名" prop="name">
          <el-input placeholder="请输入商品名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input placeholder="请输入价格" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="今日购买" prop="today">
          <el-input placeholder="请输入今日购买数量" v-model="form.today"></el-input>
        </el-form-item>
        <el-form-item label="本月购买" prop="month">
          <el-input placeholder="请输入本月购买数量" v-model="form.month"></el-input>
        </el-form-item>
        <el-form-item label="总购买" prop="all">
          <el-input placeholder="请输入总购买数量" v-model="form.all"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+ 新增商品</el-button>
      <!-- form搜索区域 -->
      <el-form :inline="true" :model="productForm">
        <el-form-item>
          <el-input placeholder="请输入商品名字查询" v-model="productForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="商品名"> </el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="today" label="今日购买"> </el-table-column>
        <el-table-column prop="month" label="本月购买"> </el-table-column>
        <el-table-column prop="all" label="总购买"> </el-table-column>
        <el-table-column prop="addr" label="编辑">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getProduct, addProduct, delProduct, editProduct } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        price: "",
        today: "",
        month: "",
        all: "",
      },
      rules: {
        name: [
          { required: true, message: "必须输入商品名" },
        ],
        price: [
          { required: true, message: "必须输入价格" },
        ],
        today: [{ required: true, message: "必须输入今日购买数量" }],
        month: [{ required: true, message: "必须输入本月购买数量" }],
        all: [{ required: true, message: "必须输入总购买数量" }],
      },
      tableData: [],
      modelType: 0, //0表示新增的弹窗，1表示编辑的弹窗,
      total: 0, // 当前的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      productForm: {
        name: "",
      },
    };
  },
  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 后续对表单数据处理
          if (this.modalType === 0) {
            addProduct(this.form).then(() => {
              // 重新获取列表接口
              this.getList();
            });
          } else {
            editProduct(this.form).then(() => {
              // 重新获取列表接口
              this.getList();
            });
          }
          console.log(this.form);
          this.$refs.form.resetFields();
          // 关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    // 弹窗关闭之前触发该方法
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    // 点击取消的时候触发该方法
    cancel() {
      this.handleClose();
    },
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      // 需要对当前行数据进行深拷贝、否则直接修改数据会报错
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProduct({ id: row.id }).then(() => {
            this.$message.success("删除成功!");
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    //获取列表数据封装的一个方法
    getList() {
      getProduct({ params: { ...this.productForm, ...this.pageData } }).then((data) => {
        console.log(data);
        this.tableData = data.data.list;
        console.log(this.tableData);
        this.total = data.data.count || 0;
      });
    },
    // 选择页码的回调函数
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    // 列表查询条件
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .common-table {
    position: relative;
    height: calc(100% - 62px);

    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>
