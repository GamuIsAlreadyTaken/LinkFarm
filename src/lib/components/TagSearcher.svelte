<script lang="ts">
  import { filters, listTag } from "$lib/database.svelte";
  import type { Tag } from "$lib/types";

  // Propiedades del componente
  let { tag = $bindable(), onsubmit }: { tag: Tag; onsubmit: () => void } =
    $props();
  let searchInput = $state("");
  let matchingTags;

  // Función para manejar la búsqueda
  function handleSearch() {
    // Obtener las etiquetas que coinciden con el valor de búsqueda
    matchingTags = listTag(filters.tagLike(searchInput));

    // Si hay coincidencias, devolver la primera etiqueta encontrada
    if (matchingTags.length > 0) {
      tag = matchingTags[0]; // Devuelve la primera etiqueta coincidente
    }
  }
</script>

<div class="search-bar">
  <input
    class="search-input"
    bind:value={searchInput}
    placeholder="Buscar..."
    oninput={handleSearch}
    onchange={() => {
      searchInput = tag.name;
      onsubmit();
    }}
  />

  <button
    class="search-button"
    onclick={() => {
      onsubmit();
      searchInput = tag.name;
    }}
  >
    Buscar
  </button>
</div>

<style>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 300px;
    background: #fff;
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 6px;
    font-size: 14px;
  }

  .search-button {
    background-color: #007bff; /* Color de fondo del botón */
    color: white; /* Color del texto */
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  .search-button:hover {
    background-color: #0056b3; /* Color de fondo al pasar el ratón */
  }
</style>
