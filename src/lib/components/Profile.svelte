<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import type { UserProfile } from "$lib/types.ts";

  let { user }: { user: UserProfile } = $props();
</script>

<div class="profile">
  <div class="profile-content">
    <h2 class="profile-name">{user.name}</h2>
    <p class="profile-contact">📧 Contacto: {user.contactData}</p>

    <h3>📌 Publicaciones:</h3>
    {#each user.posts as post}
      <Post {post} />
    {/each}
  </div>
</div>

<style>
  :global(body) {
    background-color: #121212; /* Fondo oscuro general */
    color: #ffffff; /* Texto blanco por defecto */
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
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .profile-contact {
    font-size: 1.1rem;
    color: #b0b0b0; /* Texto gris claro */
    margin-bottom: 1.5rem;
  }

  
</style>
