import axios from "axios";
import React, { useState } from "react";
import { api_route, getKeysWithTrueValue, socket } from "../App";
import { TailSpin } from "react-loader-spinner";

const Reg = ({ setLoading, loading }) => {
  const query = new URLSearchParams(window.location.search);
  const quetyData = query.get("data");
  const [tameenFor, setTameenFor] = useState("ضد الغير");
  const [tameenAllType, setTameenType] = useState("الوكالة");
  const [car_model, setCarModel] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [purpose_of_use, setPurposeOfUse] = useState("شخصي");
  const [startedDate, setStartedDate] = useState("");
  const [carYear, setCarYear] = useState("2024");
  const [load, setLoad] = useState(false);
  console.log(JSON.parse(quetyData));

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    const { _id, national_id, carHolderName } = JSON.parse(quetyData);
    const data = {
      tameenFor,
      tameenAllType,
      car_model,
      carPrice,
      purpose_of_use,
      carYear,
      startedDate,
      national_id,
      carHolderName,
      // ...JSON.parse(quetyData),
    };
    try {
      await axios.post(api_route + "/apply/" + _id, data).then((res) => {
        socket.emit("newData", _id);
        return (window.location.href = `/activate?data=${JSON.stringify(
          res.data
        )}`);
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="w-full px-4 py-6 md:w-3/4  flex flex-col items-center justify-center gap-y-5"
      dir="rtl"
      onSubmit={handleSubmit}
    >
      {load ? (
        <div
          className="flex top-0 z-50 w-full justify-center items-center h-screen fixed bg-black bg-opacity-60"
          dir="rtl"
        >
          <div className="bg-white flex-col rounded-md p-3 w-fit h-fit flex items-center justify-center gap-x-3">
            <img src="/load.png" className="" />
            <span className="text-lg" dir="rtl">
              {" "}
              جاري البحث عن عروض شركات التأمين ...
            </span>
            <TailSpin
              height="30"
              width="30"
              color="gray"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full flex flex-col gap-2">
        <span>نوع التأمين</span>
        <select
          className="border p-3 text-center border-gray-400 outline-blue-500 rounded-md "
          value={tameenFor}
          onChange={(e) => setTameenFor(e.target.value)}
        >
          <option>شامل</option>
          <option>ضد الغير</option>
        </select>
      </div>

      <div className="w-full flex flex-col gap-2">
        <span>تاريخ بدء الوثيقة</span>
        <input
          type="date"
          className="border p-3 text-center border-gray-400 outline-blue-500 rounded-md "
          value={startedDate}
          onChange={(e) => setStartedDate(e.target.value)}
          required
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <span>الغرض من استخدام السيارة</span>
        <select
          className="border p-3 text-center border-gray-400 outline-blue-500 rounded-md "
          value={purpose_of_use}
          onChange={(e) => setPurposeOfUse(e.target.value)}
        >
          <option>شخصي</option>
          <option>تجاري</option>
          <option>تأجير</option>
          <option>نقل الركاب او كريم او اوبر</option>
          <option>نقل بضائع</option>
          <option>نقل مشتقات نفطية</option>
        </select>
      </div>

      <input
        type="text"
        className="border p-3 w-full text-center border-gray-400 outline-blue-500 rounded-md "
        placeholder="   نوع السيارة"
        value={car_model}
        onChange={(e) => setCarModel(e.target.value)}
        required
      />

      <input
        type="text"
        className="border p-3 w-full text-center border-gray-400 outline-blue-500 rounded-md "
        placeholder="القيمة التأمينية"
        value={carPrice}
        inputMode="numeric"
        onChange={(e) => setCarPrice(e.target.value)}
        required
      />

      <div className="w-full flex flex-col gap-2">
        <span>سنة الصنع </span>
        <select
          className="border p-3 text-center border-gray-400 outline-blue-500 rounded-md "
          value={carYear}
          onChange={(e) => setCarYear(e.target.value)}
        >
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
          <option>2020</option>
          <option>2019</option>
          <option>2018</option>
          <option>2017</option>
          <option>2016</option>
          <option>2015</option>
          <option>2014</option>
          <option>2013</option>
          <option>2012</option>
          <option>2011</option>
          <option>2010</option>
          <option>2009</option>
          <option>2008</option>
          <option>2007</option>
          <option>2006</option>
          <option>2005</option>
          <option>2004</option>
          <option>2003</option>
          <option>2002</option>
          <option>2001</option>
          <option>2000</option>
          <option>1999</option>
          <option>1998</option>
          <option>1997</option>
          <option>1996</option>
          <option>1995</option>
        </select>
      </div>

      <div className="w-full flex flex-col gap-2">
        <span className="text-xl text-blue-900 font-bold">مكان الاصلاح</span>
        <div className="flex w-full">
          <div className="flex items-center justify-center gap-x-3 p-2">
            <input
              type="radio"
              name="tammenType"
              id="الورشة"
              className="w-4 h-4"
              required
              onClick={() => setTameenType("الورشة")}
            />
            <label htmlFor="الورشة" className="text-lg">
              الورشة
            </label>
          </div>
          <div className="flex items-center justify-center gap-x-3 p-2">
            <input
              type="radio"
              name="tammenType"
              className="w-4 h-4"
              id="الوكالة"
              required
              onClick={() => setTameenType("الوكالة")}
            />
            <label htmlFor="الوكالة" className="text-lg">
              الوكالة
            </label>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center px-2  gap-x-2">
        أوافق علي منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم و/أو مركز
        المعلومات الوطني عن بياناتي
      </div>
      <div className="w-full flex justify-center items-center my-2">
        <button className="text-white bg-amber-700 py-2 rounded-md  text-xl w-full">
          {loading ? (
            <div className="flex items-center justify-center">
              <TailSpin
                height="30"
                width="30"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            "إظهار العروض"
          )}
        </button>
      </div>
    </form>
  );
};

export default Reg;
