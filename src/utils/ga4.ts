declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export interface GA4Event {
  event_name: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

export const initializeGA4WithDeviceId = (deviceId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-YXZ8C067XQ', {
      custom_map: {
        custom_device_id: 'device_id'
      },
      device_id: deviceId
    });
    
    window.gtag('set', {
      device_id: deviceId
    });
  }
};

export const GA4Events = {
  signUp: (method: string = 'kakao') => {
    window.gtag?.('event', 'sign_up', {
      method: method,
      event_category: 'authentication',
    });
  },

  login: (method: string = 'kakao') => {
    window.gtag?.('event', 'login', {
      method: method,
      event_category: 'authentication',
    });
  },

  logout: () => {
    window.gtag?.('event', 'logout', {
      event_category: 'authentication',
    });
  },

  viewDeal: (dealId: number, category?: string) => {
    window.gtag?.('event', 'view_item', {
      item_id: dealId.toString(),
      item_category: category,
      event_category: 'deal_interaction',
    });
  },

  likeDeal: (dealId: number, category?: string) => {
    window.gtag?.('event', 'like_deal', {
      item_id: dealId.toString(),
      item_category: category,
      event_category: 'deal_interaction',
    });
  },

  unlikeDeal: (dealId: number, category?: string) => {
    window.gtag?.('event', 'unlike_deal', {
      item_id: dealId.toString(),
      item_category: category,
      event_category: 'deal_interaction',
    });
  },

  shareDeal: (dealId: number, shareMethod: string = 'copy_link') => {
    window.gtag?.('event', 'share', {
      content_type: 'deal',
      item_id: dealId.toString(),
      method: shareMethod,
      event_category: 'deal_interaction',
    });
  },

  clickPurchase: (dealId: number, originalUrl: string) => {
    window.gtag?.('event', 'click_purchase', {
      item_id: dealId.toString(),
      destination_url: originalUrl,
      event_category: 'purchase_funnel',
    });
  },

  uploadDeal: (categoryId?: number, storeId?: number) => {
    window.gtag?.('event', 'upload_deal', {
      item_category_id: categoryId?.toString(),
      store_id: storeId?.toString(),
      event_category: 'content_creation',
    });
  },

  search: (searchTerm: string, searchType: 'deal' | 'category' | 'store' = 'deal') => {
    window.gtag?.('event', 'search', {
      search_term: searchTerm,
      search_type: searchType,
      event_category: 'search',
    });
  },

  pageView: (pagePath: string, pageTitle?: string) => {
    window.gtag?.('event', 'page_view', {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  },

  selectCategory: (categoryId: number, categoryName: string) => {
    window.gtag?.('event', 'select_content', {
      content_type: 'category',
      item_id: categoryId.toString(),
      item_name: categoryName,
      event_category: 'navigation',
    });
  },

  selectStore: (storeId: number, storeName: string) => {
    window.gtag?.('event', 'select_content', {
      content_type: 'store',
      item_id: storeId.toString(),
      item_name: storeName,
      event_category: 'navigation',
    });
  },

  addComment: (dealId: number) => {
    window.gtag?.('event', 'add_comment', {
      item_id: dealId.toString(),
      event_category: 'engagement',
    });
  },

  updateProfile: () => {
    window.gtag?.('event', 'update_profile', {
      event_category: 'user_action',
    });
  },
};

export const trackCustomEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};
