// Temporeros FICTICIOS. Sin puntuaciones. ofertaId (extra) = oferta donde están contratados.
export const TEMPOREROS = [
  { id: 'tmp-01', nombre: 'Ionuț Popescu (ejemplo)', origen: 'Rumanía', idiomas: ['ro', 'es'], experiencia: ['uva', 'oliva'], disponibleDesde: '2026-11-14', necesitaAlojamiento: true, necesitaTransporte: true, estado: 'busca', ofertaId: null },
  { id: 'tmp-02', nombre: 'Youssef El Amrani (ejemplo)', origen: 'Marruecos', idiomas: ['ar', 'fr', 'es'], experiencia: ['oliva', 'almendra'], disponibleDesde: '2026-11-14', necesitaAlojamiento: true, necesitaTransporte: true, estado: 'busca', ofertaId: null },
  { id: 'tmp-03', nombre: 'Mamadou Diallo (ejemplo)', origen: 'Senegal', idiomas: ['fr', 'es'], experiencia: ['uva'], disponibleDesde: '2026-11-16', necesitaAlojamiento: true, necesitaTransporte: true, estado: 'busca', ofertaId: null },
  { id: 'tmp-04', nombre: 'Moussa Keita (ejemplo)', origen: 'Mali', idiomas: ['fr'], experiencia: ['oliva'], disponibleDesde: '2026-11-15', necesitaAlojamiento: true, necesitaTransporte: true, estado: 'busca', ofertaId: null },
  { id: 'tmp-05', nombre: 'Andrés Gómez (ejemplo)', origen: 'Colombia', idiomas: ['es'], experiencia: ['uva', 'avellana'], disponibleDesde: '2026-11-03', necesitaAlojamiento: true, necesitaTransporte: false, estado: 'contratado', ofertaId: 'of-oliva-garriga' },
  { id: 'tmp-06', nombre: 'Laia Martí (ejemplo)', origen: 'Valls (Alt Camp)', idiomas: ['ca', 'es'], experiencia: ['uva', 'oliva', 'almendra'], disponibleDesde: '2026-11-14', necesitaAlojamiento: false, necesitaTransporte: false, estado: 'busca', ofertaId: null },
  { id: 'tmp-07', nombre: 'Elena Ionescu (ejemplo)', origen: 'Rumanía', idiomas: ['ro', 'es'], experiencia: ['oliva', 'uva'], disponibleDesde: '2026-11-10', necesitaAlojamiento: false, necesitaTransporte: true, estado: 'contratado', ofertaId: 'of-oliva-sala' },
  { id: 'tmp-08', nombre: 'Fatima Benali (ejemplo)', origen: 'Marruecos', idiomas: ['ar', 'es'], experiencia: ['oliva'], disponibleDesde: '2026-11-09', necesitaAlojamiento: true, necesitaTransporte: true, estado: 'contratado', ofertaId: 'of-oliva-pujol' },
  { id: 'tmp-09', nombre: 'Pau Rovira (ejemplo)', origen: 'Vila-rodona', idiomas: ['ca', 'es'], experiencia: ['uva', 'avellana'], disponibleDesde: '2026-11-20', necesitaAlojamiento: false, necesitaTransporte: false, estado: 'busca', ofertaId: null },
  { id: 'tmp-10', nombre: 'Ousmane Traoré (ejemplo)', origen: 'Mali', idiomas: ['fr', 'es'], experiencia: ['almendra', 'oliva'], disponibleDesde: '2026-11-14', necesitaAlojamiento: true, necesitaTransporte: true, estado: 'busca', ofertaId: null }
];

// Solicitudes ya existentes al abrir la demo
export const SOLICITUDES = [
  { id: 'sol-001', ofertaId: 'of-oliva-pujol', temporeroId: 'tmp-10', estado: 'pendiente', fecha: '2026-11-13' }
];
