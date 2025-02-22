<script lang="ts">
    import { getUserProfile } from "$lib/database";

    let { goSearcher, user = $bindable() } = $props();
    let login = $state("");
    function checkuser() {
        user = getUserProfile(login);
        console.log(user);
        if (user != undefined) {
            goSearcher();
        }
    }
</script>

<input
    class="search-input"
    bind:value={login}
    placeholder="Sumbit"
    onchange={checkuser}
/>
