<script lang="ts">
  import SearchBar from "$lib/components/TagSearcher.svelte";
  import { listUserProfile, filters } from "$lib/database";
  import type { Tag, UserProfile } from "$lib/types";
  import Profile from "./Profile.svelte";

  let tag: Tag | undefined = $state();
  let users : UserProfile[] = $props();


  function handleSearchSubmit() {
    users = listUserProfile(filters.postHasTag(tag!)); // Asegúrate de que `listUserProfile` devuelva un valor
    
    }
  const handleUserClick = (user: UserProfile) => {
    //Cambiar al perfil
  };
</script>

<SearchBar bind:tag onsubmit={handleSearchSubmit} />

<h2>Usuarios</h2>
<ul>
  {#each users as user}
    <li>
      <button onclick={() => handleUserClick(user)} class="user-card">
        <h3>{user.name}</h3>
        <p>{user.contactData}</p>
      </button>
    </li>
  {/each}
</ul>

<style>
  main {
    padding: 20px;
  }

  h2 {
    margin-top: 20px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 10px;
  }

  .user-card {
    background: #fff;
    border: 2px solid #ccc;
    padding: 10px;
    cursor: pointer;
    display: block;
    margin: 5px 0;
    transition: background-color 0.3s ease;
  }

  .user-card:hover {
    background-color: #f0f0f0;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
</style>
