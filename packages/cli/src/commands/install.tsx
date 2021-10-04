import fs from "fs";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Newline, Text } from "ink";
import { CloneRepos, MultiSelect, TextInput } from "../components";
import { InstallDependencies } from "../components/install-dependencies/install-dependencies";
import { useApps, useGithub, useToken } from "../hooks";
import type { Repo } from "../types";

const Install = () => {
  const { apps } = useApps();
  const [paToken, setPaToken] = useState("");
  const [password, setPassword] = useState<string | undefined>(undefined);
  const { token, updateToken, removeToken } = useToken(password);
  const { repos, loading, error } = useGithub(token);
  const [activeRepos, setActiveRepos] = useState<Repo[]>([]);
  const [clone, setClone] = useState(false);
  const [install, setInstall] = useState(false);

  useEffect(() => {
    if (error && error.status && error.status >= 400 && error.status < 500) {
      setPassword(undefined);
      setPaToken("");
      removeToken();
    }
  }, [error, removeToken]);

  const { installed, available } = useMemo(() => {
    return repos.reduce(
      (accum, repo) => {
        const app = Object.values(apps).find((app) => repo.name === app.name);
        const appExists = !!app && fs.existsSync(app.path);
        if (appExists) {
          accum.installed.push(repo);
        } else {
          accum.available.push(repo);
        }
        return accum;
      },
      { installed: [] as Repo[], available: [] as Repo[] },
    );
  }, [apps, repos]);

  if (token === "") {
    return (
      <Box flexDirection="column">
        <Text>Please enter your password:</Text>
        <TextInput onSubmit={setPassword} mask />
      </Box>
    );
  }

  if (paToken && password === undefined) {
    return (
      <Box flexDirection="column">
        <Text>(Optional) Please enter a password to access your token:</Text>
        <TextInput
          key="password"
          onSubmit={(input) => {
            updateToken(paToken, input);
            setPassword(input);
          }}
          mask
        />
      </Box>
    );
  }

  if (token === false) {
    return (
      <Box flexDirection="column">
        {error && error.status >= 400 && error.status < 500 && (
          <Text color="red">
            Your Github Personal Access Token is no longer valid, please create a new one
          </Text>
        )}
        <Text>Please enter your Github Personal Access Token:</Text>
        <TextInput key="paToken" onSubmit={setPaToken} />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box>
        <Text>Loading Repos from Github...</Text>
      </Box>
    );
  }

  if (available.length === 0) {
    <Box>
      <Text>No new apps are available to install.</Text>
    </Box>;
  }

  if (clone) {
    return (
      <CloneRepos
        repos={activeRepos}
        onComplete={(repos) => {
          setActiveRepos(repos);
          setInstall(true);
          setClone(false);
        }}
      />
    );
  }

  if (install) {
    return (
      <InstallDependencies
        repos={activeRepos}
        onComplete={() => {
          // exit();
        }}
      />
    );
  }

  return (
    <Box flexDirection="column">
      {installed.length > 0 && (
        <Box flexDirection="column">
          <Text>Installed Apps:</Text>
          {installed.map((repo) => (
            <Text key={repo.id} color="green">
              {repo.full_name}
            </Text>
          ))}
          <Newline />
        </Box>
      )}
      <MultiSelect
        items={available.map((repo) => ({
          value: repo.full_name,
          label: repo.full_name,
        }))}
        onSubmit={(names) => {
          setActiveRepos(available.filter((repo) => names.includes(repo.full_name)));
          setClone(true);
        }}
      />
    </Box>
  );
};

export default Install;
