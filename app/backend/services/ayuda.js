// Servicio simulado de AYUDA MUTUA entre pueblos (cuadrillas, transporte, maquinaria, alojamiento).
// En producción: Google Weather API detecta el día no apto y Vertex AI (Gemini) propone la ayuda; decide el dinamizador.
import { estado } from './estado.js';
import { espera, copia } from './comun.js';

export async function getAyudaMutua() {
  await espera();
  return copia([...estado.ayudas].sort((a, b) => a.fecha.localeCompare(b.fecha)));
}

export async function aceptarAyuda(id) {
  await espera();
  const ayuda = estado.ayudas.find((a) => a.id === id);
  if (!ayuda) return { ok: false, error: 'Ayuda no encontrada' };
  if (ayuda.estado === 'aceptada') return { ok: false, error: 'Ya estaba aceptada', ayuda: copia(ayuda) };
  ayuda.estado = 'aceptada';
  return { ok: true, ayuda: copia(ayuda) };
}
