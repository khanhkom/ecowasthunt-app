import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

// Import all screens
import {
  // Common screens
  Home,
  Startup,

  // Auth screens
  ForgotPassword,
  Login,
  Register,

  // Waste report screens
  ReportDetail,
  ReportHistory,
  ReportWaste,

  // Gamification screens
  Challenges,
  Leaderboard,
  Rewards,
  RewardShop,

  // Community screens
  Chatbot,
  Events,
  Forum,

  // Map screens
  MapView,
  WastePoints,

  // Profile screens
  Help,
  Profile,
  Settings,
} from '@/screens';

import { navigationReference } from './navigationService';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationReference} theme={navigationTheme}>
        <Stack.Navigator initialRouteName={Paths.Login} key={variant} screenOptions={{ headerShown: false }}>
          {/* Auth screens */}
          <Stack.Screen component={Login} name={Paths.Login} />
          <Stack.Screen component={Register} name={Paths.Register} />
          <Stack.Screen component={ForgotPassword} name={Paths.ForgotPassword} />

          {/* Common screens */}
          <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen component={Home} name={Paths.Home} />

          {/* Waste report screens */}
          <Stack.Screen component={ReportWaste} name={Paths.ReportWaste} />
          <Stack.Screen component={ReportHistory} name={Paths.ReportHistory} />
          <Stack.Screen component={ReportDetail} name={Paths.ReportDetail} />

          {/* Gamification screens */}
          <Stack.Screen component={Rewards} name={Paths.Rewards} />
          <Stack.Screen component={Challenges} name={Paths.Challenges} />
          <Stack.Screen component={Leaderboard} name={Paths.Leaderboard} />
          <Stack.Screen component={RewardShop} name={Paths.RewardShop} />

          {/* Community screens */}
          <Stack.Screen component={Chatbot} name={Paths.Chatbot} />
          <Stack.Screen component={Forum} name={Paths.Forum} />
          <Stack.Screen component={Events} name={Paths.Events} />

          {/* Map screens */}
          <Stack.Screen component={MapView} name={Paths.MapView} />
          <Stack.Screen component={WastePoints} name={Paths.WastePoints} />

          {/* Profile screens */}
          <Stack.Screen component={Profile} name={Paths.Profile} />
          <Stack.Screen component={Settings} name={Paths.Settings} />
          <Stack.Screen component={Help} name={Paths.Help} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
