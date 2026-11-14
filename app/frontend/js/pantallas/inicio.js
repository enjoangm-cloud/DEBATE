// Pantalla de inicio: qué es, quién la usa, qué problemas resuelve
import { getPueblo, getIndicadores, getAlertas } from '../../../backend/api.js';
import { t, esc, estado, fuente } from '../util.js';

// Rol → pantalla a la que lleva
const ROLES = [
  { id: 'temporero',   ico: '🧑‍🌾', destino: 'trabajo',    texto: 'Busco trabajo, cama y cómo llegar' },
  { id: 'agricultor',  ico: '🚜',  destino: 'calendario', texto: 'Necesito gente a tiempo y saber qué tiempo hará' },
  { id: 'dinamizador', ico: '🏛️', destino: 'pueblo',     texto: 'Coordino camas, ofertas y emparejamientos' },
  { id: 'comprador',   ico: '🧺',  destino: 'comprar',    texto: 'Quiero comprar directo a la finca' },
];

// Los 8 problemas del reto, su solución y la herramienta de Google
const PROBLEMAS = [
  ['Falta de alojamiento para temporeros', 'Mapa de casas vacías y locales cedidos por el pueblo', 'Maps'],
  ['Pérdida de cosecha por falta de trabajadores', 'Calendario con aviso de cuándo y cuánta gente hará falta', 'Weather + Maps'],
  ['Huecos sin trabajo entre cosechas', 'Cosechas encadenadas: almendra → avellana → uva → oliva → poda', 'Maps'],
  ['Pérdida de cosecha por el tiempo', 'Previsión a 10 días y avisos en lenguaje sencillo', 'Weather + Vertex AI'],
  ['Sobrecoste por mala organización', 'No pagar jornadas perdidas por lluvia y rutas compartidas', 'Weather + Maps'],
  ['Mala comunicación temporero ↔ propietario', 'Ficha de oferta clara y traducida al idioma del temporero', 'Business Profile + Vertex AI'],
  ['Desplazamiento a ciegas', 'Punto de recogida y ruta hasta la finca', 'Maps'],
  ['Burocracia', 'Trámites explicados paso a paso', 'Forms / Drive'],
];

export default {
  async html() {
    const [p, ind, alertas] = await Promise.all([getPueblo(), getIndicadores(), getAlertas()]);
    const alerta = alertas[0];
    return `
      <section class="hero">
        <h2>${esc(t('titulo_app', 'Campaña Vila-rodona'))}</h2>
        <p style="font-size:1.15rem">Una sola herramienta para que <strong>${esc(p.nombre)}</strong>
        (${esc(p.comarca)}, ${p.habitantes.toLocaleString('es-ES')} hab.) organice su cosecha:
        <strong>quién</strong> trabaja, <strong>dónde</strong> duerme, <strong>cuándo</strong> se recoge
        y <strong>a quién</strong> se vende.</p>
        <div class="fila">${p.cultivos.map(c => `<span class="etiqueta">${c.emoji} ${esc(c.nombre)}</span>`).join('')}</div>
        <p class="muted" style="margin-top:.8rem">🤝 La app ayuda; <strong>decide una persona del pueblo</strong>:
        ${esc(p.dinamizador.nombre)} · ${esc(p.dinamizador.telefono)} · ${esc(p.dinamizador.lugar)}</p>
      </section>

      ${alerta ? `
      <section class="tarjeta alerta ${alerta.nivel}" style="margin-bottom:1.25rem">
        <strong>⚠️ ${esc(t('aviso_tiempo', 'Aviso del tiempo'))}</strong>
        <div class="ia">${esc(alerta.mensajeSencillo)}</div>
        <a href="#calendario">${esc(t('nav_calendario', 'Calendario'))} →</a>
      </section>` : ''}

      <section class="seccion">
        <h2>¿Quién eres?</h2>
        <div class="roles">
          ${ROLES.map(r => `
            <button class="rol ${estado.rol === r.id ? 'activo' : ''}" data-rol="${r.id}" data-destino="${r.destino}">
              <span class="ico">${r.ico}</span>
              <strong>${esc(t('rol_' + r.id, r.id))}</strong>
              <span class="muted">${esc(r.texto)}</span>
            </button>`).join('')}
        </div>
      </section>

      <section class="seccion">
        <h2>Así está la campaña hoy</h2>
        <div class="rejilla">
          <div class="tarjeta"><div class="cifra">${ind.camasDisponibles}</div>camas libres en el pueblo</div>
          <div class="tarjeta"><div class="cifra">${ind.temporerosConContrato}</div>temporeros con contrato</div>
          <div class="tarjeta"><div class="cifra">${ind.ofertasAbiertas}</div>ofertas abiertas</div>
          <div class="tarjeta"><div class="cifra">${ind.ventaDirectaPct} %</div>de la cosecha vendida directa</div>
        </div>
        ${fuente('getIndicadores')}
      </section>

      <section class="seccion">
        <h2>Problemas que resolvemos</h2>
        <div style="overflow-x:auto">
        <table class="tabla">
          <thead><tr><th>#</th><th>Problema</th><th>Solución</th><th>Google</th></tr></thead>
          <tbody>${PROBLEMAS.map((f, i) => `<tr><td>${i + 1}</td><td>${esc(f[0])}</td><td>${esc(f[1])}</td><td><span class="etiqueta">${esc(f[2])}</span></td></tr>`).join('')}</tbody>
        </table></div>
      </section>`;
  },

  activar(raiz) {
    raiz.querySelectorAll('[data-rol]').forEach(b => b.onclick = () => {
      estado.rol = b.dataset.rol;
      location.hash = b.dataset.destino;
    });
  },
};
