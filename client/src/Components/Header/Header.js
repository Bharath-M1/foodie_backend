import React, { useState, useEffect } from "react";
import { Link } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import jwt_decode from "jwt-decode";
import "./styles.css";
import LoginPage from "../Login/LoginPage";
import Signupform from "../Register/Signupform";
import { successToast } from "../utils/toast";
import axios from "axios";
import myaxios from "../utils/axios";

function Header() {
  const [loginModal, setloginModal] = useState(false);
  const [signupModal, setsignUpModal] = useState(false);
  const [userType, setUserType] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = localStorage.getItem("user");
      const decode = jwt_decode(user);
      setUserType(decode.role);
      myaxios.post("/getUser", { id: decode.id }).then((response) => {
        setBalance(response.data.balance);
      });
    }
  });

  const logOut = () => {
    localStorage.removeItem("user");
    window.location = "/";
  };
  const renderButtons =
    userType === "student" ? (
      <div className="nav_items">
        <a className="nav_link" href="/cart">
          <FiShoppingCart className="cart_icon" size={25} />
        </a>

        <a className="text-white fw-bold text-decoration-none">
          Wallet :&#8377; {balance}
        </a>
        <a className="nav_link" onClick={() => logOut()}>
          Logout
        </a>
      </div>
    ) : (
      <div className="nav_items">
        {" "}
        <a onClick={() => setloginModal(true)} className="nav_link">
          Signin
        </a>
        <a onClick={() => setsignUpModal(true)} className="nav_link">
          Signup
        </a>
      </div>
    );
  return (
    <div>
      {/* Main Header */}
      <div className="navbar">
        <Container>
          <div className="nav_logo">
            <a href="/" className="logo fw-bold fs-1 text-decoration-none">
              Foodie
            </a>
          </div>
          <div className="nav_items">{renderButtons}</div>
        </Container>
      </div>

      {/* Signin and Signup Modal */}
      <div>
        {/* Signin Modal */}
        <Modal isOpen={loginModal} toggle={() => setloginModal(false)}>
          <ModalHeader
            className="border-0 "
            toggle={() => setloginModal(false)}
          ></ModalHeader>
          <ModalBody>
            <LoginPage
              signup={() => setsignUpModal(true)}
              onClick={() => setloginModal(false)}
            />
          </ModalBody>
        </Modal>
        {/* Signin Modal */}

        {/* Signup Modal */}
        <Modal
          isOpen={signupModal}
          centered
          toggle={() => setsignUpModal(false)}
        >
          <ModalHeader
            className="border-0 "
            toggle={() => setsignUpModal(false)}
          ></ModalHeader>
          <ModalBody>
            <Signupform
              onClick={() => {
                successToast("clicked");
                setsignUpModal(false);
              }}
            />
          </ModalBody>
        </Modal>
        {/* Signup Modal */}
      </div>
    </div>
  );
}

export default Header;
