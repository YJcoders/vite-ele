import axios from "../http";

const { prefix } = window.SYSTEMCONFIG[import.meta.env.MODE];
export default {
  // 获取目录树
  getDirectory: (type: string, autoCreated = 0) =>
    axios.get(
      `${prefix.base}/directory/treeList?apiName=${type}&autoCreated=${autoCreated}`
    ),
  // 新增目录
  addDirectory: (arg: any) =>
    axios.post(`${prefix.base}/directory/create`, arg),
  // 编辑目录
  editDirectory: (arg: any) =>
    axios.post(`${prefix.base}/directory/modify`, arg),
  // 删除目录
  delDirectory: (arg: any) =>
    axios.post(`${prefix.base}/directory/delete`, arg),
  // 移动目录
  moveDirectory: (arg: any) => axios.post(`${prefix.base}/directory/move`, arg),

  // 应用管理
  // 获取应用列表
  getAppList: (arg: any) =>
    axios.get(
      `${prefix.dataservice}/metadata/application/?expand=appAuthAksk&${arg}`
    ),
  // 新建应用
  addApplication: (arg: any) =>
    axios.post(`${prefix.dataservice}/metadata/application`, arg, {
      params: { isCancel: true },
    }),
  // 编辑应用
  editApplication: (id: string, arg: any) =>
    axios.patch(`${prefix.dataservice}/metadata/application/${id}`, arg),
  // 应用上下线
  appLine: (id: string, arg: any) =>
    axios.patch(`${prefix.dataservice}/metadata/application/${id}`, arg),
  // 批量上下线
  batchLine: (arg: any) => axios.post(`${prefix.dataservice}/metadata/`, arg),
  // 删除应用
  delLine: (id: string) =>
    axios.delete(`${prefix.dataservice}/metadata/application/${id}`),
  // 导入应用
  importApp: (arg: any) =>
    axios.post(`${prefix.dataservice}/import/app`, arg, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  // 导出应用
  exportApp: (arg: any) => axios.post(`${prefix.dataservice}/export/app`, arg),
  // 应用绑定的api列表
  bindAPIList: (arg: any) =>
    axios.get(`${prefix.dataservice}/dataservice/queryApiByAppId?${arg}`),
  // 应用绑定api，支持多个api
  bindAppApi: (arg: any) =>
    axios.post(
      `${prefix.dataservice}/metadata/appApiRel/customAction/batchBindAppApi`,
      arg
    ),
  //   重置应用 appKey
  resetAppKey: () => axios.get(`${prefix.dataservice}/ak/as/reset`),
};
