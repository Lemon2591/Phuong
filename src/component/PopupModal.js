import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Steps, Card, Input, message } from "antd";
import Loading from "./Loading";
import axios from "axios";

const PopupModal = ({
  isModalOpen,
  setIsModalOpen,
  doctorBooking,
  setDataBooking,
  dataBooking,
}) => {
  const cashBooking = 560000;
  const time = [
    {
      key: 0,
      time: "08:00 - 10:00",
    },
    {
      key: 1,
      time: "10:00 - 12:00",
    },
    {
      key: 2,
      time: "14:00 - 16:00",
    },
    {
      key: 3,
      time: "16:00 - 18:00",
    },
    {
      key: 4,
      time: "19:00 - 21:00",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [isVali, setIsVali] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [activeTime, setActiveTime] = useState();

  const handleCancel = () => {
    setActiveTime();
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    if (
      !dataBooking.add ||
      !dataBooking.text ||
      !dataBooking.typeBooking ||
      !dataBooking.time
    ) {
      message.error("Value is not blank !");
    } else {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "http://localhost:8000/booking",
          dataBooking
        );
        setIsLoading(false);
        setIsModalOpen(false);
        setActiveTime();
        message.success("Booking success !");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        message.success("Booking failed !");
      }
    }
  };

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth - 250,
  });
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth - 250,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <Modal
        title="Thanh toán"
        open={isPay}
        onCancel={() => setIsPay(false)}
        zIndex={999}
        style={{
          top: "20%",
        }}
        footer={null}
      >
        <Card
          style={{
            width: "100%",
          }}
        >
          <div className="card-pay">
            <p>Dịch vụ: </p>
            <p>Đặt lịch khám bệnh</p>
          </div>
          <div className="card-pay">
            <p>Nguồn tiền: </p>
            <p> Ví Alo-pay</p>
          </div>
          <div className="card-pay">
            <p>Số tiền: </p>
            <p>
              {cashBooking.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </Card>
        <div className="popup-booking-btn">
          <Button className="btn-pay-medical" htmlType="submit">
            Thanh toán
          </Button>
        </div>
      </Modal>
      <Modal
        title="Đặt lịch khám  "
        open={isModalOpen}
        onCancel={handleCancel}
        width={windowDimenion.winWidth}
        footer={null}
        zIndex={990}
      >
        <div className="popup-booking">
          <div style={{ display: "flex" }}></div>

          <div style={{ marginTop: "50px" }}>
            <div className="popup-booking-container">
              <div className="popup-booking-detail-left">
                <div className="popup-booking-detail-left-name">
                  <p>Bác sĩ: &nbsp;</p>
                  <p style={{ fontWeight: "700" }}>{doctorBooking?.fullName}</p>
                </div>
                <div className="popup-booking-detail-left-type">
                  <label>Chọn hình thức:</label>
                  <Select
                    value={dataBooking.typeBooking}
                    placeholder="Vui lòng chọn hình thức..."
                    style={{
                      width: "100%",
                    }}
                    options={[
                      {
                        value: 1,
                        label: "Tại nhà",
                      },
                      {
                        value: 2,
                        label: "Chăm sóc tại nhà",
                      },
                      {
                        value: 3,
                        label: "Trung tâm",
                      },
                    ]}
                    onChange={(e) => {
                      setDataBooking((pre) => {
                        return { ...pre, typeBooking: e };
                      });
                    }}
                  />
                </div>
                {dataBooking.typeBooking === 3 ? (
                  <div className="popup-booking-detail-left-type">
                    <label>Chọn trung tâm:</label>
                    <Select
                      value={dataBooking.add}
                      placeholder="Vui lòng chọn trung tâm..."
                      style={{
                        width: "100%",
                      }}
                      options={[
                        {
                          value: "Bệnh viện Bạch Mai",
                          label: "Bệnh viện Bạch Mai",
                        },
                        {
                          value: "Bệnh viện Hồng Ngọc",
                          label: "Bệnh viện Hồng Ngọc",
                        },
                        {
                          value: "Bệnh viện Đa Khoa",
                          label: "Bệnh viện Đa Khoa",
                        },
                      ]}
                      onChange={(e) => {
                        setDataBooking((pre) => {
                          return { ...pre, add: e };
                        });
                      }}
                    />
                  </div>
                ) : (
                  <div className="popup-booking-detail-left-type">
                    <label>Nhập địa chỉ:</label>
                    <Input
                      value={dataBooking.add}
                      placeholder="Vui lòng nhập địa chỉ"
                      style={{
                        width: "100%",
                      }}
                      onChange={(e) => {
                        setDataBooking((pre) => {
                          return { ...pre, add: e.target.value };
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="popup-booking-detail-right">
                <div className="popup-booking-detail-time">
                  <label>Chọn thời gian:</label>
                  <div className="popup-booking-detail-time-booking">
                    {time &&
                      time?.map((data) => {
                        return (
                          <span
                            onClick={() =>
                              setDataBooking((pre) => {
                                return { ...pre, time: data.time };
                              }) & setActiveTime(data.key)
                            }
                            key={data.key}
                            className={
                              activeTime === data.key ? "active-time" : ""
                            }
                          >
                            {data.time}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="popup-booking-detail-left-text"
              style={{ margin: "0 20px" }}
            >
              <label>Lời nhắn cho bác sĩ</label>
              <textarea
                value={dataBooking.text === null ? "" : dataBooking.text}
                onChange={(e) => {
                  setDataBooking((pre) => {
                    return { ...pre, text: e.target.value };
                  });
                }}
                className="form-control"
                placeholder="Nhập nội dung..."
              ></textarea>
            </div>

            <div className="popup-booking-btn">
              <Button
                className="btn-pay-medical"
                htmlType="submit"
                onClick={handleOk}
              >
                Đặt lịch
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PopupModal;
