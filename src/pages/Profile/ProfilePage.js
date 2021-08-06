import React from "react";

import "./ProfilePage.css";
import useCurrentUser from "./../../customHooks/useCurrentUser";

const ProfilePage = () => {
  const { data } = useCurrentUser();
  const getDate = (date) => {
    return new Date(parseInt(date)).toDateString();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className={"profile_container"} style={{ paddingTop: "50px" }}>
        <img
          src={require("./../../assets/user-icon-placeholder.png").default}
          className={"profile_image"}
          alt="profile"
        />
        {data && data.getCurrentUser && (
          <>
            <h3>Name: {data.getCurrentUser.username}</h3>
            <h3>Email: {data.getCurrentUser.email}</h3>
            <h3>JoinDate: {getDate(data.getCurrentUser.joinDate)}</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
