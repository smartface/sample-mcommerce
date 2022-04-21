import PgLaunchScreenDesign from 'generated/pages/pgLaunchScreen';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Dialog from "@smartface/native/ui/dialog";
import FlexLayout from '@smartface/native/ui/flexlayout';
import Color from '@smartface/native/ui/color';
import GifImageView from "@smartface/native/ui/gifimageview";
import GifImage from "@smartface/native/ui/gifimage";
import { IGifImage } from '@smartface/native/ui/gifimage/gifimage';

export default class PgLaunchScreen extends withDismissAndBackButton(PgLaunchScreenDesign) {
    launchDialog: Dialog;
    gifImage: IGifImage;
    gifImageView: GifImageView;

    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    initDialog() {
        this.launchDialog = new Dialog({
            android: {
                themeStyle: Dialog.Android.Style.ThemeNoHeaderBar
            },
        });
        this.launchDialog.layout.alignItems = FlexLayout.AlignItems.CENTER;
        this.launchDialog.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        this.launchDialog.layout.backgroundColor = Color.create('#53b175');
        this.gifImage = GifImage.createFromFile("assets://splash.gif");
        this.gifImageView = new GifImageView({
            //@ts-ignore
            gifImage : this.gifImage,
            height: 400,
            width: 400
        })
        this.launchDialog.layout.addChild(this.gifImageView);
        this.launchDialog.layout.applyLayout();
    }
    public onShow() {
        super.onShow?.();
        this.initBackButton(this.router);
        this.launchDialog.show();
        setTimeout(() => { 
            this.launchDialog.hide();
            this.router.push("/btb/tab1/home");
        }, 2000)

    }

    public onLoad() {
        super.onLoad?.();
        this.initDialog();
    }
}