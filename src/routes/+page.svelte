<script lang="ts">
    import SearchTap from "$lib/components/SearchTap.svelte";
    import Login from "$lib/components/Login.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import type { UserProfile } from "$lib/types.ts";
    import Expander from "$lib/components/Expander.svelte";

    let state: "login" | "search" | "profile" = $state("search");
    let user: UserProfile = $state();
</script>

{#snippet head()}
    <p>Patata</p>
{/snippet}
{#snippet body()}
    <p>1</p>
    <p>2</p>
    <p>3</p>
{/snippet}

<Expander {head} {body}></Expander>

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
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
    }

    nav {
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
