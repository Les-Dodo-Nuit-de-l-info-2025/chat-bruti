import path from "path";

import personnagesData from '../data/data.json';
import systemPromptTemplate from '../data/prompt.json';

/**
 * Classe pour gérer un interlocuteur (personnage) dans une conversation
 */
class Interlocuteur {
  /**
   * Crée un nouvel interlocuteur
   * @param {string|null} personnageNom - Le nom du personnage, ou null pour en choisir un au hasard
   */
  constructor(personnageNom = null) {
    // Si aucun nom n'est fourni, choisir un personnage au hasard
    if (personnageNom === null) {
      const index = Math.floor(
        Math.random() * personnagesData.personnages.length
      );
      this.personnage = personnagesData.personnages[index];
      console.log(
        `Interlocuteur au bout du fil : ${this.personnage.nom}`
      );
    } else {
      // Trouver le personnage spécifique
      this.personnage = personnagesData.personnages.find(
        (p) => p.nom === personnageNom
      );

      if (!this.personnage) {
        throw new Error(`Personnage "${personnageNom}" non trouvé`);
      }
    }

    // Composer le prompt système
    this.systemPrompt = this.composeSystemPrompt(
      this.personnage.systemPromptAddon
    );

    // Initialiser l'historique
    this.historique = [];

    console.log(`📞 ${this.personnage.nom} décroche le téléphone...`);
    console.log(`   "${this.personnage.introduction}"\n`);
  }

  /**
   * Compose le prompt système complet en insérant l'addon du personnage
   */
  composeSystemPrompt(personnageAddon) {
    return systemPromptTemplate.prompt.replace(
      "[PERSONNAGE]\n{Le addon du personnage sera inséré ici dynamiquement}\n[/PERSONNAGE]",
      `[PERSONNAGE]\n${personnageAddon}\n[/PERSONNAGE]`
    );
  }

  /**
   * Ajoute un message utilisateur à l'historique
   */
  ajouterMessageUtilisateur(message) {
    this.historique.push({
      role: "user",
      content: message,
    });
  }

  /**
   * Ajoute une réponse de l'assistant à l'historique
   */
  ajouterReponseAssistant(reponse) {
    this.historique.push({
      role: "assistant",
      content: reponse,
    });
  }

  /**
   * Récupère l'historique complet de la conversation
   */
  obtenirHistorique() {
    return [...this.historique];
  }

  /**
   * Affiche l'historique de manière lisible
   */
  afficherHistorique() {
    console.log(`\n=== Historique avec ${this.personnage.nom} ===\n`);

    if (this.historique.length === 0) {
      console.log("(Aucun message dans l'historique)\n");
      return;
    }

    this.historique.forEach((message, index) => {
      if (message.role === "user") {
        console.log(`UTILISATEUR:`);
        console.log(message.content);
      } else {
        console.log(`${this.personnage.nom.toUpperCase()}:`);
        console.log(message.content);
      }

      // Séparateur entre les messages (sauf après le dernier)
      if (index < this.historique.length - 1) {
        console.log("\n" + "─".repeat(60) + "\n");
      }
    });

    console.log("\n" + "=".repeat(60) + "\n");
  }

  /**
   * Réinitialise complètement la conversation (efface tout l'historique)
   */
  reinitialiser() {
    this.historique = [];
    console.log(
      `Conversation avec ${this.personnage.nom} réinitialisée (historique effacé).`
    );
  }

  /**
   * Simule l'oubli du personnage en ne gardant que les N derniers échanges
   * @param {number} nombreEchanges - Nombre d'échanges à conserver (1 échange = 1 message user + 1 réponse assistant)
   */
  oublier(nombreEchanges = 2) {
    if (this.historique.length === 0) {
      return;
    }

    // Calculer combien de messages garder (1 échange = 2 messages)
    const messagesAGarder = nombreEchanges * 2;

    if (this.historique.length > messagesAGarder) {
      const ancienneLength = this.historique.length;
      this.historique = this.historique.slice(-messagesAGarder);
      console.log(
        `${this.personnage.nom} oublie le début de la conversation (${
          ancienneLength - messagesAGarder
        } messages supprimés, ${messagesAGarder} conservés)`
      );
    }
  }

  /**
   * Simule un oubli partiel aléatoire (garde entre 1 et 3 derniers échanges)
   * Utile pour simuler la distraction d'un personnage
   */
  oublierAleatoirement() {
    const nombreEchanges = Math.floor(Math.random() * 3) + 1; // Entre 1 et 3
    this.oublier(nombreEchanges);
  }

  /**
   * Envoie un message et reçoit une réponse
   * @param {boolean} conserverHistorique - Si false, n'envoie que le dernier message sans historique
   */
  async envoyerMessage(userMessage, conserverHistorique = true) {
    // Ajouter le message de l'utilisateur à l'historique
    this.ajouterMessageUtilisateur(userMessage);

    console.log(`\n💬 Envoi du message à ${this.personnage.nom}...`);

    try {
      // Préparer les messages pour l'API
      let messagesAPI;

      if (conserverHistorique) {
        // Mode normal : envoyer tout l'historique
        messagesAPI = [
          {
            role: "system",
            content: this.systemPrompt,
          },
          ...this.historique,
        ];
      } else {
        // Mode "sans mémoire" : envoyer uniquement le dernier message
        messagesAPI = [
          {
            role: "system",
            content: this.systemPrompt,
          },
          {
            role: "user",
            content: userMessage,
          },
        ];
      }

      // Appeler l'API Mistral
      const response = await fetch(
        "https://api.mistral.ai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer dX4GoykxAc9gfC0s4emcAq3GmDBc7f1j`, // #sécurité #bonnepratique #oups
          },
          body: JSON.stringify({
            model: "mistral-small-latest",
            messages: messagesAPI,
            temperature: 0.7,
            max_tokens: 4096,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur API Mistral: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();

      // Extraire la réponse textuelle
      const assistantResponse = data.choices[0].message.content;

      // Ajouter la réponse à l'historique
      this.ajouterReponseAssistant(assistantResponse);

      console.log(`\n🤖 ${this.personnage.nom}:`);
      console.log(assistantResponse);
      console.log();

      return assistantResponse;
    } catch (error) {
      console.error("❌ Erreur lors de l'appel à l'API:", error);
      throw error;
    }
  }

  /**
   * Sauvegarde l'historique dans un fichier JSON
   */
  sauvegarderHistorique(nomFichier = null) {
    const fichier =
      nomFichier || `conversation_${this.personnage.nom}_${Date.now()}.json`;
    const cheminComplet = path.join(__dirname, "conversations", fichier);

    // Créer le dossier conversations s'il n'existe pas
    const dossier = path.join(__dirname, "conversations");
    if (!fs.existsSync(dossier)) {
      fs.mkdirSync(dossier);
    }

    const donnees = {
      personnage: this.personnage.nom,
      dateCreation: new Date().toISOString(),
      historique: this.historique,
    };

    fs.writeFileSync(cheminComplet, JSON.stringify(donnees, null, 2));
    console.log(`Conversation sauvegardée: ${fichier}`);

    return cheminComplet;
  }

  /**
   * Charge l'historique depuis un fichier JSON
   */
  chargerHistorique(cheminFichier) {
    const donnees = JSON.parse(fs.readFileSync(cheminFichier, "utf-8"));

    if (donnees.personnage !== this.personnage.nom) {
      console.warn(
        `Attention: le fichier contient une conversation avec ${donnees.personnage}, mais vous utilisez ${this.personnage.nom}`
      );
    }

    this.historique = donnees.historique;
    console.log(
      `Historique chargé depuis ${path.basename(cheminFichier)}`
    );
  }

  /**
   * Retourne les informations du personnage
   */
  obtenirInfosPersonnage() {
    return {
      nom: this.personnage.nom,
      introduction: this.personnage.introduction,
      photo: this.personnage.photo,
    };
  }
}

/**
 * Liste tous les personnages disponibles
 */
function listerPersonnages() {
  console.log("\n=== Personnages disponibles ===");
  personnagesData.personnages.forEach((p, index) => {
    console.log(`${index + 1}. ${p.nom}`);
    console.log(`   ${p.introduction}`);
    console.log();
  });
}

// Exemple d'utilisation
async function main() {
  // Lister les personnages disponibles
  listerPersonnages();

  // Créer un interlocuteur aléatoire
  const interlocuteur = new Interlocuteur(); // Personnage choisi au hasard

  // Ou créer un interlocuteur spécifique
  // const interlocuteur = new Interlocuteur("Huguette");

  // Conversation avec gestion de l'oubli
  await interlocuteur.envoyerMessage(
    "Bonjour, j'ai besoin d'un formulaire de demande de permis de construire."
  );

  await interlocuteur.envoyerMessage(
    "Oui mais j'ai vraiment besoin de ce document rapidement."
  );

  await interlocuteur.envoyerMessage(
    "C'est pour construire une extension de ma maison."
  );

  // Le personnage oublie et ne garde que les 2 derniers échanges
  interlocuteur.oublier(2);

  await interlocuteur.envoyerMessage(
    "Vous vous souvenez de ce que je vous ai dit au début ?"
  );

  // Afficher l'historique complet
  interlocuteur.afficherHistorique();

  // Sauvegarder la conversation
  interlocuteur.sauvegarderHistorique();
}


export { Interlocuteur, listerPersonnages };