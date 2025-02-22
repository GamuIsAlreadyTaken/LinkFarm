<script lang="ts">
    import SearchTap from "$lib/components/SearchTap.svelte";
    import Login from "$lib/components/login.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import type { UserProfile } from "$lib/types.ts";
    
    let state: number = $state(0);
    let user: UserProfile = $state();

</script>

{#if state == 0}
    <Login bind:user goSearcher={() => (state = 1)} />
{:else if state == 1}
    <Profile userName={user} quary={() => (state = 2)}></Profile>
{:else if state == 2}
    <SearchTap></SearchTap>
{/if}
