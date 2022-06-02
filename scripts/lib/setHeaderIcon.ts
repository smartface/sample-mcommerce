import FlexLayout from '@smartface/native/ui/flexlayout';
import FlHeaderIcon from 'components/FlHeaderIcon';
import { themeService } from 'theme';
import { i18n } from '@smartface/i18n';

export default function setHeaderIcon(flHeaderIcon: FlHeaderIcon) {
    flHeaderIcon = new FlHeaderIcon();
    themeService.addGlobalComponent(flHeaderIcon as any /** to be fixed with stylingcontext next version */, 'titleLayout');
    (flHeaderIcon as StyleContextComponentWithDispatch<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: '.flHeaderIcon'
    });
    flHeaderIcon.appName = `${i18n.instance.t('appName')}`;
    return flHeaderIcon;
}
