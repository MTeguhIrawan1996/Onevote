import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className="bg-zinc-600 h-screen flex justify-center items-center">
      <div className={styles.banterLoader}>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
        <div className={styles.banterLoaderbox}></div>
      </div>
    </div>
  );
};

export default Loading;
