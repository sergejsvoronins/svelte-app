<script lang="ts">
  import { goto } from "$app/navigation";

  interface IUser {
    username: string;
    pass: string;
    authirized: boolean;
  }
  let token = "";
  let user: IUser = {
    username: "",
    pass: "",
    authirized: false,
  };
  let currentError = null;
  const login = () => {
    fetch("http://localhost:8001/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username: user.username, pass: user.pass }),
    })
      .then((res) => {
        if (res.status < 299) return res.json();
        if (res.status > 299) currentError = "Error with server response";
      })
      .then((data) => {
        user.authirized = true;
        token = data;
        if (data) {
          goto("/todos");
        }
      })
      .catch((error) => {
        if (error) {
          currentError = error;
          console.log("Error: ", error);
        }
      });
  };
</script>

<form method="POST" on:submit|preventDefault={login}>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" bind:value={user.username} />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" bind:value={user.pass} />
  </div>
  <button type="submit">Submit</button>
</form>
