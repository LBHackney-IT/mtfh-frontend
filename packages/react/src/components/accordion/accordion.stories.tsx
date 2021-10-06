import React from "react";

import { Accordion, AccordionItem } from "./accordion";

export default {
  title: "Accordion",
  component: Accordion,
};

export const Base = () => {
  return (
    <Accordion id="accordion-1">
      <AccordionItem id="item-1" title="Item 1">
        Description 1
      </AccordionItem>
      <AccordionItem id="item-2" title="Item 2">
        Description 2
      </AccordionItem>
      <AccordionItem id="item-3" title="Item 3">
        Description 3
      </AccordionItem>
    </Accordion>
  );
};

export const AccordionWithVisuallyHiddenControls = () => {
  return (
    <Accordion id="accordion-2" visuallyHideControls>
      <AccordionItem id="item-4" title="Item 1">
        Description 1
      </AccordionItem>
      <AccordionItem id="item-5" title="Item 2">
        Description 2
      </AccordionItem>
      <AccordionItem id="item-6" title="Item 3">
        Description 3
      </AccordionItem>
    </Accordion>
  );
};
