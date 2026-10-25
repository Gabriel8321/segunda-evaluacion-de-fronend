import { useState, useEffect } from "react";
import Buscador from "./Buscador";

function MiApi() {
    const [allDecks, setAllDecks] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState(""); 

    useEffect(() => {
        const sacarDatos = async () => {
            try {
                const respuesta = await fetch('https://db.ygoprodeck.com/api/v7/cardsets.php');
                const datos = await respuesta.json();
                
                if (Array.isArray(datos)) {
                    const soloConImagen = datos.filter(deck => deck.set_image && deck.set_image.trim() !== "");
                    setAllDecks(soloConImagen); 
                }
                setCargando(false);
            } catch (error) {
                console.error('Error al cargar la API:', error);
                setCargando(false);
            }
        };

        sacarDatos();
    }, []);

    if (cargando) return <p className="text-center my-5 text-primary fw-bold">Cargando catálogo...</p>;

    const decksFiltrados = allDecks.filter((deck) => 
        deck.set_name.toLowerCase().includes(busqueda.toLowerCase())
    );

    const decksVisibles = decksFiltrados.slice(0, 30);

    return (
        <div className="container my-4">
            <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

            {decksVisibles.length === 0 ? (
                <p className="text-center my-5 text-muted fw-bold">
                    No se encontraron sets que coincidan con "{busqueda}".
                </p>
            ) : (
                <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
                    {decksVisibles.map((deck) => (
                        <section 
                            className="card shadow-sm" 
                            style={{ maxWidth: '320px', width: '100%', display: 'flex', flexDirection: 'column' }} 
                            key={deck.set_code || deck.set_name}
                        >
                            <img 
                                src={deck.set_image} 
                                className="card-img-top" 
                                alt={deck.set_name} 
                                style={{ height: '180px', objectFit: 'contain', padding: '10px' }}
                            />
                            
                            <div className="card-body d-flex flex-column justify-content-between" style={{ flexGrow: 1 }}>
                                <div>
                                    <h4 className="card-title h5 text-truncate" title={deck.set_name}>
                                        {deck.set_name}
                                    </h4>
                                    
                                    <p className="card-text mb-1">
                                        <strong>Cartas:</strong> {deck.num_of_cards || 'N/A'}
                                    </p>

                                    <p className="card-text text-muted small">
                                        <strong>Lanzamiento:</strong> {deck.tcg_date || 'N/A'}
                                    </p>
                                </div>
                                
                                <a href="#" className="btn-solid theme-primary mt-3 text-center d-block text-decoration-none">
                                    Go somewhere
                                </a>
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MiApi;