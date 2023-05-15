window.SYSTEMCONFIG = {
  mock: {
    prefix: {
      dataservice: "http://192.168.58.11:8081/dmp-dataservice",
      metadata: "http://192.168.58.11:8082/dmp-metadata",
      dam: "http://127.0.0.1:2020/api",
      datasource: "http://192.168.58.10:18200/dmp-datasource",
      ecs: "http://192.168.58.11:8095/ecs",
      di: "http://192.168.58.22:18200/dmp-di",
    },
    systemConfig: {
      // ecs配置的数据中台应用id -- 开发环境
      appId: "86299de60dc311eba68c912798543ca5",
    },
  },
  development: {
    prefix: {
      dmpNone: "http://192.168.60.102:30082/",
      dataservice: "http://192.168.60.102:30082/dmp-dataservice",
      metadata: "http://192.168.60.102:30082/dmp-metadata",
      dam: "http://192.168.60.102:30082/dmp-dam",
      base: "http://192.168.60.102:30082/dmp-base",
      datasource: "http://192.168.60.102:30082/dmp-datasource",
      ecs: "http://192.168.60.102:30082/console",
      di: "http://192.168.60.102:30082/dmp-dataIntegration",
      dataMaster: "http://192.168.60.102:30082/dmp-mdm",
      offlineComputation: "http://192.168.60.102:30082/dmp-offlineComputation",
      dataPreview: "http://192.168.60.102:30082/dmp-dataPreview",
      streamsPulsar: "http://192.168.60.102:30082/dmp-streamsPulsar",
      dataFoundation: "http://192.168.60.102:30082/dmp-dataFoundation",
      //   数据预警----外部系统
      dataWarning: "https://192.168.48.162:8383/c1-smartq",
      dataStandard: "http://192.168.60.102:30082/dmp-standard",
      dataInterface: "http://192.168.60.102:30082/dmp-mdm",
      dataQualityRules: "http://192.168.60.102:30082/dmp-dataquality",
      dataSet: "http://192.168.60.102:30082/dmp-dataset",
      dataQuality: "http://192.168.60.102:30082/dmp-dataquality",
      dataSecurity: "http://192.168.60.102:30082/dmp-dataSecurity",
      dataTag: "http://192.168.60.102:30082/dmp-dataTag",
      //   指标中心
      dataIndicator: "http://192.168.60.102:30082/dmp-dataIndicator",
      // 发布中心
      dmpReleasecenter: "http://192.168.60.102:30082/dmp-releasecenter",
      //   填报
      dailyWork: "http://192.168.58.57:40005/dmp-dailyWork",
      //大数据权限
      permission: "http://192.168.60.102:30082/dmp-permission",
      // 共享交换
      exchange: "http://192.168.60.102:30082/dmp-exchange",
      opsCenter: "http://192.168.60.102:30082/dmp-opsCenter",
    },
    systemConfig: {
      // ecs配置的数据中台应用id -- 开发环境
      appId: "86299de60dc311eba68c912798543ca5",
    },
  },
  production: {
    prefix: {
      dmpNone: "",
      dataservice: "/dmp-dataservice",
      metadata: "/dmp-metadata",
      dam: "/dmp-dam",
      base: "/dmp-base",
      datasource: "/dmp-datasource",
      ecs: "/console",
      di: "/dmp-dataIntegration",
      dataMaster: "/dmp-mdm",
      xxlJob: "/xxl-job-admin",
      dataInterface: "/dmp-mdm",
      offlineComputation: "/dmp-offlineComputation",
      dataPreview: "/dmp-dataPreview",
      //   数据预警----外部系统
      dataWarning: "https://192.168.48.162:8383/c1-smartq",
      streamsPulsar: "/dmp-streamsPulsar",
      dataStandard: "/dmp-standard",
      dataQuality: "/dmp-dataquality",
      dataFoundation: "/dmp-dataFoundation",
      dataSet: "/dmp-dataset",
      dataSecurity: "/dmp-dataSecurity",
      dataQualityRules: "/dmp-dataquality",
      dataTag: "/dmp-dataTag",
      // 发布中心
      dmpReleasecenter: "/dmp-releasecenter",
      dailyWork: "/dmp-dailyWork",
      dataIndicator: "/dmp-dataIndicator",
      permission: "/dmp-permission",
      exchange: "/dmp-exchange",
      opsCenter: "/dmp-opsCenter",
    },
    systemConfig: {
      // ecs配置的数据中台应用id -- 开发环境
      appId: "86299de60dc311eba68c912798543ca5",
      testCache: true, // 测试缓存1
    },
  },
};
