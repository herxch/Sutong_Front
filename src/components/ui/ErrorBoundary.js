import { Component } from "react";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI crashed:", error, info?.componentStack);
  }

  handleReload = () => {
    window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className={styles.fallback}>
        <div className={styles.card}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            We hit an unexpected error. Please return to the homepage and try again.
            If this keeps happening, contact us at{" "}
            <a href="mailto:info@sutongctr.com">info@sutongctr.com</a>.
          </p>
          <button type="button" className={styles.button} onClick={this.handleReload}>
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
