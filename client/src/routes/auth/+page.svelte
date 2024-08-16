<script lang="ts">
  import { goto } from "$app/navigation";
  import type { IUser } from "../../models";
  import { updateUser } from "../../user";

  export let data: {
    success: boolean;
    error: boolean;
    message: string;
    data: IUser;
  };

  if (data.success) {
    updateUser(data.data);

    goto("/");
  } else {
    updateUser(null);
    goto("/login");
  }
</script>
