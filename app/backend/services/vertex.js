// Servicio simulado de IA.
// En producción: Vertex AI (Gemini) — redacta avisos sencillos, traduce y propone emparejamientos.
// Aquí son plantillas y diccionarios deterministas.
import { estado } from './estado.js';
import { espera, copia, enPueblo } from './comun.js';
import { TEXTOS, IDIOMAS } from '../data/textos.js';

// "Gemini" convierte el dato técnico en un mensaje corto y una acción
export function redactarAlerta(tipo, d, dia) {
  switch (tipo) {
    case 'lluvia':
      return d.lluviaMm >= 10
        ? { mensajeSencillo: `El ${dia} llueve mucho. Con el suelo mojado no se puede varear.`, accion: `Parad la recogida el ${dia}; mirad en Ayuda entre pueblos si hay trabajo a cubierto.` }
        : { mensajeSencillo: `El ${dia} puede llover un poco. La oliva mojada no se recoge bien.`, accion: `Empezad tarde el ${dia} o cambiad a tareas en el almacén.` };
    case 'viento':
      return { mensajeSencillo: `El ${dia} sopla mestral fuerte. Las lonas vuelan y es peligroso subir a la escalera.`, accion: `No vareéis el ${dia}; usad el día para limpiar y preparar cajas.` };
    case 'helada':
      return { mensajeSencillo: `El ${dia} hace mucho frío por la mañana.`, accion: 'Empezad una hora más tarde y llevad ropa de abrigo.' };
    case 'calor':
      return { mensajeSencillo: `El ${dia} hace mucho calor.`, accion: 'Trabajad solo por la mañana y bebed agua cada media hora.' };
    default:
      return { mensajeSencillo: 'Aviso del tiempo.', accion: 'Consultad con el dinamizador.' };
  }
}

export async function getIdiomas() {
  await espera();
  return copia(IDIOMAS);
}

// Traducción de una clave; si no existe en el idioma, devuelve el castellano (o la clave)
export async function traducir(clave, idioma) {
  await espera();
  return TEXTOS[idioma]?.[clave] ?? TEXTOS.es[clave] ?? clave;
}

// Todos los textos de un idioma (completados con castellano si falta alguno)
export async function getTextos(idioma) {
  await espera();
  return copia({ ...TEXTOS.es, ...(TEXTOS[idioma] || {}) });
}

// Emparejamientos propuestos por la IA (el dinamizador decide en campana.js). puebloId = el de la oferta.
export async function getEmparejamientosIA(puebloId) {
  await espera();
  const lista = estado.emparejamientos.map((e) => ({ ...e, puebloId: estado.ofertas.find((o) => o.id === e.ofertaId)?.puebloId ?? null }));
  return copia(lista.filter((e) => enPueblo(e, puebloId)));
}
