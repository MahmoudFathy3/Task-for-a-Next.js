"use client";

import React, { useLayoutEffect, useState } from 'react';
import Image from 'next/image'
import styles from "./Login.module.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { vaildLogin } from '@/utils/VaildLogin';
import { useDispatch, useSelector } from 'react-redux';
import { createLogin } from '@/store/reducers/Login/LoginSlice';
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.login)
  const router = useRouter()

  // Redirect to dashboard if already logged in
  useLayoutEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push("/Dashboard")
    }
  },[router])


  const onSubmit = async (e) => {
    e.preventDefault();

    const isValid = vaildLogin(email, password, setErrors);

    if (isValid) {
      dispatch(createLogin({ email, password, isEmployee: true })).unwrap().then(() => {
        router.push("/Dashboard")
      }).catch((err) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Login failed. Please check your credentials.',
        }))
      })
    }
  };


  return (
    <div className={styles.login}>
      <div className={styles.form}>
        <div className={styles.title}>
          <h3>Welcome back</h3>
          <p>Step into our shopping metaverse for an unforgettable shopping experience</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.elementInput}>
            <MdEmail className={styles.icon} />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <span style={{ color: 'brown', fontSize: "14px" }}>{errors.email}</span>}
          <div className={styles.elementInput}>
            <RiLockPasswordLine className={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && <span style={{ color: 'brown', fontSize: "14px" }}>{errors.password}</span>}
          {errors.general && <div style={{ color: 'brown', fontSize: "14px" }}>{errors.general}</div>}
          <button type="submit">{isLoading ? "Loading" : "Login"}</button>
        </form>
        <div className={styles.signup}>
          <p>Don't have an account? <a href='#'>Sign up</a> </p>
        </div>
      </div>
      <div className="logo">
        <Image
          className="responsive-image"
          src="/Images/logo.png"
          width={600}
          height={600}
          alt="Logo"
          layout="intrinsic"
          priority
        />
      </div>
    </div>
  );
};

export default Login;
