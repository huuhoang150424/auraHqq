// data/service-packages.ts
import { Globe, Monitor, Smartphone } from 'lucide-react';

export const servicePackagesData = (t: any) => [
  {
    name: t.landingPackage,
    price: t.landingPrice,
    features: [
      t.responsiveDesign,
      t.seoOptimized,
      t.contactForms,
      t.analyticsIntegration,
      t.oneMonthSupport,
    ],
    popular: false,
    icon: Globe,
    color: 'blue',
  },
  {
    name: t.webAppPackage,
    price: t.webAppPrice,
    features: [
      t.fullStackDevelopment,
      t.databaseDesign,
      t.userAuthentication,
      t.adminDashboard,
      t.threeMonthsSupport,
    ],
    popular: true,
    icon: Monitor,
    color: 'purple',
  },
  {
    name: t.mobileAppPackage,
    price: t.mobileAppPrice,
    features: [
      t.crossPlatform,
      t.nativePerformance,
      t.pushNotifications,
      t.appStoreDeployment,
      t.sixMonthsSupport,
    ],
    popular: false,
    icon: Smartphone,
    color: 'green',
  },
];
