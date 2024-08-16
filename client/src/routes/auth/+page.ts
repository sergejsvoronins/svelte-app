import type { PageLoad } from "./$types";

export const load: PageLoad = async (loadEvent) => {
  const { fetch } = loadEvent;
  const userLoggedInStatus = async () => {
    const result = await fetch("http://localhost:8001/api/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    return result;
  };
  const result = await userLoggedInStatus();
  const data = await result.json();

  return data;
};
