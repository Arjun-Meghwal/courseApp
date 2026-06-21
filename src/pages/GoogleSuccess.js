import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";
import { setToken } from "../slices/authSlice";

function GoogleSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const userString = searchParams.get("user");

    if (token && userString) {

      const user = JSON.parse(
        decodeURIComponent(userString)
      );

      localStorage.setItem(
        "token",
        JSON.stringify(token)
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      dispatch(setToken(token));
      dispatch(setUser(user));

      navigate("/dashboard/my-profile");
    }
    else {
      navigate("/login");
    }
  }, []);

  return <div>Logging in...</div>;
}

export default GoogleSuccess;