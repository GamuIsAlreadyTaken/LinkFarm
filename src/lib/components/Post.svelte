<script lang='ts'>
    let tag = "Título de Prueba";
    let desc = [
        "Elemento 1 con <a href='https://ejemplo.com'>enlace</a>", 
        "Elemento 2 con <a href='https://ejemplo.com'>enlace</a>", 
        "Elemento 3 con <a href='https://ejemplo.com'>enlace</a>", 
        "Elemento 4 con <a href='https://ejemplo.com'>enlace</a>"
    ];
</script>

<style>
    styleTag {
        font-size: 24px;
        font-weight: bold;
        color: white;
        background-color: #ff5733;
        padding: 15px;
        border-radius: 12px;
        display: inline-block;
        text-align: center;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    }

    styleDesc {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;
    }

    styleDesc div {
        font-size: 20px;
        padding: 10px 15px;
        background: linear-gradient(45deg, #f39c12, #d35400);
        border-radius: 8px;
        text-align: center;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
    }

    styleDesc div a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
    }

    styleDesc div:hover {
        background: linear-gradient(45deg, #d35400, #e74c3c);
        transform: scale(1.05);
    }
</style>

<styleTag>  {tag}  </styleTag>

<styleDesc>
    {#each desc as des}
    <div>{@html des}</div>
    {/each}
</styleDesc>
