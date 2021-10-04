import path from "path";
import { useEffect, useState } from "react";
import { $apps } from "../store";
import type { AppConfig, Repo } from "../types";

const requiredApps = [
  "mtfh-frontend-root",
  "mtfh-frontend-authentication",
  "mtfh-frontend-header",
  "mtfh-frontend-common",
];

const add = (repos: Repo[], cwd: string) => {
  const apps = $apps.getValue();
  const update = repos.reduce((accum, repo) => {
    accum[repo.name] = {
      path: path.join(cwd, repo.name),
      name: repo.name,
      required: requiredApps.includes(repo.name),
    };
    return accum;
  }, {} as AppConfig);
  $apps.next({ ...apps, ...update });
};

const register = (projects: { name: string; path: string }[]) => {
  const apps = $apps.getValue();
  const update = projects.reduce((accum, project) => {
    accum[project.name] = { ...project, required: requiredApps.includes(project.name) };
    return accum;
  }, {});
  console.log("writing", Object.keys(update));
  $apps.next({ ...apps, ...update });
};

export const useApps = () => {
  const [apps, setApps] = useState($apps.getValue());

  useEffect(() => {
    const sub = $apps.subscribe(setApps);
    return () => sub.unsubscribe();
  }, []);

  return { apps, add, register };
};
