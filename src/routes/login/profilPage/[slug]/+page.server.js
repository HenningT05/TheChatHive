//get all the users
async function getUsers() {
    const res = await fetch('http://localhost:5173/API/Users')
    let data = await res.json()
    return data  
}

//get the user with that username
async function getUser(slug) {
    const res = await fetch(`http://localhost:5173/API/Users?username=${slug}`)
    let dataUser = await res.json()
    return dataUser
}
    
//Get the slug (the user)    
export async function load({params, cookies}) {
    const result = await getUser(params.slug)    
    return {users: result.users, user: result.user, slug: params.slug}
}


  
