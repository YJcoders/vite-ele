const treeData = [
  {
    value: "all",
    label: "总部",
  },
  {
    value: "01",
    label: "华北区",
    disabled: true,
    children: [
      {
        label: "河北分公司",
        value: "hebei",
      },
      {
        label: "山西分公司",
        value: "shanxi",
      },
    ],
  },
  {
    value: "02",
    label: "华中区",
    disabled: true,
    children: [
      {
        label: "河南分公司",
        value: "henan",
      },
      {
        label: "湖北分公司",
        value: "hubei",
      },
      {
        label: "湖南分公司",
        value: "hunan",
      },
    ],
  },
  {
    label: "华东区",
    value: "03",
    disabled: true,
    children: [
      {
        label: "江苏分公司",
        value: "jiangsu",
      },
      {
        label: "安徽分公司",
        value: "anhui",
      },
      {
        label: "浙江分公司",
        value: "zhejiang",
      },
      {
        label: "江西分公司",
        value: "jiangxi",
      },
      {
        label: "福建分公司",
        value: "fujian",
      },
    ],
  },
  {
    label: "华南区",
    value: "04",
    disabled: true,
    children: [
      {
        label: "广东分公司",
        value: "guangdong",
      },
      {
        label: "广西分公司",
        value: "guangxi",
      },
    ],
  },
  {
    label: "西北区",
    value: "05",
    disabled: true,
    children: [
      {
        label: "宁夏分公司",
        value: "ningxia",
      },
      {
        label: "甘肃分公司",
        value: "gansu",
      },
      {
        label: "青海分公司",
        value: "qinghai",
      },
    ],
  },
  {
    label: "西南区",
    value: "06",
    disabled: true,
    children: [
      {
        label: "四川分公司",
        value: "sichuan",
      },
      {
        label: "贵州分公司",
        value: "guizhou",
      },
      {
        label: "云南分公司",
        value: "yunnan",
      },
    ],
  },
];

export default treeData;
