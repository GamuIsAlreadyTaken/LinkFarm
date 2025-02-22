<script lang="ts">
    import  {postPost} from "$lib/database.svelte"
let {user} = $props();
let Nombretag = $state()
</script>

<input type="text" bind:value={Nombretag}>
<h2>{Nombretag}</h2>


