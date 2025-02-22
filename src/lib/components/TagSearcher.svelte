<script lang="ts">
	import { filters, listTags } from '$lib/database';
	
    // Propiedades del componente
    let { tag = $bindable(), onsubmit } = $props();
    let searchInput = $state("")
    
    // Función para manejar la búsqueda
    function handleSearch() {
      // Obtener las etiquetas que coinciden con el valor de búsqueda
      const matchingTags = listTags(filters.tagLike(searchInput));
  
      // Si hay coincidencias, devolver la primera etiqueta encontrada
      if (matchingTags.length > 0) {
        tag = matchingTags[0]; // Devuelve la primera etiqueta coincidente
      }
    }
  </script>
  
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
  
    .search-icon {
      cursor: pointer;
      color: #666;
    }
  </style>
  
  <div class="search-bar">
    <input
      type="text"
      class="search-input"
      bind:value={searchInput}
      placeholder="Buscar..."
      oninput={handleSearch}
    />

    <svg
      class="search-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      onclick={onsubmit}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </div>