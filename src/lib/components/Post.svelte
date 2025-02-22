<script lang="ts">
  import { postResource } from "$lib/database.svelte";

  import type {
    Post,
    Resource,
    ResourceType,
    UserProfile,
  } from "$lib/types.ts";

  let { post, user }: { post: Post; user: UserProfile } = $props();

  let toggle = $state(false);
  let description = $state("");
  let reference = $state("");
  let type: ResourceType = $state("docs");
</script>

<div class="post-container">
  <div>
    <h2 class="tag">{post.tag.name}</h2>
    <input type="checkbox" bind:checked={toggle} class="Giro"/>
  </div>
  {#if toggle}
    <input type="text" placeholder="Enlace al recurso" bind:value={reference} />
    <input
      type="text"
      placeholder="Descripcion del recurso"
      bind:value={description}
    />
    <select bind:value={type}>
      <option value="experience">experience</option>
      <option value="project">project</option>
      <option value="bug">bug</option>
      <option value="docs">docs</option>
    </select>
    <button
      onclick={() => {
        toggle = !toggle;
        postResource(user, post.tag, { description, reference, type });
      }}>Guardar</button
    >
  {/if}
  <div class="resources-container">
    {#each post.resources as des}
      <a class="des" href={des.reference} target="_blank">{des.description}</a>
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
    text-deration: none;
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

 .Giro {
    visibility: hidden;
  }

  .Giro:checked::before{
    rotate: 45deg;
  }

  .Giro::before {
    content: "+";
    display: inline-block;
    border-radius: 50%;
    font-size:1.5em;
    width: 30px;
    transition: rotate 300ms ease;
    aspect-ratio: 1/1;
    background-color: #784aec;
    visibility: visible;
    text-align: center;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

</style>
