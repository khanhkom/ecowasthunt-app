import type { RootScreenProps } from '@/navigation/types';

import { setAuthToken } from '@/services/api';
import storageService from '@/services/functions/storageService';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();

  const { isError, isFetching } = useQuery({
    queryFn: () => {
      return Promise.resolve(true);
    },
    queryKey: ['startup'],
  });

  useEffect(() => {
    // Check auth from local storage
    const authData = storageService.getItem('auth');
    if (
      authData &&
      typeof authData === 'object' &&
      'accessToken' in authData &&
      typeof authData.accessToken === 'string'
    ) {
      console.log("authData::", authData)
      setAuthToken(authData.accessToken);
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.MainTabs }],
      });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Login }],
    });
  }, [navigation]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <AssetByVariant
          path="tom"
          resizeMode="contain"
          style={{ height: 300, width: 300 }}
        />
        {isFetching ? (
          <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
        ) : undefined}
        {isError ? (
          <Text style={[fonts.size_16, fonts.red500]}>{t('common_error')}</Text>
        ) : undefined}
      </View>
    </SafeScreen>
  );
}

export default Startup;
