<script lang="ts">
  import { getUserProfile } from '$lib/database'; 
  import Post from '$lib/components/Post.svelte'
  import type { UserProfile } from '$lib/types.ts';

  let {quary, userName} = $props();
  let user: UserProfile | undefined = getUserProfile(userName.contactData);

  if (!user) {
    console.error(`No se encontró un usuario con el nombre ${userName}`);
  }
</script>

<div class="profile">
  {#if user}
    <h2>{user.name}</h2>
    <p>📧 Contacto: {user.contactData}</p>

    <h3>📌 Publicaciones:</h3>
    {#each user.posts as post}
     <Post {post}/>
    {/each}
  {:else}
    <p>Usuario no encontrado.</p>
  {/if}
</div>

<button on:click={quary}>
  Buscar
</button>

<style>


  .profile {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;

    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
