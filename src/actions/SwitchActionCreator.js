
export const SWITCH_TITLE = `SWITCH_TITLE`;

export const switchActionCreator = (resource, isDepartment) => ({
    type: SWITCH_TITLE,
    payload: {resource: resource, isDepartment: isDepartment}
});
