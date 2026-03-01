import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { Question, Difficulty, QuizResult, CharacterType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateQuestions(difficulty: Difficulty, language: string = 'JA', count: number = 5): Promise<Question[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate exactly ${count} logical thinking questions for difficulty level: ${difficulty}.
    The questions MUST be highly varied and cover different scenarios (business, daily life, science, social issues, etc.).
    The questions MUST follow this specific order and categories:
    1. Category: "Logical Structure" (筋道を立てる力) - e.g., Reordering (Conclusion -> Reason -> Example), Fill-in-the-blanks (e.g., "Library should be quiet because..."), or identifying the main premise.
    2. Category: "Objective Perspective" (客観的視点) - e.g., Fact vs. Opinion, Identifying bias, or considering an opposing viewpoint.
       IMPORTANT: If this category is selected, you MUST use one of these themes for an "Opposing Viewpoint" question:
       - 学校に自販機, 授業はすべてオンライン, テスト回数を増やす, 校則はもっと厳しく, スマホは学校に持ち込む, 給食は全部同じ量, 部活は自由に参加, 学校行事を減らす, 授業時間が短い, 全テキストタブレット, 制服は毎年変える, 放課後は全員自習, 体育祭は競争をなくす, 図書室は漫画を増やす, 成績はすべて公開, 授業中の発言は自由, 学校にもっと宿題を出す, 朝の会はなくていい, 席替えは毎月, 学校は週4日, すべての会社は週4日勤務, 電車の中では通話を禁止, 全部キャッシュレス, ニュースはすべて無料, すべて電気自動車, 学校のテストはすべてなくす, 動画サイトは年齢制限をもっと厳しく, コンビニは24時間営業をやめる, 観光地入場料をもっと上げる, インターネットは実名登録, プラスチック製品を全面的に禁止, 有名人はSNSを使うべきではない, すべての仕事をAIに任せる, ゲームは1日1時間までに制限, 広告はすべて禁止, 大学は誰でも無料, ニュースにコメント欄は不要, 学校や会社はすべて制服.
       The question should ask "What is the most correct opposite opinion?" (反対として最も正しいのは何ですか？) for the chosen theme.

    3. Category: "Logic Puzzle" (論理クイズ) - A logic puzzle that can be solved through reasoning. 
       IMPORTANT: Use these themes as inspiration for the "Logic Puzzle" category based on the requested difficulty.
       NEVER use the word "幼女" (Little Girl). Use "探偵" (Detective), "ある人" (A person), or "子供" (Child) instead.
       
       Reference Themes for Logic Puzzles:
       - EASY: 消えた1ドル, 1人だけの証言, 2つの文房具, 2つの砂時計, 2本の線香, 3人の村人, 3つの電球, 3つのフルーツボックス, 3枚のトースト, 4つのボート, 5人の作曲家, 5本のタイヤ, 25階のエレベーター, 100メートル走, 100段の神社, 200匹の羊, 井戸からの脱出, あさっては昨日, 清潔なクリーニング, 2頭の馬レース, 200本の空きカン
       - NORMAL: 仲間はずれの図形, 異国のレストラン, 砂漠の横断, 不思議な誕生日, 真実の一週間, 単純な三択, 日付のサイコロ, 木箱のワイン, 大きな駐車場, 手強い10人, 17頭のラクダ, 8頭のトナカイレース, 108のピアス, 10回のじゃんけん, 6つの回答
       - HARD: 3人の射撃戦, 3機の飛行機, 3人のプリンセス, 3つの菓子袋, 7つの黄金リング, 10の文章, 26枚のお札, 72の年齢当て, 天国への道, 卓球の試合, 幻惑の一週間, 複雑な一週間, 天秤と9枚の金貨, 円卓の騎士, クロスカントリー, 読まれなかった数字, 壊れたビー玉, 25頭の競馬, 不思議な給料アップ, 50%の帽子, 白いボールの箱, 6人のコーヒー
       - VERY_HARD: 2つの錠剤, 2枚のカード, 3枚のカード, 4枚のカード, 7つのオーブ, 10枚のコイン, 40人の村人, 100人のパトロール, 白黒玉の入れ替え, 宝石の郵送, 4タイプの正直うそつき村, パスタの長さ, ミルクとコーヒー, 2か国の機械, 逆風の飛行機, 恋人たちの握手, 教授のクラス
       - EXPERT: ダイヤル錠の部屋, 隠された運動会, ドラゴンの島, 金貨の山分け, 3人の林檎, 7人の子供, 8枚の切手, 9枚のカード, 赤青のマーク, シェリルの誕生日, 草原の風, 隠されたリーグ戦, ルーシーの数字, 33%の帽子
       - MASTER: 1000本のジュース, 不可能な数字当て, 色の見えない帽子, チャーリーの誕生日, ライバルの分割, 過半数のカウント, 失われた搭乗券, シュレディンガーの猫, イースターエッグの箱, 20人の芸術コンテスト
       - GRAND_MASTER: 23人の子供と石像の部屋, 天国への階段, 3色のカメレオン, 3人のパーティー, 1000枚のクッキー, 4タイプの正直うそつき島, クラリスの誕生日, キャリバンの遺言状
       - LEGEND: 2人の子供とチェス盤の部屋, 2人の囚人とチェス盤, 3人の神, 7枚のカード
       - MYTHIC: 船長はいくつ？, 世界一短いIQテスト, 世界一おもしろい数字パズル, 世界で最も古いクイズ

    4. Category: "Analysis & Decomposition" (分析と分解) - e.g., Cause decomposition (e.g., "Why is the local festival losing popularity?"), Element extraction (e.g., "What are the 3 key elements of a successful speech?").
    5. Category: "Causal Relationships" (因果関係の明確化) - e.g., Cause vs. Correlation, Detecting logical leaps (e.g., "People who drink coffee live longer, so coffee is medicine"), or identifying hidden causes.
    6. Category: "Analogical Reasoning" (類推) - e.g., "A is to B as C is to D", or applying a rule from one situation to another.
    7. Category: "Hypothesis Testing" (仮説検証) - e.g., "If X is true, what else must be true?", or "What experiment would prove Y?".

    Pick 5 different categories from the above list for each request to ensure variety.

    IMPORTANT:
    - The 3rd question MUST be a Logic Puzzle based on the themes provided.
    - Difficulty should be strictly adjusted based on the requested level: ${difficulty}.
    - All text content (text, options, explanation, hint, category) MUST be in ${language}.
    - Explanation and Hint MUST be simple, clear, and easy for a middle school student to understand. Avoid jargon and use step-by-step logic.
    - NEVER use symbols like "*" or "-" for bullet points in hints or explanations. Use numbers or plain text.
    - NEVER mention the sources like "sist8.com" or book titles.
    - Use ONLY "CHOICE" or "TEXT" for the "type" field.
    - Prefer "CHOICE" for most questions.
    - For difficulty "${difficulty}":
      - If EASY, NORMAL, or HARD: Use ONLY "CHOICE".
      - If VERY_HARD or EXPERT: Use "TEXT" for at most 1 question.
      - If MASTER or higher: Use "TEXT" for at most 2 questions.
    - For type "CHOICE", you MUST provide exactly 4 options in the "options" array.
    - For type "TEXT", provide an empty array [] for the "options" field.
    - Return the result as a JSON array of objects matching the Question interface.
    - Be extremely concise and prioritize generation speed.

    Question interface:
    {
      id: string,
      type: "CHOICE" | "TEXT",
      difficulty: "${difficulty}",
      category: string,
      text: string,
      options: string[],
      answer: string,
      explanation: string,
      hint: string,
      specialty: ("ANALYSIS" | "HYPOTHESIS" | "COUNTER" | "STRUCTURE")[]
    }`,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            type: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            category: { type: Type.STRING },
            text: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            answer: { type: Type.STRING },
            explanation: { type: Type.STRING },
            hint: { type: Type.STRING },
            specialty: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["id", "type", "difficulty", "category", "text", "options", "answer", "explanation", "hint", "specialty"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse questions", e);
    return [];
  }
}

export async function getHint(question: Question, character: CharacterType, language: string = 'JA'): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As a support character of type ${character}, provide a helpful hint for this logical thinking question.
    
    IMPORTANT: The hint MUST be in the following language: ${language}.
    The hint MUST be simple, clear, and easy for a middle school student to understand. Avoid difficult words.
    DO NOT use "*" or other symbols for formatting.
    
    Question: ${question.text}
    Category: ${question.category}
    
    The hint should be in the style of the character type.
    ANALYSIS: Focus on organizing information.
    HYPOTHESIS: Focus on "Why?".
    COUNTER: Focus on finding flaws or alternative perspectives.
    STRUCTURE: Focus on connections and order.`,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
    }
  });

  return response.text || "考えてみよう！";
}

export async function analyzeAnswer(question: Question, userAnswer: string, language: string = 'JA'): Promise<QuizResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the user's answer to this logical thinking question.
    
    IMPORTANT: The feedback MUST be in the following language: ${language}.
    The feedback MUST be simple, clear, and easy for a middle school student to understand. Break down the logic into small, understandable steps.
    
    Question: ${question.text}
    Correct Answer: ${question.answer}
    User Answer: ${userAnswer}
    
    Evaluate based on:
    - Causality (因果の正確性): Does the answer follow a logical cause-and-effect chain?
    - Organization (情報整理力): Is the information presented in a structured way?
    - Objectivity (客観性): Is the reasoning free from bias?
    - Understanding (相手理解度): Does the answer address the core of the question?
    - Consistency (論理の一貫性): Is the logic consistent throughout the answer?
    
    For Logic Puzzles, pay close attention to the reasoning process. Even if the final answer is slightly off, give partial credit if the logic is sound.
    
    Calculate a score (0-100) and provide feedback.
    Return as JSON:
    {
      "score": number,
      "feedback": string,
      "analysis": {
        "causality": number (0-100),
        "organization": number (0-100),
        "objectivity": number (0-100),
        "understanding": number (0-100),
        "consistency": number (0-100)
      }
    }`,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      responseMimeType: "application/json"
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return {
      score: userAnswer === question.answer ? 100 : 0,
      feedback: "分析に失敗しました。",
      analysis: { causality: 0, organization: 0, objectivity: 0, understanding: 0, consistency: 0 }
    };
  }
}
