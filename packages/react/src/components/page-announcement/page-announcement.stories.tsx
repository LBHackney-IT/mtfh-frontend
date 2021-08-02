import React from "react";

import { Button } from "../button";
import { PageAnnouncementProvider, usePageAnnouncement } from "./context";
import { PageAnnouncement } from "./page-announcement";

export default {
  title: "Page Announcement",
  component: PageAnnouncement,
};

export const Base = () => {
  return (
    <PageAnnouncement
      heading="Person added"
      description="More detail about the announcement."
    />
  );
};

export const PageAnnouncementWarning = () => {
  return (
    <PageAnnouncement
      variant="warning"
      heading="Payment unsuccessful"
      description="More detail about the announcement."
    />
  );
};

export const PageAnnouncementInfo = () => {
  return (
    <PageAnnouncement
      variant="info"
      heading="Info"
      description="More detail about the announcement."
    />
  );
};

export const PageAnnouncementWithProvider = () => {
  const Action = () => {
    const { addAnnouncement, clearAnnouncement } = usePageAnnouncement();
    return (
      <>
        <div>
          <Button onClick={() => addAnnouncement({ heading: "Person Added" })}>
            Add
          </Button>
        </div>
        <div>
          <Button onClick={() => clearAnnouncement()}>Clear</Button>
        </div>
      </>
    );
  };

  return (
    <PageAnnouncementProvider sessionKey="person">
      <PageAnnouncement />
      <Action />
    </PageAnnouncementProvider>
  );
};
