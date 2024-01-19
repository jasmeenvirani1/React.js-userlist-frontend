
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  message,
  Card,
  Spin,
  Select,
} from "antd";
import { getCustomerByID, updateCustomer } from "../../utils/API";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import dayjs from "dayjs";

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

const { Option } = Select;

const CustomerEditForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);

  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const existingData = await getCustomerByID(id);
          const statusValue = existingData.status === 1;
  
          form.setFieldsValue({
            ...existingData,
            join_date: dayjs(existingData.join_date),
            status: statusValue,
            country: existingData.country,
          });
  
          const selectedCountryData = countries.find(
            (country) => country.country_code === existingData.country
          );

  
          setStates(selectedCountryData?.states || []);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      };
  
      fetchData();
    }
  }, [id, form, countries]);
  

  useEffect(() => {
    // Fetch country data from JSON file
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
      // Reset state and city values when a new country is selected
      form.setFieldsValue({
        state: undefined,
        city: undefined,
      });
      break;



    case "city":
      break;

    default:
      break;
  }
};


  const handleSubmit = async (values: any) => {
    setLoading(true);

    const currentId = form.getFieldValue("_id");

    if (currentId) {
      await updateCustomer(currentId, values);
      message.success("User updated successfully");
      navigate("/");
      window.history.back();
    } else {
      message.error("Failed to submit user data. Please try again.");
    }

    setLoading(false);
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
      <Form onFinish={handleSubmit} form={form} className="bg-white">
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
                        message: "Please Enter Customer Code",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded border border-1"
                      placeholder="Customer Name"
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
                      placeholder="user email"
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
                    Employee Code <span className="text-danger">*</span>
                  </label>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="customerCode"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Customer Code",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className="rounded border border-1"
                      placeholder="Employee Code"
                      disabled
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
                    name="join_date"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Join Date",
                      },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      picker="date"
                      format="YYYY-MM-DD"
                      style={{ width: "100%" }}
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
                      size="large"
                      type="number"
                      className="rounded border border-1"
                      placeholder="Mobile"
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
                      allowClear
                      showSearch
                      size="large"
                      onChange={(value) =>
                        handleSelectionChange(value, "country")
                      }
                      placeholder="Select Country"
                      className="hover:border border-0"
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
                      size="large"
                      onChange={(value) =>
                        handleSelectionChange(value, "state")
                      }
                      placeholder="Select State"
                    >
                      {states.map((state) => (
                        <Option
                          key={state.country_code}
                          value={state.country_code}
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
                      size="large"
                      type="number"
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
              <Spin spinning={loading} size="large">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Update User"}
                </button>
              </Spin>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CustomerEditForm;
