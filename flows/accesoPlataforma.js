const {addKeyword } = require('@bot-whatsapp/bot')

const flowAcceso = addKeyword('1')
.addAnswer('👩‍💻 Elija una las opciones para poder ayudarle!')
.addAnswer(
    [
        '1- ¿Cómo me registro?',
        '2- ¿Cómo Ingreso a la Plataforma Guacurarí?',
        '3- ¿Por qué no encuentro mi institución?',
        '4- Creación de la institución en plataforma',
    ])

export default flowAcceso