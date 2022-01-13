interface IPhotoEdit {
    resizeRateMultiplier?: number; //Divides the height and width with this value
    compressionRate?: number;
    blockAllowsEditing?: boolean;
    freeAspectRatio?: boolean;
    freeMaxResultSize?: boolean;
    maximumWidth?: number;
    cropShape?: string; //"OVAL" | "RECTANGLE" => Multimedia.Android.CropShape.OVAL | Multimedia.Android.CropShape.RECTANGLE;
}

interface IPhotoMenu {
    imageUrl?: string;
    isProfileImageExists?: boolean;
    title?: string;
}
