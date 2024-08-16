<script lang="ts">
  import { goto } from "$app/navigation";
  import { user, type IUser } from "../../user";
  export let username = "";
  export let password = "";

  const logIn = async () => {
    const response = await fetch(`http://localhost:8001/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        //   Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await response.json();

    if (data.success === true) {
      await goto("/auth");
    }
  };
</script>

<h1>Login</h1>

<form onsubmit={logIn}>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" bind:value={username} />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" bind:value={password} />
  </div>
  <button type="submit">Submit</button>
</form>
