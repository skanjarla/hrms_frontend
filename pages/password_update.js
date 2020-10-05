import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { login } from "../lib/auth";
import AppContext from "../context/AppContext";

function PasswordUpdate(props) {
  const [data, updateData] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { code } = router.query;

  //   useEffect(() => {
  //     if (appContext.isAuthenticated) {
  //       router.push("/"); // redirect if you're already logged in
  //     }
  //   }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm="12" md={{ size: 6 }}>
          <div className="paper p-4 bg-white">
            <div className="py-2">
              <h3 className="pb-3 login-title text-center">
                Reset Account Password
              </h3>
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      name="password"
                      type="password"
                      style={{ height: 55, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Confirm Password</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="passwordConfirmation"
                      style={{ height: 55, fontSize: "1.2em" }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      onClick={() => {
                        setLoading(true);
                        login(data.identifier, data.password)
                          .then((res) => {
                            setLoading(false);
                            // set authed User in global context to update header/app state
                            appContext.setUser(res.data.user);
                          })
                          .catch((error) => {
                            setError(error.response.data);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading... " : "Update"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
            border-top: 2px solid #2196f3;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
          .login-title {
            color: #2196f3;
            font-size: 1.3rem;
          }
        `}
      </style>
    </Container>
  );
}

export default PasswordUpdate;