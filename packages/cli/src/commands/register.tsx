import fs from "fs";
import path from "path";

import React, { useEffect, useState } from "react";

import { Box, Text } from "ink";

import { MultiSelect } from "../components";
import { useApps } from "../hooks";
import { getPath } from "../utils";

interface RegisterCommandProps {
  dir: string;
}

const RegisterCommand = ({ dir }: RegisterCommandProps) => {
  const { register } = useApps();
  const [fullPath, setFullPath] = useState("");
  const [folders, setFolders] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    getPath(dir || ".").then(setFullPath);
  }, [dir]);

  useEffect(() => {
    if (fullPath) {
      const directories = fs
        .readdirSync(fullPath, { withFileTypes: true })
        .filter((value) => fs.lstatSync(path.join(fullPath, value.name)).isDirectory())
        .filter((value) => value.name.indexOf("mtfh-frontend-") === 0)
        .map((value) => value.name);

      setFolders(directories);
    }
  }, [fullPath]);

  useEffect(() => {
    if (projects.length > 0) {
      register(
        projects.map((project) => ({
          name: project,
          path: path.join(fullPath, project),
        })),
      );
    }
  }, [projects, fullPath, register]);

  if (!fullPath) {
    return null;
  }

  if (folders.length === 0) {
    return <Text color="red">No projects found in the directory {fullPath}</Text>;
  }

  if (folders.length > 0 && projects.length === 0) {
    return (
      <Box flexDirection="column">
        <Text>Please enter the directory to register:</Text>
        <MultiSelect
          items={folders.map((folderDir) => ({ value: folderDir, label: folderDir }))}
          onSubmit={setProjects}
        />
      </Box>
    );
  }

  return null;
};

export default RegisterCommand;
