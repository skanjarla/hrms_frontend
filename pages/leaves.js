import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const LeaveRequest = (props) => {
  const [leaves, setLeaves] = useState([]);
  const [balance, setBalance] = useState([]);

  const { user, setUser } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if you're not logged in
    }
    const token = Cookie.get("token");
    if (token && user) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leave-requests?Employee_Name=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          data.length !== 0 && setBalance(data);
        });

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leave-balances?user.username=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          data.length !== 0 && setLeaves(data);
        });
    }
  }, []);

  return (
    <div className="container-fluid px-5 ml-4 d-flex justify-conent-center flex-column">
      <h2 className="py-3">Leave Balance</h2>
      {/* <div className="d-flex py-3">
        <Link href="/leave-request">
          <a className="ml-auto btn btn-primary">Request Leave</a>
        </Link>
      </div> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">CL Uitilized</th>
            <th scope="col">SL Uitilized</th>
            <th scope="col">Total Uitilized</th>
            <th scope="col">Casual Leaves</th>
            <th scope="col">Special Leaves</th>
            <th scope="col">Sick Leaves</th>
            <th scope="col">Bereavement Leaves</th>
            <th scope="col">Leave Balance</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length !== 0 ? (
            leaves.map((task, index) => {
              return (
                <tr>
                  <td>{task.CL_Utilized}</td>
                  <td>{task.SL_Utilized}</td>
                  <td>{task.SL_Utilized}</td>
                  <td>{task.Total_Leaves_Utilized}</td>
                  <td>{task.Casual_Leaves}</td>
                  <td>{task.Special_Leaves}</td>
                  <td>{task.Bereavement_Leave}</td>
                  <td>{task.Leave_Balance}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-5">
                There is no Leave Balance Data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="py-3">Leave Requests</h2>
      <div className="d-flex py-3">
        <Link href="/leave-request">
          <a className="ml-auto btn btn-primary">Request Leave</a>
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Date</th>
            <th scope="col">Leave Type</th>
            <th scope="col">From Date</th>
            <th scope="col">To Date</th>
            <th scope="col">Status</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length !== 0 ? (
            leaves.map((task, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{task.Applied_Date}</td>
                  <td>{task.Leave_Type}</td>
                  <td>{task.From_Date}</td>
                  <td>{task.To_Date}</td>
                  <td>{task.Approval}</td>
                  <td>{task.Message}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-5">
                There is no Leave Requests
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequest;
