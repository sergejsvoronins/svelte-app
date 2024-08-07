<script lang="ts">
  import { Button } from "@sveltestrap/sveltestrap";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { user } from "../../user";

  interface ITodoResponse {
    id: number;
    title: string;
    is_done: number;
    user_id: number;
  }
  let title: string;
  let todoList: { id: number; title: string; is_done: boolean }[] = [];
  onMount(async () => {
    const res = await fetch(
      `http://localhost:8001/user/${$user?.userId}/todos`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
    const resData: ITodoResponse[] = await res.json();
    todoList = resData.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        is_done: todo.is_done === 1 ? true : false,
      };
    });
  });
</script>

<ol>
  {#each todoList as todo}
    <li>
      {todo.title}
    </li>
  {/each}
</ol>
