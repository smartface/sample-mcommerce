import System from '@smartface/native/device/system';
import Invocation from '@smartface/native/util/iOS/invocation';

export const callVibrate = (millisecond: number) => {
    if (System.OS === System.OSType.ANDROID) {
        System.vibrate({ millisecond: millisecond });
    } else if (System.OS === System.OSType.IOS) {
        let feedbackAlloc = Invocation.invokeClassMethod('UIImpactFeedbackGenerator', 'alloc', [], 'id');
        // 0: Light , 1: Medium , 2: Heavy
        //@ts-ignore
        let argStyle = new Invocation.Argument({
            type: 'NSInteger',
            value: 2
        });
        //@ts-ignore
        let feedbackGenerator = Invocation.invokeInstanceMethod(feedbackAlloc, 'initWithStyle:', [argStyle], 'NSObject');
        //@ts-ignore
        Invocation.invokeInstanceMethod(feedbackGenerator, 'prepare', []);
        //@ts-ignore
        Invocation.invokeInstanceMethod(feedbackGenerator, 'impactOccurred', []);
        feedbackGenerator = undefined;
        feedbackAlloc = undefined;
    }
};
