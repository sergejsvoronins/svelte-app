<script lang="ts">
  import { goto } from "$app/navigation";
  let username = "";
  let passwordOne = "";
  let passwordTwo = "";
  let errorMessage = "";
  function registerUser() {
    if (passwordOne !== passwordTwo) {
      errorMessage = "Passwords not match";
      return;
    }
    try {
      const response = fetch("http://localhost:8001/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username: username, password: passwordOne }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.error === true) {
            errorMessage = data.message;
            throw new Error(data.message);
          }
        })
        .then(async () => await goto("/login"))
        .catch((error) => {
          if (error) {
            console.log("Error: ", error);
          }
        });
    } finally {
    }
  }
</script>

<h2>Registration</h2>
<form on:submit|preventDefault={registerUser}>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" bind:value={username} />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" bind:value={passwordOne} />
  </div>
  <div>
    <label for="password">Repeat password</label>
    <input type="password" id="password" bind:value={passwordTwo} />
  </div>
  <div>{errorMessage}</div>
  <button type="submit">Submit</button>
</form>
