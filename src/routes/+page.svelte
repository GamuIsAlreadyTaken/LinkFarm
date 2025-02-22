<script lang="ts">
    import SearchTap from "$lib/components/SearchTap.svelte";
    import Login from "$lib/components/Login.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import type { UserProfile } from "$lib/types.ts";
    import Expander from "$lib/components/Expander.svelte";

    let state: "login" | "search" | "profile" = $state("login");
    let user: UserProfile = $state();
</script>

{#if state != "login"}
    <nav>
        <button
            onclick={() => {
                state = "search";
            }}
            class:selected={state == "search"}
        >
            Buscar
        </button>
        <button
            onclick={() => {
                state = "profile";
            }}
            class:selected={state == "profile"}
        >
            Mi perfil
        </button>
        <button
            onclick={() => {
                state = "login";
            }}
        >
            Logout
        </button>
    </nav>
{/if}

<div>
    <div>
        {#if state == "login"}
            <Login bind:user onlogin={() => (state = "profile")} />
        {:else if state == "profile"}
            <Profile {user}></Profile>
        {:else if state == "search"}
            <SearchTap bind:user onuserselected={() => (state = "profile")}
            ></SearchTap>
        {/if}
    </div>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    nav {
        padding: 50px 0;
        display: flex;
        justify-content: center;

        button {
            border: none;
            background-color: #555;
            color: #fff;
            padding: 5px 20px;
            margin: 0;
        }
        .selected {
            background-color: #888;
        }
    }
</style>
