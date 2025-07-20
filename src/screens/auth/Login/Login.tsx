import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { navigate } from '@/navigation/navigationService';
import { Paths } from '@/navigation/paths';

import { CustomButton, CustomInput, SocialButton } from '@/components/ui';

const LOADING_DELAY = 2000;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate(Paths.MainTabs);
            // Handle login logic here
        }, LOADING_DELAY);
    };

    const handleForgotPassword = () => {
        // Navigate to forgot password screen
    };

    const handleCreateAccount = () => {
        // Navigate to register screen
    };

    const handleSocialLogin = (provider: string) => {
        // Handle social login
        console.warn(`Login with ${provider}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                {/* Background decorative elements */}
                <View style={styles.backgroundShape1} />
                <View style={styles.backgroundShape2} />
                <View style={styles.backgroundLines} />

                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>Login here</Text>
                    <Text style={styles.subtitle}>
                        Welcome back you've been missed!
                    </Text>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <CustomInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        placeholder="Email"
                        value={email}
                    />

                    <CustomInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                    />

                    <TouchableOpacity
                        onPress={handleForgotPassword}
                        style={styles.forgotPassword}
                    >
                        <Text style={styles.forgotPasswordText}>
                            Forgot your password?
                        </Text>
                    </TouchableOpacity>

                    <CustomButton
                        disabled={!email || !password}
                        loading={isLoading}
                        onPress={handleSignIn}
                        style={styles.signInButton}
                        title="Sign in"
                    />

                    <TouchableOpacity
                        onPress={handleCreateAccount}
                        style={styles.createAccount}
                    >
                        <Text style={styles.createAccountText}>
                            Create new account
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Social Login Section */}
                <View style={styles.socialSection}>
                    <Text style={styles.orText}>Or continue with</Text>

                    <View style={styles.socialButtons}>
                        <SocialButton
                            icon="G"
                            onPress={() => { handleSocialLogin('Google'); }}
                            title="Google"
                        />
                        <SocialButton
                            icon="f"
                            onPress={() => { handleSocialLogin('Facebook'); }}
                            title="Facebook"
                        />
                        <SocialButton
                            icon="🍎"
                            onPress={() => { handleSocialLogin('Apple'); }}
                            title="Apple"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundLines: {
        backgroundColor: 'transparent',
        borderColor: '#007AFF',
        borderWidth: 1,
        bottom: 50,
        height: 100,
        left: 20,
        opacity: 0.1,
        position: 'absolute',
        transform: [{ rotate: '45deg' }],
        width: 100,
    },
    backgroundShape1: {
        backgroundColor: '#E3F2FD',
        borderRadius: 100,
        height: 200,
        left: -50,
        opacity: 0.6,
        position: 'absolute',
        top: -100,
        width: 200,
    },
    backgroundShape2: {
        backgroundColor: '#F3E5F5',
        borderRadius: 75,
        bottom: 100,
        height: 150,
        left: -30,
        opacity: 0.4,
        position: 'absolute',
        width: 150,
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    createAccount: {
        alignItems: 'center',
    },
    createAccountText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },
    form: {
        marginBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    orText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 20,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    signInButton: {
        marginBottom: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
    },
    socialSection: {
        alignItems: 'center',
    },
    subtitle: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
    },
    title: {
        color: '#007AFF',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default Login; 