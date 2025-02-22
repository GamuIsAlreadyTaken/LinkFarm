<script lang="ts">
  import { getUserProfile } from "$lib/database";
  import Post from "$lib/components/Post.svelte";
  import type { UserProfile } from "$lib/types.ts";

  let { quary, userName } = $props();
  let user: UserProfile | undefined = getUserProfile(userName.contactData);

  if (!user) {
    console.error(`No se encontró un usuario con el nombre ${userName}`);
  }
</script>

<div class="profile-container">
  <div class="gradient-overlay"></div>
  <div class="profile-content">
    {#if user}
      <h2>{user.name}</h2>
      <p>📧 Contacto: {user.contactData}</p>

      <h3>📌 Publicaciones:</h3>
      {#each user.posts as post}
        <Post {post} />
      {/each}
    {:else}
      <p>Usuario no encontrado.</p>
    {/if}
  </div>
</div>

<button on:click={quary}>
  Buscar
</button>

<style>
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    position: relative;
    background-image: url('https://gradiant.org/wp-content/uploads/2015/12/analisis_multimedia.webp'); /* Imagen de fondo */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }

  .profile-content {
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.3); /* Borde semi-transparente */
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 2;
    color: white; /* Color del texto */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Sombra para mejorar la legibilidad */
  }

  button {
    margin-top: 1rem;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
</style>