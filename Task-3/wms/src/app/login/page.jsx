"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginRequest } from "../../redux/slices/authSlice";
import styles from "../../styles/login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user) {
      router.push("/dashboard");
    }
  }, [user, isClient, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.formContent}>
          <img
            src="https://stage.mkwms.dev/assets/medkart-logo-green.svg"
            alt="Masters Icon"
            width="200"
            height="200"
            className={styles.logoSVG}
          />
          <div className={styles.headerSection}>
            <h2>Login to WMS</h2>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.error}>
                <p>{error}</p>
              </div>
            )}

            <div className={styles.inputGroup}>
              <img
                src="https://stage.mkwms.dev/assets/envelop.svg"
                alt="Email Icon"
                width="20"
                height="20"
                className={styles.HoSvg}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <img
                src="https://stage.mkwms.dev/assets/password-lock.svg"
                alt="Password Icon"
                width="20"
                height="20"
                className={styles.HoSvg}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />

              <img
                src={
                  showPassword
                    ? "https://stage.mkwms.dev/assets/close_eye.svg"
                    : "https://stage.mkwms.dev/assets/open_eye.svg"
                }
                alt="Toggle Password Visibility"
                width="20"
                height="20"
                className={styles.openEye}
                onClick={togglePasswordVisibility}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${styles.button} ${
                loading ? styles.buttonLoading : ""
              }`}
            >
              <h2>{loading ? "Logging in..." : "Login"}</h2>
            </button>
            <div className={styles.forgotPass}>Forgot password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
