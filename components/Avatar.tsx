import React, { FC } from 'react';
import { ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { theme } from '@/constants';
import { hp } from '@/helpers';
import { getUserImageSrc } from '@/services';

interface AvatarProps {
    rounded?: number;
    size?: number;
    style?: StyleProp<ImageStyle>;
    uri?: string | null;
}

const Avatar: FC<AvatarProps> = ({ rounded = theme.radius.md, size = hp(4.5), style, uri }) => {
    return (
        <Image
            source={getUserImageSrc(uri)}
            style={[styles.avatar, { borderRadius: rounded, height: size, width: size }, style]}
        />
    );
};

const styles = StyleSheet.create({
    avatar: {
        borderColor: theme.colors.darkLight,
        borderCurve: 'continuous',
        borderWidth: 1,
    },
});

export default Avatar;
