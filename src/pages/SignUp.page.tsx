import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/cases/costumers/contexts/AuthContext";
import { supabase } from "@/lib/client"; 

interface City {
  id: string;
  name: string;
}

export function SignUpPage() {
    const navigate = useNavigate();
    const { signUp } = useAuth();
    
    const [cities, setCities] = useState<City[]>([]);
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        address: "",
        zipcode: "",
        cityIdId: "" 
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadCities() {
            const { data, error } = await supabase
                .from('city') 
                .select('id, name')
                .order('name');
            
            if (error) {
                console.error("Erro ao carregar cidades:", error);
            } else if (data) {
                setCities(data);
            }
        }
        loadCities();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

   async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const rawEmail = formData.email.toLowerCase();
        const cleanEmail = rawEmail.replace(/[^a-z0-9@._-]/g, ""); 
        
        const cleanPassword = formData.password.trim();

        console.log("DEBUG EMAIL:", `Original: [${formData.email}]`, `Limpo: [${cleanEmail}]`);

        if (cleanPassword.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres.");
            setLoading(false);
            return;
        }

        if (!formData.cityIdId) {
            setError("Por favor, selecione uma cidade.");
            setLoading(false);
            return;
        }

        const { error: authError } = await signUp(
            cleanEmail, 
            cleanPassword, 
            {
                name: formData.name,
                address: formData.address,
                zipcode: formData.zipcode,
                cityIdId: formData.cityIdId
            }
        );

        if (authError) {
            setError("Erro ao criar conta: " + authError.message);
            setLoading(false);
        } else {
            alert("Conta criada com sucesso!");
            navigate("/");
        }
    }
    return (
        <div className="max-w-lg mx-auto mt-10 border border-zinc-200 rounded-lg p-6 shadow-sm bg-white">
            <h1 className="text-2xl font-bold mb-6 text-zinc-800">Crie sua conta</h1>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-zinc-700 border-b pb-1">Dados de Acesso</h2>
                
                <input 
                    name="name"
                    placeholder="Nome Completo"
                    required
                    className="border border-zinc-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    onChange={handleChange}
                />
                <input 
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    className="border border-zinc-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    onChange={handleChange}
                />
                <div className="flex flex-col">
                    <input 
                        name="password"
                        type="password"
                        placeholder="Senha (mínimo 6 caracteres)"
                        required
                        className="border border-zinc-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={handleChange}
                    />
                    <span className="text-xs text-zinc-500 mt-1 ml-1">Mínimo de 6 caracteres</span>
                </div>

                <h2 className="text-lg font-semibold text-zinc-700 border-b pb-1 mt-2">Endereço de Entrega</h2>
                
                <input 
                    name="address"
                    placeholder="Endereço (Rua, Número)"
                    required
                    className="border border-zinc-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    onChange={handleChange}
                />
                
                <div className="flex gap-4">
                    <input 
                        name="zipcode"
                        placeholder="CEP"
                        required
                        className="border border-zinc-300 rounded px-3 py-2 w-1/3 focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={handleChange}
                    />
                    
                    <div className="w-2/3">
                        <select 
                            name="cityIdId"
                            required
                            className="w-full border border-zinc-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none bg-white"
                            onChange={handleChange}
                            value={formData.cityIdId}
                        >
                            <option value="">Selecione a Cidade</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {cities.length === 0 && (
                            <p className="text-xs text-red-500 mt-1">Carregando cidades...</p>
                        )}
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition disabled:opacity-50 mt-4 shadow-md"
                >
                    {loading ? "Processando..." : "Cadastrar e Entrar"}
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-zinc-600">
                Já tem uma conta? <Link to="/login" className="text-blue-600 hover:underline font-bold">Faça Login</Link>
            </div>
        </div>
    );
}