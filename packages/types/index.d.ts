declare module "lbh-frontend" {
  export class Accordion {
    constuctor(module: HTMLElement)

    init(): void

    setExpanded(expanded: boolean, section: HTMLElement | null): void

    isExpanded(section: HTMLElement | null): boolean

    $sections: NodeListOf<HTMLElement>

    controlsClass: string
    openAllClass: string
    iconClass: string
    sectionHeaderClass: string
    sectionHeaderFocusedClass: string
    sectionHeadingClass: string
    sectionSummaryClass: string
    sectionButtonClass: string
    sectionExpandedClass: string
  }

  export class ErrorSummary {
    constuctor(module: HTMLElement)

    init(): void
  }

  export class Radios {
    constuctor(module: HTMLElement)

    init(): void
  }

  export class Checkboxes {
    constuctor(module: HTMLElement)

    init(): void
  }
}
interface Window {
  LBHFrontend: {
    Accordion: Accordion
    Radios: Radios
    Checkboxes: Checkboxes
    ErrorSummary: ErrorSummary
  }
}
