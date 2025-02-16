"use client";
import styles from "./dashboard.module.css"
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLogout, GetUser } from "@/store/reducers/Login/LoginSlice";

const Dashboard = () => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.login)


  useLayoutEffect(() => {
    dispatch(GetUser())
  }, [dispatch])
  

    if (user === null) {
      return (
        <div>Loading...</div>
      );
    }


    return (
      <div className={styles.dashboard}>
      <div className={styles.information}>
        <div className={styles.title}>
          <h3>{user.name[0].toUpperCase()}</h3>
        </div>
        
        <div className={styles.info}>
          <div className={styles.ElementInfo}>
          <h3>Name:</h3>
          <p>{user.name}</p>
        </div>
        
        <div className={styles.ElementInfo}>
        <h3>Email:</h3>
        <p>{user.email}</p>
        </div>
      
        <div className={styles.ElementInfo}>
          <h3>Roles:</h3>
          <p>{user.roles[0] === "NASNAV_ADMIN" ? "Admin" : user.roles[0]}</p>
        </div>
      </div>
      
      
        <div className={styles.logout}>
          <button onClick={() => dispatch(createLogout())}>Logout</button>
        </div>
      </div>
    </div>
    );
    }

export default Dashboard


