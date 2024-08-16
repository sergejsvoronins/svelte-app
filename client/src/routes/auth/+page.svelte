<script lang="ts">
  import { goto } from "$app/navigation";
  import { updateUser, user, type IUser } from "../../user";

  export let data: {
    success: boolean;
    error: boolean;
    message: string;
    data: IUser;
  };
  $: console.log("authpage", $user);

  if (data.success === true) {
    updateUser(data.data);

    goto("/");
  } else {
    updateUser(null);
    goto("/login");
  }
</script>
