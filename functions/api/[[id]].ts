



export async function onRequestGet(context:any) {
const params = context.params;
const response = await fetch("https://store.steampowered.com/wishlist/profiles/" + params);
return new Response( await response.json())
}