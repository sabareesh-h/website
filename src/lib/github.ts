import { Octokit } from "octokit";

export interface GitHubSettings {
  token: string;
  owner: string;
  repo: string;
}

export const getStoredSettings = (): GitHubSettings | null => {
  const token = localStorage.getItem("github_token");
  const owner = localStorage.getItem("github_owner");
  const repo = localStorage.getItem("github_repo");

  if (token && owner && repo) {
    return { token, owner, repo };
  }
  return null;
};

export const createPost = async (
  settings: GitHubSettings,
  path: string,
  content: string,
  message: string
) => {
  const octokit = new Octokit({ auth: settings.token });

  try {
    // Check if file exists to get sha (for update) or just create new
    let sha: string | undefined;
    try {
      const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: settings.owner,
        repo: settings.repo,
        path,
      });
      if (!Array.isArray(data) && data.sha) {
        sha = data.sha;
      }
    } catch (e) {
      // File doesn't exist, which is fine for new posts
    }

    const response = await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner: settings.owner,
      repo: settings.repo,
      path,
      message,
      content: btoa(unescape(encodeURIComponent(content))), // Handle UTF-8 characters
      sha,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
