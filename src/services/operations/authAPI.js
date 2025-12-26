import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlices";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

/* ================= SEND OTP ================= */
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        SENDOTP_API,
        { email }
      );

      console.log("SEND OTP RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SEND OTP ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

/* ================= SIGNUP ================= */
export function signUp(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating account...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        SIGNUP_API,
        formData
      );

      console.log("SIGNUP RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

/* ================= LOGIN ================= */
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        LOGIN_API,
        { email, password }
      );

      console.log("LOGIN RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      localStorage.setItem(
        "token",
        JSON.stringify(response.data.token)
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

/* ================= LOGOUT ================= */
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out");
    navigate("/login");
  };
}

/* ================= RESET PASSWORD TOKEN ================= */
export function getResetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending reset email...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        RESETPASSTOKEN_API,
        { email }
      );

      console.log("RESET TOKEN RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset email sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET TOKEN ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

/* ================= RESET PASSWORD ================= */
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Resetting password...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        RESETPASSWORD_API,
        { password, confirmPassword, token }
      );

      console.log("RESET PASSWORD RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      console.log("RESET PASSWORD ERROR:", error);
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
/* ================= VERIFY OTP ================= */
export function verifyOtp(otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        endpoints.SIGNUP_API,
        { otp }
      );

      console.log("VERIFY OTP RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Email verified successfully");
      navigate("/login");
    } catch (error) {
      console.log("VERIFY OTP ERROR:", error);
      toast.error(
        error.response?.data?.message || "OTP verification failed"
      );
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
