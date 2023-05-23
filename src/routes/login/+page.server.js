//get the users from the server
async function getUsers() {
    const res = await fetch('http://localhost:5173/API/Users')
    let data = await res.json()
    return data  
}
//on load, get users
export async function load({params}) {
    const user = await getUsers()
    return user
}