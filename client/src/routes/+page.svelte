<script lang="ts">
  import { user } from "../user";
</script>

<h1>Welcome to applications startpage</h1>
{#if $user !== null}
  <h2>Thank you for logging in {$user?.username}</h2>
{/if}
