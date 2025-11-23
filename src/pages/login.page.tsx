import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../cases/costumers/contexts/AuthContext";

export function LoginPage() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error: authError } = await signIn(email, password);

        if (authError) {
            setError("Falha ao fazer login. Verifique suas credenciais.");
            setLoading(false);
        } else {
            navigate("/");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 border border-zinc-200 rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold mb-6 text-zinc-800">Acesse sua conta</h1>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">E-mail</label>
                    <input 
                        type="email" 
                        required
                        className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Senha</label>
                    <input 
                        type="password" 
                        required
                        className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 mt-2"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-zinc-600">
                Não tem uma conta? <Link to="/signup" className="text-blue-600 hover:underline">Cadastre-se</Link>
            </div>
        </div>
    );
}