<script lang="ts">
    import { getUserProfile } from "$lib/database";

    let { onlogin, user = $bindable() } = $props();
    let login = $state("");
    let errorMessage = $state<string | null>(null); // Estado para el mensaje de error
    let timeoutId: number | null = null; // Para manejar el temporizador

    // Función para manejar el cambio en el input
    const handleSearch = () => {
        const foundUser = getUserProfile(login);
        if (foundUser) {
            user = foundUser;
            onlogin();
            clearErrorMessage(); // Limpiar mensaje de error si existe
        } else {
            showErrorMessage("Usuario no encontrado"); // Mostrar mensaje de error
        }
    };

    // Función para mostrar el mensaje de error
    const showErrorMessage = (message: string) => {
        if (timeoutId) clearTimeout(timeoutId); // Limpiar temporizador anterior si existe
        errorMessage = message;
        timeoutId = setTimeout(() => {
            errorMessage = null; // Ocultar el mensaje después de 3 segundos
        }, 3000);
    };

    // Función para limpiar el mensaje de error
    const clearErrorMessage = () => {
        if (timeoutId) clearTimeout(timeoutId);
        errorMessage = null;
    };
</script>

<div class="login-container">
    <div class="gradient-overlay"></div>
    <div class="login-content">
        <img
            src="https://gradiant.org/wp-content/uploads/2024/10/LogoGradiant-2.svg"
            alt="Gradiant Logo"
            class="logo"
        />
        <input
            class="search-input"
            bind:value={login}
            placeholder="Acount<mail>"
            onchange={handleSearch} 
        />
        {#if errorMessage}
            <div class="error-message">
                {errorMessage}
            </div>
        {/if}
    </div>
</div>

<style>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100vw;
        position: relative;
        background-image: url("https://gradiant.org/wp-content/uploads/2024/12/Gradiant_TecnologiaImpactoReal-2048x1379.webp");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .login-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        z-index: 2;
    }

    .logo {
        width: 200px;
        height: auto;
        filter: brightness(0) invert(1);
    }

    .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.4) 100%
        );
        z-index: 1;
    }

    .search-input {
        width: 100%;
        max-width: 320px;
        padding: 16px 20px;
        font-size: 1rem;
        background: rgba(26, 26, 26, 0.6);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: #ffffff;
        border: 2px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        outline: none;
        box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
    }

    .search-input::placeholder {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.95rem;
        letter-spacing: 0.5px;
    }

    .search-input:hover {
        transform: scale(1.02);
        border-color: rgba(255, 255, 255, 0.25);
        box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.15);
    }

    .search-input:focus {
        transform: scale(1.02);
        border-color: rgba(255, 255, 255, 0.35);
        background: rgba(26, 26, 26, 0.7);
        box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.25);
    }

    .error-message {
        color: #ff6b6b;
        font-size: 0.9rem;
        margin-top: 0.5rem;
        text-align: center;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    :global(body) {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        overflow-x: hidden;
    }
</style>