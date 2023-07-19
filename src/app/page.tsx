import Image from "next/image";
import styles from "./page.module.css";
import SurveyForm from "../components/survey";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script src="//in.fw-cdn.com/31228659/578718.js" chat="false" />
      <main className={styles.main}>
        <SurveyForm />
      </main>
    </>
  );
}
