




export async function onRequestGet(context:any) {
    
        const params = context.params;
        let url = "https://store.steampowered.com/wishlist/profiles/"
        params.forEach((para:string) => {
            url += para
        });
    try {
        let response = await fetch(url);
        return new Response( await response.json())
    } catch (err) {
        return new Response("Error")
    }

}