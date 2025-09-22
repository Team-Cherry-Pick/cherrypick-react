export type ShareStatus = 'shared' | 'copied' | 'error';

export interface ShareOptions {
  title?: string;
  text?: string;
  showAlerts?: boolean; // 기본 true: 기본 알림 사용
}

interface NavigatorShare {
  share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
}

/**
 * URL을 공유하거나 클립보드에 복사
 * Web Share API → Clipboard API → execCommand 순으로 폴백 시도
 */
export async function shareUrl(url: string, opts: ShareOptions = {}): Promise<ShareStatus> {
  const { title, text, showAlerts = true } = opts;
  const show = (msg: string) => showAlerts && alert(msg);

  if (!url) {
    show('공유/복사에 실패했습니다. 다시 시도해주세요.');
    return 'error';
  }

  // Web Share API 시도
  try {
    const nav = navigator as unknown as NavigatorShare;
    if (nav?.share) {
      await nav.share({ title, text, url });
      show('공유가 완료됐어요.');
      return 'shared';
    }
  } catch {
    // 폴백으로 이동
  }

  // Clipboard API 시도
  try {
    await navigator.clipboard?.writeText(url);
    show('링크가 복사되었습니다.');
    return 'copied';
  } catch {
    // 폴백으로 이동
  }

  // execCommand 폴백 (레거시)
  try {
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.cssText = 'position:absolute;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    show('링크가 복사되었습니다.');
    return 'copied';
  } catch {
    // 최종 실패
  }

  show('공유/복사에 실패했습니다. 다시 시도해주세요.');
  return 'error';
}
