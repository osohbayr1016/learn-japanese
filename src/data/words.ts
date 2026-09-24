export type Word = {
  id: string;
  jp: string;
  reading: string;
  en: string;
  pos: string;
  sentence: string;
  sentenceReading: string;
  sentenceEn: string;
};

const raw = `
watashi|私|わたし|I|noun|私は学生です。|わたしはがくせいです。|I am a student.
hito|人|ひと|person|noun|あの人は先生です。|あのひとはせんせいです。|That person is a teacher.
mizu|水|みず|water|noun|水を飲みます。|みずをのみます。|I drink water.
hi|火|ひ|fire|noun|火は熱いです。|ひはあついです。|Fire is hot.
ki|木|き|tree|noun|木は高いです。|きはたかいです。|The tree is tall.
taberu|食べる|たべる|to eat|verb|パンを食べます。|パンをたべます。|I eat bread.
nomu|飲む|のむ|to drink|verb|お茶を飲みます。|おちゃをのみます。|I drink tea.
miru|見る|みる|to see, to watch|verb|テレビを見ます。|テレビをみます。|I watch television.
iku|行く|いく|to go|verb|学校に行きます。|がっこうにいきます。|I go to school.
kuru|来る|くる|to come|verb|友達は明日来ます。|ともだちはあしたきます。|My friend comes tomorrow.
ookii|大きい|おおきい|big|i-adjective|この車は大きいです。|このくるまはおおきいです。|This car is big.
chiisai|小さい|ちいさい|small|i-adjective|この本は小さいです。|このほんはちいさいです。|This book is small.
kyou|今日|きょう|today|noun|今日は月曜日です。|きょうはげつようびです。|Today is Monday.
ashita|明日|あした|tomorrow|noun|明日、学校に行きます。|あした、がっこうにいきます。|I go to school tomorrow.
kinou|昨日|きのう|yesterday|noun|昨日は本を見ました。|きのうはほんをみました。|I looked at a book yesterday.
jikan|時間|じかん|time|noun|時間がありません。|じかんがありません。|There is no time.
nihongo|日本語|にほんご|Japanese|noun|日本語を勉強します。|にほんごをべんきょうします。|I study Japanese.
gakusei|学生|がくせい|student|noun|あの学生は友達です。|あのがくせいはともだちです。|That student is a friend.
sensei|先生|せんせい|teacher|noun|先生は学校に行きます。|せんせいはがっこうにいきます。|The teacher goes to school.
tomodachi|友達|ともだち|friend|noun|友達は学生です。|ともだちはがくせいです。|My friend is a student.
hon|本|ほん|book|noun|これは本です。|これはほんです。|This is a book.
kuruma|車|くるま|car|noun|車は新しいです。|くるまはあたらしいです。|The car is new.
atarashii|新しい|あたらしい|new|i-adjective|これは新しい本です。|これはあたらしいほんです。|This is a new book.
furui|古い|ふるい|old|i-adjective|これは古い車です。|これはふるいくるまです。|This is an old car.
`;

export const words: Word[] = raw
  .trim()
  .split("\n")
  .map((line) => {
    const [id, jp, reading, en, pos, sentence, sentenceReading, sentenceEn] =
      line.split("|");
    return { id, jp, reading, en, pos, sentence, sentenceReading, sentenceEn };
  });
