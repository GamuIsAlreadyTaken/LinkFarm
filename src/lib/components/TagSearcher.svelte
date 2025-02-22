<script>
    export let placeholder = "Buscar...";
    let searchQuery = "";
  
    function handleSearch() {
      //Filtrar Usuarios
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
      bind:value={searchQuery}
      placeholder={placeholder}
      on:input={handleSearch}
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
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </div>
  