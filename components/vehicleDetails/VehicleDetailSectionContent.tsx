import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Plus } from 'lucide-react-native';

import type { Vehicle } from '@/constants/mock-data';
import { ProductMediaSection, type MediaTab } from './ProductMediaSection';
import { InstalledPackagesSection } from './InstalledPackagesSection';
import { ProductOptionsSection } from './ProductOptionsSection';
import { ProductSummarySection } from './ProductSummarySection';
import { ProductCommentsSection } from './ProductCommentsSection';
import { ProductPricingSection } from './ProductPricingSection';
import { ProductAestheticsSection } from './ProductAestheticsSection';
import { ProductCapabilitiesSection } from './ProductCapabilitiesSection';
import { ProductCategorizationSection } from './ProductCategorizationSection';

interface VehicleDetailSectionContentProps {
  section?: string;
  title: string;
  vehicle: Vehicle;
  onInputFocus?: (node: any) => void;
}

export const VehicleDetailSectionContent = ({
  section,
  title,
  vehicle,
  onInputFocus,
}: VehicleDetailSectionContentProps) => {
  const [activeMediaTab, setActiveMediaTab] = useState<MediaTab>('Media');

  const mediaItems = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => index);
  }, []);

  if (section === 'product-summary') {
    return <ProductSummarySection onInputFocus={onInputFocus} />;
  }

  if (section === 'product-media') {
    return (
      <ProductMediaSection
        vehicle={vehicle}
        activeMediaTab={activeMediaTab}
        setActiveMediaTab={setActiveMediaTab}
        mediaItems={mediaItems}
      />
    );
  }

  if (section === 'installed-packages') {
    return <InstalledPackagesSection />;
  }

  if (section === 'product-options') {
    return <ProductOptionsSection />;
  }

  if (section === 'product-comments') {
    return <ProductCommentsSection onInputFocus={onInputFocus} />;
  }

  if (section === 'product-pricing-options') {
    return <ProductPricingSection onInputFocus={onInputFocus} />;
  }

  if (section === 'product-aesthetics') {
    return <ProductAestheticsSection onInputFocus={onInputFocus} />;
  }

  if (section === 'product-capabilities') {
    return <ProductCapabilitiesSection onInputFocus={onInputFocus} />;
  }

  if (section === 'product-categorization') {
    return <ProductCategorizationSection onInputFocus={onInputFocus} />;
  }

  return (
    <View style={styles.placeholderCard}>
      <View style={styles.placeholderIcon}>
        <Plus size={18} color="#2492D4" />
      </View>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderText}>This section page is ready and can be expanded with its own form fields and actions.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderCard: { minHeight: 180, borderRadius: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7E7E7', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 12 },
  placeholderIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EAF5FD', alignItems: 'center', justifyContent: 'center' },
  placeholderTitle: { fontSize: 16, fontWeight: '700', color: '#1E1E1E' },
  placeholderText: { fontSize: 12, lineHeight: 18, textAlign: 'center', color: '#666666' },
});
