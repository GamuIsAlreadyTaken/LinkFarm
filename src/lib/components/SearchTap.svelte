<script lang="ts">
  import SearchBar from "$lib/components/TagSearcher.svelte";
  import { listUserProfile, filters } from "$lib/database";
  import type { Tag, UserProfile } from "$lib/types";
  import Profile from "./Profile.svelte";

  let tag: Tag | undefined = $state();
  let users: UserProfile[] | undefined = $state();
  let { user = $bindable(), clickpro } = $props();

  function handleSearchSubmit() {
    users = listUserProfile(filters.postHasTag(tag!)); // Asegúrate de que `listUserProfile` devuelva un valor
  }
  const handleUserClick = (us: UserProfile) => {
    user = us;
    clickpro();
  };
</script>

<SearchBar bind:tag onsubmit={handleSearchSubmit} />

<h2>Usuarios</h2>

{#each users! as us}
  <li>
    <button onclick={() => handleUserClick(us)} class="user-card">
      <h3>{us.name}</h3>
      <p>{us.contactData}</p>
    </button>
  </li>
{/each}

<style>
  :global(body) {
    background-color: #121212; /* Fondo oscuro general */
    color: #ffffff; /* Texto blanco por defecto */
    font-family: 'Arial', sans-serif;
  }

  .profile {
    padding: 2rem;
    border: 1px solid #333333;
    border-radius: 16px;
    background-color: #1e1e1e; /* Fondo oscuro para el contenedor */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
    max-width: 600px;
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

  .profile-posts-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1.5rem;
  }

  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .profile-not-found {
    font-size: 1.2rem;
    color: #ff6b6b; /* Rojo suave para errores */
    text-align: center;
    margin: 2rem 0;
  }

  .search-button {
    display: block;
    margin: 2rem auto;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(135deg, #6a11cb, #2575fc); /* Gradiente moderno */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }

  .search-button:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  .search-button:active {
    transform: translateY(0);
  }
</style>
