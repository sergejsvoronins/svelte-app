<script lang="ts">

  import Footer from "../Footer.svelte";
  import Navigation from "../Navigation.svelte";

  let {children} = $props();

</script>


<Navigation />
{@render children()}
<Footer />
