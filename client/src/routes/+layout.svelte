<script lang="ts">
  import "../app.css";
  import { AppBar, AppLayout, Button, Dialog, NavItem } from "svelte-ux";
  import Navigation from "../Navigation.svelte";
  import { user } from "../user";
  import { goto } from "$app/navigation";
  interface IResponse {
    success: boolean;
    error: boolean;
    message: string;
  }
  let { children } = $props();
  let open = $state(false);
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

    const data: IResponse = await response.json();
    if (data.success) {
      await goto("/logout");
    } else {
      console.error("Logout response:", data);
    }
  };
</script>

<!-- <AppLayout> -->
<!-- <svelte:fragment slot="nav">
    {#if $user}
      <Navigation />
    {/if}
  </svelte:fragment>
  {#if $user}
    <AppBar class="bg-primary-content text-primary">
      <div slot="actions">
        <Button color="primary" on:click={logout}>Logout</Button>
      </div>
    </AppBar>
  {:else}
    <header class="AppBar px-4 flex items-center relative z-50 myclass">
      <Button color="primary" on:click={() => goto("/login")}>Login</Button>
      <Button color="primary" on:click={() => goto("register")}>Sign in</Button>
    </header>
  {/if} -->
<header class="py-5">
  <nav class="grid grid-flow-col justify-between">
    {#if $user}
      <div class="grid grid-flow-col gap-2">
        <Navigation />
      </div>
      <div>
        <Button color="primary" on:click={() => (open = true)}>Logout</Button>
      </div>
    {:else}
      <div></div>
      <div>
        <Button color="primary" on:click={() => goto("/login")}>Login</Button>
        <Button color="primary" on:click={() => goto("register")}
          >Sign in</Button
        >
      </div>
    {/if}
  </nav>
</header>
<main class="py-5">
  {@render children()}
</main>
<Dialog bind:open>
  <div slot="title">Are you sure you want to logout?</div>
  <div slot="actions">
    <Button variant="fill" color="primary" on:click={logout}>Yes</Button>
    <Button variant="outline" color="primary">Close</Button>
  </div>
</Dialog>
<!-- </AppLayout> -->
