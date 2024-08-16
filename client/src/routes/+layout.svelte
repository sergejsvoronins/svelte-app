<script lang="ts">
  import { goto } from "$app/navigation";
  import { updateUser, user, type IUser } from "../user";

  // let {children} = $props();

  // const logout = async () => {
  //   const response = await fetch("http://localhost:8001/api/logout", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "content-type": "application/json",
  //     },
  //   });
  //   const data = await response.json();
  //   if (data.success === true) {
  //     updateUser(null);

  //     await goto("/");
  //   }
  // };
  const logout = async () => {
    const response = await fetch("http://localhost:8001/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle any potential errors based on status code
      console.error("Logout failed", response.status);
      return;
    }

    const data = await response.json();
    if (data.success === true) {
      // updateUser(null);
      await goto("/logout");
    } else {
      console.error("Logout response:", data);
    }
  };
</script>

<h1>Welcome to application</h1>
<a href="/">to start page</a>
{#if $user}
  <a href="/todos">See your todos</a>
  <input type="button" value="Logout" onclick={logout} />
{:else}
  <a href="/login">Login</a>
  <a href="/register">Sign in</a>
{/if}

<!-- {@render children()} -->
<slot />
<h1>Application Footer</h1>
