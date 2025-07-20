import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  // Common screens
  [Paths.Home]: undefined;
  [Paths.Startup]: undefined;

  // Auth screens
  [Paths.ForgotPassword]: undefined;
  [Paths.Login]: undefined;
  [Paths.Register]: undefined;

  // Waste report screens
  [Paths.ReportDetail]: undefined;
  [Paths.ReportHistory]: undefined;
  [Paths.ReportWaste]: undefined;

  // Gamification screens
  [Paths.Challenges]: undefined;
  [Paths.Leaderboard]: undefined;
  [Paths.Rewards]: undefined;
  [Paths.RewardShop]: undefined;

  // Community screens
  [Paths.Chatbot]: undefined;
  [Paths.Events]: undefined;
  [Paths.Forum]: undefined;

  // Map screens
  [Paths.MapView]: undefined;
  [Paths.WastePoints]: undefined;

  // Profile screens
  [Paths.Help]: undefined;
  [Paths.Profile]: undefined;
  [Paths.Settings]: undefined;
};
