import { StaticQuestion } from '../types';

export const questions: StaticQuestion[] = [
  // ① 主観 or 事実 (1-15)
  {
    id: 1,
    category: 'subjective_fact',
    text: '「富士山は日本で一番高い。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 0,
    explanation: '標高という客観的な数値で証明可能なため「事実」です。'
  },
  {
    id: 2,
    category: 'subjective_fact',
    text: '「この店は最高だ。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 1,
    explanation: '「最高」という基準は人によって異なるため「主観」です。'
  },
  {
    id: 3,
    category: 'subjective_fact',
    text: '「今日は雨が降っている。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 0,
    explanation: '気象現象として観測可能なため「事実」です。'
  },
  {
    id: 4,
    category: 'subjective_fact',
    text: '「彼は優しい人だ。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 1,
    explanation: '「優しい」と感じるかどうかは受け取り手の判断によるため「主観」です。'
  },
  {
    id: 5,
    category: 'subjective_fact',
    text: '「水は100℃で沸騰する。」（標準気圧下）これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 0,
    explanation: '科学的に証明・再現可能なため「事実」です。'
  },
  {
    id: 6,
    category: 'subjective_fact',
    text: '「この映画はつまらない。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 1,
    explanation: '個人の感想であり、万人に共通する事実ではないため「主観」です。'
  },
  {
    id: 7,
    category: 'subjective_fact',
    text: '「東京は日本の首都。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 0,
    explanation: '法律や行政上の定義として決まっているため「事実」です。'
  },
  {
    id: 8,
    category: 'subjective_fact',
    text: '「彼は背が高い。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 1,
    explanation: '「高い」の基準（170cmか190cmか等）が曖昧で比較対象によるため「主観」です。'
  },
  {
    id: 9,
    category: 'subjective_fact',
    text: '「地球は回っている。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 0,
    explanation: '天文学的に証明されているため「事実」です。'
  },
  {
    id: 10,
    category: 'subjective_fact',
    text: '「今日は寒い。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 1,
    explanation: '気温が何度であっても、それを「寒い」と感じるかは個人の感覚なので「主観」です。'
  },
  {
    id: 11,
    category: 'subjective_fact',
    text: '「1年は365日。」（平年）これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 0,
    explanation: '暦の定義として決まっているため「事実」です。'
  },
  {
    id: 12,
    category: 'subjective_fact',
    text: '「あの先生は怖い。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 1,
    explanation: '恐怖心は個人の感情であり、全員がそう感じるわけではないため「主観」です。'
  },
  {
    id: 13,
    category: 'subjective_fact',
    text: '「犬は哺乳類。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 0,
    explanation: '生物学的な分類として確定しているため「事実」です。'
  },
  {
    id: 14,
    category: 'subjective_fact',
    text: '「この本は面白い。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 1,
    explanation: '個人の評価であり、客観的な証明が不可能なため「主観」です。'
  },
  {
    id: 15,
    category: 'subjective_fact',
    text: '「砂糖は甘い。」これは主観ですか、事実ですか？',
    options: ['事実', '主観'],
    correctAnswer: 0,
    explanation: '成分（スクロース）の性質として定義されているため、一般的に「事実」として扱われます。'
  },

  // ② なぜ？（原因を選べ） (16-30)
  {
    id: 16,
    category: 'cause_effect',
    text: '「アイスが売れる」の最も直接的な原因は？',
    options: ['気温が上がった', '冬になった', '雨が降った'],
    correctAnswer: 0,
    explanation: '暑くなると冷たいものを求める需要が増えるためです。'
  },
  {
    id: 17,
    category: 'cause_effect',
    text: '「道が混む」の原因として可能性が高いのは？',
    options: ['深夜である', '道路工事をしている', 'ガソリン代が上がった'],
    correctAnswer: 1,
    explanation: '工事による車線規制は交通渋滞の直接的な原因になります。'
  },
  {
    id: 18,
    category: 'cause_effect',
    text: '「テストの点が上がる」の論理的な原因は？',
    options: ['勉強時間を増やした', '鉛筆を新しくした', '早く寝た'],
    correctAnswer: 0,
    explanation: '学習内容の理解と定着が点数に直結するためです。'
  },
  {
    id: 19,
    category: 'cause_effect',
    text: '「花が枯れる」の直接的な原因は？',
    options: ['音楽を聴かせなかった', '水をあげすぎた（根腐れ）', '鉢の色を変えた'],
    correctAnswer: 1,
    explanation: '水分過多による根腐れは植物が枯れる主要な原因の一つです。'
  },
  {
    id: 20,
    category: 'cause_effect',
    text: '「風邪をひく」の直接的な原因は？',
    options: ['ウイルスが体に入った', '夜更かしをした', 'アイスを食べた'],
    correctAnswer: 0,
    explanation: '風邪はウイルス感染症であり、ウイルスが直接の原因です。'
  },
  {
    id: 21,
    category: 'cause_effect',
    text: '「電池が切れる」の原因は？',
    options: ['長時間使用した', 'スイッチを切った', '暗い場所に置いた'],
    correctAnswer: 0,
    explanation: '使用により蓄えられたエネルギーが消費されたためです。'
  },
  {
    id: 22,
    category: 'cause_effect',
    text: '「ケガをする」の直接的な原因は？',
    options: ['不注意で転倒した', '朝ごはんを食べなかった', '天気が悪かった'],
    correctAnswer: 0,
    explanation: '転倒などの物理的な衝撃が身体に加わることが直接の原因です。'
  },
  {
    id: 23,
    category: 'cause_effect',
    text: '「川があふれる」の主な原因は？',
    options: ['集中豪雨が降った', '魚が増えた', '気温が下がった'],
    correctAnswer: 0,
    explanation: '短時間の大量の降水は河川の容量を超えさせます。'
  },
  {
    id: 24,
    category: 'cause_effect',
    text: '「売上が伸びる」の論理的な原因は？',
    options: ['客数が増えた', '店員が休んだ', '看板を外した'],
    correctAnswer: 0,
    explanation: '売上は「客数 × 客単価」で構成されるため、客数の増加は直結します。'
  },
  {
    id: 25,
    category: 'cause_effect',
    text: '「眠くなる」の生理的な原因は？',
    options: ['睡眠不足が続いた', 'コーヒーを飲んだ', '運動を全くしていない'],
    correctAnswer: 0,
    explanation: '脳や体の休息が必要なサインとして眠気が発生します。'
  },
  {
    id: 26,
    category: 'cause_effect',
    text: '「成績が下がる」の原因として考えられるのは？',
    options: ['復習を怠った', 'ノートを綺麗に書いた', '新しい靴を買った'],
    correctAnswer: 0,
    explanation: '知識の定着不足は成績低下の直接的な要因です。'
  },
  {
    id: 27,
    category: 'cause_effect',
    text: '「試合に勝つ」の論理的な原因は？',
    options: ['相手より得点した', '新しいユニフォームを着た', '応援が多かった'],
    correctAnswer: 0,
    explanation: '勝敗の定義は「得点」に基づいているため、これが直接の原因です。'
  },
  {
    id: 28,
    category: 'cause_effect',
    text: '「機械が止まる」の原因は？',
    options: ['電力が遮断された', '色が剥げた', '名前を忘れた'],
    correctAnswer: 0,
    explanation: '動力源である電力がなくなれば機械は動作を停止します。'
  },
  {
    id: 29,
    category: 'cause_effect',
    text: '「人気が出る」の原因として有力なのは？',
    options: ['SNSで話題になった', '値段を倍にした', '営業時間を短くした'],
    correctAnswer: 0,
    explanation: '認知度の向上と好意的な評価の拡散は人気に繋がります。'
  },
  {
    id: 30,
    category: 'cause_effect',
    text: '「ケンカになる」のきっかけになりやすいのは？',
    options: ['意見の食い違い', '同じ服を着ている', '天気が良い'],
    correctAnswer: 0,
    explanation: '対立する意見や感情の衝突が争いの原因になります。'
  },

  // ③ 因果の飛躍を見抜け (31-45)
  {
    id: 31,
    category: 'logical_leap',
    text: '「雨が降る → 運動会が中止になる → 学力が低下する」 この論理の飛躍はどこ？',
    options: ['雨と運動会の関係', '運動会中止と学力低下の関係', '飛躍はない'],
    correctAnswer: 1,
    explanation: '運動会が中止になっても、それが直接学力低下に結びつく根拠がありません。'
  },
  {
    id: 32,
    category: 'logical_leap',
    text: '「一生懸命勉強した → 友達が減った」 この考え方の問題点は？',
    options: ['勉強時間が友達を消す', '勉強と友達減少の因果関係が不明', '勉強は悪である'],
    correctAnswer: 1,
    explanation: '勉強すること自体が友達を減らす直接の理由にはなりません。他の要因（付き合いが悪くなった等）を飛ばしています。'
  },
  {
    id: 33,
    category: 'logical_leap',
    text: '「ゲームをした → 成績が0点になった」 この主張の飛躍は？',
    options: ['ゲームは脳を壊す', '1回のゲームと0点の間に極端な飛躍がある', '飛躍はない'],
    correctAnswer: 1,
    explanation: 'ゲームをしたことだけで即0点になるわけではなく、勉強不足などの過程が省略されています。'
  },
  {
    id: 34,
    category: 'logical_leap',
    text: '「朝ごはんを食べた → テストで満点を取った」 この論理はどう？',
    options: ['朝食は脳の活性化に良いので正しい', '朝食だけで満点が取れるという因果の飛躍', '朝食は関係ない'],
    correctAnswer: 1,
    explanation: '朝食は補助的な要因にはなりますが、満点の主因は学習内容の理解です。'
  },
  {
    id: 35,
    category: 'logical_leap',
    text: '「スマホを持つ → 不幸になる」 この論理の問題は？',
    options: ['スマホは依存性がある', 'スマホ所持と幸福度の直接的な因果関係の欠如', 'スマホは高い'],
    correctAnswer: 1,
    explanation: 'スマホを持つこと自体が不幸に直結するわけではなく、使い方の問題です。'
  },
  {
    id: 36,
    category: 'logical_leap',
    text: '「本を読む → 天才になる」 この主張は？',
    options: ['読書は知識を増やすので正しい', '「天才」の定義が曖昧で、読書だけでなれるという飛躍', '本は難しい'],
    correctAnswer: 1,
    explanation: '読書は有益ですが、それだけで「天才」になれるという保証はありません。'
  },
  {
    id: 37,
    category: 'logical_leap',
    text: '「暑い → 犯罪が増える」 この統計的な相関に対する論理的態度は？',
    options: ['暑さがイライラさせるので正しい', '相関関係はあるかもしれないが、直接の因果とは限らない', '犯罪は冬に多い'],
    correctAnswer: 1,
    explanation: 'データ上の相関があっても、暑さが直接犯罪を引き起こす（因果）とは断定できません。'
  },
  {
    id: 38,
    category: 'logical_leap',
    text: '「制服を変えた → 人気校になった」 この考えは？',
    options: ['見た目は大事なので正しい', '制服以外の要因（教育内容等）を無視している', '制服は関係ない'],
    correctAnswer: 1,
    explanation: '制服は一つの要素に過ぎず、人気が出るには複合的な理由があるはずです。'
  },
  {
    id: 39,
    category: 'logical_leap',
    text: '「校長が変わった → 偏差値が上がった」 この論理は？',
    options: ['リーダーシップの結果なので正しい', '校長の交代と偏差値向上の間の具体的なプロセスが不明', '偏差値は運'],
    correctAnswer: 1,
    explanation: '校長が変わったことと偏差値向上には時間差や教員の努力など多くの介在要因があります。'
  },
  {
    id: 40,
    category: 'logical_leap',
    text: '「新商品を出した → 必ず売れる」 この主張は？',
    options: ['新しいものは売れる', '市場の需要や競合を無視した過度な一般化', '宣伝すれば売れる'],
    correctAnswer: 1,
    explanation: '新しさだけで売れる保証はなく、ニーズに合っているかどうかが重要です。'
  },
  {
    id: 41,
    category: 'logical_leap',
    text: '「有名人を使っている → 商品は安全だ」 この判断は？',
    options: ['有名人は嘘をつかない', '広告塔の知名度と製品の安全性は無関係', '高いから安全'],
    correctAnswer: 1,
    explanation: '有名人が宣伝していることと、その商品の品質や安全性は論理的に無関係です。'
  },
  {
    id: 42,
    category: 'logical_leap',
    text: '「価格が高い → 良い物だ」 この論理は？',
    options: ['高いものはコストがかかっている', '価格はブランド料や流通コストも含み、品質と比例するとは限らない', '安いものは悪い'],
    correctAnswer: 1,
    explanation: '価格は戦略的に決まるものであり、必ずしも品質の高さだけを反映していません。'
  },
  {
    id: 43,
    category: 'logical_leap',
    text: '「多数派が賛成している → それが正しい」 この論理は？',
    options: ['民主主義なので正しい', '数の多さと論理的な正しさは別問題（衆人に訴える論証）', '少数派は間違っている'],
    correctAnswer: 1,
    explanation: '多くの人が信じているからといって、それが真実であるとは限りません。'
  },
  {
    id: 44,
    category: 'logical_leap',
    text: '「昔からある習慣だ → それが正解だ」 この考えは？',
    options: ['伝統は守るべき', '歴史の長さと現代における妥当性は別', '新しいものは間違い'],
    correctAnswer: 1,
    explanation: '「昔からある」ことは事実ですが、それが「正しい」理由にはなりません。'
  },
  {
    id: 45,
    category: 'logical_leap',
    text: '「一度失敗した → 自分には才能がない」 この論理は？',
    options: ['失敗は才能のなさの証拠', '一回の結果から全人格や将来を決めつける過度な一般化', '才能は生まれつき'],
    correctAnswer: 1,
    explanation: '試行回数が少ない段階での失敗を、永続的な能力の欠如に結びつけるのは飛躍です。'
  },

  // ④ 要素を分けろ (46-60)
  {
    id: 46,
    category: 'element_division',
    text: '「スポーツカー」を構成する重要な要素を分けるなら？',
    options: ['速さ・デザイン・走行性能', '色・タイヤの数・窓の数', '値段・重さ・大きさ'],
    correctAnswer: 0,
    explanation: 'スポーツカーの本質的な特徴は、速度やデザイン、運転の楽しさにあります。'
  },
  {
    id: 47,
    category: 'element_division',
    text: '「カレー」の構成要素を「材料」で分けるなら？',
    options: ['スパイス・具材・水分', '皿・スプーン・コップ', '匂い・色・味'],
    correctAnswer: 0,
    explanation: '料理としてのカレーは、味の決め手となるスパイス、肉や野菜などの具材、煮込むための水分で構成されます。'
  },
  {
    id: 48,
    category: 'element_division',
    text: '「学校」を「人」の要素で分けるなら？',
    options: ['生徒・教職員・保護者', '机・椅子・黒板', '国語・算数・理科'],
    correctAnswer: 0,
    explanation: '学校という組織を構成する主要な人的要素はこの3グループです。'
  },
  {
    id: 49,
    category: 'element_division',
    text: '「スマホ」を「機能」で分けるなら？',
    options: ['通信・計算・表示', '画面・電池・基板', 'Apple・Samsung・Sony'],
    correctAnswer: 0,
    explanation: 'スマホの役割を機能面で分解すると、通信（電話・ネット）、計算（アプリ実行）、表示（画面出力）になります。'
  },
  {
    id: 50,
    category: 'element_division',
    text: '「コンビニ」の強みを要素分解するなら？',
    options: ['利便性・品揃え・営業時間', '看板の色・制服・レジ袋', 'おにぎり・パン・飲み物'],
    correctAnswer: 0,
    explanation: 'コンビニが選ばれる理由は、近さ（利便性）、必要なものが揃うこと、いつでも開いていることに集約されます。'
  },
  {
    id: 51,
    category: 'element_division',
    text: '「試験」を構成する要素は？',
    options: ['出題・解答・評価', '紙・ペン・消しゴム', '合格・不合格・補欠'],
    correctAnswer: 0,
    explanation: '試験のプロセスを分解すると、問題を出す、答える、それを採点して評価する、という流れになります。'
  },
  {
    id: 52,
    category: 'element_division',
    text: '「アニメ」を制作要素で分けるなら？',
    options: ['作画・脚本・音響', 'テレビ・映画・配信', '子供向け・大人向け・全年齢'],
    correctAnswer: 0,
    explanation: 'アニメーション作品は、絵（作画）、物語（脚本）、音（声・音楽）の組み合わせでできています。'
  },
  {
    id: 53,
    category: 'element_division',
    text: '「SNS」の主要な要素は？',
    options: ['ユーザー・コンテンツ・相互作用', 'スマホ・PC・タブレット', '文字・画像・動画'],
    correctAnswer: 0,
    explanation: 'SNSは、人がいて、何かが投稿され、それに対して反応があることで成立します。'
  },
  {
    id: 54,
    category: 'element_division',
    text: '「病院」の機能を分けるなら？',
    options: ['診察・検査・治療', '医師・看護師・受付', '薬局・売店・駐車場'],
    correctAnswer: 0,
    explanation: '医療サービスの流れは、状態を診る、調べる、治す、というステップに分けられます。'
  },
  {
    id: 55,
    category: 'element_division',
    text: '「公園」を構成する要素は？',
    options: ['広場・遊具・自然', '砂・土・石', '朝・昼・晩'],
    correctAnswer: 0,
    explanation: '公園の空間的な特徴は、開けた場所、遊ぶ道具、植物などの自然環境です。'
  },
  {
    id: 56,
    category: 'element_division',
    text: '「海」を構成する要素は？',
    options: ['海水・海底・生物', '青・白・緑', '波・風・光'],
    correctAnswer: 0,
    explanation: '海という環境を構造で分けると、水そのもの、その下の地面、そこに住む生き物になります。'
  },
  {
    id: 57,
    category: 'element_division',
    text: '「台風」の脅威を要素分解するなら？',
    options: ['強風・豪雨・高潮', '中心気圧・進路・速度', '夏・秋・冬'],
    correctAnswer: 0,
    explanation: '台風がもたらす直接的な被害要因は、風、雨、そして海面の変化です。'
  },
  {
    id: 58,
    category: 'element_division',
    text: '「友情」を構成する心理的要素は？',
    options: ['信頼・共感・継続性', '時間・場所・回数', 'プレゼント・遊び・会話'],
    correctAnswer: 0,
    explanation: '友情を内面から分解すると、信じる心、気持ちの共有、そして関係が続くことが重要です。'
  },
  {
    id: 59,
    category: 'element_division',
    text: '「お金」の機能を要素分解するなら？',
    options: ['交換・保存・尺度', '紙・金属・電子', '円・ドル・ユーロ'],
    correctAnswer: 0,
    explanation: '経済学におけるお金の3大機能は、物を買う（交換）、貯める（保存）、価値を測る（尺度）です。'
  },
  {
    id: 60,
    category: 'element_division',
    text: '「成功」を構成する要素を分けるなら？',
    options: ['目標設定・実行・結果', '運・才能・環境', 'お金・名声・地位'],
    correctAnswer: 0,
    explanation: 'プロセスとして分解すると、何を目指し、どう動き、どうなったか、という要素になります。'
  },

  // ⑤ 立場を変えろ (61-75)
  {
    id: 61,
    category: 'perspective_shift',
    text: '「宿題は必要か？」という問いに対し、「教師」の立場で考えるなら？',
    options: ['遊びの時間が減るので不要', '学習の定着度を確認するために必要', '親が大変なので不要'],
    correctAnswer: 1,
    explanation: '教師は教育的効果や指導の指標としての側面を重視します。'
  },
  {
    id: 62,
    category: 'perspective_shift',
    text: '「校則は必要か？」という問いに対し、「学校運営者」の立場で考えるなら？',
    options: ['自由を奪うので不要', '集団の秩序を維持し安全を守るために必要', '個性を消すので不要'],
    correctAnswer: 1,
    explanation: '運営側は全体の安全やトラブル防止、効率的な管理を優先します。'
  },
  {
    id: 63,
    category: 'perspective_shift',
    text: '「制服は必要か？」という問いに対し、「保護者」の立場で考えるなら？',
    options: ['毎日の服選びの負担や経済的格差を隠せるので必要', '個性がなくなるので不要', '動きにくいので不要'],
    correctAnswer: 0,
    explanation: '保護者は家計への影響や朝の準備の利便性を考慮する傾向があります。'
  },
  {
    id: 64,
    category: 'perspective_shift',
    text: '「ゲームの時間制限」に対し、「ゲーム会社」の立場で考えるなら？',
    options: ['健康のために制限すべき', '長時間遊んでもらう方が利益になるので制限に反対', '勉強すべき'],
    correctAnswer: 1,
    explanation: '企業としては利用時間（エンゲージメント）の最大化が利益に直結します。'
  },
  {
    id: 65,
    category: 'perspective_shift',
    text: '「テスト廃止」に対し、「大学入試担当者」の立場で考えるなら？',
    options: ['ストレスが減るので賛成', '客観的な選抜基準がなくなるので困る', '授業が楽しくなるので賛成'],
    correctAnswer: 1,
    explanation: '選抜を行う側は、公平で数値化された比較基準を必要とします。'
  },
  {
    id: 66,
    category: 'perspective_shift',
    text: '「給食廃止」に対し、「共働きの親」の立場で考えるなら？',
    options: ['お弁当作りが大変なので反対', '好きなものを食べさせたいので賛成', '食費が浮くので賛成'],
    correctAnswer: 0,
    explanation: '時間的余裕がない層にとって、給食は非常に重要なサポート機能です。'
  },
  {
    id: 67,
    category: 'perspective_shift',
    text: '「スマホ禁止」に対し、「アプリ開発者」の立場で考えるなら？',
    options: ['依存を防ぐので賛成', '利用機会が失われるので反対', '学校は勉強する場所なので賛成'],
    correctAnswer: 1,
    explanation: 'サービスを提供する側は、利用制限はビジネス上の損失と考えます。'
  },
  {
    id: 68,
    category: 'perspective_shift',
    text: '「部活必須」に対し、「プロスポーツ選手」の立場で考えるなら？',
    options: ['全員やるべき', '専門的なトレーニングに集中したい人は自由であるべき', '運動は体に良い'],
    correctAnswer: 1,
    explanation: 'プロの視点では、強制よりも個々の目的や質を重視する可能性があります。'
  },
  {
    id: 69,
    category: 'perspective_shift',
    text: '「AI導入」に対し、「単純作業の労働者」の立場で考えるなら？',
    options: ['便利になるので歓迎', '自分の仕事が奪われる可能性があるので不安', '関係ない'],
    correctAnswer: 1,
    explanation: '自動化によって直接影響を受ける立場では、雇用の維持が最大の懸念になります。'
  },
  {
    id: 70,
    category: 'perspective_shift',
    text: '「週4日授業」に対し、「塾の経営者」の立場で考えるなら？',
    options: ['暇になるので困る', '学校の授業時間が減り、塾の需要が増えるのでチャンス', '子供が可哀想'],
    correctAnswer: 1,
    explanation: '公教育の時間が減ることは、民間教育機関にとって市場拡大の機会になり得ます。'
  },
  {
    id: 71,
    category: 'perspective_shift',
    text: '「現金廃止（完全キャッシュレス）」に対し、「高齢者」の立場で考えるなら？',
    options: ['便利なので賛成', '操作が難しく、停電時などが不安なので反対', 'ポイントが貯まるので賛成'],
    correctAnswer: 1,
    explanation: '新しい技術への習熟度や、物理的な安心感を重視する立場からの懸念です。'
  },
  {
    id: 72,
    category: 'perspective_shift',
    text: '「動画授業化」に対し、「人気講師」の立場で考えるなら？',
    options: ['一度の収録で多くの人に届けられるので効率的', '対面でないと伝わらない', '眠くなる'],
    correctAnswer: 0,
    explanation: '高いスキルを持つ人は、デジタル化によるレバレッジ（拡散力）をメリットと感じやすいです。'
  },
  {
    id: 73,
    category: 'perspective_shift',
    text: '「少人数制クラス」に対し、「財政担当の役人」の立場で考えるなら？',
    options: ['教育の質が上がるので賛成', '教員数や教室数が増え、コストがかかりすぎるので慎重', '友達が増える'],
    correctAnswer: 1,
    explanation: '予算を管理する側は、理想よりも費用対効果や財源の確保を重視します。'
  },
  {
    id: 74,
    category: 'perspective_shift',
    text: '「校長公選制（選挙で選ぶ）」に対し、「一般市民」の立場で考えるなら？',
    options: ['学校運営に民意を反映できるので期待', '政治に巻き込まれるので不安', 'どちらもあり得る'],
    correctAnswer: 2,
    explanation: '市民の立場では、民主化のメリットと政治化のデメリットの両面が見えます。'
  },
  {
    id: 75,
    category: 'perspective_shift',
    text: '「夏休み短縮」に対し、「観光地のホテル」の立場で考えるなら？',
    options: ['子供が勉強できて良い', '旅行客が減り、売上が下がるので反対', '涼しくなって良い'],
    correctAnswer: 1,
    explanation: '観光業は長期休暇の需要に依存しているため、短縮は死活問題です。'
  },

  // ⑥ データを見る (76-85)
  {
    id: 76,
    category: 'data_interpretation',
    text: '「A店の売上が100から150に増えた」 このデータから確実に言えることは？',
    options: ['利益も増えた', '売上が1.5倍になった', '客数が増えた'],
    correctAnswer: 1,
    explanation: '売上の数値は確定していますが、利益（経費を引いたもの）や客数は他のデータがないと分かりません。'
  },
  {
    id: 77,
    category: 'data_interpretation',
    text: '「B店は客が減ったが、売上が増えた」 この状況として論理的なのは？',
    options: ['客単価が大幅に上がった', '営業時間を短くした', '店員を増やした'],
    correctAnswer: 0,
    explanation: '売上 = 客数 × 客単価 なので、客数が減って売上が増えるには客単価の上昇が必須です。'
  },
  {
    id: 78,
    category: 'data_interpretation',
    text: '「人口が減っているのに、税収が増えた」 この理由として考えられるのは？',
    options: ['一人当たりの納税額（増税や所得増）が上がった', 'みんなが節約した', '子供が増えた'],
    correctAnswer: 0,
    explanation: '全体の人数が減っても、一人当たりの負担額や所得が増えれば総額は増えます。'
  },
  {
    id: 79,
    category: 'data_interpretation',
    text: '「気温が上がると、事故が増える」 というデータがある。この解釈で注意すべき点は？',
    options: ['暑さが直接事故を起こしているとは限らない（集中力低下や外出増などの介在要因）', '暑い日は外に出ない方がいい', 'データが間違っている'],
    correctAnswer: 0,
    explanation: '相関関係と因果関係を混同せず、どのようなプロセスで事故に繋がるかを考える必要があります。'
  },
  {
    id: 80,
    category: 'data_interpretation',
    text: '「広告費を0にしたのに、売上が上がった」 この現象の推測は？',
    options: ['広告は無駄だった', 'SNSでの口コミなど、有料広告以外の認知が広がった', '偶然である'],
    correctAnswer: 1,
    explanation: '有料広告以外のチャネル（口コミ、リピーター、メディア露出等）が機能したと考えられます。'
  },
  {
    id: 81,
    category: 'data_interpretation',
    text: '「勉強時間を増やしたのに、点数が下がった」 このデータから推測される問題は？',
    options: ['勉強は意味がない', '勉強の「質」や「方法」が間違っている可能性がある', 'テストが難しすぎた'],
    correctAnswer: 1,
    explanation: '時間（量）と結果（質）は必ずしも比例しません。効率や内容の確認が必要です。'
  },
  {
    id: 82,
    category: 'data_interpretation',
    text: '「雨量が増えたのに、水不足になった」 この矛盾したデータの理由は？',
    options: ['雨が汚かった', 'ダムの貯水能力不足や、一時的な集中豪雨で流れてしまった', 'みんなが水を使いすぎた'],
    correctAnswer: 1,
    explanation: '降る量だけでなく、それを「貯める・管理する」能力が重要です。'
  },
  {
    id: 83,
    category: 'data_interpretation',
    text: '「値上げをしたのに、客が増えた」 このデータが示す可能性は？',
    options: ['客は高いものが好き', 'ブランド価値が高まった、または需要が供給を大きく上回っていた', '計算間違い'],
    correctAnswer: 1,
    explanation: '価格を上げても客が増えるのは、その商品の希少性や価値が認められた証拠です。'
  },
  {
    id: 84,
    category: 'data_interpretation',
    text: '「SNSで炎上したが、登録者が増えた」 この現象の解釈は？',
    options: ['炎上は良いことだ', '批判も含めて「認知度」が急激に高まった結果', 'バグである'],
    correctAnswer: 1,
    explanation: 'ネガティブな形であっても、存在を知らなかった層にリーチした結果です。'
  },
  {
    id: 85,
    category: 'data_interpretation',
    text: '「人数が増えたのに、平均点が下がった」 このデータから言えることは？',
    options: ['新しく入った人の点数が、それまでの平均より低かった', 'みんなのやる気がなくなった', 'テストが難しくなった'],
    correctAnswer: 0,
    explanation: '平均を下げる要因は、平均以下の数値を持つ個体の追加です。'
  },

  // ⑦ 定義を考えろ (86-100)
  {
    id: 86,
    category: 'definition_thinking',
    text: '「友達」の定義として、論理的に最も「相互性」を含んでいるのは？',
    options: ['一方的に好きな人', '互いに信頼し、助け合える関係の人', '名前を知っている人'],
    correctAnswer: 1,
    explanation: '「友達」は一般的に双方向の関係性を前提とした概念です。'
  },
  {
    id: 87,
    category: 'definition_thinking',
    text: '「正義」を定義する際、最も考慮すべき対立軸は？',
    options: ['好きか嫌いか', '個人の自由か、全体の幸福か', '新しいか古いか'],
    correctAnswer: 1,
    explanation: '正義論の多くは、個人の権利と社会全体の利益のバランスを議論します。'
  },
  {
    id: 88,
    category: 'definition_thinking',
    text: '「幸せ」を客観的に定義しようとする場合、使われやすい指標は？',
    options: ['笑顔の回数', '自己決定権や生活の満足度', '持っているお金の量'],
    correctAnswer: 1,
    explanation: '主観的な幸福感だけでなく、自分の人生を自分で決めている感覚（自己決定）は重要な指標です。'
  },
  {
    id: 89,
    category: 'definition_thinking',
    text: '「努力」の定義に「目的」が必要な理由は？',
    options: ['目的がないと単なる「作業」や「徒労」になるから', '疲れるから', '褒められたいから'],
    correctAnswer: 0,
    explanation: '努力は「目標に向かって」力を尽くすことと定義されるのが一般的です。'
  },
  {
    id: 90,
    category: 'definition_thinking',
    text: '「天才」を「希少性」で定義するなら？',
    options: ['努力する人', '統計的に極めて稀な能力を持つ人', '有名な人'],
    correctAnswer: 1,
    explanation: '希少性は「数の少なさ」を意味するため、統計的な視点が必要になります。'
  },
  {
    id: 91,
    category: 'definition_thinking',
    text: '「成功」の定義を「主観的」に決めるメリットは？',
    options: ['他人の基準に振り回されず、自分で納得できる', 'お金が稼げる', '有名になれる'],
    correctAnswer: 0,
    explanation: '成功の基準を自分の中に持つことで、精神的な安定が得られます。'
  },
  {
    id: 92,
    category: 'definition_thinking',
    text: '「失敗」を「学習」として定義し直すとどうなる？',
    options: ['悪いこと', '「うまくいかない方法」を発見したという成果', '才能がない証拠'],
    correctAnswer: 1,
    explanation: 'エジソンの有名な言葉のように、失敗をデータ収集と捉える定義です。'
  },
  {
    id: 93,
    category: 'definition_thinking',
    text: '「リーダー」の定義に不可欠な要素は？',
    options: ['声が大きいこと', '共通の目標に向かって集団を導く役割', '一番偉いこと'],
    correctAnswer: 1,
    explanation: 'リーダーシップの本質は、方向性を示し、他者を動かす機能にあります。'
  },
  {
    id: 94,
    category: 'definition_thinking',
    text: '「公平」と「平等」の違いを定義するなら？',
    options: ['同じ言葉である', '平等は「同じものを与える」、公平は「状況に応じて正当に扱う」', '公平は「早い者勝ち」'],
    correctAnswer: 1,
    explanation: '平等は一律の結果を、公平はプロセスや必要性に応じた正当性を重視します。'
  },
  {
    id: 95,
    category: 'definition_thinking',
    text: '「自由」の定義に伴う「責任」とは？',
    options: ['何もしなくていいこと', '自分の選択の結果を引き受けること', '他人に命令すること'],
    correctAnswer: 1,
    explanation: '自由な選択には、その結果に対する引き受け（責任）がセットになります。'
  },
  {
    id: 96,
    category: 'definition_thinking',
    text: '「平等」を「機会の平等」と定義した場合、どうなる？',
    options: ['全員同じ給料にする', 'スタートライン（挑戦する権利）を同じにする', 'テストをなくす'],
    correctAnswer: 1,
    explanation: '結果ではなく、挑戦するチャンスを等しく与えるという考え方です。'
  },
  {
    id: 97,
    category: 'definition_thinking',
    text: '「責任」を「応答可能性」として定義する意味は？',
    options: ['謝ること', '起きたことに対して説明し、対処できる状態であること', '罰を受けること'],
    correctAnswer: 1,
    explanation: 'Responsibility（Respons + Ability）の語源に近い、能動的な定義です。'
  },
  {
    id: 98,
    category: 'definition_thinking',
    text: '「ルール」の定義として適切なのは？',
    options: ['自由を奪うもの', '集団が円滑に活動するための共通の約束事', '強い人が決めるもの'],
    correctAnswer: 1,
    explanation: 'ルールの目的は、対立を防ぎ、全体の利益を最大化することにあります。'
  },
  {
    id: 99,
    category: 'definition_thinking',
    text: '「信頼」の定義を「期待」で説明するなら？',
    options: ['相手が自分の思い通りに動くこと', '相手が誠実に行動すると信じて、自分を委ねること', 'お金を貸すこと'],
    correctAnswer: 1,
    explanation: '不確実性がある中で、相手の善意や能力を信じるのが信頼です。'
  },
  {
    id: 100,
    category: 'definition_thinking',
    text: '「論理」の定義として最も近いのは？',
    options: ['自分の意見を押し通すこと', '思考の筋道が通っており、妥当であること', '難しい言葉を使うこと'],
    correctAnswer: 1,
    explanation: '前提から結論までのつながりに矛盾がなく、筋が通っていることが論理の本質です。'
  }
];
