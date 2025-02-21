<script lang="ts">
import type { UserProfile } from '../types.ts';

export let user: UserProfile;
  </script>
  
  <div class="profile">
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
              <strong>{resource.tag}:</strong> {resource.description}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
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
  
    .tag-language { background-color: #007acc; }  /* Azul */
    .tag-methodology { background-color: #ff9800; }  /* Naranja */
    .tag-library { background-color: #4caf50; }  /* Verde */
  
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
      text-align: center; /* Centra el contenido dentro del perfil */
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
  </style>
  
  