import PgLaunchScreenDesign from 'generated/pages/pgLaunchScreen';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgLaunchScreen extends withDismissAndBackButton(PgLaunchScreenDesign) {
  constructor() {
    super({});
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   * @param {Object} parameters passed from Router.go function
   */
  public onShow() {
    super.onShow?.();
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  public onLoad() {
    super.onLoad?.();
  }
}
