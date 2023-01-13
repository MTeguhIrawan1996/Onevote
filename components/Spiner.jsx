import styles from "../styles/Spiner.module.css";
const Spiner = () => {
  return (
    <div className={styles.dotSpinner}>
      <div className={styles.dotSpinnerDot}></div>
      <div className={styles.dotSpinnerDot}></div>
      <div className={styles.dotSpinnerDot}></div>
      <div className={styles.dotSpinnerDot}></div>
      <div className={styles.dotSpinnerDot}></div>
      <div className={styles.dotSpinnerDot}></div>
      <div className={styles.dotSpinnerDot}></div>
      <div className={styles.dotSpinnerDot}></div>
    </div>
  );
};

export default Spiner;
