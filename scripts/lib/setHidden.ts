export default function setHidden(components: any[], visible: boolean) {
    if (!components || !components.length) {
        return;
    }
    components.forEach((component) => {
        component.dispatch(
            visible
                ? {
                      type: 'removeClassName',
                      className: '.hidden'
                  }
                : {
                      type: 'pushClassNames',
                      classNames: '.hidden'
                  }
        );
    });
}
