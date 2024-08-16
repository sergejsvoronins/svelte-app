import { redirect } from "@sveltejs/kit";
import { updateUser, user } from "../../user";

export async function load() {
  const response = await fetch("http://localhost:8001/api/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  if (data.success === true) {
    updateUser(null);
    redirect(302, "/");
  }
}
