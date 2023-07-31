const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flujoHorario = addKeyword(['horario']).addAnswer(['📄 https://usuarios.ingenieria.usac.edu.gt/horarios/semestre/2'])

const flujoPortal = addKeyword(['portal']).addAnswer(['📄 https://portal.ingenieria.usac.edu.gt/'])

const flujoUedi = addKeyword(['uedi']).addAnswer(['📄 https://uedi.ingenieria.usac.edu.gt/campus/'])

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer(
        [
            '🙌 Hola bienvenido a este *Chatbot*',
            'Qué pagina deseas visitar?',
            '👉 *Portal*',
            '👉 *Horario*',
            '👉 *UEDI*',
        ],
        null,
        null,
        [flujoHorario,flujoPortal,flujoUedi]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
