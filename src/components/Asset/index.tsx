import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import { getOptionForCandles, getOptionForMACD } from "../../utils";
import Select from "react-select";

//Chart style
const style = {
  flex: 1,
  width: "100%",
};

const styleMACD = {
  height: "300px",
  width: "100%",
};

export type AssetProp = {
  date: string;
  prices: number[];
};

const Asset = () => {
  const [asset, setAsset] = useState([]);
  const [choice, setChoice] = useState(0);

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

  const assetData = isAssetTrue
    ? Object.entries(asset).map((key) =>
        Object.entries(key?.[1]?.["Time Series (5min)"]).map((keyAsset) => ({
          date: keyAsset?.[0],
          prices: Object.entries(keyAsset?.[1] as any).map((keyValues) => {
            return parseInt(keyValues?.[1] as string) * Math.random();
          }),
        }))
      )
    : [];

  let option = getOptionForCandles(!!isAssetTrue, assetData);
  let optionMACD = getOptionForMACD(!!isAssetTrue, assetData);

  return (
    <div className={"bg-gray-800 text-white flex-1 flex overflow-x-hidden"}>
      <div className={"flex flex-col items-center flex-1"}>
        <div className={"flex items-center text-black mr-auto pl-36 mt-5"}>
          <p className={"text-white  font-bold mr-2"}>Choose extra candles:</p>
          <Select
            options={[{ label: "MACD", value: 1 }]}
            onChange={(option) => {
              if (option) {
                setChoice(option.value);
              }
            }}
            className={"w-56"}
          />
        </div>
        <ReactEcharts option={option} style={style} />{" "}
        <div
          className={`opacity-0 w-full ${choice === 1 ? "opacity-100" : ""}`}
        >
          <ReactEcharts option={optionMACD} style={styleMACD} />
        </div>
      </div>
      <div className={"hey w-250 w-56"}>
        {assetData?.[0] && assetData?.[0]?.length
          ? assetData?.[0]?.slice(0, 5).map((asset: AssetProp) => (
              <div className={"my-2 bg-gray-400 p-3 rounded-sm"}>
                <h1 className={"text-sm font-bold"}>Date: {asset.date}</h1>
                {asset.prices.map((price: number) => (
                  <p className={"text-sm font-bold my-1"}>
                    {`-`} {price}
                  </p>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Asset;
