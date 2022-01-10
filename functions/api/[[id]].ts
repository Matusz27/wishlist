




export async function onRequestGet(context:any) {
    
        const params = context.params;
        
        let url = `https://store.steampowered.com/wishlist/profiles/${params.id[0]}/${params.id[1]}`
        
        return new Response(url, {status: 200} )
}