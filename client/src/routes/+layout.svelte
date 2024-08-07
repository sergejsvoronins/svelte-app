<script lang="ts">
  import { goto } from "$app/navigation";
  import { user } from "../user";
  const logout = async () => {
    await fetch("http://localhost:8001/api/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    });
    user.update((val) => (val = null));
    await goto("/");
  };
</script>

<h1>Welcome to application</h1>
<a href="/">to start page</a>
{#if $user}
  <a href="/todos">See your todos</a>
  <input type="button" value="Logout" on:click={logout} />
{:else}
  <a href="/login">Login</a>
  <a href="/sign in">Sign in</a>
{/if}

<slot />
<h1>Application Footer</h1>
