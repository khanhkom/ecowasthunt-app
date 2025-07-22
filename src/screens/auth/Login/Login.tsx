import { setAuthToken } from '@/services/api';
import { login } from '@/services/functions/authApi';
import storageService from '@/services/functions/storageService';
import React, { useRef, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    ArrowRightIcon,
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
} from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { navigate, Paths } from '@/navigation';


function LoginScreen() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userNameFocused, setUserNameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const buttonScale = useRef(new Animated.Value(1)).current;
    const formOpacity = useRef(new Animated.Value(0)).current;
    const formTranslateY = useRef(new Animated.Value(30)).current;

    React.useEffect(() => {
        // Kiểm tra token khi app khởi động
        function checkToken() {
            const authData = storageService.getItem('auth');
            if (
                authData &&
                typeof authData === 'object' &&
                'accessToken' in authData &&
                typeof authData.accessToken === 'string'
            ) {
                setAuthToken(authData.accessToken);
                // TODO: Kiểm tra expiresIn nếu cần
                navigate(Paths.MainTabs);
            }
        }
        checkToken();
        // Entrance animation
        Animated.parallel([
            Animated.timing(formOpacity, {
                duration: 600,
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(formTranslateY, {
                duration: 600,
                toValue: 0,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const animateButton = (toValue: number) => {
        Animated.spring(buttonScale, {
            friction: 8,
            tension: 50,
            toValue,
            useNativeDriver: true,
        }).start();
    };

    const handleLogin = async (): Promise<void> => {
        if (!userName.trim() || !password.trim()) {
            Toast.show({
                text1: 'Lỗi',
                text2: 'Vui lòng nhập đầy đủ thông tin',
                type: 'error',
            });
            return;
        }

        setIsLoading(true);

        try {
            // Gọi API đăng nhập
            type LoginResponse = { accessToken?: string; expiresIn?: number; refreshExpiresIn?: number; refreshToken?: string; };
            console.log("login::", { password, userName })
            const response = await login({ password, userName });
            console.log("response::", response.data)
            const data = (response as { data?: LoginResponse }).data;
            const token = data?.accessToken;
            if (typeof token === 'string') {
                setAuthToken(token);
                // Lưu thông tin đăng nhập vào localstorage
                storageService.setItem('auth', {
                    accessToken: data?.accessToken,
                    expiresIn: data?.expiresIn,
                    loginAt: Date.now(),
                    refreshExpiresIn: data?.refreshExpiresIn,
                    refreshToken: data?.refreshToken,
                });
            }
            // Navigate to main app
            Toast.show({
                text1: 'Thành công',
                text2: 'Đăng nhập thành công!',
                type: 'success',
            });
            navigate(Paths.MainTabs);
        } catch (error) {
            console.error("error", error)
            Toast.show({
                text1: 'Lỗi',
                text2: 'Thông tin đăng nhập không chính xác!',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = userName.trim() && password.trim();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Đăng Nhập</Text>
                        <Text style={styles.subtitle}>
                            Chào mừng trở lại! Hãy đăng nhập để tiếp tục hành trình bảo vệ môi trường
                        </Text>
                    </View>

                    {/* Form */}
                    <Animated.View
                        style={[
                            styles.form,
                            {
                                opacity: formOpacity,
                                transform: [{ translateY: formTranslateY }],
                            },
                        ]}
                    >
                        {/* UserName Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tên đăng nhập</Text>
                            <View style={[
                                styles.inputContainer,
                                userNameFocused && styles.inputContainerFocused,
                                userName && styles.inputContainerFilled,
                            ]}>
                                <LockClosedIcon
                                    color={userNameFocused ? '#8B5CF6' : '#6B7280'}
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    accessibilityHint="Nhập tên đăng nhập để đăng nhập"
                                    accessibilityLabel="UserName input"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onBlur={() => { setUserNameFocused(false); }}
                                    onChangeText={setUserName}
                                    placeholder="Nhập tên đăng nhập của bạn"
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.textInput}
                                    value={userName}
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <View style={[
                                styles.inputContainer,
                                passwordFocused && styles.inputContainerFocused,
                                password && styles.inputContainerFilled,
                            ]}>
                                <LockClosedIcon
                                    color={passwordFocused ? '#8B5CF6' : '#6B7280'}
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    accessibilityHint="Nhập mật khẩu để đăng nhập"
                                    accessibilityLabel="Password input"
                                    onBlur={() => { setPasswordFocused(false); }}
                                    onChangeText={setPassword}
                                    // onFocus={() => { setPasswordFocused(true); }}
                                    autoCapitalize='none'
                                    placeholder="Nhập mật khẩu"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!showPassword}
                                    style={[styles.textInput, { flex: 1 }]}
                                    value={password}
                                />
                                <TouchableOpacity
                                    accessibilityLabel={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                    onPress={() => { setShowPassword(!showPassword); }}
                                    style={styles.eyeButton}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon color="#6B7280" size={20} />
                                    ) : (
                                        <EyeIcon color="#6B7280" size={20} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate('ForgotPassword');
                                Toast.show({
                                    text1: 'Quên mật khẩu',
                                    text2: 'Chức năng đang được phát triển',
                                    type: 'info',
                                });
                            }}
                            style={styles.forgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <TouchableOpacity
                                accessibilityHint="Nhấn để đăng nhập vào ứng dụng"
                                accessibilityLabel="Đăng nhập"
                                disabled={!isFormValid || isLoading}
                                onPress={() => { void handleLogin(); }}
                                onPressIn={() => { animateButton(0.95); }}
                                onPressOut={() => { animateButton(1); }}
                                style={[
                                    styles.loginButton,
                                    !isFormValid && styles.loginButtonDisabled,
                                ]}
                            >
                                {isLoading ? (
                                    <Text style={styles.loginButtonText}>Đang đăng nhập...</Text>
                                ) : (
                                    <>
                                        <Text style={styles.loginButtonText}>Đăng Nhập</Text>
                                        <ArrowRightIcon color="#FFFFFF" size={20} />
                                    </>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Register Link */}
                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigate(Paths.Register);
                                }}
                            >
                                <Text style={styles.registerLink}>Đăng ký ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* Environmental Message */}
                    <View style={styles.environmentalMessage}>
                        <Text style={styles.environmentalText}>
                            🌱 Mỗi lần đăng nhập là một bước nhỏ hướng tới môi trường xanh hơn
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    environmentalMessage: {
        backgroundColor: '#ECFDF5',
        borderLeftColor: '#10B981',
        borderLeftWidth: 4,
        borderRadius: 12,
        marginBottom: 40,
        padding: 16,
    },
    environmentalText: {
        color: '#065F46',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
    },
    eyeButton: {
        marginLeft: 8,
        padding: 4,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
        paddingVertical: 4,
    },
    forgotPasswordText: {
        color: '#8B5CF6',
        fontSize: 14,
        fontWeight: '500',
    },
    form: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        elevation: 3,
        marginBottom: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    header: {
        alignItems: 'center',
        paddingBottom: 40,
        paddingTop: Platform.OS === 'ios' ? 40 : 60,
    },
    inputContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    inputContainerFilled: {
        backgroundColor: '#FEFEFE',
    },
    inputContainerFocused: {
        borderColor: '#8B5CF6',
        elevation: 2,
        shadowColor: '#8B5CF6',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 12,
    },
    keyboardAvoid: {
        flex: 1,
    },
    label: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    loginButton: {
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        elevation: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
        paddingHorizontal: 20,
        paddingVertical: 16,
        shadowColor: '#8B5CF6',
        shadowOffset: {
            height: 4,
            width: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    loginButtonDisabled: {
        backgroundColor: '#D1D5DB',
        elevation: 0,
        shadowOpacity: 0,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    registerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerLink: {
        color: '#8B5CF6',
        fontSize: 14,
        fontWeight: '600',
    },
    registerText: {
        color: '#6B7280',
        fontSize: 14,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    subtitle: {
        color: '#6B7280',
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    textInput: {
        color: '#111827',
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
    },
    title: {
        color: '#111827',
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
});

export default LoginScreen;