import { getRepos, getCommits } from "../../api/gitHub";

describe("GitHub API", () => {
  describe("getRepos", () => {
    beforeEach(() => fetch.resetMocks());

    it("should call the Repo API and return data successfully", async () => {
      const user = "guilhermeagostinelli";
      fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));
      const res = await getRepos(user);
      expect(res.data).toEqual("12345");
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        `https://api.github.com/users/${user}/repos?per_page=100`
      );
    });

    it("should return an error with the status response if the Repo API fails", async () => {
      const user = "guilhermeagostinelli";
      const httpStatusText = "Bad Request";
      const handleError = jest.fn(statusText => {});
      fetch.mockResponseOnce(httpStatusText, {
        status: 400,
        headers: { "content-type": "application/json" }
      });
      try {
        await getRepos(user);
      } catch (err) {
        handleError(err.message);
      }
      expect(handleError).toHaveBeenCalledTimes(1);
      expect(handleError).toHaveBeenCalledWith(httpStatusText);
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        `https://api.github.com/users/${user}/repos?per_page=100`
      );
    });
  });

  describe("getCommits", () => {
    beforeEach(() => fetch.resetMocks());

    it("should call the Commit API and return data successfully", async () => {
      const user = "guilhermeagostinelli";
      const repo = "levenshtein";
      const page = 1;
      fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));
      const res = await getCommits(user, repo, page);
      expect(res.data).toEqual("12345");
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        `https://api.github.com/repos/${user}/${repo}/commits?per_page=20&page=${page}`
      );
    });

    it("should return an error with the status response if the Commit API fails", async () => {
      const user = "guilhermeagostinelli";
      const repo = "levenshtein";
      const page = 1;
      const httpStatusText = "Bad Request";
      const handleError = jest.fn(statusText => {});
      fetch.mockResponseOnce(httpStatusText, {
        status: 400,
        headers: { "content-type": "application/json" }
      });
      try {
        await getCommits(user, repo, page);
      } catch (err) {
        handleError(err.message);
      }
      expect(handleError).toHaveBeenCalledTimes(1);
      expect(handleError).toHaveBeenCalledWith(httpStatusText);
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        `https://api.github.com/repos/${user}/${repo}/commits?per_page=20&page=${page}`
      );
    });
  });
});
