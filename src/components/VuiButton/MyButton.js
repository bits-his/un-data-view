import React from "react";

export default function MyButton({ text }) {
  const mybtn = {
    backgroundImage:
      "linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%) border-box",
    borderRadius: "5px",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#555",
    fontWeight: "bold",
    marginLeft: "20px",
    width: "150px",
    textTransform: "uppercase",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    transition: "box-shadow 0.3s ease-in-out",
  };

  return (
    <div>
      <button style={mybtn}>{text}</button>
    </div>
  );
}
