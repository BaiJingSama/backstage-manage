import Mock from "mockjs";

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let List = [];
const count = 20;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.pick([
        "小米4",
        "小米5",
        "小米6",
        "小米8",
        "小米10",
        "小米11",
        "小米12",
        "iphone7",
        "iphone8",
        "iphone9",
        "iphoneX",
        "iphone11",
        "iphone12",
        "iphone13",
        "三星Note7",
        "三星Note8",
        "三星Note9",
        "三星Note10",
        "vivoS14",
        "vivoS15",
        "vivoS16",
        "华为Mete30",
        "华为Mete40",
        "华为Mete50",
      ]),
      price: `￥${Mock.Random.float(1800, 8000, 0, 0)}`,
      today: Mock.Random.float(1, 180, 0, 0),
      month: Mock.Random.float(240, 980, 0, 0),
      all: Mock.Random.float(1280, 4800, 0, 0),
    })
  );
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getProductList: (config) => {
    const { name, page = 1, limit = 1 } = param2Obj(config.url);
    console.log("name:" + name, "page:" + page, "分页大小limit:" + limit);
    const mockList = List.filter((product) => {
      if (name && product.name.indexOf(name) === -1) return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 20000,
      count: mockList.length,
      list: pageList,
    };
  },
  /**
   * 增加用户
   * @param name, price, today, month, all
   * @return {{code: number, data: {message: string}}}
   */
  createProduct: (config) => {
    const { name, price, today, month, all } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      price: price,
      today: today,
      month: month,
      all: all,
    });
    return {
      code: 20000,
      data: {
        message: "添加成功",
      },
    };
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteProduct: (config) => {
    const { id } = JSON.parse(config.body);
    if (!id) {
      return {
        code: -999,
        message: "参数不正确",
      };
    } else {
      List = List.filter((u) => u.id !== id);
      return {
        code: 20000,
        message: "删除成功",
      };
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: (config) => {
    let { ids } = param2Obj(config.url);
    ids = ids.split(",");
    List = List.filter((u) => !ids.includes(u.id));
    return {
      code: 20000,
      data: {
        message: "批量删除成功",
      },
    };
  },
  /**
   * 修改用户
   * @param id, name, price, today, month, all
   * @return {{code: number, data: {message: string}}}
   */
  updateProduct: (config) => {
    const { id, name, price, today, month, all } = JSON.parse(config.body);
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.price = price;
        u.today = today;
        u.month = month;
        u.all = all;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "编辑成功",
      },
    };
  },
};
