import FlexLayout from '@smartface/native/ui/flexlayout';
import FlHeaderIcon from 'components/FlHeaderIcon';
import { themeService } from 'theme';

export default function setHeaderIcon(flHeaderIcon: FlHeaderIcon) {
    flHeaderIcon = new FlHeaderIcon();
    themeService.addGlobalComponent(flHeaderIcon as any /** to be fixed with stylingcontext next version */, 'titleLayout');
    (flHeaderIcon as StyleContextComponentType<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: '.flHeaderIcon'
    });
    flHeaderIcon.appName = global.lang.appName;
    return flHeaderIcon;
}
