interface AdConfig {
  client: string
  options?: {
    autoAds?: boolean
  }
}

export const adsConfig: AdConfig = {
  client: 'ca-pub-6152848695010247', // 您的AdSense发布商ID
  options: {
    autoAds: true, // 启用AMP自动广告
  },
}
