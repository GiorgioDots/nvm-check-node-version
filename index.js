const { execSync } = require('child_process');
const semver = require('semver');

// Otteniamo la versione richiesta come argomento da riga di comando
const requiredVersion = process.argv[2];

// Verifica se l'argomento della versione è stato passato
if (!requiredVersion) {
    console.error('Errore: Nessuna versione di Node.js specificata. Usa: node check-node-version.js <versione>');
    process.exit(1);
}

// Funzione per eseguire comandi shell sincroni
function runCommand(command) {
    try {
        return execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Errore nell'esecuzione del comando: ${command}`);
        process.exit(1);
    }
}

// Funzione che introduce un ritardo di alcuni secondi (ad esempio 2 secondi)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Verifica la versione di Node.js installata
const installedVersion = process.version;

// Funzione principale per gestire il cambio versione
async function checkAndSetNodeVersion() {
    if (!semver.satisfies(installedVersion, requiredVersion)) {
        console.log(`Versione di Node.js corrente (${installedVersion}) non è ${requiredVersion}.`);

        // Controlla se nvm è installato
        try {
            execSync('nvm --version', { stdio: 'ignore' });
            console.log('nvm è installato, procedo con il cambio versione...');
        } catch (error) {
            console.error('nvm non è installato. Si prega di installare nvm prima di continuare.');
            process.exit(1);
        }

        // Installa la versione corretta di Node.js se non è già installata
        console.log(`Installo la versione di Node.js ${requiredVersion} tramite nvm...`);
        runCommand(`nvm install ${requiredVersion}`);

        // Usa la versione di Node.js richiesta
        console.log(`Uso la versione di Node.js ${requiredVersion} tramite nvm...`);
        runCommand(`nvm use ${requiredVersion}`);

        // Aggiungi un ritardo di 2 secondi per garantire che nvm carichi la versione di Node.js correttamente
        await delay(2000);
        console.log('Versione di Node.js caricata correttamente.');

    } else {
        console.log(`Versione di Node.js corretta (${installedVersion})!`);
    }
}

// Esegui il controllo e il set della versione di Node.js
checkAndSetNodeVersion()
    .then(() => {
        console.log("Processo completato, pronto a partire!");
    })
    .catch((error) => {
        console.error("Errore durante il controllo della versione di Node.js:", error);
        process.exit(1);
    });
