import { useEffect, useState } from "react";

import { throttling } from "@octokit/plugin-throttling";
import { RequestError } from "@octokit/request-error";
import { Octokit } from "@octokit/rest";
import { RequestOptions } from "@octokit/types";

import type { Repo } from "../types";

Octokit.plugin(throttling);

const createOctokit = (token: string) =>
  new Octokit({
    auth: token,
    throttle: {
      onRateLimit: (
        retryAfter: number,
        options: RequestOptions & { request: { retryCount: number } },
      ) => {
        console.log(
          `Request quota exhausted for request ${options.method} ${options.url}`,
        );

        // Retry twice after hitting a rate limit error, then give up
        if (options.request.retryCount <= 2) {
          console.log(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
      },
      onAbuseLimit: (retryAfter: number, options: RequestOptions) => {
        // does not retry, only logs a warning
        console.log(`Abuse detected for request ${options.method} ${options.url}`);
        console.log(`Retryable in ${retryAfter}`);
      },
    },
  });

export const useGithub = (token?: string | false) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<RequestError>();

  useEffect(() => {
    if (!token) {
      return;
    }
    const octokit = createOctokit(token);
    const fetchApps = async (page = 1) => {
      // Fetch repos sorted name in asc order
      const res = await octokit.rest.repos.listForOrg({
        org: "LBHackney-IT",
        sort: "full_name",
        per_page: 40,
        direction: "asc",
        page,
      });

      // Only looking for mtfh-frontend- prefixed repos
      const mtfhRepos = res.data.filter(
        ({ name }) => name.toLowerCase().indexOf("mtfh-frontend-") === 0,
      );

      // Check if we should continue paging results
      const [lastRepo] = res.data.slice(-1);

      if (res.data.length === 40 && lastRepo.name[0].toLowerCase() <= "m") {
        mtfhRepos.push(...(await fetchApps(page + 1)));
      }
      return mtfhRepos;
    };

    fetchApps()
      .then((mtfhRepos) => {
        setRepos(mtfhRepos);
        setLoading(false);
      })
      .catch(setError);
  }, [token]);

  return { repos, loading, error };
};
