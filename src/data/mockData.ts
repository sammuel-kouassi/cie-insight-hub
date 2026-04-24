export const monthlyParticipants = [
  { month: "Jan", participants: 320, objectif: 400 },
  { month: "Fév", participants: 480, objectif: 450 },
  { month: "Mar", participants: 560, objectif: 500 },
  { month: "Avr", participants: 420, objectif: 500 },
  { month: "Mai", participants: 680, objectif: 600 },
  { month: "Jun", participants: 750, objectif: 650 },
  { month: "Jul", participants: 620, objectif: 700 },
  { month: "Aoû", participants: 530, objectif: 600 },
  { month: "Sep", participants: 710, objectif: 700 },
  { month: "Oct", participants: 890, objectif: 800 },
  { month: "Nov", participants: 820, objectif: 850 },
  { month: "Déc", participants: 640, objectif: 700 },
];

export const participantsByRegion = [
  { region: "Abidjan", participants: 3200, fill: "hsl(152, 60%, 45%)" },
  { region: "Bouaké", participants: 1800, fill: "hsl(24, 100%, 50%)" },
  { region: "Yamoussoukro", participants: 1200, fill: "hsl(38, 92%, 50%)" },
  { region: "San Pedro", participants: 950, fill: "hsl(152, 60%, 35%)" },
  { region: "Korhogo", participants: 780, fill: "hsl(210, 100%, 56%)" },
  { region: "Daloa", participants: 650, fill: "hsl(280, 60%, 55%)" },
];

export const participantsByType = [
  { name: "Particuliers", value: 45, fill: "hsl(152, 60%, 45%)" },
  { name: "Commerçants", value: 25, fill: "hsl(24, 100%, 50%)" },
  { name: "Entreprises", value: 15, fill: "hsl(152, 60%, 35%)" },
  { name: "Administrations", value: 10, fill: "hsl(210, 100%, 56%)" },
  { name: "Autres", value: 5, fill: "hsl(220, 10%, 46%)" },
];

export const recentCampaigns = [
  { id: 1, nom: "Sensibilisation Abobo", typeSeance: "Sensibilisation", motif: "Sensibiliser sur la sécurité électrique", cible: "Quartiers non structurés", zone: "Abidjan", objectifParticipants: 200, organisateur: "Kouamé A.", presentateur: "Diallo M.", assistants: ["Konan E.", "Adjoua P."], datePrevue: "2025-01-15", heureDebut: "08:00", heureFin: "12:00", statut: "Terminée" },
  { id: 2, nom: "Campagne Bouaké Centre", typeSeance: "Information", motif: "Économie d'énergie et branchements", cible: "Lieux publics (Marchés, Gares)", zone: "Bouaké", objectifParticipants: 150, organisateur: "Traoré M.", presentateur: "Ouédraogo S.", assistants: ["Koffi L."], datePrevue: "2025-01-18", heureDebut: "09:00", heureFin: "13:00", statut: "En cours" },
  { id: 3, nom: "Mission Yopougon", typeSeance: "Sensibilisation", motif: "Lutte contre les branchements illicites", cible: "Quartiers Structurés", zone: "Abidjan", objectifParticipants: 250, organisateur: "Bamba K.", presentateur: "Aka R.", assistants: ["Yapi G.", "Tano M.", "Brou C."], datePrevue: "2025-01-20", heureDebut: "07:30", heureFin: "11:30", statut: "Terminée" },
  { id: 4, nom: "Sensibilisation Korhogo", typeSeance: "Formation", motif: "Droits et devoirs du client", cible: "Collectivités Territoriales", zone: "Korhogo", objectifParticipants: 100, organisateur: "Coulibaly S.", presentateur: "Soro K.", assistants: ["Doumbia F."], datePrevue: "2025-02-05", heureDebut: "08:00", heureFin: "12:00", statut: "Planifiée" },
  { id: 5, nom: "Campagne San Pedro", typeSeance: "Consultation publique", motif: "Facturation et paiement", cible: "Administrations Publics et Privées", zone: "San Pedro", objectifParticipants: 180, organisateur: "Yao F.", presentateur: "Gbagbo A.", assistants: ["Niamké P.", "Beugré J."], datePrevue: "2025-01-25", heureDebut: "09:00", heureFin: "14:00", statut: "En cours" },
];

export const gadgetDistribution = [
  { month: "Jan", distribues: 450, stock: 1200 },
  { month: "Fév", distribues: 620, stock: 980 },
  { month: "Mar", distribues: 580, stock: 850 },
  { month: "Avr", distribues: 390, stock: 760 },
  { month: "Mai", distribues: 710, stock: 550 },
  { month: "Jun", distribues: 800, stock: 350 },
];

export const weeklyActivity = [
  { jour: "Lun", contacts: 12, inscriptions: 45 },
  { jour: "Mar", contacts: 18, inscriptions: 62 },
  { jour: "Mer", contacts: 15, inscriptions: 53 },
  { jour: "Jeu", contacts: 22, inscriptions: 78 },
  { jour: "Ven", contacts: 20, inscriptions: 71 },
  { jour: "Sam", contacts: 8, inscriptions: 32 },
  { jour: "Dim", contacts: 3, inscriptions: 12 },
];

// ── Participants page data ──
export const participantsList = [
  { id: 1, nom: "Koné", prenom: "Amadou", telephone: "07 12 34 56", profession: "Commerçant", statutLogement: "Propriétaire", lieuHabitation: "Abobo", localite: "Abidjan", quartier: "Abobo Baoulé", seance: "Sensibilisation Abobo", besoinExprime: "Compteur prépayé" },
  { id: 2, nom: "Touré", prenom: "Fatou", telephone: "05 98 76 54", profession: "Ménagère", statutLogement: "Locataire", lieuHabitation: "Bouaké", localite: "Bouaké", quartier: "Commerce", seance: "Campagne Bouaké Centre", besoinExprime: "Branchement neuf" },
  { id: 3, nom: "Bamba", prenom: "Issouf", telephone: "01 23 45 67", profession: "Entrepreneur", statutLogement: "Propriétaire", lieuHabitation: "Yopougon", localite: "Abidjan", quartier: "Sicogi", seance: "Mission Yopougon", besoinExprime: "Augmentation puissance" },
  { id: 4, nom: "Diallo", prenom: "Mariam", telephone: "07 65 43 21", profession: "Enseignante", statutLogement: "Locataire", lieuHabitation: "San Pedro", localite: "San Pedro", quartier: "Cité", seance: "Campagne San Pedro", besoinExprime: "Compteur prépayé" },
  { id: 5, nom: "Yao", prenom: "Kouassi", telephone: "05 11 22 33", profession: "Fonctionnaire", statutLogement: "Propriétaire", lieuHabitation: "Yamoussoukro", localite: "Yamoussoukro", quartier: "Habitat", seance: "Sensibilisation Yamoussoukro", besoinExprime: "Branchement neuf" },
  { id: 6, nom: "Coulibaly", prenom: "Seydou", telephone: "07 44 55 66", profession: "Agriculteur", statutLogement: "Propriétaire", lieuHabitation: "Korhogo", localite: "Korhogo", quartier: "Soba", seance: "Sensibilisation Korhogo", besoinExprime: "Extension réseau" },
  { id: 7, nom: "Ouattara", prenom: "Awa", telephone: "05 77 88 99", profession: "Commerçante", statutLogement: "Locataire", lieuHabitation: "Daloa", localite: "Daloa", quartier: "Marché", seance: "Campagne Daloa", besoinExprime: "Compteur prépayé" },
  { id: 8, nom: "N'Guessan", prenom: "Yves", telephone: "01 00 11 22", profession: "Étudiant", statutLogement: "Locataire", lieuHabitation: "Cocody", localite: "Abidjan", quartier: "Riviera", seance: "Sensibilisation Abobo", besoinExprime: "Branchement neuf" },
];

// ── Contacts / Prises de contact ──
export const contactsList = [
  { id: 1, nomComplet: "Koné Amadou", telephone: "07 12 34 56", date: "2025-01-10", objetMission: "Sensibilisation sur la sécurité", directionRegionale: "Abidjan", agence: "Agence Abobo", quartier: "Abobo Baoulé", site: "Marché central", pointsAbordes: "Sécurité électrique, Économie d'énergie", observations: "Client très intéressé" },
  { id: 2, nomComplet: "Touré Fatou", telephone: "05 98 76 54", date: "2025-01-11", objetMission: "Branchements illicites", directionRegionale: "Bouaké", agence: "Agence Bouaké Centre", quartier: "Commerce", site: "Quartier Commerce", pointsAbordes: "Branchements illicites, Facturation", observations: "RDV pris pour suivi" },
  { id: 3, nomComplet: "Bamba Issouf", telephone: "01 23 45 67", date: "2025-01-12", objetMission: "Économie d'énergie", directionRegionale: "Abidjan", agence: "Agence Yopougon", quartier: "Sicogi", site: "Résidence Sicogi", pointsAbordes: "Économie d'énergie, Droits client", observations: "Converti" },
  { id: 4, nomComplet: "Diallo Mariam", telephone: "07 65 43 21", date: "2025-01-13", objetMission: "Facturation et paiement", directionRegionale: "San Pedro", agence: "Agence San Pedro", quartier: "Cité", site: "Place du marché", pointsAbordes: "Facturation et paiement", observations: "Pas intéressée" },
  { id: 5, nomComplet: "Yao Kouassi", telephone: "05 11 22 33", date: "2025-01-14", objetMission: "Sécurité électrique", directionRegionale: "Yamoussoukro", agence: "Agence Yamoussoukro", quartier: "Habitat", site: "Cité Habitat", pointsAbordes: "Sécurité électrique, Numéros d'urgence", observations: "Intéressé, demande brochure" },
  { id: 6, nomComplet: "Coulibaly Seydou", telephone: "07 44 55 66", date: "2025-01-15", objetMission: "Droits et devoirs du client", directionRegionale: "Korhogo", agence: "Agence Korhogo", quartier: "Soba", site: "Chef-lieu Soba", pointsAbordes: "Droits et devoirs, Branchements illicites", observations: "RDV planifié" },
  { id: 7, nomComplet: "Ouattara Awa", telephone: "05 77 88 99", date: "2025-01-16", objetMission: "Sensibilisation générale", directionRegionale: "Daloa", agence: "Agence Daloa", quartier: "Marché", site: "Grand marché", pointsAbordes: "Économie d'énergie, Facturation", observations: "Converti avec succès" },
  { id: 8, nomComplet: "N'Guessan Yves", telephone: "01 00 11 22", date: "2025-01-17", objetMission: "Sécurité électrique", directionRegionale: "Abidjan", agence: "Agence Cocody", quartier: "Riviera", site: "Riviera Palmeraie", pointsAbordes: "Sécurité électrique", observations: "Étudiant, sensibilisé" },
];

export const contactsByResult = [
  { name: "Converti", value: 35, fill: "hsl(152, 60%, 45%)" },
  { name: "Intéressé", value: 30, fill: "hsl(24, 100%, 50%)" },
  { name: "RDV pris", value: 20, fill: "hsl(210, 100%, 56%)" },
  { name: "Pas intéressé", value: 15, fill: "hsl(220, 10%, 46%)" },
];

// ── Rendez-vous ──
export const rdvList = [
  { id: 1, titre: "Visite de suivi", contact: "Touré Fatou", date: "2025-01-20", heure: "09:00", lieu: "Bureau Bouaké", seance: "Campagne Bouaké Centre", statut: "Confirmé" },
  { id: 2, titre: "Évaluation terrain", contact: "Coulibaly Seydou", date: "2025-01-21", heure: "10:30", lieu: "Domicile", seance: "Sensibilisation Korhogo", statut: "En attente" },
  { id: 3, titre: "Présentation compteur", contact: "Koné Amadou", date: "2025-01-22", heure: "14:00", lieu: "Bureau Abidjan", seance: "Sensibilisation Abobo", statut: "Confirmé" },
  { id: 4, titre: "Suivi branchement", contact: "Yao Kouassi", date: "2025-01-23", heure: "11:00", lieu: "Mairie Yamoussoukro", seance: "Sensibilisation Yamoussoukro", statut: "Annulé" },
  { id: 5, titre: "Finalisation dossier", contact: "Bamba Issouf", date: "2025-01-24", heure: "15:30", lieu: "Bureau Abidjan", seance: "Mission Yopougon", statut: "Confirmé" },
  { id: 6, titre: "Consultation technique", contact: "Diallo Mariam", date: "2025-01-25", heure: "09:30", lieu: "Bureau San Pedro", seance: "Campagne San Pedro", statut: "En attente" },
];

export const rdvByStatus = [
  { name: "Confirmé", value: 55, fill: "hsl(152, 60%, 45%)" },
  { name: "En attente", value: 30, fill: "hsl(38, 92%, 50%)" },
  { name: "Annulé", value: 15, fill: "hsl(0, 70%, 50%)" },
];

// ── Gadgets ──
export const gadgetsList = [
  { id: 1, nom: "T-shirt DLF", categorie: "Textile", stock: 450, distribues: 1200, campagne: "Sensibilisation Abobo" },
  { id: 2, nom: "Casquette DLF", categorie: "Textile", stock: 320, distribues: 890, campagne: "Multiple" },
  { id: 3, nom: "Stylo DLF", categorie: "Papeterie", stock: 1500, distribues: 3200, campagne: "Multiple" },
  { id: 4, nom: "Porte-clés", categorie: "Accessoire", stock: 200, distribues: 650, campagne: "Campagne Bouaké" },
  { id: 5, nom: "Sac DLF", categorie: "Textile", stock: 180, distribues: 420, campagne: "Mission Yopougon" },
  { id: 6, nom: "Bloc-notes", categorie: "Papeterie", stock: 600, distribues: 1100, campagne: "Multiple" },
];

export const gadgetsByCategory = [
  { name: "Textile", value: 40, fill: "hsl(152, 60%, 45%)" },
  { name: "Papeterie", value: 35, fill: "hsl(24, 100%, 50%)" },
  { name: "Accessoire", value: 25, fill: "hsl(210, 100%, 56%)" },
];

// ── Stats page extra data ──
export const conversionFunnel = [
  { etape: "Participants", count: 10420 },
  { etape: "Contactés", count: 6850 },
  { etape: "Intéressés", count: 4200 },
  { etape: "RDV pris", count: 2100 },
  { etape: "Convertis", count: 1450 },
];

export const performanceByAgent = [
  { agent: "Kouamé A.", participants: 1250, contacts: 420, conversions: 180 },
  { agent: "Traoré M.", participants: 980, contacts: 350, conversions: 145 },
  { agent: "Bamba K.", participants: 1100, contacts: 390, conversions: 160 },
  { agent: "Coulibaly S.", participants: 750, contacts: 280, conversions: 110 },
  { agent: "Yao F.", participants: 890, contacts: 310, conversions: 130 },
];

// ── Cartographie data ──
export interface CampaignLocation {
  id: number;
  nom: string;
  ville: string;
  lat: number;
  lng: number;
  statut: "Terminée" | "En cours" | "Planifiée";
  participants: number;
  agent: string;
  date: string;
}

export const campaignLocations: CampaignLocation[] = [
  { id: 1, nom: "Sensibilisation Abobo", ville: "Abidjan", lat: 5.4164, lng: -4.0167, statut: "Terminée", participants: 145, agent: "Kouamé A.", date: "2025-01-15" },
  { id: 2, nom: "Campagne Bouaké Centre", ville: "Bouaké", lat: 7.6881, lng: -5.0305, statut: "En cours", participants: 89, agent: "Traoré M.", date: "2025-01-18" },
  { id: 3, nom: "Mission Yopougon", ville: "Abidjan (Yopougon)", lat: 5.3364, lng: -4.0689, statut: "Terminée", participants: 210, agent: "Bamba K.", date: "2025-01-20" },
  { id: 4, nom: "Sensibilisation Korhogo", ville: "Korhogo", lat: 9.4580, lng: -5.6295, statut: "Planifiée", participants: 0, agent: "Coulibaly S.", date: "2025-02-05" },
  { id: 5, nom: "Campagne San Pedro", ville: "San Pedro", lat: 4.7485, lng: -6.6363, statut: "En cours", participants: 132, agent: "Yao F.", date: "2025-01-25" },
  { id: 6, nom: "Sensibilisation Yamoussoukro", ville: "Yamoussoukro", lat: 6.8276, lng: -5.2893, statut: "Terminée", participants: 95, agent: "Kouamé A.", date: "2025-01-10" },
  { id: 7, nom: "Campagne Man", ville: "Man", lat: 7.4125, lng: -7.5536, statut: "Planifiée", participants: 0, agent: "Traoré M.", date: "2025-02-12" },
  { id: 8, nom: "Mission Daloa", ville: "Daloa", lat: 6.8774, lng: -6.4502, statut: "Terminée", participants: 78, agent: "Bamba K.", date: "2025-01-08" },
  { id: 9, nom: "Sensibilisation Gagnoa", ville: "Gagnoa", lat: 6.1319, lng: -5.9506, statut: "En cours", participants: 56, agent: "Yao F.", date: "2025-01-28" },
  { id: 10, nom: "Campagne Abengourou", ville: "Abengourou", lat: 6.7297, lng: -3.4964, statut: "Planifiée", participants: 0, agent: "Coulibaly S.", date: "2025-02-15" },
];

// Route order (the progression of the campaign tour)
export const campaignRoute: number[] = [8, 6, 1, 3, 2, 9, 5, 7, 4, 10];
