import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import user from "./mockServeData/user";
import permission from "./mockServeData/permission";
import product from "./mockServeData/product";

// 定义mock请求拦截
Mock.mock("/api/home/getData", homeApi.getStatisticalData);

// 用户列表的数据
Mock.mock("/api/user/add", "post", user.createUser);
Mock.mock("/api/user/edit", "post", user.updateUser);
Mock.mock("/api/user/del", "post", user.deleteUser);
Mock.mock(/api\/user\/getUser/, user.getUserList);

// 商品列表的数据
Mock.mock("/api/product/add", "post", product.createProduct);
Mock.mock("/api/product/edit", "post", product.updateProduct);
Mock.mock("/api/product/del", "post", product.deleteProduct);
Mock.mock(/api\/product\/getProduct/, product.getProductList);

Mock.mock(/api\/permission\/getMenu/, "post", permission.getMenu);
