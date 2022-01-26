import Image from '@smartface/native/ui/image';
import { themeService } from 'theme';
export const { paddingLeft: DEFAULT_PADDING_LEFT, paddingRight: DEFAULT_PADDING_RIGHT } = themeService.getStyle('.paddingHorizontal');
export function getProfileImagePlaceholder(isLightTheme: boolean, imageHeight?: number) {
    return isLightTheme
        ? imageHeight
            ? Image.createFromFile('images://profile_placeholder.png').android.round(imageHeight / 2)
            : Image.createFromFile('images://profile_placeholder.png')
        : imageHeight
        ? Image.createFromFile('images://profile_placeholder_dark.png').android.round(imageHeight / 2)
        : Image.createFromFile('images://profile_placeholder_dark.png');
}
