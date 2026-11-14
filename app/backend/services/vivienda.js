// Servicio simulado de VIVIENDA: la pone quien contrata. Alojamientos de empleadores, bolsa de viviendas
// para alquilar y verificación del ayuntamiento. En producción: Google Business Profile (fichas de casas
// rurales y alojamientos) + Google Maps Platform (Places) + base de datos propia del ayuntamiento.
import { estado, HOY } from './estado.js';
import { espera, copia, enPueblo } from './comun.js';
import { AJUNTAMENT } from '../data/red.js';

export async function getAlojamientos(puebloId) {
  await espera();
  return copia(estado.alojamientos.filter((a) => enPueblo(a, puebloId)));
}

// Bolsa de viviendas (requisitos = extra que pasa al alojamiento al alquilar)
export async function getViviendasParaEmpleadores(puebloId) {
  await espera();
  return copia(estado.viviendas.filter((v) => enPueblo(v, puebloId)));
}

// Un empleador alquila una vivienda de la bolsa: se crea su alojamiento, pendiente de verificar
export async function alquilarVivienda(viviendaId, empleadorId) {
  await espera();
  const v = estado.viviendas.find((x) => x.id === viviendaId);
  const emp = estado.empleadores.find((e) => e.id === empleadorId);
  if (!v) return { ok: false, error: 'Vivienda no encontrada' };
  if (!emp) return { ok: false, error: 'Empleador no encontrado' };
  if (v.alquiladaPor) return { ok: false, error: 'Esta vivienda ya está alquilada' };
  if (v.disponibleHasta < HOY) return { ok: false, error: 'La vivienda ya no está disponible' };

  v.alquiladaPor = empleadorId;
  const alojamiento = {
    id: 'aloj-' + v.id.replace(/^viv-/, ''), puebloId: v.puebloId, empleadorId, nombre: v.nombre, modalidad: 'alquilado', viviendaId: v.id,
    lat: v.lat, lng: v.lng, plazas: v.plazas, plazasLibres: v.plazas, verificado: false, verificadoPor: AJUNTAMENT[v.puebloId],
    requisitos: copia(v.requisitos), costeTemporero: 0, costeEmpleadorMes: v.precioMes,
    desde: v.disponibleDesde > HOY ? v.disponibleDesde : HOY, hasta: v.disponibleHasta,
    descripcion: `Alquilada por ${emp.nombre} en la bolsa de viviendas. Pendiente de la visita del ${AJUNTAMENT[v.puebloId]}.`
  };
  estado.alojamientos.push(alojamiento);
  return { ok: true, alojamiento: copia(alojamiento) };
}

// El ayuntamiento (con el dinamizador) verifica los requisitos mínimos
export async function verificarAlojamiento(alojamientoId) {
  await espera();
  const a = estado.alojamientos.find((x) => x.id === alojamientoId);
  if (!a) return { ok: false, error: 'Alojamiento no encontrado' };
  if (a.verificado) return { ok: false, error: 'Ya estaba verificado', alojamiento: copia(a) };
  a.verificado = true;
  a.descripcion = a.descripcion.replace(/ ?Pendiente de la visita del [^.]*\./, '').trim() + ` Verificado por el ${a.verificadoPor}.`;
  return { ok: true, alojamiento: copia(a) };
}
