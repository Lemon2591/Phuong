import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

function Booking() {
  const [booking, setBooking] = useState();
  const dataUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    (async function () {
      const res = await axios.get("http://localhost:8000/booking");
      const listBooking = res.data.filter((data) => data.idAc === dataUser.id);

      setBooking(listBooking);
    })();
  }, []);
  return (
    <div>
      <Nav />
      <div className="profile-container">
        <div
          className="profile-content"
          style={{ width: "80%", height: "700px" }}
        >
          <h2>Lịch đã đặt</h2>

          <div className="bacdef" style={{ display: "block" }}>
            {booking &&
              booking?.map((data) => {
                return (
                  <div
                    className="abcs"
                    style={{ padding: "15px 0" }}
                    key={data.id}
                  >
                    <div>
                      <span>Bác sĩ:</span>
                      <p>{data.name}</p>
                    </div>
                    <div>
                      <span>Hình thức:</span>
                      <p>
                        {data.typeBooking === 1
                          ? "Tại nhà"
                          : data.typeBooking === 2
                          ? "Chăm sóc tại nhà"
                          : data.typeBooking === 3
                          ? "Trung tâm"
                          : null}
                      </p>
                    </div>
                    <div>
                      <span>Địa chỉ:</span>
                      <p>{data.add}</p>
                    </div>
                    <div>
                      <span>Thời gian:</span>
                      <p>{data.time}</p>
                    </div>
                    <div>
                      <span>Lời nhắn:</span>
                      <p>{data.text}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* <div className="btn-container">
            <button className="btn">Sửa hồ sơ</button>
            <button className="btn">Xoá hồ sơ</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Booking;
