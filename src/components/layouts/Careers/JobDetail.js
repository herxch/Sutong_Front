import { useEffect, useState } from "react";
import styles from "./JobDetail.module.css";
import ApplyForm from "./ApplyForm";
import { CAREERS_API, HR_EMAIL } from "../../config/jobs";

/**
 * One opening in full, fetched when the accordion opens rather than up front —
 * the list page should not pull every description for roles nobody expanded.
 */
const JobDetail = ({ slug }) => {
  const [job, setJob] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    fetch(`${CAREERS_API}/jobs/${encodeURIComponent(slug)}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setJob(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      })
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [slug]);

  if (status === "loading") {
    return <p className={styles.body}>Loading the description…</p>;
  }

  if (status === "error" || !job) {
    return (
      <p className={styles.body}>
        We could not load this description just now. Please try again shortly, or
        email us at <a className={styles.link} href={`mailto:${HR_EMAIL}`}>{HR_EMAIL}</a>.
      </p>
    );
  }

  let questions = [];
  try {
    questions = job.screeningQuestions ? JSON.parse(job.screeningQuestions) : [];
  } catch {
    questions = [];
  }

  return (
    <div>
      <p className={styles.body}>{job.description}</p>

      {job.qualifications && (
        <>
          <h3 className={styles.subhead}>What we are looking for</h3>
          <p className={styles.body}>{job.qualifications}</p>
        </>
      )}

      {job.schedule && (
        <>
          <h3 className={styles.subhead}>Schedule</h3>
          <p className={styles.body}>{job.schedule}</p>
        </>
      )}

      {job.benefits && (
        <>
          <h3 className={styles.subhead}>Benefits</h3>
          <p className={styles.body}>{job.benefits}</p>
        </>
      )}

      <h3 className={styles.subhead}>Apply</h3>
      <ApplyForm slug={slug} questions={Array.isArray(questions) ? questions : []} />
    </div>
  );
};

export default JobDetail;
