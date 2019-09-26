export default function ({ store, redirect }) {
    if (!store.state.authUser) {
        return redirect('/service/auth/login?redirect=')
    }
}