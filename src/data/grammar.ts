export type Example = { jp: string; reading: string; en: string };

export type Lesson = {
  id: string;
  number: string;
  title: string;
  summary: string;
  body: string[];
  examples: Example[];
  note: string;
};

export const lessons: Lesson[] = [
  {
    id: "wa",
    number: "01",
    title: "The topic marker は",
    summary: "は names what you are talking about. Spelled ha, read wa.",
    body: [
      "Put the topic first, then the comment. 私は学生です says the topic is 私 and the comment is 学生です.",
      "は is not the verb. It does not mean is. です does that job for nouns.",
    ],
    examples: [
      { jp: "私は学生です。", reading: "わたしはがくせいです。", en: "I am a student." },
      { jp: "今日は月曜日です。", reading: "きょうはげつようびです。", en: "Today is Monday." },
      { jp: "これは本です。", reading: "これはほんです。", en: "This is a book." },
    ],
    note: "Do not read は as ha when it marks the topic. Inside a word such as 歯 (tooth), it is ha.",
  },
  {
    id: "desu",
    number: "02",
    title: "です and ます",
    summary: "です follows nouns and adjectives. ます follows verbs. Both stay polite.",
    body: [
      "です closes a sentence that names or describes: 学生です, 大きいです.",
      "ます closes a verb: 食べます, 行きます. Plain forms such as 食べる are for notes and close friends. Keep ます while the pattern is new.",
    ],
    examples: [
      { jp: "水を飲みます。", reading: "みずをのみます。", en: "I drink water." },
      { jp: "これは大きい本です。", reading: "これはおおきいほんです。", en: "This is a big book." },
      { jp: "明日行きます。", reading: "あしたいきます。", en: "I will go tomorrow." },
    ],
    note: "The stem often changes. 飲みます comes from 飲む, and 行きます comes from 行く. Learn the pairs as you meet them.",
  },
  {
    id: "wo",
    number: "03",
    title: "The object marker を",
    summary: "を marks the noun the verb acts on. Spelled を, read o.",
    body: [
      "The order is noun, then を, then the verb. 水を飲みます: water is what gets drunk.",
      "English does not give this job its own word. Japanese does.",
    ],
    examples: [
      { jp: "本を見ます。", reading: "ほんをみます。", en: "I look at a book." },
      { jp: "パンを食べます。", reading: "パンをたべます。", en: "I eat bread." },
      { jp: "日本語を勉強します。", reading: "にほんごをべんきょうします。", en: "I study Japanese." },
    ],
    note: "The sound is o, but the particle is written を, not お.",
  },
  {
    id: "ka",
    number: "04",
    title: "Questions with か",
    summary: "Add か to the end of a polite sentence. Word order stays put.",
    body: [
      "学生です is a statement. 学生ですか is a question. You do not move a verb to the front.",
      "か already marks the question. The English lines here use a question mark. The Japanese lines rely on か.",
    ],
    examples: [
      { jp: "学生ですか。", reading: "がくせいですか。", en: "Are you a student?" },
      { jp: "これは本ですか。", reading: "これはほんですか。", en: "Is this a book?" },
      { jp: "今日来ますか。", reading: "きょうきますか。", en: "Are you coming today?" },
    ],
    note: "か attaches to the polite ending. The rest of the sentence stays in the same order as the statement.",
  },
];
