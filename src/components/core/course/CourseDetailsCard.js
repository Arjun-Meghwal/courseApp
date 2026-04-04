import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/accountType";
import { addToCart } from "../../../slices/cartSlice";

const CourseDetailsCard = ({ course, setConfirmationModel, handleBuyCourse }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
  } = course;

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are instructor, you can't buy a course");
      return;
    }

    if (token) {
      dispatch(addToCart(course));
      return;
    }

    setConfirmationModel({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModel(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const isEnrolled = course?.studentsEnrolled?.includes(user?._id);

  return (
    <div>
      <img
        src={ThumbnailImage}
        alt="Thumbnail"
        className="max-h-[300px] min-h-[180px] rounded-xl"
      />

      <div>Rs. {CurrentPrice}</div>

      <div className="flex flex-col gap-y-6">
        <button
          className="bg-yellow-50 w-full text-richblack-900"
          onClick={
            isEnrolled
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
        >
          {isEnrolled ? "Go to Course" : "Buy Now"}
        </button>

        {!isEnrolled && (
          <button onClick={handleAddToCart}>Add to cart</button>
        )}
      </div>

      <div>
        <p>3-day money-back guarantee</p>
        <p>This course includes:</p>

        <div className="flex flex-col gap-y-3">
          {course?.instructions?.map((item, index) => (
            <p key={index} className="flex gap-2">
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>

      <div>
        <button
          className="mx-auto flex items-center"
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;