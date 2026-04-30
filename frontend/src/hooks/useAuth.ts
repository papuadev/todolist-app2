export function AuthPage(){
    
    const fetchAuth = async ()=>{
        try {
            const res = await fetch('https://moraldoctor-us.backendless.app/api/data/user-auth')
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    return{
        fetchAuth
    }
}