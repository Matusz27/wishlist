



export async function onRequestGet(context:any) {
    try {
        const params = context.params;
        let response = await fetch("https://store.steampowered.com/wishlist/profiles/" + params);
        return new Response( await response.json())
    } catch (error) {
        return new Response("" + error + " " + context.params)
    }

}