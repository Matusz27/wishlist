




export async function onRequestGet(context:any) {
    
        const params = context.params.id;
        
        let url = `https://store.steampowered.com/wishlist/profiles/${params[0]}/${params[1]}`

        fetch(url)
        
        return new Response(url, {status: 200} )
}