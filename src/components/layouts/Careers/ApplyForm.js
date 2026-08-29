import { useState } from "react";
import styles from "./ApplyForm.module.css";
import { CAREERS_API, HR_EMAIL } from "../../config/jobs";

const MAX_RESUME_BYTES = 8 * 1024 * 1024;

/**
 * The application form.
 *
 * Two things here are requirements rather than choices:
 *
 *  - No question about health, disability or anything else that may not be asked
 *    before a conditional offer. The fields below are the whole form; there is
 *    no free-text prompt that invites one either.
 *  - Self-identification is optional, visually separated, and labelled as not
 *    reaching the people deciding. The API stores it apart from the application
 *    and never returns it to the hiring screens.
 */
const ApplyForm = ({ slug, questions }) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    source: "",
  });
  const [answers, setAnswers] = useState({});
  const [demographics, setDemographics] = useState({
    gender: "",
    ethnicity: "",
    veteran: "",
  });
  const [resume, setResume] = useState(null);
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!values.firstName.trim() || !values.lastName.trim() || !values.email.trim()) {
      setError("Please give your name and email so we can reach you.");
      return;
    }
    if (resume && resume.size > MAX_RESUME_BYTES) {
      setError("That resume is larger than 8 MB. Please attach a smaller file.");
      return;
    }

    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => {
      if (v.trim()) fd.append(k, v.trim());
    });

    const given = Object.fromEntries(
      Object.entries(answers).filter(([, v]) => v && v.trim())
    );
    if (Object.keys(given).length) fd.append("screeningAnswers", JSON.stringify(given));

    const demo = Object.fromEntries(
      Object.entries(demographics).filter(([, v]) => v)
    );
    if (Object.keys(demo).length) fd.append("demographics", JSON.stringify(demo));

    if (resume) fd.append("resume", resume);

    setState("sending");
    try {
      const res = await fetch(
        `${CAREERS_API}/jobs/${encodeURIComponent(slug)}/apply`,
        { method: "POST", body: fd }
      );
      if (!res.ok) {
        let detail = "";
        try {
          const body = await res.json();
          detail = body.message || "";
        } catch {
          /* no JSON body */
        }
        if (res.status === 429) {
          detail = "Too many attempts just now — please wait a minute and try again.";
        }
        throw new Error(detail || "We could not send that.");
      }
      setState("sent");
    } catch (err) {
      setState("error");
      setError(`${err.message} If it keeps happening, email us at ${HR_EMAIL}.`);
    }
  };

  if (state === "sent") {
    return (
      <div className={styles.done}>
        <p className={styles.doneTitle}>Thank you — your application is in.</p>
        <p>
          We read every application. If your experience fits what the role needs,
          someone from HR will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>First name *</span>
          <input
            type="text"
            value={values.firstName}
            onChange={set("firstName")}
            autoComplete="given-name"
            required
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Last name *</span>
          <input
            type="text"
            value={values.lastName}
            onChange={set("lastName")}
            autoComplete="family-name"
            required
          />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Email *</span>
          <input
            type="email"
            value={values.email}
            onChange={set("email")}
            autoComplete="email"
            required
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Phone</span>
          <input
            type="tel"
            value={values.phone}
            onChange={set("phone")}
            autoComplete="tel"
          />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>City</span>
          <input
            type="text"
            value={values.city}
            onChange={set("city")}
            autoComplete="address-level2"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>State or province</span>
          <input
            type="text"
            value={values.state}
            onChange={set("state")}
            autoComplete="address-level1"
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Resume (PDF or Word, up to 8 MB)</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => setResume(e.target.files[0] ?? null)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>How did you hear about us?</span>
        <input type="text" value={values.source} onChange={set("source")} />
      </label>

      {questions.length > 0 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>A few questions about this role</legend>
          {questions.map((q, i) => {
            const key = q.id ?? String(i);
            return (
              <label className={styles.field} key={key}>
                <span className={styles.label}>
                  {q.prompt}
                  {q.required ? " *" : ""}
                </span>
                <textarea
                  rows={2}
                  value={answers[key] ?? ""}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [key]: e.target.value }))
                  }
                />
              </label>
            );
          })}
        </fieldset>
      )}

      <fieldset className={styles.voluntary}>
        <legend className={styles.legend}>Voluntary self-identification</legend>
        <p className={styles.note}>
          Entirely optional, and kept separate from your application — the people
          deciding on it do not see this. We use it only to check that our hiring
          reaches everyone it should. Leaving it blank has no effect on your
          application.
        </p>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}>Gender</span>
            <select
              value={demographics.gender}
              onChange={(e) =>
                setDemographics((d) => ({ ...d, gender: e.target.value }))
              }
            >
              <option value="">Prefer not to say</option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Race or ethnicity</span>
            <select
              value={demographics.ethnicity}
              onChange={(e) =>
                setDemographics((d) => ({ ...d, ethnicity: e.target.value }))
              }
            >
              <option value="">Prefer not to say</option>
              <option>Hispanic or Latino</option>
              <option>White</option>
              <option>Black or African American</option>
              <option>Asian</option>
              <option>Native Hawaiian or Other Pacific Islander</option>
              <option>American Indian or Alaska Native</option>
              <option>Two or more races</option>
            </select>
          </label>
        </div>
        <label className={styles.field}>
          <span className={styles.label}>Veteran status</span>
          <select
            value={demographics.veteran}
            onChange={(e) =>
              setDemographics((d) => ({ ...d, veteran: e.target.value }))
            }
          >
            <option value="">Prefer not to say</option>
            <option>I am a protected veteran</option>
            <option>I am not a protected veteran</option>
          </select>
        </label>
      </fieldset>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submit} disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send application"}
      </button>
    </form>
  );
};

export default ApplyForm;
