<script lang="ts">
    import type { Post } from "$lib/types.ts";

    let { post }: { post: Post } = $props();
</script>

<h2 class="tag">{post.tag.name}</h2>
<div>
    {#each post.resources as des}
        <p class="des">{@html des.description}</p>
    {/each}
</div>

<style>
    .tag {
        font-size: 24px;
        font-weight: bold;
        color: white;
        background-color: #ff5733;
        padding: 10px;
        border-radius: 8px;
        display: inline-block;
    }

    .des {
        text-decoration: none;
        color: #333;
        font-size: 18px;
        padding: 5px 10px;
        background: #f1c40f;
        border-radius: 5px;
        transition: background 0.3s ease;
    }
</style>
