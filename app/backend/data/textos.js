// Textos de interfaz traducidos (simula traducción previa con Vertex AI / Gemini).
//
// CLAVES (TEXTOS_CLAVES):
//  Navegación: nav_inicio, nav_calendario, nav_mapa, nav_trabajo, nav_pueblo, nav_comprar, nav_tramites
//  Roles:      rol_temporero, rol_agricultor, rol_dinamizador, rol_comprador
//  Títulos:    titulo_app, subtitulo_app
//  Tiempo:     aviso_tiempo, apto, no_apto, hoy, manana
//  Botones:    solicitar, solicitado, aprobar, rechazar, reservar, llamar, como_llegar
//  Ofertas:    plazas_libres, contrato, alojamiento_incluido, transporte_incluido, salario_hora, horario
//  Trámites:   pasos, documentos, donde
//  Estados:    en_curso, terminado, proximo
//  Otros:      datos_simulados, idioma, tamano_texto
//  EXTRA:      aviso_lluvia, aviso_viento, parar_recogida, punto_acogida, cerrar, volver,
//              ver_mapa, propuesto_ia, decide_dinamizador, total, codigo_reserva, stock
//  v2:        nav_red, nav_turismo, pueblo, red, todos, sector, sector_agricultura, sector_turismo, sector_hosteleria,
//              sector_bodega, sector_forestal, alojamiento_empleador, verificado, pendiente_verificar, alquilar,
//              coste_temporero, ayuda_mutua, aceptar, camino_anual, meses_trabajo, reservar_experiencia, personas, fecha
export const TEXTOS = {
  es: {
    nav_inicio: 'Inicio', nav_calendario: 'Calendario', nav_mapa: 'Mapa', nav_trabajo: 'Trabajo', nav_pueblo: 'Pueblo', nav_comprar: 'Comprar', nav_tramites: 'Trámites',
    rol_temporero: 'Temporero', rol_agricultor: 'Agricultor', rol_dinamizador: 'Dinamizador', rol_comprador: 'Comprador',
    titulo_app: "Temporada del Gaià", subtitulo_app: "Trabajo de temporada todo el año en 5 pueblos que se ayudan",
    aviso_tiempo: 'Aviso del tiempo', apto: 'Apto para cosechar', no_apto: 'No apto para cosechar', hoy: 'Hoy', manana: 'Mañana',
    solicitar: 'Solicitar', solicitado: 'Solicitado', aprobar: 'Aprobar', rechazar: 'Rechazar', reservar: 'Reservar', llamar: 'Llamar', como_llegar: 'Cómo llegar',
    plazas_libres: 'Plazas libres', contrato: 'Con contrato', alojamiento_incluido: 'Alojamiento incluido', transporte_incluido: 'Transporte incluido', salario_hora: 'Salario por hora', horario: 'Horario',
    pasos: 'Pasos', documentos: 'Documentos', donde: 'Dónde se hace',
    en_curso: 'En curso', terminado: 'Terminado', proximo: 'Próximo',
    datos_simulados: 'Datos simulados para la demo', idioma: 'Idioma', tamano_texto: 'Tamaño del texto',
    aviso_lluvia: 'Lluvia prevista', aviso_viento: 'Viento fuerte', parar_recogida: 'Se para la recogida', punto_acogida: 'Punto de acogida', cerrar: 'Cerrar', volver: 'Volver',
    ver_mapa: 'Ver en el mapa', propuesto_ia: 'Propuesta de la IA', decide_dinamizador: 'Decide el dinamizador', total: 'Total', codigo_reserva: 'Código de reserva', stock: 'Disponible',
    // v2
    nav_red: "Red", nav_turismo: "Turismo", pueblo: "Pueblo", red: "Red de pueblos", todos: "Todos", sector: "Sector", sector_agricultura: "Agricultura", sector_turismo: "Turismo rural", sector_hosteleria: "Hostelería", sector_bodega: "Bodega", sector_forestal: "Forestal", alojamiento_empleador: "Alojamiento a cargo del empleador", verificado: "Verificado por el ayuntamiento", pendiente_verificar: "Pendiente de verificar", alquilar: "Alquilar", coste_temporero: "Coste para el temporero", ayuda_mutua: "Ayuda entre pueblos", aceptar: "Aceptar", camino_anual: "Tu año de trabajo", meses_trabajo: "Meses con trabajo", reservar_experiencia: "Reservar experiencia", personas: "Personas", fecha: "Fecha"
  },
  ca: {
    nav_inicio: 'Inici', nav_calendario: 'Calendari', nav_mapa: 'Mapa', nav_trabajo: 'Feina', nav_pueblo: 'Poble', nav_comprar: 'Comprar', nav_tramites: 'Tràmits',
    rol_temporero: 'Temporer', rol_agricultor: 'Pagès', rol_dinamizador: 'Dinamitzador', rol_comprador: 'Comprador',
    titulo_app: "Temporada del Gaià", subtitulo_app: "Feina de temporada tot l'any en 5 pobles que s'ajuden",
    aviso_tiempo: 'Avís del temps', apto: 'Apte per collir', no_apto: 'No apte per collir', hoy: 'Avui', manana: 'Demà',
    solicitar: 'Sol·licitar', solicitado: 'Sol·licitat', aprobar: 'Aprovar', rechazar: 'Rebutjar', reservar: 'Reservar', llamar: 'Trucar', como_llegar: 'Com arribar-hi',
    plazas_libres: 'Places lliures', contrato: 'Amb contracte', alojamiento_incluido: 'Allotjament inclòs', transporte_incluido: 'Transport inclòs', salario_hora: 'Sou per hora', horario: 'Horari',
    pasos: 'Passos', documentos: 'Documents', donde: 'On es fa',
    en_curso: 'En curs', terminado: 'Acabat', proximo: 'Proper',
    datos_simulados: 'Dades simulades per a la demo', idioma: 'Idioma', tamano_texto: 'Mida del text',
    aviso_lluvia: 'Pluja prevista', aviso_viento: 'Vent fort', parar_recogida: "S'atura la collita", punto_acogida: "Punt d'acollida", cerrar: 'Tancar', volver: 'Tornar',
    ver_mapa: 'Veure al mapa', propuesto_ia: 'Proposta de la IA', decide_dinamizador: 'Decideix el dinamitzador', total: 'Total', codigo_reserva: 'Codi de reserva', stock: 'Disponible',
    // v2
    nav_red: "Xarxa", nav_turismo: "Turisme", pueblo: "Poble", red: "Xarxa de pobles", todos: "Tots", sector: "Sector", sector_agricultura: "Agricultura", sector_turismo: "Turisme rural", sector_hosteleria: "Hostaleria", sector_bodega: "Celler", sector_forestal: "Forestal", alojamiento_empleador: "Allotjament a càrrec de l'empresa", verificado: "Verificat per l'ajuntament", pendiente_verificar: "Pendent de verificar", alquilar: "Llogar", coste_temporero: "Cost per al temporer", ayuda_mutua: "Ajuda entre pobles", aceptar: "Acceptar", camino_anual: "El teu any de feina", meses_trabajo: "Mesos amb feina", reservar_experiencia: "Reservar experiència", personas: "Persones", fecha: "Data"
  },
  ro: {
    nav_inicio: 'Acasă', nav_calendario: 'Calendar', nav_mapa: 'Hartă', nav_trabajo: 'Muncă', nav_pueblo: 'Satul', nav_comprar: 'Cumpără', nav_tramites: 'Acte',
    rol_temporero: 'Lucrător sezonier', rol_agricultor: 'Fermier', rol_dinamizador: 'Coordonator', rol_comprador: 'Cumpărător',
    titulo_app: "Sezonul pe Gaià", subtitulo_app: "Muncă sezonieră tot anul în 5 sate care se ajută",
    aviso_tiempo: 'Avertizare meteo', apto: 'Bun pentru recoltat', no_apto: 'Nu se recoltează', hoy: 'Azi', manana: 'Mâine',
    solicitar: 'Aplică', solicitado: 'Ai aplicat', aprobar: 'Aprobă', rechazar: 'Respinge', reservar: 'Rezervă', llamar: 'Sună', como_llegar: 'Cum ajungi',
    plazas_libres: 'Locuri libere', contrato: 'Cu contract', alojamiento_incluido: 'Cazare inclusă', transporte_incluido: 'Transport inclus', salario_hora: 'Salariu pe oră', horario: 'Program',
    pasos: 'Pași', documentos: 'Documente', donde: 'Unde se face',
    en_curso: 'În desfășurare', terminado: 'Terminat', proximo: 'Urmează',
    datos_simulados: 'Date simulate pentru demo', idioma: 'Limbă', tamano_texto: 'Mărimea textului',
    aviso_lluvia: 'Ploaie prevăzută', aviso_viento: 'Vânt puternic', parar_recogida: 'Se oprește culesul', punto_acogida: 'Punct de primire', cerrar: 'Închide', volver: 'Înapoi',
    ver_mapa: 'Vezi pe hartă', propuesto_ia: 'Propunere IA', decide_dinamizador: 'Decide coordonatorul', total: 'Total', codigo_reserva: 'Cod rezervare', stock: 'Disponibil',
    // v2
    nav_red: "Rețea", nav_turismo: "Turism", pueblo: "Sat", red: "Rețeaua de sate", todos: "Toate", sector: "Sector", sector_agricultura: "Agricultură", sector_turismo: "Turism rural", sector_hosteleria: "Restaurante și baruri", sector_bodega: "Cramă", sector_forestal: "Silvicultură", alojamiento_empleador: "Cazare asigurată de angajator", verificado: "Verificat de primărie", pendiente_verificar: "În așteptarea verificării", alquilar: "Închiriază", coste_temporero: "Cost pentru lucrător", ayuda_mutua: "Ajutor între sate", aceptar: "Acceptă", camino_anual: "Anul tău de muncă", meses_trabajo: "Luni cu muncă", reservar_experiencia: "Rezervă experiența", personas: "Persoane", fecha: "Data"
  },
  ar: {
    nav_inicio: 'الرئيسية', nav_calendario: 'التقويم', nav_mapa: 'الخريطة', nav_trabajo: 'العمل', nav_pueblo: 'القرية', nav_comprar: 'شراء', nav_tramites: 'الإجراءات',
    rol_temporero: 'عامل موسمي', rol_agricultor: 'مزارع', rol_dinamizador: 'المنسق', rol_comprador: 'مشتري',
    titulo_app: "موسم غايا", subtitulo_app: "عمل موسمي طوال السنة في 5 قرى تتعاون فيما بينها",
    aviso_tiempo: 'تنبيه الطقس', apto: 'مناسب للحصاد', no_apto: 'غير مناسب للحصاد', hoy: 'اليوم', manana: 'غدًا',
    solicitar: 'قدّم طلبًا', solicitado: 'تم الطلب', aprobar: 'موافقة', rechazar: 'رفض', reservar: 'احجز', llamar: 'اتصل', como_llegar: 'كيف تصل',
    plazas_libres: 'أماكن شاغرة', contrato: 'بعقد عمل', alojamiento_incluido: 'السكن مشمول', transporte_incluido: 'النقل مشمول', salario_hora: 'الأجر في الساعة', horario: 'أوقات العمل',
    pasos: 'الخطوات', documentos: 'الوثائق', donde: 'أين يتم',
    en_curso: 'جارٍ', terminado: 'انتهى', proximo: 'قادم',
    datos_simulados: 'بيانات تجريبية للعرض', idioma: 'اللغة', tamano_texto: 'حجم النص',
    aviso_lluvia: 'أمطار متوقعة', aviso_viento: 'رياح قوية', parar_recogida: 'يتوقف الجني', punto_acogida: 'نقطة الاستقبال', cerrar: 'إغلاق', volver: 'رجوع',
    ver_mapa: 'عرض على الخريطة', propuesto_ia: 'اقتراح الذكاء الاصطناعي', decide_dinamizador: 'القرار للمنسق', total: 'المجموع', codigo_reserva: 'رمز الحجز', stock: 'متوفر',
    // v2
    nav_red: "الشبكة", nav_turismo: "السياحة", pueblo: "القرية", red: "شبكة القرى", todos: "الكل", sector: "القطاع", sector_agricultura: "الزراعة", sector_turismo: "السياحة الريفية", sector_hosteleria: "المطاعم والضيافة", sector_bodega: "معصرة النبيذ", sector_forestal: "أعمال الغابات", alojamiento_empleador: "السكن على حساب صاحب العمل", verificado: "تحققت منه البلدية", pendiente_verificar: "في انتظار التحقق", alquilar: "استئجار", coste_temporero: "التكلفة على العامل", ayuda_mutua: "التعاون بين القرى", aceptar: "قبول", camino_anual: "سنة عملك", meses_trabajo: "أشهر العمل", reservar_experiencia: "احجز التجربة", personas: "الأشخاص", fecha: "التاريخ"
  },
  fr: {
    nav_inicio: 'Accueil', nav_calendario: 'Calendrier', nav_mapa: 'Carte', nav_trabajo: 'Travail', nav_pueblo: 'Village', nav_comprar: 'Acheter', nav_tramites: 'Démarches',
    rol_temporero: 'Saisonnier', rol_agricultor: 'Agriculteur', rol_dinamizador: 'Coordinateur', rol_comprador: 'Acheteur',
    titulo_app: "Saison du Gaià", subtitulo_app: "Du travail saisonnier toute l'année dans 5 villages qui s'entraident",
    aviso_tiempo: 'Alerte météo', apto: 'Bon pour récolter', no_apto: 'Pas de récolte', hoy: "Aujourd'hui", manana: 'Demain',
    solicitar: 'Postuler', solicitado: 'Demande envoyée', aprobar: 'Approuver', rechazar: 'Refuser', reservar: 'Réserver', llamar: 'Appeler', como_llegar: "Comment s'y rendre",
    plazas_libres: 'Places libres', contrato: 'Avec contrat', alojamiento_incluido: 'Logement inclus', transporte_incluido: 'Transport inclus', salario_hora: 'Salaire horaire', horario: 'Horaires',
    pasos: 'Étapes', documentos: 'Documents', donde: 'Où le faire',
    en_curso: 'En cours', terminado: 'Terminé', proximo: 'À venir',
    datos_simulados: 'Données simulées pour la démo', idioma: 'Langue', tamano_texto: 'Taille du texte',
    aviso_lluvia: 'Pluie prévue', aviso_viento: 'Vent fort', parar_recogida: 'La récolte s’arrête', punto_acogida: "Point d'accueil", cerrar: 'Fermer', volver: 'Retour',
    ver_mapa: 'Voir sur la carte', propuesto_ia: "Proposition de l'IA", decide_dinamizador: 'Le coordinateur décide', total: 'Total', codigo_reserva: 'Code de réservation', stock: 'Disponible',
    // v2
    nav_red: "Réseau", nav_turismo: "Tourisme", pueblo: "Village", red: "Réseau de villages", todos: "Tous", sector: "Secteur", sector_agricultura: "Agriculture", sector_turismo: "Tourisme rural", sector_hosteleria: "Hôtellerie-restauration", sector_bodega: "Cave viticole", sector_forestal: "Travaux forestiers", alojamiento_empleador: "Logement à la charge de l'employeur", verificado: "Vérifié par la mairie", pendiente_verificar: "En attente de vérification", alquilar: "Louer", coste_temporero: "Coût pour le saisonnier", ayuda_mutua: "Entraide entre villages", aceptar: "Accepter", camino_anual: "Ton année de travail", meses_trabajo: "Mois avec du travail", reservar_experiencia: "Réserver l'expérience", personas: "Personnes", fecha: "Date"
  },
  en: {
    nav_inicio: 'Home', nav_calendario: 'Calendar', nav_mapa: 'Map', nav_trabajo: 'Work', nav_pueblo: 'Village', nav_comprar: 'Buy', nav_tramites: 'Paperwork',
    rol_temporero: 'Seasonal worker', rol_agricultor: 'Farmer', rol_dinamizador: 'Coordinator', rol_comprador: 'Buyer',
    titulo_app: "Gaià Seasons", subtitulo_app: "Seasonal work all year round in 5 villages that help each other",
    aviso_tiempo: 'Weather alert', apto: 'Good for harvesting', no_apto: 'No harvesting', hoy: 'Today', manana: 'Tomorrow',
    solicitar: 'Apply', solicitado: 'Applied', aprobar: 'Approve', rechazar: 'Reject', reservar: 'Reserve', llamar: 'Call', como_llegar: 'Directions',
    plazas_libres: 'Free places', contrato: 'With contract', alojamiento_incluido: 'Housing included', transporte_incluido: 'Transport included', salario_hora: 'Hourly wage', horario: 'Hours',
    pasos: 'Steps', documentos: 'Documents', donde: 'Where',
    en_curso: 'In progress', terminado: 'Finished', proximo: 'Upcoming',
    datos_simulados: 'Simulated data for the demo', idioma: 'Language', tamano_texto: 'Text size',
    aviso_lluvia: 'Rain expected', aviso_viento: 'Strong wind', parar_recogida: 'Harvest paused', punto_acogida: 'Welcome point', cerrar: 'Close', volver: 'Back',
    ver_mapa: 'View on map', propuesto_ia: 'AI suggestion', decide_dinamizador: 'The coordinator decides', total: 'Total', codigo_reserva: 'Booking code', stock: 'Available',
    // v2
    nav_red: "Network", nav_turismo: "Tourism", pueblo: "Village", red: "Village network", todos: "All", sector: "Sector", sector_agricultura: "Farming", sector_turismo: "Rural tourism", sector_hosteleria: "Hospitality", sector_bodega: "Winery", sector_forestal: "Forestry", alojamiento_empleador: "Housing paid by the employer", verificado: "Checked by the town council", pendiente_verificar: "Pending check", alquilar: "Rent", coste_temporero: "Cost to the worker", ayuda_mutua: "Help between villages", aceptar: "Accept", camino_anual: "Your year of work", meses_trabajo: "Months with work", reservar_experiencia: "Book experience", personas: "People", fecha: "Date"
  }
};

export const TEXTOS_CLAVES = Object.keys(TEXTOS.es);

export const IDIOMAS = [
  { codigo: 'es', nombre: 'Español', dir: 'ltr' },
  { codigo: 'ca', nombre: 'Català', dir: 'ltr' },
  { codigo: 'ro', nombre: 'Română', dir: 'ltr' },
  { codigo: 'ar', nombre: 'العربية', dir: 'rtl' },
  { codigo: 'fr', nombre: 'Français', dir: 'ltr' },
  { codigo: 'en', nombre: 'English', dir: 'ltr' }
];
