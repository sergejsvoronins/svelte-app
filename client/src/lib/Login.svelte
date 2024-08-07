<script lang="ts">
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  export let username: string;
  export let password: string;
  let currentError = null;
  // export async function handleLogin() {
  //   const response = await fetch("http://localhost:8001/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ username: user.username, pass: user.pass }),
  //   })
  //     .then((res) => {
  //       if (res.status > 299) currentError = "Error with server response";
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data) {
  //         user.authirized = true;
  //         user.userId = data.userId;
  //         goto(`/todos`);
  //       }
  //     })
  //     .catch((error) => {
  //       if (error) {
  //         currentError = error;
  //         console.log("Error: ", error);
  //       }
  //     });
  // }
</script>

<form use:enhance method="POST" action="?/login">
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
