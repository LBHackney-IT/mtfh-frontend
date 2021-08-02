import React, { useState } from "react";

import { Button } from "../button";
import { Link } from "../link";
import { Text } from "../text";
import { Dialog, DialogActions } from "./dialog";

export default {
  title: "Dialog",
  component: Dialog,
};

export const Base = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        isOpen={open}
        onDismiss={() => setOpen(false)}
        title="Announcement"
      >
        <Text>This is a dialog</Text>
      </Dialog>
    </>
  );
};

export const DialogWithActions = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        isOpen={open}
        onDismiss={() => setOpen(false)}
        title="Are you sure?"
      >
        <Text>Confirmation is required.</Text>
        <DialogActions>
          <Button>Yes</Button>
          <Link as="button" onClick={() => setOpen(false)}>
            Cancel
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};
