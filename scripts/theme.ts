
  
import Data from "@smartface/native/global/data";
import Application from "@smartface/native/application";
import { config } from "settings.json";
import { CURRENT_THEME } from 'constants/deviceVariables.json';
import { ThemeService } from "@smartface/styling-context/lib/ThemeService";

const themeConfig = config.theme;
const currentTheme = Data.getStringVariable(CURRENT_THEME) || themeConfig.currentTheme;
const themeSources = themeConfig.themes.map((name) => ({
  name,
  rawStyles: require(`./generated/themes/${name}`),
  isDefault: currentTheme === name,
}));

export function isCurrentThemeLight(): boolean {
    return (Data.getStringVariable('currentTheme') || themeConfig.currentTheme) === 'mCommerceTheme';
}


export const themeService = new ThemeService(themeSources);
Application["theme"] = ThemeService.instance;
