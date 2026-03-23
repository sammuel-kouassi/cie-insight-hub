export const monthlyParticipants = [
  { month: "Jan", participants: 320, campagnes: 8 },
  { month: "Fév", participants: 480, campagnes: 12 },
  { month: "Mar", participants: 560, campagnes: 15 },
  { month: "Avr", participants: 420, campagnes: 10 },
  { month: "Mai", participants: 680, campagnes: 18 },
  { month: "Jun", participants: 750, campagnes: 20 },
  { month: "Jul", participants: 620, campagnes: 16 },
  { month: "Aoû", participants: 530, campagnes: 14 },
  { month: "Sep", participants: 710, campagnes: 19 },
  { month: "Oct", participants: 890, campagnes: 22 },
  { month: "Nov", participants: 820, campagnes: 21 },
  { month: "Déc", participants: 640, campagnes: 17 },
];

export const participantsByRegion = [
  { region: "Abidjan", participants: 3200, fill: "hsl(24, 100%, 50%)" },
  { region: "Bouaké", participants: 1800, fill: "hsl(32, 100%, 55%)" },
  { region: "Yamoussoukro", participants: 1200, fill: "hsl(38, 92%, 50%)" },
  { region: "San Pedro", participants: 950, fill: "hsl(152, 60%, 45%)" },
  { region: "Korhogo", participants: 780, fill: "hsl(210, 100%, 56%)" },
  { region: "Daloa", participants: 650, fill: "hsl(280, 60%, 55%)" },
];

export const participantsByType = [
  { name: "Particuliers", value: 45, fill: "hsl(24, 100%, 50%)" },
  { name: "Commerçants", value: 25, fill: "hsl(32, 100%, 55%)" },
  { name: "Entreprises", value: 15, fill: "hsl(152, 60%, 45%)" },
  { name: "Administrations", value: 10, fill: "hsl(210, 100%, 56%)" },
  { name: "Autres", value: 5, fill: "hsl(220, 10%, 46%)" },
];

export const recentCampaigns = [
  { id: 1, nom: "Sensibilisation Abobo", region: "Abidjan", agent: "Kouamé A.", date: "2025-01-15", participants: 145, statut: "Terminée" },
  { id: 2, nom: "Campagne Bouaké Centre", region: "Bouaké", agent: "Traoré M.", date: "2025-01-18", participants: 89, statut: "En cours" },
  { id: 3, nom: "Mission Yopougon", region: "Abidjan", agent: "Bamba K.", date: "2025-01-20", participants: 210, statut: "Terminée" },
  { id: 4, nom: "Sensibilisation Korhogo", region: "Korhogo", agent: "Coulibaly S.", date: "2025-01-22", participants: 67, statut: "Planifiée" },
  { id: 5, nom: "Campagne San Pedro", region: "San Pedro", agent: "Yao F.", date: "2025-01-25", participants: 132, statut: "En cours" },
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
  { id: 1, nom: "Koné Amadou", type: "Particulier", region: "Abidjan", telephone: "07 12 34 56", date: "2025-01-10", campagne: "Sensibilisation Abobo" },
  { id: 2, nom: "Touré Fatou", type: "Commerçant", region: "Bouaké", telephone: "05 98 76 54", date: "2025-01-12", campagne: "Campagne Bouaké Centre" },
  { id: 3, nom: "Bamba Issouf", type: "Entreprise", region: "Abidjan", telephone: "01 23 45 67", date: "2025-01-14", campagne: "Mission Yopougon" },
  { id: 4, nom: "Diallo Mariam", type: "Particulier", region: "San Pedro", telephone: "07 65 43 21", date: "2025-01-15", campagne: "Campagne San Pedro" },
  { id: 5, nom: "Yao Kouassi", type: "Administration", region: "Yamoussoukro", telephone: "05 11 22 33", date: "2025-01-16", campagne: "Sensibilisation Yamoussoukro" },
  { id: 6, nom: "Coulibaly Seydou", type: "Particulier", region: "Korhogo", telephone: "07 44 55 66", date: "2025-01-17", campagne: "Sensibilisation Korhogo" },
  { id: 7, nom: "Ouattara Awa", type: "Commerçant", region: "Daloa", telephone: "05 77 88 99", date: "2025-01-18", campagne: "Campagne Daloa" },
  { id: 8, nom: "N'Guessan Yves", type: "Particulier", region: "Abidjan", telephone: "01 00 11 22", date: "2025-01-19", campagne: "Sensibilisation Abobo" },
  { id: 9, nom: "Traoré Mohamed", type: "Entreprise", region: "Bouaké", telephone: "07 33 44 55", date: "2025-01-20", campagne: "Campagne Bouaké Centre" },
  { id: 10, nom: "Konan Adjoua", type: "Particulier", region: "Abidjan", telephone: "05 66 77 88", date: "2025-01-21", campagne: "Mission Yopougon" },
];

// ── Contacts / Prises de contact ──
export const contactsList = [
  { id: 1, participant: "Koné Amadou", type: "Visite", agent: "Kouamé A.", date: "2025-01-10", region: "Abidjan", resultat: "Intéressé" },
  { id: 2, participant: "Touré Fatou", type: "Appel", agent: "Traoré M.", date: "2025-01-11", region: "Bouaké", resultat: "Rendez-vous pris" },
  { id: 3, participant: "Bamba Issouf", type: "Visite", agent: "Bamba K.", date: "2025-01-12", region: "Abidjan", resultat: "Converti" },
  { id: 4, participant: "Diallo Mariam", type: "Appel", agent: "Yao F.", date: "2025-01-13", region: "San Pedro", resultat: "Pas intéressé" },
  { id: 5, participant: "Yao Kouassi", type: "Visite", agent: "Kouamé A.", date: "2025-01-14", region: "Yamoussoukro", resultat: "Intéressé" },
  { id: 6, participant: "Coulibaly Seydou", type: "Visite", agent: "Coulibaly S.", date: "2025-01-15", region: "Korhogo", resultat: "Rendez-vous pris" },
  { id: 7, participant: "Ouattara Awa", type: "Appel", agent: "Traoré M.", date: "2025-01-16", region: "Daloa", resultat: "Converti" },
  { id: 8, participant: "N'Guessan Yves", type: "Visite", agent: "Bamba K.", date: "2025-01-17", region: "Abidjan", resultat: "Intéressé" },
];

export const contactsByResult = [
  { name: "Converti", value: 35, fill: "hsl(152, 60%, 45%)" },
  { name: "Intéressé", value: 30, fill: "hsl(24, 100%, 50%)" },
  { name: "RDV pris", value: 20, fill: "hsl(210, 100%, 56%)" },
  { name: "Pas intéressé", value: 15, fill: "hsl(220, 10%, 46%)" },
];

// ── Rendez-vous ──
export const rdvList = [
  { id: 1, participant: "Touré Fatou", agent: "Traoré M.", date: "2025-01-20", heure: "09:00", lieu: "Bureau Bouaké", statut: "Confirmé" },
  { id: 2, participant: "Coulibaly Seydou", agent: "Coulibaly S.", date: "2025-01-21", heure: "10:30", lieu: "Domicile", statut: "En attente" },
  { id: 3, participant: "Koné Amadou", agent: "Kouamé A.", date: "2025-01-22", heure: "14:00", lieu: "Bureau Abidjan", statut: "Confirmé" },
  { id: 4, participant: "Yao Kouassi", agent: "Kouamé A.", date: "2025-01-23", heure: "11:00", lieu: "Mairie Yamoussoukro", statut: "Annulé" },
  { id: 5, participant: "Bamba Issouf", agent: "Bamba K.", date: "2025-01-24", heure: "15:30", lieu: "Bureau Abidjan", statut: "Confirmé" },
  { id: 6, participant: "Diallo Mariam", agent: "Yao F.", date: "2025-01-25", heure: "09:30", lieu: "Bureau San Pedro", statut: "En attente" },
];

export const rdvByStatus = [
  { name: "Confirmé", value: 55, fill: "hsl(152, 60%, 45%)" },
  { name: "En attente", value: 30, fill: "hsl(38, 92%, 50%)" },
  { name: "Annulé", value: 15, fill: "hsl(0, 70%, 50%)" },
];

// ── Gadgets ──
export const gadgetsList = [
  { id: 1, nom: "T-shirt CIE", categorie: "Textile", stock: 450, distribues: 1200, campagne: "Sensibilisation Abobo" },
  { id: 2, nom: "Casquette CIE", categorie: "Textile", stock: 320, distribues: 890, campagne: "Multiple" },
  { id: 3, nom: "Stylo CIE", categorie: "Papeterie", stock: 1500, distribues: 3200, campagne: "Multiple" },
  { id: 4, nom: "Porte-clés", categorie: "Accessoire", stock: 200, distribues: 650, campagne: "Campagne Bouaké" },
  { id: 5, nom: "Sac CIE", categorie: "Textile", stock: 180, distribues: 420, campagne: "Mission Yopougon" },
  { id: 6, nom: "Bloc-notes", categorie: "Papeterie", stock: 600, distribues: 1100, campagne: "Multiple" },
];

export const gadgetsByCategory = [
  { name: "Textile", value: 40, fill: "hsl(24, 100%, 50%)" },
  { name: "Papeterie", value: 35, fill: "hsl(210, 100%, 56%)" },
  { name: "Accessoire", value: 25, fill: "hsl(152, 60%, 45%)" },
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
