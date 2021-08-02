import styles from "./styles.module.scss";

export default (width?: number): string => {
  switch (width) {
    case 1:
      return styles["govuk-!-width-full"];
    case 0.5:
      return styles["govuk-!-width-one-half"];
    case 1 / 3:
      return styles["govuk-!-width-one-third"];
    case 2 / 3:
      return styles["govuk-!-width-two-thirds"];
    case 1 / 4:
      return styles["govuk-!-width-one-quarter"];
    case 3 / 4:
      return styles["govuk-!-width-three-quarters"];
    default:
      return "";
  }
};
