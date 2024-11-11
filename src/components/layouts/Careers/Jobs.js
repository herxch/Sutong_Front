// import styles from "./Jobs.module.css";

// const Jobs = () => {
//   return (
//     <div className={styles.jobsContainer}>
//       <h1 className={styles.jobsTitle}>Current Openings</h1>
//       <p className={styles.jobsParagraph}>
//         We currently have no positions available. Please check back regularly,
//         as we frequently post new positions. In the meantime, you can also send
//         your resumé, which we'll keep on file.
//       </p>
//     </div>
//   );
// };

// export default Jobs;

import styles from "./Jobs.module.css";
import Job from "./Job";

const Jobs = () => {
  return (
    <div className={styles.jobsContainer}>
      <h1 className={styles.jobsTitle}>Current Openings</h1>
      {/* Job Posting 1 */}
      <Job title="Sales Assistant">
        <p className={styles.jobsParagraph}>
          Sutong is a family-owned tire/wheel import/distribution company with
          Headquarters in Hockley, Texas. We import tire/wheel products direct
          from around the world and support our customers with more than 400,000
          square feet of warehouse space in the United States and Canada. Our
          customers can count on us to stock the right sizes for valuable
          fill-in shipments, year-round.
        </p>
        <br />
        <p className={styles.jobsParagraph}>
          We are looking for a qualified Sales Assistant to join our team! This
          position supports our Sales Director by assisting in the management of
          customer accounts, resolving inventory problems, participating in
          trade shows, and visiting customers.
        </p>
        <br />
        <h3 className={styles.jobsSubtitle}>Reports to:</h3>
        <p className={styles.jobsParagraph}>Sales Director</p>
        <br />
        <h3 className={styles.jobsSubtitle}>Job Duties:</h3>
        <ul className={styles.jobsList}>
          <li>
            Assisting the Sales Director in managing customer accounts by
            visiting customers when needed.
          </li>
          <li>
            Analyzing sales and market information; monitoring market
            conditions, product innovations, and competitors' products, prices,
            and sales.
          </li>
          <li>Identifying and solving sales-related problems.</li>
          <li>
            Preparing monthly sales reports and providing periodic sales
            forecasts.
          </li>
          <li>
            Preparing sales presentations by compiling data and developing
            presentation formats and materials.
          </li>
          <li>
            Resolving order and inventory problems and notifying the Director.
          </li>
          <li>
            Providing product, promotion, and pricing information to customers.
          </li>
          <li>
            Ensuring customer satisfaction through ongoing communication and
            relationship management.
          </li>
          <li>
            Helping arrange trade shows and performing other duties as assigned.
          </li>
        </ul>
        <br />
        <h3 className={styles.jobsSubtitle}>Skills and Qualifications:</h3>
        <ul className={styles.jobsList}>
          <li>Excellent written and verbal communication skills.</li>
          <li>Proficiency in Microsoft Outlook.</li>
          <li>Above-average customer service and people skills.</li>
          <li>Superior organizational skills and attention to detail.</li>
          <li>Team player with the ability to multi-task.</li>
          <li>
            Reliable commute or willingness to relocate to Houston before
            starting work.
          </li>
        </ul>
        <br />
        <h3 className={styles.jobsSubtitle}>
          Education and Experience Requirements:
        </h3>
        <ul className={styles.jobsList}>
          <li>
            High School Graduate or General Education Degree (GED) required.
          </li>
          <li>College degree preferred.</li>
          <li>1-3 years of sales experience preferred.</li>
        </ul>
        <br />
        <h3 className={styles.jobsSubtitle}>Sutong Tire Resources Offers:</h3>
        <ul className={styles.jobsList}>
          <li>
            Competitive salary (commensurate with experience and ability).
          </li>
          <li>100% paid employee-only medical coverage.</li>
          <li>
            Optional benefits: family medical, dental, vision, and paid PTO.
          </li>
          <li>Opportunities for career growth in a growing company.</li>
        </ul>
        <br />
        <h3 className={styles.jobsSubtitle}>Work schedule:</h3>
        <p className={styles.jobsParagraph}>
          M-F, 8am-5pm (Full-time, salaried position)
        </p>
        <br />
        <p className={styles.jobsParagraph}>
          Please email your resumé to{" "}
          <a href="mailto:hr@sutongctr.com" className={styles.emailLink}>
            hr@sutongctr.com
          </a>
        </p>
      </Job>

      {/* Job Posting 2 */}
      <Job title="Salesperson(s)">
        <p className={styles.jobsParagraph}>
          Sutong is a family-owned tire/wheel import/distribution company with
          Headquarters in Hockley, Texas. We import tire/wheel products directly
          from around the world and support our customers with more than 400,000
          square feet in three warehouse locations in the United States and
          Canada. Sutong offers our customers exclusive brands, protected
          territories, and more.
        </p>
        <br />
        <p className={styles.jobsParagraph}>
          We are looking for two qualified Salespersons to join our team! One
          with knowledge of medium truck tires and one with knowledge of Lawn &
          Garden tires and assemblies. This position supports our sales
          department by managing customer accounts, resolving inventory
          problems, participating in trade shows, and visiting customers.
        </p>
        <br />
        <h3 className={styles.jobsSubtitle}>Reports to:</h3>
        <p className={styles.jobsParagraph}>
          Sales Director for Retail Accounts
        </p>
        <br />
        <h3 className={styles.jobsSubtitle}>Job Duties:</h3>
        <ul className={styles.jobsList}>
          <li>Managing customer accounts and assisting with other accounts.</li>
          <li>
            Analyzing sales and market information; monitoring market
            conditions, product innovations, and competitors' products, prices,
            and sales.
          </li>
          <li>Identifying and solving sales-related problems.</li>
          <li>
            Preparing monthly sales reports and providing periodic sales
            forecasts.
          </li>
          <li>
            Preparing sales presentations by compiling data and developing
            presentation formats and materials.
          </li>
          <li>
            Resolving order and inventory problems and notifying the Sales
            Director and/or customers.
          </li>
          <li>
            Maintaining communication with customers, alerting them of new
            products and services.
          </li>
          <li>
            Helping arrange trade shows and performing other duties as assigned.
          </li>
        </ul>
        <br />
        <h3 className={styles.jobsSubtitle}>Skills and Qualifications:</h3>
        <ul className={styles.jobsList}>
          <li>Excellent written and verbal communication skills.</li>
          <li>Proficiency in Microsoft Outlook and PowerPoint.</li>
          <li>Above-average people and organizational skills.</li>
          <li>Team-oriented with attention to detail.</li>
          <li>Available for out-of-state travel (25%).</li>
          <li>
            Reliable commute or willingness to relocate to Houston before
            starting work.
          </li>
        </ul>
        <br />
        <h3 className={styles.jobsSubtitle}>
          Education and Experience Requirements:
        </h3>
        <ul className={styles.jobsList}>
          <li>
            High School Graduate or General Education Degree (GED) required.
          </li>
          <li>College degree preferred.</li>
          <li>1-3 years of sales experience preferred.</li>
        </ul>
        <br />
        <h3 className={styles.jobsSubtitle}>Sutong Tire Resources Offers:</h3>
        <ul className={styles.jobsList}>
          <li>
            Competitive salary (commensurate with experience and ability).
          </li>
          <li>100% paid employee-only medical coverage.</li>
          <li>
            Additional optional benefits: group family medical, dental, vision,
            life, and long-term disability.
          </li>
          <li>Paid time off (PTO).</li>
        </ul>
        <br />
        <p className={styles.jobsParagraph}>
          Please email your resumé to{" "}
          <a href="mailto:hr@sutongctr.com" className={styles.emailLink}>
            hr@sutongctr.com
          </a>
        </p>
      </Job>
      {/* Job Posting 3 */}
      <Job title="Website Developer">
        <p className={styles.jobsParagraph}>
          Please email your resumé to{" "}
          <a href="mailto:hr@sutongctr.com" className={styles.emailLink}>
            hr@sutongctr.com
          </a>
        </p>
      </Job>
    </div>
  );
};

export default Jobs;
