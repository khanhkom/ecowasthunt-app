import api from '@/services/api';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { ActivityList, QuickActionList, TipList, WasteTypeList } from './Item';
import Header from './Item/Header';
import StatsCard from './Item/StatsCard';

// Mock Data
const userData = {
    level: 'Eco Hero',
    name: 'An',
    points: 2850,
    progress: 8,
    streak: 12,
    weeklyGoal: 15,
};

function HomeScreen() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60_000);
        return () => { clearInterval(timer); };
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Chào buổi sáng';
        if (hour < 18) return 'Chào buổi chiều';
        return 'Chào buổi tối';
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Header
                greeting={getGreeting()}
                hasNotification
                onNotificationPress={() => { }}
                userName={userData.name}
            />
            <StatsCard
                level={userData.level}
                points={userData.points}
                progress={userData.progress}
                streak={userData.streak}
                weeklyGoal={userData.weeklyGoal}
            />
            <QuickActionList />
            <ActivityList />
            <WasteTypeList />
            <TipList />
            <View style={styles.bottomPadding} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bottomPadding: {
        height: 100,
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
});

export default HomeScreen;