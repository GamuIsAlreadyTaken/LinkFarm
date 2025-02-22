<script lang='ts'>
    import { getUserProfile } from '$lib/database';
	import type { UserProfile } from '$lib/types.ts';

    let {user}: {user: UserProfile} = $props();
    let login = $state("");
    function checkuser(){
        
    if( getUserProfile(login) != undefined){
        //Cambiar al buscador
     }
    }
</script>

<input
      type="text"
      class="search-input"
      bind:value={login}
      placeholder="Buscar..."
      onkeydown={checkuser}
    />