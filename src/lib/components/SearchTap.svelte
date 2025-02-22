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
  main {
    padding: 20px;
    background-color: #0a0f1f;
    color: #e0e0e0;
    min-height: 100vh;
  }

  h2 {
    margin-top: 20px;
    color: #86c5ff;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }

  .user-list {
    list-style-type: none;
    padding-left: 0;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .user-card {
    background: linear-gradient(135deg, #2a3d66, #3454a1);
    border: 2px solid #2f3c56;
    padding: 16px;
    width: 90%;
    max-width: 400px;
    border-radius: 8px;
    cursor: pointer;
    display: block;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .user-card:hover {
    background: linear-gradient(135deg, #3454a1, #1f2a48);
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ffffff;
  }

  p {
    font-size: 1rem;
    color: #d1d1d1;
  }

  /* Estilos para la búsqueda */
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    width: 100%;
    max-width: 350px;
    background: linear-gradient(135deg, #1a233a, #2c3e67);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease-in-out;
  }

  .search-bar:hover {
    transform: scale(1.05);
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    background: transparent;
    color: #e0e0e0;
  }

  .search-input::placeholder {
    color: #a0a0b0;
  }

  .search-icon {
    cursor: pointer;
    color: #86c5ff;
    transition: color 0.3s ease;
  }

  .search-icon:hover {
    color: #b0d1ff;
  }
</style>
