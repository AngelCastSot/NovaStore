const BLOGS = [
  {
    id: 'B001',
    titulo: 'Cómo elegir audífonos con cancelación de ruido',
    fecha: '2026-03-12',
    autor: 'Angel Castillo',
    categoria: 'Audio',
    imagen: 'blog/audifonos-ruido.svg',
    resumen: 'No todas las cancelaciones son iguales: revisa el tipo de micrófono, la autonomía real y el ajuste de las almohadillas antes de decidir.',
    contenido: [
      'La cancelación activa de ruido funciona con micrófonos que escuchan el sonido del ambiente y generan una onda inversa que lo neutraliza. Suena simple, pero el resultado depende de cuántos micrófonos tenga el audífono y de dónde estén ubicados. Los modelos con micrófonos internos y externos corrigen mejor lo que se filtra por las almohadillas.',
      'El ajuste importa tanto como la electrónica. Un audífono over-ear que no sella bien deja pasar ruido agudo por más buena que sea su cancelación. Si usas lentes, busca almohadillas de espuma viscoelástica, que se adaptan alrededor de las patillas sin dejar espacios.',
      'La autonomía publicada casi siempre se mide con la cancelación apagada. Como regla práctica, descuenta entre un 20% y un 30% de las horas que promete la caja si piensas usar la cancelación todo el día. Revisa también si el audífono funciona por cable cuando se queda sin batería: es la diferencia entre seguir trabajando o quedarte en silencio.',
      'Por último, prueba el modo transparencia. Es el que te deja escuchar el entorno sin sacarte los audífonos, y es el que más se nota en el uso diario: sirve para cruzar la calle, pedir un café o escuchar un anuncio en el metro.'
    ]
  },
  {
    id: 'B002',
    titulo: 'Tu primera casa inteligente por menos de $50.000',
    fecha: '2026-02-28',
    autor: 'Angel Castillo',
    categoria: 'Hogar inteligente',
    imagen: 'blog/casa-inteligente.svg',
    resumen: 'Con un enchufe wifi y una ampolleta conectada ya puedes automatizar luces, riego y calefacción sin cambiar la instalación eléctrica.',
    contenido: [
      'Automatizar la casa no parte por comprar un asistente de voz caro, sino por resolver un problema concreto. El más común es la luz: llegar de noche a una casa oscura o dejar encendida la del pasillo toda la madrugada.',
      'Un enchufe inteligente cuesta menos que una cena para dos y convierte en programable cualquier aparato que ya tengas: la lámpara del living, el ventilador, el calefactor o la bomba del riego. Se conecta al wifi de la casa y se controla desde el celular, sin tocar la instalación eléctrica ni llamar a un técnico.',
      'El segundo paso natural es una ampolleta conectada en el dormitorio. Programada para bajar la intensidad a las 22:00, funciona mejor que cualquier recordatorio para ordenar el horario de sueño. Y si cambia de color, sirve como alarma silenciosa para avisar cosas que no quieres que suenen.',
      'Una advertencia: revisa que los aparatos hablen el mismo idioma. Si vas a sumar equipos con el tiempo, elige productos compatibles con el mismo estándar para no terminar con cuatro aplicaciones distintas en el celular.'
    ]
  },
  {
    id: 'B003',
    titulo: 'Switches de teclado: rojos, azules o marrones',
    fecha: '2026-02-15',
    autor: 'Angel Castillo',
    categoria: 'Gaming',
    imagen: 'blog/switches-teclado.svg',
    resumen: 'La diferencia está en la fuerza de activación y el ruido. Te contamos cuál conviene si compartes escritorio con otras personas.',
    contenido: [
      'Un switch mecánico es el mecanismo que hay debajo de cada tecla. Los tres tipos más vendidos se distinguen por color y describen tres sensaciones distintas al escribir.',
      'Los rojos son lineales: la tecla baja de forma pareja hasta el fondo, sin escalón ni clic. Requieren poca fuerza, por eso son los favoritos para juegos donde se repite una tecla muchas veces. Su contra es que se escriben "a ciegas" y aumentan los errores de tipeo hasta que te acostumbras.',
      'Los azules son de clic: tienen un tope táctil y un sonido fuerte que confirma la pulsación. Son deliciosos para escribir textos largos y pésimos para una oficina compartida o una llamada por videoconferencia.',
      'Los marrones son el punto medio: se siente un pequeño escalón cuando la tecla se activa, pero sin el clic sonoro. Si no tienes claro cuál elegir y compartes espacio con alguien, empieza por marrones.',
      'Un detalle que casi nadie menciona: las almohadillas de espuma dentro del teclado y las tapas de las teclas influyen tanto en el ruido como el switch mismo. Un teclado con buena espuma suena grave y contenido, aunque use switches azules.'
    ]
  },
  {
    id: 'B004',
    titulo: 'Smartwatch o pulsera de actividad',
    fecha: '2026-01-30',
    autor: 'Angel Castillo',
    categoria: 'Wearables',
    imagen: 'blog/reloj-o-pulsera.svg',
    resumen: 'Si solo quieres medir pasos y sueño, una pulsera basta. El reloj se justifica cuando necesitas GPS independiente y notificaciones.',
    contenido: [
      'La pregunta correcta no es cuál mide mejor, sino qué vas a hacer con el dato. Para contar pasos, estimar calorías y registrar horas de sueño, una pulsera de actividad entrega prácticamente la misma información que un reloj que cuesta cuatro veces más.',
      'El reloj se justifica en tres casos. El primero es el GPS propio: si sales a correr o a andar en bicicleta sin el celular, necesitas que el equipo registre el recorrido por sí solo. El segundo son las notificaciones que respondes desde la muñeca. El tercero es el pago sin contacto.',
      'La batería marca la diferencia diaria. Una pulsera dura entre una y dos semanas; un reloj con pantalla siempre encendida rara vez pasa de dos días. Cargar todas las noches también significa no registrar el sueño.',
      'Si recién empiezas, parte por la pulsera. Cuando te moleste alguna limitación concreta sabrás exactamente qué pedirle al reloj que compres después.'
    ]
  },
  {
    id: 'B005',
    titulo: 'Cinco señales de que tu mouse te está lesionando',
    fecha: '2026-01-18',
    autor: 'Angel Castillo',
    categoria: 'Computación',
    imagen: 'blog/mouse-ergonomico.svg',
    resumen: 'Hormigueo, muñeca apoyada en el escritorio y hombro adelantado: pequeños ajustes que evitan el dolor después de ocho horas.',
    contenido: [
      'El dolor de muñeca frente al computador casi nunca aparece de golpe. Empieza con molestias que se normalizan hasta que se vuelven permanentes.',
      'La primera señal es el hormigueo en los dedos después de una jornada larga. La segunda, apoyar la muñeca en el borde del escritorio: ese punto de presión comprime el túnel carpiano. La tercera es mover el mouse desde la muñeca en lugar del antebrazo, algo que ocurre cuando el sensor está configurado en muy pocos DPI.',
      'La cuarta señal es el hombro adelantado: si el mouse está demasiado lejos del teclado, el brazo trabaja extendido durante horas. La quinta es el agarre en garra, con los dedos arqueados y tensos.',
      'Los ajustes son baratos. Sube los DPI para mover el cursor con menos desplazamiento, acerca el mouse al cuerpo, apoya el antebrazo completo en el escritorio y considera un modelo ergonómico si pasas más de seis horas al día con la mano ahí.'
    ]
  },
  {
    id: 'B006',
    titulo: 'Cuánto dura realmente una batería de litio',
    fecha: '2026-01-05',
    autor: 'Angel Castillo',
    categoria: 'Guías',
    imagen: 'blog/bateria-litio.svg',
    resumen: 'Cargar al 100% todos los días acorta la vida útil. Estas son las rutinas que sí alargan la batería de tus dispositivos.',
    contenido: [
      'Las baterías de litio no se miden en años sino en ciclos de carga. Un ciclo es consumir el equivalente al 100% de la capacidad, aunque sea en varios días. La mayoría conserva cerca del 80% de su capacidad original después de unos 500 ciclos.',
      'Lo que más desgasta no es cargar seguido, sino mantener la batería en los extremos. Dejarla al 100% enchufada toda la noche y vaciarla hasta apagarse son las dos costumbres que más acortan su vida. El rango cómodo está entre 20% y 80%.',
      'El calor es el otro enemigo. Cargar el celular debajo de la almohada o dejar el notebook sobre un cobertor eleva la temperatura interna y acelera el deterioro químico de las celdas.',
      'Si vas a guardar un equipo sin usar por meses, déjalo cerca del 50% de carga y en un lugar fresco. Guardarlo descargado puede dejar la batería en un estado del que no se recupera.'
    ]
  }
];
