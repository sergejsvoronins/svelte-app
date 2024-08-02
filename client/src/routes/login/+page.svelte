<script>
  import Login from "$lib/Login.svelte";
  import user from "../../user";

  $: isLoggedIn = $user === null ? false : true;

  const logout = () => {
    user.update((val) => (val = null));
  };
</script>

<h1>Login</h1>
<a href="/">to start page</a>
{#if isLoggedIn}
  <h2>
    Welcome
    <!-- {$user.firstname} -->
  </h2>
  <input type="button" value="Logout" on:click={logout} />
{:else}
  <h2>Would you like to log in?</h2>
  <Login />
{/if}
