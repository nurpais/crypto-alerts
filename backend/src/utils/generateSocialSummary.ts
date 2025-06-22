import { Link } from '../types/token';

export function generateSocialSummary(links?: Link[] | null): string {
  if (!links || links.length === 0) return 'No social links provided.';

  const summary: string[] = [];

  links.forEach((link) => {
    const type = link.type?.toLowerCase() || '';
    const label = link.label || '';

    if (type.includes('twitter')) summary.push(`Twitter: ${label}`);
    else if (type.includes('telegram')) summary.push(`Telegram: ${label}`);
    else if (type.includes('discord')) summary.push(`Discord: ${label}`);
    else summary.push(`${type}: ${label}`);
  });

  return summary.join(', ');
}
