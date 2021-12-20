import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviFavoritesDesign from 'generated/my-components/LviFavorites';
const originalHeight = getCombinedStyle('.lviFavorites').height;

export default class LviFavorites extends LviFavoritesDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
    static getHeight(): number {
        return originalHeight;
    }
}
