/* eslint-disable max-classes-per-file */

interface Accordion {
  new (module: HTMLElement): ThisType;

  init(): void;

  setExpanded(expanded: boolean, section: HTMLElement | null): void;

  isExpanded(section: HTMLElement | null): boolean;

  $sections: NodeListOf<HTMLElement>;

  controlsClass: string;
  openAllClass: string;
  iconClass: string;
  sectionHeaderClass: string;
  sectionHeaderFocusedClass: string;
  sectionHeadingClass: string;
  sectionSummaryClass: string;
  sectionButtonClass: string;
  sectionExpandedClass: string;
}

interface ErrorSummary {
  new (module: HTMLElement): ThisType;

  init(): void;
}

interface Radios {
  new (module: HTMLElement): ThisType;

  init(): void;
}

interface Checkboxes {
  new (module: HTMLElement): ThisType;

  init(): void;
}

interface Window {
  LBHFrontend: {
    Accordion: Accordion;
    Radios: Radios;
    Checkboxes: Checkboxes;
    ErrorSummary: ErrorSummary;
  };
}
