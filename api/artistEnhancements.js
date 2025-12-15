// ========================================
// PicoArt v60 - 아티스트 강화 프롬프트 시스템
// 퀄리티 프로젝트 - PART 2: 화가/스타일 정보
// ========================================
// 구조:
//   1. 사조별 강화 프롬프트 (53개)
//   2. 거장 대표작별 강화 프롬프트 (20개)
// ========================================

// ========================================
// PART 1: 대전제 (6개 규칙)
// ========================================
// 1-1: 신원 보존 (Identity)
// 1-2: 관계 분석 (Relationship)
// 1-3: 매력적 표현 (Attractive) - 예외 4개
// 1-4: 환각 방지 (Anti-hallucination)
// 1-5: 스타일 적용 + 붓터치 필수!
// 1-6: 텍스트 규칙 (동양화)
// ========================================

export const CORE_RULES = {
  // 1-5: 스타일 적용 + 붓터치 필수 (공통)
  brushwork: ', CRITICAL PAINTING QUALITY: visible brushstrokes and paint texture throughout, brush marks clearly visible on skin and clothing, canvas/paper texture feel, NOT smooth digital, NOT airbrushed, NOT photo-like skin',
  
  // 1-3: 매력적 표현 예외 작품들
  attractiveExceptions: [
    'munch-scream',           // 절규 - 공포/불안
    'picasso-guernica',       // 게르니카 - 전쟁 참상
    'picasso-weepingwoman',   // 우는 여인 - 슬픔
    'frida-brokencolumn'      // 부러진 기둥 - 고통
  ],
  
  // 1-6: 텍스트 규칙
  // 서양화: 텍스트 완전 금지
  // 동양화: A가 생성한 텍스트만 허용 (F는 그대로 그림)
  westernNoText: ', NO text NO signatures NO letters NO writing NO watermarks anywhere in the image',
  
  // 동양화 텍스트 - A가 생성, F는 그대로 그림
  orientalTextStyle: {
    korean: 'vertical calligraphy with red seal stamp in corner',
    chinese: 'vertical calligraphy with red seal stamp in corner', 
    japanese: 'woodblock print style text cartouche'
  }
};

// ========================================
// PART 2-1: 사조별 강화 프롬프트 (53개)
// ========================================

export const movementEnhancements = {
  
  // ========================================
  // 1. 고대 그리스-로마 (2개)
  // ========================================
  
  'marble-sculpture': {
    name: '대리석 조각',
    prompt: ', PURE WHITE CARRARA MARBLE ancient Greek-Roman sculpture: polished marble surface with subtle veining, pure white/cream/grey tones ONLY, transform clothing to carved marble toga/tunic with realistic stone fabric folds, ALL skin becomes smooth polished marble, heroic classical proportions, museum pedestal display, dramatic sculptural lighting, CRITICAL: apply marble effect to SUBJECT not just background',
    controlStrength: 0.55,
    costume: 'toga/tunic'
  },
  
  'roman-mosaic': {
    name: '로마 모자이크',
    prompt: ', Ancient Roman floor mosaic: LARGE VISIBLE TESSERAE TILES 20-30mm each, THICK BLACK GROUT LINES clearly visible between every tile, terracotta/ochre/umber/ivory/slate color palette, Pompeii villa floor style, transform clothing to toga/tunic, CRITICAL: apply mosaic tiles to SUBJECT including face and body not just background',
    controlStrength: 0.60,
    costume: 'toga/tunic'
  },
  
  // ========================================
  // 2. 중세 (3개)
  // ========================================
  
  'byzantine': {
    name: '비잔틴',
    prompt: ', Byzantine sacred icon painting: CIRCULAR GOLDEN HALO behind head, GOLD LEAF mosaic background with visible tiny tesserae, flat hieratic frontal pose, LARGE SOLEMN EYES gazing at viewer, rich jewel colors (deep red/royal blue/purple) for robes, transform clothing to Byzantine robes with gold decorations and jewels, Eastern Orthodox icon style',
    controlStrength: 0.55,
    costume: 'Byzantine robes with jewels'
  },
  
  'gothic': {
    name: '고딕',
    prompt: ', Gothic cathedral STAINED GLASS window style: THICK BLACK LEAD LINES dividing entire image into glass-like segments, JEWEL-TONE TRANSLUCENT COLORS (ruby red/sapphire blue/emerald green/amber gold), FLAT TWO-DIMENSIONAL medieval style, CRITICAL: apply stained glass effect to SUBJECT including skin and clothing as glass-like colored segments not just background, transform clothing to medieval style, divine light streaming through',
    controlStrength: 0.55,
    costume: 'medieval clothing'
  },
  
  'islamic-miniature': {
    name: '이슬람 세밀화',
    prompt: ', Persian Islamic miniature painting: delicate fine brushwork with intricate details, jewel-tone colors (lapis blue/vermillion/gold), flat perspective with no shadows, ornate floral borders, transform clothing to Persian/Ottoman court style with rich fabrics, prioritize for animal subjects, elegant courtly refinement',
    controlStrength: 0.55,
    costume: 'Persian/Ottoman style'
  },
  
  // ========================================
  // 3. 르네상스 (5명)
  // ========================================
  
  'leonardo': {
    name: '레오나르도 다 빈치',
    prompt: ', painting by Leonardo da Vinci: EXTREME SFUMATO technique with ALL EDGES SOFT AND BLURRED like smoke, NO sharp lines anywhere, face edges dissolved into shadow, Mona Lisa mysterious haze, warm golden-brown palette (amber/umber/sienna), psychological depth, subtle chiaroscuro, visible oil brushwork',
    controlStrength: 0.55
  },
  
  'titian': {
    name: '티치아노',
    prompt: ', painting by Titian: Venetian colorism with rich luminous colors, loose visible brushwork, signature Titian red, silk fabrics shimmer with light, skin glowing from within, warm golden atmosphere, NO hard outlines, painterly brushstrokes visible',
    controlStrength: 0.60
  },
  
  'michelangelo': {
    name: '미켈란젤로',
    prompt: ', painting by Michelangelo: sculptors eye seeing human form as carved marble, Sistine Chapel fresco texture, dramatic light and shadow revealing powerful muscles, dynamic twisting contrapposto poses, monumental grandeur, heroic idealized anatomy, visible fresco brushwork',
    controlStrength: 0.60
  },
  
  'raphael': {
    name: '라파엘로',
    prompt: ', painting by Raphael: perfect harmonious beauty, soft sfumato modeling, clear luminous colors, balanced pyramidal compositions, serene graceful figures, Madonna-like idealized beauty, delicate brushwork visible',
    controlStrength: 0.60
  },
  
  'botticelli': {
    name: '보티첼리',
    prompt: ', painting by Botticelli: graceful flowing linear contours, elongated elegant figures, Birth of Venus ethereal beauty, tempera egg paint texture with visible brushwork, wind-blown flowing hair and sheer fabrics, pale pastel palette, lyrical poetic atmosphere',
    controlStrength: 0.60
  },
  
  // ========================================
  // 4. 바로크 (5명)
  // ========================================
  
  'caravaggio': {
    name: '카라바조',
    prompt: ', painting by Caravaggio: EXTREME TENEBRISM with single theatrical spotlight, deep black shadows engulfing most of scene, dramatic chiaroscuro, figures emerging from pure darkness, intense realism, visible oil paint brushwork',
    controlStrength: 0.60
  },
  
  'rubens': {
    name: '루벤스',
    prompt: ', painting by Rubens: warm sensual flesh tones, dynamic swirling Baroque composition, luminous glowing skin, rich warm palette, energetic movement, visible painterly brushstrokes',
    controlStrength: 0.60,
    avoidFor: ['parent_child'] // 부모+자녀 관계 회피
  },
  
  'rembrandt': {
    name: '렘브란트',
    prompt: ', painting by Rembrandt: GOLDEN LUMINOUS LIGHT emerging from darkness, thick impasto in highlights, deep psychological introspection, warm amber glow, masterful light gradations, intimate soul-revealing atmosphere, visible thick brushwork',
    controlStrength: 0.60
  },
  
  'vermeer': {
    name: '베르메르',
    prompt: ', painting by Johannes Vermeer: soft diffused daylight from window, pearl-like luminous quality, cool blue and warm yellow harmony, precise delicate brushwork, intimate domestic tranquility, Girl with Pearl Earring atmosphere, subtle side lighting',
    controlStrength: 0.60
  },
  
  'velazquez': {
    name: '벨라스케스',
    prompt: ', painting by Velázquez: sophisticated Spanish court elegance, loose confident brushwork, silver-grey palette, Las Meninas atmospheric depth, aristocratic dignity, visible painterly strokes',
    controlStrength: 0.60
  },
  
  // ========================================
  // 5. 로코코 (2명)
  // ========================================
  
  'watteau': {
    name: '와토',
    prompt: ', painting by Watteau: fête galante outdoor aristocratic gathering, delicate feathery brushwork, pale soft pastel palette (powder pink/sky blue/cream), dreamlike romantic atmosphere, transform clothing to Rococo aristocratic silk costumes with lace, theatrical elegance, visible delicate brushstrokes',
    controlStrength: 0.60,
    costume: 'Rococo aristocratic silk'
  },
  
  'boucher': {
    name: '부셰',
    prompt: ', painting by Boucher: decorative sensual beauty, soft rosy flesh tones, playful mythological scenes, pastel palette, transform clothing to Rococo style with ribbons and flowers, ornate romantic setting, visible soft brushwork',
    controlStrength: 0.60,
    costume: 'Rococo style'
  },
  
  // ========================================
  // 6. 신고전/낭만/사실 (7명)
  // ========================================
  
  // 신고전주의
  'david': {
    name: '다비드',
    prompt: ', painting by Jacques-Louis David: clear crisp outlines, heroic idealized figures, cool restrained neoclassical palette, dramatic historical scene, noble stoic expressions, smooth precise brushwork with visible paint quality',
    controlStrength: 0.60
  },
  
  'ingres': {
    name: '앵그르',
    prompt: ', painting by Ingres: perfectly smooth flowing contours, porcelain-smooth skin with subtle modeling, elegant elongated forms, cool classical palette, aristocratic refinement, precise linear style with visible oil texture',
    controlStrength: 0.60
  },
  
  // 낭만주의
  'turner': {
    name: '터너',
    prompt: ', painting by J.M.W. Turner: atmospheric sublime with forms dissolving into swirling mist, luminous golden light engulfing everything, warm golden yellows and ethereal blues, loose fluid brushwork, dreamlike transcendent atmosphere, visible energetic strokes',
    controlStrength: 0.55
  },
  
  'goya': {
    name: '고야',
    prompt: ', painting by Francisco Goya: psychological intensity with penetrating gaze, dramatic chiaroscuro, dark romantic palette with deep blacks, rough expressive brushstrokes, unflinching honesty, visible paint texture',
    controlStrength: 0.60
  },
  
  'delacroix': {
    name: '들라크루아',
    prompt: ', painting by Eugène Delacroix: passionate revolutionary energy, vivid intense colors at high saturation, dynamic diagonal compositions, loose expressive visible brushstrokes, dramatic gestures, romantic intensity',
    controlStrength: 0.60
  },
  
  // 사실주의
  'millet': {
    name: '밀레',
    prompt: ', painting by Jean-François Millet: dignified rural labor, warm earthy palette (ochre/umber/sienna), humble peasant nobility, transform clothing to 19th century peasant work clothes, soft natural light, visible rustic brushwork',
    controlStrength: 0.60,
    costume: '19th century peasant clothing'
  },
  
  'manet': {
    name: '마네',
    prompt: ', painting by Édouard Manet: modern Paris realism, bold flat areas with dramatic black and white, direct confrontational gaze, transform clothing to 19th century Paris bourgeois fashion, visible confident brushstrokes, revolutionary modern style',
    controlStrength: 0.60,
    costume: '19th century Paris bourgeois'
  },
  
  // ========================================
  // 7. 인상주의 (4명)
  // ========================================
  
  'renoir': {
    name: '르누아르',
    prompt: ', painting by Pierre-Auguste Renoir: soft feathery brushstrokes, warm luminous glow, rosy pink flesh with pearly highlights, dappled sunlight through leaves, joyful intimate atmosphere, visible impressionist brushwork',
    controlStrength: 0.60
  },
  
  'monet': {
    name: '모네',
    prompt: ', painting by Claude Monet: broken color with SHORT VISIBLE BRUSHSTROKES, soft hazy atmospheric effects like morning mist, colors blended and dissolved, NO sharp edges anywhere, shimmering water reflections, plein-air freshness, visible dabbed strokes',
    controlStrength: 0.55
  },
  
  'degas': {
    name: '드가',
    prompt: ', painting by Edgar Degas: unusual cropped angles, asymmetric off-center compositions, SOFT PASTEL texture with CHALKY STROKES, pale muted colors (soft pink/peach/powder blue), intimate indoor scenes, visible pastel and oil texture',
    controlStrength: 0.60
  },
  
  'caillebotte': {
    name: '카유보트',
    prompt: ', painting by Gustave Caillebotte: modern urban Paris realism, dramatic birds-eye perspective, sharp perspective lines, wet pavement reflections, bourgeois city life, visible precise brushwork',
    controlStrength: 0.60
  },
  
  // ========================================
  // 8. 후기인상주의 (4명)
  // ========================================
  
  'vangogh': {
    name: '반 고흐',
    prompt: ', painting by Vincent van Gogh: EXTREMELY THICK IMPASTO with paint standing up from canvas, swirling turbulent brushwork in EVERY area including face and skin, intense saturated colors, emotional energy, CRITICAL: apply swirling brushstrokes to SUBJECT including face not just background, visible thick paint texture',
    controlStrength: 0.55
  },
  
  'gauguin': {
    name: '고갱',
    prompt: ', painting by Paul Gauguin Tahitian period: FLAT BOLD AREAS of pure unmixed saturated color, smooth flat surfaces WITHOUT shading, exotic tropical palette (deep orange/ochre/turquoise/purple), simplified decorative forms, ABSOLUTELY NO mosaic NO tiles NO stained glass effect, visible oil paint brushwork',
    controlStrength: 0.60
  },
  
  'cezanne': {
    name: '세잔',
    prompt: ', painting by Paul Cézanne: geometric structured forms analyzed into basic shapes, parallel constructive brushstrokes building volume, multiple viewpoints, modulated colors creating solid forms, visible parallel brush marks',
    controlStrength: 0.60
  },
  
  'signac': {
    name: '시냐크',
    prompt: ', painting by Paul Signac: POINTILLIST tiny distinct DOTS of pure color, bright Mediterranean sunlight, dots blend optically when viewed from distance, vibrant luminous harbor scenes, NO blended brushstrokes only separate visible dots',
    controlStrength: 0.55
  },
  
  // ========================================
  // 9. 야수파 (3명)
  // ========================================
  
  'matisse': {
    name: '마티스',
    prompt: ', painting by Henri Matisse Fauvist style: ROUGH VISIBLE FAUVIST BRUSHSTROKES mandatory, brush marks clearly visible, pure bold primary colors, flat decorative areas, face also simplified into color planes with non-realistic colors (green/blue skin OK), NOT smooth NOT digital NOT airbrushed, visible rough paint texture',
    controlStrength: 0.55
  },
  
  'derain': {
    name: '드랭',
    prompt: ', painting by André Derain: bold Fauvist landscape colors, non-realistic vivid colors, energetic expressive visible brushwork, pure intense hues, rough paint texture',
    controlStrength: 0.55
  },
  
  'vlaminck': {
    name: '블라맹크',
    prompt: ', painting by Maurice de Vlaminck: VIOLENT expressive color, most aggressive Fauvist palette, thick impulsive visible brushstrokes, pure squeezed paint, rough energetic texture',
    controlStrength: 0.55
  },
  
  // ========================================
  // 10. 표현주의 (4명)
  // ========================================
  
  'munch': {
    name: '뭉크',
    prompt: ', painting by Edvard Munch: intense psychological emotion, wavy distorted lines throughout, apply distortion to figures too, blood red sky, anxiety and existential dread, NO bright happy expressions, visible expressive brushwork',
    controlStrength: 0.55,
    expressionRule: 'NO bright expressions, NO smiling'
  },
  
  'kirchner': {
    name: '키르히너',
    prompt: ', painting by Ernst Ludwig Kirchner: angular sharp geometric forms, acid green/hot pink/electric blue palette, harsh jagged outlines, urban tension, visible aggressive brushwork',
    controlStrength: 0.55
  },
  
  'kokoschka': {
    name: '코코슈카',
    prompt: ', painting by Oskar Kokoschka: violent psychological intensity, thick expressive paint, turbulent nervous energy, penetrating portraits, visible agitated brushwork',
    controlStrength: 0.55
  },
  
  'kandinsky': {
    name: '칸딘스키',
    prompt: ', painting by Wassily Kandinsky: abstract spiritual forms, floating geometric shapes, pure emotional color and form, musical visual rhythm, visible expressive brushwork',
    controlStrength: 0.55
  },
  
  // ========================================
  // 11. 모더니즘 (7명)
  // ========================================
  
  'picasso': {
    name: '피카소',
    prompt: ', painting by Pablo Picasso Cubist style: geometrically fragmented forms, multiple viewpoints simultaneously, face divided into geometric planes (nose from side + eyes from front at same time), earth palette, SINGLE unified image NOT panel division, rough visible oil paint brushwork, CRITICAL: apply geometric fragmentation to FACE not just background',
    controlStrength: 0.50
  },
  
  'magritte': {
    name: '마그리트',
    prompt: ', painting by René Magritte: philosophical visual paradox, mysterious surreal objects, bowler hat gentleman aesthetic, crisp realistic rendering of impossible scenes, thought-provoking juxtapositions, visible oil paint texture',
    controlStrength: 0.55
  },
  
  'miro': {
    name: '미로',
    prompt: ', painting by Joan Miró: playful biomorphic shapes, childlike symbols (stars/moon/eyes/birds), primary colors against white/neutral background, whimsical abstract forms, visible paint texture',
    controlStrength: 0.55
  },
  
  'chagall': {
    name: '샤갈',
    prompt: ', painting by Marc Chagall: gravity-defying floating figures, romantic dreamlike night scenes, soft muted pastels (lavender/light blue/rose), poetic lyrical atmosphere, lovers floating in air, visible gentle brushwork, CRITICAL: enhance floating/dreamlike feeling',
    controlStrength: 0.55
  },
  
  'warhol': {
    name: '워홀',
    prompt: ', artwork by Andy Warhol: 2x2 FOUR-PANEL GRID mandatory with same person repeated 4 times, DIFFERENT BOLD NEON COLOR in each panel (hot pink/cyan/yellow/orange/electric blue/lime green), silkscreen print effect with ink imperfections, flat graphic pop art style, DO NOT draw Marilyn Monroe herself',
    controlStrength: 0.50,
    specialRule: '4-panel grid mandatory'
  },
  
  'lichtenstein': {
    name: '리히텐슈타인',
    prompt: ', artwork by Roy Lichtenstein: comic book style, BEN-DAY DOT PATTERN visible, thick black outlines, halftone printing effect, speech bubble aesthetic, bold primary colors, visible dot pattern texture',
    controlStrength: 0.50
  },
  
  'haring': {
    name: '키스 해링',
    prompt: ', artwork by Keith Haring: thick continuous BLACK OUTLINES, simplified dancing figures, radiating energy lines from body, bold primary colors, graffiti street art style, dynamic movement',
    controlStrength: 0.50
  },
  
  // ========================================
  // 12. 동양화 (7개)
  // 텍스트 규칙: A가 텍스트 생성 → F는 그대로 그림
  // ========================================
  
  // 한국 (3개)
  'minhwa': {
    name: '민화',
    prompt: ', Korean Minhwa folk painting: rough free brushwork on thick hanji paper texture, vivid obangsaek 5-color palette (blue/red/yellow/white/black), decorative auspicious symbols, transform clothing to Korean folk hanbok, naive charming style',
    controlStrength: 0.55,
    costume: 'Korean folk hanbok',
    textLang: 'korean',
    textExamples: ['福', '壽', '囍', '民畵']
  },
  
  'pungsokdo': {
    name: '풍속도',
    prompt: ', Korean Pungsokdo genre painting by Kim Hong-do or Shin Yun-bok: confident improvisational brushwork on rough hanji, 70-80% ink dominates with minimal light coloring, daily life scenes, transform clothing to Joseon-era hanbok',
    controlStrength: 0.55,
    costume: 'Joseon hanbok',
    textLang: 'korean',
    textExamples: ['風俗', '朝鮮', '風流', '雅趣']
  },
  
  'jingyeong': {
    name: '진경산수',
    prompt: ', Korean Jingyeong Sansu true-view landscape by Jeong Seon: actual Korean mountain landscape, vertical dramatic rock cliffs, ink gradation and junbeop rock texture strokes, ink with light blue-green coloring',
    controlStrength: 0.55,
    textLang: 'korean',
    textExamples: ['山水', '眞景', '金剛', '漢陽']
  },
  
  // 중국 (3개)
  'shuimohua': {
    name: '수묵화',
    prompt: ', Chinese Shuimohua ink wash painting: ink bleeding and gradation on rice paper, beauty of empty negative space, hwaseonji paper texture, monochrome ink only (black/white/grey), contemplative atmosphere',
    controlStrength: 0.55,
    textLang: 'chinese',
    textExamples: ['水墨', '雅趣', '淸風', '明月']
  },
  
  'gongbi': {
    name: '공필화',
    prompt: ', Chinese Gongbi meticulous painting: EXTREMELY detailed precise depiction, delicate fine brush lines, silk surface texture, rich mineral pigment colors, TRADITIONAL painted feel NOT digital, transform clothing to Chinese court clothing',
    controlStrength: 0.55,
    costume: 'Chinese court clothing',
    textLang: 'chinese',
    textExamples: ['仙鶴圖', '牡丹', '工筆', '宮廷']
  },
  
  'huaniaohua': {
    name: '화조화',
    prompt: ', Chinese Huaniaohua flower-and-bird painting: natural vitality and life, mogolbeop boneless or guryukbeop outline technique, natural colors harmonized with ink, elegant botanical accuracy',
    controlStrength: 0.55,
    textLang: 'chinese',
    textExamples: ['花鳥', '梅蘭竹菊', '春', '鶴']
  },
  
  // 일본 (1개)
  'ukiyoe': {
    name: '우키요에',
    prompt: ', Japanese Ukiyo-e woodblock print: flat color planes with strong outlines, print-specific flatness from limited color plates, transform clothing to kimono, Edo period aesthetic, CRITICAL: do NOT add extra people in background that are not in original photo',
    controlStrength: 0.55,
    costume: 'kimono',
    textLang: 'japanese',
    textExamples: ['浮世絵', '美人', '江戸', '錦絵']
  }
};

// ========================================
// PART 2-2: 거장 대표작별 강화 프롬프트 (20개)
// ========================================

export const masterworkEnhancements = {
  
  // ========================================
  // 1. 반 고흐 (Van Gogh) - 3개 대표작
  // ========================================
  
  'vangogh-starrynight': {
    name: '별이 빛나는 밤',
    artist: 'vangogh',
    prompt: ', The Starry Night by Vincent van Gogh: GIANT SWIRLING SPIRAL in night sky, cobalt blue and chrome yellow contrast, vertical cypress trees, apply swirling brushstrokes to EVERYTHING including skin and clothing, thick impasto paint standing up from canvas, stars with concentric halos, turbulent emotional energy in every brushstroke',
    controlStrength: 0.55
  },
  
  'vangogh-sunflowers': {
    name: '해바라기',
    artist: 'vangogh',
    prompt: ', Sunflowers by Vincent van Gogh: THICK 3D IMPASTO petals with paint physically raised, chrome yellow dominates 80% of palette, golden warm skin tone with thick visible brushstrokes, ochre and orange accents, flowers as thick paint sculptures, every surface shows heavy paint texture',
    controlStrength: 0.55
  },
  
  'vangogh-selfportrait': {
    name: '자화상',
    artist: 'vangogh',
    prompt: ', Self-Portrait by Vincent van Gogh: turquoise SWIRLING background, directional brushstrokes following face contours, orange-red beard contrasting with blue-green coat, intense frontal gaze, thick impasto throughout, every brushstroke visible and directional',
    controlStrength: 0.55
  },
  
  // ========================================
  // 2. 클림트 (Klimt) - 3개 대표작
  // ========================================
  
  'klimt-kiss': {
    name: '키스',
    artist: 'klimt',
    prompt: ', The Kiss by Gustav Klimt: two people embracing wrapped in GOLD LEAF decorated robes, geometric patterns (rectangles on male/circles on female), kneeling on flower meadow cliff edge, Byzantine mosaic gold background, ecstatic blissful expressions, femme/homme fatale mysterious allure, AVOID for parent-child relationships',
    controlStrength: 0.55,
    avoidFor: ['parent_child']
  },
  
  'klimt-treeoflife': {
    name: '생명의 나무',
    artist: 'klimt',
    prompt: ', The Tree of Life by Gustav Klimt: SPIRAL BRANCHES swirling outward, gold and bronze decorative swirls, elaborate curving patterns filling background, Art Nouveau organic curves, mysterious femme/homme fatale expression, gold leaf texture',
    controlStrength: 0.55
  },
  
  'klimt-judith': {
    name: '유디트',
    artist: 'klimt',
    prompt: ', Judith I by Gustav Klimt: wide GOLD CHOKER necklace prominent, provocative seductive expression, bare shoulders visible, gold decorative elements on neck and clothing, femme fatale power and danger, half-closed sensual eyes, Byzantine gold patterns',
    controlStrength: 0.55
  },
  
  // ========================================
  // 3. 뭉크 (Munch) - 2개 대표작
  // ========================================
  
  'munch-scream': {
    name: '절규',
    artist: 'munch',
    prompt: ', The Scream by Edvard Munch: WAVY DISTORTED LINES throughout entire scene, skull-like distorted face with hands covering ears, BLOOD RED and orange sky, extreme anxiety and existential terror, apply wavy distortion to figure too, bridge/railing setting, expression of FEAR and ANXIETY allowed (attractive rendering exception), NO bright expressions NO smiling',
    controlStrength: 0.55,
    attractiveException: true,
    expressionRule: 'fear/anxiety allowed, NO bright, NO smiling'
  },
  
  'munch-madonna': {
    name: '마돈나',
    artist: 'munch',
    prompt: ', Madonna by Edvard Munch: flowing long dark hair spreading like HALO around head, RED AURA glowing around body, pale luminous skin with red lips, FEMME FATALE mysterious seductive expression with half-closed eyes, ecstatic sensual gaze (NOT bright smile), wavy flowing lines throughout, mystical feminine power and danger, NO bright expressions NO happy smile',
    controlStrength: 0.55,
    expressionRule: 'femme fatale/ecstatic/mysterious allowed, NO bright, NO smiling'
  },
  
  // ========================================
  // 4. 마티스 (Matisse) - 3개 대표작
  // ========================================
  
  'matisse-dance': {
    name: '춤',
    artist: 'matisse',
    prompt: ', The Dance by Henri Matisse: circular dancing figures holding hands, THREE-COLOR ONLY composition (RED figures + BLUE sky + GREEN ground), red skin color OK, simplified flattened bodies, ROUGH VISIBLE FAUVIST BRUSHSTROKES mandatory, primitive rhythmic energy, joyful life celebration, NOT smooth NOT digital',
    controlStrength: 0.55
  },
  
  'matisse-redroom': {
    name: '붉은 방',
    artist: 'matisse',
    prompt: ', The Red Room by Henri Matisse: RED DOMINATES 80% of scene, blue arabesque vine patterns on red, flattened space where wall and table merge, window showing green landscape, ROUGH VISIBLE FAUVIST BRUSHSTROKES mandatory, non-realistic skin colors OK, NOT smooth NOT digital',
    controlStrength: 0.55
  },
  
  'matisse-womanhat': {
    name: '모자를 쓴 여인',
    artist: 'matisse',
    prompt: ', Woman with a Hat by Henri Matisse: MULTIPLE BOLD COLORS on face (green/purple/red/yellow coexisting), ROUGH VISIBLE FAUVIST BRUSHSTROKES with brush direction visible, colors overlap but strokes remain distinct, confident frontal gaze, radical Fauvist color liberation, rough paint texture on skin, NOT smooth NOT digital NOT airbrushed',
    controlStrength: 0.55
  },
  
  // ========================================
  // 5. 피카소 (Picasso) - 3개 대표작
  // ========================================
  
  'picasso-demoiselles': {
    name: '아비뇽의 처녀들',
    artist: 'picasso',
    prompt: ', Les Demoiselles dAvignon by Pablo Picasso: angular FRAGMENTED bodies into sharp geometric planes, African mask influence on faces, mask-like geometric facial features, apricot/brown/earth tones, primitive revolutionary energy, rough visible oil brushwork, CRITICAL: face must be geometrically divided NOT realistic',
    controlStrength: 0.50
  },
  
  'picasso-guernica': {
    name: '게르니카',
    artist: 'picasso',
    prompt: ', Guernica by Pablo Picasso: BLACK WHITE AND GREY ONLY no other colors, fragmented bodies in agony, screaming open mouths, torn limbs, war horror and chaos, jagged torn forms, rough visible brushwork, expression of PAIN and TERROR allowed (attractive rendering exception)',
    controlStrength: 0.50,
    attractiveException: true
  },
  
  'picasso-weepingwoman': {
    name: '우는 여인',
    artist: 'picasso',
    prompt: ', Weeping Woman by Pablo Picasso: ANGULAR GEOMETRIC TEARS like shattered glass, face fragmented into colored planes, YELLOW-GREEN-PURPLE bold color contrast, handkerchief pressed to face, multiple viewpoints on single face (nose from side + eyes from front), rough visible oil brushwork, expression of GRIEF allowed (attractive rendering exception)',
    controlStrength: 0.50,
    attractiveException: true
  },
  
  // ========================================
  // 6. 프리다 칼로 (Frida Kahlo) - 4개 대표작
  // ========================================
  
  'frida-parrots': {
    name: '나와 앵무새들',
    artist: 'frida',
    prompt: ', Me and My Parrots by Frida Kahlo: colorful PARROTS perched on shoulders, lush GREEN LEAVES tropical background, frontal direct gaze with intense eyes, Mexican flower hair decorations, detailed oil brushwork, warm intimate companion atmosphere, dignified confident expression',
    controlStrength: 0.55
  },
  
  'frida-brokencolumn': {
    name: '부러진 기둥',
    artist: 'frida',
    prompt: ', The Broken Column by Frida Kahlo: torso SPLIT OPEN revealing crumbling Ionic column as spine, NAILS piercing skin all over body, tears streaming down face, barren landscape background, medical corset straps, detailed oil brushwork, expression of PAIN allowed (attractive rendering exception), stoic dignity despite suffering',
    controlStrength: 0.55,
    attractiveException: true
  },
  
  'frida-thornnecklace': {
    name: '가시 목걸이와 벌새',
    artist: 'frida',
    prompt: ', Self-Portrait with Thorn Necklace and Hummingbird by Frida Kahlo: THORN NECKLACE piercing neck with blood drops, dead HUMMINGBIRD pendant, black monkey and cat behind shoulders, GREEN JUNGLE LEAVES background, frontal gaze with intense eyes, Mexican flower hair decorations, detailed oil brushwork, dignified stoic suffering',
    controlStrength: 0.55
  },
  
  'frida-monkeys': {
    name: '원숭이와 자화상',
    artist: 'frida',
    prompt: ', Self-Portrait with Monkeys by Frida Kahlo: MONKEYS embracing from behind, lush GREEN TROPICAL LEAVES filling background, frontal direct gaze with intense dark eyes, Mexican flower decorations in hair, warm intimate companion bond, detailed oil brushwork, tender protective atmosphere',
    controlStrength: 0.55
  },
  
  // ========================================
  // 7. 워홀 (Warhol) - 2개 대표작
  // ========================================
  
  'warhol-marilyn': {
    name: '마릴린 먼로',
    artist: 'warhol',
    prompt: ', Marilyn Monroe style by Andy Warhol: 2x2 FOUR-PANEL GRID mandatory with SAME PERSON repeated 4 times, DIFFERENT BOLD NEON COLOR each panel (hot pink/cyan/yellow/orange/turquoise/lime), silkscreen print effect with ink bleed imperfections, flat graphic high-contrast, glamorous iconic expression, DO NOT draw Marilyn Monroe herself - apply to subject only',
    controlStrength: 0.50,
    specialRule: '4-panel mandatory, NO drawing Marilyn Monroe'
  },
  
  'warhol-soup': {
    name: '캠벨 수프 캔',
    artist: 'warhol',
    prompt: ', Campbells Soup Cans style by Andy Warhol: commercial product art aesthetic, clean graphic outlines, flat color areas, red/white/gold can label colors, supermarket display repetition, pop art commercial design, silkscreen print flatness, for portrait photos recommend switching to Marilyn style',
    controlStrength: 0.50
  }
};

// ========================================
// 유틸리티 함수
// ========================================

/**
 * 사조 강화 프롬프트 가져오기
 * @param {string} artistKey - 화가/스타일 키
 * @returns {object|null} 강화 프롬프트 객체
 */
export function getMovementEnhancement(artistKey) {
  const normalized = artistKey.toLowerCase().trim();
  
  // 직접 매칭
  if (movementEnhancements[normalized]) {
    return movementEnhancements[normalized];
  }
  
  // 부분 매칭 (영문/한글)
  for (const [key, value] of Object.entries(movementEnhancements)) {
    if (normalized.includes(key) || 
        normalized.includes(value.name) ||
        key.includes(normalized)) {
      return value;
    }
  }
  
  return null;
}

/**
 * 거장 대표작 강화 프롬프트 가져오기
 * @param {string} workKey - 대표작 키 (예: 'vangogh-starrynight')
 * @returns {object|null} 강화 프롬프트 객체
 */
export function getMasterworkEnhancement(workKey) {
  const normalized = workKey.toLowerCase().trim().replace(/\s+/g, '-');
  
  if (masterworkEnhancements[normalized]) {
    return masterworkEnhancements[normalized];
  }
  
  return null;
}

/**
 * 거장의 사조 개인 프롬프트 + 대표작 프롬프트 결합
 * @param {string} artistKey - 거장 키 (예: 'vangogh')
 * @param {string} workKey - 대표작 키 (예: 'vangogh-starrynight')
 * @returns {object} 결합된 프롬프트 정보
 */
export function getCombinedMasterEnhancement(artistKey, workKey) {
  const movementPrompt = getMovementEnhancement(artistKey);
  const masterworkPrompt = getMasterworkEnhancement(workKey);
  
  // 대표작 프롬프트 우선
  if (masterworkPrompt) {
    return {
      prompt: (movementPrompt?.prompt || '') + masterworkPrompt.prompt,
      controlStrength: masterworkPrompt.controlStrength,
      attractiveException: masterworkPrompt.attractiveException || false,
      expressionRule: masterworkPrompt.expressionRule || movementPrompt?.expressionRule,
      avoidFor: masterworkPrompt.avoidFor || movementPrompt?.avoidFor,
      specialRule: masterworkPrompt.specialRule
    };
  }
  
  // 대표작 없으면 사조만
  if (movementPrompt) {
    return {
      prompt: movementPrompt.prompt,
      controlStrength: movementPrompt.controlStrength,
      attractiveException: false,
      expressionRule: movementPrompt.expressionRule,
      avoidFor: movementPrompt.avoidFor
    };
  }
  
  return null;
}

/**
 * 매력적 표현 예외 체크
 * @param {string} workKey - 대표작 키
 * @returns {boolean} 예외 여부
 */
export function isAttractiveException(workKey) {
  return CORE_RULES.attractiveExceptions.includes(workKey);
}

/**
 * 동양화 여부 체크
 * @param {string} artistKey - 화가/스타일 키
 * @returns {boolean} 동양화 여부
 */
export function isOrientalArt(artistKey) {
  const orientalKeys = ['minhwa', 'pungsokdo', 'jingyeong', 'shuimohua', 'gongbi', 'huaniaohua', 'ukiyoe'];
  const normalized = artistKey.toLowerCase().trim();
  return orientalKeys.some(key => normalized.includes(key));
}

/**
 * 동양화 텍스트 생성 (A가 생성 → F가 그림)
 * @param {string} artistKey - 화가/스타일 키
 * @param {string} photoType - 사진 유형 (portrait/landscape/still-life)
 * @returns {object|null} 텍스트 정보
 */
export function generateOrientalText(artistKey, photoType = 'portrait') {
  const enhancement = getMovementEnhancement(artistKey);
  if (!enhancement || !enhancement.textLang) return null;
  
  const textExamples = enhancement.textExamples || [];
  const selectedText = textExamples[Math.floor(Math.random() * textExamples.length)];
  
  const textStyle = CORE_RULES.orientalTextStyle[enhancement.textLang];
  
  return {
    text: selectedText,
    style: textStyle,
    lang: enhancement.textLang,
    promptAddition: `, include calligraphic text '${selectedText}' as ${textStyle}`
  };
}

/**
 * 서양화 텍스트 금지 규칙 가져오기
 * @returns {string} 텍스트 금지 프롬프트
 */
export function getWesternNoTextRule() {
  return CORE_RULES.westernNoText;
}

export default {
  CORE_RULES,
  movementEnhancements,
  masterworkEnhancements,
  getMovementEnhancement,
  getMasterworkEnhancement,
  getCombinedMasterEnhancement,
  isAttractiveException,
  isOrientalArt,
  generateOrientalText,
  getWesternNoTextRule
};
