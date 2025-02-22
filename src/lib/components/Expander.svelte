<script lang="ts">
    let { head, body, oppened = $bindable(false) } = $props();
</script>

<div class="expander">
    <button onclick={() => (oppened = !oppened)}>
        {@render head()}
    </button>
    <div class:oppened>
        {@render body()}
    </div>
</div>

<style>
    .expander {
        display: flex;
        flex-direction: column;
    }
    div div {
        transition: scale 300ms ease;
        background-color: white;
        color: black;
        transform-origin: top;
    }

    div div.oppened {
        scale: 1 1 1;
    }

    div div:not(.oppened) {
        scale: 1 0 1;
    }
</style>
