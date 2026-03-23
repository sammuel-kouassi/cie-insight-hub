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
