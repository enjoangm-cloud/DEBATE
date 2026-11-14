// Trámites reales, explicados de forma simplificada y genérica (orientativo, no asesoramiento legal).
export const TRAMITES = [
  { id: 'tram-alta-ss', titulo: 'Alta en la Seguridad Social', para: 'agricultor',
    pasos: ['Lo hace el empresario agrario, no el temporero.', 'Pide el número de afiliación (NAF) del trabajador; si no tiene, se solicita.', 'Da de alta antes de que empiece a trabajar (sistema RED o sede electrónica).', 'Entrega al trabajador el justificante del alta.'],
    dondeSeHace: 'Tesorería General de la Seguridad Social (sede electrónica / sistema RED) o gestoría', documentos: ['DNI, NIE o pasaporte del trabajador', 'Número de afiliación (NAF)', 'Datos del contrato'] },
  { id: 'tram-contrato', titulo: 'Contrato de trabajo agrario (fijo-discontinuo o temporal)', para: 'agricultor',
    pasos: ['Elige la modalidad: fijo-discontinuo para campañas que se repiten cada año; temporal solo en los casos que permite la ley.', 'Aplica el salario y jornada del convenio del campo de la provincia.', 'Firma el contrato por escrito con el trabajador y dale una copia.', 'Comunica el contrato al servicio público de empleo (Contrat@).'],
    dondeSeHace: 'En la finca o con gestoría; comunicación por Contrat@', documentos: ['Documento de identidad del trabajador', 'Alta en la Seguridad Social', 'Convenio colectivo aplicable'] },
  { id: 'tram-nie', titulo: 'NIE / TIE para personas extranjeras', para: 'temporero',
    pasos: ['Ciudadanos de la UE (p. ej. Rumanía): certificado de registro de ciudadano de la UE con NIE.', 'Personas de fuera de la UE: necesitan autorización de residencia y trabajo; después se pide la TIE.', 'Pide cita previa en Extranjería o Policía Nacional.', 'Lleva los documentos originales y copias a la cita.'],
    dondeSeHace: 'Oficina de Extranjería o comisaría de Policía Nacional (Tarragona), con cita previa', documentos: ['Pasaporte en vigor', 'Contrato u oferta de trabajo', 'Empadronamiento (si se pide)', 'Tasa pagada'] },
  { id: 'tram-padron', titulo: 'Empadronarse en Vila-rodona', para: 'temporero',
    pasos: ['Ve al Ajuntament con tu documento de identidad.', 'Lleva el contrato de alquiler o una autorización de quien te cede la vivienda.', 'Rellena la hoja de inscripción en el padrón.', 'Pide el volante de empadronamiento: sirve para la tarjeta sanitaria y otros trámites.'],
    dondeSeHace: "Ajuntament de Vila-rodona (Plaça de l'Església)", documentos: ['DNI, NIE o pasaporte', 'Autorización o contrato de la vivienda'] },
  { id: 'tram-tsi', titulo: 'Tarjeta sanitaria (TSI)', para: 'temporero',
    pasos: ['Necesitas estar dado de alta en la Seguridad Social y empadronado.', 'Pide cita en el centro de atención primaria o consultorio.', 'Entrega los documentos; te dan un justificante provisional.', 'La tarjeta llega después; mientras tanto, usa el justificante.'],
    dondeSeHace: 'Consultori mèdic local / centro de atención primaria de referencia', documentos: ['Documento de identidad', 'Volante de empadronamiento', 'Justificante de alta en la Seguridad Social'] },
  { id: 'tram-jornada', titulo: 'Registro de jornada', para: 'agricultor',
    pasos: ['Anota cada día la hora de entrada y de salida de cada trabajador.', 'Puede ser en papel o con una app, pero debe ser fiable.', 'Guarda los registros durante 4 años.', 'Los trabajadores y la Inspección de Trabajo pueden consultarlos.'],
    dondeSeHace: 'En la propia finca (papel o aplicación)', documentos: ['Hoja o app de registro diario', 'Horario pactado en el contrato'] }
];
