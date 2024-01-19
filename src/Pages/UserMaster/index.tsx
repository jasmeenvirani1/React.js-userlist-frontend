import React, { useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import { AiFillDelete, AiOutlineExport, AiOutlineImport } from "react-icons/ai";
import {
  Card,
  Col,
  Input,
  Modal,
  Row,
  Spin,
  Switch,
  Table,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  activateDeactivateUser,
  getCustomers,
  DeleteUser,
} from "../../utils/API";
import dayjs from "dayjs";
import "antd/dist/reset.css"; // Import Ant Design styles
import { SearchOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";

import PptxGenJS from "pptxgenjs";
import ReactDOM from "react-dom";

interface Customer {
  _id: number;
  id: number;
  customerName: string;
  customerCode: number;
  band: string;
  join_date: string;
  contact: string;
  address: string;
  city: string;
  state: string;
  country: string;
  superwiser_emp_code: string;
  emergency_contact: string;
  __v: number;
  assignedInventory?: number[]; // An array of inventoryIds
  isActive: boolean;
}

const CustomerTable: React.FC = () => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [deleteFlag, setDeleteFlag] = useState<number>(0);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const navigate = useNavigate();

  const handleActivateDeactivate = (customerId: number, status: any) => {
    activateDeactivateUser(customerId, status)
      .then(() => {
        message.success(
          `Customer ${status === 1 ? "activated" : "deactivated"} successfully`
        );
        FetchCustomerData(searchText);
      })
      .catch((error) => {
        message.error(error.response.data.error);
      });
  };

  const FetchCustomerData = (searchText: string) => {
    setLoading(true);
    getCustomers(searchText).then((response: any) => {
      const filteredData = response.data.filter(
        (customer: any) => !customer.isDeleted
      );

      setCustomerData(filteredData);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    FetchCustomerData(searchText);
  }, [searchText]);

  const showDeleteConfirmation = (id: number) => {
    setDeleteId(id);
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this customer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDeleteConfirmation(1),
      onCancel: () => handleDeleteConfirmation(0),
    });
  };

  const handleDeleteConfirmation = (flag: number) => {
    if (flag === 1) {
      setDeleteFlag(flag);
    } else {
      setDeleteFlag(0);
      setDeleteId(null);
    }
  };

  React.useEffect(() => {
    if (deleteId !== null && deleteFlag === 1) {
      DeleteUser(deleteId, true).then(() => {
        message.success("Customer Deleted successfully");
        FetchCustomerData(searchText);
        setDeleteFlag(0);
      });
    }
  }, [deleteFlag, deleteId, searchText]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleEditRedirect = (record: Customer) => {
    navigate(`/customer/${record._id}/edit`);
  };

  const handleExportToPPT = async () => {
    await generatePPT(customerData);
  };

  const generatePPT = async (data: any) => {
    const pptx = new PptxGenJS();

    // Slide 1: Encrypted Infoweb
    const slide1 = pptx.addSlide();
    const jsxSlide1 = (
      <div>
        <h1>This is jasmeen project</h1>
      </div>
    );
    await addJsxSlideToPptx(slide1, jsxSlide1);

    // Slide 2: Data Coming
    const slide2 = pptx.addSlide();
    const jsxSlide2 = (
      <div>
        <h1>Data getting as per table in slide 3</h1>
        <p>Test Data </p>
      </div>
    );
    await addJsxSlideToPptx(slide2, jsxSlide2);

    const formatDate = (dateString: string) => {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options as any);
    };

    // Slide 3: Table
    const slide3 = pptx.addSlide();
    // TABLE: Using the latest method
    let rows = [] as any[];
    // Row One: cells will be formatted according to any options provided to `addTable()`
    rows.push([
      "User Name",
      "Employee Code",
      "Join Date",
      "Contact",
      "City",
      "Emergency Contact",
    ]);

    // Iterate through data and populate rows
    data.forEach((customer: any) => {
      rows.push([
        customer.customerName,
        customer.customerCode,
        formatDate(customer.join_date),
        customer.contact,
        customer.city,
        customer.emergency_contact,
      ]);
    });

    slide3.addTable(rows, {
      x: 0.5,
      y: 1.0,
      w: 9.0,
      colW: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
      color: "363636",
      fontFace: "Roboto",
      fontSize: 12,
    });

    await addJsxSlideToPptx(slide3, null);

    // Save the PowerPoint file
    pptx.writeFile({ fileName: "html2pptx-demo.pptx" });
  };

  const addJsxSlideToPptx = (slide: any, jsx: any) => {
    if (jsx) {
      const pptContainer = document.createElement("div");
      pptContainer.appendChild(document.createElement("div"));
      document.body.appendChild(pptContainer);

      const jsxElement = React.createElement("div", null, jsx);

      // Render JSX to the container
      ReactDOM.render(jsxElement, pptContainer);

      // Get the text content from the container
      const textContent = pptContainer.innerText;

      // Add the text content to the PowerPoint slide
      slide.addText(textContent, {
        x: "2%",
        y: "5%",
        w: "100%",
        h: "100%",
        align: "left",
      });

      // Remove the temporary container
      document.body.removeChild(pptContainer);
    }
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          User Name
        </div>
      ),
      dataIndex: "customerName",
      sorter: (a: any, b: any) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Employee Code
        </div>
      ),
      dataIndex: "customerCode",
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Join Date
        </div>
      ),
      dataIndex: "join_date", // Make sure this matches the key in your API response
      render: (text: any) => (
        <>
          <div className="table-data-style">
            {dayjs(text).format("DD/MM/YYYY")
              ? dayjs(text).format("DD/MM/YYYY")
              : "N/A"}
          </div>
        </>
      ),
      sorter: (a: any, b: any) => {
        return dayjs(a.join_date).unix() - dayjs(b.join_date).unix();
      },
    },

    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Contact
        </div>
      ),
      dataIndex: "contact",
    },

    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          City
        </div>
      ),
      dataIndex: "city",
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Emergency Contact
        </div>
      ),
      dataIndex: "emergency_contact",
      render: (text: any) => {
        return text ? text : "N/A";
      },
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Is Active
        </div>
      ),
      dataIndex: "isActive",
      render: (status: number, record: Customer) => (
        <Switch
          className=""
          style={{
            backgroundColor: status === 1 ? "#3B71CA" : "#a6a6a6",
            visibility: "visible",
          }}
          checked={status === 1}
          onChange={(checked) =>
            handleActivateDeactivate(record._id, checked ? 1 : 0)
          }
        />
      ),
      sorter: (a: any, b: any) => a.isActive - b.isActive,
    },

    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Action
        </div>
      ),
      dataIndex: "action",
      render: (text: any, record: any) => (
        <div className="d-flex">
          <FaEdit
            className="me-4"
            style={{
              fontSize: "20px",
              color: "#3B71CA",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => handleEditRedirect(record)}
          />
          <AiFillDelete
            style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
            onClick={() => showDeleteConfirmation(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Row className="m-2" align={"middle"}>
        <Col
          xs={24}
          sm={24}
          md={9}
          xl={6}
          xxl={6}
          className="d-flex justify-content-start font-bold"
        >
          <h2 className="text-2xl">Users</h2>
        </Col>
        <Col xs={24} sm={24} md={24} xl={18} xxl={18} className="">
          <Row gutter={16} className="float-center xs:m-2">
            <Col xs={0} sm={0} md={0} xl={7} xxl={7}></Col>
            <Col xs={24} sm={24} md={10} xl={9} xxl={9} className="">
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="float-end"
                placeholder="Search..."
                allowClear
                autoComplete="off"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Col>
        
            <Col
              xs={12}
              sm={12}
              md={4}
              xl={3}
              xxl={3}
              className=""
              style={{ paddingRight: "-8px !important" }}
            >
              <button
                className="btn btn-warning d-flex justify-content-end align-items-center border rounded-3"
                onClick={handleExportToPPT}
              >
                <AiOutlineExport style={{ fontSize: "15px" }} />
                <div className="ms-2">Export</div>
              </button>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={6}
              xl={5}
              xxl={5}
              style={{ paddingRight: "-8px !important" }}
            >
              <Link to={"/customer/add"}>
                <button
                  className="btn  d-flex justify-content-center align-items-center w-100 border rounded-3"
                  style={{ backgroundColor: "#3B71CA", color: "white" }}
                >
                  <RiAddBoxFill style={{ fontSize: "15px" }} />
                  <div className="ms-2">Add User</div>
                </button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <div>
        <Row>
          <Col
            style={{ backgroundColor: "#ffffff", borderRadius: "12px" }}
            xs={24}
            sm={24}
            md={24}
            xl={24}
            xxl={24}
          >
            <Card className="bg-white border " style={{ borderRadius: "12px" }}>
              <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
                <Spin spinning={loading}>
                  <Table
                    columns={columns}
                    dataSource={customerData}
                    pagination={{ pageSize: 1}}
                  />
                </Spin>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CustomerTable;
