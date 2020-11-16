import React, { useState, useEffect, useContext } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Form,
  Button,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "reactstrap";
import { getToken } from "../lib/getToken";
import { useForm } from "react-hook-form";
// import Datetime from "react-datetime";
import moment from "moment";

import JobOpeningCard from "../components/careersPage/JobOpeningCard";
import JobApplicantCard from "../components/careersPage/JobApplicantCard";
import JobPostingForm from "../components/careersPage/JobPostingForm";
import Cookie from "js-cookie";
import { Spinner } from "reactstrap";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const Careers = ({ openingsData, applicationsData }) => {
  console.log(openingsData);
  console.log(applicationsData);
  const token = Cookie.get("token");
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const { user } = useContext(AppContext);
  const [jobOpeningsData, setJobOpeningsData] = useState(null);
  const [jobApplicationsData, setJobApplicationsData] = useState(null);

  // Get Job Openings
  useState(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-openings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((resJSON) => {
        console.log(resJSON);
        setJobOpeningsData(resJSON);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get JOB Applications
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((resJSON) => {
        console.log(resJSON);
        setJobApplicationsData(resJSON);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Nav tabs className="py-4">
        <NavItem>
          <NavLink
            onClick={() => {
              toggle("1");
            }}
          >
            Job Openings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              toggle("2");
            }}
          >
            Job Applications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              toggle("3");
            }}
          >
            Post a new jOb
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Container>
            {jobOpeningsData &&
              jobOpeningsData.map((data) => {
                return <JobOpeningCard data={data} />;
              })}
          </Container>
        </TabPane>
        <TabPane tabId="2">
          <Container>
            {jobApplicationsData &&
              jobApplicationsData.map((data) => {
                return <JobApplicantCard data={data} />;
              })}
          </Container>
        </TabPane>
        <TabPane tabId="3">
          <JobPostingForm />
        </TabPane>
      </TabContent>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  // Fetch data from API
  const token = getToken(ctx);

  const jobres = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/job-openings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const openingsData = await jobres.json();

  const appres = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/job-applications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const applicationsData = await appres.json();

  // Pass data to the page via props

  return { props: { openingsData, applicationsData } };
}
export default Careers;
