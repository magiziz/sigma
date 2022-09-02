import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const getAssets = async () => {
      try {
        // I just use IBM here Because i didn't have time to get the API Key from Alphavantage
        const resp = await axios.get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
        );

        if (resp && resp.data && resp.status === 200) {
          // @ts-ignore
          setAssets([{ ...resp?.data }]);
        }
      } catch (e) {
        console.log(e);
        console.log("Something went wrong...");
      }
    };

    getAssets();
  }, []);

  return (
    <div
      className={"bg-gray-800 text-white flex-1 p-8 flex flex-col items-center"}
    >
      <h1 className={"text-white text-3xl font-bold"}>
        Select your asset here:
      </h1>

      {assets && assets.length ? (
        <div className={"text-black w-full max-w-md mt-8"}>
          <Select
            options={assets}
            getOptionLabel={(option) => option?.["Meta Data"]?.["2. Symbol"]}
            getOptionValue={(option) => option?.["Meta Data"]?.["2. Symbol"]}
            onChange={(label) =>
              navigate(`${label?.["Meta Data"]?.["2. Symbol"]}`)
            }
          />
        </div>
      ) : (
        `Alphavantage didn't give any results from the API`
      )}
    </div>
  );
};

export default Home;
