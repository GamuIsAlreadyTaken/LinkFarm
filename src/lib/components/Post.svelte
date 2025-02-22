<script lang="ts">
    import { postTag } from "$lib/database.svelte";
    import type { Post } from "$lib/types.ts";
  
    let { post }: { post: Post } = $props();

    let toggle = $state(false)
  </script>
  
  <div class="post-container">
    <div class="resources-container">
      {#each post.resources as des}
        <a class="des" href="{des.reference}" target="_blank">{des.description}</a>
      {/each}
    </div>
    
  </div>
  
  <style>
    .post-container {
      background-color: #333333;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      margin: 20px auto;
    }
  
    .tag {
      font-size: 24px;
      font-weight: bold;
      color: white;
      background-color: #333;
      padding: 10px 20px;
      border-radius: 8px;
      display: inline-block;
      margin: 0 0 15px 0;
    }
  
    .resources-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .des {
      text-decoration: none;
      color: #333;
      font-size: 18px;
      padding: 10px;
      background: #7864d3;
      border-radius: 5px;
      transition: background 0.3s ease;
      margin: 0;
    }
  
    .des:hover {
      background: #784aec;
      cursor: pointer;
    }
  </style>