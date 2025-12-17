// ========================================
// 원클릭 2차 교육자료 매칭 유틸리티
// v51 - 2025-12-18 (새로 작성)
// ========================================
//
// 목적: API 응답값을 교육자료 키로 변환
// 
// API에서 오는 값:
//   - aiSelectedArtist: "Claude Monet", "Vincent van Gogh", "반 고흐" 등
//   - selected_work: "The Starry Night", "Water Lilies" 등 (거장만)
//   - category: "movements" | "masters" | "oriental"
//
// 교육자료 키:
//   - 거장: "vangogh-starrynight", "klimt-kiss" 등
//   - 미술사조: "monet", "gogh", "botticelli" 등  
//   - 동양화: "korean-minhwa", "chinese-gongbi" 등
// ========================================

// ========== 거장 (Masters) 매칭 ==========
// selected_work → 교육자료 키
const MASTERS_WORK_MAP = {
  // 반 고흐 (3작품)
  'The Starry Night': 'vangogh-starrynight',
  '별이 빛나는 밤': 'vangogh-starrynight',
  'Starry Night': 'vangogh-starrynight',
  'Sunflowers': 'vangogh-sunflowers',
  '해바라기': 'vangogh-sunflowers',
  'Self-Portrait': 'vangogh-selfportrait',
  '자화상': 'vangogh-selfportrait',
  'Van Gogh Self-Portrait': 'vangogh-selfportrait',
  
  // 클림트 (3작품)
  'The Kiss': 'klimt-kiss',
  '키스': 'klimt-kiss',
  'Kiss': 'klimt-kiss',
  'The Tree of Life': 'klimt-treeoflife',
  '생명의 나무': 'klimt-treeoflife',
  'Tree of Life': 'klimt-treeoflife',
  'Judith I': 'klimt-judith',
  'Judith': 'klimt-judith',
  '유디트': 'klimt-judith',
  
  // 뭉크 (3작품)
  'The Scream': 'munch-scream',
  '절규': 'munch-scream',
  'Scream': 'munch-scream',
  'Madonna': 'munch-madonna',
  '마돈나': 'munch-madonna',
  'Munch Madonna': 'munch-madonna',
  'Jealousy': 'munch-jealousy',
  '질투': 'munch-jealousy',
  'The Jealousy': 'munch-jealousy',
  
  // 마티스 (3작품)
  'The Dance': 'matisse-dance',
  '춤': 'matisse-dance',
  'Dance': 'matisse-dance',
  'La Danse': 'matisse-dance',
  'The Red Room': 'matisse-redroom',
  '붉은 방': 'matisse-redroom',
  'Red Room': 'matisse-redroom',
  'Harmony in Red': 'matisse-redroom',
  'Woman with a Hat': 'matisse-womanhat',
  '모자를 쓴 여인': 'matisse-womanhat',
  'Femme au Chapeau': 'matisse-womanhat',
  
  // 피카소 (2작품)
  'Les Demoiselles d\'Avignon': 'picasso-demoiselles',
  '아비뇽의 처녀들': 'picasso-demoiselles',
  'Demoiselles': 'picasso-demoiselles',
  'Demoiselles d\'Avignon': 'picasso-demoiselles',
  'Guernica': 'picasso-guernica',
  '게르니카': 'picasso-guernica',
  
  // 프리다 칼로 (4작품)
  'Me and My Parrots': 'frida-parrots',
  '나와 내 앵무새들': 'frida-parrots',
  'Self-Portrait with Parrots': 'frida-parrots',
  'The Broken Column': 'frida-brokencolumn',
  '부러진 기둥': 'frida-brokencolumn',
  'Broken Column': 'frida-brokencolumn',
  'Self-Portrait with Thorn Necklace': 'frida-thornnecklace',
  '가시 목걸이와 벌새': 'frida-thornnecklace',
  'Thorn Necklace': 'frida-thornnecklace',
  'Self-Portrait with Thorn Necklace and Hummingbird': 'frida-thornnecklace',
  'Self-Portrait with Monkeys': 'frida-monkeys',
  '원숭이와 자화상': 'frida-monkeys',
  'Monkeys': 'frida-monkeys',
  
  // 워홀 (3작품)
  'Marilyn Monroe': 'warhol-marilyn',
  '마릴린 먼로': 'warhol-marilyn',
  'Marilyn': 'warhol-marilyn',
  'Marilyn Diptych': 'warhol-marilyn',
  'Campbell\'s Soup Cans': 'warhol-soup',
  '캠벨 수프 캔': 'warhol-soup',
  'Soup Cans': 'warhol-soup',
  'Campbell Soup': 'warhol-soup',
  'Elvis': 'warhol-elvis',
  '엘비스': 'warhol-elvis',
  'Elvis Presley': 'warhol-elvis',
  'Double Elvis': 'warhol-elvis',
};

// 화가 이름으로 기본 작품 fallback (작품명 매칭 실패 시)
const MASTERS_ARTIST_FALLBACK = {
  'vangogh': 'vangogh-starrynight',
  'gogh': 'vangogh-starrynight',
  '고흐': 'vangogh-starrynight',
  'van gogh': 'vangogh-starrynight',
  'vincent': 'vangogh-starrynight',
  '반 고흐': 'vangogh-starrynight',
  
  'klimt': 'klimt-kiss',
  '클림트': 'klimt-kiss',
  'gustav': 'klimt-kiss',
  'gustav klimt': 'klimt-kiss',
  
  'munch': 'munch-scream',
  '뭉크': 'munch-scream',
  'edvard': 'munch-scream',
  'edvard munch': 'munch-scream',
  
  'matisse': 'matisse-dance',
  '마티스': 'matisse-dance',
  'henri': 'matisse-dance',
  'henri matisse': 'matisse-dance',
  
  'picasso': 'picasso-guernica',
  '피카소': 'picasso-guernica',
  'pablo': 'picasso-guernica',
  'pablo picasso': 'picasso-guernica',
  
  'frida': 'frida-parrots',
  '프리다': 'frida-parrots',
  'kahlo': 'frida-parrots',
  'frida kahlo': 'frida-parrots',
  '프리다 칼로': 'frida-parrots',
  
  'warhol': 'warhol-marilyn',
  '워홀': 'warhol-marilyn',
  'andy': 'warhol-marilyn',
  'andy warhol': 'warhol-marilyn',
  '앤디 워홀': 'warhol-marilyn',
};


// ========== 미술사조 (Movements) 매칭 ==========
// aiSelectedArtist → 교육자료 키
const MOVEMENTS_ARTIST_MAP = {
  // 고대 그리스-로마
  'Classical Sculpture': 'ancient-greek-sculpture',
  'Greek Sculpture': 'ancient-greek-sculpture',
  'Polykleitos': 'ancient-greek-sculpture',
  'Phidias': 'ancient-greek-sculpture',
  'Myron': 'ancient-greek-sculpture',
  'Praxiteles': 'ancient-greek-sculpture',
  'Roman Mosaic': 'roman-mosaic',
  'Mosaic': 'roman-mosaic',
  
  // 중세
  'Byzantine': 'byzantine',
  'Byzantine Art': 'byzantine',
  'Gothic': 'gothic',
  'Gothic Art': 'gothic',
  'Limbourg Brothers': 'gothic',
  'Islamic': 'islamic-miniature',
  'Islamic Miniature': 'islamic-miniature',
  'Persian Miniature': 'islamic-miniature',
  
  // 르네상스
  'Leonardo': 'leonardo',
  'Leonardo da Vinci': 'leonardo',
  'Da Vinci': 'leonardo',
  'Michelangelo': 'michelangelo',
  'Michelangelo Buonarroti': 'michelangelo',
  'Raphael': 'raphael',
  'Raphael Sanzio': 'raphael',
  'Raffaello': 'raphael',
  'Botticelli': 'botticelli',
  'Sandro Botticelli': 'botticelli',
  'Titian': 'titian',
  'Tiziano': 'titian',
  
  // 바로크
  'Caravaggio': 'caravaggio',
  'Rembrandt': 'rembrandt',
  'Rembrandt van Rijn': 'rembrandt',
  'Vermeer': 'vermeer',
  'Johannes Vermeer': 'vermeer',
  'Jan Vermeer': 'vermeer',
  'Velazquez': 'velazquez',
  'Velázquez': 'velazquez',
  'Diego Velázquez': 'velazquez',
  'Rubens': 'rubens',
  'Peter Paul Rubens': 'rubens',
  
  // 로코코
  'Watteau': 'watteau',
  'Antoine Watteau': 'watteau',
  'Jean-Antoine Watteau': 'watteau',
  'Boucher': 'boucher',
  'François Boucher': 'boucher',
  'Fragonard': 'boucher',  // Fragonard도 로코코이므로 boucher로 매핑
  
  // 신고전주의/낭만주의/사실주의
  'Jacques-Louis David': 'jacques-louis-david',
  'David': 'jacques-louis-david',
  'Ingres': 'ingres',
  'Jean-Auguste-Dominique Ingres': 'ingres',
  'Turner': 'turner',
  'J.M.W. Turner': 'turner',
  'William Turner': 'turner',
  'Goya': 'goya',
  'Francisco Goya': 'goya',
  'Delacroix': 'delacroix',
  'Eugène Delacroix': 'delacroix',
  'Eugene Delacroix': 'delacroix',
  'Millet': 'millet',
  'Jean-François Millet': 'millet',
  'Courbet': 'millet',  // Courbet도 사실주의이므로 millet로 매핑
  
  // 인상주의
  'Monet': 'monet',
  'Claude Monet': 'monet',
  'Manet': 'manet',
  'Édouard Manet': 'manet',
  'Edouard Manet': 'manet',
  'Renoir': 'renoir',
  'Pierre-Auguste Renoir': 'renoir',
  'Auguste Renoir': 'renoir',
  'Degas': 'degas',
  'Edgar Degas': 'degas',
  'Caillebotte': 'caillebotte',
  'Gustave Caillebotte': 'caillebotte',
  
  // 후기인상주의
  'Van Gogh': 'gogh',
  'Vincent van Gogh': 'gogh',
  'Vincent Van Gogh': 'gogh',
  'Cezanne': 'cezanne',
  'Cézanne': 'cezanne',
  'Paul Cézanne': 'cezanne',
  'Paul Cezanne': 'cezanne',
  'Gauguin': 'gauguin',
  'Paul Gauguin': 'gauguin',
  'Signac': 'signac',
  'Paul Signac': 'signac',
  'Seurat': 'signac',  // Seurat도 점묘법이므로 signac으로 매핑
  
  // 야수파
  'Matisse': 'matisse',
  'Henri Matisse': 'matisse',
  'Derain': 'derain',
  'André Derain': 'derain',
  'Andre Derain': 'derain',
  'Vlaminck': 'vlaminck',
  'Maurice de Vlaminck': 'vlaminck',
  
  // 표현주의
  'Munch': 'munch',
  'Edvard Munch': 'munch',
  'Kokoschka': 'kokoschka',
  'Oskar Kokoschka': 'kokoschka',
  'Kirchner': 'kirchner',
  'Ernst Ludwig Kirchner': 'kirchner',
  'Kandinsky': 'kandinsky',
  'Wassily Kandinsky': 'kandinsky',
  
  // 모더니즘 (피카소, 초현실주의 등)
  'Picasso': 'picasso',
  'Pablo Picasso': 'picasso',
  'Magritte': 'magritte',
  'René Magritte': 'magritte',
  'Rene Magritte': 'magritte',
  'Miro': 'miro',
  'Miró': 'miro',
  'Joan Miró': 'miro',
  'Joan Miro': 'miro',
  'Chagall': 'chagall',
  'Marc Chagall': 'chagall',
  
  // 팝아트
  'Warhol': 'warhol',
  'Andy Warhol': 'warhol',
  'Lichtenstein': 'lichtenstein',
  'Roy Lichtenstein': 'lichtenstein',
  'Keith Haring': 'keith-haring',
  'Haring': 'keith-haring',
};


// ========== 동양화 (Oriental) 매칭 ==========
// aiSelectedArtist → 교육자료 키
const ORIENTAL_STYLE_MAP = {
  // 한국
  'Korean Minhwa': 'korean-minhwa',
  'Korean Minhwa Folk Painting': 'korean-minhwa',
  'Minhwa': 'korean-minhwa',
  '민화': 'korean-minhwa',
  'Korean Folk Painting': 'korean-minhwa',
  
  'Korean Pungsokdo': 'korean-genre',
  'Korean Pungsokdo Genre Painting': 'korean-genre',
  'Pungsokdo': 'korean-genre',
  '풍속도': 'korean-genre',
  'Korean Genre Painting': 'korean-genre',
  'Kim Hong-do': 'korean-genre',
  
  'Korean Jingyeong': 'korean-jingyeong',
  'Korean Jingyeong Landscape': 'korean-jingyeong',
  'Jingyeong': 'korean-jingyeong',
  '진경산수': 'korean-jingyeong',
  'Jeong Seon': 'korean-jingyeong',
  
  // 중국
  'Chinese Ink Wash': 'chinese-ink',
  'Chinese Ink': 'chinese-ink',
  'Ink Wash': 'chinese-ink',
  '수묵화': 'chinese-ink',
  'Shuimo': 'chinese-ink',
  
  'Chinese Gongbi': 'chinese-gongbi',
  'Gongbi': 'chinese-gongbi',
  '공필화': 'chinese-gongbi',
  'Chinese Fine Brush': 'chinese-gongbi',
  
  'Chinese Huaniao': 'chinese-gongbi',  // 화조화도 공필로 매핑
  'Huaniao': 'chinese-gongbi',
  
  // 일본
  'Japanese Ukiyo-e': 'japanese-ukiyoe',
  'Ukiyo-e': 'japanese-ukiyoe',
  'Ukiyoe': 'japanese-ukiyoe',
  '우키요에': 'japanese-ukiyoe',
  'Hokusai': 'japanese-ukiyoe',
  'Hiroshige': 'japanese-ukiyoe',
  
  // 일반 fallback
  'Korean': 'korean',
  'Chinese': 'chinese',
  'Japanese': 'japanese',
};


// ========== 메인 매칭 함수 ==========
/**
 * API 응답값을 교육자료 키로 변환
 * @param {string} category - 'masters' | 'movements' | 'oriental'
 * @param {string} artist - aiSelectedArtist 값 (예: "Claude Monet", "반 고흐")
 * @param {string} work - selected_work 값 (거장만, 예: "The Starry Night")
 * @returns {string|null} 교육자료 키
 */
export const getEducationKey = (category, artist, work) => {
  console.log('');
  console.log('🔑 getEducationKey called:');
  console.log('   - category:', category);
  console.log('   - artist:', artist);
  console.log('   - work:', work);
  
  if (!category) {
    console.log('❌ No category provided');
    return null;
  }
  
  let key = null;
  
  // ========== 거장 ==========
  if (category === 'masters') {
    // 1. 작품명으로 먼저 시도 (가장 정확)
    if (work) {
      // 직접 매칭
      key = MASTERS_WORK_MAP[work];
      if (key) {
        console.log('✅ Masters matched by work (direct):', key);
        return key;
      }
      
      // 괄호 제거 후 시도: "The Starry Night (별이 빛나는 밤)" → "The Starry Night"
      const cleanWork = work.split('(')[0].trim();
      key = MASTERS_WORK_MAP[cleanWork];
      if (key) {
        console.log('✅ Masters matched by work (cleaned):', key);
        return key;
      }
      
      // 괄호 안 한글로 시도
      const koreanMatch = work.match(/\(([^)]+)\)/);
      if (koreanMatch) {
        key = MASTERS_WORK_MAP[koreanMatch[1].trim()];
        if (key) {
          console.log('✅ Masters matched by work (korean):', key);
          return key;
        }
      }
      
      // 부분 매칭 시도 (Starry Night → The Starry Night)
      const workLower = work.toLowerCase();
      for (const [mapWork, mapKey] of Object.entries(MASTERS_WORK_MAP)) {
        if (mapWork.toLowerCase().includes(workLower) || 
            workLower.includes(mapWork.toLowerCase())) {
          console.log('✅ Masters matched by work (partial):', mapKey);
          return mapKey;
        }
      }
    }
    
    // 2. 작품명 매칭 실패 시 화가명으로 fallback
    if (artist) {
      const artistLower = artist.toLowerCase();
      
      // 직접 매칭
      key = MASTERS_ARTIST_FALLBACK[artistLower];
      if (key) {
        console.log('✅ Masters fallback by artist (direct):', key);
        return key;
      }
      
      // 부분 매칭
      for (const [mapArtist, mapKey] of Object.entries(MASTERS_ARTIST_FALLBACK)) {
        if (artistLower.includes(mapArtist) || mapArtist.includes(artistLower)) {
          console.log('✅ Masters fallback by artist (partial):', mapKey);
          return mapKey;
        }
      }
    }
    
    console.log('❌ Masters: No match found');
    return null;
  }
  
  // ========== 미술사조 ==========
  if (category === 'movements') {
    if (!artist) {
      console.log('❌ Movements: No artist provided');
      return null;
    }
    
    // 직접 매칭
    key = MOVEMENTS_ARTIST_MAP[artist];
    if (key) {
      console.log('✅ Movements matched (direct):', key);
      return key;
    }
    
    // 대소문자 무시 매칭
    const artistLower = artist.toLowerCase();
    for (const [mapArtist, mapKey] of Object.entries(MOVEMENTS_ARTIST_MAP)) {
      if (mapArtist.toLowerCase() === artistLower) {
        console.log('✅ Movements matched (case-insensitive):', mapKey);
        return mapKey;
      }
    }
    
    // 부분 매칭 (이름 일부만 포함)
    for (const [mapArtist, mapKey] of Object.entries(MOVEMENTS_ARTIST_MAP)) {
      const mapArtistLower = mapArtist.toLowerCase();
      if (artistLower.includes(mapArtistLower) || mapArtistLower.includes(artistLower)) {
        console.log('✅ Movements matched (partial):', mapKey);
        return mapKey;
      }
    }
    
    // 성(last name)만으로 시도
    const lastName = artist.split(' ').pop();
    if (lastName) {
      key = MOVEMENTS_ARTIST_MAP[lastName];
      if (key) {
        console.log('✅ Movements matched (last name):', key);
        return key;
      }
    }
    
    console.log('❌ Movements: No match found for:', artist);
    return null;
  }
  
  // ========== 동양화 ==========
  if (category === 'oriental') {
    if (!artist) {
      console.log('❌ Oriental: No artist provided');
      return null;
    }
    
    // 직접 매칭
    key = ORIENTAL_STYLE_MAP[artist];
    if (key) {
      console.log('✅ Oriental matched (direct):', key);
      return key;
    }
    
    // 대소문자 무시 매칭
    const artistLower = artist.toLowerCase();
    for (const [mapArtist, mapKey] of Object.entries(ORIENTAL_STYLE_MAP)) {
      if (mapArtist.toLowerCase() === artistLower) {
        console.log('✅ Oriental matched (case-insensitive):', mapKey);
        return mapKey;
      }
    }
    
    // 부분 매칭
    for (const [mapArtist, mapKey] of Object.entries(ORIENTAL_STYLE_MAP)) {
      const mapArtistLower = mapArtist.toLowerCase();
      if (artistLower.includes(mapArtistLower) || mapArtistLower.includes(artistLower)) {
        console.log('✅ Oriental matched (partial):', mapKey);
        return mapKey;
      }
    }
    
    console.log('❌ Oriental: No match found for:', artist);
    return null;
  }
  
  console.log('❌ Unknown category:', category);
  return null;
};


// ========== 교육자료 내용 가져오기 ==========
/**
 * 교육자료 키로 실제 내용 가져오기
 * @param {string} category - 'masters' | 'movements' | 'oriental'
 * @param {string} key - 교육자료 키 (예: "vangogh-starrynight", "monet")
 * @param {object} educationData - { masters, movements, oriental } 교육자료 객체
 * @returns {string|null} 교육자료 내용
 */
export const getEducationContent = (category, key, educationData) => {
  console.log('');
  console.log('📚 getEducationContent called:');
  console.log('   - category:', category);
  console.log('   - key:', key);
  
  if (!key || !educationData) {
    console.log('❌ Missing key or educationData');
    return null;
  }
  
  let data = null;
  
  if (category === 'masters') {
    data = educationData.masters?.[key];
  } else if (category === 'movements') {
    data = educationData.movements?.[key];
  } else if (category === 'oriental') {
    data = educationData.oriental?.[key];
  }
  
  if (data?.content) {
    console.log('✅ Education content found!');
    console.log('   - preview:', data.content.substring(0, 50) + '...');
    return data.content;
  }
  
  console.log('❌ No content found for key:', key);
  return null;
};


// ========== 테스트용 함수 ==========
export const testEducationMatcher = () => {
  console.log('');
  console.log('========================================');
  console.log('🧪 Testing Education Matcher');
  console.log('========================================');
  
  const testCases = [
    // 거장 테스트
    { category: 'masters', artist: '반 고흐', work: 'The Starry Night', expected: 'vangogh-starrynight' },
    { category: 'masters', artist: 'Edvard Munch', work: 'Madonna', expected: 'munch-madonna' },
    { category: 'masters', artist: '마티스', work: 'The Dance', expected: 'matisse-dance' },
    { category: 'masters', artist: 'Gustav Klimt', work: null, expected: 'klimt-kiss' },  // fallback
    
    // 미술사조 테스트
    { category: 'movements', artist: 'Claude Monet', work: null, expected: 'monet' },
    { category: 'movements', artist: 'Vincent van Gogh', work: null, expected: 'gogh' },
    { category: 'movements', artist: 'Edvard Munch', work: null, expected: 'munch' },
    { category: 'movements', artist: 'Henri Matisse', work: null, expected: 'matisse' },
    
    // 동양화 테스트
    { category: 'oriental', artist: 'Korean Minhwa', work: null, expected: 'korean-minhwa' },
    { category: 'oriental', artist: 'Chinese Gongbi', work: null, expected: 'chinese-gongbi' },
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const tc of testCases) {
    const result = getEducationKey(tc.category, tc.artist, tc.work);
    const success = result === tc.expected;
    
    if (success) {
      passed++;
      console.log(`✅ PASS: ${tc.category}/${tc.artist} → ${result}`);
    } else {
      failed++;
      console.log(`❌ FAIL: ${tc.category}/${tc.artist} → ${result} (expected: ${tc.expected})`);
    }
  }
  
  console.log('');
  console.log(`Result: ${passed}/${testCases.length} passed, ${failed} failed`);
  console.log('========================================');
  
  return { passed, failed, total: testCases.length };
};
