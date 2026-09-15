export interface Quote {
  text: string;
  textJP?: string;
  author: string;
  source: "anime" | "real";
  anime?: string;
  voice: { lang: string; pitch: number; rate: number };
  audioUrl?: string;
  audioUrlJP?: string;
  voiceId?: string;
  voiceIdJP?: string;
}

// Voice profiles: each character has a unique pitch/rate combo
// French TTS uses fr-FR voice
const VOICE_HERO = { lang: "fr-FR", pitch: 1.1, rate: 1.0 };
const VOICE_DEEP = { lang: "fr-FR", pitch: 0.7, rate: 0.9 };
const VOICE_FEMALE = { lang: "fr-FR", pitch: 1.3, rate: 1.05 };
const VOICE_CALM = { lang: "fr-FR", pitch: 0.9, rate: 0.85 };
const VOICE_INTENSE = { lang: "fr-FR", pitch: 0.8, rate: 1.1 };
const VOICE_NORMAL = { lang: "fr-FR", pitch: 1.0, rate: 1.0 };
const VOICE_WISE = { lang: "fr-FR", pitch: 0.85, rate: 0.8 };
const VOICE_YOUNG = { lang: "fr-FR", pitch: 1.2, rate: 1.1 };

export const QUOTES: Quote[] = [
  // === Anime Quotes (en français + japonais) ===
  {
    text: "Si tu ne prends pas de risques, tu ne peux pas créer ton avenir.",
    textJP: "リスクを冒さなければ、未来は創れない。",
    author: "Monkey D. Luffy",
    source: "anime",
    anime: "One Piece",
    voice: VOICE_YOUNG,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Le monde n'est pas parfait. Mais il est là pour nous, en faisant de son mieux.",
    textJP: "世界は完璧じゃない。でも、私たちのために、最善を尽くしてくれている。",
    author: "Roy Mustang",
    source: "anime",
    anime: "Fullmetal Alchemist",
    voice: VOICE_DEEP,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Le travail acharné ne sert à rien pour ceux qui ne croient pas en eux-mêmes.",
    textJP: "自分を信じない者には、努力は無意味だ。",
    author: "Naruto Uzumaki",
    source: "anime",
    anime: "Naruto",
    voice: VOICE_HERO,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Une personne peut changer, au moment où elle s'en donne la volonté.",
    textJP: "人は変われる。その気になればね。",
    author: "Koro-sensei",
    source: "anime",
    anime: "Assassination Classroom",
    voice: VOICE_CALM,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Le pouvoir vient en réponse à un besoin, pas à un désir. Tu dois créer ce besoin.",
    textJP: "力は必要に応じて現れる。欲望ではなく、必要性を作れ。",
    author: "Goku",
    source: "anime",
    anime: "Dragon Ball Z",
    voice: VOICE_INTENSE,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Ce que tu perds, tu le retrouveras. Mais ce que tu jettes, tu ne le récupéreras jamais.",
    textJP: "失ったものは見つかる。でも、捨てたものは二度と戻らない。",
    author: "Kenshin Himura",
    source: "anime",
    anime: "Rurouni Kenshin",
    voice: VOICE_CALM,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Le talent, c'est ce que tu fais fleurir. L'instinct, c'est ce que tu polis.",
    textJP: "才能は開花させるもの。本能は磨くものだ。",
    author: "Tobio Kageyama",
    source: "anime",
    anime: "Haikyuu",
    voice: VOICE_DEEP,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Nous n'avons pas besoin d'être parfaits. Nous avons juste besoin de continuer à progresser.",
    textJP: "完璧である必要はない。ただ前進し続ければいい。",
    author: "Daichi Sawamura",
    source: "anime",
    anime: "Haikyuu",
    voice: VOICE_NORMAL,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Les seuls qui devraient tuer sont ceux qui sont prêts à être tués.",
    textJP: "殺していいのは、殺される覚悟のある奴だけだ。",
    author: "Lelouch vi Britannia",
    source: "anime",
    anime: "Code Geass",
    voice: VOICE_DEEP,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Si tu ne fais que ce que tu peux, tu ne seras jamais plus que ce que tu es maintenant.",
    textJP: "できることしかしなければ、今のままだ。",
    author: "Maître Shifu",
    source: "anime",
    anime: "Kung Fu Panda",
    voice: VOICE_WISE,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Ce n'est pas le pouvoir de la malédiction. C'est le pouvoir que tu as et que tu ne comprends pas.",
    textJP: "それは呪いの力じゃない。お前が持っている理解していない力だ。",
    author: "Gojo Satoru",
    source: "anime",
    anime: "Jujutsu Kaisen",
    voice: VOICE_NORMAL,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "La seule chose que nous sommes autorisés à faire, c'est croire que nous ne regretterons pas le choix que nous avons fait.",
    textJP: "俺たちに許されているのは、自分の選択を後悔しないと信じることだけだ。",
    author: "Levi Ackerman",
    source: "anime",
    anime: "L'Attaque des Titans",
    voice: VOICE_DEEP,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Tu ne peux pas changer le passé, alors ne le laisse pas te retenir.",
    textJP: "過去は変えられない。だから引きずらないで。",
    author: "Sakura Kinomoto",
    source: "anime",
    anime: "Sakura Chasseuse de Cartes",
    voice: VOICE_FEMALE,
    voiceId: "EXAVITQu4vr4xnEmx3D4O",
  },
  {
    text: "Même si je suis petit, je peux être fort.",
    textJP: "小さくても、強くなれる。",
    author: "Edward Elric",
    source: "anime",
    anime: "Fullmetal Alchemist",
    voice: VOICE_YOUNG,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Crois en toi. Pas en toi qui crois en moi. Pas en moi qui crois en toi. Crois en toi qui crois en toi-même.",
    textJP: "俺を信じるな。お前を信じる俺を信じるな。お前自身を信じろ。",
    author: "Kamina",
    source: "anime",
    anime: "Gurren Lagann",
    voice: VOICE_INTENSE,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "N'abandonne pas. Tu as encore des gens à rencontrer et des choses à faire.",
    textJP: "諦めるな。まだ会うべき人と、やるべきことがある。",
    author: "Tanjiro Kamado",
    source: "anime",
    anime: "Demon Slayer",
    voice: VOICE_HERO,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Je suis qui je suis à cause des choix que j'ai faits.",
    textJP: "俺は俺の選択の結果だ。",
    author: "Spike Spiegel",
    source: "anime",
    anime: "Cowboy Bebop",
    voice: VOICE_CALM,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "L'avenir est toujours vierge. Seule ta volonté a le pouvoir de le remplir.",
    textJP: "未来はまだ白紙だ。それを埋めるのはお前の意志だけだ。",
    author: "Kenshin Himura",
    source: "anime",
    anime: "Rurouni Kenshin",
    voice: VOICE_WISE,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Peu importe la difficulté de la route, je continuerai d'avancer.",
    textJP: "道がどれほど険しくても、前進し続ける。",
    author: "Midoriya Izuku",
    source: "anime",
    anime: "My Hero Academia",
    voice: VOICE_YOUNG,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Parfois, tu dois souffrir pour comprendre, tomber pour grandir, perdre pour gagner.",
    textJP: "理解するために苦しみ、成長するために倒れ、勝つために負ける時がある。",
    author: "Itachi Uchiha",
    source: "anime",
    anime: "Naruto",
    voice: VOICE_DEEP,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Un dropout battra un génie par le travail acharné.",
    textJP: "落ちこぼれが努力で天才を超える。",
    author: "Rock Lee",
    source: "anime",
    anime: "Naruto",
    voice: VOICE_INTENSE,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Je refuse de laisser ma peur me contrôler plus longtemps.",
    textJP: "もう恐怖に支配されるのは嫌だ。",
    author: "Yuji Itadori",
    source: "anime",
    anime: "Jujutsu Kaisen",
    voice: VOICE_HERO,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Être faible n'est pas honteux. Le rester, c'est ça le problème.",
    textJP: "弱いのは恥じゃない。そのままなのが問題だ。",
    author: "Führer King Bradley",
    source: "anime",
    anime: "Fullmetal Alchemist",
    voice: VOICE_DEEP,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "L'horloge avance. Tu ne peux pas l'arrêter. Alors continue d'avancer.",
    textJP: "時計は進む。止められない。なら、前進しろ。",
    author: "Sakuta Azusagawa",
    source: "anime",
    anime: "Bunny Girl Senpai",
    voice: VOICE_NORMAL,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Chaque tâche difficile apporte une occasion de grandir.",
    textJP: "困難な任務はすべて成長の機会だ。",
    author: "All Might",
    source: "anime",
    anime: "My Hero Academia",
    voice: VOICE_DEEP,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Je ferai en sorte qu'ils se souviennent de mon nom.",
    textJP: "俺の名前を忘れさせない。",
    author: "Eren Yeager",
    source: "anime",
    anime: "L'Attaque des Titans",
    voice: VOICE_INTENSE,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Même la plus petite étincelle peut éclairer la nuit la plus sombre.",
    textJP: "一番小さな火花でも、一番暗い夜を照らせる。",
    author: "Shoyo Hinata",
    source: "anime",
    anime: "Haikyuu",
    voice: VOICE_YOUNG,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "La seule vraie sagesse, c'est de savoir qu'on ne sait rien.",
    textJP: "真の知恵とは、何も知らないことを知ることだ。",
    author: "Jiraiya",
    source: "anime",
    anime: "Naruto",
    voice: VOICE_WISE,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Ta seule limite, c'est ton imagination.",
    textJP: "限界は想像力だけだ。",
    author: "Saitama",
    source: "anime",
    anime: "One Punch Man",
    voice: VOICE_CALM,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },
  {
    text: "Le monde n'est pas parfait, mais c'est là pour nous, en faisant de son mieux.",
    textJP: "世界は完璧じゃない。でも、最善を尽くしてくれている。",
    author: "Roy Mustang",
    source: "anime",
    anime: "Fullmetal Alchemist",
    voice: VOICE_NORMAL,
    voiceId: "onwK4e9ZLjHf89HPHf12",
  },

  // === Real-World Quotes (en français) ===
  { text: "La douleur que tu ressens aujourd'hui sera la force que tu ressentiras demain.", author: "Inconnu", source: "real", voice: VOICE_NORMAL, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "La discipline, c'est choisir entre ce que tu veux maintenant et ce que tu veux le plus.", author: "Abraham Lincoln", source: "real", voice: VOICE_WISE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Ce n'est pas que je suis si intelligent, c'est juste que je reste plus longtemps sur les problèmes.", author: "Albert Einstein", source: "real", voice: VOICE_CALM, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Pousse-toi toi-même, car personne d'autre ne le fera pour toi.", author: "Inconnu", source: "real", voice: VOICE_INTENSE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Les grandes choses ne viennent jamais des zones de confort.", author: "Inconnu", source: "real", voice: VOICE_NORMAL, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Le succès, c'est la somme de petits efforts répétés jour après jour.", author: "Robert Collier", source: "real", voice: VOICE_CALM, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Si ça ne te met pas au défi, ça ne te change pas.", author: "Fred DeVito", source: "real", voice: VOICE_INTENSE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Le corps réalise ce que l'esprit croit.", author: "Napoleon Hill", source: "real", voice: VOICE_DEEP, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Repose-toi quand tu es fatigué. Renouvelle-toi, puis remets-toi au travail.", author: "Ralph Marston", source: "real", voice: VOICE_CALM, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Presque tout refonctionne si tu le débranches quelques minutes, y compris toi.", author: "Anne Lamott", source: "real", voice: VOICE_FEMALE, voiceId: "EXAVITQu4vr4xnEmx3D4O" },
  { text: "Le travail acharné bat le talent quand le talent ne travaille pas dur.", author: "Tim Notke", source: "real", voice: VOICE_INTENSE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "La seule façon de faire du bon travail, c'est d'aimer ce que tu fais.", author: "Steve Jobs", source: "real", voice: VOICE_NORMAL, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Crois que tu peux et tu es déjà à mi-chemin.", author: "Theodore Roosevelt", source: "real", voice: VOICE_HERO, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "L'expert en quoi que ce soit était autrefois un débutant.", author: "Helen Hayes", source: "real", voice: VOICE_FEMALE, voiceId: "EXAVITQu4vr4xnEmx3D4O" },
  { text: "Souffre la douleur de la discipline ou souffre la douleur du regret.", author: "Jim Rohn", source: "real", voice: VOICE_DEEP, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Ne regarde pas l'horloge; fais comme elle. Continue d'avancer.", author: "Sam Levenson", source: "real", voice: VOICE_NORMAL, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Le guerrier réussissant est la personne moyenne, avec une concentration au laser.", author: "Bruce Lee", source: "real", voice: VOICE_INTENSE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Réveille-toi avec détermination. Va te coucher avec satisfaction.", author: "Inconnu", source: "real", voice: VOICE_HERO, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Ta seule limite, c'est ton imagination.", author: "Inconnu", source: "real", voice: VOICE_NORMAL, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Plus tu travailles dur pour quelque chose, plus tu te sentiras bien en l'atteignant.", author: "Inconnu", source: "real", voice: VOICE_CALM, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Rêve plus grand. Fais plus grand.", author: "Inconnu", source: "real", voice: VOICE_INTENSE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Ne t'arrête pas quand tu es fatigué. Arrête-toi quand tu as fini.", author: "David Goggins", source: "real", voice: VOICE_DEEP, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Le succès ne vient pas de ce que tu fais occasionnellement, mais de ce que tu fais constamment.", author: "Marie Forleo", source: "real", voice: VOICE_FEMALE, voiceId: "EXAVITQu4vr4xnEmx3D4O" },
  { text: "Le secret pour avancer, c'est de commencer.", author: "Mark Twain", source: "real", voice: VOICE_WISE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Ça semble toujours impossible jusqu'à ce que ce soit fait.", author: "Nelson Mandela", source: "real", voice: VOICE_DEEP, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Tombe sept fois, relève-toi huit.", author: "Proverbe japonais", source: "real", voice: VOICE_WISE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Le voyage de mille kilomètres commence par un seul pas.", author: "Lao Tseu", source: "real", voice: VOICE_WISE, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Ce que tu obtiens en atteignant tes buts n'est pas aussi important que ce que tu deviens en les atteignant.", author: "Zig Ziglar", source: "real", voice: VOICE_NORMAL, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "Tu n'as pas besoin d'être grand pour commencer, mais tu dois commencer pour être grand.", author: "Zig Ziglar", source: "real", voice: VOICE_HERO, voiceId: "onwK4e9ZLjHf89HPHf12" },
  { text: "De petites améliorations quotidiennes mènent avec le temps à des résultats spectaculaires.", author: "Robin Sharma", source: "real", voice: VOICE_CALM, voiceId: "onwK4e9ZLjHf89HPHf12" },
];

export function getDailyQuote(date: Date): Quote {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % QUOTES.length;
  return QUOTES[index];
}

export function getQuoteForDate(dateStr: string): Quote {
  const date = new Date(dateStr);
  return getDailyQuote(date);
}
