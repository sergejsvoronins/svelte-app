<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { user } from "../user";
  import type { IUser } from "../user";
  $: isLoggedIn = $user !== null ? true : false;
  onMount(async () => {
    const userLoggedInStatus = async () => {
      const result = await fetch("http://localhost:8001/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          //   Accept: "application/json",
          "content-type": "application/json",
        },
      });
      return result;
    };
    const result = await userLoggedInStatus();
    const data = await result.json();

    if (data.success === true) {
      user.update((val: IUser | null) => (val = data.data));
    } else {
      user.update((val: IUser | null) => (val = null));
    }
  });
</script>

{#if isLoggedIn}
  <h2>Thank you for logging in {$user?.username}</h2>
{:else}
  <h2>You need to be logged in here</h2>
  <a href="/login">Log in</a>
  If you don't have account please create a new here:
  <a href="/register">Sign in</a>
{/if}
