const lineData = {
  //  yaxisData2: 本期  yaxisData1: 同期;
  all: {
    currentSales: 300,
    yearSales: 92200,
    yearTb: 4.64,
    yearHb: 3.2,
    yaxisData2: [
      4800,
      5400,
      5850,
      6800,
      6200,
      5950,
      5500,
      6800,
      7700,
      8200,
      9000
    ],
    yaxisData1: [
      4600,
      5250,
      5950,
      6400,
      5800,
      5700,
      5250,
      5900,
      7200,
      8150,
      8800,
      9000
    ],
    tb: [
      -46.67,
      12.5,
      8.33,
      16.24,
      -8.82,
      -4.03,
      -7.56,
      23.64,
      13.24,
      6.49,
      9.76
    ],
    hb: [
      -42.5,
      14.13,
      13.33,
      7.56,
      -9.38,
      -1.72,
      -7.89,
      12.38,
      22.03,
      13.19,
      7.98
    ],

    // 右侧数据
    client: [2700, 2250, 1800, 1350, 900],
    saleTableData: [
      {
        area: "山西",
        affect: "-35%",
        number: "300",
        rate: "60%",
        gap: "-200"
      },
      {
        area: "安徽",
        affect: "-30%",
        number: "350",
        rate: "70%",
        gap: "-150"
      },
      {
        area: "湖南",
        affect: "-25%",
        number: "380",
        rate: "76%",
        gap: "-120"
      },
      {
        area: "四川",
        affect: "-20%",
        number: "430",
        rate: "86%",
        gap: "-70"
      },

      {
        area: "广西",
        affect: "-15%",
        number: "440",
        rate: "88%",
        gap: "-60"
      },
      {
        area: "江西",
        affect: "-10%",
        number: "460",
        rate: "92%",
        gap: "-40"
      },
      {
        area: "贵州",
        affect: "-5%",
        number: "650",
        rate: "130%",
        gap: "150"
      },
      {
        area: "青海",
        affect: "0%",
        number: "700",
        rate: "140%",
        gap: "200"
      }
    ]
  },
  // 华北
  hebei: {
    currentSales: 20,
    yearSales: 4910,
    yearTb: 12.1,
    yearHb: 8.52,
    yaxisData2: [420, 460, 490, 480, 450, 430, 390, 400, 440, 460, 490],
    yaxisData1: [350, 400, 430, 450, 410, 370, 340, 360, 400, 420, 450, 500],
    tb: [-16.0, 9.52, 6.52, -2.04, -6.25, -4.44, -9.3, 2.56, 10.0, 4.55, 6.52],
    hb: [-22.22, 14.29, 7.5, 4.65, -8.89, -9.76, -8.11, 5.88, 11.11, 5.0, 7.14],

    // 右侧数据
    client: [165, 137.5, 110, 82.5, 55],
    saleTableData: [
      {
        area: "沧州",
        affect: "-35%",
        number: "30",
        rate: "70%",
        gap: "-200"
      },
      {
        area: "秦皇岛",
        affect: "-30%",
        number: "30",
        rate: "75%",
        gap: "-10"
      },
      {
        area: "张家口",
        affect: "-25%",
        number: "70",
        rate: "79%",
        gap: "-18"
      },
      {
        area: "石家庄",
        affect: "-25%",
        number: "90",
        rate: "88%",
        gap: "-12"
      },

      {
        area: "保定",
        affect: "-20%",
        number: "110",
        rate: "92%",
        gap: "-10"
      },

      {
        area: "承德",
        affect: "-15%",
        number: "140",
        rate: "108%",
        gap: "10"
      }
    ]
  },
  shanxi: {
    currentSales: 12,
    yearSales: 4270,
    yearTb: 3.89,
    yearHb: -2.87,
    yaxisData2: [380, 420, 450, 470, 430, 400, 380, 360, 350, 330, 300],
    yaxisData1: [320, 370, 410, 420, 390, 370, 390, 370, 340, 350, 380, 420],
    tb: [
      9.52,
      10.53,
      7.14,
      4.44,
      -8.51,
      -6.98,
      -5.0,
      -5.26,
      -2.78,
      -5.71,
      -9.09
    ],
    hb: [
      -15.79,
      15.63,
      10.81,
      2.44,
      -7.14,
      -5.13,
      5.41,
      -5.13,
      -8.11,
      2.94,
      8.57
    ],

    // 右侧数据
    client: [165, 137.5, 110, 82.5, 55],
    saleTableData: [
      {
        area: "晋中",
        affect: "-30%",
        number: "25",
        rate: "65%",
        gap: "-14"
      },
      {
        area: "运城",
        affect: "-25%",
        number: "25",
        rate: "70%",
        gap: "-15"
      },
      {
        area: "长治",
        affect: "-20%",
        number: "30",
        rate: "76%",
        gap: "-10"
      },
      {
        area: "临汾",
        affect: "-15%",
        number: "40",
        rate: "78%",
        gap: "-11"
      },

      {
        area: "吕梁",
        affect: "-10%",
        number: "60",
        rate: "94%",
        gap: "-3"
      },

      {
        area: "大同",
        affect: "-5%",
        number: "100",
        rate: "100%",
        gap: "0"
      }
    ]
  },
  // 华中
  henan: {
    currentSales: 18,
    yearSales: 4740,
    yearTb: 7.73,
    yearHb: 6.4,
    yaxisData2: [400, 440, 460, 490, 470, 430, 400, 370, 410, 430, 440],
    yaxisData1: [350, 400, 430, 450, 420, 380, 340, 360, 400, 420, 450, 480],
    tb: [
      -16.67,
      10.0,
      4.55,
      6.52,
      -4.08,
      -8.51,
      -6.98,
      -7.5,
      10.81,
      4.88,
      2.33
    ],
    hb: [
      -16.67,
      14.29,
      7.5,
      4.65,
      -6.67,
      -9.52,
      -10.53,
      5.88,
      11.11,
      5.0,
      7.14
    ],

    // 右侧数据
    client: [150, 125, 100, 75, 50],
    saleTableData: [
      {
        area: "周口",
        affect: "-30%",
        number: "20",
        rate: "68%",
        gap: "-10"
      },
      {
        area: "商丘",
        affect: "-25%",
        number: "50",
        rate: "71%",
        gap: "-20"
      },
      {
        area: "郑州",
        affect: "-20%",
        number: "80",
        rate: "72%",
        gap: "-21"
      },
      {
        area: "信阳",
        affect: "-15%",
        number: "100",
        rate: "74%",
        gap: "-35"
      },
      {
        area: "洛阳",
        affect: "-10%",
        number: "110",
        rate: "96%",
        gap: "-5"
      },

      {
        area: "南阳",
        affect: "-5%",
        number: "180",
        rate: "110%",
        gap: "17"
      }
    ]
  },
  hubei: {
    currentSales: 22,
    yearSales: 5040,
    yearTb: 7.74,
    yearHb: 5.76,
    yaxisData2: [420, 440, 460, 480, 440, 390, 460, 490, 520, 490, 420],
    yaxisData1: [370, 390, 420, 450, 410, 360, 410, 430, 470, 450, 490, 500],
    tb: [
      -16.0,
      4.76,
      4.55,
      4.35,
      -8.33,
      -11.36,
      17.95,
      6.52,
      6.12,
      -5.77,
      -14.29
    ],
    hb: [-7.5, 5.41, 7.69, 7.14, -8.89, -12.2, 13.89, 4.88, 9.3, -4.26, 8.89],

    // 右侧数据
    client: [120, 100, 80, 60, 40],
    saleTableData: [
      {
        area: "武汉",
        affect: "-30%",
        number: "30",
        rate: "70%",
        gap: "-13"
      },
      {
        area: "咸宁",
        affect: "-25%",
        number: "50",
        rate: "74%",
        gap: "-17"
      },
      {
        area: "荆门",
        affect: "-20%",
        number: "60",
        rate: "74%",
        gap: "-21"
      },
      {
        area: "宜昌",
        affect: "-15%",
        number: "90",
        rate: "79%",
        gap: "-24"
      },
      {
        area: "十堰",
        affect: "-10%",
        number: "120",
        rate: "92%",
        gap: "-10"
      },

      {
        area: "襄阳",
        affect: "-5%",
        number: "160",
        rate: "105%",
        gap: "8"
      }
    ]
  },
  hunan: {
    currentSales: 16,
    yearSales: 4460,
    yearTb: 6.7,
    yearHb: 3.97,
    yaxisData2: [410, 440, 460, 420, 390, 370, 400, 440, 390, 360, 380],
    yaxisData1: [360, 390, 410, 410, 370, 350, 390, 410, 360, 350, 380, 420],
    tb: [
      -2.38,
      7.32,
      4.55,
      -8.7,
      -7.14,
      -5.13,
      8.11,
      10.0,
      -11.36,
      -7.69,
      5.56
    ],
    hb: [-5.26, 8.33, 5.13, 0.0, -9.76, -5.41, 11.43, 5.13, -12.2, -2.78, 8.57],

    // 右侧数据
    client: [105, 87.5, 70, 52.5, 35],
    saleTableData: [
      {
        area: "益阳",
        affect: "-30%",
        number: "35",
        rate: "68%",
        gap: "-17"
      },
      {
        area: "郴州",
        affect: "-25%",
        number: "45",
        rate: "72%",
        gap: "-18"
      },
      {
        area: "怀化",
        affect: "-20%",
        number: "50",
        rate: "74%",
        gap: "-18"
      },
      {
        area: "邵阳",
        affect: "-15%",
        number: "60",
        rate: "75%",
        gap: "-20"
      },
      {
        area: "株洲",
        affect: "-10%",
        number: "80",
        rate: "91%",
        gap: "-8"
      },

      {
        area: "岳阳",
        affect: "-5%",
        number: "100",
        rate: "100%",
        gap: "0"
      }
    ]
  }
};

export default lineData;
