import { AssetProp } from "../components/Asset";

export const getOptionForCandles = (isAssetTrue: boolean, assetData: any) => {
  return {
    animation: false,

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 10,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: "slider",
        bottom: 10,
        start: 10,
        end: 100,
      },
    ],
    grid: [
      {
        left: "10%",
        right: "8%",
        bottom: 150,
      },
    ],
    xAxis: {
      type: "category",
      data: isAssetTrue
        ? assetData?.[0]?.slice(0, 25).map((asset: AssetProp) => asset.date)
        : [],
    },
    yAxis: {},

    series: [
      {
        type: "candlestick",
        data: isAssetTrue
          ? assetData?.[0]?.slice(0, 25).map((asset: AssetProp) => asset.prices)
          : [],
      },
    ],
  };
};

export const getOptionForMACD = (isAssetTrue: boolean, assetData: any) => {
  return {
    animation: false,

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },

    graphic: [
      {
        type: "group",
        left: "center",
        top: 70,
        width: 300,
        bounding: "raw",
        children: [
          {
            id: "MA5",
            type: "text",
            left: 0,
          },
          {
            id: "MA10",
            type: "text",
            left: "center",
          },
          {
            id: "MA20",
            type: "text",
            right: 0,
          },
        ],
      },
    ],

    grid: [
      {
        left: 20,
        right: 20,
        top: 110,
        height: 120,
      },
      {
        left: 20,
        right: 20,
        height: 40,
        top: 260,
      },
    ],
    xAxis: [
      {
        type: "category",
        data: isAssetTrue
          ? assetData?.[0]?.slice(0, 25).map((asset: AssetProp) => asset.date)
          : [],
        boundaryGap: false,
        axisLine: { lineStyle: { color: "#777" } },

        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          show: true,
        },
      },
    ],
    yAxis: [
      {
        scale: true,
        splitLine: { show: true },
        axisTick: { show: false },
        axisLabel: {
          inside: true,
          formatter: "{value}\n",
        },
      },
      {
        scale: true,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],

    series: [
      {
        type: "candlestick",
        name: "",
        data: isAssetTrue
          ? assetData?.[0]?.slice(0, 25).map((asset: AssetProp) => asset.prices)
          : [],
        itemStyle: {
          color: "#ef232a",
          color0: "#14b143",
          borderColor: "#ef232a",
          borderColor0: "#14b143",
        },
        emphasis: {
          itemStyle: {
            color: "black",
            color0: "#444",
            borderColor: "black",
            borderColor0: "#444",
          },
        },
      },
      {
        name: "MA10",
        type: "line",
        data: isAssetTrue
          ? assetData?.[0]
              ?.slice(0, 25)
              .map((asset: AssetProp) => parseInt(asset.prices as any) / 1)
          : [],
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
      {
        name: "MA10",
        type: "line",
        data: isAssetTrue
          ? assetData?.[0]
              ?.slice(0, 25)
              .map((asset: AssetProp) => parseInt(asset.prices as any) / 5)
          : [],
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
        },
      },
    ],
  };
};
