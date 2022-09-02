import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";

//Chart style
const style = {
  height: "100vh",
  width: "100%",
};

const Asset = () => {
  const [asset, setAsset] = useState([]);

  useEffect(() => {
    const getAsset = async () => {
      try {
        // I just use IBM here Because i didn't have time to get the API Key from Alphavantage
        const resp = await axios.get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        );

        if (resp && resp.data && resp.status === 200) {
          // @ts-ignore
          setAsset([{ ...resp?.data }]);
        }
      } catch (e) {
        console.log(e);
        console.log("Something went wrong...");
      }
    };

    getAsset();
  }, []);

  const isAssetTrue = asset && asset.length;

  const metaData = isAssetTrue
    ? Object.entries(asset).map((key) => key?.[1]?.["Meta Data"])
    : [];

  const assetData = isAssetTrue
    ? Object.entries(asset).map((key) => {
        return Object.entries(key?.[1]?.["Time Series (5min)"]).map(
          (keyAsset) => keyAsset
        );
      })
    : [];
  console.log(assetData);
  let option = {
    animation: false,

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },

    grid: [
      {
        left: "10%",
        right: "8%",
        bottom: 150,
      },
    ],
    xAxis: {
      type: "category",
      data: isAssetTrue ? [...metaData] : [],
    },
    yAxis: {},

    series: [
      {
        type: "candlestick",
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42],
        ],
      },
    ],
  };

  return (
    <div className={"bg-gray-800 text-white flex-1 flex flex-col items-center"}>
      <ReactEcharts option={option} style={style} className="pie-chart" />
    </div>
  );
};

export default Asset;
