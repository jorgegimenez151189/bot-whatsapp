const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')



const flowGracias = addKeyword(['gracias', 'grac', 'Gracias', 'si']).addAnswer(
    [   
        '🚀 Cualquier duda o consulta estamos a su disposición',
        '¡¡Plataforma guacurarí! https://plataforma.com',
        '¡¡Ministerio!! https://www.ministerio.com.ar',
    ],
    null,
    null,
)
const flow = addKeyword('5')
    .addAnswer('🚨 Por favor comple el formulario y un facilitador se contectará con usted', null, 
    (ctx, {flowDynamic}) => {
        const generarLink = () => 'http://formulario.com/contacto'
        flowDynamic([{body: `Te envió el link generado: ${generarLink()}`}])
    })

const flowCursoAutoasistidoOps = addKeyword(['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f','G', 'g'])
    .addAnswer('🚨 Para solucionar el problema de ingreso completá el siguiente formulario.', null, 
    (ctx, {flowDynamic}) => {
        const generarLink = () => 'http://formulario.com/curos'
        flowDynamic([{body: `Te envió el link generado: ${generarLink()}`}])
    })
    .addAnswer('*Gracias por comunicarte con nosotros, te invitamos a que conozcas los contenidos educativos disponibles en el espacio público #AulasAbiertas*')

const flowCursoAutoasistido = addKeyword(['C', 'c'])
    .addAnswer('👩‍💻 Bienvenido a cursos autoasistidos!', {
        media: 'https://www.diario3.com.ar/wp-content/uploads/2023/05/WhatsApp-Image-2023-05-12-at-11.40.11-2-1-scaled.webp'
    })
    .addAnswer('👩‍💻 Seleccione a que curso desea ingresar!')
    .addAnswer(
        [
            'A - Leer en la virtualidad (N. Secundario)',
            'B - ¿Cómo ser sustentable y transformar el ambiente?',
            'C - Concientización para construir ciudadanía digital',
            'D - Planificar con el fin en mente. Nivel 1 PEI',
            'C - Planificar con el fin en mente. Nivel 2 PCI',
            'E - Planificar con el fin en mente. Nivel 3 Ambientes de aprendizaje profundo',
            'F - Planificar con el fin en mente. Nivel 4 Autoevaluación Institucional',
            'G - ABP: herramientas para su implementación en el nivel secundario'
        ], null, null, [flowCursoAutoasistidoOps])

const flowEF = addKeyword(['B', 'b'])
    .addAnswer('👩‍💻 Bienvenido a introduccción a la educación financiera!', {
        media: 'https://i.ytimg.com/vi/H0F1oui5w9Y/maxresdefault.jpg'
    })

const flowSensibilizacion = addKeyword(['A', 'a'])
    .addAnswer('👩‍💻 Bienvenido a introduccción a la sensibilización!', {
        media: 'https://reportemisiones.com.ar/wp-content/uploads/2023/04/ambiental.jpeg'
    })

const flowCursos = addKeyword('4')
    .addAnswer('👩‍💻 Seleccioná el curso al que hacés por favor:!')
    .addAnswer(
        [
            'A - Introducción a la sensibilización',
            'B - Introducción a la Educación Financiera',
            'C - Cursos autoasistidos ',
        ], null, null, [flowSensibilizacion, flowEF, flowCursoAutoasistido])

const flowNoEscuelaRegistrada = addKeyword(['no','NO','No'])
    .addAnswer('👩‍💻 Si te comunicaste con el gestor escolar y obtuviste algunas de estas respuestas: ')
    .addAnswer([
        'El gestor me dijo que ya estoy asignado',
        'Ya me ingresaron/asociaron en la la escuela',
        'Ya me inscribieron en la escuela/institución '
    ],null, 
    (ctx, {flowDynamic}) => {
        const generarLink = () => 'http://formulario.com/escuelanoesta'
        flowDynamic([{body: `Te envió el link generado: ${generarLink()}`}])
    })
   

const flowNoEscuela = addKeyword('3')
    .addAnswer('👩‍💻 Si es una escuela con la que aún no habías ingresado al Entorno Guacurarí, comunicate con el gestor escolar de la misma para verificar que te hayan asignado a la institución.')
    .addAnswer('¿Te pudimos ayudar?')
    .addAnswer(
        [
            'SI',
            'NO',
        ],null, null, [flowNoEscuelaRegistrada, flowGracias])


const flowIngresoSi = addKeyword(['Si', 'SI', 'si'],{ sensitive: true})
    .addAnswer('🚨 Para solucionar el problema de ingreso completá el siguiente formulario.', null, 
    (ctx, {flowDynamic}) => {
        const generarLink = () => 'http://formulario.com/ingreso'
        flowDynamic([{body: `Te envió el link generado: ${generarLink()}`}])
    })

const flowIngresoNo = addKeyword(['no', 'NO', 'No'],{ sensitive: true})
    .addAnswer([
        '🚨 Cuando ingresas al *#EntornoGuacurarí*, hacé clic en el botón *Ingresar con CiudadanoMisiones* y completá los datos para generar un usuario.',
        '👀 Prestá atención a cómo escribís tu correo electrónico y guardá en algún lugar la contraseña que ponés, que sea sencilla para que puedas recordarla. 🤓'
    ])
    .addAnswer('Gracias por usar bot guacu')

const flowIngreso = addKeyword('2')
    .addAnswer('👩‍💻 ¿Estás registrado en Ciudadano Misiones? ')
    .addAnswer(
        [
            'SI',
            'NO',
        ],null, null, [flowIngresoSi, flowIngresoNo])


const flowRegistro = addKeyword('1')
    .addAnswer('👩‍💻 Cuando ingresas al #EntornoGuacurarí, hacé clic en el botón “Ingresar con CiudadanoMisiones” y completá los datos para generar un usuario. Prestá atención a cómo escribís tu correo electrónico y guardá en algún lugar la contraseña que ponés, que sea sencilla para que puedas recordarla.')
    .addAnswer('¿Te pudimos ayudar?')
    .addAnswer(
        [
            'SI',
            'NO',
        ],null, null, [flowGracias])
        
const flowAcceso = addKeyword('1', 'no', 'No')
    .addAnswer('👩‍💻 Elija una las opciones para poder ayudarle!')
    .addAnswer(
        [
            '1 - ¿Cómo me registro?',
            '2 - ¿Cómo Ingreso a la Plataforma Guacurarí?',
            '3 - ¿Por qué no encuentro mi institución?',
            '4 - Creación de la institución en plataforma',
        ],null, null, [flowRegistro])

const flowPrincipal = addKeyword('hola', 'Hola', 'HOLA', 'Buenos días', 'Buenas tardes', 'buenas tardes', 'buenas', 'que tal', 'buenas tardes', 'buenos dias', 'BUENOS DIAS', 'BUENAS TARDES', 'buenas noches', 'Buenas noches', 'BUENAS NOCHES')
    .addAnswer('🙌 Hola bienvenido al *Chatbot Guacu*')
    .addAnswer(
        [
            'Soy BotGuacurari, gracias por comunicarte',
            '👉 me podrías indicar tu email por favor ', 
        ],
    )
    .addAnswer('¿Cual es tu email?', {capture: true}, (ctx, {fallBack}) => {
        if(!ctx.body.includes('@'))return fallBack()
        console.log('Correo ', ctx.body)
    })
    .addAnswer([
        'Elija un opción por favor: ', 
        '1) ¿Cómo accedo a la plataforma Guacurarí? 🧐', 
        '2) Tengo inconvenientes para ingresar a la plataforma guacurarí 😖',
        '3) No Encuentro mi escuela/institución en la plataforma 🫣',
        '4) Cursos 💻 - No puedo ingresar',
        '5) No encuentro la opción 🤯'
    ], null, null, [flowAcceso, flowIngreso, flowNoEscuela, flowCursos, flow])



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowGracias])
    const adapterProvider = createProvider(BaileysProvider)


    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
