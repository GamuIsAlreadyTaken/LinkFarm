<script lang="ts">
  import { postResource } from "$lib/database.svelte";

  import type {
    Post,
    Resource,
    ResourceType,
    UserProfile,
  } from "$lib/types.ts";

  const restype: Record<ResourceType, string> = {
    bug: "🪳",
    docs: "📄",
    experience: "🧪",
    project: "🛠️",
  };

  let { post, user }: { post: Post; user: UserProfile } = $props();

  let toggle = $state(false);
  let description = $state("");
  let reference = $state("");
  let type: ResourceType = $state("docs");
</script>

<div class="post-container">
  <div class="bottom-down">
    <h2 class="tag">{post.tag.name}</h2>
    <label class="icon">
      <input type="checkbox" bind:checked={toggle} />
    </label>
  </div>
  {#if toggle}
    <div class="container">
      <input
        type="text"
        placeholder="Enlace al recurso"
        bind:value={reference}
        class="input-spacing"
      />
      <input
        type="text"
        placeholder="Descripcion del recurso"
        bind:value={description}
        class="input-spacing"
      />
      <select bind:value={type} class="input-spacing">
        <option value="experience">experience</option>
        <option value="project">project</option>
        <option value="bug">bug</option>
        <option value="docs">docs</option>
      </select>
      <button
        onclick={() => {
          toggle = !toggle;
          postResource(user, post.tag, { description, reference, type });
        }}
        class="input-spacing">Guardar</button
      >
    </div>
  {/if}
  <div class="resources-container">
    {#each post.resources as des}
      <a class="des" href={des.reference} target="_blank">
        <span>{restype[des.type]}</span>{des.description}
      </a>
    {/each}
  </div>
</div>

<style>
  .bottom-down {
    height: 50px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .container {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 10px;
    display: flex;
    flex-direction: column;


  }

  input, select, button {
    border: none;
    border-radius: 5px;
    height: 2em;
  }

  input::placeholder {
    color: white;
    font-style: italic;
    opacity: 1;
  }

  .input-spacing {
    background: #7864d3;
    color: white;
    margin-bottom: 10px;
    background: #7864d3;
    color: white;
  }

  .post-container {
    position: relative;
    background-color: #333333;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
    width: min(60%, 600px)
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
  .resources-container a {
    text-decoration: none;
  }

  .des {
    color: white;
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

  .icon {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .icon input {
    visibility: hidden;
  }

  .icon:has(input:checked)::before {
    rotate: 45deg;
  }

  .icon:has(input)::before {
    content: "+";
    display: inline-block;
    border-radius: 50%;
    font-size: 1.5em;
    width: 40px;
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
