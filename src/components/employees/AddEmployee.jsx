import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";

const AddEmployee = ({ isOpen, onClose }) => {
  const handleAddEmp = async () => {};
  return (
    <>
      {isOpen && (
        <div
          className="modal-backdrop show z-6 w-100 h-100"
          style={{ zIndex: 1210 }}
        ></div>
      )}
      <div
        key="createPostModal"
        className={`modal  fade${isOpen ? " show d-block" : ""}`}
        tabIndex="-1"
        style={{ display: isOpen ? "block" : "none", zIndex: 12500 }}
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                أضافة موظف جديد
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <Row>
                  <Col sm={6}>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="textMessage"
                        placeholder="What would you like to say?"
                        id="name"
                      />
                      <label className="form-label" htmlFor="name">
                        أسم الموظف
                      </label>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="textMessage"
                        placeholder="What would you like to say?"
                        id="job"
                      />
                      <label className="form-label" htmlFor="job">
                        الوظيفة
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="textMessage"
                        placeholder="What would you like to say?"
                        id="place"
                      />
                      <label className="form-label" htmlFor="place">
                        مكان العمل
                      </label>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        name="textMessage"
                        placeholder="What would you like to say?"
                        id="salary"
                      />
                      <label className="form-label" htmlFor="salary">
                        الراتب الأساسى
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        name="textMessage"
                        placeholder="What would you like to say?"
                        id="naid"
                      />
                      <label className="form-label" htmlFor="naid">
                        رقم البطاقة
                      </label>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        name="textMessage"
                        placeholder="What would you like to say?"
                        id="phone"
                      />
                      <label className="form-label" htmlFor="phone">
                        رقم الهاتف
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary text-light">
                أضافة
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                أغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
