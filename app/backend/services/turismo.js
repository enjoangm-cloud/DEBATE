// Servicio simulado de TURISMO RURAL: experiencias y reservas.
// En producción: Google Business Profile (productos/reservas del negocio) + Google Weather API (días aptos).
import { estado, HOY } from './estado.js';
import { espera, copia, enPueblo } from './comun.js';
import { fechasAptas } from './weather.js';

let contador = 0;

export async function getExperiencias(puebloId) {
  await espera();
  return copia(estado.experiencias.filter((x) => enPueblo(x, puebloId)));
}

export async function reservarExperiencia(id, fecha, personas) {
  await espera();
  const x = estado.experiencias.find((e) => e.id === id);
  const n = Number(personas);
  if (!x) return { ok: false, error: 'Experiencia no encontrada' };
  if (!x.fechas.includes(fecha) || fecha < HOY) return { ok: false, error: 'Fecha no válida para esta experiencia' };
  if (x.dependeDelTiempo && !fechasAptas().has(fecha)) return { ok: false, error: 'Ese día el tiempo no permite hacerla' };
  if (!Number.isInteger(n) || n < 1) return { ok: false, error: 'Número de personas no válido' };
  if (n > x.plazasLibres) return { ok: false, error: x.plazasLibres ? `Solo quedan ${x.plazasLibres} plazas` : 'No quedan plazas' };

  x.plazasLibres -= n;
  const total = Math.round(x.precioPersona * n * 100) / 100;
  const codigo = 'EXP-' + String(++contador).padStart(4, '0');
  estado.reservasTurismo.push({ codigo, experienciaId: id, puebloId: x.puebloId, fecha, personas: n, total });
  return { ok: true, codigo, total };
}
