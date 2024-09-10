import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "../index.css";

const InvoiceView = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
              <p>Varasiddhi Silk Exports</p>
              <p>.75 3rd Cross, Lalbagh Road</p>
              <p>BENGALURU, KARNATAKA, 560027</p>
              <p>IN</p>
            </div>
            <div className="seller-pan-and-gst-no">
              <div className="seller-pan-div">
                <h5>PAN No: </h5>
                <span>AACFVK3325K1ZY</span>
              </div>
              <div className="seller-gst-div">
                <h5>GST Registration No: </h5> <span>29AACFV3325K1ZY</span>
              </div>
            </div>
          </div>
          <div className="billing-address">
            <h5>Billing Address:</h5>
            <p>Madhu B</p>
            <p>
              Eurofins IT Solutions India Pvt Ltd, 1st Floor, Maruti Platinum,
              Lakshminarayan Pura, AECS Layout
            </p>
            <p>BENGALURU, KARNATAKA, 560037</p>
            <p>IN</p>
            <p className="billing-state-div">
              <h5>State/UT Code: </h5>
              <span>29</span>
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="shipping-address">
          <h5>Shipping Address:</h5>
          <p>Madhu B</p>
          <p className="shipping-address-details">
            Eurofins IT Solutions India Pvt Ltd, 1st Floor, Maruti Platinum,
            Lakshminarayan Pura, AECS Layout
          </p>
          <p>BENGALURU, KARNATAKA, 560037</p>
          <p>IN</p>
          <p className="shipping-address-state-and-place">
            <h5>State/UT Code: </h5> <span>29</span>
          </p>
          <p className="shipping-address-state-and-place">
            <h5>Place of Supply: </h5> <span>KARNATAKA</span>
          </p>
          <p className="shipping-address-state-and-place">
            <h5>Place of Delivery: </h5>
            <span>KARNATAKA</span>
          </p>
        </div>

        <div className="invoice-info">
          <div>
            <p className="invoice-info-order">
              <h5>Order Number: </h5>
              <span>403-3225714-7676307</span>
            </p>
            <p className="invoice-info-order">
              <h5>Order Date: </h5>
              <span>28.10.2019</span>
            </p>
          </div>
          <div>
            <p className="invoice-details">
              <h5>Invoice Number: </h5>
              <span>IN-761</span>
            </p>
            <p className="invoice-details">
              <h5>Invoice Details: </h5>
              <span>KA-310565025-1920</span>
            </p>
            <p className="invoice-details">
              <h5>Invoice Date: </h5>
              <span>28.10.2019</span>
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
