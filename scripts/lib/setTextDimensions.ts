import Screen from '@smartface/native/device/screen';
import Font from '@smartface/native/ui/font';
import { IFont } from '@smartface/native/ui/font/font';
import { DEFAULT_PADDING_LEFT, DEFAULT_PADDING_RIGHT } from 'constants/style';

type TextDimensionOptions = {
  lines?: number;
  maxWidth?: number;
  maxLines?: number;
};

/**
 * Dispatches width and height of the view, does not call applyLayout function.
 * Uses the font inside of UI.TextView or UI.Label
 * @module setTextDimensions
 * @function
 * @param {String} [text] - Size of text to be calculated
 * @param {Object} [font] - Font to be calculated on sizeOfString.
 * @param {Object} [options] - Custom parameters
 * @param {Number} [options.lines = 0] - Optional: Use this for setting fixed line count. Overriders options.maxLines
 * @param {Number} [options.maxLines = 0] - Optional: Use this for setting upper limit. Will be overwritten by options.lines if it is defied
 * @param {Number} [options.maxWidth = Screen.width] - Optional: Max width to be taken into account. Screen.width as default
 * @returns {{width: Number, height: Number, maxLines: Number }} - User style that can be dispatched to UI.TextView or UI.Label
 */
export function setTextDimensions(
  textParam: string,
  font: IFont,
  options: TextDimensionOptions
): { width: number; height: number; maxLines: number } {
  const text = textParam || ' ';
  let { lines = 0, maxWidth = Screen.width, maxLines = 0 } = options;
  const isMaxWidthNaN = isNaN(maxWidth);
  maxWidth = isMaxWidthNaN ? Screen.width : maxWidth;
  const { height: oneLineHeight } = font.sizeOfString(' ', Screen.width);
  let { width: textWidth, height: textHeight } = font.sizeOfString(text, maxWidth);
  textHeight = text ? textHeight : 0;
  textWidth = text ? textWidth + 5 : 0; // +5 is For Android
  const userStyle = { width: textWidth, height: textHeight, maxLines: 0 };
  if (maxLines) {
    userStyle.maxLines = maxLines;
    userStyle.height = Math.min(oneLineHeight * maxLines, textHeight);
  }
  if (lines) {
    userStyle.maxLines = lines;
    userStyle.height = oneLineHeight * lines;
  }
  return userStyle;
}

export function calculateLabelHeight(params: {
  textParam: string;
  font: Font;
  maxWidthMargin?: number;
  maxWidth?: number;
  maxLines?: number;
}): { height: number } {
  const { textParam, font, maxWidthMargin, maxWidth, maxLines } = params;
  const textHeight = Math.ceil(
    font.sizeOfString(
      textParam,
      maxWidth
        ? maxWidth
        : maxWidthMargin || !isNaN(maxWidthMargin)
          ? Screen.width - (maxWidthMargin + (DEFAULT_PADDING_LEFT + DEFAULT_PADDING_RIGHT) * 2)
          : Screen.width
    ).height
  );
  const oneLineHeight = Math.ceil(
    font.sizeOfString(
      ' ',
      maxWidth
        ? maxWidth
        : maxWidthMargin || !isNaN(maxWidthMargin)
          ? Screen.width - (maxWidthMargin + (DEFAULT_PADDING_LEFT + DEFAULT_PADDING_RIGHT) * 2)
          : Screen.width
    ).height
  );
  return {
    height: maxLines ? Math.min(textHeight, oneLineHeight * maxLines) : textHeight
  };
}
