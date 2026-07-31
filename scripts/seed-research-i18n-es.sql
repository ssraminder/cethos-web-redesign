-- Seed: research namespace translations for the standalone /research/es page.
-- Generated from scripts/research-i18n/es.json. Idempotent (upsert).
-- Spanish is the panel's largest invitation locale; this page links to the
-- portal signup form at portal.cethos.com/research-panel/es.

insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status, updated_by)
select ns.id, v.key, 0, 'es', v.value, 'published', 'claude-seed'
from cethosweb_i18n_namespaces ns
cross join (values
  ('meta.title', 'Panel de Idiomas e Investigación | Investigación en salud remunerada | Cethos'),
  ('meta.description', 'Únase al Panel de Idiomas e Investigación de Cethos: entrevistas y grupos de discusión en línea remunerados con hablantes nativos y pacientes que ayudan a que los cuestionarios de salud traducidos sean más claros. Validación lingüística y debriefing cognitivo para evaluaciones de resultados clínicos, en más de 150 idiomas.'),
  ('hero.breadcrumb_home', 'Inicio'),
  ('hero.breadcrumb', 'Panel de investigación'),
  ('hero.title', 'Panel de Idiomas e Investigación de Cethos'),
  ('hero.subtitle', 'Sesiones de investigación en línea remuneradas con hablantes nativos y pacientes de todo el mundo, para ayudar a que la información de salud sea más clara en todos los idiomas.'),
  ('hero.cta_join', 'Únase al panel'),
  ('hero.cta_learn', 'Cómo funciona'),
  ('what.title', 'Qué hacemos'),
  ('what.p1', 'Cuando se traduce un cuestionario de salud, alguien tiene que comprobar que los pacientes realmente lo entienden: que cada pregunta es clara, natural y significa lo mismo en todos los idiomas. Ese proceso se llama validación lingüística, y las entrevistas que están en su núcleo se conocen como debriefing cognitivo.'),
  ('what.p2', 'Cethos realiza estas sesiones para las evaluaciones de resultados clínicos que se usan en la investigación médica de todo el mundo. Nuestro panel de investigación es la comunidad de hablantes nativos y pacientes que lo hacen posible, y que reciben un honorario por cada sesión que completan.'),
  ('what.card1_title', 'Entrevistas y grupos de discusión'),
  ('what.card1_body', 'Entrevistas individuales y sesiones en grupos reducidos, realizadas en línea por videollamada o por teléfono. La mayoría de las sesiones duran entre 30 y 90 minutos y están dirigidas por un entrevistador con experiencia en su idioma.'),
  ('what.card2_title', 'Prueba de claridad en situaciones reales'),
  ('what.card2_body', 'Usted lee preguntas de salud traducidas y nos dice, con sus propias palabras, qué significan. No hay respuestas correctas ni incorrectas: su comprensión como hablante nativo es exactamente lo que queremos medir.'),
  ('what.card3_title', 'Remuneración por su tiempo'),
  ('what.card3_body', 'Cada sesión completada paga un honorario, acordado antes de reservar y abonado en su moneda local por PayPal o transferencia bancaria, normalmente en un plazo de 30 días.'),
  ('how.title', 'Cómo funciona'),
  ('how.step1_title', 'Únase al panel'),
  ('how.step1_body', 'Regístrese una sola vez, en su propio idioma. Lleva unos 5 minutos: indíquenos su lengua materna, dónde vive y cuándo está disponible.'),
  ('how.step2_title', 'Reciba una invitación'),
  ('how.step2_body', 'Cuando un estudio coincide con su idioma y su país, le enviamos por correo electrónico una invitación personal, con el honorario y la duración de la sesión indicados por adelantado.'),
  ('how.step3_title', 'Reserve una hora'),
  ('how.step3_body', 'Elija la franja horaria que le convenga: las horas se muestran en su propia zona horaria. La confirmación, el enlace de la reunión y los recordatorios llegan todos automáticamente.'),
  ('how.step4_title', 'Participe y reciba su pago'),
  ('how.step4_body', 'Únase a la sesión, comparta su punto de vista y reciba su honorario. No hace falta preparación ni conocimientos especiales.'),
  ('how.note', 'La participación es siempre voluntaria: puede rechazar cualquier invitación o cancelar una reserva, y ello nunca afecta a futuras invitaciones.'),
  ('who.title', 'A quién buscamos'),
  ('who.intro', 'El panel está abierto en todo el mundo y crece cada semana. Tres tipos de miembros hacen posibles nuestros estudios:'),
  ('who.item1_title', 'Hablantes nativos'),
  ('who.item1_body', 'Personas adultas de cualquier trayectoria que hablan uno de los idiomas de nuestros estudios como lengua materna. No se necesita experiencia médica ni en el sector lingüístico: lo que cuenta es precisamente la perspectiva cotidiana.'),
  ('who.item2_title', 'Pacientes'),
  ('who.item2_body', 'Muchos estudios se centran en personas que viven con una afección de salud concreta, porque los cuestionarios que se prueban tratan sobre su experiencia. Compartir datos de salud es siempre opcional y se basa en el consentimiento.'),
  ('who.item3_title', 'Entrevistadores y captadores de la comunidad'),
  ('who.item3_body', 'Entrevistadores con experiencia en debriefing cognitivo, y personas con redes sólidas en su comunidad que pueden presentar participantes a cambio de un honorario por participante.'),
  ('roadmap.title', 'Hacia dónde se dirige el programa'),
  ('roadmap.p1', 'Nuestros estudios de validación lingüística se realizan en más de 150 idiomas, y estamos construyendo el panel a la misma medida, como una comunidad de investigación a largo plazo:'),
  ('roadmap.item1', 'Más idiomas y países, incluidas variantes regionales como el español de España frente al de América Latina'),
  ('roadmap.item2', 'Más estudios con pacientes en distintas áreas terapéuticas, desde la diabetes y la oncología hasta las enfermedades raras'),
  ('roadmap.item3', 'Grupos de discusión junto con las entrevistas individuales, con sesiones programadas en distintas zonas horarias'),
  ('roadmap.item4', 'Pagos de honorarios más rápidos y justos, y una experiencia de reserva más fluida en su propio idioma'),
  ('trust.title', 'Sus datos, su decisión'),
  ('trust.p1', 'Conservamos los datos que comparte únicamente para asignarle estudios adecuados y ponernos en contacto con usted al respecto. Nunca vendemos sus datos.'),
  ('trust.p2', 'La información de salud es opcional, se conserva con su consentimiento expreso y puede eliminarse en cualquier momento si así lo solicita.'),
  ('trust.p3', '¿Tiene preguntas sobre el programa o sus datos? Escríbanos a lv@cethos.com.'),
  ('cta.title', '¿Preparado para participar?'),
  ('cta.body', 'Registrarse lleva unos 5 minutos, y solo tendrá noticias nuestras cuando un estudio realmente encaje con usted.'),
  ('cta.button', 'Únase al panel de investigación'),
  ('cta.sponsor_title', '¿Está realizando un estudio de validación lingüística?'),
  ('cta.sponsor_body', 'Promotores y CRO: captamos, programamos y entrevistamos en más de 150 idiomas, con entrevistadores expertos en debriefing cognitivo y una coordinación integral.'),
  ('cta.sponsor_button', 'Hable con nuestro equipo')
) as v(key, value)
where ns.name = 'research'
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value, status = 'published', updated_at = now();
