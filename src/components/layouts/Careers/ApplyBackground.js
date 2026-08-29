import styles from "./ApplyForm.module.css";

/**
 * Work history, education and references.
 *
 * These three used to live only inside the attached resume, which meant HR could
 * read them but could not search them. They are fields now.
 *
 * Kept optional and collapsed on purpose. The system this replaces asked for all
 * of it across five mandatory steps, references included, before anyone could
 * apply at all — which is a good way to lose the candidates who have somewhere
 * else to apply. Native <details> does the collapsing: no state, and it still
 * opens for anyone who is reading with the keyboard or a screen reader.
 *
 * Every section starts with one blank block. Blank blocks are dropped on submit
 * and again by the API, so an untouched section costs the candidate nothing.
 */

let uid = 0;
const key = () => `b${++uid}`;

export const blankJob = () => ({
  key: key(),
  company: "",
  position: "",
  city: "",
  state: "",
  startMonth: "",
  endMonth: "",
  isCurrent: false,
  responsibilities: "",
  reasonForLeaving: "",
  mayContact: "",
});

export const blankSchool = () => ({
  key: key(),
  school: "",
  areaOfStudy: "",
  schoolType: "",
  graduated: "",
});

export const blankReference = () => ({
  key: key(),
  name: "",
  relationship: "",
  company: "",
  email: "",
  phone: "",
});

const SCHOOL_TYPES = [
  ["HIGH_SCHOOL", "High school"],
  ["TRADE", "Trade or vocational"],
  ["ASSOCIATE", "Associate degree"],
  ["BACHELOR", "Bachelor's degree"],
  ["MASTER", "Master's degree"],
  ["DOCTORATE", "Doctorate"],
  ["OTHER", "Other"],
];

/** The anchor field of each block: no anchor, no block. Matches the API. */
export const ANCHORS = {
  work: "company",
  education: "school",
  references: "name",
};

/** Strips the React key and the blocks the candidate never filled in. */
export const clean = (rows, anchor) =>
  rows
    .filter((r) => r[anchor] && r[anchor].trim())
    .map(({ key: _key, ...rest }) => rest);

const Section = ({ title, hint, rows, anchor, addLabel, onAdd, children }) => {
  const filled = rows.filter((r) => r[anchor] && r[anchor].trim()).length;
  return (
    <details className={styles.section}>
      <summary className={styles.summary}>
        <span className={styles.summaryTitle}>{title}</span>
        <span className={styles.summaryMeta}>
          {filled > 0 ? `${filled} added` : "Optional"}
        </span>
      </summary>
      <div className={styles.sectionBody}>
        {hint && <p className={styles.note}>{hint}</p>}
        {children}
        <button type="button" className={styles.add} onClick={onAdd}>
          {addLabel}
        </button>
      </div>
    </details>
  );
};

const Block = ({ index, label, onRemove, canRemove, children }) => (
  <fieldset className={styles.block}>
    <legend className={styles.blockLegend}>
      {label} {index + 1}
      {canRemove && (
        <button type="button" className={styles.remove} onClick={onRemove}>
          Remove
        </button>
      )}
    </legend>
    {children}
  </fieldset>
);

const YesNo = ({ label, value, onChange }) => (
  <label className={styles.field}>
    <span className={styles.label}>{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </label>
);

export const WorkHistory = ({ rows, onChange }) => {
  const set = (i, k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    onChange(rows.map((r, n) => (n === i ? { ...r, [k]: v } : r)));
  };

  return (
    <Section
      title="Work history"
      hint="If it is all on your resume, you can skip this — filling it in just makes it easier for us to match you with other roles later."
      rows={rows}
      anchor={ANCHORS.work}
      addLabel="Add another job"
      onAdd={() => onChange([...rows, blankJob()])}
    >
      {rows.map((r, i) => (
        <Block
          key={r.key}
          index={i}
          label="Job"
          canRemove={rows.length > 1}
          onRemove={() => onChange(rows.filter((_, n) => n !== i))}
        >
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Company</span>
              <input
                type="text"
                maxLength={200}
                value={r.company}
                onChange={set(i, "company")}
                autoComplete="organization"
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Position</span>
              <input
                type="text"
                maxLength={200}
                value={r.position}
                onChange={set(i, "position")}
                autoComplete="organization-title"
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>City</span>
              <input
                type="text"
                maxLength={120}
                value={r.city}
                onChange={set(i, "city")}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>State or province</span>
              <input
                type="text"
                maxLength={60}
                value={r.state}
                onChange={set(i, "state")}
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Started</span>
              <input
                type="month"
                value={r.startMonth}
                onChange={set(i, "startMonth")}
              />
            </label>
            {/* A job they still hold has no end date, so the input goes away
                rather than sitting there empty and ambiguous. */}
            {!r.isCurrent && (
              <label className={styles.field}>
                <span className={styles.label}>Ended</span>
                <input
                  type="month"
                  value={r.endMonth}
                  onChange={set(i, "endMonth")}
                />
              </label>
            )}
          </div>

          <label className={styles.check}>
            <input
              type="checkbox"
              checked={r.isCurrent}
              onChange={set(i, "isCurrent")}
            />
            <span>I currently work here</span>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>What you did there</span>
            <textarea
              rows={3}
              maxLength={4000}
              value={r.responsibilities}
              onChange={set(i, "responsibilities")}
            />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Reason for leaving</span>
              <input
                type="text"
                maxLength={400}
                value={r.reasonForLeaving}
                onChange={set(i, "reasonForLeaving")}
              />
            </label>
            <YesNo
              label="May we contact them?"
              value={r.mayContact}
              onChange={(v) =>
                onChange(
                  rows.map((x, n) => (n === i ? { ...x, mayContact: v } : x))
                )
              }
            />
          </div>
        </Block>
      ))}
    </Section>
  );
};

export const Education = ({ rows, onChange }) => {
  const set = (i, k) => (e) =>
    onChange(rows.map((r, n) => (n === i ? { ...r, [k]: e.target.value } : r)));

  return (
    <Section
      title="Education"
      rows={rows}
      anchor={ANCHORS.education}
      addLabel="Add another school"
      onAdd={() => onChange([...rows, blankSchool()])}
    >
      {rows.map((r, i) => (
        <Block
          key={r.key}
          index={i}
          label="School"
          canRemove={rows.length > 1}
          onRemove={() => onChange(rows.filter((_, n) => n !== i))}
        >
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>School</span>
              <input
                type="text"
                maxLength={200}
                value={r.school}
                onChange={set(i, "school")}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Area of study</span>
              <input
                type="text"
                maxLength={200}
                value={r.areaOfStudy}
                onChange={set(i, "areaOfStudy")}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Type</span>
              <select value={r.schoolType} onChange={set(i, "schoolType")}>
                <option value="">—</option>
                {SCHOOL_TYPES.map(([value, text]) => (
                  <option key={value} value={value}>
                    {text}
                  </option>
                ))}
              </select>
            </label>
            <YesNo
              label="Did you graduate?"
              value={r.graduated}
              onChange={(v) =>
                onChange(
                  rows.map((x, n) => (n === i ? { ...x, graduated: v } : x))
                )
              }
            />
          </div>
        </Block>
      ))}
    </Section>
  );
};

export const References = ({ rows, onChange }) => {
  const set = (i, k) => (e) =>
    onChange(rows.map((r, n) => (n === i ? { ...r, [k]: e.target.value } : r)));

  return (
    <Section
      title="References"
      hint="Only people who are expecting to hear from us, please — we will not contact anyone until we have spoken with you first."
      rows={rows}
      anchor={ANCHORS.references}
      addLabel="Add another reference"
      onAdd={() => onChange([...rows, blankReference()])}
    >
      {rows.map((r, i) => (
        <Block
          key={r.key}
          index={i}
          label="Reference"
          canRemove={rows.length > 1}
          onRemove={() => onChange(rows.filter((_, n) => n !== i))}
        >
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input
                type="text"
                maxLength={200}
                value={r.name}
                onChange={set(i, "name")}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>How they know you</span>
              <input
                type="text"
                maxLength={200}
                value={r.relationship}
                onChange={set(i, "relationship")}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Company</span>
              <input
                type="text"
                maxLength={200}
                value={r.company}
                onChange={set(i, "company")}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                type="email"
                maxLength={200}
                value={r.email}
                onChange={set(i, "email")}
              />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.label}>Phone</span>
            <input
              type="tel"
              maxLength={60}
              value={r.phone}
              onChange={set(i, "phone")}
            />
          </label>
        </Block>
      ))}
    </Section>
  );
};
