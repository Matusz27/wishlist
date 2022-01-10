




export async function onRequestGet(context:any) {
    
        const params = context.params;
        
        //let url = "https://store.steampowered.com/wishlist/profiles/"
        //params.forEach((para:string) => {
        //    url += para
        //});
        return new Response(JSON.parse(params), {status: 200} )
}