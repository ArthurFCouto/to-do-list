import React from "react";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const { email } = useParams();
  console.log(email);
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
