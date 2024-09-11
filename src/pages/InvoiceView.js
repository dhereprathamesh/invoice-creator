import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "../index.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const InvoiceView = () => {
  const { id } = useParams();
  const componentRef = useRef();

  const [invoiceInfo, setInvoiceInfo] = useState();

  console.log(invoiceInfo);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Example: Assuming invoiceInfo includes an array of items
  const tableRows = invoiceInfo?.items?.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <div className="table-description">
          <span>{item?.description}</span>
          <span>{item?.additionalInfo}</span>
        </div>
      </td>
      <td>
        <div className="table-unit-price">
          <span>₹{item?.unitPrice}</span>
        </div>
      </td>
      <td className="table-quantity-value">{item?.quantity}</td>
      <td>
        <div className="table-net-amount">
          <span>₹{item?.netAmount}</span>
        </div>
      </td>
      <td>
        <div className="table-tax-rate">
          <span>{item?.taxRate}%</span>
        </div>
      </td>
      <td>
        <div className="table-tax-type">
          <span>{item?.taxType}</span>
        </div>
      </td>
      <td>
        <div className="table-tax-amount">
          <span>₹{item?.taxAmount}</span>
        </div>
      </td>
      <td>
        <div className="table-total-amount">
          <span>₹{item?.totalAmount}</span>
        </div>
      </td>
    </tr>
  ));

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/invoice/getSingleinvoiceById/${id}`)
        .then((response) => {
          const data = response.data.data;
          setInvoiceInfo(data);
        })
        .catch((error) => {
          console.error("Error fetching invoice data:", error);
        });
    }
  }, [id]);
  return (
    <>
      <button onClick={handlePrint}>Print this out!</button>
      <div className="invoice-container" ref={componentRef}>
        {/* header */}
        <div className="invoice-header">
          <img
            src="https://zeevector.com/wp-content/uploads/LOGO/Amazon-India-Logo-PNG-HD.png"
            alt="logo"
            className="invoice-logo"
            width={"20%"}
          />
          <div className="invoice-title">
            <h5>Tax Invoice/Bill of Supply/Cash Memo</h5>
            <p>(Original for Recipient)</p>
          </div>
        </div>

        {/* Billing and Seller Address */}
        <div className="invoice-address">
          <div className="seller-address">
            <div>
              <h5>Sold By:</h5>
              <p>{invoiceInfo?.name}</p>
              <p>{invoiceInfo?.address}</p>
              <p>
                {invoiceInfo?.state}, {invoiceInfo?.city},{" "}
                {invoiceInfo?.pincode}
              </p>
              <p>IN</p>
            </div>
            <div className="seller-pan-and-gst-no">
              <div className="seller-pan-div">
                <h5>PAN No: </h5>
                <span>{invoiceInfo?.panNo}</span>
              </div>
              <div className="seller-gst-div">
                <h5>GST Registration No: </h5>{" "}
                <span>{invoiceInfo?.gstRegistrationNo}</span>
              </div>
            </div>
          </div>
          <div className="billing-address">
            <h5>Billing Address:</h5>
            <p>{invoiceInfo?.billingName}</p>
            <p>{invoiceInfo?.billingAddress}</p>
            <p>
              {invoiceInfo?.billingState}, {invoiceInfo?.billingCity},{" "}
              {invoiceInfo?.billingPincode}
            </p>
            <p>IN</p>
            <p className="billing-state-div">
              <h5>State/UT Code: </h5>
              <span>{invoiceInfo?.billingStateUtCode}</span>
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="shipping-address">
          <h5>Shipping Address:</h5>
          <p>{invoiceInfo?.shippingName}</p>
          <p className="shipping-address-details">
            {invoiceInfo?.shippingAddress}
          </p>
          <p>
            {invoiceInfo?.shippingState}, {invoiceInfo?.shippingCity},{" "}
            {invoiceInfo?.shippingPincode}
          </p>
          <p>IN</p>
          <p className="shipping-address-state-and-place">
            <h5>State/UT Code: </h5>{" "}
            <span>{invoiceInfo?.shippingStateUtCode}</span>
          </p>
          <p className="shipping-address-state-and-place">
            <h5>Place of Supply: </h5> <span>{invoiceInfo?.placeOfSupply}</span>
          </p>
          <p className="shipping-address-state-and-place">
            <h5>Place of Delivery: </h5>
            <span>{invoiceInfo?.placeofSupply}</span>
          </p>
        </div>

        <div className="invoice-info">
          <div>
            <p className="invoice-info-order">
              <h5>Order Number: </h5>
              <span>{invoiceInfo?.orderNo}</span>
            </p>
            <p className="invoice-info-order">
              <h5>Order Date: </h5>
              <span>{invoiceInfo?.orderDate}</span>
            </p>
          </div>
          <div>
            <p className="invoice-details">
              <h5>Invoice Number: </h5>
              <span>{invoiceInfo?.invoiceNo}</span>
            </p>
            <p className="invoice-details">
              <h5>Invoice Details: </h5>
              <span>{invoiceInfo?.invoiceDetails}</span>
            </p>
            <p className="invoice-details">
              <h5>Invoice Date: </h5>
              <span>{invoiceInfo?.invoiceDate}</span>
            </p>
          </div>
        </div>

        {/* Billing Table */}
        <div className="invoice-table">
          <table className="table">
            <thead>
              <tr className="table-header">
                <th>Sr No</th>
                <th className="table-description-header">Description</th>
                <th>Unit Price</th>
                <th className="table-quantity">Qty</th>
                <th>Net Amount</th>
                <th>Tax Rate</th>
                <th>Tax Type</th>
                <th>Tax Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
              <tr>
                <td>1</td>
                <td>
                  <div className="table-description">
                    <span>
                      Varasiddhi Silk Mens Formal Shirt (SH-05-42, Navy Blue,
                      42) |
                    </span>
                    <span>Shipping Charges</span>
                  </div>
                </td>
                <td>
                  <div className="table-unit-price">
                    <span>₹538</span>
                    <span>₹538</span>
                  </div>
                </td>
                <td className="table-quantity-value">1</td>
                <td>
                  <div className="table-net-amount">
                    <span>₹538</span>
                    <span>₹538</span>
                  </div>
                </td>
                <td>
                  <div className="table-tax-rate">
                    <span>2.5%</span>
                    <span>2.5%</span>
                    <span>2.5%</span>
                    <span>2.5%</span>
                  </div>
                </td>
                <td>
                  <div className="table-tax-type">
                    <span>CGST</span>
                    <span>SGST</span>
                    <span>CGST</span>
                    <span>SGST</span>
                  </div>
                </td>
                <td>
                  <div className="table-tax-amount">
                    <span>₹13.45</span>
                    <span>₹13.45</span>
                    <span>₹0.77</span>
                    <span>₹0.77</span>
                  </div>
                </td>
                <td>
                  <div className="table-total-amount">
                    <span>₹565.00</span>
                    <span>₹32.30</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <div className="table-description">
                    <span>
                      Varasiddhi Silk Mens Formal Shirt (SH-05-42, Navy Blue,
                      42) |
                    </span>
                    <span>Shipping Charges</span>
                  </div>
                </td>
                <td>
                  <div className="table-unit-price">
                    <span>₹538</span>
                    <span>₹538</span>
                  </div>
                </td>
                <td className="table-quantity-value">1</td>
                <td>
                  <div className="table-net-amount">
                    <span>₹538</span>
                    <span>₹538</span>
                  </div>
                </td>
                <td>
                  <div className="table-tax-rate">
                    <span>2.5%</span>
                    <span>2.5%</span>
                    <span>2.5%</span>
                    <span>2.5%</span>
                  </div>
                </td>
                <td>
                  <div className="table-tax-type">
                    <span>CGST</span>
                    <span>SGST</span>
                    <span>CGST</span>
                    <span>SGST</span>
                  </div>
                </td>
                <td>
                  <div className="table-tax-amount">
                    <span>₹13.45</span>
                    <span>₹13.45</span>
                    <span>₹0.77</span>
                    <span>₹0.77</span>
                  </div>
                </td>
                <td>
                  <div className="table-total-amount">
                    <span>₹565.00</span>
                    <span>₹32.30</span>
                  </div>
                </td>
              </tr>
              {/* Total Count */}
              <tr>
                <td colSpan="7" className="total-label">
                  <strong>Total</strong>
                </td>
                <td className="total-value">
                  <strong>₹45.75</strong>
                </td>
                <td className="total-value">
                  <strong>₹45.75</strong>
                </td>
              </tr>

              <tr>
                <td colSpan="9" className="amount-words">
                  Amount in Words: <br />
                  One Thousand One Hundred And Ninety-five Only
                </td>
              </tr>
              <tr>
                <td colSpan="9" className="signature">
                  <div>
                    <span>For Varasiddhi Silk Exports</span>
                    <p>
                      <img
                        src="https://repository-images.githubusercontent.com/8805592/85279ffa-7f4a-4880-8e41-59e8032b0f71"
                        alt="signature"
                        width={"20%"}
                        height={"60px"}
                      />
                    </p>
                    <span>Authorized Signatory</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="tax-info">
          Whether tax is Payable under reverse charge - No
        </p>
      </div>
    </>
  );
};

export default InvoiceView;
