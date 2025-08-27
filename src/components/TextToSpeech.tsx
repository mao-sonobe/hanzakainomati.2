import React, { useState } from 'react';
import { Volume2, VolumeX, Globe } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  description?: string;
  language?: 'ja' | 'en' | 'ko' | 'zh';
  className?: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ 
  text, 
  description = '',
  language = 'ja', 
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const translateText = (text: string, desc: string, targetLang: string): string => {
    // 簡易翻訳（実際のプロジェクトではGoogle Translate APIなどを使用）
    const translations: { [key: string]: { [key: string]: string } } = {
      '旧吉原家住宅': {
        en: 'Former Yoshiwara Family Residence',
        ko: '구 요시와라가 주택',
        zh: '旧吉原家住宅'
      },
      '庄分酢・高橋家住宅': {
        en: 'Shobunsu Takahashi Family Residence',
        ko: '쇼분스 다카하시가 주택',
        zh: '庄分醋・高桥家住宅'
      },
      '吉原義朗家住宅': {
        en: 'Yoshiwara Yoshiro Family Residence',
        ko: '요시와라 요시로가 주택',
        zh: '吉原义朗家住宅'
      },
      '旧緒方家住宅': {
        en: 'Former Ogata Family Residence',
        ko: '구 오가타가 주택',
        zh: '旧绪方家住宅'
      },
      '藩境の石列・御境石': {
        en: 'Feudal Domain Boundary Stone Row',
        ko: '번경의 석열・어경계석',
        zh: '藩境石列・御境石'
      },
      '御堺江湖': {
        en: 'Osakai Egoko Canal',
        ko: '오사카이 에고코 운하',
        zh: '御堺江湖运河'
      },
      '小保八幡神社': {
        en: 'Kobo Hachiman Shrine',
        ko: '고보 하치만 신사',
        zh: '小保八幡神社'
      },
      '法泉寺': {
        en: 'Hosen Temple',
        ko: '호센지',
        zh: '法泉寺'
      },
      '光楽寺': {
        en: 'Koraku Temple',
        ko: '고라쿠지',
        zh: '光乐寺'
      },
      '願蓮寺': {
        en: 'Ganren Temple',
        ko: '간렌지',
        zh: '愿莲寺'
      },
      '浄福寺': {
        en: 'Jofuku Temple',
        ko: '조후쿠지',
        zh: '净福寺'
      },
      '安土桃山時代初期の天正年間（1573年〜1592年）に創建され、江戸時代の寛文5年（1665年）に柳川藩主の援助のもと現在の場所に移転。浄土宗の寺院で、境内には文政7年（1824年）に建築された山門の鐘楼門や宝形造りの本堂と庫裏（くり）が残されています。外からは、重層の楼鐘門である山門を観ることができます。ガイド付ツアーでは、内部に入り、本堂の壮麗な青い龍の装飾や大川組子を施した扉などを鑑賞できます（日程による）。': {
        en: 'Founded during the Tensho period (1573-1592) in the early Azuchi-Momoyama period, it was relocated to its current location in 1665 during the Edo period with the support of the Yanagawa domain lord. This Jodo sect temple features a bell tower gate built in 1824, and a treasure-shaped main hall and kitchen. Guided tours allow visitors to see the magnificent blue dragon decorations and Okawa kumiko doors inside.',
        ko: '아즈치모모야마시대 초기 덴쇼년간(1573년~1592년)에 창건되어, 에도시대 간분 5년(1665년)에 야나가와 번주의 지원으로 현재 위치로 이전했습니다. 정토종 사원으로, 1824년에 건축된 종루문과 보형조 본당, 고리가 남아있습니다. 가이드 투어에서는 본당의 장려한 푸른 용 장식과 오카와 구미코 문을 감상할 수 있습니다.',
        zh: '创建于安土桃山时代初期的天正年间（1573年～1592年），江户时代宽文5年（1665年）在柳川藩主的援助下迁至现在的位置。这是净土宗寺院，境内有文政7年（1824年）建造的钟楼门和宝形造的本堂、库里。导游团可以进入内部，欣赏本堂壮丽的青龙装饰和大川组子门。'
      },
      '寛永元年（1624年）に旧柳河藩主の立花宗茂（たちばなむねしげ）によって創建、弘化4年（1847年）に再建されたと伝えられています。大屋根が二重に見える造りになっていることが特徴的です。本堂の天井には、様々な動物、植物、人物が描かれている板絵が168枚あります。19世紀に活躍した絵師、北島（幽谷）勝永の印があるものも多く、のびやかな線と構図や色彩に圧倒されます。ガイド付ツアーでは入ることができますので問合せを（日程による）。': {
        en: 'Founded in 1624 by former Yanagawa domain lord Tachibana Muneshige, it was rebuilt in 1847. The temple features a distinctive double-layered roof structure. The main hall ceiling contains 168 painted panels depicting various animals, plants, and people. Many bear the seal of 19th-century artist Kitajima (Yukoku) Katsunaga, known for graceful lines, composition, and vibrant colors. Interior visits available through guided tours (by appointment).',
        ko: '간에이 원년(1624년)에 구 야나가와 번주 다치바나 무네시게에 의해 창건되어, 고카 4년(1847년)에 재건되었다고 전해집니다. 대지붕이 이중으로 보이는 구조가 특징적입니다. 본당 천장에는 다양한 동물, 식물, 인물이 그려진 판화 168매가 있습니다. 19세기에 활약한 화가 기타지마(유코쿠) 가츠나가의 인장이 있는 것도 많아, 유연한 선과 구도, 색채에 압도됩니다.',
        zh: '宽永元年（1624年）由旧柳河藩主立花宗茂创建，弘化4年（1847年）重建。特色是大屋顶呈双重结构。本堂天花板上有168幅描绘各种动物、植物、人物的板画。许多作品都有19世纪画家北岛（幽谷）胜永的印章，其流畅的线条、构图和色彩令人震撼。可通过导游团进入参观（需预约）。'
      },
      '榎津の地名起源とされる榎津久米之介によって、天文5年（1536年）に創建されたと伝えられています。浄土真宗大谷派に属し、参道正面の山門を抜けると、境内には伝統的様式を留める本堂や鐘楼、庫裏があり、本堂前には榎津久米之介の銅像が建てられています。ガイド付ツアーでは、内部に入って詳細な説明をうけることができます（日程にもよる）。': {
        en: 'Founded in 1536 by Enozu Kumeznosuke, who is said to be the origin of the place name Enozu. Belonging to the Jodo Shinshu Otani sect, the temple features a main hall, bell tower, and kitchen in traditional style beyond the mountain gate. A bronze statue of Enozu Kumeznosuke stands in front of the main hall. Guided tours with detailed explanations are available (depending on schedule).',
        ko: '에노즈의 지명 기원으로 여겨지는 에노즈 구메노스케에 의해 덴분 5년(1536년)에 창건되었다고 전해집니다. 정토진종 오타니파에 속하며, 참도 정면의 산문을 지나면 경내에는 전통적 양식을 유지하는 본당과 종루, 고리가 있고, 본당 앞에는 에노즈 구메노스케의 동상이 세워져 있습니다. 가이드 투어에서는 내부에 들어가 자세한 설명을 들을 수 있습니다(일정에 따라).',
        zh: '据传由被认为是榎津地名起源的榎津久米之介于天文5年（1536年）创建。属于净土真宗大谷派，穿过参道正面的山门，境内有保持传统样式的本堂、钟楼、库里，本堂前立有榎津久米之介的铜像。导游团可以进入内部接受详细说明（根据日程安排）。'
      },
      '主屋および御成門（おなりもん）は文政八年(1825年)の建築で国指定重要文化財である他、大川市指定有形文化財に指定されている土蔵3棟と、国登録有形文化財の通用門および煉瓦塀があります。複雑な屋根の構成と大壁造の重厚な外観、玄関から上ノ間に至る接客部分と内向き部分の動線が明確に区分された平面構成が特徴です。また、楠の大材を使用した土間廻りの豪快なつくりと、優れた細工による座敷廻りの洒落た意匠とを兼ね備えており、江戸後期の上質な大型民家の姿を伝えるものとして高く評価されています。': {
        en: 'The main house and Onarimmon gate were built in 1825 and are designated as National Important Cultural Properties. There are also 3 storehouses designated as Okawa City Tangible Cultural Properties and a service gate and brick fence registered as National Tangible Cultural Properties.',
        ko: '주택과 오나리몬 문은 1825년에 건축되어 국가 지정 중요문화재입니다. 또한 오카와시 지정 유형문화재인 창고 3동과 국가 등록 유형문화재인 통용문 및 벽돌 담장이 있습니다.',
        zh: '主屋和御成门建于1825年，是国家指定重要文化财产。还有3栋被指定为大川市有形文化财产的仓库，以及被登录为国家有形文化财产的通用门和砖墙。'
      },
      '江戸時代初期、高橋家の初代清右衛門が榎津に移り住んだことをきっかけに、二代目四郎兵衛が造り酒屋を開始。その後、四代目清右衛門が酢造商いを始めたのが「庄分酢」の始まり。': {
        en: 'In the early Edo period, the first generation Seiemon of the Takahashi family moved to Enozu, and the second generation Shirobei started a sake brewery. Later, the fourth generation Seiemon began vinegar brewing, which was the beginning of "Shobunsu".',
        ko: '에도시대 초기, 다카하시가의 초대 세이에몬이 에노즈로 이주한 것을 계기로 2대 시로베이가 양조장을 시작했습니다. 그 후 4대 세이에몬이 식초 양조업을 시작한 것이 "쇼분스"의 시작입니다.',
        zh: '江户时代初期，高桥家初代清右卫门迁居榎津，二代目四郎兵卫开始经营酿酒屋。后来四代目清右卫门开始醋酿造生意，这就是"庄分醋"的开始。'
      }
    };

    // 名前の翻訳
    let translatedText = text;
    let translatedDesc = desc;
    
    for (const [japanese, translation] of Object.entries(translations)) {
      if (text.includes(japanese)) {
        translatedText = translation[targetLang] || text;
      }
      if (desc.includes(japanese)) {
        translatedDesc = translation[targetLang] || desc;
      }
    }
    
    return `${translatedText}。${translatedDesc}`;
  };

  const speak = (textToSpeak: string, lang: string) => {
    if ('speechSynthesis' in window) {
      // 既存の音声を停止
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // 言語設定
      const langCodes: { [key: string]: string } = {
        ja: 'ja-JP',
        en: 'en-US',
        ko: 'ko-KR',
        zh: 'zh-CN'
      };
      
      utterance.lang = langCodes[lang] || 'ja-JP';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('お使いのブラウザは音声読み上げ機能をサポートしていません。');
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleLanguageChange = (newLang: string) => {
    setCurrentLanguage(newLang as 'ja' | 'en' | 'ko' | 'zh');
    stopSpeech();
  };

  const handleSpeak = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      const translatedText = translateText(text, description, currentLanguage);
      speak(translatedText, currentLanguage);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* 言語選択 */}
      <div className="relative">
        <select
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 text-xs pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
        <Globe className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
      </div>

      {/* 音声読み上げボタン */}
      <button
        onClick={handleSpeak}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
          isPlaying 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
        }`}
        title={isPlaying ? '音声停止' : '音声読み上げ'}
      >
        {isPlaying ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default TextToSpeech;