import React, { useRef, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { Asset, CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SEVERITY_LEVELS, WASTE_TYPES } from './constants';
import { useFormData } from './hooks/useFormData';
import { useFormSubmit } from './hooks/useFormSubmit';
import BasicInfoSection from './Item/BasicInfoSection';
import Header from './Item/Header';
import ImageOptionsModal from './Item/ImageOptionsModal';
import ImageSection from './Item/ImageSection';
import LocationSection from './Item/LocationSection';
import PrioritySection from './Item/PrioritySection';
import SeverityModal from './Item/SeverityModal';
import SeveritySection from './Item/SeveritySection';
import SubmitButton from './Item/SubmitButton';
import TagsSection from './Item/TagsSection';
import WasteTypeModal from './Item/WasteTypeModal';
import WasteTypeSection from './Item/WasteTypeSection';

function WasteReportScreen() {
    const {
        addImage,
        addTag,
        formData,
        removeImage,
        removeTag,
        updateField,
        updateLocation,
    } = useFormData();

    const { handleSubmit, isLoading } = useFormSubmit(formData);

    const [showWasteTypes, setShowWasteTypes] = useState(false);
    const [showSeverity, setShowSeverity] = useState(false);
    const [showImageOptions, setShowImageOptions] = useState(false);

    const formOpacity = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(formOpacity, {
            duration: 600,
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, []);

    const selectedWasteType = WASTE_TYPES.find(type => type.id === formData.wasteType);
    const selectedSeverity = SEVERITY_LEVELS.find(level => level.id === formData.severity);

    // Hàm xử lý chọn/chụp ảnh
    const handlePickImage = async (source: 'camera' | 'gallery') => {
        try {
            let result;
            const options: CameraOptions & ImageLibraryOptions = {
                mediaType: 'photo',
                quality: 0.8,
                selectionLimit: 1,
            };
            result = await (source === 'camera' ? launchCamera(options) : launchImageLibrary(options));
            if (result.didCancel) return;
            if (result.errorCode) {
                // Có thể show Alert nếu muốn
                return;
            }
            const asset: Asset | undefined = result.assets?.[0];
            if (asset?.uri) {
                addImage({
                    id: Date.now(),
                    uri: asset.uri,
                });
            }
        } catch {
            // Có thể show Alert nếu muốn
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F9FAFB" barStyle="dark-content" />

            <Header />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardAvoid}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View style={[styles.form, { opacity: formOpacity }]}>

                        <BasicInfoSection
                            formData={formData}
                            updateField={updateField}
                        />

                        <LocationSection
                            location={formData.location}
                            updateLocation={updateLocation}
                        />

                        <WasteTypeSection
                            onPress={() => { setShowWasteTypes(true); }}
                            selectedWasteType={selectedWasteType}
                        />

                        <SeveritySection
                            onPress={() => { setShowSeverity(true); }}
                            selectedSeverity={selectedSeverity}
                        />

                        <PrioritySection
                            priority={formData.priority}
                            updateField={updateField}
                        />

                        <TagsSection
                            addTag={addTag}
                            removeTag={removeTag}
                            tags={formData.tags}
                        />

                        <ImageSection
                            images={formData.images}
                            onAddImage={() => { setShowImageOptions(true); }}
                            removeImage={removeImage}
                        />

                        <SubmitButton
                            isLoading={isLoading}
                            onSubmit={handleSubmit}
                        />

                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>

            <WasteTypeModal
                onClose={() => { setShowWasteTypes(false); }}
                onSelect={(typeId) => {
                    updateField('wasteType', typeId);
                    setShowWasteTypes(false);
                }}
                selectedType={formData.wasteType}
                visible={showWasteTypes}
            />

            <SeverityModal
                onClose={() => { setShowSeverity(false); }}
                onSelect={(severityId) => {
                    updateField('severity', severityId);
                    setShowSeverity(false);
                }}
                selectedSeverity={formData.severity}
                visible={showSeverity}
            />

            <ImageOptionsModal
                onClose={() => { setShowImageOptions(false); }}
                onPickImage={handlePickImage}
                visible={showImageOptions}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    form: {
        padding: 20,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
});

export default WasteReportScreen;