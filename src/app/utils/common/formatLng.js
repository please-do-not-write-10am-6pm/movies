import { LANGUAGES } from '@/constants/languages';

export default function formatLng(lng) {
  const language = LANGUAGES.find((i) => i.value === lng);

  return `${language.value}-${language.region}`;
}