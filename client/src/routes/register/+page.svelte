<script lang="ts">
  import { goto } from "$app/navigation";
  import { Form, TextField, Button } from "svelte-ux";
  type Target = "username" | "passOne" | "passTwo";
  let username = "";
  let passwordOne = "";
  let passwordTwo = "";
  let errorMessage: {
    target?: Target;
    type?: "required" | "notEquil" | "serverError";
    message?: string;
  } = {};
  function registerUser() {
    const fieldsToValidate: { value: string; target: Target }[] = [
      { value: username, target: "username" },
      { value: passwordOne, target: "passOne" },
      { value: passwordTwo, target: "passTwo" },
    ];

    for (const field of fieldsToValidate) {
      if (field.value === "") {
        errorMessage = {
          target: field.target,
          type: "required",
          message: "Field is required",
        };
        return;
      }
    }
    if (passwordOne !== passwordTwo) {
      errorMessage = { type: "notEquil", message: "Passwords are not similar" };
      return;
    }
    try {
      const response = fetch("http://localhost:8001/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          //   Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ username: username, password: passwordOne }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error === true) {
            errorMessage = { type: "serverError", message: data.message };
          } else {
            goto("/login");
          }
        })
        .catch((error) => {
          if (error) {
            console.log("Error: ", error);
          }
        });
    } finally {
    }
  }
</script>

<div class="grid justify-center">
  <h2 class="py-3">Registration</h2>
  <Form on:change={registerUser} class="grid gap-2">
    <TextField
      label="Name"
      bind:value={username}
      type="text"
      error={errorMessage.type === "required" &&
      errorMessage.target === "username"
        ? errorMessage.message
        : false}
    />
    <TextField
      label="Password"
      bind:value={passwordOne}
      type="password"
      error={errorMessage.type === "required" &&
      errorMessage.target === "passOne"
        ? errorMessage.message
        : false}
    />
    <TextField
      label="Repeat password"
      bind:value={passwordTwo}
      type="password"
      error={errorMessage.type === "required" &&
      errorMessage.target === "passTwo"
        ? errorMessage.message
        : false}
    />
    {#if errorMessage.type === "notEquil" || errorMessage.type === "serverError"}
      <div class="error text-xs ml-2 text-danger">
        {errorMessage.message}
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
