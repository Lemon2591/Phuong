import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PopupModal from "./PopupModal";
import Loading from "./Loading";
import Nav from "./Nav";
function Home() {
  const [dataDoctor, setDataDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorBooking, setDoctorBooking] = useState(null);
  const [dataBooking, setDataBooking] = useState({
    name: null,
    typeBooking: null,
    time: null,
    text: null,
    add: null,
    idBS: null,
    idAc: null,
  });
  const dataUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!isModalOpen) {
      setDataBooking({
        name: null,
        typeBooking: null,
        time: null,
        text: null,
        add: null,
        idBS: null,
        idAc: null,
      });
    }
  }, [isModalOpen]);

  useEffect(() => {
    setIsLoading(true);
    axios({
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzVkMzMyYTgxYjcxNGFlYmIwMTA2OTEiLCJpYXQiOjE2Nzc3NjE0NzksImV4cCI6MTY4ODEyOTQ3OX0.4uiGuxphEwVuvJR1SD3ac1AHr787MpAluo17TELg8YQ`,
      },
      method: "get",
      url: "https://alo-server.onrender.com/api/user/data/profile-doctor/get/all/profile",
    })
      .then((r) => {
        setIsLoading(false);
        setDataDoctor(r.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.post(
          "https://alo-server.onrender.com/api/user/data/patient/v2",
          { idAccount: dataUser.id }
        );
        localStorage.setItem("info", JSON.stringify(res.data.result));
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBooking = (data) => {
    setDoctorBooking(data);
    setDataBooking((pre) => {
      return { ...pre, name: data.fullName, idBS: data.id, idAc: dataUser.id };
    });
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <PopupModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        doctorBooking={doctorBooking}
        dataBooking={dataBooking}
        setDataBooking={setDataBooking}
      />
      <div className="home-container">
        <div className="home-content">
          <div className="home-bg">
            <Nav />
            <div className="home-display"></div>
            <div className="home-items">
              <div>
                {dataDoctor &&
                  dataDoctor?.map((data) => {
                    return (
                      <div className="card-container" key={data._id}>
                        <div className="card-item">
                          <div className="card-detail">
                            <p>{data.position}</p>
                            <span>Chuyên khoa: {data.specialist}</span>
                            <h4>{data.fullName}</h4>
                            <span className="introduce-doctor">
                              {data.introduce}
                            </span>
                            <div className="button-card-doctor">
                              {/* <button>Xem chi tiết</button> */}
                              <button
                                onClick={() => {
                                  handleBooking(data);
                                  setIsModalOpen(true);
                                }}
                              >
                                Đặt lịch
                              </button>
                            </div>
                          </div>
                          <div className="card-img">
                            <img src={data.img}></img>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
