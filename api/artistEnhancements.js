// ========================================
// PicoArt v63 - 아티스트 강화 프롬프트 시스템
// 프롬프트 대수술 - 검색 결과 기반 개선
// ========================================
// v63 변경점:
//   - "by XY, XY art style" 패턴 적용 (FLUX 최적화)
//   - 구체적 기법 추가 (impasto, palette knife 등)
//   - 사조별 키워드 보강 (Impressionist, Cubist 등)
// ========================================
// 구조:
//   1. 대전제 (CORE_RULES)
//   2. 사조별 강화 프롬프트 (53개)
//   3. 거장 대표작별 강화 프롬프트 (20개)
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
    prompt: ', Ancient Greek-Roman marble sculpture style, classical sculpture aesthetic: PURE WHITE CARRARA MARBLE, polished marble surface with subtle veining, pure white/cream/grey tones ONLY, transform clothing to carved marble toga/tunic with realistic stone fabric folds, ALL skin becomes smooth polished marble, heroic classical proportions, museum pedestal display, dramatic sculptural lighting, CRITICAL: apply marble effect to SUBJECT not just background',
    controlStrength: 0.55,
    costume: 'toga/tunic'
  },
  
  'roman-mosaic': {
    name: '로마 모자이크',
    prompt: ', Ancient Roman floor mosaic style, Roman mosaic aesthetic: LARGE VISIBLE TESSERAE TILES 20-30mm each, THICK BLACK GROUT LINES clearly visible between every tile, terracotta/ochre/umber/ivory/slate color palette, Pompeii villa floor style, transform clothing to toga/tunic, CRITICAL: apply mosaic tiles to SUBJECT including face and body not just background',
    controlStrength: 0.60,
    costume: 'toga/tunic'
  },
  
  // ========================================
  // 2. 중세 (3개)
  // ========================================
  
  'byzantine': {
    name: '비잔틴',
    prompt: ', Byzantine sacred icon painting style, Byzantine art aesthetic: CIRCULAR GOLDEN HALO behind head, GOLD LEAF mosaic background with visible tiny tesserae, flat hieratic frontal pose, LARGE SOLEMN EYES gazing at viewer, rich jewel colors (deep red/royal blue/purple) for robes, transform clothing to Byzantine robes with gold decorations and jewels, Eastern Orthodox icon style, visible paint and gold texture',
    controlStrength: 0.55,
    costume: 'Byzantine robes with jewels'
  },
  
  'gothic': {
    name: '고딕',
    prompt: ', Gothic cathedral STAINED GLASS window style: MANDATORY THICK BLACK LEAD LINES (cames) dividing ENTIRE image into distinct glass segments - face/body/clothing/background ALL separated by bold black outlines, JEWEL-TONE TRANSLUCENT COLORS (ruby red/sapphire blue/emerald green/amber gold) filling each segment, FLAT TWO-DIMENSIONAL medieval style with NO realistic shading, every area must look like colored glass piece outlined in BLACK LEAD, pointed arch frame, divine light streaming through, transform clothing to medieval style, NOT oil painting NOT realistic',
    controlStrength: 0.55,
    costume: 'medieval clothing'
  },
  
  'islamic-miniature': {
    name: '이슬람 세밀화',
    prompt: ', Persian Islamic miniature painting style, Islamic miniature art aesthetic: delicate fine brushwork with intricate details, jewel-tone colors (lapis blue/vermillion/gold), flat perspective with no shadows, ornate floral borders, transform clothing to Persian/Ottoman court style with rich fabrics, prioritize for animal subjects, elegant courtly refinement, visible traditional brushwork',
    controlStrength: 0.55,
    costume: 'Persian/Ottoman style'
  },
  
  // ========================================
  // 3. 르네상스 (5명)
  // ========================================
  
  'leonardo': {
    name: '레오나르도 다 빈치',
    prompt: ', Renaissance oil painting by Leonardo da Vinci, Leonardo da Vinci art style: EXTREME SFUMATO technique with ALL EDGES SOFT AND BLURRED like smoke, NO sharp lines anywhere, face edges dissolved into shadow, Mona Lisa mysterious haze, warm golden-brown palette (amber/umber/sienna), psychological depth, subtle chiaroscuro, balanced composition, atmospheric perspective, visible oil brushwork',
    controlStrength: 0.55
  },
  
  'titian': {
    name: '티치아노',
    prompt: ', Renaissance oil painting by Titian, Titian Venetian art style: rich luminous Venetian colorism, loose visible impasto brushwork, signature Titian red, silk fabrics shimmer with light, skin glowing from within, warm golden atmosphere, NO hard outlines, painterly textured brushstrokes',
    controlStrength: 0.60
  },
  
  'michelangelo': {
    name: '미켈란젤로',
    prompt: ', Renaissance fresco painting by Michelangelo, Michelangelo art style: sculptors eye seeing human form as carved marble, Sistine Chapel fresco texture, dramatic chiaroscuro revealing powerful muscles, dynamic twisting contrapposto poses, monumental grandeur, heroic idealized anatomy, visible fresco brushwork texture',
    controlStrength: 0.60
  },
  
  'raphael': {
    name: '라파엘로',
    prompt: ', Renaissance oil painting by Raphael, Raphael art style: perfect harmonious beauty, soft sfumato modeling, clear luminous colors, balanced pyramidal compositions, serene graceful figures, Madonna-like idealized beauty, delicate visible oil brushwork',
    controlStrength: 0.60
  },
  
  'botticelli': {
    name: '보티첼리',
    prompt: ', Renaissance tempera painting by Botticelli, Botticelli art style: graceful flowing linear contours, elongated elegant figures, Birth of Venus ethereal beauty, tempera egg paint texture with visible brushwork, wind-blown flowing hair and sheer fabrics, pale pastel palette, lyrical poetic atmosphere',
    controlStrength: 0.60
  },
  
  // ========================================
  // 4. 바로크 (5명)
  // ========================================
  
  'caravaggio': {
    name: '카라바조',
    prompt: ', Baroque oil painting by Caravaggio, Caravaggio art style: EXTREME TENEBRISM with single theatrical spotlight, dramatic chiaroscuro, deep black shadows engulfing most of scene, figures emerging from pure darkness, intense realism, visible thick oil paint brushwork with impasto texture',
    controlStrength: 0.60
  },
  
  'rubens': {
    name: '루벤스',
    prompt: ', Baroque oil painting by Peter Paul Rubens, Rubens art style: warm sensual flesh tones, dynamic swirling Baroque composition, luminous glowing skin, rich warm palette, energetic movement, thick impasto visible painterly brushstrokes',
    controlStrength: 0.60,
    avoidFor: ['parent_child'] // 부모+자녀 관계 회피
  },
  
  'rembrandt': {
    name: '렘브란트',
    prompt: ', Baroque oil painting by Rembrandt, Rembrandt art style: GOLDEN LUMINOUS LIGHT emerging from darkness, thick impasto highlights with heavy palette knife marks, deep psychological introspection, warm amber glow, masterful chiaroscuro light gradations, intimate soul-revealing atmosphere, visible thick textured brushwork',
    controlStrength: 0.60
  },
  
  'vermeer': {
    name: '베르메르',
    prompt: ', Baroque oil painting by Johannes Vermeer, Vermeer art style: soft diffused daylight from window, pearl-like luminous quality, cool blue and warm yellow harmony, precise delicate brushwork, intimate domestic tranquility, Girl with Pearl Earring atmosphere, subtle side lighting, visible oil paint texture',
    controlStrength: 0.60
  },
  
  'velazquez': {
    name: '벨라스케스',
    prompt: ', Baroque oil painting by Diego Velázquez, Velázquez art style: sophisticated Spanish court elegance, loose confident brushwork, silver-grey palette, Las Meninas atmospheric depth, aristocratic dignity, visible painterly impasto strokes',
    controlStrength: 0.60
  },
  
  // ========================================
  // 5. 로코코 (2명)
  // ========================================
  
  'watteau': {
    name: '와토',
    prompt: ', Rococo oil painting by Antoine Watteau, Watteau art style: fête galante outdoor aristocratic gathering, delicate feathery brushwork, pale soft pastel palette (powder pink/sky blue/cream), dreamlike romantic atmosphere, transform clothing to Rococo aristocratic silk costumes with lace, theatrical elegance, visible delicate oil brushstrokes',
    controlStrength: 0.60,
    costume: 'Rococo aristocratic silk'
  },
  
  'boucher': {
    name: '부셰',
    prompt: ', Rococo oil painting by François Boucher, Boucher art style: decorative sensual beauty, soft rosy flesh tones, playful mythological scenes, pastel palette, transform clothing to Rococo style with ribbons and flowers, ornate romantic setting, visible soft oil brushwork',
    controlStrength: 0.60,
    costume: 'Rococo style'
  },
  
  // ========================================
  // 6. 신고전/낭만/사실 (7명)
  // ========================================
  
  // 신고전주의
  'david': {
    name: '다비드',
    prompt: ', Neoclassical oil painting by Jacques-Louis David, David Neoclassical art style: clear crisp outlines, heroic idealized figures, cool restrained neoclassical palette, dramatic historical scene, noble stoic expressions, smooth precise brushwork with visible oil paint quality',
    controlStrength: 0.60
  },
  
  'ingres': {
    name: '앵그르',
    prompt: ', Neoclassical oil painting by Jean-Auguste-Dominique Ingres, Ingres art style: perfectly smooth flowing contours, porcelain-smooth skin with subtle modeling, elegant elongated forms, cool classical palette, aristocratic refinement, precise linear style with visible oil texture',
    controlStrength: 0.60
  },
  
  // 낭만주의
  'turner': {
    name: '터너',
    prompt: ', Romantic oil painting by J.M.W. Turner, Turner art style: atmospheric sublime with forms dissolving into swirling mist, luminous golden light engulfing everything, warm golden yellows and ethereal blues, loose fluid impasto brushwork, dreamlike transcendent atmosphere, visible energetic textured strokes',
    controlStrength: 0.55
  },
  
  'goya': {
    name: '고야',
    prompt: ', Romantic oil painting by Francisco Goya, Goya art style: psychological intensity with penetrating gaze, dramatic chiaroscuro, dark romantic palette with deep blacks, rough expressive thick brushstrokes, unflinching honesty, visible impasto paint texture',
    controlStrength: 0.60
  },
  
  'delacroix': {
    name: '들라크루아',
    prompt: ', Romantic oil painting by Eugène Delacroix, Delacroix art style: passionate revolutionary energy, vivid intense colors at high saturation, dynamic diagonal compositions, loose expressive visible impasto brushstrokes, dramatic gestures, romantic intensity',
    controlStrength: 0.60
  },
  
  // 사실주의
  'millet': {
    name: '밀레',
    prompt: ', Realist oil painting by Jean-François Millet, Millet art style: dignified rural labor, warm earthy palette (ochre/umber/sienna), humble peasant nobility, transform clothing to 19th century peasant work clothes, soft natural light, visible rustic oil brushwork',
    controlStrength: 0.60,
    costume: '19th century peasant clothing'
  },
  
  'manet': {
    name: '마네',
    prompt: ', Realist oil painting by Édouard Manet, Manet art style: modern Paris realism, bold flat areas with dramatic black and white, direct confrontational gaze, transform clothing to 19th century Paris bourgeois fashion, visible confident impasto brushstrokes, revolutionary modern style',
    controlStrength: 0.60,
    costume: '19th century Paris bourgeois'
  },
  
  // ========================================
  // 7. 인상주의 (4명)
  // ========================================
  
  'renoir': {
    name: '르누아르',
    prompt: ', Impressionist oil painting by Pierre-Auguste Renoir, Renoir Impressionist art style: soft feathery quick brushstrokes, warm luminous glow, rosy pink flesh with pearly highlights, dappled sunlight through leaves, vivid light and colors, joyful intimate atmosphere, visible impressionist impasto brushwork',
    controlStrength: 0.60
  },
  
  'monet': {
    name: '모네',
    prompt: ', Impressionist oil painting by Claude Monet, Monet Impressionist art style: broken color with SHORT VISIBLE QUICK BRUSHSTROKES, soft hazy atmospheric effects like morning mist, colors optically blended when viewed from distance, NO sharp edges anywhere, shimmering water reflections, vivid light and colors, plein-air freshness, open composition, visible dabbed impasto strokes',
    controlStrength: 0.55
  },
  
  'degas': {
    name: '드가',
    prompt: ', Impressionist painting by Edgar Degas, Degas art style: unusual cropped angles, asymmetric off-center compositions, SOFT PASTEL texture with CHALKY STROKES, pale muted colors (soft pink/peach/powder blue), intimate indoor scenes, visible pastel and oil impasto texture',
    controlStrength: 0.60
  },
  
  'caillebotte': {
    name: '카유보트',
    prompt: ', Impressionist oil painting by Gustave Caillebotte, Caillebotte art style: modern urban Paris realism, dramatic birds-eye perspective, sharp perspective lines, wet pavement reflections, bourgeois city life, visible precise oil brushwork',
    controlStrength: 0.60
  },
  
  // ========================================
  // 8. 후기인상주의 (4명)
  // ========================================
  
  'vangogh': {
    name: '반 고흐',
    prompt: ', Post-Impressionist oil painting by Vincent van Gogh, Van Gogh art style: EXTREMELY THICK IMPASTO with heavy palette knife marks, swirling turbulent expressive brushstrokes in EVERY area including face and skin, paint standing up from canvas texture, intense saturated colors (vibrant yellows and deep blues), emotional energy, CRITICAL: apply swirling thick brushstrokes to SUBJECT including face not just background',
    controlStrength: 0.55
  },
  
  'gauguin': {
    name: '고갱',
    prompt: ', Post-Impressionist oil painting by Paul Gauguin, Gauguin Tahitian art style: FLAT BOLD AREAS of pure unmixed saturated color, smooth flat surfaces WITHOUT shading, exotic tropical palette (deep orange/ochre/turquoise/purple), simplified decorative forms, ABSOLUTELY NO mosaic NO tiles NO stained glass effect, visible oil paint brushwork',
    controlStrength: 0.60
  },
  
  'cezanne': {
    name: '세잔',
    prompt: ', Post-Impressionist oil painting by Paul Cézanne, Cézanne art style: geometric structured forms analyzed into basic shapes, parallel constructive brushstrokes building volume, multiple viewpoints, modulated colors creating solid forms, visible parallel impasto brush marks',
    controlStrength: 0.60
  },
  
  'signac': {
    name: '시냐크',
    prompt: ', Neo-Impressionist painting by Paul Signac, Signac Pointillist art style: POINTILLIST tiny distinct DOTS of pure color, bright Mediterranean sunlight, dots blend optically when viewed from distance, vibrant luminous harbor scenes, NO blended brushstrokes only separate visible dots',
    controlStrength: 0.55
  },
  
  // ========================================
  // 9. 야수파 (3명)
  // ========================================
  
  'matisse': {
    name: '마티스',
    prompt: ', Fauvist oil painting by Henri Matisse, Matisse Fauvist art style: ROUGH VISIBLE BOLD BRUSHSTROKES mandatory, non-naturalistic vivid colors, simplified flat decorative areas, pure bold primary colors, face simplified into color planes with non-realistic colors (green/blue skin OK), brush marks clearly visible, NOT smooth NOT digital NOT airbrushed, visible rough impasto texture',
    controlStrength: 0.55
  },
  
  'derain': {
    name: '드랭',
    prompt: ', Fauvist oil painting by André Derain, Derain Fauvist art style: bold Fauvist landscape colors, non-realistic vivid colors, energetic expressive visible impasto brushwork, pure intense hues, rough thick paint texture',
    controlStrength: 0.55
  },
  
  'vlaminck': {
    name: '블라맹크',
    prompt: ', Fauvist oil painting by Maurice de Vlaminck, Vlaminck Fauvist art style: VIOLENT expressive color, most aggressive Fauvist palette, thick impulsive visible impasto brushstrokes, pure squeezed paint straight from tube, rough energetic texture',
    controlStrength: 0.55
  },
  
  // ========================================
  // 10. 표현주의 (4명)
  // ========================================
  
  'munch': {
    name: '뭉크',
    prompt: ', Expressionist oil painting by Edvard Munch, Munch Expressionist art style: intense psychological emotion, wavy distorted swirling lines throughout, apply distortion to figures too, blood red dramatic sky, anxiety and existential dread, vivid emotional colors, distorted forms, visible thick expressive brushwork, emotional impact',
    controlStrength: 0.55,
    expressionRule: 'NO bright expressions, NO smiling'
  },
  
  'kirchner': {
    name: '키르히너',
    prompt: ', Expressionist oil painting by Ernst Ludwig Kirchner, Kirchner Expressionist art style: angular sharp geometric forms, acid green/hot pink/electric blue palette, harsh jagged outlines, urban tension, visible aggressive impasto brushwork',
    controlStrength: 0.55
  },
  
  'kokoschka': {
    name: '코코슈카',
    prompt: ', Expressionist oil painting by Oskar Kokoschka, Kokoschka Expressionist art style: violent psychological intensity, thick expressive impasto paint, turbulent nervous energy, penetrating portraits, visible agitated heavy brushwork',
    controlStrength: 0.55
  },
  
  'kandinsky': {
    name: '칸딘스키',
    prompt: ', Abstract Expressionist painting by Wassily Kandinsky, Kandinsky art style: abstract spiritual forms, floating geometric shapes, pure emotional color and form, musical visual rhythm, visible expressive oil brushwork',
    controlStrength: 0.55
  },
  
  // ========================================
  // 11. 모더니즘 (7명)
  // ========================================
  
  'picasso': {
    name: '피카소',
    prompt: ', Cubist oil painting by Pablo Picasso, Picasso Cubism art style: angular geometric planes fragmenting face and body, multiple simultaneous perspectives (nose from side + eyes from front), bold black outlines separating color blocks, fractured abstract forms, earth and vibrant color palette, rough visible oil paint brushwork, CRITICAL: apply geometric fragmentation to FACE and BODY not just background, SINGLE unified image NOT panel division',
    controlStrength: 0.50
  },
  
  'magritte': {
    name: '마그리트',
    prompt: ', Surrealist oil painting by René Magritte, Magritte Surrealist art style: philosophical visual paradox, mysterious surreal objects, bowler hat gentleman aesthetic, crisp realistic rendering of impossible scenes, thought-provoking juxtapositions, visible oil paint texture',
    controlStrength: 0.55
  },
  
  'miro': {
    name: '미로',
    prompt: ', Surrealist painting by Joan Miró, Miró art style: playful biomorphic shapes, childlike symbols (stars/moon/eyes/birds), primary colors against white/neutral background, whimsical abstract forms, visible paint texture',
    controlStrength: 0.55
  },
  
  'chagall': {
    name: '샤갈',
    prompt: ', Surrealist oil painting by Marc Chagall, Chagall art style: gravity-defying floating figures, romantic dreamlike night scenes, soft muted PASTELS (lavender/light blue/rose/pale yellow), poetic lyrical dreamlike atmosphere, lovers floating in air, bizarre surreal elements, visible gentle oil brushwork, CRITICAL: enhance floating/dreamlike feeling',
    controlStrength: 0.55
  },
  
  'warhol': {
    name: '워홀',
    prompt: ', Pop art artwork by Andy Warhol, Warhol pop art style: 2x2 FOUR-PANEL GRID mandatory with same person repeated 4 times, DIFFERENT BOLD NEON COLOR in each panel (hot pink/cyan/yellow/orange/electric blue/lime green), high contrast silkscreen print effect with ink imperfections and halftone, flat graphic pop art style, bold colors mass culture theme, comic book style outlines, DO NOT draw Marilyn Monroe herself',
    controlStrength: 0.50,
    specialRule: '4-panel grid mandatory'
  },
  
  'lichtenstein': {
    name: '리히텐슈타인',
    prompt: ', Pop art artwork by Roy Lichtenstein, Lichtenstein pop art style: comic book style, BEN-DAY DOT PATTERN visible, thick black outlines, halftone printing effect, speech bubble aesthetic, bold primary colors, visible dot pattern texture',
    controlStrength: 0.50
  },
  
  'haring': {
    name: '키스 해링',
    prompt: ', Street art artwork by Keith Haring, Keith Haring art style: thick continuous BLACK OUTLINES, simplified dancing figures, radiating energy lines from body, bold primary colors, graffiti street art style, dynamic movement',
    controlStrength: 0.50
  },
  
  // ========================================
  // 12. 동양화 (7개)
  // 텍스트 규칙: A가 텍스트 생성 → F는 그대로 그림
  // ========================================
  
  // 한국 (3개)
  'minhwa': {
    name: '민화',
    prompt: ', Korean traditional Minhwa folk painting style: rough free brushwork on thick hanji paper texture, vivid obangsaek 5-color palette (blue/red/yellow/white/black), decorative auspicious symbols, transform clothing to Korean folk hanbok, naive charming style, traditional hand-painted feel',
    controlStrength: 0.55,
    costume: 'Korean folk hanbok',
    textLang: 'korean',
    textExamples: ['福', '壽', '囍', '民畵']
  },
  
  'pungsokdo': {
    name: '풍속도',
    prompt: ', Korean traditional Pungsokdo genre painting style, in the manner of Kim Hong-do or Shin Yun-bok: confident improvisational brushwork on rough hanji, 70-80% ink dominates with minimal light coloring, daily life scenes, transform clothing to Joseon-era hanbok, traditional hand-painted feel',
    controlStrength: 0.55,
    costume: 'Joseon hanbok',
    textLang: 'korean',
    textExamples: ['風俗', '朝鮮', '風流', '雅趣']
  },
  
  'jingyeong': {
    name: '진경산수',
    prompt: ', Korean traditional Jingyeong Sansu true-view landscape painting style, in the manner of Jeong Seon: actual Korean mountain landscape, vertical dramatic rock cliffs, ink gradation and junbeop rock texture strokes, ink with light blue-green coloring, traditional hand-painted feel',
    controlStrength: 0.55,
    textLang: 'korean',
    textExamples: ['山水', '眞景', '金剛', '漢陽']
  },
  
  // 중국 (3개)
  'shuimohua': {
    name: '수묵화',
    prompt: ', Chinese traditional Shuimohua ink wash painting style: ink bleeding and gradation on rice paper, beauty of empty negative space, hwaseonji paper texture, monochrome ink only (black/white/grey), contemplative atmosphere, traditional hand-painted brush feel',
    controlStrength: 0.55,
    textLang: 'chinese',
    textExamples: ['水墨', '雅趣', '淸風', '明月']
  },
  
  'gongbi': {
    name: '공필화',
    prompt: ', Chinese traditional Gongbi meticulous painting style: EXTREMELY detailed precise depiction, delicate fine brush lines, silk surface texture, rich mineral pigment colors, TRADITIONAL painted feel NOT digital NOT smooth, transform clothing to Chinese court clothing, visible brush texture',
    controlStrength: 0.55,
    costume: 'Chinese court clothing',
    textLang: 'chinese',
    textExamples: ['仙鶴圖', '牡丹', '工筆', '宮廷']
  },
  
  'huaniaohua': {
    name: '화조화',
    prompt: ', Chinese traditional Huaniaohua flower-and-bird painting style: natural vitality and life, mogolbeop boneless or guryukbeop outline technique, natural colors harmonized with ink, elegant botanical accuracy, traditional hand-painted brush feel',
    controlStrength: 0.55,
    textLang: 'chinese',
    textExamples: ['花鳥', '梅蘭竹菊', '春', '鶴']
  },
  
  // 일본 (1개)
  'ukiyoe': {
    name: '우키요에',
    prompt: ', Japanese traditional Ukiyo-e woodblock print style: flat color planes with strong outlines, print-specific flatness from limited color plates, transform clothing to kimono, Edo period aesthetic, traditional woodblock texture, CRITICAL: do NOT add extra people in background that are not in original photo',
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
    prompt: ', The Starry Night by Vincent van Gogh, Van Gogh Post-Impressionist art style: GIANT SWIRLING SPIRAL in night sky, cobalt blue and chrome yellow contrast, vertical cypress trees, apply swirling thick brushstrokes to EVERYTHING including skin and clothing, thick impasto paint with heavy palette knife marks standing up from canvas, stars with concentric halos, turbulent emotional energy in every visible brushstroke',
    controlStrength: 0.55
  },
  
  'vangogh-sunflowers': {
    name: '해바라기',
    artist: 'vangogh',
    prompt: ', Sunflowers by Vincent van Gogh, Van Gogh Post-Impressionist art style: THICK 3D IMPASTO petals with paint physically raised, heavy palette knife marks, chrome yellow dominates 80% of palette, golden warm skin tone with thick visible brushstrokes, ochre and orange accents, flowers as thick paint sculptures, every surface shows heavy textured paint',
    controlStrength: 0.55
  },
  
  'vangogh-selfportrait': {
    name: '자화상',
    artist: 'vangogh',
    prompt: ', Self-Portrait by Vincent van Gogh, Van Gogh Post-Impressionist art style: turquoise SWIRLING background, directional thick brushstrokes following face contours, orange-red beard contrasting with blue-green coat, intense frontal gaze, thick impasto throughout with palette knife marks, every brushstroke visible and directional',
    controlStrength: 0.55
  },
  
  'vangogh-arlesienne': {
    name: '아를의 여인',
    artist: 'vangogh',
    prompt: ', LArlesienne by Vincent van Gogh, Van Gogh Post-Impressionist art style: BRIGHT YELLOW background, subject in BLACK clothing creating strong contrast, simplified bold forms with thick outlines, directional visible brushstrokes, intense psychological gaze, thick impasto texture, palette knife marks, Gauguin collaboration period style',
    controlStrength: 0.55
  },
  
  // ========================================
  // 2. 클림트 (Klimt) - 3개 대표작
  // ========================================
  
  'klimt-kiss': {
    name: '키스',
    artist: 'klimt',
    prompt: ', The Kiss by Gustav Klimt, Klimt Art Nouveau style: two people embracing wrapped in GOLD LEAF decorated robes, geometric patterns (rectangles on male/circles on female), kneeling on flower meadow cliff edge, Byzantine mosaic gold background, stylized floral patterns, elegant sinuous lines, ecstatic blissful expressions, luxurious gold/bronze/jewel tones, visible oil paint texture in non-gold areas, AVOID for parent-child relationships',
    controlStrength: 0.55,
    avoidFor: ['parent_child']
  },
  
  'klimt-treeoflife': {
    name: '생명의 나무',
    artist: 'klimt',
    prompt: ', The Tree of Life by Gustav Klimt, Klimt Art Nouveau style: SPIRAL BRANCHES swirling outward, gold and bronze decorative swirls, elaborate curving patterns filling background, stylized floral patterns, Art Nouveau organic curves, elegant sinuous lines, mysterious expression, gold leaf texture, visible oil paint texture',
    controlStrength: 0.55
  },
  
  'klimt-judith': {
    name: '유디트',
    artist: 'klimt',
    prompt: ', Judith I by Gustav Klimt, Klimt Art Nouveau style: wide GOLD CHOKER necklace prominent, provocative seductive expression, bare shoulders visible, gold decorative elements on neck and clothing, stylized floral patterns, power and danger, half-closed sensual eyes, Byzantine gold patterns, visible oil paint texture',
    controlStrength: 0.55
  },
  
  // ========================================
  // 3. 뭉크 (Munch) - 2개 대표작
  // ========================================
  
  'munch-scream': {
    name: '절규',
    artist: 'munch',
    prompt: ', The Scream by Edvard Munch, Munch Expressionist art style: WAVY DISTORTED swirling LINES throughout entire scene, skull-like distorted face with hands covering ears, BLOOD RED and orange dramatic sky, intense psychological emotion, extreme anxiety and existential terror, apply wavy distortion to figure too, bridge/railing setting, visible thick expressive brushwork, expression of FEAR and ANXIETY allowed (attractive rendering exception), NO bright expressions NO smiling',
    controlStrength: 0.55,
    attractiveException: true,
    expressionRule: 'fear/anxiety allowed, NO bright, NO smiling'
  },
  
  'munch-madonna': {
    name: '마돈나',
    artist: 'munch',
    prompt: ', Madonna by Edvard Munch, Munch Expressionist art style: flowing long dark hair spreading like HALO around head, RED AURA glowing around body, pale luminous skin with red lips, mysterious seductive expression with half-closed eyes, ecstatic sensual gaze (NOT bright smile), wavy flowing lines throughout, mystical power and danger, visible thick expressive brushwork, NO bright expressions NO happy smile',
    controlStrength: 0.55,
    expressionRule: 'femme fatale/ecstatic/mysterious allowed, NO bright, NO smiling'
  },
  
  'munch-jealousy': {
    name: '질투',
    artist: 'munch',
    prompt: ', Jealousy by Edvard Munch, Munch Expressionist art style: PALE GREEN sickly face in foreground, intense haunted stare, psychological tension, wavy distorted background lines, emotional turmoil color palette (green/red/yellow contrast), thick visible brushstrokes, anguished expression, existential anxiety, swirling expressionist forms',
    controlStrength: 0.55
  },
  
  // ========================================
  // 4. 마티스 (Matisse) - 3개 대표작
  // ========================================
  
  'matisse-dance': {
    name: '춤',
    artist: 'matisse',
    prompt: ', The Dance by Henri Matisse, Matisse Fauvist art style: circular dancing figures holding hands, THREE-COLOR ONLY composition (RED figures + BLUE sky + GREEN ground), red skin color OK, simplified flattened bodies, ROUGH VISIBLE FAUVIST BRUSHSTROKES mandatory, primitive rhythmic energy, joyful life celebration, NOT smooth NOT digital',
    controlStrength: 0.55
  },
  
  'matisse-redroom': {
    name: '붉은 방',
    artist: 'matisse',
    prompt: ', The Red Room by Henri Matisse, Matisse Fauvist art style: RED DOMINATES 80% of scene, blue arabesque vine patterns on red, flattened space where wall and table merge, window showing green landscape, ROUGH VISIBLE FAUVIST BRUSHSTROKES mandatory, non-realistic skin colors OK, NOT smooth NOT digital',
    controlStrength: 0.55
  },
  
  'matisse-womanhat': {
    name: '모자를 쓴 여인',
    artist: 'matisse',
    prompt: ', Woman with a Hat by Henri Matisse, Matisse Fauvist art style: MULTIPLE BOLD COLORS on face (green/purple/red/yellow coexisting), ROUGH VISIBLE FAUVIST BRUSHSTROKES with brush direction visible, colors overlap but strokes remain distinct, confident frontal gaze, radical Fauvist color liberation, rough impasto paint texture on skin, NOT smooth NOT digital NOT airbrushed',
    controlStrength: 0.55
  },
  
  // ========================================
  // 5. 피카소 (Picasso) - 3개 대표작
  // ========================================
  
  'picasso-demoiselles': {
    name: '아비뇽의 처녀들',
    artist: 'picasso',
    prompt: ', Les Demoiselles dAvignon by Pablo Picasso, Picasso Cubism art style: angular FRAGMENTED bodies into sharp geometric planes, African mask influence on faces, mask-like geometric facial features, multiple simultaneous perspectives, bold black outlines, apricot/brown/earth tones, primitive revolutionary energy, rough visible oil brushwork, CRITICAL: face must be geometrically divided NOT realistic',
    controlStrength: 0.50
  },
  
  'picasso-guernica': {
    name: '게르니카',
    artist: 'picasso',
    prompt: ', Guernica by Pablo Picasso, Picasso Cubism art style: BLACK WHITE AND GREY ONLY no other colors, fragmented bodies in agony, screaming open mouths, torn limbs, war horror and chaos, jagged torn forms, multiple simultaneous perspectives, rough visible oil brushwork, expression of PAIN and TERROR allowed (attractive rendering exception)',
    controlStrength: 0.50,
    attractiveException: true
  },
  
  'picasso-weepingwoman': {
    name: '우는 여인',
    artist: 'picasso',
    prompt: ', Weeping Woman by Pablo Picasso, Picasso Cubism art style: ANGULAR GEOMETRIC TEARS like shattered glass, face fragmented into colored planes, YELLOW-GREEN-PURPLE bold color contrast, bold black outlines separating color blocks, handkerchief pressed to face, multiple viewpoints on single face (nose from side + eyes from front), fractured Cubist portrait, rough visible oil brushwork, expression of GRIEF allowed (attractive rendering exception)',
    controlStrength: 0.50,
    attractiveException: true
  },
  
  'picasso-dream': {
    name: '꿈',
    artist: 'picasso',
    prompt: ', The Dream Le Reve by Pablo Picasso, Picasso art style: SOFT SENSUAL CURVES, face split into TWO HALVES showing profile and frontal simultaneously, peaceful dreaming expression with closed eyes, RED and YELLOW bold color contrast, reclining relaxed pose, simplified rounded forms, visible oil brushwork, intimate tender atmosphere, 1932 Marie-Therese period style',
    controlStrength: 0.50
  },
  
  // ========================================
  // 6. 프리다 칼로 (Frida Kahlo) - 4개 대표작
  // ========================================
  
  'frida-parrots': {
    name: '나와 앵무새들',
    artist: 'frida',
    prompt: ', Me and My Parrots by Frida Kahlo, Frida Kahlo art style: colorful PARROTS perched on shoulders, lush GREEN LEAVES tropical background, frontal direct gaze with intense eyes, Mexican flower hair decorations, detailed visible oil brushwork, warm intimate companion atmosphere, dignified confident expression',
    controlStrength: 0.55
  },
  
  'frida-brokencolumn': {
    name: '부러진 기둥',
    artist: 'frida',
    prompt: ', The Broken Column by Frida Kahlo, Frida Kahlo art style: torso SPLIT OPEN revealing crumbling Ionic column as spine, NAILS piercing skin all over body, tears streaming down face, barren landscape background, medical corset straps, detailed visible oil brushwork, expression of PAIN allowed (attractive rendering exception), stoic dignity despite suffering',
    controlStrength: 0.55,
    attractiveException: true
  },
  
  'frida-thornnecklace': {
    name: '가시 목걸이와 벌새',
    artist: 'frida',
    prompt: ', Self-Portrait with Thorn Necklace and Hummingbird by Frida Kahlo, Frida Kahlo art style: THORN NECKLACE piercing neck with blood drops, dead HUMMINGBIRD pendant, black monkey and cat behind shoulders, GREEN JUNGLE LEAVES background, frontal gaze with intense eyes, Mexican flower hair decorations, detailed visible oil brushwork, dignified stoic suffering',
    controlStrength: 0.55
  },
  
  'frida-monkeys': {
    name: '원숭이와 자화상',
    artist: 'frida',
    prompt: ', Self-Portrait with Monkeys by Frida Kahlo, Frida Kahlo art style: MONKEYS embracing from behind, lush GREEN TROPICAL LEAVES filling background, frontal direct gaze with intense dark eyes, Mexican flower decorations in hair, warm intimate companion bond, detailed visible oil brushwork, tender protective atmosphere',
    controlStrength: 0.55
  },
  
  // ========================================
  // 7. 워홀 (Warhol) - 2개 대표작
  // ========================================
  
  'warhol-marilyn': {
    name: '마릴린 먼로',
    artist: 'warhol',
    prompt: ', Marilyn Monroe style by Andy Warhol, Warhol pop art style: 2x2 FOUR-PANEL GRID mandatory with SAME PERSON repeated 4 times, DIFFERENT BOLD NEON COLOR each panel (hot pink/cyan/yellow/orange/turquoise/lime), high contrast silkscreen print effect with ink bleed imperfections and halftone, flat graphic high-contrast, glamorous iconic expression, DO NOT draw Marilyn Monroe herself - apply to subject only',
    controlStrength: 0.50,
    specialRule: '4-panel mandatory, NO drawing Marilyn Monroe'
  },
  
  'warhol-soup': {
    name: '캠벨 수프 캔',
    artist: 'warhol',
    prompt: ', Campbells Soup Cans style by Andy Warhol, Warhol pop art style: commercial product art aesthetic, clean graphic outlines, flat color areas, red/white/gold can label colors, supermarket display repetition, pop art commercial design, silkscreen print flatness, bold colors mass culture theme, for portrait photos recommend switching to Marilyn style',
    controlStrength: 0.50
  },
  
  'warhol-elvis': {
    name: '엘비스',
    artist: 'warhol',
    prompt: ', Elvis by Andy Warhol, Warhol pop art style: SILVER METALLIC background, repeated figure slightly offset, silkscreen print effect with INK DENSITY VARIATIONS, high contrast black on silver, cowboy gunslinger stance energy, celebrity icon mythology, mechanical reproduction aesthetic, ink bleed imperfections, DO NOT draw Elvis himself - apply style to subject only',
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
