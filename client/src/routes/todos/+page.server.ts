export function load({ cookies }) {
  const token = cookies.get("authToken");
  return {
    token: token,
  };
}
