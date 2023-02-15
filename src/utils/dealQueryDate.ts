// ecs规范，时间处理
const dealQueryDate = function (
  params: string,
  createDate: Array<string>,
  updateDate: Array<string>,
  activeTime?: Array<string>
) {
  if (createDate && createDate.length) {
    params = `${params} createDate >= '${createDate[0]}' and createDate <= '${createDate[1]}'`;
  }
  if (updateDate && updateDate.length) {
    params = `${params} and updateDate >= '${updateDate[0]}' and updateDate <= '${updateDate[1]}'`;
  }
  if (activeTime && activeTime.length) {
    params = `${params} and activeTime >= '${activeTime[0]}' and activeTime <= '${activeTime[1]}'`;
  }
  return params;
};

// ecs规范，时间处理 - 根据字段返回
const dealQueryDateFun = function (
  params: string,
  data: Array<string>,
  dataStr: tring
) {
  if (data && data.length) {
    params = `${params} ${dataStr} >= '${data[0]}' and ${dataStr} <= '${data[1]}'`;
  }
  return params;
};

// 普通模式，时间处理
const handleResfulDate = function (date = []) {
  if (date.length) {
    return date;
  } else {
    return ["", ""];
  }
};

export { dealQueryDate, handleResfulDate, dealQueryDateFun };
