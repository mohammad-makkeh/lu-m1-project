export default function useAuth() {
    const user = localStorage?.getItem('user');
    if(user) return JSON.parse(user)
}