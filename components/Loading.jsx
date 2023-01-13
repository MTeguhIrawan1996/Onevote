import styles from "../styles/Loading.module.css";
import Spiner from "./Spiner";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      {/* <div className={styles.banterLoader}>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
      </div> */}
      <Spiner />
    </div>
  );
};

export default Loading;
