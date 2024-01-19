
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  message,
  Card,
} from "antd";
import { addCutomer } from "../../utils/API";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Select } from "antd";

const { Option } = Select;

interface Country {
  country_code: string;
  country_code3: string;
  country: string;
  capital: string;
  region: string;
  subregion: string;
  states: State[];
}

interface State {
  country_code: string;
  country: string;
  subdivision: string | null;
  cities: string[];
}
const CustomerMasterForm: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  

  const handleSubmit = (values: any) => {
    addCutomer(values)
      .then((response: any) => {
        message.success(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const navigate = useNavigate();


  useEffect(() => {
    fetch("/uploads/countries.json")
      .then((response) => response.json())
      .then((data: { countries: Country[] }) => {
        setCountries(data.countries);
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  const handleSelectionChange = (
    selectedValue: string,
    type: "country" | "state" | "city"
  ) => {
    switch (type) {
      case "country":
        const selectedCountryData = countries.find(
          (country) => country.country_code === selectedValue
        );
        setStates(selectedCountryData?.states || []);
       
        break;


      case "city":
        break;

      default:
        break;
    }
  };

  return (
    <div className="">
      <Row className="m-2" align="middle">
        <Col span={18}>
          <h2 className="text-2xl font-bold">Customer</h2>
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={24}
              xl={24}
              xxl={24}
              className="d-flex justify-content-end align-items-center"
            >
              <button
                className="btn bg-none text-primary btn-md d-flex justify-content-center align-items-center m-1 border-none"
                onClick={() => window.history.back()}
              >
                <IoArrowBackOutline className="me-2" />
                <div>Back</div>
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form onFinish={handleSubmit} className="bg-white">
        <Card style={{ backgroundColor: "#ffffff" }}>
          <Row
            className="border border-warning-2 p-5 bg-white rounded-md"
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5  "
                >
                  <label className="font-bold">
                    User Name <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="customerName"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter User name",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded border border-1"
                      placeholder="User Name"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5  "
                >
                  <label className="font-bold">
                    User Email <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="userEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter user email",
                      },
                      {
                        type: "email",
                        message: "Please Enter valid email",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded border border-1"
                      placeholder="User email"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5  "
                >
                  <label className="font-bold">
                    Band <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="band"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Band",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded border border-1"
                      placeholder="Band"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5  "
                >
                  <label className="font-bold">
                    Join Date <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="join_Date"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Join Date",
                      },
                      {
                        type: "date",
                        message: "Please Enter Join Date in correct format",
                      },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      className="rounded border border-1 w-100"
                      placeholder="Join Date"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5  "
                >
                  <label className="font-bold">
                    Contact <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="contact"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Mobile no",
                      },
                    ]}
                  >
                    <Input
                    type="number"
                      size="large"
                      className="rounded border border-1"
                      placeholder="Contact"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5  "
                >
                  <label className="font-bold">
                    Address <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Address",
                      },
                    ]}
                  >
                    <Input.TextArea
                      size="large"
                      placeholder="Address"
                      cols={3}
                      rows={3}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5"
                >
                  <label className="font-bold">
                    Country <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="country"
                    rules={[
                      { required: true, message: "Please select a country" },
                    ]}
                  >
                    <Select
                      className="border-none"
                      allowClear
                      showSearch
                      size="large"
                      onChange={(value) =>
                        handleSelectionChange(value, "country")}
                      placeholder="Select Country"
                      filterOption={(input, option) =>
                        (option?.children as any)
                          ?.toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {countries.map((country) => (
                        <Option
                          key={country.country_code}
                          value={country.country_code}
                        >
                          {country.country}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5"
                >
                  <label className="font-bold">
                    State <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="state"
                    rules={[
                      { required: true, message: "Please select a state" },
                    ]}
                  >
                    <Select
                      className="w-100 border-none"
                      size="large"
                      showSearch
                      onChange={(value) =>
                        handleSelectionChange(value, "state")
                      }
                      placeholder="Select State"
                      filterOption={(input, option) =>
                        (option?.children as any)
                          ?.toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {states.map((state) => (
                        <Option
                          key={state.country_code}
                          value={state.country}
                        >
                          {state.country}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5"
                >
                  <label className="font-bold">
                    City <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="city"
                    rules={[
                      { required: true, message: "Please select a city" },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded border border-1"
                      placeholder="City"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5  "
                >
                  <label className="font-bold">
                    Supervisor EMP Code <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="superwiser_emp_code"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Supervisor EMP Code",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded border border-1"
                      placeholder="Supervisor EMP Code"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
              <Row className="bg-white">
                <Col
                  span={4}
                  className="d-flex justify-content-start me-4 bg-white mb-5"
                >
                  <label className="font-bold">Emergency Contact </label>
                </Col>
                <Col span={12}>
                  <Form.Item name="emergency_contact">
                    <Input
                    type="number"
                      size="large"
                      className="rounded border border-1"
                      placeholder="Emergency Contact"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              xl={24}
              xxl={24}
              className="d-flex justify-content-center"
            >
              <button className="btn btn-primary">Add User</button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CustomerMasterForm;
