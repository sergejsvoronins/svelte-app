<script lang="ts">
  import { user } from "../user";
</script>

{#if $user !== null}
  <h2>Thank you for logging in {$user?.username}</h2>
{:else}
  <h2>You need to be logged in here</h2>
  <a href="/login">Log in</a>
  If you don't have account please create a new here:
  <a href="/register">Sign in</a>
{/if}
