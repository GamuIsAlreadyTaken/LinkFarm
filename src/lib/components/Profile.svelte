<script lang="ts">
  import { getUserProfile } from '$lib/database'; 
  import type { UserProfile } from '../types.ts';

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
      <div class="post">
        <span class="tag tag-{post.tag.type}">
          #{post.tag.name} ({post.tag.type})
        </span>

        <ul>
          {#each post.resources as resource}
            <li>
              <strong>{resource.type}:</strong> {resource.description}
            </li>
          {/each}
        </ul>
      </div>
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

  .tag {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    color: white;
  }

  .tag-language { background-color: #007acc; }
  .tag-methodology { background-color: #ff9800; }
  .tag-library { background-color: #4caf50; }

  .post {
    margin-top: 1rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  ul {
    padding-left: 20px;
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
