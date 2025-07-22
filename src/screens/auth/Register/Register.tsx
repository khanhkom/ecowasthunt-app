import React, { useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
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
    ChevronLeftIcon,
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
    UserIcon,
} from 'react-native-heroicons/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

import { goBack } from '@/navigation';


function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const buttonScale = useRef(new Animated.Value(1)).current;
    const formOpacity = useRef(new Animated.Value(0)).current;
    const formTranslateY = useRef(new Animated.Value(30)).current;

    React.useEffect(() => {
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

    const animateButton = (toValue) => {
        Animated.spring(buttonScale, {
            friction: 8,
            tension: 50,
            toValue,
            useNativeDriver: true,
        }).start();
    };

    // Password validation
    const getPasswordStrength = (password) => {
        if (password.length < 6) return { color: '#EF4444', strength: 'weak', text: 'Quá ngắn' };
        if (password.length < 8) return { color: '#F59E0B', strength: 'medium', text: 'Trung bình' };
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return { color: '#F59E0B', strength: 'medium', text: 'Trung bình' };
        }
        return { color: '#10B981', strength: 'strong', text: 'Mạnh' };
    };

    // Form validation
    const validateForm = () => {
        const errors = [];

        if (!username.trim()) errors.push('Vui lòng nhập tên tài khoản');
        else if (username.length < 3) errors.push('Tên tài khoản phải có ít nhất 3 ký tự');

        if (!email.trim()) errors.push('Vui lòng nhập email');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Email không hợp lệ');
        }

        if (!password.trim()) errors.push('Vui lòng nhập mật khẩu');
        else if (password.length < 6) errors.push('Mật khẩu phải có ít nhất 6 ký tự');

        if (password !== confirmPassword) errors.push('Mật khẩu xác nhận không khớp');

        if (!agreeTerms) errors.push('Vui lòng đồng ý với điều khoản sử dụng');

        return errors;
    };

    const handleRegister = async () => {
        const errors = validateForm();

        if (errors.length > 0) {
            Alert.alert('Lỗi', errors.join('\n'));
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            Alert.alert(
                'Đăng ký thành công!',
                'Chào mừng bạn đến với cộng đồng bảo vệ môi trường!',
                [
                    {
                        onPress: () => {
                            // navigation.replace('MainApp');
                            // Or go back to login
                            goBack();
                        },
                        text: 'Tiếp tục'
                    }
                ]
            );
        } catch {
            Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = username.trim() &&
        email.trim() &&
        password.trim() &&
        confirmPassword.trim() &&
        password === confirmPassword &&
        agreeTerms;

    const passwordStrength = password ? getPasswordStrength(password) : null;

    // Stable handlers to prevent re-renders
    const handleUsernameChange = React.useCallback((text) => { setUsername(text); }, []);
    const handleEmailChange = React.useCallback((text) => { setEmail(text); }, []);
    const handlePasswordChange = React.useCallback((text) => { setPassword(text); }, []);
    const handleConfirmPasswordChange = React.useCallback((text) => { setConfirmPassword(text); }, []);

    const handleFocus = React.useCallback(() => { }, []);
    const handleBlur = React.useCallback(() => { }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                style={styles.keyboardAvoid}
            >
                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { goBack(); }}
                            style={styles.backButton}
                        >
                            <ChevronLeftIcon color="#6B7280" size={24} />
                        </TouchableOpacity>

                        <View style={styles.headerContent}>
                            <Text style={styles.title}>Tạo Tài Khoản</Text>
                            <Text style={styles.subtitle}>
                                Tham gia cộng đồng bảo vệ môi trường và tạo ra sự thay đổi tích cực
                            </Text>
                        </View>
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
                        {/* Username Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tên tài khoản</Text>
                            <View style={[
                                styles.inputContainer,
                                username && styles.inputContainerFilled,
                            ]}>
                                <UserIcon
                                    color="#6B7280"
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    accessibilityHint="Nhập tên tài khoản để đăng ký"
                                    accessibilityLabel="Username input"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    blurOnSubmit={false}
                                    onBlur={handleBlur}
                                    onChangeText={handleUsernameChange}
                                    onFocus={handleFocus}
                                    placeholder="Nhập tên tài khoản"
                                    placeholderTextColor="#9CA3AF"
                                    returnKeyType="next"
                                    style={styles.textInput}
                                    value={username}
                                />
                                {username.length >= 3 && (
                                    <CheckCircleIconSolid color="#10B981" size={20} />
                                )}
                            </View>
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={[
                                styles.inputContainer,
                                email && styles.inputContainerFilled,
                            ]}>
                                <EnvelopeIcon
                                    color="#6B7280"
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    accessibilityHint="Nhập địa chỉ email để đăng ký"
                                    accessibilityLabel="Email input"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    blurOnSubmit={false}
                                    keyboardType="email-address"
                                    onBlur={handleBlur}
                                    onChangeText={handleEmailChange}
                                    onFocus={handleFocus}
                                    placeholder="Nhập địa chỉ email"
                                    placeholderTextColor="#9CA3AF"
                                    returnKeyType="next"
                                    style={styles.textInput}
                                    value={email}
                                />
                                {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? <CheckCircleIconSolid color="#10B981" size={20} /> : null}
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <View style={[
                                styles.inputContainer,
                                password && styles.inputContainerFilled,
                            ]}>
                                <LockClosedIcon
                                    color="#6B7280"
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    accessibilityHint="Nhập mật khẩu để đăng ký"
                                    accessibilityLabel="Password input"
                                    blurOnSubmit={false}
                                    onBlur={handleBlur}
                                    onChangeText={handlePasswordChange}
                                    onFocus={handleFocus}
                                    placeholder="Nhập mật khẩu"
                                    placeholderTextColor="#9CA3AF"
                                    returnKeyType="next"
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

                            {/* Password Strength Indicator */}
                            {password && passwordStrength ? <View style={styles.passwordStrength}>
                                <View style={[
                                    styles.strengthBar,
                                    { backgroundColor: passwordStrength.color, flex: passwordStrength.strength === 'weak' ? 1 : passwordStrength.strength === 'medium' ? 2 : 3 }
                                ]} />
                                <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                                    Độ mạnh: {passwordStrength.text}
                                </Text>
                            </View> : null}
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Xác nhận mật khẩu</Text>
                            <View style={[
                                styles.inputContainer,
                                confirmPassword && styles.inputContainerFilled,
                                confirmPassword && password !== confirmPassword && styles.inputContainerError,
                            ]}>
                                <LockClosedIcon
                                    color="#6B7280"
                                    size={20}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    accessibilityHint="Nhập lại mật khẩu để xác nhận"
                                    accessibilityLabel="Confirm password input"
                                    blurOnSubmit={false}
                                    onBlur={handleBlur}
                                    onChangeText={handleConfirmPasswordChange}
                                    onFocus={handleFocus}
                                    onSubmitEditing={handleRegister}
                                    placeholder="Nhập lại mật khẩu"
                                    placeholderTextColor="#9CA3AF"
                                    returnKeyType="done"
                                    secureTextEntry={!showConfirmPassword}
                                    style={[styles.textInput, { flex: 1 }]}
                                    value={confirmPassword}
                                />
                                <TouchableOpacity
                                    accessibilityLabel={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                    onPress={() => { setShowConfirmPassword(!showConfirmPassword); }}
                                    style={styles.eyeButton}
                                >
                                    {showConfirmPassword ? (
                                        <EyeSlashIcon color="#6B7280" size={20} />
                                    ) : (
                                        <EyeIcon color="#6B7280" size={20} />
                                    )}
                                </TouchableOpacity>
                                {confirmPassword && password === confirmPassword ? <CheckCircleIconSolid color="#10B981" size={20} style={{ marginLeft: 8 }} /> : null}
                            </View>
                            {confirmPassword && password !== confirmPassword ? <Text style={styles.errorText}>Mật khẩu không khớp</Text> : null}
                        </View>

                        {/* Terms & Conditions */}
                        <TouchableOpacity
                            accessibilityLabel="Đồng ý điều khoản"
                            onPress={() => { setAgreeTerms(!agreeTerms); }}
                            style={styles.termsContainer}
                        >
                            <View style={[
                                styles.checkbox,
                                agreeTerms && styles.checkboxChecked,
                            ]}>
                                {agreeTerms ? <CheckCircleIconSolid color="#FFFFFF" size={16} /> : null}
                            </View>
                            <Text style={styles.termsText}>
                                Tôi đồng ý với{' '}
                                <Text style={styles.termsLink}>Điều khoản sử dụng</Text>
                                {' '}và{' '}
                                <Text style={styles.termsLink}>Chính sách bảo mật</Text>
                            </Text>
                        </TouchableOpacity>

                        {/* Register Button */}
                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <TouchableOpacity
                                accessibilityHint="Nhấn để tạo tài khoản mới"
                                accessibilityLabel="Đăng ký"
                                disabled={!isFormValid || isLoading}
                                onPress={handleRegister}
                                onPressIn={() => { animateButton(0.95); }}
                                onPressOut={() => { animateButton(1); }}
                                style={[
                                    styles.registerButton,
                                    !isFormValid && styles.registerButtonDisabled,
                                ]}
                            >
                                {isLoading ? (
                                    <Text style={styles.registerButtonText}>Đang tạo tài khoản...</Text>
                                ) : (
                                    <>
                                        <Text style={styles.registerButtonText}>Tạo Tài Khoản</Text>
                                        <ArrowRightIcon color="#FFFFFF" size={20} />
                                    </>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Login Link */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Đã có tài khoản? </Text>
                            <TouchableOpacity
                                onPress={() => { goBack(); }}
                            >
                                <Text style={styles.loginLink}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* Environmental Message */}
                    <View style={styles.environmentalMessage}>
                        <Text style={styles.environmentalText}>
                            🌍 Cùng nhau tạo ra một thế giới xanh và bền vững hơn
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        elevation: 2,
        height: 40,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: 40,
    },
    checkbox: {
        alignItems: 'center',
        borderColor: '#D1D5DB',
        borderRadius: 4,
        borderWidth: 2,
        height: 20,
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 1,
        width: 20,
    },
    checkboxChecked: {
        backgroundColor: '#8B5CF6',
        borderColor: '#8B5CF6',
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    environmentalMessage: {
        backgroundColor: '#EFF6FF',
        borderLeftColor: '#3B82F6',
        borderLeftWidth: 4,
        borderRadius: 12,
        marginBottom: 40,
        padding: 16,
    },
    environmentalText: {
        color: '#1E40AF',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginLeft: 4,
        marginTop: 4,
    },
    eyeButton: {
        marginLeft: 8,
        padding: 4,
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
        paddingBottom: 32,
        paddingTop: Platform.OS === 'ios' ? 30 : 10,
    },
    headerContent: {
        alignItems: 'center',
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
    inputContainerError: {
        backgroundColor: '#FEF2F2',
        borderColor: '#EF4444',
    },
    inputContainerFilled: {
        backgroundColor: '#FEFEFE',
        borderColor: '#D1D5DB',
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
    loginContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginLink: {
        color: '#8B5CF6',
        fontSize: 14,
        fontWeight: '600',
    },
    loginText: {
        color: '#6B7280',
        fontSize: 14,
    },
    passwordStrength: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    registerButton: {
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
    registerButtonDisabled: {
        backgroundColor: '#D1D5DB',
        elevation: 0,
        shadowOpacity: 0,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    strengthBar: {
        borderRadius: 2,
        height: 4,
        marginRight: 8,
        maxWidth: 60,
    },
    strengthText: {
        fontSize: 12,
        fontWeight: '500',
    },
    subtitle: {
        color: '#6B7280',
        fontSize: 15,
        lineHeight: 22,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    termsContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 24,
        paddingRight: 8,
    },
    termsLink: {
        color: '#8B5CF6',
        fontWeight: '500',
    },
    termsText: {
        color: '#6B7280',
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
    textInput: {
        color: '#111827',
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
    },
    title: {
        color: '#111827',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
});

export default RegisterScreen;