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