import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutAction } from "../Redux/Actions/AuthActions";
import { toast } from "react-toastify";
import { FaCartShopping } from "react-icons/fa6";
import Button from "../Components/Button";
import { IoIosRestaurant } from "react-icons/io";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.LoginReducer);
  const number = cartData?.length;
  const [login, setlogin] = useState(false);
  useEffect(() => {
    if (user?.userData) {
      setlogin(true);
    }
  }, [user]);

  const handleLogout = async () => {
    await dispatch(LogoutAction());
    setlogin(false);
    toast.success("Logout success", {
      autoClose: 1500,
    });
    navigate("/login");
  };

  const links = [
    { value: "Home", link: "/" },
    { value: "About", link: "/about" },
    { value: "Menu", link: "/menu" },
    { value: "Contact us", link: "/contact" },
  ];
  return (
    <div className="flex items-center bg-white w-full h-24 fixed top-0 z-10 shadow">
      <div className="main-container flex items-center justify-between w-full">
        <div>
          <Link
            className="flex gap-1 items-center text-2xl font-semibold text-primary"
            to="/"
          >
            <IoIosRestaurant className="font-bold text-4xl" />
            <h2 className="text-primary">
              Food <span className="text-secondary">Plaza</span>
            </h2>
          </Link>
        </div>
        <div className="flex gap-10 transition">
          {links?.map(({ value, link }, i) => (
            <Link
              to={link}
              className={`no-underline font-medium text-secondary text-base px-2 pb-1 ${
                location.pathname === link
                  ? "border-b-[1px] border-primary"
                  : ""
              } `}
            >
              {value}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Link to="/cart" className="no-underline relative text-primary">
            <FaCartShopping className="text-[28px] font-medium" />
            <span className="absolute top-[-12px] right-[-11px] text-sm border-[1px] border-primary rounded-full w-[22px] h-[22px] flex items-center justify-center bg-white">
              {number}
            </span>
          </Link>
          {login ? (
            <>
              <button
                className="transition font-medium px-[38px] py-[14px] border rounded rounded-tl-2xl rounded-br-2xl text-primary bg-white hover:text-white hover:bg-primary"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <Button
              href="/login"
              text="Log In"
              variant="outlined"
              background="primary"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
