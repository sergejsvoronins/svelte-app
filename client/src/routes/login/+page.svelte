<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button, Field, Form, TextField } from "svelte-ux";
  export let username = "";
  export let password = "";
  let loginErr: {
    input?: "username" | "password" | "default";
    status: boolean;
    message?: string;
  } = { status: false };
  function reset() {
    username = "";
    password = "";
  }
  const logIn = async () => {
    if (username === "") {
      loginErr = {
        input: "username",
        status: true,
        message: "Username is required",
      };
      return;
    }
    if (password === "") {
      loginErr = {
        input: "password",
        status: true,
        message: "Password is required",
      };

      return;
    }
    const response = await fetch(`http://localhost:8001/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        //   Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          goto("/auth");
        } else {
          loginErr = {
            ...loginErr,
            input: "default",
            status: true,
            message: "Incorrect credentials",
          };
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
</script>

<div class="grid justify-center">
  <h1 class="py-3">Login</h1>
  <Form on:change={logIn} class="grid gap-2">
    <TextField
      label="Name"
      bind:value={username}
      type="text"
      error={loginErr.status && loginErr.input === "username"
        ? loginErr.message
        : false}
    />
    <TextField
      label="Password"
      bind:value={password}
      type="password"
      error={loginErr.status && loginErr.input === "password"
        ? loginErr.message
        : false}
    />
    {#if loginErr.input === "default" && loginErr.status}
      <div class="error text-xs ml-2 text-danger py-1">
        Credentials are incorrect
      </div>
    {/if}
    <div>
      <Button type="submit" variant="fill" color="primary">Submit</Button>
      <Button
        type="reset"
        variant="outline"
        color="primary"
        on:click={() => goto("/")}>Cancel</Button
      >
    </div>
  </Form>
</div>
