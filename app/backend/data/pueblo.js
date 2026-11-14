// Datos del pueblo de la demo: Vila-rodona (Alt Camp, Tarragona). Lugar real; dinamizador ficticio.
export const HOY = '2026-11-14';

export const PUEBLO = {
  nombre: 'Vila-rodona',
  comarca: 'Alt Camp',
  provincia: 'Tarragona',
  habitantes: 1382, // INE 2025
  lat: 41.3128,
  lng: 1.3594,
  zoom: 14,
  cultivos: [
    { id: 'uva', nombre: 'Uva (viña)', emoji: '🍇', color: '#7b2d5b' },
    { id: 'oliva', nombre: 'Oliva', emoji: '🫒', color: '#6b8e23' },
    { id: 'almendra', nombre: 'Almendra', emoji: '🌰', color: '#c49a6c' },
    { id: 'avellana', nombre: 'Avellana', emoji: '🥜', color: '#8b5a2b' }
  ],
  dinamizador: {
    nombre: 'Marta Puig (ejemplo)',
    telefono: '600 000 000',
    horario: 'Lunes a viernes, 8:00–14:00 y 17:00–19:00 (en campaña)',
    lugar: "Ajuntament de Vila-rodona (Plaça de l'Església)"
  }
};
