export function getLocalizedText(text: string | null | undefined, lang: string): string {
  if (!text) return '';
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed[lang] || parsed.uz || text;
    }
  } catch (e) {
    // Return raw text if not JSON
    return text;
  }
  return text;
}

export function parseLocalizedField(value: any) {
  if (!value) return { uz: '', ru: '', en: '' };
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    if (typeof parsed === 'object' && parsed !== null) {
      if ('uz' in parsed || 'ru' in parsed || 'en' in parsed) {
        return { 
          uz: parsed.uz || '', 
          ru: parsed.ru || '', 
          en: parsed.en || '' 
        };
      }
    }
  } catch(e) {}
  const str = typeof value === 'string' ? value : '';
  return { uz: str, ru: str, en: str };
}
