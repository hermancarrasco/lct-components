export type LctBarcodeBar = {
  x: number;
  width: number;
};

export type LctCode39Result = {
  bars: LctBarcodeBar[];
  totalUnits: number;
  displayValue: string;
};

const CODE39_PATTERNS: Record<string, string> = {
  '0': 'nnnwwnwnn',
  '1': 'wnnwnnnnw',
  '2': 'nnwwnnnnw',
  '3': 'wnwwnnnnn',
  '4': 'nnnwwnnnw',
  '5': 'wnnwwnnnn',
  '6': 'nnwwwnnnn',
  '7': 'nnnwnnwnw',
  '8': 'wnnwnnwnn',
  '9': 'nnwwnnwnn',
  A: 'wnnnnwnnw',
  B: 'nnwnnwnnw',
  C: 'wnwnnwnnn',
  D: 'nnnnwwnnw',
  E: 'wnnnwwnnn',
  F: 'nnwnwwnnn',
  G: 'nnnnnwwnw',
  H: 'wnnnnwwnn',
  I: 'nnwnnwwnn',
  J: 'nnnnwwwnn',
  K: 'wnnnnnnww',
  L: 'nnwnnnnww',
  M: 'wnwnnnnwn',
  N: 'nnnnwnnww',
  O: 'wnnnwnnwn',
  P: 'nnwnwnnwn',
  Q: 'nnnnnnwww',
  R: 'wnnnnnwwn',
  S: 'nnwnnnwwn',
  T: 'nnnnwnwwn',
  U: 'wwnnnnnnw',
  V: 'nwwnnnnnw',
  W: 'wwwnnnnnn',
  X: 'nwnnwnnnw',
  Y: 'wwnnwnnnn',
  Z: 'nwwnwnnnn',
  '-': 'nwnnnnwnw',
  '.': 'wwnnnnwnn',
  ' ': 'nwwnnnwnn',
  '$': 'nwnwnwnnn',
  '/': 'nwnwnnnwn',
  '+': 'nwnnnwnwn',
  '%': 'nnnwnwnwn',
  '*': 'nwnnwnwnn'
};

export function createCode39Barcode(rawValue: string | undefined): LctCode39Result {
  const normalizedValue = (rawValue ?? '').trim().toUpperCase();
  const supportedValue = Array.from(normalizedValue)
    .filter(char => Object.hasOwn(CODE39_PATTERNS, char) && char !== '*')
    .join('');

  if (!supportedValue) {
    return {
      bars: [],
      totalUnits: 0,
      displayValue: ''
    };
  }

  const bits = buildCode39BitStream(supportedValue);
  const bars: LctBarcodeBar[] = [];
  let index = 0;

  while (index < bits.length) {
    if (bits[index] === '0') {
      index++;
      continue;
    }

    let width = 1;
    while (index + width < bits.length && bits[index + width] === '1') {
      width++;
    }

    bars.push({ x: index, width });
    index += width;
  }

  return {
    bars,
    totalUnits: bits.length,
    displayValue: supportedValue
  };
}

function buildCode39BitStream(value: string) {
  const encoded = `*${value}*`;
  const quietZoneUnits = 12;
  const narrow = 1;
  const wide = 3;
  const interCharacterGap = 1;
  const chunks: string[] = ['0'.repeat(quietZoneUnits)];

  for (let charIndex = 0; charIndex < encoded.length; charIndex++) {
    const char = encoded[charIndex];
    const pattern = CODE39_PATTERNS[char];

    if (!pattern) {
      continue;
    }

    for (let elementIndex = 0; elementIndex < pattern.length; elementIndex++) {
      const isBar = elementIndex % 2 === 0;
      const unitWidth = pattern[elementIndex] === 'w' ? wide : narrow;
      chunks.push((isBar ? '1' : '0').repeat(unitWidth));
    }

    if (charIndex < encoded.length - 1) {
      chunks.push('0'.repeat(interCharacterGap));
    }
  }

  chunks.push('0'.repeat(quietZoneUnits));
  return chunks.join('');
}
