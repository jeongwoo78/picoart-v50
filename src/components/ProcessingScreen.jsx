// PicoArt v51 - ProcessingScreen (단일변환 반복 = 원클릭)
// 원칙: 단일 변환 로직만 있고, 원클릭은 그걸 N번 반복
// v51: educationMatcher.js 사용 (ResultScreen과 동일한 매칭 로직)
import React, { useEffect, useState } from 'react';
import { processStyleTransfer } from '../utils/styleTransferAPI';
import { educationContent } from '../data/educationContent';
// 원클릭 교육자료 (분리된 파일)
import { oneclickMovementsPrimary, oneclickMovementsSecondary } from '../data/oneclickMovementsEducation';
import { oneclickMastersPrimary, oneclickMastersSecondary } from '../data/oneclickMastersEducation';
import { oneclickOrientalPrimary, oneclickOrientalSecondary } from '../data/oneclickOrientalEducation';
// v51: 새로운 교육자료 매칭 유틸리티 (ResultScreen과 동일)
import { getEducationKey, getEducationContent } from '../utils/educationMatcher';

const ProcessingScreen = ({ photo, selectedStyle, onComplete }) => {
  const [statusText, setStatusText] = useState('준비 중...');
  const [showEducation, setShowEducation] = useState(false);
  
  // 원클릭 상태
  const [completedResults, setCompletedResults] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [viewIndex, setViewIndex] = useState(-1);
  const [touchStartX, setTouchStartX] = useState(0);
  
  // 원클릭 여부
  const isFullTransform = selectedStyle?.isFullTransform === true;
  const category = selectedStyle?.category;
  
  // 원클릭 시 전달받은 스타일 배열 사용 (styleData import 불필요!)
  const styles = isFullTransform ? (selectedStyle?.styles || []) : [];
  const totalCount = styles.length;

  useEffect(() => {
    startProcess();
  }, []);

  // ========== 메인 프로세스 ==========
  const startProcess = async () => {
    if (isFullTransform) {
      // 원클릭: 1차 교육 표시 후 순차 변환 (단일 변환 반복!)
      setShowEducation(true);
      setStatusText(`${totalCount}개 스타일 변환을 시작합니다...`);
      await sleep(1500);
      
      const results = [];
      for (let i = 0; i < styles.length; i++) {
        const style = styles[i]; // 공통 데이터에서 가져온 스타일 (category 포함)
        setStatusText(`[${i}/${totalCount}] ${style.name} 변환 중...`);
        
        // 단일 변환과 동일하게 호출!
        const result = await processSingleStyle(style, i, totalCount);
        results.push(result);
        setCompletedCount(i + 1);
        setCompletedResults([...results]);
        
        // API 부하 방지: 각 변환 후 2초 딜레이 (마지막 제외)
        if (i < styles.length - 1) {
          await sleep(2000);
        }
      }
      
      const successCount = results.filter(r => r.success).length;
      setStatusText(`완료! ${successCount}/${totalCount}개 변환 성공`);
      await sleep(1000);
      
      onComplete(selectedStyle, results, { isFullTransform: true, category, results });
    } else {
      // 단일 변환
      setShowEducation(true);
      const eduContent = getSingleEducationContent(selectedStyle);
      if (eduContent) {
        setStatusText(`${eduContent.title} 스타일 분석 중...`);
      }
      await sleep(1000);
      
      const result = await processSingleStyle(selectedStyle);
      
      if (result.success) {
        setStatusText(`${result.aiSelectedArtist || selectedStyle.name} 화풍으로 변환 완료!`);
        await sleep(1000);
        onComplete(selectedStyle, result.resultUrl, result);
      } else {
        setStatusText(`오류: ${result.error}`);
      }
    }
  };

  // ========== 단일 스타일 변환 (핵심 함수 - 원클릭도 이거 사용) ==========
  const processSingleStyle = async (style, index = 0, total = 1) => {
    try {
      const result = await processStyleTransfer(
        photo,
        style, // category 포함된 스타일 객체 그대로 전달
        null,
        (progressText) => {
          if (total > 1) {
            setStatusText(`[${index}/${total}] ${progressText}`);
          } else {
            setStatusText(progressText);
          }
        }
      );

      if (result.success) {
        return {
          style,
          resultUrl: result.resultUrl,
          aiSelectedArtist: result.aiSelectedArtist,
          selected_work: result.selected_work,  // 거장 모드: 선택된 작품
          success: true
        };
      } else {
        return { 
          style, 
          error: result.error, 
          aiSelectedArtist: result.aiSelectedArtist,  // 실패해도 보존
          selected_work: result.selected_work,
          success: false 
        };
      }
    } catch (err) {
      return { style, error: err.message, success: false };
    }
  };

  // ========== 교육자료 ==========
  
  // 단일 변환용 1차 교육 (로컬 함수 - import된 getEducationContent와 구분)
  const getSingleEducationContent = (style) => {
    const cat = style.category;
    if (cat === 'movements') return educationContent.movements[style.id];
    if (cat === 'masters') return educationContent.masters[style.id];
    if (cat === 'oriental') return educationContent.oriental[style.id];
    return null;
  };

  // 원클릭 1차 교육 (분리된 파일에서 가져오기)
  const getPrimaryEducation = () => {
    console.log('🎓 getPrimaryEducation called, category:', category);
    
    if (category === 'movements') {
      console.log('🎓 Using oneclickMovementsPrimary');
      return { ...oneclickMovementsPrimary, title: '2,500년 서양미술사 관통' };
    } else if (category === 'masters') {
      console.log('🎓 Using oneclickMastersPrimary');
      return oneclickMastersPrimary;
    } else if (category === 'oriental') {
      console.log('🎓 Using oneclickOrientalPrimary');
      return oneclickOrientalPrimary;
    }
    return null;
  };

  // ========== 포맷 함수들 (ResultScreen과 통일) ==========
  
  // 화가명 포맷: 한글명(영문명)
  const formatArtistName = (artistName) => {
    if (!artistName) return '';
    
    const nameMap = {
      // 그리스로마
      'roman mosaic': '로마 모자이크(Roman Mosaic)',
      'greek sculpture': '그리스 조각(Greek Sculpture)',
      'classical sculpture': '고대 조각(Classical Sculpture)',
      'pompeii fresco': '폼페이 프레스코(Pompeii Fresco)',
      // 중세
      'giotto': '지오토 디 본도네(Giotto di Bondone)',
      'byzantine': '비잔틴(Byzantine)',
      'gothic': '고딕(Gothic)',
      'gothic stained glass': '고딕 스테인드글라스(Gothic Stained Glass)',
      'islamic miniature': '이슬람 세밀화(Islamic Miniature)',
      'islamic geometry': '이슬람 기하학(Islamic Geometry)',
      // 르네상스
      'leonardo': '레오나르도 다 빈치(Leonardo da Vinci)',
      'leonardo da vinci': '레오나르도 다 빈치(Leonardo da Vinci)',
      'michelangelo': '미켈란젤로 부오나로티(Michelangelo Buonarroti)',
      'raphael': '라파엘로 산치오(Raffaello Sanzio)',
      'botticelli': '산드로 보티첼리(Sandro Botticelli)',
      'jan van eyck': '얀 반 에이크(Jan van Eyck)',
      'titian': '티치아노 베첼리오(Tiziano Vecellio)',
      // 바로크
      'caravaggio': '미켈란젤로 메리시 다 카라바조(Caravaggio)',
      'rembrandt': '렘브란트 판 레인(Rembrandt van Rijn)',
      'rembrandt van rijn': '렘브란트 판 레인(Rembrandt van Rijn)',
      'vermeer': '요하네스 베르메르(Johannes Vermeer)',
      'johannes vermeer': '요하네스 베르메르(Johannes Vermeer)',
      'rubens': '피터 파울 루벤스(Peter Paul Rubens)',
      'peter paul rubens': '피터 파울 루벤스(Peter Paul Rubens)',
      'velázquez': '디에고 벨라스케스(Diego Velázquez)',
      'velazquez': '디에고 벨라스케스(Diego Velázquez)',
      'diego velázquez': '디에고 벨라스케스(Diego Velázquez)',
      'diego velazquez': '디에고 벨라스케스(Diego Velázquez)',
      // 로코코
      'watteau': '장 앙투안 와토(Jean-Antoine Watteau)',
      'jean-antoine watteau': '장 앙투안 와토(Jean-Antoine Watteau)',
      'fragonard': '장 오노레 프라고나르(Jean-Honoré Fragonard)',
      'jean-honoré fragonard': '장 오노레 프라고나르(Jean-Honoré Fragonard)',
      'boucher': '프랑수아 부셰(François Boucher)',
      'françois boucher': '프랑수아 부셰(François Boucher)',
      'francois boucher': '프랑수아 부셰(François Boucher)',
      // 신고전/낭만/사실
      'david': '자크 루이 다비드(Jacques-Louis David)',
      'jacques-louis david': '자크 루이 다비드(Jacques-Louis David)',
      'ingres': '장 오귀스트 도미니크 앵그르(Jean-Auguste-Dominique Ingres)',
      'delacroix': '외젠 들라크루아(Eugène Delacroix)',
      'eugène delacroix': '외젠 들라크루아(Eugène Delacroix)',
      'eugene delacroix': '외젠 들라크루아(Eugène Delacroix)',
      'goya': '프란시스코 고야(Francisco Goya)',
      'francisco goya': '프란시스코 고야(Francisco Goya)',
      'turner': '윌리엄 터너(J.M.W. Turner)',
      'friedrich': '카스파르 다비드 프리드리히(Caspar David Friedrich)',
      'courbet': '귀스타브 쿠르베(Gustave Courbet)',
      'millet': '장 프랑수아 밀레(Jean-François Millet)',
      'jean-françois millet': '장 프랑수아 밀레(Jean-François Millet)',
      // 인상주의
      'monet': '클로드 모네(Claude Monet)',
      'claude monet': '클로드 모네(Claude Monet)',
      'renoir': '피에르 오귀스트 르누아르(Pierre-Auguste Renoir)',
      'pierre-auguste renoir': '피에르 오귀스트 르누아르(Pierre-Auguste Renoir)',
      'degas': '에드가 드가(Edgar Degas)',
      'edgar degas': '에드가 드가(Edgar Degas)',
      'manet': '에두아르 마네(Édouard Manet)',
      'édouard manet': '에두아르 마네(Édouard Manet)',
      'edouard manet': '에두아르 마네(Édouard Manet)',
      'caillebotte': '귀스타브 카유보트(Gustave Caillebotte)',
      // 후기인상주의
      'van gogh': '빈센트 반 고흐(Vincent van Gogh)',
      'vincent van gogh': '빈센트 반 고흐(Vincent van Gogh)',
      'cézanne': '폴 세잔(Paul Cézanne)',
      'cezanne': '폴 세잔(Paul Cézanne)',
      'paul cézanne': '폴 세잔(Paul Cézanne)',
      'paul cezanne': '폴 세잔(Paul Cézanne)',
      'gauguin': '폴 고갱(Paul Gauguin)',
      'paul gauguin': '폴 고갱(Paul Gauguin)',
      'seurat': '조르주 쇠라(Georges Seurat)',
      'georges seurat': '조르주 쇠라(Georges Seurat)',
      'signac': '폴 시냐크(Paul Signac)',
      'paul signac': '폴 시냐크(Paul Signac)',
      'toulouse-lautrec': '앙리 드 툴루즈 로트렉(Henri de Toulouse-Lautrec)',
      'henri de toulouse-lautrec': '앙리 드 툴루즈 로트렉(Henri de Toulouse-Lautrec)',
      // 야수파
      'matisse': '앙리 마티스(Henri Matisse)',
      'henri matisse': '앙리 마티스(Henri Matisse)',
      'derain': '앙드레 드랭(André Derain)',
      'andré derain': '앙드레 드랭(André Derain)',
      'andre derain': '앙드레 드랭(André Derain)',
      'vlaminck': '모리스 드 블라맹크(Maurice de Vlaminck)',
      // 표현주의
      'munch': '에드바르 뭉크(Edvard Munch)',
      'edvard munch': '에드바르 뭉크(Edvard Munch)',
      'kirchner': '에른스트 루트비히 키르히너(Ernst Ludwig Kirchner)',
      'ernst ludwig kirchner': '에른스트 루트비히 키르히너(Ernst Ludwig Kirchner)',
      'kandinsky': '바실리 칸딘스키(Wassily Kandinsky)',
      'kokoschka': '오스카 코코슈카(Oskar Kokoschka)',
      'schiele': '에곤 실레(Egon Schiele)',
      // 모더니즘 (입체주의/초현실/팝아트)
      'picasso': '파블로 피카소(Pablo Picasso)',
      'pablo picasso': '파블로 피카소(Pablo Picasso)',
      'braque': '조르주 브라크(Georges Braque)',
      'magritte': '르네 마그리트(René Magritte)',
      'rené magritte': '르네 마그리트(René Magritte)',
      'miro': '호안 미로(Joan Miró)',
      'miró': '호안 미로(Joan Miró)',
      'joan miro': '호안 미로(Joan Miró)',
      'chagall': '마르크 샤갈(Marc Chagall)',
      'marc chagall': '마르크 샤갈(Marc Chagall)',
      'warhol': '앤디 워홀(Andy Warhol)',
      'andy warhol': '앤디 워홀(Andy Warhol)',
      'lichtenstein': '로이 리히텐슈타인(Roy Lichtenstein)',
      'roy lichtenstein': '로이 리히텐슈타인(Roy Lichtenstein)',
      'haring': '키스 해링(Keith Haring)',
      'keith haring': '키스 해링(Keith Haring)',
      // 거장 (한글명)
      '반 고흐': '빈센트 반 고흐(Vincent van Gogh)',
      '클림트': '구스타프 클림트(Gustav Klimt)',
      '뭉크': '에드바르 뭉크(Edvard Munch)',
      '마티스': '앙리 마티스(Henri Matisse)',
      '피카소': '파블로 피카소(Pablo Picasso)',
      '프리다 칼로': '프리다 칼로(Frida Kahlo)',
      '프리다': '프리다 칼로(Frida Kahlo)',
      '바스키아': '장 미셸 바스키아(Jean-Michel Basquiat)',
      '장 미셸 바스키아': '장 미셸 바스키아(Jean-Michel Basquiat)'
    };
    
    const normalized = artistName.toLowerCase().trim();
    return nameMap[normalized] || nameMap[artistName] || artistName;
  };

  // 작품명 포맷: 한글명(영문명) - 거장용
  const formatWorkName = (workName) => {
    if (!workName) return '';
    
    const workMap = {
      // 반 고흐
      'The Starry Night': '별이 빛나는 밤(The Starry Night)',
      'Starry Night': '별이 빛나는 밤(Starry Night)',
      'Sunflowers': '해바라기(Sunflowers)',
      'Self-Portrait': '자화상(Self-Portrait)',
      // 클림트
      'The Kiss': '키스(The Kiss)',
      'The Tree of Life': '생명의 나무(The Tree of Life)',
      'Judith I': '유디트(Judith)',
      'Judith': '유디트(Judith)',
      // 뭉크
      'The Scream': '절규(The Scream)',
      'Madonna': '마돈나(Madonna)',
      'Jealousy': '질투(Jealousy)',
      // 마티스
      'The Dance': '춤(The Dance)',
      'The Red Room': '붉은 방(The Red Room)',
      'Woman with a Hat': '모자를 쓴 여인(Woman with a Hat)',
      // 피카소
      'Guernica': '게르니카(Guernica)',
      'Weeping Woman': '우는 여인(Weeping Woman)',
      "Les Demoiselles d'Avignon": "아비뇽의 처녀들(Les Demoiselles d'Avignon)",
      // 프리다 칼로
      'Me and My Parrots': '나와 앵무새(Me and My Parrots)',
      'Self-Portrait with Parrots': '앵무새와 자화상(Self-Portrait with Parrots)',
      'The Broken Column': '부러진 기둥(The Broken Column)',
      'Self-Portrait with Thorn Necklace': '가시 목걸이 자화상(Self-Portrait with Thorn Necklace)',
      'Self-Portrait with Monkeys': '원숭이와 자화상(Self-Portrait with Monkeys)',
      'The Two Fridas': '두 명의 프리다(The Two Fridas)',
      // 바스키아
      'Untitled': '무제(Untitled)',
      'Untitled (Skull)': '무제(Untitled)',
      'Skull': '무제(Skull)',
      'Warrior': '전사(Warrior)',
      'Boy and Dog in a Johnnypump': '소년과 개(Boy and Dog)',
      'Boy and Dog': '소년과 개(Boy and Dog)',
      'Hollywood Africans': '할리우드 아프리칸스(Hollywood Africans)'
    };
    
    return workMap[workName] || workName;
  };

  // 동양화 스타일 포맷: 한글명(영문명)
  const formatOrientalStyle = (styleName) => {
    if (!styleName) return '';
    
    const orientalMap = {
      '한국 전통화': '한국 민화(Korean Minhwa)',
      'korean-genre': '한국 풍속화(Korean Genre)',
      'Chinese Gongbi': '중국 공필화(Chinese Gongbi)',
      'chinese-gongbi': '중국 공필화(Chinese Gongbi)',
      '일본 우키요에': '일본 우키요에(Japanese Ukiyo-e)',
      'japanese-ukiyoe': '일본 우키요에(Japanese Ukiyo-e)'
    };
    
    const normalized = styleName?.toLowerCase?.().trim() || '';
    
    if (orientalMap[styleName]) return orientalMap[styleName];
    if (orientalMap[normalized]) return orientalMap[normalized];
    
    // 부분 매칭
    if (normalized.includes('korean') || normalized.includes('한국')) {
      return '한국 민화(Korean Minhwa)';
    }
    if (normalized.includes('chinese') || normalized.includes('gongbi')) {
      return '중국 공필화(Chinese Gongbi)';
    }
    if (normalized.includes('japanese') || normalized.includes('ukiyo')) {
      return '일본 우키요에(Japanese Ukiyo-e)';
    }
    
    return styleName;
  };

  // 거장 화가명 풀네임 + 미술사조 매핑
  const getMasterInfo = (artistName) => {
    const masterMap = {
      '반 고흐': { fullName: '빈센트 반 고흐(Vincent van Gogh)', movement: '후기인상주의' },
      'vangogh': { fullName: '빈센트 반 고흐(Vincent van Gogh)', movement: '후기인상주의' },
      'van gogh': { fullName: '빈센트 반 고흐(Vincent van Gogh)', movement: '후기인상주의' },
      '클림트': { fullName: '구스타프 클림트(Gustav Klimt)', movement: '아르누보' },
      'klimt': { fullName: '구스타프 클림트(Gustav Klimt)', movement: '아르누보' },
      '뭉크': { fullName: '에드바르 뭉크(Edvard Munch)', movement: '표현주의' },
      'munch': { fullName: '에드바르 뭉크(Edvard Munch)', movement: '표현주의' },
      '마티스': { fullName: '앙리 마티스(Henri Matisse)', movement: '야수파' },
      'matisse': { fullName: '앙리 마티스(Henri Matisse)', movement: '야수파' },
      '피카소': { fullName: '파블로 피카소(Pablo Picasso)', movement: '입체주의' },
      'picasso': { fullName: '파블로 피카소(Pablo Picasso)', movement: '입체주의' },
      '프리다': { fullName: '프리다 칼로(Frida Kahlo)', movement: '초현실주의' },
      '프리다 칼로': { fullName: '프리다 칼로(Frida Kahlo)', movement: '초현실주의' },
      'frida': { fullName: '프리다 칼로(Frida Kahlo)', movement: '초현실주의' },
      'frida kahlo': { fullName: '프리다 칼로(Frida Kahlo)', movement: '초현실주의' },
      '바스키아': { fullName: '장 미셸 바스키아(Jean-Michel Basquiat)', movement: '네오표현주의' },
      '장 미셸 바스키아': { fullName: '장 미셸 바스키아(Jean-Michel Basquiat)', movement: '네오표현주의' },
      'basquiat': { fullName: '장 미셸 바스키아(Jean-Michel Basquiat)', movement: '네오표현주의' },
      'jean-michel basquiat': { fullName: '장 미셸 바스키아(Jean-Michel Basquiat)', movement: '네오표현주의' }
    };
    
    if (!artistName) return { fullName: '거장', movement: '' };
    const normalized = artistName.toLowerCase().trim();
    if (masterMap[artistName]) return masterMap[artistName];
    if (masterMap[normalized]) return masterMap[normalized];
    
    // 부분 매칭
    for (const [key, value] of Object.entries(masterMap)) {
      if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
        return value;
      }
    }
    return { fullName: artistName, movement: '' };
  };

  // 카테고리별 부제 포맷 (거장: 미술사조 + 대표작)
  const getSubtitle = (result) => {
    const cat = result?.style?.category;
    const artist = result?.aiSelectedArtist;
    const work = result?.selected_work;
    
    if (cat === 'masters') {
      const masterInfo = getMasterInfo(artist);
      const movement = masterInfo.movement || '거장';
      if (work) {
        const workFormatted = formatWorkName(work);
        const workShort = workFormatted.split('(')[0].trim();
        return `${movement}, <${workShort}>`;
      }
      return movement;
    } else if (cat === 'oriental') {
      return formatOrientalStyle(artist);
    } else {
      return formatArtistName(artist);
    }
  };

  // 거장 모드: 화가 풀네임 반환
  const getMasterFullName = (result) => {
    const cat = result?.style?.category;
    const artist = result?.aiSelectedArtist;
    
    if (cat === 'masters' && artist) {
      const masterInfo = getMasterInfo(artist);
      return masterInfo.fullName;
    }
    return result?.style?.name || '';
  };

  // 원클릭 2차 교육 (결과별) - v51: educationMatcher.js 사용
  const getSecondaryEducation = (result) => {
    if (!result) return null;
    
    const artistName = result.aiSelectedArtist || '';
    const workName = result.selected_work || '';
    const resultCategory = result.style?.category;
    
    console.log('🎓 getSecondaryEducation (ProcessingScreen v51):');
    console.log('   - artistName:', artistName);
    console.log('   - workName:', workName);
    console.log('   - category:', resultCategory);
    
    // v51: educationMatcher.js 사용 (ResultScreen과 동일)
    const key = getEducationKey(resultCategory, artistName, workName);
    console.log('   - matched key:', key);
    
    if (key) {
      // 교육자료 데이터 객체 구성
      const educationData = {
        masters: oneclickMastersSecondary,
        movements: oneclickMovementsSecondary,
        oriental: oneclickOrientalSecondary
      };
      
      console.log('📦 educationData constructed:');
      console.log('   - masters keys:', Object.keys(oneclickMastersSecondary || {}).slice(0, 5));
      console.log('   - checking key:', key, 'in category:', resultCategory);
      
      // 직접 확인
      if (resultCategory === 'masters') {
        console.log('   - direct check:', oneclickMastersSecondary?.[key] ? 'EXISTS' : 'NOT FOUND');
      }
      
      const content = getEducationContent(resultCategory, key, educationData);
      console.log('   - getEducationContent returned:', content ? 'HAS CONTENT' : 'NULL');
      
      if (content) {
        console.log('✅ Found education content for:', key);
        // 교육자료 파일에서 name 가져오기
        let eduName = artistName;
        if (resultCategory === 'masters' && oneclickMastersSecondary[key]) {
          eduName = oneclickMastersSecondary[key].name || artistName;
        } else if (resultCategory === 'movements' && oneclickMovementsSecondary[key]) {
          eduName = oneclickMovementsSecondary[key].name || artistName;
        } else if (resultCategory === 'oriental' && oneclickOrientalSecondary[key]) {
          eduName = oneclickOrientalSecondary[key].name || artistName;
        }
        return { name: eduName, content: content };
      }
    }
    
    console.log('❌ No education found');
    return null;
  };

  // v51: artistNameToKey 함수는 더 이상 사용하지 않음
  // educationMatcher.js의 getEducationKey로 대체됨
  // (하위 호환성을 위해 주석으로 보존)
  /*
  const artistNameToKey = (artistName, workName, resultCategory, educationData) => {
    // ... 기존 코드 생략 ...
  };
  */

  // ========== UI 핸들러 ==========
  const handleDotClick = (idx) => {
    if (idx < completedCount) setViewIndex(idx);
  };
  
  const handleBackToEducation = () => setViewIndex(-1);

  const [touchStartY, setTouchStartY] = useState(0);

  const handleTouchStart = (e) => {
    if (!isFullTransform) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (!isFullTransform || !touchStartX) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    
    // 수평 스와이프만 인식 (X축 이동이 Y축보다 커야 함)
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && viewIndex < completedCount - 1) setViewIndex(v => v + 1);
      if (diffX < 0 && viewIndex > -1) setViewIndex(v => v - 1);
    }
    setTouchStartX(0);
    setTouchStartY(0);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // 현재 보여줄 결과
  const previewResult = viewIndex >= 0 ? completedResults[viewIndex] : null;
  const previewEdu = previewResult ? getSecondaryEducation(previewResult) : null;

  return (
    <div className="processing-screen">
      <div 
        className="processing-content"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 헤더 */}
        <div className="header">
          <h2>{isFullTransform ? '✨ 전체 변환' : '🎨 변환 중'}</h2>
        </div>

        {/* 상태 */}
        <div className="status">
          <div className="spinner"></div>
          <p>{statusText}</p>
        </div>

        {/* ===== 원클릭 모드 ===== */}
        {isFullTransform && (
          <>
            {/* 1차 교육 + 원본 사진 */}
            {viewIndex === -1 && showEducation && getPrimaryEducation() && (
              <div className="preview">
                <img src={URL.createObjectURL(photo)} alt="원본 사진" />
                <div className="preview-info">
                  <div className="preview-style">{selectedStyle?.name || '전체 변환'}</div>
                  <div className="preview-subtitle">원본 사진</div>
                </div>
                <div className="edu-card primary">
                  <h3>{getPrimaryEducation().title}</h3>
                  <p>{getPrimaryEducation().content}</p>
                  {completedCount > 0 && <p className="hint">👆 완료된 결과를 확인하세요</p>}
                </div>
              </div>
            )}

            {/* 결과 미리보기 */}
            {viewIndex >= 0 && previewResult && (
              <div className="preview">
                <img src={previewResult.resultUrl} alt="" />
                <div className="preview-info">
                  <div className="preview-style">
                    {previewResult.style?.category === 'masters' 
                      ? getMasterFullName(previewResult) 
                      : previewResult.style.name}
                  </div>
                  <div className="preview-subtitle">{getSubtitle(previewResult)}</div>
                </div>
                {previewEdu && (
                  <div className="edu-card secondary">
                    <p>{previewEdu.content}</p>
                  </div>
                )}
              </div>
            )}

            {/* 점 네비게이션 + 이전/다음 버튼 */}
            <div className="dots-nav">
              <button 
                className="nav-btn"
                onClick={() => {
                  if (viewIndex === -1 && completedCount > 0) {
                    setViewIndex(completedCount - 1);
                  } else if (viewIndex > 0) {
                    setViewIndex(viewIndex - 1);
                  } else if (viewIndex === 0) {
                    setViewIndex(-1);
                  }
                }}
                disabled={viewIndex === -1 && completedCount === 0}
              >
                ◀ 이전
              </button>
              
              <div className="dots">
                <button className={`dot edu ${viewIndex === -1 ? 'active' : ''}`} onClick={handleBackToEducation}>📚</button>
                {styles.map((_, idx) => (
                  <button 
                    key={idx}
                    className={`dot ${idx < completedCount ? 'done' : ''} ${viewIndex === idx ? 'active' : ''}`}
                    onClick={() => handleDotClick(idx)}
                    disabled={idx >= completedCount}
                  />
                ))}
                <span className="count">[{viewIndex === -1 ? 0 : viewIndex + 1}/{totalCount}]</span>
              </div>
              
              <button 
                className="nav-btn"
                onClick={() => {
                  if (viewIndex === -1 && completedCount > 0) {
                    setViewIndex(0);
                  } else if (viewIndex >= 0 && viewIndex < completedCount - 1) {
                    setViewIndex(viewIndex + 1);
                  }
                }}
                disabled={viewIndex >= completedCount - 1 || completedCount === 0}
              >
                다음 ▶
              </button>
            </div>
          </>
        )}

        {/* ===== 단일 변환 모드 ===== */}
        {!isFullTransform && showEducation && getSingleEducationContent(selectedStyle) && (
          <div className="edu-card primary">
            <h3>{getSingleEducationContent(selectedStyle).title}</h3>
            <p>{getSingleEducationContent(selectedStyle).desc}</p>
          </div>
        )}
      </div>

      <style>{`
        .processing-screen {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .processing-content {
          background: white;
          padding: 24px;
          border-radius: 16px;
          max-width: 500px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .header h2 { margin: 0; font-size: 18px; color: #333; }
        .back-btn {
          padding: 6px 12px;
          background: #f0f0f0;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
        }
        .status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 16px 0;
        }
        .status p { margin: 0; color: #666; font-size: 14px; }
        .spinner {
          width: 20px; height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .edu-card {
          padding: 16px;
          border-radius: 10px;
          margin: 16px 0;
        }
        .edu-card.primary {
          background: linear-gradient(135deg, #fff5f5, #ffe5e5);
          border-left: 3px solid #667eea;
        }
        .edu-card.secondary {
          background: linear-gradient(135deg, #f0fff0, #e5ffe5);
          border-left: 3px solid #4CAF50;
        }
        .edu-card h3 { color: #667eea; margin: 0 0 10px; font-size: 15px; }
        .edu-card h4 { color: #4CAF50; margin: 0 0 8px; font-size: 14px; }
        .edu-card p { color: #333; line-height: 1.6; font-size: 13px; margin: 0; white-space: pre-line; }
        .hint { color: #999; font-size: 12px; text-align: center; margin-top: 12px !important; }
        
        .preview { background: #e3f2fd; border-radius: 10px; overflow: hidden; margin: 16px 0; }
        .preview img { width: 100%; display: block; }
        .preview-info { padding: 12px; text-align: left; }
        .preview-style { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 4px; }
        .preview-subtitle { font-size: 13px; font-weight: 400; color: #666; }
        
        .dots-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 16px;
        }
        .dots-nav .nav-btn {
          padding: 8px 14px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
        }
        .dots-nav .nav-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          border: none;
          background: #ddd;
          cursor: pointer;
          padding: 0;
        }
        .dot.done { background: #4CAF50; }
        .dot.active { transform: scale(1.4); box-shadow: 0 0 0 2px rgba(102,126,234,0.4); }
        .dot:disabled { opacity: 0.4; cursor: default; }
        .dot.edu {
          width: auto; padding: 4px 8px;
          border-radius: 10px;
          font-size: 12px;
          background: #667eea;
        }
        .count { font-size: 12px; color: #999; margin-left: 8px; }
      `}</style>
    </div>
  );
};

export default ProcessingScreen;
