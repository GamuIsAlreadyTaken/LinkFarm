<script lang="ts">
  import { getUserProfile } from '$lib/database'; 
  import Post from '$lib/components/Post.svelte'
  import type { UserProfile } from '$lib/types.ts';

  // Variable que almacenará el perfil de usuario, queremos que nos lo pasen de la otra página 
  export let userName: string;

  // Obtén el perfil del usuario usando el nombre proporcionado
  let user: UserProfile | undefined = getUserProfile(userName);

  // Si no hay usuario con ese nombre, muestra un mensaje de error
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

<style>
  .profile {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 400px;
  }

  .profile {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
