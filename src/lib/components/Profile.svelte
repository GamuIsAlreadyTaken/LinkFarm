<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import { postPost } from "$lib/database.svelte";
  import type { Tag, UserProfile } from "$lib/types.ts";
  import TagCreater from "./TagCreater.svelte";
  import TagSearcher from "./TagSearcher.svelte";

  let { user }: { user: UserProfile } = $props();

  let toggle = $state(false);
  let string: Tag | undefined = $state();
</script>

<div class="profile">
  <div class="profile-content">
    <h2 class="profile-name">{user.name}</h2>
    <p class="profile-contact">📧 Contacto: {user.contactData}</p>

    <h3>📌 Publicaciones:</h3>
    {#each user.posts as post}
      <Post {post} {user} />
    {/each}
  </div>
</div>

{#if !toggle}
  <input type="checkbox" bind:checked={toggle} />
{:else}
  <TagSearcher
    bind:tag={string}
    onsubmit={() => {
      toggle = !toggle;
      postPost(user, { tag: string! });
    }}
  ></TagSearcher>
{/if}

<style>
  :global(body) {
    background-color: #121212; /* Fondo oscuro general */
    color: #ffff; /*Texto lanco por defecto */
    font-family: "Arial", sans-serif;
  }

  .profile {
    padding: 2rem;
    border: 1px solid #333333;
    border-radius: 16px;
    background-color: #1e1e1e; /* Fondo oscuro para el contenedor */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
    width: max(50vw, 600px);
    margin: 2rem auto;
    text-align: center;
  }

  .profile-name {
    font-size: 2rem;
    font-weight: 700;
    color: #ffff;
    margin-bottom: 1rem;
  }

  .profile-contact {
    font-size: 1.1rem;
    color: #b0b0b0; /* Texto gris claro */
    margin-bottom: 1.5rem;
  }

  input {
    visibility: hidden;
  }

  input::before {
    content: "+";
    display: inline-block;
    width: 30px;
    aspect-ratio: 1/1;
    background-color: #784aec;
    visibility: visible;
    text-align: center;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
