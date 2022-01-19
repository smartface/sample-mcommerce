export default function setVisibility(component, visible) {
    component.dispatch({
        type: "updateUserStyle",
        userStyle: {
            visible
        }
    });
}