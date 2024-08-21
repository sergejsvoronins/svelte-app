<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button, NavItem } from "svelte-ux";
  import { user } from "./user";
  import { page } from "$app/stores";
</script>

<NavItem
  text="Home"
  currentUrl={$page.url}
  path="/"
  classes={{ root: "p-3", active: "bg-primary/10 text-primary" }}
/>
<NavItem
  text="Todos"
  currentUrl={$page.url}
  path="/todos"
  classes={{ root: "p-3", active: "bg-primary/10 text-primary" }}
/>
